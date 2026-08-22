import Image from "next/image";
import { ArrowRight, CalendarClock } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import type { GuideDocFrontmatter } from "@/lib/guides-md";

/**
 * Card for one long-form markdown article. Kept separate from CountryCard:
 * that one renders a structured `VisaGuide` with cost figures, this one
 * renders editorial frontmatter, and merging them would mean a card component
 * that guesses which shape it was handed.
 */
export function ArticleCard({
  slug,
  frontmatter,
  locale,
  label,
}: {
  slug: string;
  frontmatter: GuideDocFrontmatter;
  locale: Locale;
  label: string;
}) {
  const title =
    (locale === "ar" ? frontmatter.title_ar : frontmatter.title_en) ?? slug;
  const description =
    (locale === "ar"
      ? frontmatter.meta_description_ar
      : frontmatter.meta_description_en) ?? "";
  const country =
    (locale === "ar" ? frontmatter.country_ar : frontmatter.country_en) ?? "";
  const cover = frontmatter.cover_image;
  const coverAlt =
    (locale === "ar" ? cover?.alt_ar : cover?.alt_en) ?? country;

  return (
    <Link
      href={`/articles/${slug}`}
      className="lift group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface"
    >
      {cover?.url ? (
        // Fixed height, not aspect-ratio-on-parent: the box exists at final
        // size before the image loads, so the grid never reflows.
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={cover.url}
            alt={coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {description}
        </p>

        <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
          <CalendarClock aria-hidden className="size-4 shrink-0" />
          {formatDate(frontmatter.last_reviewed, locale)}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          {label}
          <ArrowRight aria-hidden className="size-4 shrink-0 flip-rtl" />
        </span>
      </div>
    </Link>
  );
}
