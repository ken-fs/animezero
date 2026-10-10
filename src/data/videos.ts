/**
 * Creator videos worth embedding, checked by hand before adding.
 *
 * Rules: embed only, never re-upload; the caption always names the channel;
 * nothing that is a codes-only video may drift more than a patch behind, so
 * codes embeds carry the date they were checked.
 */
export type Video = {
  id: string;
  title: string;
  channel: string;
  meta: string;
  /** Where it is embedded and why that page needs it. */
  why: string;
};

export const VIDEOS: Record<string, Video> = {
  beginner: {
    id: "KUiGPjjmWyA",
    title: "Anime Zero Is OUT! Everything You Need to Know (Beginner Guide)",
    channel: "Ashira RBX",
    meta: "video, 5:55",
    why: "Full walk-through of the first hour",
  },
  codes: {
    id: "j55rWDgQcnI",
    title: "All working Anime Zero codes until the Spirited Away update",
    channel: "B乛MaX丨Rohaan YT",
    meta: "video, 4:22",
    why: "Reads every code out on screen — the cross-check behind the table above",
  },
  tierlist: {
    id: "3QxKuMFpL1E",
    title: "The BEST Character Tier List For Anime Zero (UPDATED)",
    channel: "D1SGUISED",
    meta: "video, 2:59",
    why: "The in-game weapon cards and tier board this site frame-read",
  },
  abilities: {
    id: "U6RYN_Fy5U8",
    title: "I Tried EVERY Ability In Anime Zero",
    channel: "MK",
    meta: "video, 9:41",
    why: "What the kits actually look like in combat",
  },
};
