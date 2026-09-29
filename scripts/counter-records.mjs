export function isFreshCounter(row, now) {
  const updated = Date.parse(row.updated_at);
  return row.rank_tier === "mythic" && row.time_window === "7d"
    && Number.isFinite(updated) && updated <= now
    && now - updated <= 7 * 24 * 60 * 60 * 1000;
}
