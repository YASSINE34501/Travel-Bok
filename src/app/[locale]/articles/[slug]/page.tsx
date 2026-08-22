import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import {
  getGuideDoc,
  keywordsFor,
  listGuideDocSlugs,
  localised,
} from "@/lib/guides-md";
import {
  pageMetadata,
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { AdSlot } from "@/components/ads/AdSlot";

/**
 * The markdown source lives in the repo, so it cannot change between deploys.
 * Prerender every article and refuse unknown slugs, rather than carrying an ISR
 * timer that would re-read files guaranteed not to have moved.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await listGuideDocSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = await getGuideDoc(slug);
  if (!doc) return {};

  return pageMetadata({
    // No brand suffix here: title.template in the layout appends it, and adding
    // it in both places produces "… | TRAVLBOK | TRAVLBOK".
    title: localised(doc.frontmatter, "title", locale),
    description: localised(doc.frontmatter, "meta_description", locale),
    path: `/articles/${slug}`,
    locale,
    keywords: keywordsFor(doc.frontmatter, locale),
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const doc = await getGuideDoc(slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const heading = localised(frontmatter, "h1", locale);
  const description = localised(frontmatter, "meta_description", locale);
  const cover = frontmatter.cover_image;
  const coverAlt =
    (locale === "ar" ? cover?.alt_ar : cover?.alt_en) ?? heading;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={articleSchema({
          headline: heading,
          description,
          path: `/articles/${slug}`,
          locale,
          updatedAt: frontmatter.last_reviewed,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: heading, path: `/articles/${slug}` },
          ],
          locale,
        )}
      />

      {cover?.url ? (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
          {/* Fixed aspect ratio so the box exists at final size before paint. */}
          <Image
            src={cover.url}
            alt={coverAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          {formatDate(frontmatter.last_reviewed, locale)}
        </p>
      </header>

      {/* The compiled MDX. `.markdown-content` styles live in globals.css; the
          markdown itself carries no classes, keeping the source portable. */}
      <div className="markdown-content">{content}</div>

      {cover?.photographer ? (
        <p className="mt-10 text-xs text-ink-muted">
          {/* Attribution is a licence condition, not a nicety. */}
          {coverAlt} — {cover.photographer}
          {cover.source ? ` / ${cover.source}` : ""}
          {cover.page ? (
            <>
              {" · "}
              <a
                href={cover.page}
                rel="license noopener noreferrer"
                target="_blank"
                className="underline"
              >
                {cover.license ?? "License"}
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      <div className="mt-10">
        <AdSlot slot="article-end" format="rectangle" />
      </div>
    </article>
  );
}
