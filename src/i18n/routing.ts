import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // "as-needed" would hide /en; we keep every locale prefixed so each language
  // has one canonical, indexable URL — better for hreflang and AdSense crawling.
  localePrefix: "always",
});
