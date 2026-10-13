import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";

export const metadata: Metadata = {
  title: "Anime Zero leveling guide — hit 25 and 50 fast (code gates)",
  description:
    "Why Anime Zero levels matter more than in most Roblox RPGs: four of the biggest codes are gated at level 25 and 50. The route we would take from a fresh account, and the XP numbers nobody has published.",
  alternates: { canonical: "/leveling/" },
};

const UNGATED = ["HOP3YOU3NJOY", "TYASHIRA", "SERVERLIVE67", "BENICE2ME"];
const GATE_25 = ["SORRYFORDELAY"];
const GATE_50 = ["NEWRAID", "UPDATETWO", "ARISE67", "SORRYFORZEDELAY"];

export default function LevelingPage() {
  const byCode = new Map(codes.map((c) => [c.code, c]));

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Leveling</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Systems · checked {LAST_CHECKED}</p>
        <h1 className="mt-3 max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Level 25 and level 50 are where the free rolls live
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          In most Roblox RPGs, leveling is about power. In {game.name} it is also about{" "}
          <em>money</em>: four of the largest codes on the board refuse to redeem below
          level 50, and one below 25. That makes your first two evenings the highest-value
          grind in the game.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <GateCard
          title="No gate — redeem now"
          codes={UNGATED}
          byCode={byCode}
          note="These work on a fresh account. 250 Rolls and 500 Lucky Spins is enough for a first Arsenal run."
        />
        <GateCard
          title="Level 25"
          codes={GATE_25}
          byCode={byCode}
          note="The first checkpoint; reachable in a normal evening of questing."
        />
        <GateCard
          title="Level 50"
          codes={GATE_50}
          byCode={byCode}
          note="The big bundles — hundreds of Trait Rerolls per code. Worth saving a session for."
        />
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">The route we would take</h2>
        <ol className="mt-5 space-y-4">
          {[
            "Redeem every ungated code first — HOP3YOU3NJOY alone is 250 Rolls, which is a full Arsenal session before you have fought anything.",
            "Spend those rolls at the Arsenal and equip your best pull. An Epic starter clears early story noticeably faster than bare fists.",
            "Push the story dungeons rather than farming the first one. Story progression unlocks higher-reward runs; replays of stage one do not.",
            "Take every quest you can hold. Quest XP is the only progress that does not consume Coins or rerolls.",
            "Use AFK-style farming only to fill dead time — creators cover an AFK chamber for it, and it is a supplement to questing, not a replacement.",
            "At 25, redeem SORRYFORDELAY and keep pushing. At 50, redeem the four-code bundle at once and plan a reroll session: that is several hundred Trait Rerolls in one go.",
          ].map((step, i) => (
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
        <h2 className="text-sm font-medium">What nobody has published</h2>
        <p className="mt-3 max-w-[64ch] text-sm text-muted-foreground">
          There is no XP-per-level table, no published level cap, and no official
          statement of how much XP a given dungeon pays. Every &quot;level 100 in an
          hour&quot; claim on YouTube is a route someone ran once, not a rate the game
          documents — so this page gives the order of operations and skips the fake
          numbers.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Worst case you redeem the level-50 bundle a day later than a video promised.
          That is the trade this site makes instead of inventing a table.
        </p>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            The full {codes.length}-code list
          </Link>{" "}
          ·{" "}
          <Link href="/traits/" className="text-primary underline-offset-4 hover:underline">
            how traits and rerolls work
          </Link>{" "}
          ·{" "}
          <Link href="/discord/" className="text-primary underline-offset-4 hover:underline">
            where new codes land first
          </Link>
        </p>
      </section>
    </article>
  );
}

function GateCard({
  title,
  codes: list,
  byCode,
  note,
}: {
  title: string;
  codes: string[];
  byCode: Map<string, { reward: string }>;
  note: string;
}) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {list.map((code) => {
          const c = byCode.get(code);
          return (
            <li key={code} className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-xs font-semibold">{code}</code>
              <CopyCode code={code} />
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
