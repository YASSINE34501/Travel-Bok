import { getTranslations } from "next-intl/server";
import { ArrowRight, BriefcaseBusiness, Stamp } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Country } from "@/lib/types";
import { t as pick } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Contextual links from the cost explorer into the guide and job matcher for
 * the country the visitor is currently comparing.
 *
 * The anchor text names the destination rather than saying "click here", so
 * the link passes something useful about the target page — and the three tools
 * stop being three dead ends that only the nav connects.
 */
export async function RelatedLinks({
  destination,
  hasGuide,
  locale,
  className,
}: {
  destination: Country;
  hasGuide: boolean;
  locale: Locale;
  className?: string;
}) {
  const t = await getTranslations("Related");
  const name = pick(destination.name, locale);

  const links = [
    hasGuide && {
      href: `/guides/${destination.code}`,
      icon: Stamp,
      title: t("guideTitle", { country: name }),
      body: t("guideBody", { country: name }),
    },
    {
      href: `/jobs?country=${destination.code}`,
      icon: BriefcaseBusiness,
      title: t("jobsTitle", { country: name }),
      body: t("jobsBody", { country: name }),
    },
  ].filter(Boolean) as {
    href: string;
    icon: typeof Stamp;
    title: string;
    body: string;
  }[];

  return (
    <section className={cn("", className)}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {t("heading")}
      </h2>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-card transition-[box-shadow,border-color] duration-200 hover:border-brand-200 hover:shadow-lift"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <link.icon aria-hidden className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 font-medium text-ink">
                {link.title}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 shrink-0 text-brand-700 transition-transform duration-200 group-hover:translate-x-0.5 flip-rtl motion-reduce:transition-none"
                />
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                {link.body}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
