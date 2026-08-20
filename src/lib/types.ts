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
  /** Typical monthly private or statutory health cover for one adult. */
  healthInsurance: number;
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

/**
 * The standardised body of a country guide. Structured rather than prose:
 * people scan these to compare countries, and a schema keeps every guide
 * answering the same questions in the same order.
 */
export type GuideSections = {
  residency: {
    /** Time and conditions to reach permanent residence. */
    permanent: Localized;
    /** Time and conditions to reach citizenship. */
    citizenship: Localized;
    /** Dual nationality, family reunion, right to change employer, etc. */
    rights: Localized[];
    /** Working hours, leave, minimum wage, termination protection. */
    labourLaw: Localized[];
  };
  jobMarket: {
    /** Sectors actively hiring from abroad. */
    industries: Localized[];
    /** How foreign qualifications get recognised, and by whom. */
    equivalency: Localized;
    /** How pay is structured and what a typical range looks like. */
    wages: Localized;
  };
  life: {
    housing: Localized;
    language: Localized;
    integration: Localized;
    pros: Localized[];
    cons: Localized[];
  };
};

export type VisaGuide = {
  countryCode: string;
  title: Localized;
  summary: Localized;
  intro: Localized;
  routes: VisaRoute[];
  requirements: Localized[];
  /** Optional so a guide can ship before its long-form sections are written. */
  sections?: GuideSections;
  updatedAt: string;
};

/** Per-category comparison row rendered by the cost explorer. */
export type CostRow = {
  key: string;
  source: number;
  destination: number;
};
