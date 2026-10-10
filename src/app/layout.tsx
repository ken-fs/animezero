import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { WebsiteJsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { LAST_CHECKED, game } from "@/data/game";

// Fonts: Space Grotesk + JetBrains Mono arrive through @fontsource-variable
// imports in globals.css (self-hosted woff2 inside the npm packages), so the
// build never waits on a Google Fonts download — that failure mode broke a
// Cloudflare build in this fleet on 2026-10-06.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anime Zero codes, weapons and tier list",
    template: "%s | Anime Zero Reference",
  },
  description:
    "Every working Anime Zero code with its reward and level requirement, the weapon roster with what is actually confirmed, and an honest map of what nobody has published. Fan-made, every number has a source.",
  openGraph: {
    type: "website",
    siteName: "Anime Zero Reference",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <WebsiteJsonLd name="Anime Zero Reference" />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-medium">Anime Zero Reference</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An independent player reference for {game.name} on Roblox. Not
              affiliated with {game.developer} or Roblox Corporation. Game names
              and assets belong to their owners.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Last source pass: {LAST_CHECKED}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/codes/" className="text-muted-foreground hover:text-foreground">
              Codes
            </Link>
            <Link href="/weapons/" className="text-muted-foreground hover:text-foreground">
              Weapons
            </Link>
            <Link href="/tier-list/" className="text-muted-foreground hover:text-foreground">
              Tier list
            </Link>
            <Link href="/guide/" className="text-muted-foreground hover:text-foreground">
              Guide
            </Link>
            <Link href="/about/" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t rule pt-6">
          <p className="text-xs text-muted-foreground">
            Community-reported where marked. Confirm in game before spending.
          </p>
        </div>
      </div>
    </footer>
  );
}
