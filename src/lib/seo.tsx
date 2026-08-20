import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://travlbok.com";

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

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TRAVLBOK",
    url: `${SITE_URL}/${locale}`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    description:
      "Cost of living comparison, degree-to-job matching and visa guides for migrants and expats.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@travlbok.com",
      contactType: "customer support",
      availableLanguage: ["en", "ar"],
    },
  };
}

/**
 * Declares the site itself and the two languages it is published in.
 * No SearchAction: there is no site-wide search, and claiming one that does
 * not exist is a fast way to get structured data ignored.
 */
export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "TRAVLBOK",
    url: `${SITE_URL}/${locale}`,
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
