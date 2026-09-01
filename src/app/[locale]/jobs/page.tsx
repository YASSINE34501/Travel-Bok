import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { JobMatcher } from "@/components/jobs/JobMatcher";
import { AdSlot } from "@/components/ads/AdSlot";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getCountries, getJobs, getGuides} from "@/lib/queries";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { pageDescription, pageTitle } from "@/lib/seo-content";
import { keywordsFor } from "@/data/seo";
import { FaqSection } from "@/components/common/FaqSection";
import { JOBS_FAQS } from "@/data/faqs";
import { JOBS_DATA_UPDATED } from "@/data/sources";
import { formatDate } from "@/lib/format";

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
    title: pageTitle("jobs", locale),
    description: pageDescription("jobs", locale),
    path: "/jobs",
    locale,
    keywords: keywordsFor("jobs", locale),
  });
}

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  // Rendered per-request so ?country= produces a shareable, pre-filtered list —
  // the same trade /explorer makes for ?from=&to=. Without it the "jobs in
  // Canada" links from the explorer would land on an unfiltered page.
  searchParams: Promise<{ country?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, nav, jobs, countries, guides, query] = await Promise.all([
    getTranslations("Jobs"),
    getTranslations("Nav"),
    getJobs(),
    getCountries(),
    getGuides(),
    searchParams,
  ]);

  // Only accept a country we actually have jobs for.
  const country =
    query.country && jobs.some((j) => j.countryCode === query.country)
      ? query.country
      : "all";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{t("subtitle")}</p>
        {/* Every other substantial page states when its data was reviewed;
            this one did not, which made the demand and salary figures look
            undated. The date is the real one, not the render time. */}
        <p className="mt-3 text-xs text-ink-muted">
          {t("reviewed", { date: formatDate(JOBS_DATA_UPDATED, locale) })}
        </p>
      </header>

      <AdSlot slot="2553267834" format="leaderboard" className="mt-0 mb-8" />

      <DashboardLayout sidebarSlot="8260890083">
        <JobMatcher
        jobs={jobs}
        countries={countries}
        guideCountries={guides.map((g) => g.countryCode)}
        defaultCountry={country}
      />

      <FaqSection faqs={JOBS_FAQS} locale={locale} />

        <AdSlot slot="2054574384" format="inline" />
      </DashboardLayout>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: nav("jobs"), path: "/jobs" },
          ],
          locale,
        )}
      />
    </div>
  );
}
