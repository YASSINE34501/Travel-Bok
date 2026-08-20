"use client";

import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = { en: "EN", ar: "العربية" };

/**
 * Switches language while staying on the same page. `usePathname` from
 * next-intl strips the locale prefix but keeps the rest of the route, so
 * /en/guides/de becomes /ar/guides/de rather than bouncing to the home page.
 */
export function LocaleSwitcher() {
  const pathname = usePathname();
  const active = useLocale();

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface p-0.5"
      role="group"
      aria-label="Language"
    >
      {/* Dropped below 380px: the header cannot fit logo + labels + menu on a
          320px phone, and the labels carry the meaning the icon only decorates. */}
      <Languages
        aria-hidden
        className="mx-2 hidden size-4 text-ink-muted min-[380px]:block"
      />
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          hrefLang={locale}
          aria-current={locale === active ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3",
            locale === active
              ? "bg-brand-600 text-white"
              : "text-ink-muted hover:text-brand-700",
          )}
        >
          {LABELS[locale]}
        </Link>
      ))}
    </div>
  );
}
