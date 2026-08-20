import { getTranslations } from "next-intl/server";
import { Check, Minus, Sparkles } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import type { Country, GuideSections } from "@/lib/types";
import { Card, CardBody } from "@/components/ui/card";
import { CountryImage } from "@/components/common/CountryImage";
import { t as pick, money } from "@/lib/format";

/**
 * The standardised body of a country guide: residency and legal framework,
 * cost of living, job market, and life quality. Rendered from structured data
 * so every guide answers the same questions in the same order — which is what
 * makes two countries comparable rather than just individually readable.
 */
export async function GuideBody({
  sections,
  country,
  locale,
}: {
  sections: GuideSections;
  country: Country;
  locale: Locale;
}) {
  const t = await getTranslations("GuideSections");
  const e = await getTranslations("Explorer");
  const c = country.cost;

  const costRows = [
    { label: e("rent"), value: c.rentCenter },
    { label: e("rentOutside"), value: c.rentOutside },
    { label: e("groceries"), value: c.groceries },
    { label: e("utilities"), value: c.utilities },
    { label: t("healthInsurance"), value: c.healthInsurance },
    { label: e("transport"), value: c.transport },
    { label: e("internet"), value: c.internet },
  ];

  const coreTotal =
    c.rentCenter + c.groceries + c.utilities + c.healthInsurance + c.transport + c.internet;

  return (
    <>
      {/* Residency & legal framework */}
      <section id="residency" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("residencyTitle")}</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardBody className="pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {t("permanentTitle")}
              </h3>
              <p className="mt-2 leading-relaxed text-ink">
                {pick(sections.residency.permanent, locale)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {t("citizenshipTitle")}
              </h3>
              <p className="mt-2 leading-relaxed text-ink">
                {pick(sections.residency.citizenship, locale)}
              </p>
            </CardBody>
          </Card>
        </div>

        <h3 className="mt-8 text-lg font-semibold text-ink">{t("rightsTitle")}</h3>
        <ul className="mt-3 space-y-2.5">
          {sections.residency.rights.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-600" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-lg font-semibold text-ink">{t("labourTitle")}</h3>
        <ul className="mt-3 space-y-2.5">
          {sections.residency.labourLaw.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cost of living */}
      <section id="cost" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("costTitle")}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          {t("costIntro", { city: pick(c.city, locale) })}
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[20rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-start">
                <th scope="col" className="py-2.5 text-start font-semibold text-ink-muted">
                  {t("category")}
                </th>
                <th scope="col" className="py-2.5 text-end font-semibold text-ink-muted">
                  {t("amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((row) => (
                <tr key={row.label} className="border-b border-line/70">
                  <th scope="row" className="py-2.5 text-start font-normal text-ink">
                    {row.label}
                  </th>
                  <td className="tnum py-2.5 text-end text-ink">
                    {money(row.value, locale)}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="py-3 text-start font-semibold text-ink">
                  {t("totalCore")}
                </th>
                <td className="tnum py-3 text-end font-semibold text-ink">
                  {money(coreTotal, locale)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Job market */}
      <section id="jobs" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("jobsTitle")}</h2>

        <CountryImage
          countryCode={country.code}
          locale={locale}
          aspect="banner"
          className="mt-5"
        />

        <h3 className="mt-6 text-lg font-semibold text-ink">{t("industriesTitle")}</h3>
        <ul className="mt-3 space-y-2.5">
          {sections.jobMarket.industries.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink">
              <Sparkles aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" />
              <span>{pick(item, locale)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardBody className="pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {t("equivalencyTitle")}
              </h3>
              <p className="mt-2 leading-relaxed text-ink">
                {pick(sections.jobMarket.equivalency, locale)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {t("wagesTitle")}
              </h3>
              <p className="mt-2 leading-relaxed text-ink">
                {pick(sections.jobMarket.wages, locale)}
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Life quality */}
      <section id="life" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-ink">{t("lifeTitle")}</h2>

        <div className="mt-5 space-y-4">
          {[
            { title: t("housingTitle"), body: sections.life.housing },
            { title: t("languageTitle"), body: sections.life.language },
            { title: t("integrationTitle"), body: sections.life.integration },
          ].map((block) => (
            <Card key={block.title}>
              <CardBody className="pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  {block.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink">
                  {pick(block.body, locale)}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-positive/20 bg-positive-100/50 p-5">
            <h3 className="font-semibold text-ink">{t("prosTitle")}</h3>
            <ul className="mt-3 space-y-2.5">
              {sections.life.pros.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-positive" />
                  <span>{pick(item, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-negative/20 bg-negative-100/50 p-5">
            <h3 className="font-semibold text-ink">{t("consTitle")}</h3>
            <ul className="mt-3 space-y-2.5">
              {sections.life.cons.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <Minus aria-hidden className="mt-0.5 size-4 shrink-0 text-negative" />
                  <span>{pick(item, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
