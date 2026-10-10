import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, systems, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { VideoEmbed } from "@/components/video-embed";
import { VIDEOS } from "@/data/videos";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Anime Zero guide — Arsenal, traits, modes and the two-slot trap",
  description:
    "How Anime Zero actually works: Rolls vs Lucky Spins, what Trait Rerolls are for, the two-weapon-slot trap that eats your best pull, and the modes added by the Shadow Monarch update.",
  alternates: { canonical: "/guide/" },
};

const FIRST_HOUR = [
  "Redeem the ungated codes first — HOP3YOU3NJOY (250 Rolls) and TYASHIRA (500 Lucky Spins) need no level and feed the Arsenal directly.",
  "Roll everything into the Arsenal before your first long dungeon run. An Epic starter clears the opening more comfortably than a bare account, and you replace it soon enough.",
  "Equip one weapon and leave the second slot empty until you understand swapping. The most-reported early mistake is summoning while a weapon sits equipped — it can overwrite the weapon and its trait.",
  "Push quests for the first levels rather than farming. Quest XP is free; Coins are not, and level 25 unlocks the second wave of codes.",
];

export default function GuidePage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Guide</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Systems · checked {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          How Anime Zero works
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          {game.name} is a dungeon-crawler RPG built on a gacha loop: spins buy
          weapons, weapons carry traits, traits decide whether your damage scales.
          This page covers the loop in order, and marks the parts even the game
          does not explain.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {systems.map((s) => (
          <div
            key={s.name}
            className="rounded-[var(--radius-container)] border rule bg-card p-5"
          >
            <h2 className="text-sm font-semibold">{s.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
          </div>
        ))}
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-12" />

      <section className="border-t rule mt-12 py-12">
        <h2 className="text-sm font-medium">Your first hour, in order</h2>
        <ol className="mt-5 space-y-4">
          {FIRST_HOUR.map((step, i) => (
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
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
          <span className="text-sm text-muted-foreground">Start here:</span>
          {codes[0] && (
            <code className="font-mono text-sm font-semibold">{codes[0].code}</code>
          )}
          {codes[0] && <CopyCode code={codes[0].code} />}
          <Link
            href="/codes/"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            The full code list
          </Link>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The Shadow Monarch update, as it stands</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          The current headline update added a raid mode (creators call it the
          Spirited Away raid) and a Shadow Monarch-themed chase entity —&quot;0.01%
          Sung Jin-Woo&quot; is how the videos advertise it. The update is why the
          game&apos;s player count roughly doubled in a week, and why codes like
          ARISE67 exist. What the update did <em>not</em> ship is documentation: the
          new entity&apos;s rarity and kit are in the same unpublished state as the
          rest of the roster.
        </p>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          Practical reading: if you are returning for the update, redeem the level-50
          codes you may now qualify for (ARISE67, NEWRAID, UPDATETWO,
          SORRYFORZEDELAY), then check{" "}
          <Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">
            the tier list
          </Link>{" "}
          before you commit rerolls to anything new.
        </p>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Watch someone do the first hour</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          If a wall of systems reads worse than watching them, this walk-through
          covers the same ground from a fresh account — useful because it shows the
          actual Arsenal UI rather than describing it.
        </p>
        <VideoEmbed className="mt-5" {...VIDEOS.beginner} />
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What this guide cannot tell you yet</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• Exact roll odds and pity — unpublished, and nobody has enough pulls logged to derive them credibly.</li>
          <li>• The full trait table — the effect list exists in-game, but no source we can verify has transcribed it.</li>
          <li>• Evolution costs per rarity — duplicate counts and material requirements vary and are unpublished.</li>
          <li>• Mode level recommendations — the reputable listings contradict each other on every raid.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
            Why we leave those blank instead of copying numbers
          </Link>
        </p>
      </section>
    </article>
  );
}
