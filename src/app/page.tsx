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
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Anime Zero codes, weapons and tier list",
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
        <p className="tag">Roblox reference · updated {LAST_CHECKED}</p>
        <h1 className="mt-4 max-w-[22ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          Every code and weapon,
          <br />
          <span className="glow text-primary">on one page.</span>
        </h1>
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

        {topCode && (
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
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

      <AdsterraBanner slot={RECTANGLE} className="mt-14" />

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
