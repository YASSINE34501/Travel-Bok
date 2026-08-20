import type { Locale, Localized } from "./types";

/** Picks the right half of a bilingual string. */
export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

const moneyCache = new Map<string, Intl.NumberFormat>();

function formatter(locale: Locale, currency: string) {
  const key = `${locale}:${currency}`;
  let fmt = moneyCache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
      style: "currency",
      currency,
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
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    maximumFractionDigits: 0,
  }).format(Math.abs(Math.round(value)));
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(iso));
}
