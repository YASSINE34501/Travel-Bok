import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Country } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Flag } from "@/components/ui/flag";
import { money, t as pick } from "@/lib/format";

/**
 * The hero visual is a public-domain skyline faded into the page background
 * rather than a boxed stock photo, with a live comparison card floating over
 * it. Two reasons: a rectangular hero image always reads as a placeholder, and
 * the product preview earns more trust than a model with a backpack — it shows
 * the actual numbers the site is built to produce.
 *
 * The photo is `us.jpg`, chosen because it is the one file in the set that is
 * public domain: no attribution obligation on the landing page.
 */
export async function Hero({
  source,
  destination,
  locale,
}: {
  source: Country;
  destination: Country;
  locale: Locale;
}) {
  const [t, e] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Explorer"),
  ]);

  const core = (c: Country) =>
    c.cost.rentCenter +
    c.cost.groceries +
    c.cost.utilities +
    c.cost.transport +
    c.cost.internet;

  const rows = [
    { label: e("rent"), a: source.cost.rentCenter, b: destination.cost.rentCenter },
    { label: e("groceries"), a: source.cost.groceries, b: destination.cost.groceries },
    { label: e("transport"), a: source.cost.transport, b: destination.cost.transport },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Ambient wash: a soft blue bloom behind the copy, no hard edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_75%_-10%,var(--color-brand-100),transparent_65%)]"
      />

      {/* Skyline, masked to nothing before it reaches the text. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 end-0 hidden w-[58%] lg:block">
        <div className="relative h-full [mask-image:linear-gradient(to_left,black_35%,transparent_92%)]">
          <Image
            src="/countries/us.jpg"
            alt=""
            fill
            // Lazy, not priority. The wrapper is `hidden` below lg, and a
            // priority image is fetched regardless of display — which spent a
            // 1200px download on phones that never show it. Lazy loading skips
            // hidden elements entirely, and this is a 25%-opacity backdrop, so
            // it should never compete with the headline for LCP anyway.
            loading="lazy"
            sizes="(min-width: 1024px) 58vw, 0px"
            className="object-cover opacity-25"
          />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3.5 py-1.5 text-xs font-medium text-brand-900 backdrop-blur-sm">
            <Sparkles aria-hidden className="size-3.5 text-brand-600" />
            {t("badge")}
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t("titleLead")}{" "}
            <span className="text-brand-600">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {t("sub")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/explorer" className="sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                {t("ctaPrimary")}
                <ArrowRight aria-hidden className="flip-rtl" />
              </Button>
            </Link>
            <Link href="/jobs" className="sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink-muted">{t("heroNote")}</p>
        </div>

        {/* Live comparison card — the product, not a mockup. */}
        <div className="rounded-2xl border border-line bg-surface/85 p-5 shadow-lift backdrop-blur-md sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <Flag code={source.code} size={22} />
              {pick(source.name, locale)}
            </span>
            <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-muted flip-rtl" />
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <Flag code={destination.code} size={22} />
              {pick(destination.name, locale)}
            </span>
          </div>

          <dl className="mt-5 space-y-3 border-t border-line pt-5">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-ink-muted">{row.label}</dt>
                <dd className="tnum whitespace-nowrap text-sm font-medium text-ink">
                  {money(row.a, locale)} → {money(row.b, locale)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-baseline justify-between gap-4 rounded-xl bg-brand-50 px-4 py-3">
            <span className="text-sm font-semibold text-brand-900">
              {e("total")}
            </span>
            <span className="tnum whitespace-nowrap font-bold text-brand-900">
              {money(core(destination), locale)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
