import "server-only";

import { COUNTRIES } from "@/data/countries";
import { JOB_OPPORTUNITIES } from "@/data/jobs";
import { VISA_GUIDES } from "@/data/guides";
import type { Country, JobOpportunity, VisaGuide } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Reference data changes rarely, so every page renders statically and
 * revalidates on a timer. Pages import these helpers instead of touching
 * Supabase directly, which keeps the fallback path in one place.
 */
export const REVALIDATE_SECONDS = 60 * 60 * 12;

type CountryRow = {
  code: string;
  name_en: string;
  name_ar: string;
  flag: string;
  currency: string;
  region_en: string;
  region_ar: string;
  is_destination: boolean;
  cost_of_living: {
    city_en: string;
    city_ar: string;
    rent_center: number;
    rent_outside: number;
    groceries: number;
    utilities: number;
    transport: number;
    internet: number;
    meal_out: number;
    health_insurance: number;
    avg_net_salary: number;
  } | null;
};

function mapCountry(row: CountryRow): Country | null {
  if (!row.cost_of_living) return null;
  const c = row.cost_of_living;
  return {
    code: row.code,
    name: { en: row.name_en, ar: row.name_ar },
    flag: row.flag,
    currency: row.currency,
    region: { en: row.region_en, ar: row.region_ar },
    isDestination: row.is_destination,
    cost: {
      city: { en: c.city_en, ar: c.city_ar },
      rentCenter: c.rent_center,
      rentOutside: c.rent_outside,
      groceries: c.groceries,
      utilities: c.utilities,
      transport: c.transport,
      internet: c.internet,
      mealOut: c.meal_out,
      healthInsurance: c.health_insurance,
      avgNetSalary: c.avg_net_salary,
    },
  };
}

export async function getCountries(): Promise<Country[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return COUNTRIES;

  const { data, error } = await supabase
    .from("countries")
    .select(
      "code,name_en,name_ar,flag,currency,region_en,region_ar,is_destination,cost_of_living(*)",
    )
    .order("name_en");

  if (error || !data?.length) return COUNTRIES;

  const mapped = (data as unknown as CountryRow[])
    .map(mapCountry)
    .filter((c): c is Country => c !== null);

  return mapped.length ? mapped : COUNTRIES;
}

export async function getJobs(): Promise<JobOpportunity[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return JOB_OPPORTUNITIES;

  const { data, error } = await supabase.from("job_opportunities").select("*");
  if (error || !data?.length) return JOB_OPPORTUNITIES;

  return data.map((row) => ({
    id: row.id,
    countryCode: row.country_code,
    fieldSlug: row.field_slug,
    title: { en: row.title_en, ar: row.title_ar },
    minEducation: row.min_education,
    demand: row.demand,
    salaryFrom: row.salary_from,
    salaryTo: row.salary_to,
    salaryCurrency: row.salary_currency,
    visaSponsorship: row.visa_sponsorship,
    licenceRequired: row.licence_required,
    note: { en: row.note_en, ar: row.note_ar },
  }));
}

export async function getGuides(): Promise<VisaGuide[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return VISA_GUIDES;

  const { data, error } = await supabase.from("visa_guides").select("*");
  if (error || !data?.length) return VISA_GUIDES;

  return data.map((row) => ({
    countryCode: row.country_code,
    title: { en: row.title_en, ar: row.title_ar },
    summary: { en: row.summary_en, ar: row.summary_ar },
    intro: { en: row.intro_en, ar: row.intro_ar },
    routes: row.routes,
    requirements: row.requirements,
    updatedAt: row.updated_at,
  }));
}

export async function getGuideByCountry(
  code: string,
): Promise<VisaGuide | undefined> {
  const guides = await getGuides();
  return guides.find((g) => g.countryCode === code.toLowerCase());
}
