import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, weapons, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Anime Zero Shadow Monarch update — what it actually added",
  description:
    "What the Shadow Monarch update added to Anime Zero: the raid, the new shadow-themed weapons nobody has documented (Immortal Sovereign, Dragon Eclipse, Divine Emperor), the update codes, and the numbers behind the game's jump.",
  alternates: { canonical: "/shadow-monarch/" },
};

const UPDATE_CODES = ["ARISE67", "SORRYFORZEDELAY", "UPDATETWO", "UPDATESOONWEPROMISE"];

export default function ShadowMonarchPage() {
  const byCode = new Map(codes.map((c) => [c.code, c]));
  const shadowWeapons = weapons.filter((w) =>
    ["immortal-sovereign", "dragon-eclipse", "divine-emperor"].includes(w.slug),
  );

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Shadow Monarch update</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Previous update · checked {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          The Shadow Monarch update
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          The update that turned {game.name} from a quiet RPG into one of the fastest
          risers on Roblox — it is still the tag on the game&apos;s own title
          (&quot;[SHADOW MONARCH]&quot;), and it is what most of the current code list
          was released alongside.
        </p>
      </header>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
        <Fact label="Players now" value={game.ccu.toLocaleString("en-US")} sub="Roblox API" />
        <Fact label="Search interest" value="5 → 100" sub="two weeks, Google Trends (US)" />
        <Fact label="Update codes" value={String(UPDATE_CODES.length)} sub="cross-checked on /codes/" />
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />

      <section className="pt-14">
        <h2 className="text-sm font-medium">What it added</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="font-medium">A raid, and a new farm loop</p>
            <p className="mt-1 text-muted-foreground">
              The headline addition is a raid mode (creators call it the Spirited Away
              raid) on top of the existing story and Endless-style runs. The developer
              publishes no written patch notes, so the mode&apos;s level requirement
              and drop table are not documented anywhere we can verify.
            </p>
          </div>
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="font-medium">Shadow-themed weapons — three of them undocumented</p>
            <p className="mt-1 text-muted-foreground">
              Reading the in-game weapon cards frame by frame from creator footage
              turned up three weapons the written rosters do not list at all:
            </p>
            <ul className="mt-3 space-y-2">
              {shadowWeapons.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/weapons/${w.slug}/`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {w.name}
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}
                    — {w.rarity}, themed after {w.inspiredBy}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-muted-foreground">
              Immortal Sovereign is the &quot;0.01%&quot; chase entity update videos
              advertise; the card text on each page is the game&apos;s own wording.
            </p>
          </div>
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="font-medium">Four codes, two of them level-gated</p>
            <ul className="mt-3 divide-y rule">
              {UPDATE_CODES.map((code) => {
                const c = byCode.get(code);
                if (!c) return null;
                return (
                  <li key={code} className="flex flex-wrap items-center gap-3 py-2.5">
                    <code className="font-mono text-sm font-semibold">{code}</code>
                    <CopyCode code={code} />
                    <span className="text-sm text-muted-foreground">{c.reward}</span>
                    {c.requirement && (
                      <span className="tag">{c.requirement}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-muted-foreground">
              The level-50 gates are why a new account should read{" "}
              <Link href="/leveling/" className="text-primary underline-offset-4 hover:underline">
                the leveling route
              </Link>{" "}
              before writing these off.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">The numbers behind the jump</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          Search interest for the game went from 5 to 100 (peak) inside two weeks
          (Google Trends, US, daily), concurrent players climbed past 40,000, and the
          server grew past 110,000 members — that combination is what pulled a wave of
          guide sites online within days. It is also why this site owns up to being
          late: the update raised the game faster than any of the tooling watching it.
        </p>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What this update did not ship</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• Written patch notes of any kind — everything above is reconstructed from the game&apos;s own UI, cards and Discord.</li>
          <li>• Published roll odds or pity — &quot;0.01%&quot; in video titles is marketing, not a documented rate.</li>
          <li>• A complete weapon roster: the cards we read cover the board in circulation, not necessarily every item in the game.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
            How gaps like these get documented
          </Link>
        </p>
      </section>
    </article>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold tabular">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
