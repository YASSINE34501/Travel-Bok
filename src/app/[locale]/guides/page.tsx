import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { AdSlot } from "@/components/ads/AdSlot";
import { CountryCard } from "@/components/guides/CountryCard";
import { PhotoCredits } from "@/components/common/PhotoCredits";
import { getGuides } from "@/lib/queries";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { pageDescription, pageTitle } from "@/lib/seo-content";
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
    title: pageTitle("guides", locale),
    description: pageDescription("guides", locale),
    path: "/guides",
    locale,
    keywords: keywordsFor("guides", locale),
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, nav, guides] = await Promise.all([
    getTranslations("Guides"),
    getTranslations("Nav"),
    getGuides(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{t("subtitle")}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.countryCode}>
            <CountryCard
              guide={guide}
              locale={locale}
              label={t("readGuide")}
            />
          </li>
        ))}
      </ul>

      <AdSlot slot="4455667788" format="leaderboard" />

      <p className="mt-6 text-xs leading-relaxed text-ink-muted">
        {t("disclaimer")}
      </p>

      <PhotoCredits
        countryCodes={guides.map((g) => g.countryCode)}
        locale={locale}
        collapsible
        className="mt-6"
      />

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: nav("guides"), path: "/guides" },
          ],
          locale,
        )}
      />
    </div>
  );
}
