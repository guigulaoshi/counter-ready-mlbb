"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DATA_META, HEROES, type Hero } from "./data";
import { COPY, ROLE_LABELS, type Locale } from "./i18n";
import { getMatchupEdge, getSynergyEdge } from "./matchups";
import { rankRecommendations } from "./recommendations";

const LANES = [
  { value: "Exp Lane", zh: "经验路", en: "EXP Lane", short: "EXP", icon: "⚔" },
  { value: "Gold Lane", zh: "金牌路", en: "Gold Lane", short: "GOLD", icon: "◉" },
  { value: "Mid Lane", zh: "中路", en: "Mid Lane", short: "MID", icon: "✦" },
  { value: "Jungle", zh: "打野", en: "Jungle", short: "JUNGLE", icon: "◆" },
  { value: "Roam", zh: "游走", en: "Roam", short: "ROAM", icon: "◇" },
] as const;

const MAX_ENEMIES = 5;
const MAX_ALLIES = 4;

type Side = "enemy" | "ally";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchupReasons(candidate: Hero, enemies: Hero[], allies: Hero[], locale: Locale) {
  const t = COPY[locale];
  const reasons: { edge: number; text: string }[] = [];
  for (const enemy of enemies) {
    const edge = getMatchupEdge(candidate.name, enemy.name);
    if (edge > 0) reasons.push({ edge, text: t.edgeReason(enemy.name, edge) });
    if (edge < 0) reasons.push({ edge: Math.abs(edge), text: t.threatReason(enemy.name, Math.abs(edge)) });
  }
  for (const ally of allies) {
    const edge = getSynergyEdge(candidate.name, ally.name);
    if (edge > 0) reasons.push({ edge, text: t.synergyReason(ally.name, edge) });
  }
  return reasons.sort((a, b) => b.edge - a.edge).map((item) => item.text);
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
  const [inspectedHero, setInspectedHero] = useState<string | null>(null);
  const rankingRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const t = COPY[locale];
  const roleLabels = ROLE_LABELS[locale];

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

  const rankedHeroes = useMemo(
    () => rankRecommendations(HEROES, enemies, allies, lane),
    [enemies, allies, lane],
  );
  const inspected = rankedHeroes.find((hero) => hero.name === inspectedHero);
  const reasons = inspected ? matchupReasons(inspected, enemies, allies, locale) : [];
  useEffect(() => {
    rankingRef.current?.scrollTo({ left: 0 });
  }, [enemies, allies, lane]);
  const changeLane = (nextLane: (typeof LANES)[number]["value"]) => {
    setLane(nextLane);
    setInspectedHero(null);
    rankingRef.current?.scrollTo({ left: 0 });
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
          <img className="brand-mark" src="./favicon-bp-large.png" alt="" />
          <span>
            <h1>Mobile Legends</h1>
            <small>BANG BANG · {t.brandSubtitle}</small>
          </span>
        </a>
        <div className="top-actions">
          <button className="reset-button" type="button" disabled={!enemies.length && !allies.length} onClick={() => { setEnemies([]); setAllies([]); }}>{t.reset}</button>
          <div className="meta-strip">
            <span className="live-dot" aria-hidden="true" />
            <span>{DATA_META.season}</span>
            <b>PATCH {DATA_META.patch}</b>
            <b className="rank-meta">{DATA_META.rank}</b>
            <span>{t.statsWindow}</span>
            <span className="meta-date" title={DATA_META.sourceUpdatedAt}>{t.data} {DATA_META.snapshot}</span>
          </div>
          <div className="language-switch" aria-label="Language">
            <button type="button" className={locale === "zh" ? "active" : ""} onClick={() => changeLocale("zh")} aria-pressed={locale === "zh"}>中</button>
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => changeLocale("en")} aria-pressed={locale === "en"}>EN</button>
          </div>
        </div>
      </header>

      <div className="draft-board" id="top">
        <section className="lineup-group enemy-group" aria-labelledby="enemy-heading">
          <div className="step-heading">
            <div>
              <h2 id="enemy-heading">{t.enemyTitle}</h2>
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
        </section>
        <section className="lineup-group ally-group" aria-labelledby="ally-heading">

          <div className="step-heading ally-heading">
            <div>
              <h2 id="ally-heading">{t.allyTitle}</h2>
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

        </section>
      </div>
      <div className="workspace">
        <aside className="result-panel" aria-labelledby="result-heading">
          <div className="lane-section">
            <div className="step-heading compact">
              <div>
                <h2>{t.laneTitle}</h2>
              </div>
            </div>
            <div className="lane-grid">
              {LANES.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={lane === item.value ? "active" : ""}
                  onClick={() => changeLane(item.value)}
                  aria-pressed={lane === item.value}
                >
                  <span className="lane-icon">{item.icon}</span>
                  <strong>{locale === "zh" ? item.zh : item.en}</strong>
                  </button>
              ))}
            </div>
          </div>
          <div className="ranking-heading">
            <h2 id="result-heading">{t.recommendationRanking}</h2>
            <span>{t.rankScope}</span>
          </div>
          {/* Keyboard focus lets the horizontal ranking scroll without a pointer. */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div className="winrate-ranking" ref={rankingRef} tabIndex={0} role="region" aria-label={t.recommendationRanking}>
            {!rankedHeroes.length && <div className="ranking-empty" role="status">
              <strong>{enemies.length || allies.length ? t.noCounterTitle : t.startTitle}</strong>
              <p>{enemies.length || allies.length ? t.noCounterHelp : t.startHelp}</p>
            </div>}
            {rankedHeroes.map((hero, index) => (
              <button type="button" className={`ranking-card ${inspectedHero === hero.name ? "inspected" : ""}`} key={hero.id}
                onClick={() => setInspectedHero(inspectedHero === hero.name ? null : hero.name)}
                aria-expanded={inspectedHero === hero.name} aria-controls="hero-evidence"
                aria-label={t.heroDraftScore(hero.name, hero.score)}>
                <span className="ranking-position">{index + 1}</span>
                <HeroPortrait hero={hero} />
                <span className="ranking-name">{hero.name}</span>
                <strong>+{hero.score.toFixed(2)}<small>pp</small></strong>
              </button>
            ))}
          </div>
          {rankedHeroes.length > 0 && <p className="ranking-hint">{t.swipeRanking}</p>}
          <div id="hero-evidence" hidden={!inspected} className="hero-evidence">
            {inspected && <>
              <div className="evidence-heading"><h3>{inspected.name} · {t.evidence}</h3><button type="button" onClick={() => setInspectedHero(null)}>{t.closeEvidence}</button></div>
              <p>{t.counterEdge} {inspected.counterScore.toFixed(2)}pp · {t.synergyEdge} {inspected.synergyScore.toFixed(2)}pp</p>
              <p>{t.rankingDefinition}</p>
              {reasons.length ? <ul className="reason-list">{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul> : <p>{t.noPairEvidence}</p>}
            </>}
          </div>

        </aside>
        <section className="picker-panel" aria-labelledby="pool-heading">
          <div className="pool-heading"><h2 id="pool-heading">{target === "enemy" ? t.pickEnemy : t.pickAlly}</h2><span>{t.tapToPick}</span></div>
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
                aria-pressed={role === value}
                onClick={() => setRole(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {!visibleHeroes.length && <p className="empty-search" role="status">{t.noSearchResults}</p>}
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

        </section>

        <section className="supporting-details" aria-label={t.dataDetails}>
          <details className="data-details"><summary>{t.dataDetails} <span>PATCH {DATA_META.patch} · {DATA_META.snapshot}</span></summary>
          <p className="formula-note">{t.rankingDefinition}</p>

          <p className="disclaimer">
            {t.rankingDisclaimer}
          </p>
          </details>
        </section>
      </div>
    </main>
  );
}
