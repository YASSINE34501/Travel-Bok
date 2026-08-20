import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { VisaGuide } from "@/lib/types";
import { CountryImage } from "@/components/common/CountryImage";
import { t as pick } from "@/lib/format";

/**
 * Guide index tile: a real photo of the city the guide quotes figures for,
 * with the flag and place name over a scrim, and the guide title beneath.
 *
 * The guide title stays on the card rather than being replaced by a generic
 * caption — it carries the page's keywords and is the linked text that tells
 * someone what they are about to read.
 */
export function CountryCard({
  guide,
  locale,
  label,
}: {
  guide: VisaGuide;
  locale: Locale;
  /** Localised "Read guide" call to action. */
  label: string;
}) {
  return (
    <Link
      href={`/guides/${guide.countryCode}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <CountryImage
        countryCode={guide.countryCode}
        locale={locale}
        aspect="card"
        showLabel
        zoomOnGroupHover
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 font-semibold leading-snug text-ink">
          {pick(guide.title, locale)}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {pick(guide.summary, locale)}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand-700 transition-[gap] duration-200 group-hover:gap-2.5">
          {label}
          <ArrowRight aria-hidden className="size-4 flip-rtl" />
        </span>
      </div>
    </Link>
  );
}
