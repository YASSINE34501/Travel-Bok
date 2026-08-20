import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { PRIVACY } from "@/data/legal";
import { t as pick } from "@/lib/format";
import { pageMetadata, JsonLd, articleSchema } from "@/lib/seo";
import { keywordsFor } from "@/data/seo";
import { pageDescription, pageTitle } from "@/lib/seo-content";

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
    title: pageTitle("privacy", locale),
    description: pageDescription("privacy", locale),
    path: "/privacy",
    locale,
    keywords: keywordsFor("privacy", locale),
  });
}

export default async function PRIVACYPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LegalArticle doc={PRIVACY} locale={locale} />
      <JsonLd
        data={articleSchema({
          headline: pick(PRIVACY.title, locale),
          description: pick(PRIVACY.description, locale),
          path: "/privacy",
          locale,
          updatedAt: PRIVACY.updatedAt,
        })}
      />
    </>
  );
}
