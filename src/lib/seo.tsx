import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";

/** The canonical production host. Must match the domain that actually serves. */
const FALLBACK_SITE_URL = "https://www.travlbok.com";

/**
 * Resolves the canonical origin, defensively.
 *
 * `process.env.X ?? fallback` is not enough: `??` only catches undefined and
 * null, so a variable that is *defined but blank* — the normal state of an
 * unfilled field in a Vercel/CI dashboard — passes straight through as `""`,
 * and `new URL("")` throws ERR_INVALID_URL during the build. A missing protocol
 * ("travlbok.com") throws for the same reason and is an easy thing to type.
 *
 * So: trim, fall back when empty, add a protocol if absent, drop any trailing
 * slash (every caller appends `/${locale}...`), and validate. If the value is
 * still unusable we return the production origin rather than failing the build,
 * because a wrong-but-valid canonical is recoverable and a broken build is not.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,

    // VERCEL_URL is the *per-deployment* hostname
    // (travel-h3u8fo5ml-yassine.vercel.app) and Vercel sets it on production
    // builds too — not just previews. Using it unconditionally pointed every
    // canonical, hreflang, og:url and sitemap entry at a hostname that changes
    // on each deploy, which is why it is now gated to preview builds only.
    // Production must never fall through to it.
    process.env.VERCEL_ENV === "preview" ? process.env.VERCEL_URL : undefined,
  ];

  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;

    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
      return new URL(withProtocol).origin;
    } catch {
      // Try the next candidate rather than taking down the build.
    }
  }

  return FALLBACK_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();

/**
 * Builds canonical + hreflang alternates for a locale-prefixed path.
 * `path` is the locale-free route, e.g. "/guides/de" or "" for the home page.
 */
export function alternates(path: string, locale: Locale): Metadata["alternates"] {
  const clean = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}${clean}`]),
  );

  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: { ...languages, "x-default": `${SITE_URL}/en${clean}` },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  locale,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  /** Translated terms for this page. Low weight for ranking, but still read
   *  by several non-Google engines and by social preview scrapers. */
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

  // The opengraph-image file convention only attaches to the segment it lives
  // in — nested routes do not inherit it — so the share card is referenced
  // explicitly here and every page gets one.
  const image = {
    url: `${SITE_URL}/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "TRAVLBOK — compare cost of living, jobs and visas",
  };

  return {
    title,
    description,
    keywords,
    alternates: alternates(path, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: "TRAVLBOK",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** Renders a JSON-LD block. Kept as a plain script tag — no client JS needed. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema.org payloads are built server-side from our own data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TRAVLBOK",
    // The site root, NOT `${SITE_URL}/${locale}`. One @id must describe one
    // entity identically everywhere: emitting a different `url` on /en than on
    // /ar gave the same organisation two conflicting definitions, which is
    // exactly the inconsistency that makes an entity harder to consolidate.
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    description:
      "Data-driven relocation platform comparing cost of living, salaries, in-demand jobs and visa routes across countries, so people can move abroad on numbers rather than guesswork.",
    /**
     * The subject areas this entity is actually about. Every term below maps to
     * a real section of the site — cost of living to /explorer, jobs and
     * salaries to /jobs, visas and work permits to /guides. It is an entity
     * signal, not a keyword list, so nothing goes here that the site does not
     * genuinely cover.
     */
    knowsAbout: [
      "Relocation",
      "Immigration",
      "Cost of living",
      "Visa requirements",
      "Work permits",
      "Salaries",
      "Job markets",
      "Country comparison",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@travlbok.com",
      contactType: "customer support",
      availableLanguage: ["en", "ar"],
    },
    // No `sameAs`: the project has no verified official social profiles, and
    // pointing an entity at accounts that may not be ours is worse than
    // declaring none.
  };
}

/**
 * Declares the site itself and the two languages it is published in.
 * No SearchAction: there is no site-wide search, and claiming one that does
 * not exist is a fast way to get structured data ignored.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "TRAVLBOK",
    // Site root for the same reason as the Organization above: one @id, one
    // definition, identical on every page in both locales.
    url: SITE_URL,
    inLanguage: locales,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema({
  headline,
  description,
  path,
  locale,
  updatedAt,
}: {
  headline: string;
  description: string;
  path: string;
  locale: Locale;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: locale,
    dateModified: updatedAt,
    datePublished: updatedAt,
    mainEntityOfPage: `${SITE_URL}/${locale}${path}`,
    author: { "@type": "Organization", name: "TRAVLBOK" },
    publisher: {
      "@type": "Organization",
      name: "TRAVLBOK",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
  };
}

/**
 * The page itself, tied to the site and the publisher.
 *
 * This is purely a relationship node: it references the Organization and the
 * WebSite by @id instead of restating them, so a page still carries exactly one
 * definition of each entity. Without it the individual URLs are orphans — an
 * engine can see the site and it can see the article, but nothing states that
 * this page belongs to that site.
 *
 * `dateModified` is optional on purpose. Pass it only where the underlying data
 * carries a real review date; a freshness claim the dataset cannot support is
 * the kind of thing that gets structured data distrusted wholesale.
 */
export function webPageSchema({
  name,
  description,
  path,
  locale,
  updatedAt,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  updatedAt?: string;
}) {
  const url = `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(updatedAt ? { dateModified: updatedAt } : {}),
  };
}

/**
 * Describes a dataset the site genuinely publishes.
 *
 * Every property maps to something visible on /data: `variableMeasured` uses
 * the same labels the page renders, `isBasedOn` is the same source list, and
 * `dateModified` is the real end-to-end review date.
 *
 * Deliberately absent: `license`, `distribution`/`downloadURL`, `version` and
 * `temporalCoverage`. TRAVLBOK declares no licence, ships no download and keeps
 * no version history — and a Dataset advertising a file nobody can fetch is
 * worse than publishing no Dataset at all.
 */
export function datasetSchema({
  name,
  description,
  path,
  locale,
  updatedAt,
  variableMeasured,
  isBasedOn,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  updatedAt: string;
  /** The fields the dataset actually records, in the page's own wording. */
  variableMeasured: string[];
  /** URLs of the upstream sources the compilation is built from. */
  isBasedOn: string[];
}) {
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    url,
    name,
    description,
    inLanguage: locale,
    dateModified: updatedAt,
    // Free to read on the web, with no paywall and no sign-in — the one access
    // claim this site can make truthfully.
    isAccessibleForFree: true,
    variableMeasured,
    isBasedOn,
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}
