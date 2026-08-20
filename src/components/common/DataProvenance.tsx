import { getTranslations } from "next-intl/server";
import { ExternalLink, Info } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { COST_SOURCES, getOfficialSource } from "@/data/sources";
import { t as pick, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  /** "cost" on the explorer, "visa" on a guide page. */
  variant: "cost" | "visa";
  updatedAt: string;
  /** Guide pages pass a country so we can link its official authority. */
  countryCode?: string;
  countryName?: string;
  className?: string;
};

/**
 * Shown wherever the site puts a number in front of someone. Collapsed by
 * default as a <details> element — no JS, and the sources stay in the DOM for
 * crawlers, which is what makes the E-E-A-T signal real rather than cosmetic.
 */
export async function DataProvenance({
  locale,
  variant,
  updatedAt,
  countryCode,
  countryName,
  className,
}: Props) {
  const t = await getTranslations("Provenance");
  const official = countryCode ? getOfficialSource(countryCode) : undefined;

  return (
    <aside
      className={cn(
        "rounded-card border border-line bg-brand-50/50 p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex gap-3">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-700" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{t("estimates")}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {variant === "cost" ? t("costBody") : t("visaBody")}
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            {t("updated", { date: formatDate(updatedAt, locale) })}
          </p>

          <details className="group mt-3">
            <summary className="cursor-pointer list-none text-sm font-medium text-brand-700 marker:content-none hover:underline">
              {t("toggle")}
            </summary>

            <div className="mt-4 space-y-4">
              {official ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {t("officialTitle", { country: countryName ?? "" })}
                  </h3>
                  <a
                    href={official.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                  >
                    {official.name}
                    <ExternalLink aria-hidden className="size-3.5" />
                  </a>
                  <p className="text-xs text-ink-muted">
                    {pick(official.note, locale)}
                  </p>
                </div>
              ) : null}

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {t("sourcesTitle")}
                </h3>
                <ul className="mt-1.5 space-y-2">
                  {COST_SOURCES.map((source) => (
                    <li key={source.name}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                      >
                        {source.name}
                        <ExternalLink aria-hidden className="size-3.5" />
                      </a>
                      <p className="text-xs text-ink-muted">
                        {pick(source.note, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-brand-700 hover:underline"
              >
                {t("reportError")}
              </Link>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
}
