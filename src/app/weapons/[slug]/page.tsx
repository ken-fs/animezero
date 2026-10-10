import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  codes,
  game,
  rarityRank,
  sortedWeapons,
  weapons,
  LAST_CHECKED,
  type Weapon,
} from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { RarityChip } from "@/components/rarity-chip";

export function generateStaticParams() {
  return weapons.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/weapons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const weapon = weapons.find((x) => x.slug === slug);
  if (!weapon) return {};
  const title = weapon.rarity
    ? `${weapon.name} in Anime Zero: ${weapon.rarity} weapon`
    : `${weapon.name} in Anime Zero: rarity not published`;
  return {
    title,
    description: weapon.rarity
      ? `${weapon.name} is a ${weapon.rarity}-rarity Anime Zero weapon${weapon.inspiredBy ? `, themed after ${weapon.inspiredBy}` : ""}. What two independent sources agree on, and what is still missing.`
      : `${weapon.name} appears in Anime Zero but no published roster states its rarity or kit. Here is what that means and how to check it in game.`,
    alternates: { canonical: `/weapons/${weapon.slug}/` },
  };
}

export default async function WeaponPage({ params }: PageProps<"/weapons/[slug]">) {
  const { slug } = await params;
  const weapon = weapons.find((w) => w.slug === slug);
  if (!weapon) notFound();

  const others = sortedWeapons.filter((w) => w.slug !== weapon.slug).slice(0, 8);
  const newestCode = codes[0];

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/weapons/" className="hover:text-foreground">
          Weapons
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">{weapon.name}</span>
      </nav>

      <header className="pt-6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          {weapon.rarity ? (
            <RarityChip rarity={weapon.rarity} />
          ) : (
            <span className="tag">rarity not published</span>
          )}
          <span className="text-xs text-muted-foreground">
            checked {LAST_CHECKED} · {weapon.sources} source
            {weapon.sources === 1 ? "" : "s"}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {weapon.name}
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {weapon.rarity ? (
            <>
              {weapon.name} is a{" "}
              <strong className="font-medium text-foreground">{weapon.rarity}</strong>{" "}
              weapon in {game.name}
              {weapon.inspiredBy ? (
                <>
                  , themed after{" "}
                  <strong className="font-medium text-foreground">{weapon.inspiredBy}</strong>
                </>
              ) : null}
              . {weapon.note}
            </>
          ) : (
            <>
              {weapon.name} is real — it shows up in {game.name} footage — but no
              published roster states its rarity or kit. That is a gap in the public
              record, not an oversight on this page.
            </>
          )}
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">What is confirmed</h2>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
            <Stat label="Rarity" value={weapon.rarity ?? "not published"} />
            <Stat label="Themed after" value={weapon.inspiredBy ?? "not attributed"} />
            <Stat label="Agreement" value={`${weapon.sources} source${weapon.sources === 1 ? "" : "s"}`} />
          </dl>

          <h2 className="mt-12 text-sm font-medium">What the roster notes say</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            &quot;{weapon.note}&quot; — community rosters and tier lists are the source
            for this line; the game itself publishes nothing per-weapon. Where a claim
            (like healing on a lifesteal-themed kit) is repeated by creators but
            appears in no roster, this page says so instead of repeating it as fact.
          </p>

          <h2 className="mt-12 text-sm font-medium">How to judge it yourself</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            Rarity is a floor, not a verdict: a weapon&apos;s real output depends on the
            traits rolled onto it and whether its kit matches the mode you farm. Two
            checks worth running before you invest: does its ultimate hit multiple
            targets (matters for dungeon clears), and does its attack range fit how you
            play the two-slot swap.{" "}
            <Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">
              The tier list
            </Link>{" "}
            collects what the published rankings agree on for this roster.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="text-sm text-muted-foreground">
              Rolling for it? Newest code:
            </span>
            {newestCode && (
              <code className="font-mono text-sm font-semibold">{newestCode.code}</code>
            )}
            {newestCode && <CopyCode code={newestCode.code} />}
            <Link
              href="/codes/"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              All {codes.length} codes
            </Link>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Getting it</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Weapons are summoned at the Arsenal with Rolls (standard) or Lucky Spins
              (better odds). Odds and pity are unpublished — treat any percentage you
              see quoted as a community estimate, including on this site.
            </p>
            <Link
              href="/guide/"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              How the Arsenal works
            </Link>
          </div>

          {weapon.rarity && rarityRank(weapon.rarity) > 0 && (
            <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                Sit above {weapon.rarity} on the ladder?{" "}
                <Link
                  href="/weapons/"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Check the full roster
                </Link>{" "}
                before you sink rerolls into this one.
              </p>
            </div>
          )}

          <div>
            <h2 className="text-sm font-medium">Other weapons we track</h2>
            <ul className="mt-3 space-y-1.5">
              {others.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/weapons/${w.slug}/`}
                    className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                  >
                    <span>{w.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular">
                      {w.rarity ?? "unconfirmed"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold tabular">{value}</dd>
    </div>
  );
}
