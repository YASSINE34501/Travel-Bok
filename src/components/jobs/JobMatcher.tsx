"use client";

import { useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck, ArrowRight, ShieldAlert, Stamp } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Country, JobOpportunity, Locale } from "@/lib/types";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Button } from "@/components/ui/button";
import { Field, Select } from "@/components/ui/field";
import { CountrySelect } from "@/components/ui/country-select";
import { EDUCATION_LEVELS, JOB_FIELDS, educationRank } from "@/data/jobs";
import { money, t as pick } from "@/lib/format";

type Props = {
  jobs: JobOpportunity[];
  countries: Country[];
  guideCountries: string[];
  /** Initial country filter, from ?country= on the page. */
  defaultCountry?: string;
};

const DEMAND_ORDER: Record<JobOpportunity["demand"], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function JobMatcher({
  jobs,
  countries,
  guideCountries,
  defaultCountry = "all",
}: Props) {
  const t = useTranslations("Jobs");
  const locale = useLocale() as Locale;
  const id = useId();

  const [education, setEducation] = useState("bachelor");
  const [field, setField] = useState("all");
  const [country, setCountry] = useState(defaultCountry);

  const countryByCode = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries],
  );

  const results = useMemo(() => {
    const userRank = educationRank(education);

    return jobs
      .filter((job) => educationRank(job.minEducation) <= userRank)
      .filter((job) => field === "all" || job.fieldSlug === field)
      .filter((job) => country === "all" || job.countryCode === country)
      .sort(
        (a, b) =>
          DEMAND_ORDER[a.demand] - DEMAND_ORDER[b.demand] ||
          b.salaryFrom - a.salaryFrom,
      );
  }, [jobs, education, field, country]);

  const destinations = useMemo(
    () => countries.filter((c) => jobs.some((j) => j.countryCode === c.code)),
    [countries, jobs],
  );

  const countryOptions = useMemo(
    () => [
      { code: "all", label: t("anyCountry") },
      ...destinations.map((c) => ({
        code: c.code,
        label: pick(c.name, locale),
      })),
    ],
    [destinations, locale, t],
  );

  const reset = () => {
    setEducation("bachelor");
    setField("all");
    setCountry("all");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-line bg-surface/85 p-5 shadow-glass backdrop-blur-md backdrop-saturate-150 sm:p-6 sm:grid-cols-3">
          <Field label={t("education")} htmlFor={`${id}-edu`}>
            <Select
              id={`${id}-edu`}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              {EDUCATION_LEVELS.map((level) => (
                <option key={level.slug} value={level.slug}>
                  {pick(level.name, locale)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label={t("field")} htmlFor={`${id}-field`}>
            <Select
              id={`${id}-field`}
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option value="all">{t("anyField")}</option>
              {JOB_FIELDS.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.icon} {pick(f.name, locale)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label={t("country")} htmlFor={`${id}-country`}>
            <CountrySelect
              id={`${id}-country`}
              label={t("country")}
              value={country}
              onChange={setCountry}
              options={countryOptions}
            />
          </Field>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* aria-live so screen readers hear the count change as filters move. */}
        <p aria-live="polite" className="text-sm font-medium text-ink">
          {t("results", { count: results.length })}
        </p>
        <Button variant="ghost" size="sm" onClick={reset}>
          {t("reset")}
        </Button>
      </div>

      {results.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center text-ink-muted">
            {t("empty")}
          </CardBody>
        </Card>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {results.map((job) => {
            const jobCountry = countryByCode.get(job.countryCode);
            const jobField = JOB_FIELDS.find((f) => f.slug === job.fieldSlug);
            const minLevel = EDUCATION_LEVELS.find(
              (l) => l.slug === job.minEducation,
            );

            return (
              <li key={job.id}>
                <Card className="h-full">
                  <CardBody className="flex h-full flex-col pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug text-ink">
                          {pick(job.title, locale)}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                          <Flag code={job.countryCode} size={16} />
                          {jobCountry ? pick(jobCountry.name, locale) : job.countryCode}
                          {jobField ? ` · ${pick(jobField.name, locale)}` : null}
                        </p>
                      </div>
                      <Badge tone={job.demand}>
                        {t("demand")}: {t(
                          job.demand === "high"
                            ? "demandHigh"
                            : job.demand === "medium"
                              ? "demandMedium"
                              : "demandLow",
                        )}
                      </Badge>
                    </div>

                    <p className="tnum mt-4 text-lg font-semibold text-ink">
                      {money(job.salaryFrom, locale, job.salaryCurrency)} –{" "}
                      {money(job.salaryTo, locale, job.salaryCurrency)}
                      <span className="text-sm font-normal text-ink-muted">
                        {t("perYear")}
                      </span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge tone={job.visaSponsorship ? "high" : "outline"}>
                        {job.visaSponsorship ? (
                          <BadgeCheck aria-hidden className="size-3.5" />
                        ) : (
                          <ShieldAlert aria-hidden className="size-3.5" />
                        )}
                        {job.visaSponsorship ? t("sponsorship") : t("noSponsorship")}
                      </Badge>
                      {job.licenceRequired ? (
                        <Badge tone="outline">
                          <Stamp aria-hidden className="size-3.5" />
                          {t("licence")}
                        </Badge>
                      ) : null}
                      {minLevel ? (
                        <Badge tone="neutral">
                          {t("minEducation")}: {pick(minLevel.name, locale)}
                        </Badge>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {pick(job.note, locale)}
                    </p>

                    {jobCountry && guideCountries.includes(job.countryCode) ? (
                      <Link
                        href={`/guides/${job.countryCode}`}
                        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand-700 hover:underline"
                      >
                        {t("viewGuide", { country: pick(jobCountry.name, locale) })}
                        <ArrowRight aria-hidden className="size-4 flip-rtl" />
                      </Link>
                    ) : null}
                  </CardBody>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
