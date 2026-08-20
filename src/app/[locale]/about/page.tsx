import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { ABOUT } from "@/data/legal";
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
    title: pageTitle("about", locale),
    description: pageDescription("about", locale),
    path: "/about",
    locale,
    keywords: keywordsFor("about", locale),
  });
}

export default async function ABOUTPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LegalArticle doc={ABOUT} locale={locale} />
      <JsonLd
        data={articleSchema({
          headline: pick(ABOUT.title, locale),
          description: pick(ABOUT.description, locale),
          path: "/about",
          locale,
          updatedAt: ABOUT.updatedAt,
        })}
      />
    </>
  );
}
