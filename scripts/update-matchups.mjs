import { readFile, writeFile } from "node:fs/promises";

const API_BASE = "https://mlbb.tools/api/counter";
const PAGE_BASE = "https://mlbb.tools/heroes";
// Mythical Glory is deliberately excluded: its sample sizes are small enough that
// pair edges reach 40-65pp, an order of magnitude above the Mythic and Honor tiers,
// which agree closely with each other (p99 ~7pp and ~9pp).
const RANK_TIERS = ["mythic", "honor"];
// Rare heroes get thin pair samples, so a handful of edges land far outside the
// distribution (synergy reached 50pp while its median is 4.6pp). Winsorize both
// tables at the ceiling the server-filtered counter data actually reaches, so one
// noisy pair cannot dominate a recommendation.
const MAX_EDGE_PP = 15;
const CONCURRENCY = 6;
const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 750;

const dataUrl = new URL("../app/data.ts", import.meta.url);
const dataSource = await readFile(dataUrl, "utf8");
const heroBlock = dataSource.split("export const HEROES: Hero[] = ")[1];

if (!heroBlock) {
  throw new Error("Could not find HEROES in app/data.ts");
}

const heroes = JSON.parse(heroBlock.slice(0, heroBlock.lastIndexOf("]") + 1));
const heroNames = heroes.map((hero) => hero.name);
const heroNameSet = new Set(heroNames);

if (heroNames.length < 100 || heroNameSet.size !== heroNames.length) {
  throw new Error(`Unexpected hero roster: ${heroNames.length} rows, ${heroNameSet.size} unique names`);
}

function slugify(name) {
  return name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[.'’]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/^chang-e$/, "change");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(label, task) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw new Error(`${label}: ${error.message}`);
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
}

/** Counter edges come from the JSON API, which returns every significant pair for the tier. */
async function fetchCounters(heroName, slug, rankTier) {
  const url = `${API_BASE}?heroSlug=${encodeURIComponent(slug)}&rankTier=${rankTier}`;

  return withRetry(`${heroName} counters (${rankTier})`, async () => {
    const response = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "counter-ready-mlbb-data-updater/2.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    if (payload.hero?.name !== heroName) {
      throw new Error(`Expected ${heroName}, received ${payload.hero?.name ?? "no hero"}`);
    }
    if (!Array.isArray(payload.counters)) throw new Error("Missing counters array");

    const counters = new Map();
    for (const row of payload.counters) {
      const candidate = row.hero_a?.name;
      const edge = Number(row.increase_win_rate) * 100;
      if (!heroNameSet.has(candidate) || !Number.isFinite(edge) || edge <= 0) continue;
      counters.set(candidate, edge);
    }
    return counters;
  });
}

/**
 * Synergy has no JSON endpoint, so it is read from the hero page's "Best With" block
 * (top five partners per tier). The page is a React Server Component stream: the payload
 * arrives in self.__next_f.push chunks and defers rows behind "$L<id>" references.
 */
function flightPayload(html) {
  return [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)]
    .map((match) => JSON.parse(match[1]))
    .join("");
}

function resolveFlightRefs(flight) {
  const rows = new Map();
  for (const line of flight.split("\n")) {
    const separator = line.indexOf(":");
    if (separator > 0 && /^[0-9a-f]+$/.test(line.slice(0, separator))) {
      rows.set(line.slice(0, separator), line.slice(separator + 1));
    }
  }

  let text = flight;
  for (let pass = 0; pass < 8; pass += 1) {
    const next = text.replace(/"\$L([0-9a-f]+)"/g, (match, id) => rows.get(id) ?? match);
    if (next === text) break;
    text = next;
  }
  return text;
}

