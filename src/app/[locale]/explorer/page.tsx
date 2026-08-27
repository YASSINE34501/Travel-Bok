import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { CostComparer } from "@/components/explorer/CostComparer";
import { AdSlot } from "@/components/ads/AdSlot";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataProvenance } from "@/components/common/DataProvenance";
import { RelatedLinks } from "@/components/common/RelatedLinks";
import { getCountries, getGuides } from "@/lib/queries";
import { COST_DATA_UPDATED } from "@/data/sources";

import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { pageDescription, pageTitle } from "@/lib/seo-content";
import { keywordsFor } from "@/data/seo";
import { FaqSection } from "@/components/common/FaqSection";
import { EXPLORER_FAQS } from "@/data/faqs";

// Rendered per-request because ?from=&to= drives the initial comparison,
// which is what makes a comparison shareable. Data itself is in-process.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: pageTitle("explorer", locale),
    description: pageDescription("explorer", locale),
    path: "/explorer",
    locale,
    keywords: keywordsFor("explorer", locale),
  });
}

export default async function ExplorerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, nav, countries, guides, query] = await Promise.all([
    getTranslations("Explorer"),
    getTranslations("Nav"),
    getCountries(),
    getGuides(),
    searchParams,
  ]);

  const codes = new Set(countries.map((c) => c.code));
  const from = query.from && codes.has(query.from) ? query.from : "ma";
  const to = query.to && codes.has(query.to) ? query.to : "de";
  const destination = countries.find((c) => c.code === to);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{t("subtitle")}</p>
      </header>

      <AdSlot slot="2553267834" format="leaderboard" className="mt-0 mb-8" />

      <DashboardLayout sidebarSlot="7306901062">
        <CostComparer countries={countries} defaultFrom={from} defaultTo={to} />

      <DataProvenance
        locale={locale}
        variant="cost"
        updatedAt={COST_DATA_UPDATED}
        className="mt-6"
      />

      {destination ? (
        <RelatedLinks
          destination={destination}
          hasGuide={guides.some((g) => g.countryCode === destination.code)}
          locale={locale}
          className="mt-10"
        />
      ) : null}

      <FaqSection faqs={EXPLORER_FAQS} locale={locale} />

        <AdSlot slot="4164847922" format="inline" />
      </DashboardLayout>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: nav("explorer"), path: "/explorer" },
          ],
          locale,
        )}
      />
    </div>
  );
}
