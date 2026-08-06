import assert from "node:assert/strict";
import test from "node:test";
import { HEROES } from "../app/data.ts";
import { COUNTERS_BY_ENEMY, MATCHUP_META, getMatchupEdge } from "../app/matchups.ts";

test("ships a Mythic matchup table for every local hero", () => {
  const heroNames = new Set(HEROES.map((hero) => hero.name));
  const enemyNames = Object.keys(COUNTERS_BY_ENEMY);
  const edgeCount = Object.values(COUNTERS_BY_ENEMY)
    .reduce((sum, counters) => sum + Object.keys(counters).length, 0);

  assert.equal(MATCHUP_META.rankTier, "mythic");
  assert.equal(MATCHUP_META.heroCount, HEROES.length);
  assert.equal(enemyNames.length, HEROES.length);
  assert.deepEqual(new Set(enemyNames), heroNames);
  assert.ok(edgeCount > 4_000, `expected a complete matchup snapshot, received ${edgeCount} edges`);

  for (const [enemy, counters] of Object.entries(COUNTERS_BY_ENEMY)) {
    assert.ok(Object.keys(counters).length > 0, `${enemy} has no counters`);
    for (const [candidate, edge] of Object.entries(counters)) {
      assert.ok(heroNames.has(candidate), `${candidate} is not in the local hero roster`);
      assert.ok(edge > 0, `${candidate} vs ${enemy} must be a positive directional edge`);
    }
  }
});

test("keeps the selected enemy's counter direction explicit", () => {
  assert.equal(getMatchupEdge("Sun", "Masha"), 5.725);
  assert.equal(getMatchupEdge("Masha", "Sun"), -5.725);
  assert.equal(getMatchupEdge("Natan", "Sun"), 4.66);
});

test("X.Borg has measured counters available in every lane", () => {
  const lanes = ["Exp Lane", "Gold Lane", "Mid Lane", "Jungle", "Roam"];
  const counters = COUNTERS_BY_ENEMY["X.Borg"];

  assert.ok(counters);
  assert.ok(Object.keys(counters).length >= 40);
  for (const lane of lanes) {
    const laneCounters = HEROES.filter((hero) => hero.lane.includes(lane) && counters[hero.name] > 0);
    assert.ok(laneCounters.length > 0, `X.Borg should have a ${lane} counter`);
  }
  assert.equal(getMatchupEdge("Lunox", "X.Borg"), 4.795);
  assert.equal(getMatchupEdge("Kimmy", "X.Borg"), 3.12);
});
