import type { MetadataRoute } from "next";
import { weapons } from "@/data/game";

import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "daily" },
    { path: "/codes/", priority: 0.9, freq: "daily" },
    { path: "/weapons/", priority: 0.9, freq: "weekly" },
    { path: "/tier-list/", priority: 0.8, freq: "weekly" },
    { path: "/guide/", priority: 0.7, freq: "weekly" },
    { path: "/discord/", priority: 0.8, freq: "weekly" },
    { path: "/shadow-monarch/", priority: 0.8, freq: "weekly" },
    { path: "/leveling/", priority: 0.7, freq: "weekly" },
    { path: "/game/", priority: 0.7, freq: "monthly" },
    { path: "/about/", priority: 0.3, freq: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: SITE_URL + r.path,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...weapons.map((w) => ({
      url: `${SITE_URL}/weapons/${w.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

export const dynamic = "force-static";
