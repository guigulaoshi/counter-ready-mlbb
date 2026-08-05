/**
 * Directional matchup edges in percentage points.
 *
 * The outer key is the ENEMY hero. Each nested hero is a recommended pick
 * that beats that enemy. Keeping the direction explicit prevents the common
 * "counter" / "countered by" inversion.
 */
export const COUNTERS_BY_ENEMY: Record<string, Record<string, number>> = {
  Miya: { Belerick: 3.2, Gatotkaca: 2.5, Thamuz: 1.7 },
  Hanabi: { Lolita: 3.3, Beatrix: 3.2, Joy: 2.5 },
  Eudora: { Barats: 2.8, Atlas: 2.8, Masha: 2.4 },
  Lesley: { Sun: 3.5, Estes: 3.3, Gloo: 2.9 },
  Vexana: { Alice: 2.6, Natalia: 2.1, Marcel: 2.1 },
  Tigreal: { Alice: 4.0, Diggie: 3.7, "X.Borg": 2.7 },
  Dyrroth: { Nana: 1.9, Johnson: 1.9, Argus: 1.7 },
  Angela: { Lolita: 3.7, Franco: 2.6, Masha: 2.3 },
  Zetian: { Valentina: 2.5, Harith: 2.0, Floryn: 2.0 },
  "Yi Sun-shin": { Uranus: 2.4, Karina: 1.7, Aamon: 1.5 },
  Gord: { Natalia: 3.1, Helcurt: 2.4, Ling: 2.0 },
  Belerick: { Lesley: 3.2, "X.Borg": 2.9, Brody: 2.8 },
  Nana: { Gloo: 2.5, Hylos: 2.1, Atlas: 2.0 },
  Sun: {
    Natan: 5.2,
    Joy: 4.4,
    Aldous: 4.4,
    Ruby: 4.2,
    Faramis: 4.2,
    Alucard: 3.6,
    Aulus: 3.2,
    Kimmy: 3.0,
    Suyou: 2.9,
    Karina: 2.5,
    Lukas: 2.3,
    Kagura: 2.0,
    Badang: 1.8,
    Khaleed: 1.8,
    Zetian: 1.3,
  },
  Masha: { Argus: 5.0, Sun: 4.2, Uranus: 3.3 },
  Gusion: { Lolita: 2.6, Roger: 1.8, Khufra: 1.7 },
  Paquito: { Esmeralda: 3.4, Chip: 2.7, Khufra: 2.3 },
  Granger: { Fanny: 3.2, Hilda: 2.9, Obsidia: 2.1 },
  Guinevere: { Masha: 3.8, Diggie: 3.1, Wanwan: 3.0 },
  Chou: { Phoveus: 2.3, Cyclops: 2.1, Esmeralda: 2.1 },
  Layla: { Atlas: 3.7, Sun: 3.5, Johnson: 3.3 },
  Cyclops: { Lolita: 9.6 },
  Lolita: { Esmeralda: 5.8 },
  Wanwan: { Phoveus: 5.2 },
  Terizla: { "X.Borg": 4.8 },
  Freya: { Phoveus: 4.7 },
};

/** Positive means candidate beats enemy; negative means enemy beats candidate. */
export function getMatchupEdge(candidate: string, enemy: string): number {
  const favorable = COUNTERS_BY_ENEMY[enemy]?.[candidate] ?? 0;
  const unfavorable = COUNTERS_BY_ENEMY[candidate]?.[enemy] ?? 0;
  return favorable - unfavorable;
}
