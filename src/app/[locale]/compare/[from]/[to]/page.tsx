import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Coins,
  Database,
  SlidersHorizontal,
  Stamp,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Flag } from "@/components/ui/flag";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqList } from "@/components/common/FaqList";
import { getCountries, getGuides, getJobs } from "@/lib/queries";
import { COST_DATA_UPDATED, getOfficialSource } from "@/data/sources";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { t as pick, money, formatDate } from "@/lib/format";
import {
  COST_CATEGORIES,
  COUNTRY_SLUGS,
  codeForSlug,
  compare,
  coreCost,
  gapDrivers,
  housingWeight,
  isPilotPair,
  monthsOfOriginSalary,
  outsideCentreScenario,
  PILOT_PAIRS,
  pilotSlugPairs,
  salaryCoverage,
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

  const [t, ex, jt, guides, countries, jobs] = await Promise.all([
    getTranslations("Compare"),
    getTranslations("Explorer"),
    getTranslations("Jobs"),
    getGuides(),
    getCountries(),
    getJobs(),
  ]);

  const fromName = pick(source.name, locale);
  const toName = pick(destination.name, locale);
  const fromCity = pick(source.cost.city, locale);
  const toCity = pick(destination.cost.city, locale);
  const year = new Date(COST_DATA_UPDATED).getFullYear();

  const destinationGuide = guides.find((g) => g.countryCode === destination.code);
  const sourceHasGuide = guides.some((g) => g.countryCode === source.code);

  /**
   * Everything below is a join over data this site already publishes: the five
   * core expenses, the destination's own visa routes and requirements, and the
   * job archetypes recorded for it. Before this the page used the route COUNT
   * and nothing else from the guide, which is why ten corridors read alike —
   * they were the same four sentences around a different table.
   */
  const drivers = gapDrivers(source, destination);
  const housing = drivers.find((d) => d.key === "rent") ?? drivers[0];
  const weight = housingWeight(drivers);
  const secondary = drivers.filter((d) => d.key !== "rent");
  const outside = outsideCentreScenario(source, destination);
  const months = monthsOfOriginSalary(source, destination);
  const coverage = salaryCoverage(data.toSalaryRatio);
  const authority = getOfficialSource(destination.code);
  const destinationJobs = jobs
    .filter((j) => j.countryCode === destination.code)
    .slice(0, 4);

  const share = (value: number) => Math.round(value * 100);
  const times = (value: number) => value.toFixed(1);

  const driversCopy =
    weight === "dominant"
      ? t("driversDominant", { share: share(housing.share), fromCity, toCity })
      : weight === "leading"
        ? t("driversLeading", {
            share: share(housing.share),
            second: ex(secondary[0].key),
            secondRatio: times(secondary[0].ratio),
            fromCity,
          })
        : t("driversShared", {
            share: share(housing.share),
            second: ex(secondary[0].key),
            secondRatio: times(secondary[0].ratio),
            third: ex(secondary[1].key),
            thirdRatio: times(secondary[1].ratio),
            toCity,
          });

  const outsideCopy = t(
    outside.shape === "widens"
      ? "outsideWidens"
      : outside.shape === "widensSlightly"
        ? "outsideWidensSlightly"
        : outside.shape === "narrows"
          ? "outsideNarrows"
          : "outsideUnchanged",
    {
      fromCity,
      toCity,
      toCost: money(outside.toCore, locale),
      toCentre: money(coreCost(destination), locale),
      saving: money(outside.toSaving, locale),
      centrePercent: Math.abs(data.corePercent),
      outsidePercent: Math.abs(outside.percent),
    },
  );

  const coverageCopy = t(
    coverage === "below"
      ? "coverBelow"
      : coverage === "marginal"
        ? "coverMarginal"
        : "coverComfortable",
    {
      to: toName,
      toSalary: money(destination.cost.avgNetSalary, locale),
      toCost: money(data.toCore, locale),
      ratio: times(data.toSalaryRatio),
      fromRatio: times(data.fromSalaryRatio),
    },
  );

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

      {/* What drives the gap — ranked over the five expenses coreCost sums. */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("driversTitle")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{driversCopy}</p>

        <ul className="mt-4 space-y-2">
          {drivers.slice(0, 3).map((driver) => (
            <li
              key={driver.key}
              className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-line pb-2 text-sm last:border-0"
            >
              <span className="font-medium text-ink">{ex(driver.key)}</span>
              <span className="tnum text-ink-muted">
                {money(driver.from, locale)} → {money(driver.to, locale)}
              </span>
              <span className="tnum ms-auto text-ink-muted">
                {t("driverShare", { share: share(driver.share) })}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          {t("driversNote")}
        </p>
      </section>

      {/* The outside-centre scenario. Widening is the normal case: seven of the
          ten pilot corridors widen (by up to 25 points), two are flat, one narrows. */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("outsideTitle")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{outsideCopy}</p>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          {t("outsideNote")}
        </p>
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

        <h3 className="mt-6 text-lg font-semibold text-ink">{t("reachTitle")}</h3>
        <p className="mt-2 leading-relaxed text-ink-muted">
          {t("reachBody", {
            from: fromName,
            toCity,
            months: times(months),
            fromSalary: money(source.cost.avgNetSalary, locale),
          })}
        </p>
        <p className="mt-3 leading-relaxed text-ink-muted">{coverageCopy}</p>
      </section>

      {/* Visa routes — name, who, processing time and government fee, exactly
          as published on the destination guide. Not summarised, not re-worded. */}
      {destinationGuide ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">
            {t("routesTitle", { to: toName })}
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            {authority
              ? t("routesIntro", { to: toName, authority: authority.name })
              : t("routesIntroNoAuthority", { to: toName })}
          </p>

          <div className="mt-5 space-y-4">
            {destinationGuide.routes.map((route, i) => (
              <Card key={i}>
                <CardBody className="pt-5">
                  <h3 className="text-lg font-semibold text-ink">
                    {pick(route.name, locale)}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">
                    {pick(route.who, locale)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="neutral">
                      <CalendarClock aria-hidden className="size-3.5" />
                      {t("routeProcessing")}: {pick(route.processing, locale)}
                    </Badge>
                    <Badge tone="outline">
                      <Coins aria-hidden className="size-3.5" />
                      {t("routeFee")}: {pick(route.cost, locale)}
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Link
            href={`/guides/${destination.code}`}
            className="mt-4 inline-block text-brand-700 underline underline-offset-2"
          >
            {t("routesLink", { to: toName })}
          </Link>
        </section>
      ) : null}

      {destinationGuide ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">
            {t("needTitle", { to: toName })}
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            {t("needIntro", { to: toName })}
          </p>
          <ul className="mt-4 space-y-3">
            {destinationGuide.requirements.slice(0, 4).map((req, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-brand-600"
                />
                <span className="leading-relaxed text-ink">
                  {pick(req, locale)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Role archetypes, labelled as such. No employers, no JobPosting schema:
          these records carry no vacancy, no posting date and nothing to apply to. */}
      {destinationJobs.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">
            {t("jobsTitle", { to: toName })}
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            {t("jobsIntro", { to: toName })}
          </p>

          <ul className="mt-5 space-y-3">
            {destinationJobs.map((job) => (
              <li
                key={job.id}
                className="rounded-card border border-line bg-surface p-4"
              >
                <p className="font-medium text-ink">{pick(job.title, locale)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <Badge tone={job.demand === "high" ? "high" : "neutral"}>
                    {jt("demand")}:{" "}
                    {job.demand === "high"
                      ? jt("demandHigh")
                      : job.demand === "medium"
                        ? jt("demandMedium")
                        : jt("demandLow")}
                  </Badge>
                  <span className="tnum text-ink-muted">
                    {money(job.salaryFrom, locale, job.salaryCurrency)} –{" "}
                    {money(job.salaryTo, locale, job.salaryCurrency)}{" "}
                    {jt("perYear")}
                  </span>
                  <span className="text-ink-muted">
                    {job.visaSponsorship ? jt("sponsorship") : jt("noSponsorship")}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href={`/jobs?country=${destination.code}`}
            className="mt-4 inline-block text-brand-700 underline underline-offset-2"
          >
            {t("jobsLinkAll", { to: toName })}
          </Link>
        </section>
      ) : null}

      {/* The interpretation, assembled from the branches computed above so it
          differs wherever the underlying data differs. */}
      <section className="mt-10 rounded-card border border-line bg-paper p-6">
        <h2 className="text-2xl font-bold text-ink">{t("showTitle")}</h2>
        <p className="mt-2 leading-relaxed text-ink">
          {weight === "shared"
            ? t("showHousingShared", {
                share: share(housing.share),
                fromCity,
                toCity,
                second: ex(secondary[0].key),
                secondRatio: times(secondary[0].ratio),
              })
            : t("showHousing", {
                share: share(housing.share),
                fromCity,
                toCity,
              })}{" "}
          {t("showReach", { toCity, from: fromName, months: times(months) })}{" "}
          {t("showOutside", {
            centrePercent: Math.abs(data.corePercent),
            outsidePercent: Math.abs(outside.percent),
          })}{" "}
          {t("showCoverage", { ratio: times(data.toSalaryRatio) })}
        </p>
      </section>

      {/* Migration intent: cost is one input, not the decision. */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">
          {t("movingTitle", { from: fromName, to: toName })}
        </h2>
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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("limitsTitle")}</h2>
        <ul className="mt-4 list-disc space-y-2 ps-5 leading-relaxed text-ink-muted">
          <li>{t("limitEstimate")}</li>
          <li>{t("limitCore")}</li>
          <li>{t("limitCity", { toCity, fromCity })}</li>
          {destinationGuide ? <li>{t("limitVisa")}</li> : null}
          {destinationJobs.length > 0 ? <li>{t("limitJobs")}</li> : null}
        </ul>
      </section>

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
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {t("sourcesDates", {
            costDate: formatDate(COST_DATA_UPDATED, locale),
            to: toName,
            guideDate: destinationGuide
              ? formatDate(destinationGuide.updatedAt, locale)
              : formatDate(COST_DATA_UPDATED, locale),
          })}
        </p>
        {authority ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {t("sourcesAuthority", { to: toName, authority: "" })}
            <a
              href={authority.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline underline-offset-2"
            >
              {authority.name}
            </a>
          </p>
        ) : null}
      </section>

      <p className="mt-6 text-xs leading-relaxed text-ink-muted">
        {t("disclaimer")}
      </p>
    </div>
  );
}
