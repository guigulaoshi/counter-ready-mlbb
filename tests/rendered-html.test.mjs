import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { DATA_META } from "../app/data.ts";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished counter picker", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Mobile Legends Counter Picker/);
  assert.match(html, /Mobile Legends/);
  assert.match(html, /BANG BANG/);

  assert.match(html, /PATCH[\s\S]{0,30}\d+\.\d+\.\d+/);
  assert.match(html, /敌方选了谁/);
  assert.match(html, /敌方阵容/);

  assert.match(html, /你打哪条路/);
  assert.match(html, /建议选/);
  assert.match(html, /尽量避免/);
  assert.match(html, /先选敌方英雄/);
  assert.match(html, /综合分 = 对敌方的平均克制值/);
  assert.doesNotMatch(html, /胜率排名|class="ranking-card/);
  assert.match(html, /队友已经选了谁/);
  assert.match(html, /我方队友/);
  assert.match(html, /Mythic/);
  assert.match(html, /最近 7 天/);
  assert.match(html, /数据抓取/);
  if (DATA_META.sourceDateStatus === "future") assert.match(html, /胜率来源时间异常/);
  assert.match(html, /配合来源未公开统计周期和日期/);
  assert.doesNotMatch(html, /MYTHIC\+|Mythic\+|神话\+/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});

test("ships complete local hero data and social preview", async () => {
  const [data, page, i18n, staticHtml] = await Promise.all([
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../pages-dist/index.html", import.meta.url), "utf8"),
  ]);
  assert.equal((data.match(/"id":/g) ?? []).length, 133);
  assert.match(data, /patch: "\d+\.\d+\.\d+"/);
  assert.match(data, /snapshot: "\d{4}-\d{2}-\d{2}"/);
  assert.match(data, /rank: "Mythic"/);
  assert.match(data, /timeframe: "近 7 日"/);
  for (const lane of ["Exp Lane", "Gold Lane", "Mid Lane", "Jungle", "Roam"]) {
    assert.match(page, new RegExp(lane));
  }
  assert.match(page, /rankRecommendations\(HEROES, enemies, allies, lane\)/);
  assert.match(page, /rankAvoids\(HEROES, enemies, allies, lane\)/);
  assert.match(page, /getMatchupEdge/);
  assert.match(page, /getSynergyEdge/);
  assert.match(page, /Array\.from\(\{ length: limit \}/);
  assert.match(page, /const MAX_ENEMIES = 5;/);
  assert.match(page, /const MAX_ALLIES = 4;/);
  assert.match(page, /const \[enemies, setEnemies\] = useState<Hero\[\]>\(\[\]\)/);
  assert.match(page, /const \[allies, setAllies\] = useState<Hero\[\]>\(\[\]\)/);
  assert.match(page, /\["value"\]>\("Exp Lane"\)/);
  assert.match(page, /slice\(0, 28\)/);
  assert.match(page, /showAllHeroes/);
  assert.doesNotMatch(page, /HEROES\.find\(\(hero\) => hero\.name === "Hanabi"\)/);
  assert.doesNotMatch(page, /current\.length > 1/);
  assert.doesNotMatch(page, /熟练度/);
  assert.doesNotMatch(page, /最近选择|mlbb-picker-recents|recentNames/);
  assert.match(page, /navigator\.language/);
  assert.match(i18n, /Who did the enemy pick\?/);
  assert.match(i18n, /敌方选了谁？/);
  assert.match(i18n, /Who did your team lock in\?/);
  assert.match(staticHtml, /Counter Ready/);
  await access(new URL("../public/og-v2.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
