import type { Metadata } from "next";
import Link from "next/link";
import { game, codes, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "Anime Zero Discord — the official server (111k members)",
  description:
    "The official Anime Zero Discord invite, what actually gets posted there (codes land there first), the developer group, and why no official Trello exists yet. Member counts checked live.",
  alternates: { canonical: "/discord/" },
};

const nf = new Intl.NumberFormat("en-US");

/** Pulled live from Discord's public invite API on the last pass. */
const SERVER = {
  invite: "https://discord.com/invite/animezero",
  name: "Anime Zero",
  id: "1409895167976276081",
  members: 111289,
  online: 38063,
  checked: LAST_CHECKED,
};

export default function DiscordPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Discord</span>
      </nav>

      <header className="pt-6 pb-10">
        <p className="tag">Checked {SERVER.checked}</p>
        <h1 className="mt-3 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Anime Zero Discord
        </h1>
        <p className="mt-4 max-w-[64ch] text-muted-foreground">
          The official server is where {game.name} codes land <em>first</em> — usually
          within minutes of an update going live, hours before any listing site picks
          them up. Everything on this site&apos;s{" "}
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            codes page
          </Link>{" "}
          was cross-checked against sources that watch this server.
        </p>

        <a href={SERVER.invite} target="_blank" rel="noopener" className="btn-ember mt-6">
          Join the Anime Zero Discord
        </a>
      </header>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Server" value={SERVER.name} sub={`id ${SERVER.id}`} />
        <Fact label="Members" value={nf.format(SERVER.members)} sub="Discord invite API" />
        <Fact label="Online now" value={nf.format(SERVER.online)} sub={`checked ${SERVER.checked}`} />
        <Fact
          label="Developer group"
          value="LY*"
          sub="197,884 members on Roblox"
        />
      </section>

      <section className="grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium">What actually gets posted there</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">Codes, first</p>
              <p className="mt-1 text-muted-foreground">
                New codes (and typo-fixes for old ones — several codes on our list are
                literally named after apologies for delays and typos) are announced in
                the server before anywhere else.
              </p>
            </li>
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">Compensation and bug reports</p>
              <p className="mt-1 text-muted-foreground">
                Rollback and compensation codes (AZISOUT, SORRYFORDELAY) come from
                here, which is why skipping the server means missing free rolls.
              </p>
            </li>
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">Update chatter, not patch notes</p>
              <p className="mt-1 text-muted-foreground">
                The developer posts announcements, but there is no written patch-note
                archive — details get pieced together from the server plus creator
                videos.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium">There is no official Trello</h2>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            &quot;Anime Zero Trello&quot; gets searched a lot because most Roblox games
            of this size keep one. This one does not — no Trello board is linked from
            the Roblox page, the developer group, or the announcements server, and the
            sites promising one are linking a page that lists the same Discord you
            already have above. If a board appears it will be added here the day it
            does.
          </p>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            What the server is <em>not</em> good for: hard numbers. Roll odds, pity
            thresholds and damage formulas are not published there either — that gap is
            documented on{" "}
            <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
              the about page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The fastest code workflow</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            "Join the server above and open the announcements channel.",
            "Enable notifications for that channel only — everything else is noise.",
            "When a code drops, redeem it immediately: most expire silently and a few are level-gated.",
            `Cross-check against this site's ${codes.length}-code table, which is rebuilt at least once a day.`,
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

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          Member and online counts were read from Discord&apos;s public invite API on{" "}
          {SERVER.checked} — they move fast, so treat them as a snapshot.{" "}
          <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
            See the current codes
          </Link>{" "}
          or{" "}
          <Link href="/shadow-monarch/" className="text-primary underline-offset-4 hover:underline">
            what the current update added
          </Link>
          .
        </p>
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
