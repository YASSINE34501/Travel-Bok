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
