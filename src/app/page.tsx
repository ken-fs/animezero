import type { Metadata } from "next";
import Link from "next/link";
import {
  codes,
  confirmedWeapons,
  game,
  gaps,
  weapons,
  LAST_CHECKED,
  visitsPerFavourite,
} from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { VideoEmbed } from "@/components/video-embed";
import { VIDEOS } from "@/data/videos";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  // Homepage owns "<game> wiki" (the template's 2026-10-13 rule); /codes/ owns the codes queries.
  title: { absolute: "Anime Zero Wiki: Codes, Weapons & Tier List" },
  description:
    "Every working Anime Zero code with its reward and level gate, the weapon roster with the rarities two sources agree on, and an honest map of what nobody has published yet. Fan-made.",
  alternates: { canonical: "/" },
};

const nf = new Intl.NumberFormat("en-US");

export default function HomePage() {
  const topCode = codes[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <section className="relative pt-16 pb-14">
        <div className="hero-glow" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="tag">Roblox reference · updated {LAST_CHECKED}</p>
            <h1 className="mt-4 max-w-[22ch] text-4xl font-semibold tracking-tight sm:text-5xl">
              {game.name} <span className="glow text-primary">Wiki</span>
            </h1>
            <p className="mt-3 text-xl font-medium">Every code and weapon, on one page.</p>
            <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">
              {game.name} is a dungeon-crawler RPG where your &quot;units&quot; are anime
              weapons summoned at the Arsenal. This site publishes the codes that two
              independent listings agree on, the weapon rarities that survive
              cross-checking, and a visible gap wherever nobody has published numbers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/codes/" className="btn-ember">
                All {codes.length} working codes
              </Link>
              <Link
                href="/weapons/"
                className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                The weapon roster
              </Link>
              <Link
                href="/tier-list/"
                className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Tier list
              </Link>
            </div>
          </div>

          {/* 官方美术：游戏页的截图 + icon，右下角 icon 做品牌锚点 */}
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export has no image optimizer */}
            <img
              src="/images/shot-1.webp"
              alt="Official Anime Zero screenshot from the game's Roblox page"
              width={768}
              height={432}
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-[var(--radius-container)] border rule lift"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static export has no image optimizer */}
            <img
              src="/images/game-icon.png"
              alt="Anime Zero game icon"
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-6 -left-6 h-20 w-20 rounded-2xl border rule bg-background shadow-lg sm:h-24 sm:w-24"
            />
          </div>
        </div>

        {topCode && (
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="tag">newest code</span>
            <code className="font-mono text-sm font-semibold">{topCode.code}</code>
            <CopyCode code={topCode.code} />
            <span className="text-sm text-muted-foreground">{topCode.reward}</span>
          </div>
        )}
      </section>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Developer" value={game.developer} sub="Roblox, dungeon-crawler RPG" />
        <Fact
          label="Visits"
          value={nf.format(game.visits)}
          sub={`${nf.format(game.favorites)} favourites`}
        />
        <Fact
          label="Playing right now"
          value={nf.format(game.ccu)}
          sub={`${visitsPerFavourite} visits per favourite`}
        />
        <Fact label="Game last updated" value={game.updated} sub="patch, not this page" />
      </section>

      {/* Desktop-only leaderboard: 728px overflows phones. */}
      <AdsterraBanner slot={LEADERBOARD} className="mt-10 hidden md:flex" />

      <section className="grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium">What we have confirmed</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="card-glow rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">{codes.length} working codes</p>
              <p className="mt-1 text-muted-foreground">
                Coins, Gems, Lucky Spins and Trait Rerolls — each code carries the
                reward its listings actually pay and the level gate where one
                applies.{" "}
                <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
                  See the list
                </Link>
              </p>
            </li>
            <li className="card-glow rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">
                {confirmedWeapons.length} weapons with a cross-checked rarity
              </p>
              <p className="mt-1 text-muted-foreground">
                From Zenless Cataclysm down through the Epic starters, plus{" "}
                {weapons.length - confirmedWeapons.length} entities that only exist
                in update footage so far — those are labelled as gaps, not ranked.{" "}
                <Link href="/weapons/" className="text-primary underline-offset-4 hover:underline">
                  See the roster
                </Link>
              </p>
            </li>
            <li className="card-glow rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">The systems, explained without fluff</p>
              <p className="mt-1 text-muted-foreground">
                Rolls vs Lucky Spins, traits and rerolls, the two-slot trap, the
                modes added by the Shadow Monarch update.{" "}
                <Link href="/guide/" className="text-primary underline-offset-4 hover:underline">
                  Read the guide
                </Link>
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium">What nobody has published yet</h2>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            Anime Zero keeps its numbers in the Discord and in patch pushes, not on
            a wiki. This site would rather show you the gap than copy a number from
            a different gacha game:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {gaps.slice(0, 4).map((g) => (
              <li key={g} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span className="text-muted-foreground">{g}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
              How we source data, and the full gap list
            </Link>
          </p>
        </div>
      </section>

      {/* Every weapon page linked from home (template fix c6be7af): with only /weapons/ linked, half the weapon
          pages sat at "Discovered – not indexed" 11 days after launch. */}
      <section className="border-t rule py-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium">Every {game.name} weapon</h2>
          <Link href="/weapons/" className="text-sm text-primary underline-offset-4 hover:underline">
            All {weapons.length} weapons
          </Link>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[...weapons]
            .sort((a, b) => a.name.localeCompare(b.name, "en"))
            .map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/weapons/${w.slug}/`}
                  className="inline-block rounded-[var(--radius-control)] border rule bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {w.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-14" />

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The game, in its own frames</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          Media pulled straight from the game&apos;s Roblox page — the dungeon hub
          and combat from the Shadow Monarch update. Nothing here is a stock image
          or another site&apos;s asset.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { src: "/images/shot-1.webp", alt: "Anime Zero hub area, official screenshot" },
            { src: "/images/shot-2.webp", alt: "Anime Zero dungeon combat, official screenshot" },
          ].map((s) => (
            // eslint-disable-next-line @next/next/no-img-element -- static export has no image optimizer
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={768}
              height={432}
              loading="lazy"
              decoding="async"
              className="w-full rounded-[var(--radius-container)] border rule"
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Official screenshots and icon belong to {game.developer}. Used here for
          reference with attribution.
        </p>

        <div className="mt-10">
          <h3 className="text-sm font-medium">Watch the first hour instead of reading it</h3>
          <VideoEmbed className="mt-4" {...VIDEOS.beginner} />
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Where to go next</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NavCard
            href="/codes/"
            title="Codes"
            body={`${codes.length} live codes with exact rewards and level gates.`}
          />
          <NavCard
            href="/weapons/"
            title="Weapons"
            body="The roster so far, sorted down the rarity ladder."
          />
          <NavCard
            href="/tier-list/"
            title="Tier list"
            body="What the published tier lists agree on, and the method to judge your own pulls."
          />
          <NavCard
            href="/guide/"
            title="Guide"
            body="Rolls, traits, the two-slot trap and the current raid, explained."
          />
          <NavCard
            href="/discord/"
            title="Discord"
            body="The official server (111k members) where codes land first — plus why no Trello exists."
          />
          <NavCard
            href="/shadow-monarch/"
            title="Shadow Monarch update"
            body="What the current update added, including three weapons no written roster lists."
          />
          <NavCard
            href="/leveling/"
            title="Leveling"
            body="Level 25 and 50 unlock the biggest code bundles — the route we would take."
          />
          <NavCard
            href="/game/"
            title="The game"
            body="Official link, place ID, launch date, and how to spot the clones."
          />
        </div>
      </section>
    </div>
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

function NavCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="card-glow rounded-[var(--radius-container)] border rule bg-card p-5"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
