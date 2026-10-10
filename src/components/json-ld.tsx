import { SITE_URL } from "@/lib/site";
/**
 * Structured data.
 *
 * Only two shapes are emitted: a WebSite node for the site itself, and FAQPage
 * where a page genuinely answers questions. No aggregateRating or
 * reviewCount, because there are no reviews to aggregate.
 */
export function WebsiteJsonLd({ name }: { name: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: SITE_URL,
    description:
      "An independent Anime Zero reference: working codes with rewards, the weapon roster with cross-checked rarities, and an honest map of what is still unpublished.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Ordered roster, so search engines see the same ordering the page shows. */
export function WeaponListJsonLd({ weapons }: { weapons: { name: string; slug: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Anime Zero weapon roster",
    numberOfItems: weapons.length,
    itemListElement: weapons.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.name,
      url: `${SITE_URL}/weapons/${u.slug}/`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
