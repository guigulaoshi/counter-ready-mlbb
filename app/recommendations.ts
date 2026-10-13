import type { Hero } from "./data.ts";
import { getMatchupEdge, getSynergyEdge } from "./matchups.ts";

export type Recommendation = Hero & {
  score: number;
  counterScore: number;
  synergyScore: number;
  coverage: number;
  threats: number;
};

const measuredRelationships = { counter: getMatchupEdge, synergy: getSynergyEdge };

/** Score all available lane picks using the same evidence for both lists. */
function scoreCandidates(
  heroes: Hero[],
  enemies: Hero[],
  allies: Hero[],
  lane: string,
  relationships = measuredRelationships,
): Recommendation[] {
  if (!enemies.length && !allies.length) return [];
  const picked = new Set([...enemies, ...allies].map((hero) => hero.name));
  return heroes
    .filter((hero) => !picked.has(hero.name) && hero.lane.includes(lane))
    .map((hero) => {
      const counterEdges = enemies.map((enemy) => relationships.counter(hero.name, enemy.name));
      const synergyEdges = allies.map((ally) => relationships.synergy(hero.name, ally.name));
      const counterScore = enemies.length ? counterEdges.reduce((sum, edge) => sum + edge, 0) / enemies.length : 0;
      const synergyScore = allies.length ? synergyEdges.reduce((sum, edge) => sum + edge, 0) / allies.length : 0;
      return { ...hero, counterScore, synergyScore, score: counterScore + synergyScore,
        coverage: counterEdges.filter((edge) => edge > 0).length,
        threats: counterEdges.filter((edge) => edge < 0).length };
    })
    .filter((hero) => Number.isFinite(hero.score));
}

/** Rank draft fit, not overall win rate. Missing relationships never create a recommendation. */
export function rankRecommendations(...args: Parameters<typeof scoreCandidates>): Recommendation[] {
  return scoreCandidates(...args)
    .filter((hero) => hero.score > 0)
    .sort((a, b) => b.score - a.score || b.coverage - a.coverage || a.name.localeCompare(b.name));
}

/** Most disadvantaged first; unknown pairs and neutral scores are never warnings. */
export function rankAvoids(...args: Parameters<typeof scoreCandidates>): Recommendation[] {
  return scoreCandidates(...args)
    .filter((hero) => hero.score < 0 && hero.threats > 0)
    .sort((a, b) => a.score - b.score || b.threats - a.threats || a.name.localeCompare(b.name));
}
