import { readFile, writeFile } from "node:fs/promises";

const API_BASE = "https://mlbb.tools/api/counter";
const RANK_TIER = "mythic";
const CONCURRENCY = 5;
const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 750;

const dataSource = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
const heroBlock = dataSource.split("export const HEROES: Hero[] = [")[1];

if (!heroBlock) {
  throw new Error("Could not find HEROES in app/data.ts");
}

const heroNames = [...heroBlock.matchAll(/^[ ]{4}"name": "([^"]+)",$/gm)].map((match) => match[1]);
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
    .replace(/^change$/, "change")
    .replace(/^x-borg$/, "x-borg");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchMatchups(heroName) {
  const slug = slugify(heroName).replace(/^chang-e$/, "change");
  const url = `${API_BASE}?heroSlug=${encodeURIComponent(slug)}&rankTier=${RANK_TIER}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "counter-ready-mlbb-data-updater/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      if (payload.hero?.name !== heroName) {
        throw new Error(`Expected ${heroName}, received ${payload.hero?.name ?? "no hero"}`);
      }
      if (!Array.isArray(payload.counters)) {
        throw new Error("Missing counters array");
      }

      const counters = {};
      for (const row of payload.counters) {
        const candidate = row.hero_a?.name;
        const edge = Number(row.increase_win_rate) * 100;
        if (!heroNameSet.has(candidate) || !Number.isFinite(edge) || edge <= 0) continue;
        counters[candidate] = Number(edge.toFixed(3));
      }

      if (Object.keys(counters).length === 0) {
        throw new Error("No positive Mythic matchup edges returned");
      }

      return {
        name: heroName,
        counters: Object.fromEntries(
          Object.entries(counters).sort(([, a], [, b]) => b - a),
        ),
      };
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`${heroName} (${slug}): ${error.message}`);
      }
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
}

const results = new Array(heroNames.length);
let cursor = 0;

async function worker() {
  while (cursor < heroNames.length) {
    const index = cursor;
    cursor += 1;
    results[index] = await fetchMatchups(heroNames[index]);
    process.stdout.write(`\rFetched ${results.filter(Boolean).length}/${heroNames.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
process.stdout.write("\n");

const generatedAt = new Date().toISOString();
const rows = results.map(({ name, counters }) => `  ${JSON.stringify(name)}: ${JSON.stringify(counters)},`);
const output = `/**
 * Generated Mythic-rank matchup snapshot.
 * Source: ${API_BASE}?heroSlug=<slug>&rankTier=${RANK_TIER}
 * Generated: ${generatedAt}
 *
 * Direction: outer key = enemy hero; nested key = candidate that beats them.
 * Values are matchup win-rate advantage in percentage points.
 * Run \`npm run data:update-matchups\` to refresh after a patch.
 */
export const MATCHUP_META = {
  rankTier: "${RANK_TIER}",
  generatedAt: "${generatedAt}",
  heroCount: ${heroNames.length},
} as const;

export const COUNTERS_BY_ENEMY: Record<string, Record<string, number>> = {
${rows.join("\n")}
};
`;

await writeFile(new URL("../app/matchups.generated.ts", import.meta.url), output);

const edgeCount = results.reduce((sum, result) => sum + Object.keys(result.counters).length, 0);
console.log(`Wrote ${heroNames.length} enemy heroes and ${edgeCount} positive Mythic matchup edges.`);
