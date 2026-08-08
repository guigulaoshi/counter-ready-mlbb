import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Bang Bang/);
  assert.match(html, /非官方 · 神话\+选人助手/);
  assert.match(html, /PATCH[\s\S]{0,30}2\.1\.90/);
  assert.match(html, /敌方选了谁/);
  assert.match(html, /敌方阵容/);
  assert.match(html, /1–5 名敌方英雄/);
  assert.match(html, /你打哪条路/);
  assert.match(html, /暂无同路实测克制数据/);
  assert.match(html, /Mythic\+/);
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
  assert.match(data, /patch: "2\.1\.90"/);
  assert.match(data, /snapshot: "2026-08-06"/);
  assert.match(data, /rank: "Mythic\+"/);
  assert.match(data, /timeframe: "近 7 日"/);
  for (const lane of ["Exp Lane", "Gold Lane", "Mid Lane", "Jungle", "Roam"]) {
    assert.match(page, new RegExp(lane));
  }
  assert.match(page, /getMatchupEdge/);
  assert.doesNotMatch(page, /candidate\.wr|overallWinRateDiff/);
  assert.match(page, /Array\.from\(\{ length: 5 \}/);
  assert.match(page, /useState<Hero\[\]>\(\[\]\)/);
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
  assert.match(i18n, /只按实测克制关系排序，不参考全局胜率/);
  assert.match(staticHtml, /Counter Ready/);
  await access(new URL("../public/og-v2.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
