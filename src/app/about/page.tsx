import type { Metadata } from "next";
import Link from "next/link";
import { codes, confirmedWeapons, game, gaps, weapons, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "How this site sources Anime Zero data",
  description:
    "The provenance rules behind every number on this site: which claims need two independent sources, what an unconfirmed entry means, and the full list of data nobody has published for Anime Zero.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">About</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">About · last pass {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Where every number comes from
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          Anime Zero is a three-month-old gacha game with no official wiki and no
          published odds. Most sites covering it fill the gaps with confident
          numbers copied from other games. This one keeps the gaps visible — here is
          the rulebook it follows.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Rule
          title="Codes need two independent listings"
          body={`All ${codes.length} codes on this site appear in at least two independent listings with matching rewards. Codes seen only once are held back until a second source confirms them. Where listings disagreed on a reward, the page says so instead of picking a favourite silently.`}
        />
        <Rule
          title="Rarities need two rosters to agree"
          body={`A weapon is only slotted into the rarity ladder when two independent rosters place it at the same rarity — ${confirmedWeapons.length} of the ${weapons.length} entities tracked have cleared that bar. The rest are listed as unconfirmed gaps.`}
        />
        <Rule
          title="Numbers the game publishes beat all of it"
          body="Stats read from the game itself (player counts, visits, dates via the Roblox API) outrank everything else. That hierarchy is why the game facts card on the home page carries a refresh date."
        />
      </section>

      <section className="border-t rule mt-12 py-12">
        <h2 className="text-sm font-medium">What &quot;unconfirmed&quot; means here</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          It means the entity is real — it appears in updates, patch notes or creator
          footage — but no source we accept states the missing fact. It is not a
          synonym for &quot;probably wrong&quot;. {" "}
          <Link href="/weapons/sung-jin-woo/" className="text-primary underline-offset-4 hover:underline">
            Sung Jin-Woo
          </Link>{" "}
          is the clearest example: heavily advertised, obviously in the game, and
          completely undocumented outside videos.
        </p>

        <h2 className="mt-10 text-sm font-medium">The full list of gaps</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {gaps.map((g) => (
            <li key={g} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What this site will not do</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• Invent roll percentages to fill an &quot;odds&quot; column.</li>
          <li>• Copy trade values from a different game or from a Discord price list that has never been corroborated.</li>
          <li>• Leave an expired code on the page to pad the count. Retired codes are removed, not re-dated.</li>
          <li>• Rank weapons in tiers the source lists disagree on without saying so.</li>
        </ul>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Game facts on this site</h2>
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
          <Fact label="Universe ID" value={String(game.universeId)} />
          <Fact label="Place ID" value={String(game.placeId)} />
          <Fact label="Created" value={game.created} />
          <Fact label="Visits" value={game.visits.toLocaleString("en-US")} />
          <Fact label="Favourites" value={game.favorites.toLocaleString("en-US")} />
          <Fact label="Players (CCU)" value={game.ccu.toLocaleString("en-US")} />
        </dl>
        <p className="mt-4 max-w-[64ch] text-sm text-muted-foreground">
          Player counts and dates come from the Roblox games API and were last pulled
          on {LAST_CHECKED}. They move fast — the number here is a snapshot, not a
          promise.
        </p>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          Found something wrong or want a gap filled? The game&apos;s own{" "}
          <a
            href={game.discord}
            target="_blank"
            rel="noopener"
            className="text-primary underline-offset-4 hover:underline"
          >
            Discord
          </a>{" "}
          is where codes and patch numbers land first, and it is the first place this
          site re-checks. Corrections get folded into the next data pass rather than
          quietly edited.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Fan project. Not affiliated with {game.developer} or Roblox Corporation.
          Game names and assets belong to their owners.
        </p>
      </section>
    </article>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold tabular">{value}</dd>
    </div>
  );
}
