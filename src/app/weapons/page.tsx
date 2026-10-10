import type { Metadata } from "next";
import Link from "next/link";
import {
  RARITY_ORDER,
  game,
  sortedWeapons,
  weapons,
  confirmedWeapons,
  LAST_CHECKED,
} from "@/data/game";
import { RarityChip } from "@/components/rarity-chip";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Anime Zero weapons — full roster by rarity",
  description:
    "Every Anime Zero weapon documented so far, sorted down the Zenless → Epic rarity ladder, with the anime character each one is themed after and what two independent sources agree on.",
  alternates: { canonical: "/weapons/" },
};

export default function WeaponsPage() {
  const byRarity = RARITY_ORDER.map((r) => ({
    rarity: r,
    items: sortedWeapons.filter((w) => w.rarity === r),
  })).filter((g) => g.items.length > 0);
  const unranked = weapons.filter((w) => w.rarity === null);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Weapons</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Roster · updated {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero weapons
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          &quot;Units&quot; in {game.name} are weapons summoned at the Arsenal — each one
          themed after an anime character and carrying a basic attack, three skills
          and an ultimate. {confirmedWeapons.length} of the {weapons.length} entities
          below have a rarity that two independent rosters agree on. The rest are
          listed as gaps rather than guesses.
        </p>
      </header>

      <section className="rounded-[var(--radius-container)] border rule bg-card p-5">
        <h2 className="text-sm font-medium">The rarity ladder</h2>
        <p className="mt-2 max-w-[70ch] text-sm text-muted-foreground">
          Five rungs, and the gap between them matters more than the number on the
          card: Zenless and Arcane are single-weapon rarities (one each as of this
          writing), Mythic is the realistic endgame target, Legendary is the first
          rung that competes, and Epic exists to be replaced.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {RARITY_ORDER.map((r, i) => (
            <span key={r} className="flex items-center gap-2">
              {i > 0 && <span className="text-border">→</span>}
              <RarityChip rarity={r} />
            </span>
          ))}
        </div>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-10" />

      {byRarity.map((group) => (
        <section key={group.rarity} className="mt-12">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">{group.rarity}</h2>
            <RarityChip rarity={group.rarity} count={group.items.length} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((w) => (
              <Link
                key={w.slug}
                href={`/weapons/${w.slug}/`}
                className="card-glow rounded-[var(--radius-container)] border rule bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{w.name}</p>
                  {!w.verified && <span className="tag">unconfirmed</span>}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {w.inspiredBy ? `Themed after ${w.inspiredBy}` : "Character not attributed"}
                  {" · "}
                  {w.sources} source{w.sources === 1 ? "" : "s"}
                </p>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{w.note}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {unranked.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Seen in game, not yet ranked</h2>
            <span className="tag">gap</span>
          </div>
          <p className="mt-2 max-w-[64ch] text-sm text-muted-foreground">
            These appear in update footage or creator videos but no published roster
            states their rarity. They are listed so you can search for them, not as
            a ranking — when two sources agree on a rarity they move up into the
            ladder above.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unranked.map((w) => (
              <Link
                key={w.slug}
                href={`/weapons/${w.slug}/`}
                className="card-glow rounded-[var(--radius-container)] border rule bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{w.name}</p>
                  <span className="tag">unconfirmed</span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{w.note}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t rule mt-14 py-10">
        <p className="text-sm text-muted-foreground">
          Weapons come out of the Arsenal, and rolls come out of{" "}
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            codes
          </Link>
          . If you pulled something and want to know whether it is worth building,{" "}
          <Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">
            the tier list
          </Link>{" "}
          explains what the published rankings agree on.
        </p>
      </section>
    </article>
  );
}
