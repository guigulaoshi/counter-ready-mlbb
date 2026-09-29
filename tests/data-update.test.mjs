import assert from "node:assert/strict";
import test from "node:test";
import { parseHeroStatistics, STATS_URL } from "../scripts/hero-statistics.mjs";
import { isFreshCounter } from "../scripts/counter-records.mjs";

const now = Date.parse("2026-09-29T02:00:00Z");
const heroes = [{ id: 88, name: "Masha" }];
const fixture = () => ({ success: true, data: {
  lastUpdated: "2026-09-28T23:03:57.000Z",
  heroes: [{ hero_id: 88, hero_name: "Masha", rank_name: "Mythic", timeframe_name: "Past 7 days",
    created_at: "2026-09-28T23:03:57.000Z", win_rate: 58.35, pick_rate: 1, ban_rate: 38.43 }],
} });

test("requests Mythic seven-day stats and retains source precision and date", () => {
  const url = new URL(STATS_URL);
  assert.equal(url.searchParams.get("rankId"), "4");
  assert.equal(url.searchParams.get("timeframeId"), "3");
  const result = parseHeroStatistics(fixture(), heroes, now);
  assert.deepEqual(result.stats.get("Masha"), { wr: 58.35, pr: 1, br: 38.43 });
  assert.equal(result.updatedAt, "2026-09-28T23:03:57.000Z");
});

test("rejects other ranks and timeframes rather than accepting API defaults", () => {
  for (const change of [{ rank_name: "Mythical Honor" }, { rank_name: "ALL" }, { timeframe_name: "Past 1 day" }]) {
    const payload = fixture();
    Object.assign(payload.data.heroes[0], change);
    assert.throws(() => parseHeroStatistics(payload, heroes, now), /Wrong statistics scope/);
  }
});

test("freshly fetching stale statistics cannot make them current", () => {
  for (const date of ["2026-09-20T23:03:57Z", "2026-09-30T00:00:00Z", null, "invalid"]) {
    const payload = fixture();
    payload.data.heroes[0].created_at = date;
    assert.throws(() => parseHeroStatistics(payload, heroes, now), /source date/);
  }
  const payload = fixture();
  payload.data.lastUpdated = "2026-09-20T23:03:57Z";
  assert.throws(() => parseHeroStatistics(payload, heroes, now), /source date/);
});

test("rejects incomplete and invalid statistics instead of retaining old values", () => {
  const missing = fixture();
  missing.data.heroes = [];
  assert.throws(() => parseHeroStatistics(missing, heroes, now), /Missing or mismatched/);
  const invalid = fixture();
  invalid.data.heroes[0].win_rate = null;
  assert.throws(() => parseHeroStatistics(invalid, heroes, now), /Invalid win_rate/);
});

test("seven-day counter labels cannot bypass rank and source-age checks", () => {
  const row = { rank_tier: "mythic", time_window: "7d", updated_at: "2026-09-28T00:00:00Z" };
  assert.equal(isFreshCounter(row, now), true);
  for (const change of [
    { rank_tier: "honor" }, { time_window: "1d" }, { updated_at: null },
    { updated_at: "2026-03-04T00:51:06Z" }, { updated_at: "2026-09-30T00:00:00Z" },
  ]) assert.equal(isFreshCounter({ ...row, ...change }, now), false);
  assert.equal(isFreshCounter({ ...row, updated_at: "2026-09-22T02:00:00Z" }, now), true);
  assert.equal(isFreshCounter({ ...row, updated_at: "2026-09-22T01:59:59Z" }, now), false);
});
