import Image from "next/image";

import type { Locale } from "@/i18n/routing";
import { cityAlt, getCountryImage } from "@/data/images";
import { getCountry } from "@/data/countries";
import { Flag } from "@/components/ui/flag";
import { t as pick } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  countryCode: string;
  locale: Locale;
  /** Above-the-fold covers set priority; banners further down do not. */
  priority?: boolean;
  aspect?: "cover" | "banner" | "card";
  /** Overlays the flag badge and city name over a scrim. */
  showLabel?: boolean;
  /** Zooms the photo on hover of an ancestor marked `group`. */
  zoomOnGroupHover?: boolean;
  className?: string;
};

const ASPECT = {
  // Fixed in CSS so the box exists at final size before paint: CLS from this
  // component is structurally zero.
  cover: "aspect-[16/9] sm:aspect-[21/9]",
  banner: "aspect-[3/1]",
  card: "h-48",
};

/**
 * Real city photography, served from /public rather than a stock CDN.
 *
 * The flag overlay is a real SVG, never the emoji: flag emoji are
 * regional-indicator pairs and Windows ships no glyphs for them, so `🇦🇺`
 * degrades to the literal text "AU".
 *
 * Attribution is not rendered here — the photos are CC-BY/CC-BY-SA, and the
 * credit belongs somewhere readable rather than burned into a 192px card.
 * `PhotoCredits` renders it on the pages that use these images.
 */
export function CountryImage({
  countryCode,
  locale,
  priority = false,
  aspect = "cover",
  showLabel = false,
  zoomOnGroupHover = false,
  className,
}: Props) {
  const image = getCountryImage(countryCode);
  const country = getCountry(countryCode);
  const city = country ? pick(country.cost.city, locale) : countryCode.toUpperCase();
  const name = country ? pick(country.name, locale) : countryCode.toUpperCase();

  if (!image) return null;

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-ink",
        ASPECT[aspect],
        className,
      )}
    >
      <Image
        src={image.src}
        alt={showLabel ? "" : cityAlt(city, locale)}
        // With a visible caption the photo is decorative; announcing both would
        // read the place name twice.
        aria-hidden={showLabel || undefined}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(
          "object-cover",
          zoomOnGroupHover &&
            "transition-transform duration-300 ease-out-soft group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      />

      {showLabel ? (
        <>
          {/* Scrim, not a flat tint: it darkens only where text lands. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent"
          />
          <span className="absolute top-3 end-3 rounded-full bg-white/20 p-1.5 shadow-card ring-1 ring-white/30 backdrop-blur-md">
            <Flag code={countryCode} size={24} className="rounded-[2px]" />
          </span>
          <figcaption className="absolute inset-x-4 bottom-3">
            <span className="block text-lg font-bold text-white drop-shadow-sm">
              {name}
            </span>
            <span className="block text-xs text-white/75">{city}</span>
          </figcaption>
        </>
      ) : null}
    </figure>
  );
}
