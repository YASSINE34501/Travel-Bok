import type { MetadataRoute } from "next";
import { VISA_GUIDES } from "@/data/guides";
import { LEGAL_DOCUMENTS } from "@/data/legal";
import { COST_DATA_UPDATED } from "@/data/sources";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: Date;
};

const now = new Date();

/**
 * Every indexable URL is emitted once per locale with full hreflang
 * alternates, so Google treats /en/… and /ar/… as translations of one page
 * rather than duplicates competing with each other.
 *
 * /login and /register are deliberately absent: both are marked noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "", priority: 1, changeFrequency: "weekly", lastModified: now },
    {
      path: "/explorer",
      priority: 0.9,
      changeFrequency: "weekly",
      lastModified: new Date(COST_DATA_UPDATED),
    },
    { path: "/jobs", priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { path: "/guides", priority: 0.9, changeFrequency: "weekly", lastModified: now },

    ...VISA_GUIDES.map((guide) => ({
      path: `/guides/${guide.countryCode}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: new Date(guide.updatedAt),
    })),

    ...LEGAL_DOCUMENTS.map((doc) => ({
      path: `/${doc.slug}`,
      // Policy pages must be crawlable for AdSense review, but should never
      // outrank the tools, hence the low priority.
      priority: doc.slug === "about" ? 0.5 : 0.3,
      changeFrequency: "yearly" as const,
      lastModified: new Date(doc.updatedAt),
    })),

    { path: "/contact", priority: 0.5, changeFrequency: "yearly", lastModified: now },
  ];

  return entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${entry.path}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${entry.path}`]),
        ),
      },
    })),
  );
}
