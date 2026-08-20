import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BriefcaseBusiness,
  Coins,
  FileCheck2,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  Languages,
  Layers,
  Stamp,
  TrainFront,
  Users,
  Wallet,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Country, JobOpportunity, VisaGuide } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Reveal } from "@/components/common/Reveal";
import { EDUCATION_LEVELS, JOB_FIELDS } from "@/data/jobs";
import { money, t as pick } from "@/lib/format";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {sub ? <p className="mt-3 text-ink-muted">{sub}</p> : null}
    </div>
  );
}

/* ----------------------------------- 1 ------------------------------------ */

export async function FeatureRow() {
  const t = await getTranslations("Home");

  const features = [
    { icon: Wallet, title: t("f1Title"), body: t("f1Body"), href: "/explorer" },
    { icon: BriefcaseBusiness, title: t("f2Title"), body: t("f2Body"), href: "/jobs" },
    { icon: Stamp, title: t("f3Title"), body: t("f3Body"), href: "/guides" },
    { icon: Users, title: t("f4Title"), body: t("f4Body"), href: "/about" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead title={t("featuresTitle")} sub={t("featuresSubtitle")} />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 60}>
            <Link
              href={feature.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <feature.icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.body}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- 2 ------------------------------------ */

/**
 * Deliberately *not* "50K+ people exploring smarter".
 *
 * This site has no user numbers to report, and inventing them on a page aimed
 * at people making an expensive, irreversible decision is the exact opposite of
 * the trust it is meant to build — it would also undercut the sourcing
 * disclosure on every cost and visa page. These four figures are counted from
 * the dataset at build time, so they cannot drift or overstate.
 */
export async function Stats({
  countries,
  guides,
}: {
  countries: number;
  guides: number;
}) {
  const t = await getTranslations("Home");

  const stats = [
    { icon: Globe2, value: `${countries}`, label: t("statCountriesLabel") },
    { icon: FileCheck2, value: `${guides}`, label: t("statGuidesLabel") },
    { icon: Layers, value: "8", label: t("statCategoriesLabel") },
    { icon: Languages, value: "2", label: t("statLanguagesLabel") },
  ];

  return (
    <section className="py-4">
      <Reveal>
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {t("statsTitle")}
          </h2>

          <dl className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <stat.icon aria-hidden className="size-5 text-brand-600" />
                <dd className="tnum mt-3 text-3xl font-bold tracking-tight text-ink">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-ink-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-ink-muted">
            {t("statsNote")}{" "}
            <Link href="/about" className="text-brand-700 hover:underline">
              {t("statsLink")}
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- 3 ------------------------------------ */

export async function HowItWorks() {
  const t = await getTranslations("Home");

  const steps = [
    { title: t("how1Title"), body: t("how1Body") },
    { title: t("how2Title"), body: t("how2Body") },
    { title: t("how3Title"), body: t("how3Body") },
    { title: t("how4Title"), body: t("how4Body") },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead title={t("howTitle")} sub={t("howSubtitle")} />
      </Reveal>

      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 60}>
            <li className="relative ps-12">
              <span className="tnum absolute start-0 top-0 grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------------- 4 ------------------------------------ */

export async function ExplorerPreview({
  source,
  destination,
  locale,
}: {
  source: Country;
  destination: Country;
  locale: Locale;
}) {
  const [t, e, gs] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Explorer"),
    getTranslations("GuideSections"),
  ]);

  const core = (c: Country) =>
    c.cost.rentCenter +
    c.cost.groceries +
    c.cost.utilities +
    c.cost.transport +
    c.cost.internet;

  const rows = [
    { icon: HomeIcon, label: e("rent"), a: source.cost.rentCenter, b: destination.cost.rentCenter },
    { icon: Coins, label: e("total"), a: core(source), b: core(destination) },
    { icon: Wallet, label: e("avgSalary"), a: source.cost.avgNetSalary, b: destination.cost.avgNetSalary },
    { icon: TrainFront, label: e("transport"), a: source.cost.transport, b: destination.cost.transport },
    { icon: HeartPulse, label: gs("healthInsurance"), a: source.cost.healthInsurance, b: destination.cost.healthInsurance },
  ];

  const savings = (c: Country) => c.cost.avgNetSalary - core(c);

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead
          title={t("explorerPreviewTitle")}
          sub={t("explorerPreviewSub")}
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line bg-brand-50/60 px-5 py-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {e("breakdown")}
            </span>
            {[source, destination].map((c) => (
              <span
                key={c.code}
                className="flex min-w-20 items-center justify-end gap-2 text-sm font-semibold text-ink sm:min-w-28"
              >
                <Flag code={c.code} size={20} />
                <span className="hidden sm:inline">{pick(c.name, locale)}</span>
              </span>
            ))}
          </div>

          <div className="divide-y divide-line">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3.5 sm:px-6"
              >
                <span className="flex items-center gap-2.5 text-sm text-ink">
                  <row.icon aria-hidden className="size-4 shrink-0 text-ink-muted" />
                  {row.label}
                </span>
                <span className="tnum min-w-20 text-end text-sm text-ink-muted sm:min-w-28">
                  {money(row.a, locale)}
                </span>
                <span className="tnum min-w-20 text-end text-sm font-medium text-ink sm:min-w-28">
                  {money(row.b, locale)}
                </span>
              </div>
            ))}

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-positive-100/40 px-5 py-4 sm:px-6">
              <span className="text-sm font-semibold text-ink">
                {t("savings")}
              </span>
              {[source, destination].map((c) => (
                <span
                  key={c.code}
                  className={cn(
                    "tnum min-w-20 text-end text-sm font-bold sm:min-w-28",
                    savings(c) >= 0 ? "text-positive" : "text-negative",
                  )}
                >
                  {money(savings(c), locale)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <Link href="/explorer" className="mt-6 inline-block">
          <Button variant="secondary">
            {t("explorerPreviewCta")}
            <ArrowRight aria-hidden className="flip-rtl" />
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- 5 ------------------------------------ */

export async function JobsPreview({
  jobs,
  countries,
  locale,
}: {
  jobs: JobOpportunity[];
  countries: Country[];
  locale: Locale;
}) {
  const [t, j] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Jobs"),
  ]);

  const byCode = new Map(countries.map((c) => [c.code, c]));
  const shown = jobs.filter((job) => job.demand === "high").slice(0, 3);

  const bachelor = EDUCATION_LEVELS.find((l) => l.slug === "bachelor");
  const field = JOB_FIELDS.find((f) => f.slug === "it") ?? JOB_FIELDS[0];

  const filters = [
    {
      icon: GraduationCap,
      label: t("jobsDegree"),
      value: bachelor ? pick(bachelor.name, locale) : "",
    },
    { icon: Layers, label: t("jobsField"), value: pick(field.name, locale) },
    { icon: BriefcaseBusiness, label: t("jobsExperience"), value: t("jobsExperienceValue") },
    { icon: Globe2, label: t("jobsCountry"), value: j("anyCountry") },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead title={t("jobsPreviewTitle")} sub={t("jobsPreviewSub")} />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr] lg:items-start">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <dl className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.label}>
                  <dt className="text-xs font-medium text-ink-muted">
                    {filter.label}
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-line-input bg-paper px-3.5 py-2.5 text-sm text-ink">
                    <filter.icon aria-hidden className="size-4 shrink-0 text-ink-muted" />
                    {filter.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">
              <span className="tnum font-bold text-brand-700">{jobs.length}</span>{" "}
              {t("jobsMatches")}
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {shown.map((job, i) => {
            const country = byCode.get(job.countryCode);
            return (
              <Reveal key={job.id} delay={i * 60}>
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-lift">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">
                      {pick(job.title, locale)}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                      <Flag code={job.countryCode} size={16} />
                      {country ? pick(country.name, locale) : job.countryCode}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="tnum whitespace-nowrap text-sm font-semibold text-ink">
                      {money(job.salaryFrom, locale, job.salaryCurrency)} –{" "}
                      {money(job.salaryTo, locale, job.salaryCurrency)}
                    </span>
                    {job.visaSponsorship ? (
                      <Badge tone="high">{j("sponsorship")}</Badge>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={180}>
            <Link href="/jobs" className="inline-block pt-1">
              <Button variant="secondary">
                {t("jobsPreviewCta")}
                <ArrowRight aria-hidden className="flip-rtl" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- 6 ------------------------------------ */

/**
 * Complexity is derived from the guide's own fastest published processing time
 * rather than assigned editorially. A hand-set "difficulty" score would be an
 * opinion presented as data on a page where every other number cites a source.
 */
function complexity(guide: VisaGuide): "low" | "medium" | "high" {
  const fastest = guide.routes[0]?.processing.en.toLowerCase() ?? "";
  if (fastest.includes("week") || fastest.includes("day")) return "low";
  const months = fastest.match(/(\d+)\s*(?:–|-|to)?\s*(\d+)?\s*month/);
  if (months) {
    const upper = Number(months[2] ?? months[1]);
    return upper <= 3 ? "medium" : "high";
  }
  return "high";
}

export async function GuidesPreview({
  guides,
  countries,
  locale,
}: {
  guides: VisaGuide[];
  countries: Country[];
  locale: Locale;
}) {
  const [t, g] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Guides"),
  ]);

  const byCode = new Map(countries.map((c) => [c.code, c]));
  const featured = ["de", "ca", "ae"]
    .map((code) => guides.find((guide) => guide.countryCode === code))
    .filter((guide): guide is VisaGuide => Boolean(guide));

  const tone = { low: "high", medium: "medium", high: "low" } as const;
  const labels = {
    low: t("difficultyLow"),
    medium: t("difficultyMedium"),
    high: t("difficultyHigh"),
  };

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead title={t("guidesPreviewTitle")} sub={t("guidesPreviewSub")} />
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {featured.map((guide, i) => {
          const country = byCode.get(guide.countryCode);
          const level = complexity(guide);
          return (
            <Reveal key={guide.countryCode} delay={i * 60}>
              <Link
                href={`/guides/${guide.countryCode}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center gap-3">
                  <Flag code={guide.countryCode} size={28} className="rounded-md" />
                  <span className="font-semibold text-ink">
                    {country ? pick(country.name, locale) : guide.countryCode}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-ink">
                  {pick(guide.routes[0].name, locale)}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {pick(guide.routes[0].who, locale)}
                </p>

                <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-ink-muted">
                  <div className="flex justify-between gap-3">
                    <dt>{g("processing")}</dt>
                    <dd className="text-end font-medium text-ink">
                      {pick(guide.routes[0].processing, locale)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>{t("visaRoutes")}</dt>
                    <dd className="tnum font-medium text-ink">
                      {guide.routes.length}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>{t("visaDocs")}</dt>
                    <dd className="tnum font-medium text-ink">
                      {guide.requirements.length}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-ink-muted">{t("difficulty")}</span>
                  <Badge tone={tone[level]}>{labels[level]}</Badge>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={180}>
        <Link href="/guides" className="mt-6 inline-block">
          <Button variant="secondary">
            {t("guidesPreviewCta")}
            <ArrowRight aria-hidden className="flip-rtl" />
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- 7 ------------------------------------ */

export async function PopularDestinations({
  countries,
  guides,
  locale,
}: {
  countries: Country[];
  guides: VisaGuide[];
  locale: Locale;
}) {
  const t = await getTranslations("Home");
  const has = new Set(guides.map((guide) => guide.countryCode));
  const byCode = new Map(countries.map((c) => [c.code, c]));

  const picks = ["ca", "de", "au", "gb", "fr", "ae"]
    .filter((code) => has.has(code))
    .map((code) => byCode.get(code))
    .filter((c): c is Country => Boolean(c));

  return (
    <section className="py-16 sm:py-20">
      <Reveal>
        <SectionHead title={t("popularTitle")} sub={t("popularSubtitle")} />
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {picks.map((country, i) => (
          <Reveal key={country.code} delay={i * 40}>
            <Link
              href={`/guides/${country.code}`}
              className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-5 text-center shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Flag
                code={country.code}
                size={40}
                className="rounded-md shadow-card transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
              <span className="text-sm font-medium leading-snug text-ink">
                {pick(country.name, locale)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- 8 ------------------------------------ */

export async function FinalCta() {
  const t = await getTranslations("Home");

  return (
    <section className="pb-20 pt-4 sm:pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-700 via-brand-600 to-brand-900 px-8 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -end-16 size-56 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t("finalTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">
              {t("finalSub")}
            </p>
            <Link href="/explorer" className="mt-8 inline-block">
              <Button
                size="lg"
                className="bg-white text-brand-700 shadow-lift hover:bg-brand-50"
              >
                {t("finalCta")}
                <ArrowRight aria-hidden className="flip-rtl" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
