import assert from "node:assert/strict";
import test from "node:test";
import { HEROES, type Hero } from "../app/data.ts";
import { rankRecommendations } from "../app/recommendations.ts";
import { getMatchupEdge } from "../app/matchups.ts";

const hero = (name: string, wr = 50, lane = "Exp Lane"): Hero => ({
  id: name.charCodeAt(0), name, wr, lane: [lane], img: "", role: [], spec: [], pr: 0, br: 0,
});
const a = hero("A", 40), b = hero("B", 70), enemy = hero("Enemy"), other = hero("Other"), ally = hero("Ally");
const counterTable: Record<string, Record<string, number>> = {
  Enemy: { A: 6, B: 2 }, Other: { A: -4, B: 5 },
};
const relationships = {
  counter: (candidate: string, opponent: string) =>
    (counterTable[opponent]?.[candidate] ?? 0),
  synergy: (candidate: string, partner: string) => partner === "Ally" && candidate === "B" ? 8 : 0,
};
const rank = (enemies: Hero[], allies: Hero[] = [], candidates = [a, b]) =>
  rankRecommendations(candidates, enemies, allies, "Exp Lane", relationships);

test("recommends the stronger counter even with a lower overall win rate", () => {
  assert.deepEqual(rank([enemy]).map(h => h.name), ["A", "B"]);
  const changedRates = [a, b].map(h => ({ ...h, wr: 100 - h.wr, pr: 100, br: 100 }));
  assert.deepEqual(rank([enemy], [], changedRates).map(h => h.name), ["A", "B"]);
});

test("changing enemy picks changes the top recommendation and removes reverse-countered picks", () => {
  assert.equal(rank([enemy])[0].name, "A");
  assert.deepEqual(rank([other]).map(h => h.name), ["B"]);
});

test("ally synergy changes ranking, including when only allies are selected", () => {
  assert.equal(rank([enemy], [ally])[0].name, "B");
  assert.deepEqual(rank([], [ally]).map(h => h.name), ["B"]);
});

test("averages the full lineup, subtracting reverse counters and retaining unknown pairs in the denominator", () => {
  const results = rank([enemy, other, hero("Unknown")], [ally, hero("UnknownAlly")]);
  const resultA = results.find(h => h.name === "A")!;
  const resultB = results.find(h => h.name === "B")!;
  assert.equal(resultA.counterScore, (6 - 4) / 3);
  assert.equal(resultB.counterScore, (2 + 5) / 3);
  assert.equal(resultB.synergyScore, 8 / 2);
  assert.equal(resultB.score, 7 / 3 + 4);
});

test("excludes wrong lanes and heroes locked in by either team", () => {
  assert.deepEqual(rank([enemy, a], [b], [a, b, hero("A", 99, "Mid Lane")]), []);
  assert.deepEqual(rank([enemy], [], [hero("A", 99, "Mid Lane")]), []);
});

test("no picks or no positive evidence produces no win-rate fallback", () => {
  assert.deepEqual(rank([]), []);
  assert.deepEqual(rank([hero("Unknown")]), []);
  assert.deepEqual(rank([other], [], [a]), []);
  assert.deepEqual(rank([enemy, other], [], [hero("Unknown", 99)]), []);
});

test("ties never use global win rate", () => {
  const ties = { counter: () => 2, synergy: () => 0 };
  assert.deepEqual(rankRecommendations([b, a], [enemy], [], "Exp Lane", ties).map(h => h.name), ["A", "B"]);
});

test("real snapshot rankings use the selected enemy's signed matchup relationships", () => {
  const selected = HEROES.find(h => h.name === "X.Borg")!;
  const result = rankRecommendations(HEROES, [selected], [], "Exp Lane");
  assert.ok(result.length > 0);
  for (const [index, candidate] of result.entries()) {
    assert.equal(candidate.score, getMatchupEdge(candidate.name, selected.name));
    assert.ok(candidate.score > 0);
    if (index) assert.ok(result[index - 1].score >= candidate.score);
  }
});
