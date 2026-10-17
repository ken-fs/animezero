import raw from "./game.json";

/**
 * Single source of truth for every number on this site.
 *
 * Provenance rules, enforced by the shape of this file:
 *  - `verified: false` means the entity is real (it appears in updates or
 *    creator footage) but no published source states its rarity or kit. Pages
 *    must render that as a gap, never a guess.
 *  - `sources` on a code or weapon records how many independent listings agreed
 *    with what is written here. The site publishes at two sources minimum for
 *    codes and shows the count instead of hiding it.
 *  - The `gaps` list is rendered on /about/ rather than left implicit.
 */

export type Rarity = "Zenless" | "Arcane" | "Mythic" | "Legendary" | "Epic";

export type Weapon = {
  name: string;
  slug: string;
  /** Null until two sources agree on a rarity. */
  rarity: string | null;
  /** The anime character the weapon is themed after, where reported. */
  inspiredBy: string | null;
  note: string;
  sources: number;
  verified: boolean;
};

export type Code = {
  code: string;
  reward: string;
  requirement: string | null;
  sources: number;
  /** YouTube ID of the creator footage that shows this code redeemed in-game.
   *  Set only on the exceptions that shipped before a second listing carried
   *  them — the row gets a video badge so the sourcing stays traceable. */
  video?: string;
};

export type System = { name: string; detail: string };

export const game = raw.game;
export const codes = raw.codes as Code[];
export const weapons = raw.weapons as Weapon[];
export const systems = raw.systems as System[];
export const redeemSteps = raw.redeemSteps as string[];
export const gaps = raw.gaps as string[];

/** Highest codes first: newest and most generous, the ones people redeem today. */
export const topCodes = codes.filter((c) => c.sources >= 3);

/** Weapons with at least a confirmed rarity. The rest are name-only entries. */
export const confirmedWeapons = weapons.filter((w) => w.verified);

/** The rarity ladder, top rung first. Used for ordering and colour. */
export const RARITY_ORDER = ["Zenless", "Arcane", "Mythic", "Legendary", "Epic"] as const satisfies readonly Rarity[];

export function rarityRank(rarity: string | null): number {
  const i = RARITY_ORDER.indexOf((rarity ?? "") as (typeof RARITY_ORDER)[number]);
  return i === -1 ? RARITY_ORDER.length : i;
}

export const sortedWeapons = [...weapons].sort(
  (a, b) => rarityRank(a.rarity) - rarityRank(b.rarity) || a.name.localeCompare(b.name),
);

/** ISO date of the last pass over every source this site uses. */
export const LAST_CHECKED = "2026-10-17";

/**
 * Visits per favourite — the retention proxy the radar uses to separate games
 * players commit to from games they walk through. Lower is stickier; the fleet
 * benchmark ranges from 19 (best) to 3,700 (worst). Anime Zero sits near the
 * fleet's best, which is why it is worth writing about at all.
 */
export const visitsPerFavourite = Math.round(game.visits / game.favorites);
