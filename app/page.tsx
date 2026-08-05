"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DATA_META, HEROES, type Hero } from "./data";
import { COPY, ROLE_LABELS, SPEC_LABELS, type Locale } from "./i18n";
import { getMatchupEdge } from "./matchups";

const LANES = [
  { value: "Exp Lane", zh: "经验路", en: "EXP Lane", short: "EXP", icon: "⚔" },
  { value: "Gold Lane", zh: "金牌路", en: "Gold Lane", short: "GOLD", icon: "◉" },
  { value: "Mid Lane", zh: "中路", en: "Mid Lane", short: "MID", icon: "✦" },
  { value: "Jungle", zh: "打野", en: "Jungle", short: "JUNGLE", icon: "◆" },
  { value: "Roam", zh: "游走", en: "Roam", short: "ROAM", icon: "◇" },
] as const;

type Recommendation = Hero & {
  score: number;
  displayScore: number;
  directEdges: { enemy: string; edge: number }[];
  threats: { enemy: string; edge: number }[];
  coverage: number;
  reasons: string[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scoreCandidate(candidate: Hero, enemies: Hero[], locale: Locale): Recommendation {
  const directEdges: { enemy: string; edge: number }[] = [];
  const threats: { enemy: string; edge: number }[] = [];

  for (const enemy of enemies) {
    const edge = getMatchupEdge(candidate.name, enemy.name);
    if (edge > 0) directEdges.push({ enemy: enemy.name, edge });
    if (edge < 0) threats.push({ enemy: enemy.name, edge: Math.abs(edge) });
  }

  const favorableEdge = directEdges.reduce((sum, item) => sum + item.edge, 0);
  const unfavorableEdge = threats.reduce((sum, item) => sum + item.edge, 0);
  const score = favorableEdge - unfavorableEdge;
  const t = COPY[locale];
  const reasons = [
    ...directEdges.map((item) => t.edgeReason(item.enemy, item.edge)),
    ...threats.map((item) => t.threatReason(item.enemy, item.edge)),
    ...(directEdges.length > 1 ? [t.coverageReason(directEdges.length, enemies.length)] : []),
  ];

  return {
    ...candidate,
    score,
    displayScore: Number(score.toFixed(1)),
    directEdges,
    threats,
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
  const [enemies, setEnemies] = useState<Hero[]>(() => [HEROES.find((hero) => hero.name === "Hanabi") ?? HEROES[0]]);
  const [lane, setLane] = useState<(typeof LANES)[number]["value"]>("Gold Lane");
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
    setLocale(nextLocale);
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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    localStorage.setItem("counter-ready-locale", nextLocale);
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
  };

  const selectEnemy = (hero: Hero) => {
    setEnemies((current) => {
      const isSelected = current.some((item) => item.name === hero.name);
      const next = isSelected
        ? current.filter((item) => item.name !== hero.name)
        : (current.length >= 5 ? [...current.slice(1), hero] : [...current, hero]);
      return next;
    });
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
    () => HEROES.filter((hero) => !enemies.some((enemy) => enemy.name === hero.name) && hero.lane.includes(lane))
      .map((hero) => scoreCandidate(hero, enemies, locale))
      .filter((hero) => hero.coverage > 0 && hero.score > 0)
      .sort((a, b) => b.score - a.score || b.coverage - a.coverage),
    [enemies, lane, locale],
  );

  const best = recommendations[0];
  const laneMeta = LANES.find((item) => item.value === lane)!;

  const shareResult = async () => {
    const laneLabel = locale === "zh" ? laneMeta.zh : laneMeta.en;
    const enemyNames = enemies.map((enemy) => enemy.name).join(locale === "zh" ? "、" : ", ");
    if (!best) return;
    const text = t.share(DATA_META.patch, best.name, laneLabel, enemyNames, best.displayScore);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={t.homeLabel}>
          <span className="brand-mark">CR</span>
          <span>
            <strong>COUNTER READY</strong>
            <small>{t.brandSubtitle}</small>
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

      <section className="intro" id="top">
        <div>
          <span className="eyebrow">DRAFT PHASE TOOL</span>
          <h1>{t.introLead}<em>{t.introAccent}</em></h1>
        </div>
        <p>{t.introDescription}</p>
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
              <b>{enemies.length}/5</b>
            </div>
          </div>

          <div className="enemy-slots" aria-label={t.selectedLineupLabel}>
            {Array.from({ length: 5 }, (_, index) => {
              const selected = enemies[index];
              return selected ? (
                <button type="button" className="enemy-slot filled" key={selected.id} onClick={() => selectEnemy(selected)} aria-label={t.cancelHero(selected.name)}>
                  <span className="slot-number">{index + 1}</span>
                  <HeroPortrait hero={selected} size="small" />
                  <span className="slot-name">{selected.name}</span>
                  <span className="slot-remove">×</span>
                </button>
              ) : (
                <div className="enemy-slot empty" key={`empty-${index}`}>
                  <span className="slot-number">{index + 1}</span>
                  <span className="slot-plus">＋</span>
                  <span className="slot-name">{t.pending}</span>
                </div>
              );
            })}
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
              const pickIndex = enemies.findIndex((enemy) => enemy.name === hero.name);
              return (
                <button
                  type="button"
                  className={`hero-tile ${pickIndex >= 0 ? "selected" : ""}`}
                  key={hero.id}
                  onClick={() => selectEnemy(hero)}
                  aria-pressed={pickIndex >= 0}
                >
                  <HeroPortrait hero={hero} />
                  <span>{hero.name}</span>
                  {pickIndex >= 0 && <i className="pick-order">{pickIndex + 1}</i>}
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
              <span className="step-number">02</span>
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
            <span>{t.compared(recommendations.length, enemies.length)}</span>
          </div>

          <div className="matchup-line">
            <div className="enemy-summary">
              <div className="result-enemy-stack">
                {enemies.map((enemy) => <HeroPortrait hero={enemy} size="small" key={enemy.id} />)}
              </div>
              <span><small>{t.enemyLineup}</small><b>{t.heroesCount(enemies.length)}</b></span>
            </div>
            <i>VS</i>
            <div>
              <span><small>{t.yourLane}</small><b>{locale === "zh" ? laneMeta.zh : laneMeta.en}</b></span>
              <span className="lane-badge">{laneMeta.icon}</span>
            </div>
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
              <div><span>{t.netEdge}</span><b>+{best.displayScore.toFixed(1)}pp</b></div>
              <div><span>{t.counterCoverage}</span><b>{best.coverage}/{enemies.length}</b></div>
              <div><span>{t.reverseThreats}</span><b>{best.threats.length}</b></div>
            </div>
          </div> : <div className="best-card no-data"><h2 id="result-heading">{t.noCounterTitle}</h2><p>{t.noCounterHelp}</p></div>}

          <div className="alternatives-heading">
            <h3>{t.alternatives}</h3>
            <span>{t.sortExplanation}</span>
          </div>

          <div className="alternatives">
            {recommendations.slice(1, 5).map((hero, index) => (
              <div className="alternative-card" key={hero.id}>
                <span className="rank">0{index + 2}</span>
                <HeroPortrait hero={hero} size="small" />
                <div>
                  <b>{hero.name}</b>
                  <small>{t.matchupSummary(hero.directEdges.length, hero.displayScore)}</small>
                </div>
                <strong>{hero.displayScore}</strong>
              </div>
            ))}
          </div>

          <button className="copy-button" type="button" onClick={shareResult} disabled={!best}>
            <span>{copied ? "✓" : "＋"}</span>
            {copied ? t.copied : t.copy}
          </button>

          <p className="disclaimer">
            {t.disclaimer}
          </p>
        </aside>
      </div>
    </main>
  );
}
