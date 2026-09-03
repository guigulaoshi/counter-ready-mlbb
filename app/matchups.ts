export { COUNTERS_BY_ENEMY, SYNERGY_BY_ALLY, MATCHUP_META } from "./matchups.generated.ts";

import { COUNTERS_BY_ENEMY, SYNERGY_BY_ALLY } from "./matchups.generated.ts";

/**
 * Positive means the selected enemy's own dataset lists the candidate as a
 * counter. Only fall back to the reverse direction when no direct edge exists.
 */
export function getMatchupEdge(candidate: string, enemy: string): number {
  const favorable = COUNTERS_BY_ENEMY[enemy]?.[candidate] ?? 0;
  if (favorable > 0) return favorable;

  const unfavorable = COUNTERS_BY_ENEMY[candidate]?.[enemy] ?? 0;
  return unfavorable > 0 ? -unfavorable : 0;
}

/**
 * Synergy is symmetric and only ever positive: the source publishes each hero's
 * best partners, never its worst ones, so a missing pair means "not reported".
 */
export function getSynergyEdge(candidate: string, ally: string): number {
  return SYNERGY_BY_ALLY[ally]?.[candidate] ?? 0;
}
