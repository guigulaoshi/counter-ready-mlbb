import assert from "node:assert/strict";
import test from "node:test";
import { HEROES } from "../app/data.ts";
import {
  COUNTERS_BY_ENEMY,
  MATCHUP_META,
  SYNERGY_BY_ALLY,
  getMatchupEdge,
  getSynergyEdge,
} from "../app/matchups.ts";

const MAX_EDGE_PP = 15;

test("ships a Mythic+ matchup table for every local hero", () => {
  const heroNames = new Set(HEROES.map((hero) => hero.name));
  const enemyNames = Object.keys(COUNTERS_BY_ENEMY);
  const edgeCount = Object.values(COUNTERS_BY_ENEMY)
    .reduce((sum, counters) => sum + Object.keys(counters).length, 0);

  assert.deepEqual([...MATCHUP_META.rankTiers], ["mythic", "honor"]);
  assert.equal(MATCHUP_META.heroCount, HEROES.length);
  assert.equal(enemyNames.length, HEROES.length);
  assert.deepEqual(new Set(enemyNames), heroNames);
  assert.ok(edgeCount > 4_000, `expected a complete matchup snapshot, received ${edgeCount} edges`);

  for (const [enemy, counters] of Object.entries(COUNTERS_BY_ENEMY)) {
    assert.ok(Object.keys(counters).length > 0, `${enemy} has no counters`);
    for (const [candidate, edge] of Object.entries(counters)) {
      assert.ok(heroNames.has(candidate), `${candidate} is not in the local hero roster`);
      assert.ok(edge > 0, `${candidate} vs ${enemy} must be a positive directional edge`);
      assert.ok(edge <= MAX_EDGE_PP, `${candidate} vs ${enemy} exceeds the ${MAX_EDGE_PP}pp ceiling`);
    }
  }
});

test("keeps the selected enemy's counter direction explicit", () => {
  const [enemy, counters] = Object.entries(COUNTERS_BY_ENEMY).find(
    ([name, edges]) => Object.keys(edges).some((candidate) => !COUNTERS_BY_ENEMY[candidate]?.[name]),
  )!;
  const [candidate, edge] = Object.entries(counters).find(
    ([name]) => !COUNTERS_BY_ENEMY[name]?.[enemy],
  )!;

  assert.equal(getMatchupEdge(candidate, enemy), edge);
  assert.equal(getMatchupEdge(enemy, candidate), -edge);
  assert.equal(getMatchupEdge("Sun", "Masha"), 5.165);
  assert.equal(getMatchupEdge("Masha", "Sun"), -5.165);
});

test("ships a symmetric synergy table alongside the counters", () => {
  const heroNames = new Set(HEROES.map((hero) => hero.name));
  const partnerCounts = HEROES.map((hero) => Object.keys(SYNERGY_BY_ALLY[hero.name] ?? {}).length);

  assert.deepEqual(new Set(Object.keys(SYNERGY_BY_ALLY)), heroNames);
  assert.ok(Math.min(...partnerCounts) > 0, "every hero needs at least one measured partner");

  for (const [hero, partners] of Object.entries(SYNERGY_BY_ALLY)) {
    for (const [partner, edge] of Object.entries(partners)) {
      assert.ok(heroNames.has(partner), `${partner} is not in the local hero roster`);
      assert.notEqual(partner, hero, `${hero} cannot be its own partner`);
      assert.ok(edge > 0, `${hero} + ${partner} must be a positive synergy edge`);
      assert.ok(edge <= MAX_EDGE_PP, `${hero} + ${partner} exceeds the ${MAX_EDGE_PP}pp ceiling`);
      assert.equal(SYNERGY_BY_ALLY[partner]?.[hero], edge, `${hero} + ${partner} is not symmetric`);
      assert.equal(getSynergyEdge(hero, partner), edge);
    }
  }
});

test("reports zero for synergy pairs the source never measured", () => {
  const [hero] = HEROES;
  const partners = new Set(Object.keys(SYNERGY_BY_ALLY[hero.name]));
  const stranger = HEROES.find((other) => other.name !== hero.name && !partners.has(other.name))!;

  assert.equal(getSynergyEdge(stranger.name, hero.name), 0);
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
});
