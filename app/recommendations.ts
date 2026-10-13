import type { Hero } from "./data.ts";
import { getMatchupEdge, getSynergyEdge } from "./matchups.ts";

export type Recommendation = Hero & {
  score: number;
  counterScore: number;
  synergyScore: number;
  coverage: number;
};

const measuredRelationships = { counter: getMatchupEdge, synergy: getSynergyEdge };

/** Rank draft fit, not overall win rate. Missing relationships never create a recommendation. */
export function rankRecommendations(
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
        coverage: counterEdges.filter((edge) => edge > 0).length };
    })
    .filter((hero) => Number.isFinite(hero.score) && hero.score > 0)
    .sort((a, b) => b.score - a.score || b.coverage - a.coverage || a.name.localeCompare(b.name));
}
