import type { Metadata } from "next";
import Link from "next/link";
import { game, weapons, LAST_CHECKED, visitsPerFavourite } from "@/data/game";
import { VideoEmbed } from "@/components/video-embed";
import { VIDEOS } from "@/data/videos";

export const metadata: Metadata = {
  title: "Anime Zero on Roblox — official link, release date and the clone trap",
  description:
    "The official Anime Zero game link with its place ID, when it launched, what it actually is, and how to tell the real game from the copycat listings that borrow its name.",
  alternates: { canonical: "/game/" },
};

const nf = new Intl.NumberFormat("en-US");

export default function GamePage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">The game</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Facts · checked {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero, the actual game
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          Everything on this page comes from the Roblox API, not from a listing site:
          the launch date, the numbers, and the two IDs that prove you are looking at
          the real game rather than one of the clones that copy its name.
        </p>
        <a href={game.robloxUrl} target="_blank" rel="noopener" className="btn-ember mt-6">
          Open Anime Zero on Roblox
        </a>
      </header>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Launched" value={game.created} sub="Roblox universe creation" />
        <Fact label="Developer" value="LY*" sub="197,884-member Roblox group" />
        <Fact label="Genre" value="Action RPG" sub="dungeon crawler with gacha weapons" />
        <Fact label="Max players" value={String(game.maxPlayers)} sub="per server" />
      </section>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4 mt-px">
        <Fact label="Visits" value={nf.format(game.visits)} sub="lifetime" />
        <Fact label="Favourites" value={nf.format(game.favorites)} sub={`${visitsPerFavourite} visits each`} />
        <Fact label="Playing" value={nf.format(game.ccu)} sub="snapshot, moves fast" />
        <Fact label="Last updated" value={game.updated} sub="game patch" />
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium">How to know it is the real one</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            &quot;Anime Zero&quot; is a name that invites clones, and Roblox search
            happily shows games with the same words in the title. Two numbers settle
            it, both visible in the URL when you open the official link above:
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <dt className="text-xs text-muted-foreground">Place ID</dt>
              <dd className="mt-1 font-mono font-semibold">{game.placeId}</dd>
            </div>
            <div className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <dt className="text-xs text-muted-foreground">Universe ID</dt>
              <dd className="mt-1 font-mono font-semibold">{game.universeId}</dd>
            </div>
          </dl>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            The developer is the{" "}
            <a
              href="https://www.roblox.com/communities/861404864"
              target="_blank"
              rel="noopener"
              className="text-primary underline-offset-4 hover:underline"
            >
              LY* group
            </a>{" "}
            (&quot;Studio formed by Passion&quot;, 197,884 members). A game page whose
            creator is not that group is not this game.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium">What you actually do in it</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            You clear dungeon runs with two equipped weapons, swapping between them
            mid-fight. The weapons — &quot;units&quot; — are gacha pulls themed after
            anime characters, and the {weapons.length} documented so far run from the
            Epic starters up to an Arcane tier that tops the in-game board. Between runs
            you reroll weapon traits, craft accessories with Gems, and chase the
            update&apos;s shadow-themed drops.
          </p>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            If you have never played it, the fastest orientation is{" "}
            <Link href="/guide/" className="text-primary underline-offset-4 hover:underline">
              the systems guide
            </Link>{" "}
            plus{" "}
            <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
              the code list
            </Link>{" "}
            — those two cover the first hour without guesswork.
          </p>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Watch a session</h2>
        <VideoEmbed className="mt-4" {...VIDEOS.beginner} />
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What the API does not tell you</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• Monetisation details — how much of the game is gated behind Robux is not published anywhere we can verify.</li>
          <li>• Player-count history — Roblox only exposes the current count, so &quot;it doubled last week&quot; is based on our own snapshots, not an official chart.</li>
          <li>• Platform support beyond Roblox itself (mobile and console are playable through Roblox; a native port does not exist).</li>
        </ul>
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
