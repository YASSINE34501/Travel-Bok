export type Locale = "en" | "ar";

/** A string that exists in both site languages. */
export type Localized = { en: string; ar: string };

export type CostOfLiving = {
  city: Localized;
  /** All monetary values are monthly USD unless stated otherwise. */
  rentCenter: number;
  rentOutside: number;
  groceries: number;
  utilities: number;
  transport: number;
  internet: number;
  mealOut: number;
  avgNetSalary: number;
};

export type Country = {
  /** ISO 3166-1 alpha-2, lowercased. Doubles as the URL slug. */
  code: string;
  name: Localized;
  flag: string;
  currency: string;
  region: Localized;
  /** Whether we publish an immigration guide + job data for this country. */
  isDestination: boolean;
  cost: CostOfLiving;
};

export type DemandLevel = "high" | "medium" | "low";

export type EducationLevel = {
  slug: string;
  name: Localized;
  /** Higher rank satisfies any lower-ranked requirement. */
  rank: number;
};

export type JobField = {
  slug: string;
  name: Localized;
  icon: string;
};

export type JobOpportunity = {
  id: string;
  countryCode: string;
  fieldSlug: string;
  title: Localized;
  minEducation: string;
  demand: DemandLevel;
  salaryFrom: number;
  salaryTo: number;
  /** Annual, in the destination's local currency. */
  salaryCurrency: string;
  visaSponsorship: boolean;
  licenceRequired: boolean;
  note: Localized;
};

export type VisaRoute = {
  name: Localized;
  who: Localized;
  processing: Localized;
  cost: Localized;
};

export type VisaGuide = {
  countryCode: string;
  title: Localized;
  summary: Localized;
  intro: Localized;
  routes: VisaRoute[];
  requirements: Localized[];
  updatedAt: string;
};

/** Per-category comparison row rendered by the cost explorer. */
export type CostRow = {
  key: string;
  source: number;
  destination: number;
};
