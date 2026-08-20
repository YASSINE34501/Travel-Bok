/**
 * Pushes the bundled dataset in src/data into Supabase.
 *
 *   node scripts/seed.mjs
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 * The service role bypasses RLS, which is why this is a local script and never
 * an API route. Rerunning it is safe: every write is an upsert.
 *
 * Node strips the TypeScript annotations from the imported data modules, so
 * there is no build step here.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

import { COUNTRIES } from "../src/data/countries.ts";
import { EDUCATION_LEVELS, JOB_FIELDS, JOB_OPPORTUNITIES } from "../src/data/jobs.ts";
import { VISA_GUIDES } from "../src/data/guides.ts";

// Minimal .env.local reader — avoids pulling in dotenv for one script.
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

async function upsert(table, rows, onConflict) {
  const { error } = await db.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`✓ ${table} (${rows.length})`);
}

await upsert(
  "countries",
  COUNTRIES.map((c) => ({
    code: c.code,
    name_en: c.name.en,
    name_ar: c.name.ar,
    flag: c.flag,
    currency: c.currency,
    region_en: c.region.en,
    region_ar: c.region.ar,
    is_destination: c.isDestination,
  })),
  "code",
);

await upsert(
  "cost_of_living",
  COUNTRIES.map((c) => ({
    country_code: c.code,
    city_en: c.cost.city.en,
    city_ar: c.cost.city.ar,
    rent_center: c.cost.rentCenter,
    rent_outside: c.cost.rentOutside,
    groceries: c.cost.groceries,
    utilities: c.cost.utilities,
    transport: c.cost.transport,
    internet: c.cost.internet,
    meal_out: c.cost.mealOut,
    health_insurance: c.cost.healthInsurance,
    avg_net_salary: c.cost.avgNetSalary,
  })),
  "country_code",
);

await upsert(
  "education_levels",
  EDUCATION_LEVELS.map((l) => ({
    slug: l.slug,
    name_en: l.name.en,
    name_ar: l.name.ar,
    rank: l.rank,
  })),
  "slug",
);

await upsert(
  "job_fields",
  JOB_FIELDS.map((f) => ({
    slug: f.slug,
    name_en: f.name.en,
    name_ar: f.name.ar,
    icon: f.icon,
  })),
  "slug",
);

await upsert(
  "job_opportunities",
  JOB_OPPORTUNITIES.map((j) => ({
    country_code: j.countryCode,
    field_slug: j.fieldSlug,
    min_education: j.minEducation,
    title_en: j.title.en,
    title_ar: j.title.ar,
    demand: j.demand,
    salary_from: j.salaryFrom,
    salary_to: j.salaryTo,
    salary_currency: j.salaryCurrency,
    visa_sponsorship: j.visaSponsorship,
    licence_required: j.licenceRequired,
    note_en: j.note.en,
    note_ar: j.note.ar,
  })),
  "id",
);

await upsert(
  "visa_guides",
  VISA_GUIDES.map((g) => ({
    country_code: g.countryCode,
    title_en: g.title.en,
    title_ar: g.title.ar,
    summary_en: g.summary.en,
    summary_ar: g.summary.ar,
    intro_en: g.intro.en,
    intro_ar: g.intro.ar,
    routes: g.routes,
    requirements: g.requirements,
    updated_at: g.updatedAt,
  })),
  "country_code",
);

console.log("\nSeed complete.");
