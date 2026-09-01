import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CalendarClock, CheckCircle2, Coins, Wallet } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/AdSlot";
import { DataProvenance } from "@/components/common/DataProvenance";
import { CountryImage } from "@/components/common/CountryImage";
import { PhotoCredits } from "@/components/common/PhotoCredits";
import { GuideBody } from "@/components/guides/GuideBody";
import { GuideToc } from "@/components/guides/GuideToc";
import {
  getCountries,
  getGuides,
  getJobs,

} from "@/lib/queries";
import { t as pick, formatDate, money } from "@/lib/format";
import { guideKeywords, keywordsFor } from "@/data/seo";
import { COUNTRY_SLUGS, PILOT_PAIRS } from "@/lib/compare";
import { getOfficialSource } from "@/data/sources";
import { guideDescription, guideTitle } from "@/lib/seo-content";
import {
  pageMetadata,
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

// 12 hours. Must be a literal: Next statically analyses this export.
export const revalidate = 43200;

/** Every guide is prerendered in both languages — these are the SEO pages. */
export async function generateStaticParams() {
  const guides = await getGuides();
  return routing.locales.flatMap((locale) =>
    guides.map((guide) => ({ locale, country: guide.countryCode })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; country: string }>;
}): Promise<Metadata> {
  const { locale, country } = await params;
  const guides = await getGuides();
  const guide = guides.find((g) => g.countryCode === country);
  if (!guide) return {};

  const countries = await getCountries();
  const destination = countries.find((c) => c.code === country);
  if (!destination) return {};

  return pageMetadata({
    // Search-intent title and a description built from this country's own
    // figures, so no two guide snippets read alike.
    title: guideTitle(destination, locale),
    description: guideDescription(guide, destination, locale),
    path: `/guides/${country}`,
    locale,
    keywords: [
      ...guideKeywords(pick(destination.name, locale), locale),
      ...keywordsFor("guides", locale),
    ],
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale; country: string }>;
}) {
  const { locale, country } = await params;
  setRequestLocale(locale);

  const [t, nav, ex, guides, countries, jobs] = await Promise.all([
    getTranslations("Guides"),
    getTranslations("Nav"),
    // The cost labels are already written and translated for the explorer.
    // Reusing them keeps one wording for "rent, 1-bedroom (centre)" across the
    // site instead of a second copy that drifts.
    getTranslations("Explorer"),
    getGuides(),
    getCountries(),
    getJobs(),
  ]);

  const guide = guides.find((g) => g.countryCode === country);
  const destination = countries.find((c) => c.code === country);
  if (!guide || !destination) notFound();

  const relatedJobs = jobs
    .filter((j) => j.countryCode === country && j.demand === "high")
    .slice(0, 5);

  /**
   * Sibling guides in the same region.
   *
   * Before this, a country guide linked "down" into its own cost and jobs
   * pages but never sideways, so the 22 guides were 22 leaves hanging off one
   * index with no relationship between them. Region is the honest grouping we
   * already store — it needs no new data and no editorial judgement — and it
   * matches how people actually shortlist: they compare neighbours.
   */
  const relatedCountries = countries
    .filter(
      (c) =>
        c.code !== country &&
        c.region.en === destination.region.en &&
        guides.some((g) => g.countryCode === c.code),
    )
    .slice(0, 4);

  /**
   * Comparison pages that end at this country.
   *
   * Read straight off PILOT_PAIRS — the same curated list that gates
   * generateStaticParams and the sitemap — so a guide can only ever link to a
   * comparison that is actually built. Deriving the pairs here instead would
   * let this section drift into 404s the moment the pilot changes. Countries
   * outside the pilot render no section rather than an empty one.
   */
  const comparisons = PILOT_PAIRS.filter((p) => p.to === country).flatMap(
    (pair) => {
      const origin = countries.find((c) => c.code === pair.from);
      return origin ? [{ pair, origin }] : [];
    },
  );

  /**
   * The direct answer.
   *
   * Every guide reached the same shape of question — how do I get in, what
   * does it cost, who decides — but a reader (or an extractive system) had to
   * assemble that from three separate blocks further down the page. This states
   * it once, in one paragraph, from the guide's own fields: the route count,
   * the primary route and its processing time, this country's rent and salary
   * figures, and the review date already printed above.
   *
   * Nothing here is written per country, and nothing is invented. The only
   * branch is the closing clause: 13 of the 22 destinations have a named
   * official authority in the dataset and 9 do not, so the ones that do name it
   * and the ones that do not point at the authority generically rather than
   * inventing a plausible department.
   */
  const authority = getOfficialSource(country);
  const quickAnswer = t(
    authority ? "quickAnswerWithAuthority" : "quickAnswerNoAuthority",
    {
      country: pick(destination.name, locale),
      routes: guide.routes.length,
      route: pick(guide.routes[0].name, locale),
      processing: pick(guide.routes[0].processing, locale),
      city: pick(destination.cost.city, locale),
      rent: money(destination.cost.rentCenter, locale),
      salary: money(destination.cost.avgNetSalary, locale),
      date: formatDate(guide.updatedAt, locale),
      authority: authority?.name ?? "",
    },
  );

  const title = pick(guide.title, locale);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
        <Link href="/guides" className="hover:text-brand-700">
          {t("backToGuides")}
        </Link>
      </nav>

      <header>
        {/* SVG, not the emoji: Windows has no flag-emoji glyphs and renders
            them as the bare country code. */}
        <Flag code={country} size={56} className="rounded-md shadow-card" />
        <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-xs text-ink-muted">
          {t("updated", { date: formatDate(guide.updatedAt, locale) })}
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          {pick(guide.summary, locale)}
        </p>
      </header>

      <section className="mt-8 rounded-card border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          {t("quickAnswer")}
        </h2>
        <p className="mt-2 text-lg leading-relaxed text-ink">{quickAnswer}</p>
      </section>

      <CountryImage
        countryCode={country}
        locale={locale}
        priority
        className="mt-8"
      />

      {guide.sections ? <GuideToc /> : null}

      {/*
        At a glance.

        Each card names the metric before the number. Previously it showed
        "Berlin" above "$1,300" and "Germany" above "$3,000" — a human infers
        rent and salary from the icons, but an extractive system reading the
        HTML sees two unlabelled figures and cannot tell what either measures,
        which is what kept these pages quotable-in-principle only. The heading
        is visible for the same reason: it gives the block something to anchor to.
      */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          {t("atAGlance")}
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardBody className="pt-5">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Wallet aria-hidden className="size-4" />
              </span>
              <p className="mt-3 text-xs text-ink-muted">
                {ex("rent")} — {pick(destination.cost.city, locale)}
              </p>
              <p className="tnum text-lg font-semibold text-ink">
                {money(destination.cost.rentCenter, locale)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="pt-5">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Coins aria-hidden className="size-4" />
              </span>
              <p className="mt-3 text-xs text-ink-muted">
                {ex("avgSalary")} — {pick(destination.name, locale)}
              </p>
              <p className="tnum text-lg font-semibold text-ink">
                {money(destination.cost.avgNetSalary, locale)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="pt-5">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <CalendarClock aria-hidden className="size-4" />
              </span>
              {/* Names the route the figure belongs to: "4–8 weeks" is
                  meaningless without knowing which permit it measures. */}
              <p className="mt-3 text-xs text-ink-muted">
                {t("processing")} — {pick(guide.routes[0].name, locale)}
              </p>
              <p className="text-lg font-semibold text-ink">
                {pick(guide.routes[0].processing, locale)}
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      <p className="mt-8 text-base leading-relaxed text-ink">
        {pick(guide.intro, locale)}
      </p>

      <DataProvenance
        locale={locale}
        variant="visa"
        updatedAt={guide.updatedAt}
        countryCode={country}
        countryName={pick(destination.name, locale)}
        className="mt-6"
      />

      <AdSlot slot="3646857652" format="inline" />

      {/* Visa routes */}
      <section id="routes" className="mt-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("routes")}</h2>
        <div className="mt-5 space-y-4">
          {guide.routes.map((route, i) => (
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
                    {t("processing")}: {pick(route.processing, locale)}
                  </Badge>
                  <Badge tone="outline">
                    <Coins aria-hidden className="size-3.5" />
                    {t("cost")}: {pick(route.cost, locale)}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="mt-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("requirements")}</h2>
        <ul className="mt-5 space-y-3">
          {guide.requirements.map((req, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-brand-600"
              />
              <span className="leading-relaxed text-ink">{pick(req, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      {guide.sections ? (
        <GuideBody
          sections={guide.sections}
          country={destination}
          locale={locale}
        />
      ) : null}

      <PhotoCredits
        countryCodes={[country]}
        locale={locale}
        className="mt-10"
      />

      {/* Related jobs */}
      {relatedJobs.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">{t("relatedJobs")}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {relatedJobs.map((job) => (
              <li key={job.id}>
                <Badge tone="high">{pick(job.title, locale)}</Badge>
              </li>
            ))}
          </ul>
          {/* Country-scoped, not the generic /jobs index: the heading above
              promises jobs *here*, and a link that drops the filter breaks
              that promise for the reader and tells search engines nothing
              about which country this page belongs to. */}
          <Link href={`/jobs?country=${country}`} className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              {t("relatedJobs")}
              <ArrowRight aria-hidden className="flip-rtl" />
            </Button>
          </Link>
        </section>
      ) : null}

      {/* Cross-link into the tool that keeps people on site */}
      <section className="mt-10 rounded-card border border-brand-100 bg-brand-50 p-6">
        <p className="text-lg font-semibold text-ink">{t("compareCta")}</p>
        <Link href={`/explorer?to=${country}`} className="mt-4 inline-block">
          <Button>
            {nav("explorer")}
            <ArrowRight aria-hidden className="flip-rtl" />
          </Button>
        </Link>
      </section>

      {comparisons.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink">
            {t("compareTitle", { country: pick(destination.name, locale) })}
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            {t("compareBody", { country: pick(destination.name, locale) })}
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {comparisons.map(({ pair, origin }) => (
              <li key={`${pair.from}-${pair.to}`}>
                <Link
                  href={`/compare/${COUNTRY_SLUGS[pair.from]}/${COUNTRY_SLUGS[pair.to]}`}
                  className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
                >
                  <Flag code={pair.from} className="size-6 shrink-0 rounded-sm" />
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-ink-muted flip-rtl"
                  />
                  <Flag code={pair.to} className="size-6 shrink-0 rounded-sm" />
                  {/* Anchor text is the target page's own H1, not "compare". */}
                  <span className="ms-1 min-w-0 font-medium text-ink">
                    {t("compareItem", {
                      to: pick(destination.name, locale),
                      from: pick(origin.name, locale),
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {relatedCountries.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {t("relatedCountries", { region: pick(destination.region, locale) })}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {t("relatedCountriesBody")}
          </p>

          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {relatedCountries.map((c) => (
              <li key={c.code}>
                {/* Anchor text names the destination — no "read more". */}
                <Link
                  href={`/guides/${c.code}`}
                  className="lift flex items-center gap-3 rounded-card border border-line bg-surface p-4"
                >
                  <Flag code={c.code} className="size-6 shrink-0 rounded-sm" />
                  <span className="min-w-0 font-medium text-ink">
                    {pick(c.name, locale)}
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="ms-auto size-4 shrink-0 text-brand-700 flip-rtl"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-xs leading-relaxed text-ink-muted">
        {t("disclaimer")}
      </p>

      <AdSlot slot="1020694315" format="leaderboard" />

      <JsonLd
        data={articleSchema({
          headline: title,
          description: pick(guide.summary, locale),
          path: `/guides/${country}`,
          locale,
          updatedAt: guide.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: nav("guides"), path: "/guides" },
            { name: pick(destination.name, locale), path: `/guides/${country}` },
          ],
          locale,
        )}
      />
      {/* Each visa route becomes an FAQ entry — this is what wins the rich result. */}
      <JsonLd
        data={faqSchema(
          guide.routes.map((route) => ({
            question: pick(route.name, locale),
            answer: `${pick(route.who, locale)} ${t("processing")}: ${pick(
              route.processing,
              locale,
            )}. ${t("cost")}: ${pick(route.cost, locale)}.`,
          })),
        )}
      />
    </article>
  );
}
