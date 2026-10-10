import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, redeemSteps, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { VideoEmbed } from "@/components/video-embed";
import { VIDEOS } from "@/data/videos";
import { FaqJsonLd } from "@/components/json-ld";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: `Anime Zero codes (October 2026) — ${codes.length} working codes`,
  description: `All ${codes.length} working Anime Zero codes with the exact reward for each — Coins, Gems, Lucky Spins and Trait Rerolls — plus the level requirements and how to redeem them.`,
  alternates: { canonical: "/codes/" },
};

const FAQ = [
  {
    q: "How many working Anime Zero codes are there?",
    a: `There are ${codes.length} codes on this list. Every one is confirmed by at least two independent listings with matching rewards, and the ones with the broadest agreement pay the biggest bundles — 50KCCU alone hands out 500 Lucky Spins, 350 Trait Rerolls, 250,000 Coins and 5,000 Gems.`,
  },
  {
    q: "Why is my Anime Zero code not working?",
    a: "Two reasons, in order of frequency. First, codes are case-sensitive — copy them with the button instead of retyping. Second, several codes are level-gated: NEWRAID, SORRYFORZEDELAY, UPDATETWO and ARISE67 need level 50+, and SORRYFORDELAY needs level 25+. A correct code that still fails has usually retired; retired codes get pulled from this page rather than left to waste your time.",
  },
  {
    q: "What do Anime Zero codes give you?",
    a: "Coins (weapon upgrades and slot unlocks), Lucky Spins (better-odds Arsenal rolls), Trait Rerolls (rerolling weapon traits, the scarcest resource), Gems (accessory crafting) and plain Rolls. The big bundles mix all four; the smaller milestone codes like SIXSEVEN are effectively leftovers.",
  },
  {
    q: "Where do you redeem Anime Zero codes?",
    a: "In game: open the Codes menu from the buttons on the right side of the HUD, paste the code and press Redeem. Rewards land in your account immediately, and a level-gated code can be redeemed once you pass the requirement.",
  },
  {
    q: "Which Anime Zero code should I redeem first?",
    a: "If you are under level 25, start with HOP3YOU3NJOY (250 Rolls) and TYASHIRA (500 Lucky Spins) — neither has a level gate and both feed the Arsenal directly. Keep the level-50 codes like ARISE67 and NEWRAID bookmarked; they are the biggest payouts in the game's history and stay valid for high-level accounts.",
  },
];

export default function CodesPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd items={FAQ} />

      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Codes</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Updated {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[22ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero codes
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {codes.length} codes, each with the reward it actually pays and the level
          gate where one exists. Every code here appears in at least two independent
          listings — codes circulating from a single source are held back until a
          second one matches.
        </p>
      </header>

      {/* Highest-intent page on the site: codes are why people land here. */}
      <AdsterraBanner slot={LEADERBOARD} className="mb-10 hidden md:flex" />

      <section>
        <div className="overflow-hidden rounded-[var(--radius-container)] border rule">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b rule bg-muted/60 px-5 py-3 text-xs font-medium text-muted-foreground sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_minmax(0,0.7fr)_auto]">
            <span>Code</span>
            <span className="hidden sm:block">Reward</span>
            <span className="hidden sm:block">Requires</span>
            <span className="sr-only sm:not-sr-only">Copy</span>
          </div>
          <ul>
            {codes.map((c) => (
              <li
                key={c.code}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b rule bg-card px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_minmax(0,0.7fr)_auto]"
              >
                <code className="font-mono text-sm font-semibold break-all">{c.code}</code>
                <span className="col-span-2 text-sm text-muted-foreground sm:col-span-1">
                  {c.reward}
                </span>
                <span className="col-span-2 text-xs text-muted-foreground sm:col-span-1">
                  {c.requirement ?? "—"}
                </span>
                <CopyCode code={c.code} />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          Sourcing note: the reward text above is the intersection of{" "}
          <strong className="font-medium text-foreground">
            two or more independent listings
          </strong>
          . Where listings disagreed — as they did over BENICE2ME and the spin count
          on UPDATESOONWEPROMISE — the majority reading is shown and this page
          says so. Codes retire without warning in this genre, so the list gets
          re-checked rather than trusted.
        </p>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-14" />

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">How to redeem a code</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {redeemSteps.map((step, i) => (
            <li
              key={step}
              className="flex gap-4 rounded-[var(--radius-container)] border rule bg-card p-5"
            >
              <span className="font-mono text-sm font-semibold text-primary tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Watch a creator redeem them</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          The table above is cross-checked in writing; this video is the same list
          being typed into the in-game box, which shows the redeem flow (and how
          the case-sensitivity bites) faster than any screenshot.
        </p>
        <VideoEmbed className="mt-5" {...VIDEOS.codes} />
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Questions</h2>
        <dl className="mt-5 divide-y rule">
          {FAQ.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-2 max-w-[70ch] text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          Codes pay in spins and rerolls, which is the fastest route into the
          Arsenal.{" "}
          <Link href="/weapons/" className="text-primary underline-offset-4 hover:underline">
            See what the roll pool actually contains
          </Link>{" "}
          or{" "}
          <Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">
            read the tier list
          </Link>{" "}
          before you spend them.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          {game.name} codes are published by the developer in {game.discord ? "their Discord" : "official channels"} and
          added here after cross-checking.
        </p>
      </section>
    </article>
  );
}
