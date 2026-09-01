import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Database, SlidersHorizontal, Stamp } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Flag } from "@/components/ui/flag";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/common/FaqList";
import { getCountries, getGuides } from "@/lib/queries";
import { COST_DATA_UPDATED } from "@/data/sources";
import { t as pick, money, formatDate } from "@/lib/format";
import {
  COST_CATEGORIES,
  COUNTRY_SLUGS,
  codeForSlug,
  compare,
  isPilotPair,
  PILOT_PAIRS,
  pilotSlugPairs,
} from "@/lib/compare";
import { pageMetadata, JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/seo";
import { fitDescription } from "@/lib/seo-content";

// 12 hours. Must be a literal: Next statically analyses this export.
export const revalidate = 43200;

/**
 * Only curated pairs exist.
 *
 * `dynamicParams = false` IS the indexability gate. A pair outside the pilot
 * list 404s rather than existing as a quietly-noindexed page nobody audits, and
 * because the sitemap builds from the same list the two cannot disagree about
 * what is publishable.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    pilotSlugPairs().map((pair) => ({ locale, ...pair })),
  );
}

type Params = Promise<{ locale: Locale; from: string; to: string }>;

/** Resolves slugs to real, curated countries — or nothing. */
async function resolve(params: Params) {
  const { locale, from, to } = await params;
  const fromCode = codeForSlug(from);
  const toCode = codeForSlug(to);
  if (!fromCode || !toCode || !isPilotPair(fromCode, toCode)) return null;

  const countries = await getCountries();
  const source = countries.find((c) => c.code === fromCode);
  const destination = countries.find((c) => c.code === toCode);
  if (!source || !destination) return null;

  return { locale, from, to, source, destination, data: compare(source, destination) };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  const { locale, from, to, source, destination, data } = resolved;

  const t = await getTranslations({ locale, namespace: "Compare" });

  /**
   * Titles use a short display name where one exists. "Cost of Living in
   * United Arab Emirates vs Morocco (2026) | TRAVLBOK" is 67 characters and
   * Google truncates it; "the UAE" is also what people actually type. Only the
   * title is shortened — the page body keeps the full official name.
   */
  const short = (code: string, full: string) => {
    const key = `shortName_${code}`;
    const value = t.has(key) ? t(key) : full;
    return value;
  };

  const names = {
    from: short(source.code, pick(source.name, locale)),
    to: short(destination.code, pick(destination.name, locale)),
    year: new Date(COST_DATA_UPDATED).getFullYear(),
  };

  // Description states this pair's own figures, so no two comparison pages
  // ship the same snippet. fitDescription then appends progressively shorter
  // tails until one lands inside the 150–160 band, rather than hoping the
  // interpolated base happens to measure correctly for all ten pairs.
  const base = t(data.destinationPricier ? "metaPricier" : "metaCheaper", {
    ...names,
    percent: Math.abs(data.corePercent),
    toCost: money(data.toCore, locale),
    fromCost: money(data.fromCore, locale),
  });

  const description = fitDescription(base, [
    t("descTail1"),
    t("descTail2"),
    t("descTail3"),
    /**
     * The rungs get close together on purpose. Bases vary by ~20 characters
     * across the ten pairs, and a coarse ladder skips the band: the Tunisia →
     * France base is 132, where a 43-character tail overshoots to 176 and the
     * next rung at 16 undershoots to 149. Ten rungs from 84 down to 10 leave
     * no gap wide enough for a pair to fall through.
     */
    t("descTail3b"),
    t("descTail3c"),
    t("descTail3d"),
    t("descTail4"),
    t("descTail5"),
    t("descTail6"),
    t("descTail7"),
  ]);

  return pageMetadata({
    title: t("metaTitle", names),
    description,
    path: `/compare/${from}/${to}`,
    locale,
    keywords: t("keywords", names)
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function ComparePage({ params }: { params: Params }) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  const { locale, from, to, source, destination, data } = resolved;
  setRequestLocale(locale);

  const [t, ex, guides, countries] = await Promise.all([
    getTranslations("Compare"),
    getTranslations("Explorer"),
    getGuides(),
    getCountries(),
  ]);

  const fromName = pick(source.name, locale);
  const toName = pick(destination.name, locale);
  const fromCity = pick(source.cost.city, locale);
  const toCity = pick(destination.cost.city, locale);
  const year = new Date(COST_DATA_UPDATED).getFullYear();

  const destinationGuide = guides.find((g) => g.countryCode === destination.code);
  const sourceHasGuide = guides.some((g) => g.countryCode === source.code);

  // Other curated pairs that share an endpoint — related, not arbitrary.
  const related = PILOT_PAIRS.filter(
    (p) =>
      !(p.from === source.code && p.to === destination.code) &&
      (p.from === source.code || p.to === destination.code),
  ).slice(0, 4);

  const heading = t("h1", { from: fromName, to: toName, year });

  // Built once, used twice: rendered as the quick answer and reused as the
  // WebPage description. Two copies of this sentence would eventually disagree.
  const quickAnswer = t(data.destinationPricier ? "quickPricier" : "quickCheaper", {
    from: fromName,
    to: toName,
    percent: Math.abs(data.corePercent),
    toCost: money(data.toCore, locale),
    fromCost: money(data.fromCore, locale),
    toCity,
    fromCity,
  });

  /**
   * FAQ entries derived from this corridor's own figures.
   *
   * Every answer interpolates a computed value, so no two of the ten pages ship
   * the same text. A block of identical questions repeated across a
   * programmatic set is boilerplate, and marking boilerplate up as an FAQPage
   * is how the rich result gets withdrawn rather than earned. The visa question
   * appears only when a guide for the destination exists to back the route
   * count — the number has to come from somewhere real.
   */
  const faqs = [
    {
      question: t(
        data.destinationPricier ? "faqCostQPricier" : "faqCostQCheaper",
        { from: fromName, to: toName },
      ),
      answer: t(
        data.destinationPricier ? "faqCostAPricier" : "faqCostACheaper",
        {
          to: toName,
          percent: Math.abs(data.corePercent),
          toCost: money(data.toCore, locale),
          fromCost: money(data.fromCore, locale),
          toCity,
          fromCity,
        },
      ),
    },
    {
      question: t("faqBudgetQ", { to: toName }),
      answer: t("faqBudgetA", { toCost: money(data.toCore, locale), toCity }),
    },
    {
      question: t("faqSalaryQ", { to: toName }),
      answer: t("faqSalaryA", {
        from: fromName,
        to: toName,
        toSalary: money(destination.cost.avgNetSalary, locale),
        toCost: money(data.toCore, locale),
        ratio: data.toSalaryRatio.toFixed(1),
        fromRatio: data.fromSalaryRatio.toFixed(1),
      }),
    },
    {
      question: t("faqGapQ", { from: fromName, to: toName }),
      answer: t("faqGapA", {
        category: ex(data.biggestGap.key),
        fromValue: money(data.biggestGap.from, locale),
        toValue: money(data.biggestGap.to, locale),
        fromCity,
        toCity,
      }),
    },
    ...(destinationGuide
      ? [
          {
            question: t("faqVisaQ", { from: fromName, to: toName }),
            answer: t("faqVisaA", {
              to: toName,
              routes: destinationGuide.routes.length,
            }),
          },
        ]
      : []),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/*
        The page as an entity, pointing at the WebSite and the Organization by
        @id rather than restating either. Comparison pages are the site's most
        extractable content and were the least described: an engine could read
        the numbers but nothing said whose page they were on. dateModified is
        the real cost-data review date printed under the H1, not a build time.
      */}
      <JsonLd
        data={webPageSchema({
          name: heading,
          description: quickAnswer,
          path: `/compare/${from}/${to}`,
          locale,
          updatedAt: COST_DATA_UPDATED,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: heading, path: `/compare/${from}/${to}` },
          ],
          locale,
        )}
      />

      <header>
        <div className="flex items-center gap-3">
          <Flag code={source.code} size={32} className="rounded-sm" />
          <ArrowRight aria-hidden className="size-4 text-ink-muted flip-rtl" />
          <Flag code={destination.code} size={32} className="rounded-sm" />
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-2 text-xs text-ink-muted">
          {t("reviewed", { date: formatDate(COST_DATA_UPDATED, locale) })}
        </p>
      </header>

      {/* Quick answer — the extractable one-paragraph response. */}
      <section className="mt-8 rounded-card border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          {t("quickAnswer")}
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">{quickAnswer}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("takeaways")}</h2>
        <ul className="mt-4 list-disc space-y-2 ps-5 leading-relaxed text-ink-muted">
          <li>
            {t("takeGap", {
              category: ex(data.biggestGap.key),
              fromValue: money(data.biggestGap.from, locale),
              toValue: money(data.biggestGap.to, locale),
              fromCity,
              toCity,
            })}
          </li>
          <li>
            {t("takeSalary", {
              to: toName,
              salary: money(destination.cost.avgNetSalary, locale),
              ratio: data.toSalaryRatio.toFixed(1),
            })}
          </li>
          <li>
            {t("takeSalaryFrom", {
              from: fromName,
              ratio: data.fromSalaryRatio.toFixed(1),
            })}
          </li>
          {destinationGuide ? (
            <li>
              {t("takeVisa", {
                to: toName,
                routes: destinationGuide.routes.length,
              })}
            </li>
          ) : null}
        </ul>
      </section>

      <AdSlot slot="4164847922" format="inline" />

      <section className="mt-4">
        <h2 className="text-2xl font-bold text-ink">{t("breakdown")}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          {t("breakdownNote", { toCity, fromCity })}
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm tnum">
            <thead>
              <tr className="border-b border-line-strong text-start">
                <th className="py-2 pe-4 text-start font-semibold text-ink">
                  {t("category")}
                </th>
                <th className="py-2 pe-4 text-start font-semibold text-ink">
                  {fromCity}
                </th>
                <th className="py-2 text-start font-semibold text-ink">{toCity}</th>
              </tr>
            </thead>
            <tbody>
              {COST_CATEGORIES.map((cat) => (
                <tr key={cat.key} className="border-b border-line">
                  <td className="py-2.5 pe-4 text-ink-muted">{ex(cat.key)}</td>
                  <td className="py-2.5 pe-4 text-ink">
                    {money(cat.get(source), locale)}
                  </td>
                  <td className="py-2.5 text-ink">
                    {money(cat.get(destination), locale)}
                  </td>
                </tr>
              ))}
              <tr className="border-b-2 border-line-strong font-semibold">
                <td className="py-3 pe-4 text-ink">{t("essentialTotal")}</td>
                <td className="py-3 pe-4 text-ink">{money(data.fromCore, locale)}</td>
                <td className="py-3 text-ink">{money(data.toCore, locale)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("salaryContext")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">
          {t("salaryBody", {
            to: toName,
            from: fromName,
            toSalary: money(destination.cost.avgNetSalary, locale),
            fromSalary: money(source.cost.avgNetSalary, locale),
          })}
        </p>
      </section>

      {/* Migration intent: cost is one input, not the decision. */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">
          {t("movingTitle", { from: fromName, to: toName })}
        </h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{t("movingBody")}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {destinationGuide ? (
            <Link
              href={`/guides/${destination.code}`}
              className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
            >
              <Stamp aria-hidden className="size-5 shrink-0 text-brand-700" />
              <span className="font-medium text-ink">
                {t("visaLink", { to: toName })}
              </span>
            </Link>
          ) : null}

          <Link
            href={`/jobs?country=${destination.code}`}
            className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
          >
            <BriefcaseBusiness aria-hidden className="size-5 shrink-0 text-brand-700" />
            <span className="font-medium text-ink">
              {t("jobsLink", { to: toName })}
            </span>
          </Link>

          <Link
            href={`/explorer?from=${source.code}&to=${destination.code}`}
            className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
          >
            <SlidersHorizontal aria-hidden className="size-5 shrink-0 text-brand-700" />
            <span className="font-medium text-ink">{t("explorerLink")}</span>
          </Link>

          {sourceHasGuide ? (
            <Link
              href={`/guides/${source.code}`}
              className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
            >
              <Flag code={source.code} className="size-5 shrink-0 rounded-sm" />
              <span className="font-medium text-ink">
                {t("guideLink", { country: fromName })}
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">{t("relatedTitle")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((pair) => {
              const a = countries.find((c) => c.code === pair.from);
              const b = countries.find((c) => c.code === pair.to);
              if (!a || !b) return null;
              return (
                <li key={`${pair.from}-${pair.to}`}>
                  <Link
                    href={`/compare/${COUNTRY_SLUGS[pair.from]}/${COUNTRY_SLUGS[pair.to]}`}
                    className="lift flex items-center gap-2 rounded-card border border-line bg-surface p-4"
                  >
                    <Flag code={pair.from} className="size-5 shrink-0 rounded-sm" />
                    <ArrowRight aria-hidden className="size-3.5 shrink-0 text-ink-muted flip-rtl" />
                    <Flag code={pair.to} className="size-5 shrink-0 rounded-sm" />
                    <span className="ms-1 min-w-0 font-medium text-ink">
                      {pick(a.name, locale)} → {pick(b.name, locale)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <FaqList
        title={t("faqTitle", { from: fromName, to: toName })}
        items={faqs}
        className="mt-10"
      />

      <section className="mt-10 rounded-card border border-line bg-paper p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          <Database aria-hidden className="size-4" />
          {t("sourcesTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("sourcesBody")}{" "}
          <Link href="/data" className="text-brand-700 underline underline-offset-2">
            {t("sourcesLink")}
          </Link>
        </p>
      </section>

      <p className="mt-6 text-xs leading-relaxed text-ink-muted">
        {t("disclaimer")}
      </p>
    </div>
  );
}
