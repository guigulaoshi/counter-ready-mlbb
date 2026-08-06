export { COUNTERS_BY_ENEMY, MATCHUP_META } from "./matchups.generated.ts";

import { COUNTERS_BY_ENEMY } from "./matchups.generated.ts";

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
