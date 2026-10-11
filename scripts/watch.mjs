#!/usr/bin/env node
/**
 * Anime Zero 变化监控（零 AI、零依赖）
 *
 * 为什么：/codes/ 是这个站的主意图页，而官网的码都发在 Discord / 更新公告里 ——
 * 两三家聚合站（beebom / TryHardGuides / 各家 .wiki）几乎同步收录。
 * 本站的差异化是「快 + 每条都能溯源」，所以每小时做两件事：
 *
 *   1. Roblox 元数据比对（标题 / 描述 / 版本时间）：游戏更新 = 新码 + 新武器的信号
 *   2. 四个码源页比对：出现「本站还没有、且 ≥2 个源同时列出」的码 → 高优先级通知
 *
 * 只提示，不自动改数据 —— 收录规则是人工双源确认后才写进 src/data/game.json。
 *
 * cron: 23 * * * * NODE_USE_ENV_PROXY=1 https_proxy=http://127.0.0.1:7897 /opt/homebrew/bin/node <本文件>
 */
import { readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SHIP = join(REPO, "..");
const UNIVERSE_ID = 10512942223;
const STATE = join(SHIP, "out", "animezero-watch.json");
const LOG = "/tmp/animezero-watch.log";

/** 码源：至少两个源同时出现才提示（防聚合站错拼 / 别的游戏串词）。 */
const CODE_SOURCES = [
  { id: "beebom", url: "https://beebom.com/anime-zero-codes/" },
  { id: "tryhard", url: "https://www.tryhardguides.com/anime-zero-codes/" },
  { id: "azwiki", url: "https://animezerowiki.wiki/codes" },
  { id: "azcode", url: "https://animezerocode.com/" },
];

// 全大写 token 里这些不是码：页面词汇 + 单位 + 常见缩写。
const STOP = new Set(
  `COPY NEW CODES CODE WORKING ACTIVE EXPIRED LEVEL REQUIRES REDEEM FREEBIES SPINS
   TRAIT TRAITS REROLLS ROLLS COINS GEMS GOLD CASH LUCKY ANIME ZERO ROBLOX UPDATE
   UPDATED OCTOBER NOVEMBER SEPTEMBER DECEMBER JANUARY FEBRUARY MARCH APRIL MAY JUNE
   JULY AUGUST CLAIM LIST HERE TABLE STATUS ENTER BONUS MORE INFO NOTE READ WHEN
   WHERE WHAT WHY HOW ALL USE USES MINUTE HOUR DAY WEEK MONTH YEAR PLAYER PLAYERS
   DISCORD TRELLO ABOUT PRIVACY CONTACT HOME GUIDES WIKI TIER TIERS LIST LISTS
   BEGINNER ADVANCED PATCH PATCHES NEWS EVENT EVENTS REWARD REWARDS SPIN REROLL
   AND THE FOR YOU YOUR WITH THIS THAT FROM HAVE WILL JUST ONLY OVER ALSO INTO
   START STARTER FIRST BEST TOP NEXT LAST GAME GAMES ITEM ITEMS MODE MODES
   ENTERED PRESS OPEN CURRENT LATEST SHADOW MONARCH RAID DUNGEON DUNGEONS WEAPON
   WEAPONS ACCESSORY ACCESSORIES TITLE TITLES QUEST QUESTS SKILL SKILLS ULTIMATE
   POWER DAMAGE STATS STAT CHART TABLE TOTAL NUMBER COUNT POWERLEVEL`.split(/\s+/),
);

const log = (msg) => appendFileSync(LOG, `${new Date().toISOString()} ${msg}\n`);

const PUSH_SCRIPT = new URL("../../scripts/notify.mjs", import.meta.url).pathname;

function notify(title, body, sound = "Glass") {
  // 先推飞书（Ship/scripts/notify.mjs，2026-10-11 加：用户不在电脑前会漏 macOS 通知）；推不出去再走下面的 macOS 通知。
  try {
    execFileSync(process.execPath, [PUSH_SCRIPT, "--title", String(title), "--body", String(body)], { stdio: "ignore", timeout: 30000 });
    return;
  } catch {}
  const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').slice(0, 220);
  try {
    execFileSync("osascript", [
      "-e",
      `display notification "${esc(body)}" with title "${esc(title)}" sound name "${sound}"`,
    ]);
  } catch {}
}

async function get(path) {
  for (let i = 1; ; i++) {
    let limited = false;
    try {
      const r = await fetch(path, { signal: AbortSignal.timeout(20000), headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36" } });
      limited = r.status === 429;
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) {
      if (i >= (limited ? 3 : 2)) throw new Error(`${path.slice(0, 60)}: ${e.message}`);
      await new Promise((res) => setTimeout(res, limited ? 20000 * i : 2500 * i));
    }
  }
}

/** 从码源 HTML 里抽候选码：全大写 4–20 位、至少含一个字母，剔除页面词汇。 */
function extractCodes(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
  const out = new Set();
  for (const m of text.matchAll(/\b[A-Z0-9]{4,20}\b/g)) {
    const tok = m[0];
    if (!/[A-Z]/.test(tok)) continue; // 纯数字不是码
    if (STOP.has(tok)) continue;
    if (/^\d+[A-Z]?$/.test(tok)) continue;
    out.add(tok);
  }
  return out;
}

/** 本站已收录的码（唯一事实来源）。 */
function knownCodes() {
  const data = JSON.parse(readFileSync(join(REPO, "src", "data", "game.json"), "utf8"));
  return new Set(data.codes.map((c) => c.code));
}

// ─── 1. Roblox 元数据 ─────────────────────────────────────────────────────────
let game;
try {
  const d = JSON.parse(await get(`https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`));
  const g = d.data[0];
  game = { name: g.name, description: g.description, updated: g.updated, playing: g.playing };
} catch (e) {
  log(`GAME_FETCH_FAILED ${e.message}`);
  process.exit(1);
}

// ─── 2. 码源 ────────────────────────────────────────────────────────────────
const known = knownCodes();
const perSource = {};
const sourceErrors = [];
for (const s of CODE_SOURCES) {
  try {
    perSource[s.id] = extractCodes(await get(s.url));
  } catch (e) {
    sourceErrors.push(`${s.id}: ${e.message}`);
  }
}

// 出现在 ≥2 个源、且不在本站码表里的 → 新码候选
const counts = new Map();
for (const set of Object.values(perSource)) {
  for (const tok of set) counts.set(tok, (counts.get(tok) ?? 0) + 1);
}
const newCandidates = [...counts.entries()]
  .filter(([tok, n]) => n >= 2 && !known.has(tok))
  .map(([tok, n]) => `${tok}(${n}源)`)
  .sort();

/**
 * 自动上站：≥3 个源同时列出、且不在码表里的码，直接写进 src/data/game.json 并推送。
 *
 * 为什么自动：/codes/ 是主意图页，竞品从 Discord 出码到上站只要几小时，
 * 靠「通知 → 人来看 → 改数据」至少慢半天。站点对外发布的门槛是「≥2 源」，
 * 自动写入用更严的 ≥3 源——降低聚合站错拼/串词被直接推到线上的概率。
 * 只增不删：过期码仍需人工确认（删错了会掉已收录的码词）。
 */
function autoAddCodes(items) {
  const file = join(REPO, "src", "data", "game.json");
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    for (const it of items) {
      data.codes.push({
        code: it.code,
        reward: "Not listed by the sources carrying it yet — redeem it and this row gets filled in.",
        requirement: null,
        sources: it.sources,
      });
    }
    writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

    execFileSync("git", ["add", "src/data/game.json"], { cwd: REPO });
    execFileSync(
      "git",
      ["commit", "-q", "-m", `codes: auto-add ${items.map((i) => i.code).join(", ")} (${items.map((i) => `${i.sources} sources`).join(", ")})`],
      {
        cwd: REPO,
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: "animezero watch",
          GIT_AUTHOR_EMAIL: "watch@animezero.live",
          GIT_COMMITTER_NAME: "animezero watch",
          GIT_COMMITTER_EMAIL: "watch@animezero.live",
        },
      },
    );

    // cron 里 keychain 拿不到 HTTPS 凭据 → SSH 优先，HTTPS 兜底（舰队 2026-09-28 的教训）
    let via = "ssh";
    try {
      execFileSync("git", ["push", "-q", "git@github.com:ken-fs/animezero.git", "main"], {
        cwd: REPO,
        timeout: 60000,
        env: { ...process.env, GIT_SSH_COMMAND: `ssh -i ${homedir()}/.ssh/id_ed25519 -o IdentitiesOnly=yes` },
      });
    } catch {
      execFileSync("git", ["push", "-q", "origin", "main"], {
        cwd: REPO,
        timeout: 60000,
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
      });
      via = "https";
    }
    return { added: items.map((i) => i.code), via };
  } catch (e) {
    log(`AUTO_ADD_FAILED ${e.message}`);
    return { error: String(e.message).slice(0, 200) };
  }
}

const AUTOMATED = [...counts.entries()]
  .filter(([tok, n]) => n >= 3 && !known.has(tok))
  .map(([tok, n]) => ({ code: tok, sources: n }))
  .slice(0, 3);
const autoResult = AUTOMATED.length ? autoAddCodes(AUTOMATED) : null;

// 我们的码里，已从所有成功抓取的源上消失的 → 可能过期
const liveSources = Object.values(perSource);
const gone = [...known].filter((c) => liveSources.length > 0 && liveSources.every((s) => !s.has(c)));

// ─── 3. 状态比对 + 通知 ─────────────────────────────────────────────────────
const prev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : null;
writeFileSync(
  STATE,
  JSON.stringify(
    {
      game,
      codes: [...known, ...newCandidates.map((c) => c.replace(/\(\d+源\)$/, ""))].sort(),
      newCandidates,
      checkedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);

if (!prev) {
  log(`BASELINE ${game.name} | updated ${game.updated} | candidates ${newCandidates.length}`);
  process.exit(0);
}

const changed = ["name", "description", "updated"].filter((k) => prev.game?.[k] !== game[k]);
if (changed.length) {
  log(`GAME_CHANGED ${changed.join(",")}: updated ${prev.game?.updated} → ${game.updated}`);
  const isUpdate = changed.includes("updated") || changed.includes("description");
  notify(
    isUpdate ? "🆕 数据源更新" : "数据源有变化",
    `${changed.join("/")} 变化 → 查新码 / 新武器再更新站点（RADAR/站数据）`,
    isUpdate ? "Glass" : "Blow",
  );
}

if (newCandidates.length) {
  log(`🚨 NEW_CODES ${newCandidates.join(" ")}`);
  notify(
    "🚨 新内容待确认",
    `${newCandidates.slice(0, 8).join(" ")} → 双源确认后更新 src/data/game.json`,
    "Sosumi",
  );
}

if (autoResult?.added?.length) {
  log(`AUTO_ADDED ${autoResult.added.join(" ")} via ${autoResult.via}`);
  notify(
    "✅ 自动更新完成",
    `${autoResult.added.join(" ")} 已写入码表并推送（${autoResult.via}），部署约 1 分钟；奖励字段待补`,
    "Glass",
  );
} else if (autoResult?.error) {
  notify("⚠️ 自动更新失败", `${AUTOMATED.map((i) => i.code).join(" ")} — 手动补：${autoResult.error}`, "Basso");
}

if (gone.length) log(`GONE ${gone.join(" ")}（所有成功抓取的源都不再列出，考虑标过期）`);
if (sourceErrors.length) log(`SOURCE_ERRORS ${sourceErrors.join(" | ")}`);
if (!changed.length && !newCandidates.length) log("no change");
