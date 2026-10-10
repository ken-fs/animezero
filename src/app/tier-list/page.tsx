import type { Metadata } from "next";
import Link from "next/link";
import { weapons, LAST_CHECKED } from "@/data/game";
import { RarityChip } from "@/components/rarity-chip";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Anime Zero tier list (October 2026) — what the rankings agree on",
  description:
    "The Anime Zero weapon rankings that published tier lists actually agree on, the tier gaps they disagree about, and a repeatable method for judging your own pulls without trusting a stranger's S-tier.",
  alternates: { canonical: "/tier-list/" },
};

/**
 * Tier table. Sources: the community tier lists that publish a full roster
 * ranking (animezerocode's tier list is the most complete; the .wiki rosters
 * agree on the top band). Rows are only included where at least two listings
 * place the weapon in the same band — the rest are called out below.
 */
const TIERS: { tier: string; blurb: string; picks: string[] }[] = [
  {
    tier: "S",
    blurb: "Consensus top. If it drops, you build around it.",
    picks: ["Cataclysm"],
  },
  {
    tier: "A",
    blurb: "Carries endgame content; the realistic chase targets.",
    picks: ["Cursed King", "Shanks", "Guts", "Lights of Divinity", "Alucard"],
  },
  {
    tier: "B",
    blurb: "Fine while you wait for an A-tier; not worth reroll-heavy investment.",
    picks: ["Kings Gambit", "Twisted Agony"],
  },
  {
    tier: "C",
    blurb: "Early-game starters. Replace, do not build.",
    picks: ["Thunder Prodigy", "Cosmic Warrior", "Rubber Man"],
  },
];

export default function TierListPage() {
  const byName = new Map(weapons.map((w) => [w.name, w]));

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Tier list</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Community consensus · checked {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero tier list
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          No tier list for this game is official — there is no published damage
          formula to rank against. What follows is the set of placements that
          multiple independent community rankings agree on, with the disagreements
          named instead of averaged away.
        </p>
      </header>

      <section className="overflow-hidden rounded-[var(--radius-container)] border rule">
        {TIERS.map((t) => (
          <div
            key={t.tier}
            className="grid grid-cols-[3rem_1fr] items-start gap-4 border-b rule bg-card p-5 last:border-b-0 sm:grid-cols-[4rem_1fr]"
          >
            <span className="font-mono text-2xl font-semibold text-primary tabular">
              {t.tier}
            </span>
            <div>
              <div className="flex flex-wrap gap-2">
                {t.picks.map((name) => {
                  const w = byName.get(name);
                  return w ? (
                    <Link
                      key={name}
                      href={`/weapons/${w.slug}/`}
                      className="rounded-[var(--radius-control)] border rule px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {name}
                      {w.rarity && (
                        <span className="ml-2 text-xs text-muted-foreground">{w.rarity}</span>
                      )}
                    </Link>
                  ) : null;
                })}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            </div>
          </div>
        ))}
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-12" />

      <section className="border-t rule mt-12 py-12">
        <h2 className="text-sm font-medium">
          Tier board from in-game footage (checked 2026-10-10)
        </h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          The board below is the latest visual evidence we have: a tier list built
          out of the game&apos;s own weapon cards, circulating in creator videos. It
          disagrees with the older site rosters in two ways worth knowing — it puts
          Cursed King at the top, and it names three weapons no written roster
          carries: <strong className="text-foreground">Dragon Eclipse</strong>,
          <strong className="text-foreground"> Immortal Sovereign</strong> and
          <strong className="text-foreground"> Divine Emperor</strong>. The
          placements are the creator&apos;s reading, not the developer&apos;s; the
          cards themselves are from the game.
        </p>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          {[
            { tier: "S", picks: ["Cursed King", "Dragon Eclipse"] },
            { tier: "A", picks: ["Immortal Sovereign", "Divine Emperor"] },
            { tier: "B", picks: ["Kings Gambit", "Twisted Agony"] },
            { tier: "C", picks: ["Cosmic Warrior", "Rubber Man"] },
          ].map((row) => (
            <div
              key={row.tier}
              className="grid grid-cols-[3rem_1fr] items-center gap-4 border-b rule bg-card px-5 py-4 last:border-b-0"
            >
              <span className="font-mono text-lg font-semibold text-primary tabular">
                {row.tier}
              </span>
              <div className="flex flex-wrap gap-2">
                {row.picks.map((name) => {
                  const w = byName.get(name);
                  return w ? (
                    <Link
                      key={name}
                      href={`/weapons/${w.slug}/`}
                      className="rounded-[var(--radius-control)] border rule px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {name}
                      {w.rarity && (
                        <span className="ml-2 text-xs text-muted-foreground">{w.rarity}</span>
                      )}
                    </Link>
                  ) : (
                    <span key={name} className="rounded border rule px-3 py-1 text-sm">
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Evidence: in-game weapon cards captured from creator footage (YouTube
          video 3QxKuMFpL1E, ~1:05–1:20), read frame by frame. Weapon names on the
          cards are the game&apos;s own; the same applies to the written descriptions
          now on each weapon page.
        </p>
      </section>

      <section className="border-t rule mt-12 py-12">
        <h2 className="text-sm font-medium">Where the rankings disagree</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="font-medium text-foreground">Cursed King.</span> One
            ranking places it at the very top on raw damage; others keep Cataclysm
            alone in S because Cursed King&apos;s area coverage is narrower. Both
            readings are on the record — pick by whether you farm single bosses or
            wave content.
          </li>
          <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="font-medium text-foreground">Alucard&apos;s survivability.</span>{" "}
            Several showcases claim the kit heals. No roster confirms it, so it is
            excluded from the ranking above and flagged on{" "}
            <Link
              href="/weapons/alucard/"
              className="text-primary underline-offset-4 hover:underline"
            >
              its page
            </Link>
            .
          </li>
          <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="font-medium text-foreground">
              Everything below Mythic.
            </span>{" "}
            Placements in the Legendary and Epic bands are effectively a consensus
            of one for most entries — there is not enough independent testing to
            call them settled.
          </li>
        </ul>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The five-minute method (no formula needed)</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          Tier lists go stale the day after a patch, so the durable skill is judging
          a pull yourself. Four questions, in order:
        </p>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            "Does the ultimate hit more than one target? Wave content and raids weight area damage far above single-target numbers.",
            "Does the kit fight at the range you actually play? A top-tier sword you never get to swing loses to a Legendary you can use.",
            "How many Trait Rerolls does it need before it performs? A weapon that is only good with a perfect trait costs twice.",
            "Is a banner update imminent? Chasing the current S-tier the week before a new one is how accounts waste resources.",
          ].map((q, i) => (
            <li
              key={q}
              className="flex gap-4 rounded-[var(--radius-container)] border rule bg-card p-5"
            >
              <span className="font-mono text-sm font-semibold text-primary tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{q}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          Rankings only matter once you own something worth ranking —{" "}
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            codes
          </Link>{" "}
          are the fastest spins, and the{" "}
          <Link href="/weapons/" className="text-primary underline-offset-4 hover:underline">
            full roster
          </Link>{" "}
          shows which rarities still have no published placement.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Zenless", "Arcane", "Mythic", "Legendary", "Epic"].map((r) => (
            <RarityChip key={r} rarity={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
