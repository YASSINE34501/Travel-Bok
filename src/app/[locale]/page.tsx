import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { AdSlot } from "@/components/ads/AdSlot";
import { Hero } from "@/components/home/Hero";
import {
  ExplorerPreview,
  FeatureRow,
  FinalCta,
  GuidesPreview,
  HowItWorks,
  JobsPreview,
  PopularDestinations,
  Stats,
} from "@/components/home/Sections";
import { getCountries, getGuides, getJobs } from "@/lib/queries";
import { pageMetadata, JsonLd, webPageSchema } from "@/lib/seo";
import { pageDescription, pageTitle, withBrand } from "@/lib/seo-content";
import { keywordsFor } from "@/data/seo";

// 12 hours. Must be a literal: Next statically analyses this export.
export const revalidate = 43200;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    // Search-intent title, deliberately not the on-page H1. Branded here
    // because title.template does not reach this segment.
    title: withBrand(pageTitle("home", locale), locale),
    description: pageDescription("home", locale),
    path: "",
    locale,
    keywords: keywordsFor("home", locale),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // An unprefixed URL like /nope or /fr matches this segment with
  // locale="nope". The layout guards the same way, but this component reads
  // locale-keyed copy (pageTitle) while rendering, and that lookup throws
  // "candidates is not iterable" before the layout's own guard can answer —
  // which Next serves as a 500. A missing page must answer 404, not "the
  // server is broken": Google retries a 5xx and slows the whole crawl,
  // whereas it simply drops a 404.
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const [countries, guides, jobs] = await Promise.all([
    getCountries(),
    getGuides(),
    getJobs(),
  ]);

  // Morocco → Germany is the site's most representative pairing: a common
  // origin, a common destination, and a large enough gap to be worth showing.
  const source =
    countries.find((c) => c.code === "ma") ?? countries[0];
  const destination =
    countries.find((c) => c.code === "de") ?? countries[1];

  return (
    <>
      {/*
        The entity's front door was the one page carrying no page-level schema
        at all: the layout declares the Organization and the WebSite, but
        nothing tied this URL to either. No dateModified — the home page
        aggregates three datasets with different review dates, and picking the
        most flattering one would be a freshness claim nothing backs.
      */}
      <JsonLd
        data={webPageSchema({
          name: pageTitle("home", locale),
          description: pageDescription("home", locale),
          path: "",
          locale,
        })}
      />

      <Hero source={source} destination={destination} locale={locale} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Stats countries={countries.length} guides={guides.length} />

        <FeatureRow />

        <AdSlot slot="7282850336" format="leaderboard" />

        <HowItWorks />

        <ExplorerPreview
          source={source}
          destination={destination}
          locale={locale}
        />

        <JobsPreview jobs={jobs} countries={countries} locale={locale} />

        <AdSlot slot="3234909630" format="inline" />

        <GuidesPreview guides={guides} countries={countries} locale={locale} />

        <PopularDestinations
          countries={countries}
          guides={guides}
          locale={locale}
        />

        <FinalCta />
      </div>
    </>
  );
}
