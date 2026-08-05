import assert from "node:assert/strict";
import test from "node:test";
import { getMatchupEdge } from "../app/matchups.ts";

test("keeps counter direction explicit for Sun and Masha", () => {
  assert.equal(getMatchupEdge("Sun", "Masha"), 4.2);
  assert.equal(getMatchupEdge("Masha", "Sun"), -4.2);
});

test("returns the measured counter edge from candidate to enemy", () => {
  assert.equal(getMatchupEdge("Aldous", "Sun"), 4.4);
  assert.equal(getMatchupEdge("Sun", "Aldous"), -4.4);
  assert.equal(getMatchupEdge("Natan", "Sun"), 5.2);
});