async function fetchHeroPage(heroName, slug, rankTier) {
  const url = `${PAGE_BASE}/${slug}?tier=${rankTier}`;

  return withRetry(`${heroName} page (${rankTier})`, async () => {
    const response = await fetch(url, {
      headers: { Accept: "text/html", "User-Agent": "counter-ready-mlbb-data-updater/2.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = resolveFlightRefs(flightPayload(await response.text()));

    const readStat = (label) => {
      const start = text.indexOf(`"div","${label}",{`);
      if (start < 0) return null;
      const match = text.slice(start, start + 1500).match(/"children":"(\d+(?:\.\d+)?)%"/);
      return match ? Number(match[1]) : null;
    };

    const stats = { wr: readStat("Win Rate"), pr: readStat("Pick Rate"), br: readStat("Ban Rate") };
    if (stats.wr === null) throw new Error("Missing win rate");

    const start = text.indexOf('"children":"Best With"');
    if (start < 0) throw new Error("Missing Best With block");
    const block = text.slice(start, start + 20_000);

    const synergies = new Map();
    for (const match of block.matchAll(/"alt":"([^"]+)","size":36[\s\S]{0,400}?"children":\["\+","(\d+(?:\.\d+)?)","%"\]/g)) {
      const partner = match[1];
      const edge = Number(match[2]);
      if (!heroNameSet.has(partner)) throw new Error(`Unknown synergy partner ${partner}`);
      if (partner === heroName || !Number.isFinite(edge) || edge <= 0) continue;
      synergies.set(partner, edge);
    }

    return { stats, synergies };
  });
}

const counterSamples = new Map();
const synergySamples = new Map();
const statSamples = new Map(heroNames.map((name) => [name, { wr: [], pr: [], br: [] }]));

function pushSample(store, key, value) {
  const bucket = store.get(key);
  if (bucket) bucket.push(value);
  else store.set(key, [value]);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

const jobs = heroNames.flatMap((name) => RANK_TIERS.map((rankTier) => ({ name, rankTier })));
let cursor = 0;
let done = 0;

async function worker() {
  while (cursor < jobs.length) {
    const { name, rankTier } = jobs[cursor];
    cursor += 1;
    const slug = slugify(name);

    const [counters, page] = await Promise.all([
      fetchCounters(name, slug, rankTier),
      fetchHeroPage(name, slug, rankTier),
    ]);

    for (const [candidate, edge] of counters) {
      pushSample(counterSamples, `${name}\t${candidate}`, edge);
    }
    // Synergy is symmetric, so both directions feed one shared bucket.
    for (const [partner, edge] of page.synergies) {
      const pair = name < partner ? `${name}\t${partner}` : `${partner}\t${name}`;
      pushSample(synergySamples, pair, edge);
    }
    const stats = statSamples.get(name);
    for (const key of ["wr", "pr", "br"]) {
      if (page.stats[key] !== null) stats[key].push(page.stats[key]);
    }

    done += 1;
    process.stdout.write(`\rFetched ${done}/${jobs.length} hero-tier pairs`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
process.stdout.write("\n");

const round = (value) => Number(value.toFixed(3));

const countersByEnemy = {};
const synergyByHero = {};
for (const name of heroNames) {
  countersByEnemy[name] = {};
  synergyByHero[name] = {};
}

let clipped = 0;
const clip = (value) => {
  if (value <= MAX_EDGE_PP) return value;
  clipped += 1;
  return MAX_EDGE_PP;
};

for (const [key, samples] of counterSamples) {
  const [enemy, candidate] = key.split("\t");
  countersByEnemy[enemy][candidate] = clip(round(mean(samples)));
}

for (const [key, samples] of synergySamples) {
  const [a, b] = key.split("\t");
  const edge = clip(round(mean(samples)));
  synergyByHero[a][b] = edge;
  synergyByHero[b][a] = edge;
}

const sortDesc = (table) =>
  Object.fromEntries(
    Object.entries(table).map(([name, edges]) => [
      name,
      Object.fromEntries(Object.entries(edges).sort(([, a], [, b]) => b - a)),
    ]),
  );

const sortedCounters = sortDesc(countersByEnemy);
const sortedSynergy = sortDesc(synergyByHero);

const emptyCounters = heroNames.filter((name) => Object.keys(sortedCounters[name]).length === 0);
if (emptyCounters.length > 0) {
  throw new Error(`No counter edges for: ${emptyCounters.join(", ")}`);
}

if (clipped > 0) {
  console.warn(`Clipped ${clipped} edges to the ${MAX_EDGE_PP}pp ceiling.`);
}

const generatedAt = new Date().toISOString();
const snapshot = generatedAt.slice(0, 10);
const tierList = RANK_TIERS.map((tier) => `"${tier}"`).join(", ");
const serialize = (table) =>
  Object.entries(table)
    .map(([name, edges]) => `  ${JSON.stringify(name)}: ${JSON.stringify(edges)},`)
    .join("\n");

const output = `/**
 * Generated Mythic+ matchup and synergy snapshot.
 * Sources: ${API_BASE}?heroSlug=<slug>&rankTier=<tier>
 *          ${PAGE_BASE}/<slug>?tier=<tier> ("Best With" block)
 * Tiers averaged: ${RANK_TIERS.join(", ")}
 * Generated: ${generatedAt}
 *
 * COUNTERS_BY_ENEMY: outer key = enemy hero; nested key = candidate that beats them.
 * SYNERGY_BY_ALLY: symmetric; both heroes list each other with the same edge.
 * Values are win-rate advantage in percentage points, averaged over the tiers that
 * report the pair, and clipped at ${MAX_EDGE_PP}pp so a thin sample cannot dominate.
 * A missing pair means "not reported", which the app treats as 0.
 * Run 'npm run data:update-matchups' to refresh after a patch.
 */
export const MATCHUP_META = {
  rankTiers: [${tierList}] as const,
  generatedAt: "${generatedAt}",
  heroCount: ${heroNames.length},
} as const;

export const COUNTERS_BY_ENEMY: Record<string, Record<string, number>> = {
${serialize(sortedCounters)}
};

export const SYNERGY_BY_ALLY: Record<string, Record<string, number>> = {
${serialize(sortedSynergy)}
};
`;

await writeFile(new URL("../app/matchups.generated.ts", import.meta.url), output);

const roundStat = (values) => (values.length > 0 ? Number(mean(values).toFixed(2)) : null);
let statUpdates = 0;
for (const hero of heroes) {
  const stats = statSamples.get(hero.name);
  for (const key of ["wr", "pr", "br"]) {
    const value = roundStat(stats[key]);
    if (value !== null && value !== hero[key]) {
      hero[key] = value;
      statUpdates += 1;
    }
  }
}

const nextData = dataSource
  .replace(/snapshot: "[^"]*"/, `snapshot: "${snapshot}"`)
  .replace(
    /export const HEROES: Hero\[\] = [\s\S]*;\n$/,
    `export const HEROES: Hero[] = ${JSON.stringify(heroes, null, 2)};\n`,
  );
await writeFile(dataUrl, nextData);

const counterEdges = Object.values(sortedCounters).reduce((sum, edges) => sum + Object.keys(edges).length, 0);
const synergyEdges = Object.values(sortedSynergy).reduce((sum, edges) => sum + Object.keys(edges).length, 0);
console.log(
  `Wrote ${heroNames.length} heroes, ${counterEdges} counter edges, ${synergyEdges} synergy edges ` +
    `(${synergyEdges / 2} unique pairs), and refreshed ${statUpdates} hero stat values for ${snapshot}.`,
);
