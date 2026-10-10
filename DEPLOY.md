# 部署说明 — animezero.live

站点：`animezero`（Cloudflare Worker，静态资源）
仓库：https://github.com/ken-fs/animezero（待建）
域名：`animezero.live`（✅ 用户 2026-10-10 已购买，Spaceship）

---

## 当前状态（2026-10-10 建站当天）

| 项 | 状态 |
|---|---|
| 代码 | ✅ 本地完成（25 页：首页 / codes / weapons+14 / tier-list / guide / about，build 通过，浏览器 console 干净） |
| 数据 | ✅ codes 25 条（全部 ≥2 源交叉确认）· weapons 14 条（11 条 rarity 双源确认，3 条名下未定级）|
| 主题 | ✅ synth（霓虹网格）—— 理由见 README |
| IndexNow key | ✅ 已生成 `622cd5b8a39a6e4c355b7707d35b99e5`（`public/<key>.txt` + `scripts/indexnow-keys.json` 已登记） |
| GitHub 仓库 | ⏳ 待创建并推送 |
| Worker | ⏳ 待部署 |
| 域名 | ✅ 已购买（animezero.live，Spaceship） |
| CF zone | ⏳ 待建 + NS 切换 |
| GSC | ⏳ 待接（`scripts/gsc-verify-domain.mjs`）|
| GA4 | ⏳ 待建属性（`scripts/ga-create.mjs`，用 `NEXT_PUBLIC_GA_ID` 构建变量）|
| 广告 | ⏳ Adsterra 待申请（`src/lib/ads.ts` 留有两个 slot，key 为空时不渲染） |

---

## 部署（照 2026-10-09 的 GitHub Actions 方案，不用 CF Git 集成）

1. `git init` + 首个 commit → 建 GitHub 仓库 `ken-fs/animezero` → push
2. `python3 scripts/setup-gh-deploy.py animezero ken-fs/animezero animezero.live`（写 workflow + 加密 secret）
3. 域名接线：CF zone 建好后 → Worker custom domain（apex + www）→ **强制 HTTPS + www 301**（`scripts/cf-www-redirect.py`）→ 巡检确认
4. GSC：`node scripts/gsc-verify-domain.mjs animezero.live`（TXT 验证 + sitemap 提交）
5. GA：`node scripts/ga-create.mjs` 建属性 → 把 `NEXT_PUBLIC_GA_ID` 写进仓库变量
6. IndexNow：`node scripts/indexnow.mjs animezero.live`（key 文件需先上线）
7. 收尾：`site-hygiene` 的 MANUAL_SITES 加本站（部署标记要写到 `public/.well-known/anvilwiki-deploy.txt`）

## 验证命令

```bash
npm run build   # 25 页 + sitemap/canonical 全部指向 animezero.live
node ../scripts/browser/browser.mjs check https://animezero.live/    # 线上 console 干净
```
