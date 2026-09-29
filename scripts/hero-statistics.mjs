export const STATS_URL = "https://mlbb.io/api/hero/filtered-statistics?rankId=4&timeframeId=3";
export const MAX_SOURCE_AGE_MS = 48 * 60 * 60 * 1000;

// MLBB.io's public rank selector maps 4 to Mythic and timeframe 3 to Past 7 days.
// Validate the response too: an ignored query must not silently import ALL / 1 day.
export function parseHeroStatistics(payload, heroes, now = Date.now()) {
  if (payload.success !== true || !Array.isArray(payload.data?.heroes)) {
    throw new Error("Missing Mythic seven-day hero statistics");
  }
  const updatedAt = payload.data.lastUpdated;
  const validateDate = (value) => {
    const timestamp = Date.parse(value);
    if (!Number.isFinite(timestamp) || timestamp > now || now - timestamp > MAX_SOURCE_AGE_MS) {
      throw new Error(`Missing or stale statistics source date: ${value}`);
    }
  };
  validateDate(updatedAt);
  const rows = new Map();
  for (const row of payload.data.heroes) {
    if (row.rank_name !== "Mythic" || row.timeframe_name !== "Past 7 days") {
      throw new Error(`Wrong statistics scope for ${row.hero_name}: ${row.rank_name}, ${row.timeframe_name}`);
    }
    validateDate(row.created_at);
    if (rows.has(row.hero_id)) throw new Error(`Duplicate statistics for hero ${row.hero_id}`);
    for (const key of ["win_rate", "pick_rate", "ban_rate"]) {
      if (typeof row[key] !== "number" || !Number.isFinite(row[key]) || row[key] < 0 || row[key] > 100) {
        throw new Error(`Invalid ${key} for ${row.hero_name}`);
      }
    }
    rows.set(row.hero_id, row);
  }
  const stats = new Map(heroes.map((hero) => {
    const row = rows.get(hero.id);
    if (!row || row.hero_name !== hero.name) throw new Error(`Missing or mismatched statistics for ${hero.name}`);
    return [hero.name, { wr: row.win_rate, pr: row.pick_rate, br: row.ban_rate }];
  }));
  return { stats, updatedAt };
}
