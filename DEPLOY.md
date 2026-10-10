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
| GitHub 仓库 | ✅ ken-fs/animezero（PUBLIC，2026-10-10）|
| Worker | ✅ `animezero` 已部署（actions run 38045016439；verify 步因域名未接而红）|
| 域名 | ✅ 已购买（animezero.live，Spaceship） |
| CF zone | ✅ `51710b98e57e3f643021599b82e851ac`（NS 已改 daisy/lochlan；zone 仍 pending，等委派传播）|
| GSC | ⏳ 待 zone active 后接（`scripts/gsc-verify-domain.mjs`）|
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

---

## 待用户手动（唯一一步）

**Spaceship 的 DNSSEC**：animezero.live 在注册商处有一条 DS 记录（key tag 48450），而 CF zone 的 DNSSEC 已启用（key tag **2371**）——两边不匹配会让 DNS SERVFAIL。二选一：

- **保持 DNSSEC（推荐）**：Spaceship → 域名 → DNSSEC → 把 DS 改成
  `2371 13 2 2ED3E29177CAC1EEC9033B39E673550DBAED92261ECCE69C42B5BA19F8BC2C4B`
- **关掉 DNSSEC**：同面板关闭开关（舰队其他域名都是 unsigned，也能用）

改完等 10–30 分钟，zone 会自己 active；然后我接着绑自定义域 + HTTPS + www + GSC + IndexNow。
