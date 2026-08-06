# Counter Ready

> A fast, bilingual Mobile Legends: Bang Bang counter-pick assistant powered by a local Mythic+ statistics snapshot.

一个快速、中英双语的 Mobile Legends: Bang Bang 选英雄反制工具，使用本地神话+统计快照。

## Features / 功能

- Select 1–5 enemy heroes / 选择 1–5 名敌方英雄
- Filter recommendations by EXP, Gold, Mid, Jungle or Roam / 按五个分路筛选
- Rank picks only by measured Mythic+ counter relationships; global win rate is ignored / 只按神话+实测克制关系排序，不考虑全局胜率
- Automatically follows the browser language, with a manual 中文/EN switch / 根据浏览器语言自动选择中英文，也可手动切换
- Responsive desktop and mobile layouts / 同时适配桌面和手机
- No account, backend or user-tracking features / 无需账户、后端或用户追踪

## Data / 数据

- Patch 2.1.90 · Season 41
- Snapshot / 快照：2026-08-06
- 133 heroes / 133 位英雄
- Win, pick and ban rates are the 7-day average across Mythic, Mythical Honor and Mythical Glory+ / 胜率、选取率、禁用率为神话、神话荣耀、神话荣光+近 7 日平均值
- Matchup edges use the Mythic rank tier from mlbb.tools and are stored locally / 对位优势使用 mlbb.tools 的神话段位数据并保存在本地

This is a static snapshot and does not update automatically. Run `npm run data:update-matchups` and update the displayed patch metadata after a game patch.

这是静态快照，不会自动更新。游戏换版本后，运行 `npm run data:update-matchups`，并同步更新页面版本信息。

## Local development / 本地运行

Requires Node.js 22.13 or newer / 需要 Node.js 22.13 或更新版本。

```bash
npm install
npm run dev
```

Press `/` to focus search and `Esc` to clear it. / 按 `/` 聚焦搜索框，按 `Esc` 清空搜索。

## Build and test / 构建与测试

```bash
npm test
```

`npm run build:pages` produces the static GitHub Pages site in `pages-dist`. Pushes to `main` are deployed by GitHub Actions.

`npm run build:pages` 会在 `pages-dist` 生成 GitHub Pages 静态网页；推送到 `main` 后由 GitHub Actions 自动发布。

## License

MIT. Mobile Legends: Bang Bang and its hero artwork belong to their respective rights holders. This fan-made project is not affiliated with or endorsed by Moonton.

MIT 开源。本项目为非官方玩家工具，与 Moonton 无隶属或背书关系。
