"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DATA_META, HEROES, type Hero } from "./data";
import { COPY, ROLE_LABELS, SPEC_LABELS, type Locale } from "./i18n";
import { getMatchupEdge, getSynergyEdge } from "./matchups";

const LANES = [
  { value: "Exp Lane", zh: "经验路", en: "EXP Lane", short: "EXP", icon: "⚔" },
  { value: "Gold Lane", zh: "金牌路", en: "Gold Lane", short: "GOLD", icon: "◉" },
  { value: "Mid Lane", zh: "中路", en: "Mid Lane", short: "MID", icon: "✦" },
  { value: "Jungle", zh: "打野", en: "Jungle", short: "JUNGLE", icon: "◆" },
  { value: "Roam", zh: "游走", en: "Roam", short: "ROAM", icon: "◇" },
] as const;

const MAX_ENEMIES = 5;
const MAX_ALLIES = 4;

const SHOWCASE_HEROES = ["Miya", "Alucard", "Layla"]
  .map((name) => HEROES.find((hero) => hero.name === name))
  .filter((hero): hero is Hero => Boolean(hero));

type Side = "enemy" | "ally";

type Recommendation = Hero & {
  score: number;
  displayScore: number;
  counterScore: number;
  synergyScore: number;
  directEdges: { enemy: string; edge: number }[];
  threats: { enemy: string; edge: number }[];
  synergies: { ally: string; edge: number }[];
  coverage: number;
  reasons: string[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Both terms are measured win-rate swings in percentage points, so they add directly.
 * Each is a mean rather than a sum: that keeps the counter and synergy terms weighted
 * the same way no matter how many enemies or allies have been locked in so far.
 */
function scoreCandidate(candidate: Hero, enemies: Hero[], allies: Hero[], locale: Locale): Recommendation {
  const directEdges: { enemy: string; edge: number }[] = [];
  const threats: { enemy: string; edge: number }[] = [];
  const synergies: { ally: string; edge: number }[] = [];

  for (const enemy of enemies) {
    const edge = getMatchupEdge(candidate.name, enemy.name);
    if (edge > 0) directEdges.push({ enemy: enemy.name, edge });
    if (edge < 0) threats.push({ enemy: enemy.name, edge: Math.abs(edge) });
  }

  for (const ally of allies) {
    const edge = getSynergyEdge(candidate.name, ally.name);
    if (edge > 0) synergies.push({ ally: ally.name, edge });
  }

  const favorableEdge = directEdges.reduce((sum, item) => sum + item.edge, 0);
  const unfavorableEdge = threats.reduce((sum, item) => sum + item.edge, 0);
  const synergyEdge = synergies.reduce((sum, item) => sum + item.edge, 0);
  const counterScore = enemies.length > 0 ? (favorableEdge - unfavorableEdge) / enemies.length : 0;
  const synergyScore = allies.length > 0 ? synergyEdge / allies.length : 0;
  const score = counterScore + synergyScore;

  const t = COPY[locale];
  const positives = [
    ...directEdges.map((item) => ({ edge: item.edge, text: t.edgeReason(item.enemy, item.edge) })),
    ...synergies.map((item) => ({ edge: item.edge, text: t.synergyReason(item.ally, item.edge) })),
  ].sort((a, b) => b.edge - a.edge);
  const reasons = [
    ...positives.map((item) => item.text),
    ...threats.sort((a, b) => b.edge - a.edge).map((item) => t.threatReason(item.enemy, item.edge)),
    ...(directEdges.length > 1 ? [t.coverageReason(directEdges.length, enemies.length)] : []),
  ];

  return {
    ...candidate,
    score,
    displayScore: Number(score.toFixed(1)),
    counterScore,
    synergyScore,
    directEdges,
    threats,
    synergies,
    coverage: directEdges.length,
    reasons: [...new Set(reasons)].slice(0, 3),
  };
}

function HeroPortrait({ hero, size = "normal" }: { hero: Hero; size?: "small" | "normal" | "large" }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`portrait portrait-${size}`}>
      {!failed ? (
        <img src={hero.img} alt={hero.name} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="portrait-fallback">{hero.name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [enemies, setEnemies] = useState<Hero[]>([]);
  const [allies, setAllies] = useState<Hero[]>([]);
  const [target, setTarget] = useState<Side>("enemy");
  const [lane, setLane] = useState<(typeof LANES)[number]["value"]>("Exp Lane");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const t = COPY[locale];
  const roleLabels = ROLE_LABELS[locale];
  const specLabels = SPEC_LABELS[locale];

  useEffect(() => {
    const savedLocale = localStorage.getItem("counter-ready-locale") as Locale | null;
    const browserLocale: Locale = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    const nextLocale = savedLocale === "zh" || savedLocale === "en" ? savedLocale : browserLocale;
    const localeTimer = window.setTimeout(() => setLocale(nextLocale), 0);
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(localeTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    localStorage.setItem("counter-ready-locale", nextLocale);
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
  };

  const addTo = (limit: number) => (current: Hero[], hero: Hero) =>
    current.length >= limit ? [...current.slice(1), hero] : [...current, hero];

  /** One grid feeds both lineups: a picked hero is removed, a new hero joins the active side. */
  const selectHero = (hero: Hero) => {
    if (enemies.some((item) => item.name === hero.name)) {
      setEnemies((current) => current.filter((item) => item.name !== hero.name));
    } else if (allies.some((item) => item.name === hero.name)) {
      setAllies((current) => current.filter((item) => item.name !== hero.name));
    } else if (target === "enemy") {
      setEnemies((current) => addTo(MAX_ENEMIES)(current, hero));
    } else {
      setAllies((current) => addTo(MAX_ALLIES)(current, hero));
    }
    setQuery("");
  };

  const heroList = useMemo(() => {
    const cleanQuery = normalize(query);
    return HEROES.filter((hero) => role === "All" || hero.role.includes(role))
      .filter((hero) => !cleanQuery || normalize(hero.name).includes(cleanQuery) || hero.name.split(/\s|-/).map((part) => part[0]).join("").toLowerCase().includes(cleanQuery))
      .sort((a, b) => b.pr - a.pr);
  }, [query, role]);

  const visibleHeroes = query || showAll ? heroList : heroList.slice(0, 28);

  const recommendations = useMemo(
    () => HEROES.filter((hero) => !enemies.some((enemy) => enemy.name === hero.name))
      .filter((hero) => !allies.some((ally) => ally.name === hero.name))
      .filter((hero) => hero.lane.includes(lane))
      .map((hero) => scoreCandidate(hero, enemies, allies, locale))
      .filter((hero) => (hero.coverage > 0 || hero.synergies.length > 0) && hero.score > 0)
      .sort((a, b) => b.score - a.score || b.coverage - a.coverage),
    [enemies, allies, lane, locale],
  );

  const best = recommendations[0];
  const laneMeta = LANES.find((item) => item.value === lane)!;

  const shareResult = async () => {
    const laneLabel = locale === "zh" ? laneMeta.zh : laneMeta.en;
    const separator = locale === "zh" ? "、" : ", ";
    const enemyNames = enemies.map((enemy) => enemy.name).join(separator);
    const allyNames = allies.map((ally) => ally.name).join(separator);
    if (!best) return;
    const text = t.share(DATA_META.patch, best.name, laneLabel, enemyNames, allyNames, best.displayScore);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const renderSlots = (side: Side) => {
    const picks = side === "enemy" ? enemies : allies;
    const limit = side === "enemy" ? MAX_ENEMIES : MAX_ALLIES;
    return (
      <div
        className={`enemy-slots slots-${side} ${target === side ? "targeted" : ""}`}
        aria-label={side === "enemy" ? t.selectedLineupLabel : t.selectedAllyLabel}
      >
        {Array.from({ length: limit }, (_, index) => {
          const selected = picks[index];
          return selected ? (
            <button type="button" className="enemy-slot filled" key={selected.id} onClick={() => selectHero(selected)} aria-label={t.cancelHero(selected.name)}>
              <span className="slot-number">{index + 1}</span>
              <HeroPortrait hero={selected} size="small" />
              <span className="slot-name">{selected.name}</span>
              <span className="slot-remove">×</span>
            </button>
          ) : (
            <button type="button" className="enemy-slot empty" key={`empty-${index}`} onClick={() => setTarget(side)}>
              <span className="slot-number">{index + 1}</span>
              <span className="slot-plus">＋</span>
              <span className="slot-name">{side === "enemy" ? t.pending : t.allyPending}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={t.homeLabel}>
          <span className="brand-mark">ML</span>
          <span>
            <strong>MOBILE LEGENDS</strong>
            <small>BANG BANG · {t.brandSubtitle}</small>
          </span>
        </a>
        <div className="top-actions">
          <div className="meta-strip">
            <span className="live-dot" aria-hidden="true" />
            <span>{DATA_META.season}</span>
            <b>PATCH {DATA_META.patch}</b>
            <b className="rank-meta">{DATA_META.rank}</b>
            <span className="meta-date">{t.data} {DATA_META.snapshot}</span>
          </div>
          <div className="language-switch" aria-label="Language">
            <button type="button" className={locale === "zh" ? "active" : ""} onClick={() => changeLocale("zh")} aria-pressed={locale === "zh"}>中</button>
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => changeLocale("en")} aria-pressed={locale === "en"}>EN</button>
          </div>
        </div>
      </header>

      <section className="game-hero" id="top">
        <div className="hero-copy">
          <div className="game-overline">
            <span className="game-chip">MLBB</span>
            <span>{t.unofficial}</span>
          </div>
          <h1 className="game-name">Mobile Legends <span>Bang Bang</span></h1>
          <h2 className="hero-promise">{t.introLead}<em>{t.introAccent}</em></h2>
          <p>{t.introDescription}</p>
          <div className="hero-facts">
            <span><b>MYTHIC+</b>{t.matchupOnly}</span>
            <span><b>5 + 4</b>{t.enemyFact}</span>
            <span><b>{DATA_META.patch}</b>{t.patchFact}</span>
          </div>
        </div>
        <div className="hero-roster" aria-hidden="true">
          <div className="roster-glow" />
          {SHOWCASE_HEROES.map((hero, index) => (
            <div className={`showcase-hero showcase-${index + 1}`} key={hero.id}>
              <HeroPortrait hero={hero} size="large" />
              <span>{hero.name}</span>
            </div>
          ))}
          <div className="counter-stamp"><small>MLBB</small><b>COUNTER<br />READY</b></div>
        </div>
      </section>

      <div className="workspace">
        <section className="picker-panel" aria-labelledby="enemy-heading">
          <div className="step-heading">
            <span className="step-number">01</span>
            <div>
              <h2 id="enemy-heading">{t.enemyTitle}</h2>
              <p>{t.enemyHelp}</p>
            </div>
            <div className="current-enemy current-lineup">
              <span>{t.enemyLineup}</span>
              <div className="mini-stack">
                {enemies.map((enemy) => <HeroPortrait hero={enemy} size="small" key={enemy.id} />)}
              </div>
              <b>{enemies.length}/{MAX_ENEMIES}</b>
            </div>
          </div>

          {renderSlots("enemy")}

          <div className="step-heading ally-heading">
            <span className="step-number">02</span>
            <div>
              <h2>{t.allyTitle}</h2>
              <p>{t.allyHelp}</p>
            </div>
            <div className="current-enemy current-lineup">
              <span>{t.allyLineup}</span>
              <div className="mini-stack">
                {allies.map((ally) => <HeroPortrait hero={ally} size="small" key={ally.id} />)}
              </div>
              <b>{allies.length}/{MAX_ALLIES}</b>
            </div>
          </div>

          {renderSlots("ally")}

          <div className="pick-target" aria-label={t.pickTargetLabel}>
            <button type="button" className={target === "enemy" ? "active enemy" : ""} onClick={() => setTarget("enemy")} aria-pressed={target === "enemy"}>
              {t.pickEnemy}
            </button>
            <button type="button" className={target === "ally" ? "active ally" : ""} onClick={() => setTarget("ally")} aria-pressed={target === "ally"}>
              {t.pickAlly}
            </button>
          </div>

          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              autoComplete="off"
              aria-label={t.searchLabel}
            />
            {query ? <button onClick={() => setQuery("")} type="button" aria-label={t.clearSearch}>×</button> : <kbd>/</kbd>}
          </label>

          <div className="role-filters" aria-label={t.roleFilter}>
            {Object.entries(roleLabels).map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={role === value ? "active" : ""}
                onClick={() => setRole(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hero-grid" aria-live="polite">
            {visibleHeroes.map((hero) => {
              const enemyIndex = enemies.findIndex((enemy) => enemy.name === hero.name);
              const allyIndex = allies.findIndex((ally) => ally.name === hero.name);
              const pickIndex = enemyIndex >= 0 ? enemyIndex : allyIndex;
              const side = enemyIndex >= 0 ? "enemy" : allyIndex >= 0 ? "ally" : null;
              return (
                <button
                  type="button"
                  className={`hero-tile ${side ? `selected selected-${side}` : ""}`}
                  key={hero.id}
                  onClick={() => selectHero(hero)}
                  aria-pressed={pickIndex >= 0}
                >
                  <HeroPortrait hero={hero} />
                  <span>{hero.name}</span>
                  {pickIndex >= 0 && <i className={`pick-order pick-${side}`}>{pickIndex + 1}</i>}
                </button>
              );
            })}
          </div>

          {!query && heroList.length > 28 && (
            <button className="show-all" type="button" onClick={() => setShowAll((value) => !value)}>
              {showAll ? t.collapseHeroes : t.showAllHeroes(heroList.length)}
              <span>{showAll ? "↑" : "↓"}</span>
            </button>
          )}

          <div className="lane-section">
            <div className="step-heading compact">
              <span className="step-number">03</span>
              <div>
                <h2>{t.laneTitle}</h2>
                <p>{t.laneHelp}</p>
              </div>
            </div>
            <div className="lane-grid">
              {LANES.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={lane === item.value ? "active" : ""}
                  onClick={() => setLane(item.value)}
                  aria-pressed={lane === item.value}
                >
                  <span className="lane-icon">{item.icon}</span>
                  <strong>{locale === "zh" ? item.zh : item.en}</strong>
                  <small>{item.short}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="result-panel" aria-labelledby="result-heading">
          <div className="result-kicker">
            <span className="pulse" />
            {t.calculating}
            <span>{t.compared(recommendations.length, enemies.length, allies.length)}</span>
          </div>

          <div className="matchup-line">
            <div className="enemy-summary">
              <div className="result-enemy-stack">
                {enemies.map((enemy) => <HeroPortrait hero={enemy} size="small" key={enemy.id} />)}
              </div>
              <span><small>{t.enemyLineup}</small><b>{t.heroesCount(enemies.length)}</b></span>
            </div>
            <i>VS</i>
            <div className="ally-summary">
              <div className="result-enemy-stack">
                {allies.map((ally) => <HeroPortrait hero={ally} size="small" key={ally.id} />)}
              </div>
              <span><small>{t.allyLineup}</small><b>{t.heroesCount(allies.length)}</b></span>
            </div>
          </div>

          <div className="matchup-line lane-line">
            <span><small>{t.yourLane}</small><b>{locale === "zh" ? laneMeta.zh : laneMeta.en}</b></span>
            <span className="lane-badge">{laneMeta.icon}</span>
          </div>

          {best ? <div className="best-card">
            <div className="best-label">{t.bestCounter}</div>
            <div className="best-hero">
              <HeroPortrait hero={best} size="large" />
              <div className="best-name">
                <h2 id="result-heading">{best.name}</h2>
                <p>{best.role.map((item) => roleLabels[item] ?? item).join(" · ")}</p>
                <div className="trait-row">
                  {best.spec.map((item) => <span key={item}>{specLabels[item] ?? item}</span>)}
                </div>
              </div>
              <div className="score-ring">
                <strong>+{best.displayScore.toFixed(1)}</strong>
                <small>{t.score}</small>
              </div>
            </div>

            <ul className="reason-list">
              {best.reasons.map((reason, index) => (
                <li key={reason}><span>{index + 1}</span>{reason}</li>
              ))}
            </ul>

            <div className="stat-row">
              <div><span>{t.counterEdge}</span><b>{best.counterScore >= 0 ? "+" : ""}{best.counterScore.toFixed(1)}pp</b></div>
              <div><span>{t.synergyEdge}</span><b>+{best.synergyScore.toFixed(1)}pp</b></div>
              <div><span>{t.counterCoverage}</span><b>{best.coverage}/{enemies.length}</b></div>
              <div><span>{t.reverseThreats}</span><b>{best.threats.length}</b></div>
            </div>
          </div> : <div className="best-card no-data"><h2 id="result-heading">{t.noCounterTitle}</h2><p>{t.noCounterHelp}</p></div>}

          <div className="alternatives-heading">
            <h3>{t.alternatives}</h3>
            <span>{t.sortExplanation}</span>
          </div>

          <div className="alternatives">
            {recommendations.slice(1, 10).map((hero, index) => (
              <div className="alternative-card" key={hero.id}>
                <span className="rank">{String(index + 2).padStart(2, "0")}</span>
                <HeroPortrait hero={hero} size="small" />
                <div>
                  <b>{hero.name}</b>
                  <small>{t.matchupSummary(hero.directEdges.length, hero.synergies.length, hero.displayScore)}</small>
                </div>
                <strong>{hero.displayScore.toFixed(1)}</strong>
              </div>
            ))}
          </div>

          <button className="copy-button" type="button" onClick={shareResult} disabled={!best}>
            <span>{copied ? "✓" : "＋"}</span>
            {copied ? t.copied : t.copy}
          </button>

          <p className="formula-note">
            <b>{t.formulaTitle}</b>
            {t.formulaBody}
          </p>

          <p className="disclaimer">
            {t.disclaimer}
          </p>
        </aside>
      </div>
    </main>
  );
}
