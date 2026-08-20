import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { getCountryImage } from "@/data/images";
import { getCountry } from "@/data/countries";
import { t as pick } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Photo attribution.
 *
 * Nearly all the city photography is CC-BY or CC-BY-SA, which require the
 * author, the licence and a link to the source to be shown wherever the image
 * is used. This is a licence condition, so the component is rendered on every
 * page that displays these photos rather than tucked away on one credits page.
 *
 * Collapsed into a <details> on the index, where 22 credits would otherwise
 * outweigh the content — but the markup is always present, so the attribution
 * is in the page for anyone reading the source or using a screen reader.
 */
export async function PhotoCredits({
  countryCodes,
  locale,
  collapsible = false,
  className,
}: {
  countryCodes: string[];
  locale: Locale;
  collapsible?: boolean;
  className?: string;
}) {
  const t = await getTranslations("Credits");

  const items = countryCodes
    .map((code) => ({ code, image: getCountryImage(code), country: getCountry(code) }))
    .filter((item) => item.image);

  if (items.length === 0) return null;

  const list = (
    <ul className="mt-2 space-y-1">
      {items.map(({ code, image, country }) => (
        <li key={code} className="text-xs leading-relaxed text-ink-muted">
          <a
            href={image!.credit.source}
            target="_blank"
            rel="noopener noreferrer license"
            className="text-brand-700 hover:underline"
          >
            {country ? pick(country.cost.city, locale) : code.toUpperCase()}
          </a>
          {" — "}
          {image!.credit.author}, {image!.credit.licence}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={cn("border-t border-line pt-5", className)}>
      {collapsible ? (
        <details>
          <summary className="cursor-pointer list-none text-xs font-medium text-ink-muted marker:content-none hover:text-brand-700">
            {t("title")}
          </summary>
          <p className="mt-2 text-xs text-ink-muted">{t("body")}</p>
          {list}
        </details>
      ) : (
        <>
          <h2 className="text-xs font-medium text-ink-muted">{t("title")}</h2>
          {list}
        </>
      )}
    </section>
  );
}
