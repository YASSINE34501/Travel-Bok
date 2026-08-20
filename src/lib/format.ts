import type { Locale, Localized } from "./types";

/** Picks the right half of a bilingual string. */
export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

/**
 * Arabic pages keep Latin digits (`-u-nu-latn`). Arabic-Indic numerals are
 * correct Arabic, but this is a comparison tool — users scan the same figures
 * in both languages, and mixed numeral systems make prices harder to compare.
 */
function intlLocale(locale: Locale): string {
  return locale === "ar" ? "ar-u-nu-latn" : "en-US";
}

const moneyCache = new Map<string, Intl.NumberFormat>();

/**
 * Picks how the currency is written.
 *
 * CLDR gives Arabic some currency symbols that are Latin abbreviations glued to
 * a symbol — USD becomes "US$", GBP "UK£", CAD "CA$". Dropped into Arabic copy
 * those read as a mangled fragment of English rather than a price.
 *
 * So in Arabic: if the symbol contains Latin letters, use the ISO code instead
 * ("2,000 USD"). Currencies with genuine native symbols — €, ر.س., د.إ. — keep
 * them. The rule is derived from the symbol itself rather than a hardcoded
 * list, so a currency added later is handled without touching this function.
 * For CHF, SEK and PLN the symbol already *is* the code, making it a no-op.
 */
function currencyDisplay(
  locale: Locale,
  currency: string,
): Intl.NumberFormatOptions["currencyDisplay"] {
  if (locale !== "ar") return "symbol";

  const symbol = new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
  })
    .formatToParts(1)
    .find((part) => part.type === "currency")?.value;

  return symbol && /[A-Za-z]/.test(symbol) ? "code" : "symbol";
}

function formatter(locale: Locale, currency: string) {
  const key = `${locale}:${currency}`;
  let fmt = moneyCache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(intlLocale(locale), {
      style: "currency",
      currency,
      currencyDisplay: currencyDisplay(locale, currency),
      maximumFractionDigits: 0,
    });
    moneyCache.set(key, fmt);
  }
  return fmt;
}

export function money(
  amount: number,
  locale: Locale,
  currency = "USD",
): string {
  return formatter(locale, currency).format(Math.round(amount));
}

export function percent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: 0,
  }).format(Math.abs(Math.round(value)));
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    year: "numeric",
    month: "long",
  }).format(new Date(iso));
}
