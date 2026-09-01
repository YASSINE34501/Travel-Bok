import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Card, CardBody } from "@/components/ui/card";
import {
  COST_SOURCES,
  COST_DATA_UPDATED,
  OFFICIAL_IMMIGRATION_SOURCES,
} from "@/data/sources";
import { getCountries, getGuides, getJobs } from "@/lib/queries";
import { t as pick, formatDate } from "@/lib/format";
import {
  pageMetadata,
  JsonLd,
  breadcrumbSchema,
  datasetSchema,
} from "@/lib/seo";

// 12 hours. Must be a literal: Next statically analyses this export, and an
// imported constant fails the build with "Invalid segment configuration export".
export const revalidate = 43200;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

/**
 * The data-and-sources reference.
 *
 * Deliberately NOT a methodology essay: the About page already explains how the
 * numbers are compiled, and repeating that in prose would be duplicate content
 * competing with itself. What did not exist anywhere was a single place listing
 * *what* the dataset contains and *every* source behind it — until now those
 * were scattered across collapsed <details> blocks on the explorer and on each
 * of the 22 guides, which made them impossible to cite as a whole.
 *
 * Every count below is computed from the live dataset at render time rather
 * than typed into the copy, so the page cannot claim coverage the site does not
 * actually have.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Data" });

  return pageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/data",
    locale,
    keywords: t.raw("keywords") as string[],
  });
}

export default async function DataPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, ex, nav, countries, guides, jobs] = await Promise.all([
    getTranslations("Data"),
    getTranslations("Explorer"),
    getTranslations("Nav"),
    getCountries(),
    getGuides(),
    getJobs(),
  ]);

  const jobCountries = new Set(jobs.map((j) => j.countryCode));
  const guideCodes = guides.map((g) => g.countryCode);
  const withAuthority = guideCodes.filter(
    (c) => OFFICIAL_IMMIGRATION_SOURCES[c],
  ).length;

  const coverage = [
    { label: t("countries"), value: countries.length },
    { label: t("destinations"), value: guides.length },
    { label: t("jobsCount"), value: jobs.length },
    { label: t("jobCountries"), value: jobCountries.size },
  ];

  // The categories the explorer actually renders, using its own labels so the
  // two can never describe different things.
  const categories = [
    "rent",
    "rentOutside",
    "groceries",
    "utilities",
    "transport",
    "internet",
    "meal",
    "avgSalary",
  ] as const;

  const authorities = guideCodes
    .map((code) => ({ code, source: OFFICIAL_IMMIGRATION_SOURCES[code] }))
    .filter((r): r is { code: string; source: (typeof COST_SOURCES)[number] } =>
      Boolean(r.source),
    );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/*
        The only page on the site that describes a dataset, so the only page
        that may claim one. Every property is drawn from what is rendered
        below — the measured variables are the same chips, the sources are the
        same list, the date is the same review date in the header — because
        Dataset markup describing fields a reader cannot see is a violation
        rather than an optimisation.
      */}
      <JsonLd
        data={datasetSchema({
          name: t("title"),
          description: t("subtitle"),
          path: "/data",
          locale,
          updatedAt: COST_DATA_UPDATED,
          variableMeasured: categories.map((key) => ex(key)),
          isBasedOn: COST_SOURCES.map((source) => source.url),
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "TRAVLBOK", path: "/" },
            { name: t("title"), path: "/data" },
          ],
          locale,
        )}
      />

      <header>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {t("subtitle")}
        </p>
        <p className="mt-3 text-xs text-ink-muted">
          {t("reviewed", { date: formatDate(COST_DATA_UPDATED, locale) })}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("coverage")}</h2>
        <p className="mt-2 text-sm text-ink-muted">{t("coverageBody")}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coverage.map((item) => (
            <Card key={item.label}>
              <CardBody className="pt-5">
                <p className="tnum text-2xl font-bold text-ink">{item.value}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {item.label}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("measured")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">{t("measuredBody")}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {categories.map((key) => (
            <li
              key={key}
              className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink"
            >
              {ex(key)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("costSources")}</h2>
        <ul className="mt-4 space-y-3">
          {COST_SOURCES.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-card border border-line bg-surface p-4"
              >
                <ExternalLink
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-brand-700"
                />
                <span className="min-w-0">
                  <span className="block font-medium text-ink group-hover:text-brand-700">
                    {source.name}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                    {pick(source.note, locale)}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("officialSources")}</h2>
        <p className="mt-2 leading-relaxed text-ink-muted">
          {t("officialSourcesBody")}
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {authorities.map(({ code, source }) => (
                <tr key={code} className="border-b border-line last:border-0">
                  <td className="py-3 pe-4 align-top">
                    <Link
                      href={`/guides/${code}`}
                      className="font-medium text-ink hover:text-brand-700"
                    >
                      {pick(
                        countries.find((c) => c.code === code)?.name ?? {
                          en: code,
                          ar: code,
                        },
                        locale,
                      )}
                    </Link>
                  </td>
                  <td className="py-3 align-top">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 underline underline-offset-2"
                    >
                      {source.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("limits")}</h2>
        <p className="mt-2 text-ink-muted">{t("limitsIntro")}</p>

        <ul className="mt-4 list-disc space-y-2 ps-5 leading-relaxed text-ink-muted">
          <li>{t("limitNotAdvice")}</li>
          <li>{t("limitEstimates")}</li>
          <li>{t("limitChange")}</li>
          <li>
            {t("limitJobs", {
              jobCountries: jobCountries.size,
              destinations: guides.length,
            })}
          </li>
          <li>
            {t("limitAuthorities", {
              withAuthority,
              destinations: guides.length,
            })}
          </li>
        </ul>

        <p className="mt-6 text-sm text-ink-muted">
          {t("approach")}{" "}
          <Link href="/about" className="text-brand-700 underline underline-offset-2">
            {nav("about")}
          </Link>
        </p>
      </section>
    </div>
  );
}
