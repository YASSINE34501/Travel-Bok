import type { Country } from "@/lib/types";

/**
 * Shared logic for country-to-country cost comparison.
 *
 * The explorer at /explorer is an interactive tool: its state lives in the URL
 * query, so every pair canonicalises to the bare /explorer and none of them can
 * rank. These routes are the indexable counterpart — the same numbers, rendered
 * as a real landing page with a self-referencing canonical.
 *
 * `coreCost` and the category list live here rather than in CostComparer so the
 * tool and the landing pages can never quote different figures for the same
 * pair. CostComparer imports them from here.
 */

/** Categories shown in the breakdown, in the order people actually budget them. */
export const COST_CATEGORIES = [
  { key: "rent", get: (c: Country) => c.cost.rentCenter },
  { key: "rentOutside", get: (c: Country) => c.cost.rentOutside },
  { key: "groceries", get: (c: Country) => c.cost.groceries },
  { key: "utilities", get: (c: Country) => c.cost.utilities },
  { key: "transport", get: (c: Country) => c.cost.transport },
  { key: "internet", get: (c: Country) => c.cost.internet },
  { key: "meal", get: (c: Country) => c.cost.mealOut },
] as const;

/** Rent + food + bills + transport + internet: the unavoidable monthly floor. */
export function coreCost(c: Country) {
  return (
    c.cost.rentCenter +
    c.cost.groceries +
    c.cost.utilities +
    c.cost.transport +
    c.cost.internet
  );
}

/**
 * URL slugs, declared rather than derived from the country name.
 *
 * A derived slug would silently change the URL of a live page the day someone
 * edits a display name, and "United Arab Emirates" would produce a 21-character
 * segment nobody searches for. `uae` and `saudi-arabia` are what people type.
 */
export const COUNTRY_SLUGS: Record<string, string> = {
  de: "germany", ca: "canada", ae: "uae", nl: "netherlands", fr: "france",
  au: "australia", pt: "portugal", es: "spain", se: "sweden", gb: "uk",
  us: "usa", pl: "poland", sa: "saudi-arabia", tr: "turkiye", ma: "morocco",
  dz: "algeria", tn: "tunisia", eg: "egypt", jo: "jordan", it: "italy",
  be: "belgium", ch: "switzerland", at: "austria", ie: "ireland", qa: "qatar",
  kw: "kuwait", om: "oman", bh: "bahrain",
};

const SLUG_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_SLUGS).map(([code, slug]) => [slug, code]),
);

export function codeForSlug(slug: string): string | undefined {
  return SLUG_TO_CODE[slug];
}

/**
 * The curated pilot set — deliberately NOT every source×destination pair.
 *
 * 5 origins × 22 destinations would be 220 URLs of which most have no real
 * search demand, and publishing them would be programmatic thin content of
 * exactly the kind that gets a site classified as a doorway farm. These ten are
 * established migration corridors. The list is the indexability gate: pages
 * outside it are never generated, so an un-vetted pair 404s rather than
 * existing quietly as a noindex page nobody audits.
 */
export const PILOT_PAIRS: { from: string; to: string }[] = [
  { from: "ma", to: "de" },
  { from: "ma", to: "fr" },
  { from: "ma", to: "es" },
  { from: "ma", to: "pt" },
  { from: "ma", to: "ae" },
  { from: "ma", to: "sa" },
  { from: "dz", to: "fr" },
  { from: "tn", to: "fr" },
  { from: "eg", to: "de" },
  { from: "jo", to: "de" },
];

export function isPilotPair(fromCode: string, toCode: string): boolean {
  return PILOT_PAIRS.some((p) => p.from === fromCode && p.to === toCode);
}

/** Every pilot pair as URL slugs, for generateStaticParams and the sitemap. */
export function pilotSlugPairs(): { from: string; to: string }[] {
  return PILOT_PAIRS.map((p) => ({
    from: COUNTRY_SLUGS[p.from],
    to: COUNTRY_SLUGS[p.to],
  }));
}

export type Comparison = {
  fromCore: number;
  toCore: number;
  /** Percentage difference in the monthly floor, destination vs origin. */
  corePercent: number;
  /** True when the destination costs more to live in than the origin. */
  destinationPricier: boolean;
  /** The category with the largest absolute gap — the real driver. */
  biggestGap: { key: string; from: number; to: number; diff: number };
  /** Months of the destination's core cost covered by its average net salary. */
  toSalaryRatio: number;
  fromSalaryRatio: number;
};

/** Everything the page states, derived — nothing hard-coded in the JSX. */
export function compare(from: Country, to: Country): Comparison {
  const fromCore = coreCost(from);
  const toCore = coreCost(to);

  const gaps = COST_CATEGORIES.map((cat) => {
    const a = cat.get(from);
    const b = cat.get(to);
    return { key: cat.key as string, from: a, to: b, diff: Math.abs(b - a) };
  }).sort((a, b) => b.diff - a.diff);

  return {
    fromCore,
    toCore,
    corePercent: Math.round(((toCore - fromCore) / fromCore) * 100),
    destinationPricier: toCore > fromCore,
    biggestGap: gaps[0],
    toSalaryRatio: to.cost.avgNetSalary / toCore,
    fromSalaryRatio: from.cost.avgNetSalary / fromCore,
  };
}

