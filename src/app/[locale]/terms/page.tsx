import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { TERMS } from "@/data/legal";
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
    title: pageTitle("terms", locale),
    description: pageDescription("terms", locale),
    path: "/terms",
    locale,
    keywords: keywordsFor("terms", locale),
  });
}

export default async function TERMSPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LegalArticle doc={TERMS} locale={locale} />
      <JsonLd
        data={articleSchema({
          headline: pick(TERMS.title, locale),
          description: pick(TERMS.description, locale),
          path: "/terms",
          locale,
          updatedAt: TERMS.updatedAt,
        })}
      />
    </>
  );
}
