import type { Metadata } from "next";
import Link from "next/link";
import { codes, LAST_CHECKED } from "@/data/game";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Anime Zero traits — rerolls, the two-slot trap, and honest odds",
  description:
    "How traits work in Anime Zero: what a trait actually is, how Trait Rerolls change them, the two-slot overwrite trap that eats traits, and which weapons deserve your rerolls.",
  alternates: { canonical: "/traits/" },
};

const FAQ = [
  {
    q: "What is a trait in Anime Zero?",
    a: "A modifier attached to a weapon. The weapon sets your base damage; the trait changes how it performs. A strong weapon with a weak trait underperforms a good weapon with the right trait, which is why the tier list weighs reroll cost, not just raw rarity.",
  },
  {
    q: "How do Trait Rerolls work in Anime Zero?",
    a: "A Trait Reroll re-randomizes the trait on a weapon. Rerolls are the scarcest resource in the game — four codes alone pay out several hundred of them — so the plan is to hoard them until a weapon worth keeping shows up, then spend in one planned session.",
  },
  {
    q: "What is the two-slot trap in Anime Zero?",
    a: "Summoning or rolling while a weapon sits equipped can overwrite that weapon and its trait. It is the most-reported way players lose a good roll. Keep the second slot empty until you understand swapping, and never roll with your best weapon equipped.",
  },
  {
    q: "Is there a full Anime Zero trait list?",
    a: "The effect list exists in-game, but no source we can verify has transcribed the full table with exact numbers. Any site publishing one today is guessing. This page covers the mechanics that decide outcomes; the numbers get added when a verifiable source appears.",
  },
];

export default function TraitsPage() {
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
        <span className="text-foreground">Traits</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Updated {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[22ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero traits
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Traits are the modifier layer on top of weapons — and Trait Rerolls are the
          resource every big code bundle keeps paying you. This page covers how the
          system works, the trap that eats good traits, and how to plan a reroll
          session. What it does not publish is a made-up trait table.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
          <h2 className="text-sm font-medium">What a trait actually is</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every weapon carries a trait — a modifier that changes how the weapon
            performs. The weapon is the chassis; the trait is the tuning. Two copies
            of the same weapon with different traits are not the same weapon in
            practice, which is why rerolls exist and why they are worth hoarding.
          </p>
        </div>
        <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
          <h2 className="text-sm font-medium">What we do not know — on purpose</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The full trait effect list lives in-game, but no source we can verify has
            transcribed the table with exact numbers. We do not guess. When the table
            gets a verifiable source, it lands here — until then this page sticks to
            the mechanics that decide outcomes.
          </p>
        </div>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">The two-slot trap</h2>
        <div className="mt-5 rounded-[var(--radius-container)] border rule bg-card p-5">
          <p className="max-w-[70ch] text-sm text-muted-foreground">
            You have two weapon slots, and you can switch between them during a run.
            The trap: <strong className="font-medium text-foreground">rolling or
            summoning while a weapon sits equipped can overwrite that weapon — and
            its trait with it</strong>. It is the most-reported early mistake, and
            the most expensive way to lose a good roll.
          </p>
          <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>1. Keep the second slot empty until you understand swapping.</li>
            <li>2. Never roll with your best weapon equipped.</li>
            <li>3. Once both slots hold weapons you like, reroll only what you can afford to lose.</li>
          </ol>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">How to plan a reroll session</h2>
        <ol className="mt-5 grid gap-4 lg:grid-cols-2">
          <Step
            n="01"
            title="Hoard until a keeper shows up"
            body="Rerolls are the scarcest currency in the game — four codes alone pay out several hundred. Spending them on a weapon you will replace next week is the common waste. Wait for a weapon you would keep for a month: a Mythic you actually use, or the Epic that carries your runs."
          />
          <Step
            n="02"
            title="Redeem the level-50 bundle first"
            body="The big reroll payouts sit behind level gates — NEWRAID, SORRYFORZEDELAY, UPDATETWO and ARISE67 need level 50, SORRYFORDELAY needs 25. The leveling route maps the fastest path there. Redeeming the whole bundle at once turns one afternoon into several hundred rerolls."
          />
          <Step
            n="03"
            title="Unequip before you roll"
            body="The two-slot trap applies to rerolls too. Move your keeper out of the equipped slot, then spend. Losing a fresh trait to an overwrite is worse than not rolling at all."
          />
          <Step
            n="04"
            title="Set a stop rule before you start"
            body="Decide what you are keeping before the first reroll: any improvement, or a specific effect you saw in-game. Without a stop rule, a reroll session ends when the stack hits zero — which is exactly where the game wants it."
          />
        </ol>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Which weapons deserve rerolls</h2>
        <p className="mt-4 max-w-[70ch] text-sm text-muted-foreground">
          The tier list already weighs the question that matters here:{" "}
          <em>how many Trait Rerolls does a weapon need before it performs?</em> A
          weapon that is only good with a perfect trait costs twice — once in rolls
          to get it, again in rerolls to fix it. Check the{" "}
          <Link href="/tier-list/" className="text-primary underline-offset-4 hover:underline">
            tier list
          </Link>{" "}
          before committing a stack, and the{" "}
          <Link href="/weapons/" className="text-primary underline-offset-4 hover:underline">
            weapon pages
          </Link>{" "}
          for what each rarity tier realistically replaces.
        </p>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            The {codes.length} working codes
          </Link>{" "}
          — several hundred rerolls behind level gates ·{" "}
          <Link href="/leveling/" className="text-primary underline-offset-4 hover:underline">
            the fastest route to level 50
          </Link>{" "}
          ·{" "}
          <Link href="/guide/" className="text-primary underline-offset-4 hover:underline">
            how the Arsenal works
          </Link>
        </p>
      </section>
    </article>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <span className="font-mono text-xs font-semibold text-primary tabular">{n}</span>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </li>
  );
}