/**
 * Categories used to attribute the gap, with housing counted ONCE.
 *
 * COST_CATEGORIES lists `rent` and `rentOutside` because the breakdown table
 * shows both, but they are two measurements of the same expense — nobody pays
 * both. Attributing the gap over that list made housing appear twice and put
 * `rentOutside` second in all ten corridors, which is an artefact rather than a
 * finding. Excluding it (and `meal`, which is not part of `coreCost`) leaves
 * exactly the five expenses `coreCost` actually sums.
 */
const GAP_CATEGORIES = [
  { key: "rent", get: (c: Country) => c.cost.rentCenter },
  { key: "groceries", get: (c: Country) => c.cost.groceries },
  { key: "utilities", get: (c: Country) => c.cost.utilities },
  { key: "transport", get: (c: Country) => c.cost.transport },
  { key: "internet", get: (c: Country) => c.cost.internet },
] as const;

export type GapDriver = {
  key: string;
  from: number;
  to: number;
  /** Destination minus origin, monthly USD. */
  diff: number;
  /** Destination as a multiple of origin. 4.7 means "4.7 times as much". */
  ratio: number;
  /** Share of the total absolute gap this category accounts for, 0–1. */
  share: number;
};

/** The five core expenses, ordered by how much of the gap each explains. */
export function gapDrivers(from: Country, to: Country): GapDriver[] {
  const rows = GAP_CATEGORIES.map((cat) => {
    const a = cat.get(from);
    const b = cat.get(to);
    return { key: cat.key as string, from: a, to: b, diff: b - a, ratio: a ? b / a : 0 };
  });
  const total = rows.reduce((sum, r) => sum + Math.abs(r.diff), 0);
  return rows
    .map((r) => ({ ...r, share: total ? Math.abs(r.diff) / total : 0 }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
}

/**
 * How concentrated the gap is in housing. Measured, not assumed: across the ten
 * pilot corridors housing carries between 68% and 84% of the gap, so these
 * thresholds all have real members and the wording genuinely changes.
 */
export type HousingWeight = "dominant" | "leading" | "shared";

export function housingWeight(drivers: GapDriver[]): HousingWeight {
  const housing = drivers.find((d) => d.key === "rent");
  const share = housing?.share ?? 0;
  if (share >= 0.8) return "dominant";
  if (share >= 0.72) return "leading";
  return "shared";
}

/**
 * `coreCost` with rent taken outside the city centre instead of in it.
 *
 * Mirrors `coreCost` exactly — same five expenses, same order — substituting
 * the one figure that changes. Written as its own function rather than a
 * parameter on `coreCost` so there is never a version of "core cost" whose
 * meaning depends on an argument.
 */
export function outsideCentreCore(c: Country) {
  return (
    c.cost.rentOutside +
    c.cost.groceries +
    c.cost.utilities +
    c.cost.transport +
    c.cost.internet
  );
}

/** How the comparison changes if both sides live outside the centre. */
export type OutsideShape = "widens" | "widensSlightly" | "unchanged" | "narrows";

export type OutsideScenario = {
  fromCore: number;
  toCore: number;
  percent: number;
  /** Percentage points the gap moves versus the centre figure. Negative narrows. */
  deltaPoints: number;
  /** Monthly saving in the destination from living outside the centre. */
  toSaving: number;
  shape: OutsideShape;
};

export function outsideCentreScenario(from: Country, to: Country): OutsideScenario {
  const fromCore = outsideCentreCore(from);
  const toCore = outsideCentreCore(to);
  const percent = Math.round(((toCore - fromCore) / fromCore) * 100);
  const centre = Math.round(((coreCost(to) - coreCost(from)) / coreCost(from)) * 100);
  const deltaPoints = percent - centre;

  /**
   * Measured spread across the ten pilot corridors: +25 points (Egypt→Germany)
   * down to -8 (Morocco→the UAE).
   *
   * Widening is the normal case, not the exception: rent outside the centre is
   * cheaper on both sides, but it falls by a larger *proportion* in the lower-
   * cost origin city, so the percentage gap grows even as the destination bill
   * drops. Seven of the ten corridors widen, two are flat, one narrows — which
   * is why the thresholds sit where they do and why no branch is empty.
   */
  const shape: OutsideShape =
    deltaPoints >= 15
      ? "widens"
      : deltaPoints >= 5
        ? "widensSlightly"
        : deltaPoints <= -5
          ? "narrows"
          : "unchanged";

  return {
    fromCore,
    toCore,
    percent,
    deltaPoints,
    toSaving: coreCost(to) - toCore,
    shape,
  };
}

/**
 * One month of the destination's core cost, expressed in months of the
 * ORIGIN's average net salary. Answers "how far does my current pay go there".
 * Deliberately not called disposable income: `coreCost` is rent, groceries,
 * utilities, transport and internet, not a full household budget.
 */
export function monthsOfOriginSalary(from: Country, to: Country) {
  return coreCost(to) / from.cost.avgNetSalary;
}

/** Whether the destination's own average net salary covers its core cost. */
export type SalaryCoverage = "below" | "marginal" | "comfortable";

export function salaryCoverage(ratio: number): SalaryCoverage {
  if (ratio < 1) return "below";
  if (ratio < 1.2) return "marginal";
  return "comfortable";
}
