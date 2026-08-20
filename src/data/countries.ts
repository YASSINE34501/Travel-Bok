import type { Country } from "@/lib/types";

/**
 * Indicative monthly costs in USD for each capital or largest city.
 * Treat them as shortlisting averages, not budgets. These rows mirror the
 * Supabase `cost_of_living` table and are used as a fallback when the
 * database is not configured.
 */
export const COUNTRIES: Country[] = [
  {
    code: "de",
    name: { en: "Germany", ar: "ألمانيا" },
    flag: "🇩🇪",
    currency: "EUR",
    region: { en: "Western Europe", ar: "أوروبا الغربية" },
    isDestination: true,
    cost: {
      city: { en: "Berlin", ar: "برلين" },
      rentCenter: 1300, rentOutside: 950, groceries: 320, utilities: 280,
      transport: 60, internet: 40, mealOut: 15, avgNetSalary: 3000,
    },
  },
  {
    code: "ca",
    name: { en: "Canada", ar: "كندا" },
    flag: "🇨🇦",
    currency: "CAD",
    region: { en: "North America", ar: "أمريكا الشمالية" },
    isDestination: true,
    cost: {
      city: { en: "Toronto", ar: "تورونتو" },
      rentCenter: 1750, rentOutside: 1450, groceries: 350, utilities: 130,
      transport: 115, internet: 55, mealOut: 20, avgNetSalary: 3100,
    },
  },
  {
    code: "ae",
    name: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    flag: "🇦🇪",
    currency: "AED",
    region: { en: "Gulf", ar: "الخليج" },
    isDestination: true,
    cost: {
      city: { en: "Dubai", ar: "دبي" },
      rentCenter: 1600, rentOutside: 1050, groceries: 300, utilities: 200,
      transport: 80, internet: 90, mealOut: 10, avgNetSalary: 3400,
    },
  },
  {
    code: "nl",
    name: { en: "Netherlands", ar: "هولندا" },
    flag: "🇳🇱",
    currency: "EUR",
    region: { en: "Western Europe", ar: "أوروبا الغربية" },
    isDestination: true,
    cost: {
      city: { en: "Amsterdam", ar: "أمستردام" },
      rentCenter: 1900, rentOutside: 1550, groceries: 320, utilities: 230,
      transport: 100, internet: 45, mealOut: 20, avgNetSalary: 3200,
    },
  },
  {
    code: "fr",
    name: { en: "France", ar: "فرنسا" },
    flag: "🇫🇷",
    currency: "EUR",
    region: { en: "Western Europe", ar: "أوروبا الغربية" },
    isDestination: true,
    cost: {
      city: { en: "Paris", ar: "باريس" },
      rentCenter: 1400, rentOutside: 1050, groceries: 330, utilities: 200,
      transport: 60, internet: 32, mealOut: 16, avgNetSalary: 2800,
    },
  },
  {
    code: "au",
    name: { en: "Australia", ar: "أستراليا" },
    flag: "🇦🇺",
    currency: "AUD",
    region: { en: "Oceania", ar: "أوقيانوسيا" },
    isDestination: true,
    cost: {
      city: { en: "Sydney", ar: "سيدني" },
      rentCenter: 2200, rentOutside: 1600, groceries: 400, utilities: 180,
      transport: 130, internet: 55, mealOut: 18, avgNetSalary: 3900,
    },
  },
  {
    code: "pt",
    name: { en: "Portugal", ar: "البرتغال" },
    flag: "🇵🇹",
    currency: "EUR",
    region: { en: "Southern Europe", ar: "جنوب أوروبا" },
    isDestination: true,
    cost: {
      city: { en: "Lisbon", ar: "لشبونة" },
      rentCenter: 1250, rentOutside: 900, groceries: 250, utilities: 120,
      transport: 45, internet: 35, mealOut: 11, avgNetSalary: 1250,
    },
  },
  {
    code: "es",
    name: { en: "Spain", ar: "إسبانيا" },
    flag: "🇪🇸",
    currency: "EUR",
    region: { en: "Southern Europe", ar: "جنوب أوروبا" },
    isDestination: true,
    cost: {
      city: { en: "Madrid", ar: "مدريد" },
      rentCenter: 1200, rentOutside: 900, groceries: 260, utilities: 140,
      transport: 60, internet: 32, mealOut: 13, avgNetSalary: 1800,
    },
  },
  {
    code: "se",
    name: { en: "Sweden", ar: "السويد" },
    flag: "🇸🇪",
    currency: "SEK",
    region: { en: "Nordics", ar: "الدول الإسكندنافية" },
    isDestination: true,
    cost: {
      city: { en: "Stockholm", ar: "ستوكهولم" },
      rentCenter: 1500, rentOutside: 1150, groceries: 300, utilities: 110,
      transport: 90, internet: 35, mealOut: 13, avgNetSalary: 2900,
    },
  },
  {
    code: "gb",
    name: { en: "United Kingdom", ar: "المملكة المتحدة" },
    flag: "🇬🇧",
    currency: "GBP",
    region: { en: "Western Europe", ar: "أوروبا الغربية" },
    isDestination: true,
    cost: {
      city: { en: "London", ar: "لندن" },
      rentCenter: 2400, rentOutside: 1750, groceries: 330, utilities: 260,
      transport: 220, internet: 35, mealOut: 18, avgNetSalary: 3200,
    },
  },
  {
    code: "us",
    name: { en: "United States", ar: "الولايات المتحدة" },
    flag: "🇺🇸",
    currency: "USD",
    region: { en: "North America", ar: "أمريكا الشمالية" },
    isDestination: true,
    cost: {
      city: { en: "New York", ar: "نيويورك" },
      rentCenter: 3800, rentOutside: 2600, groceries: 450, utilities: 180,
      transport: 130, internet: 65, mealOut: 25, avgNetSalary: 4700,
    },
  },
  {
    code: "pl",
    name: { en: "Poland", ar: "بولندا" },
    flag: "🇵🇱",
    currency: "PLN",
    region: { en: "Central Europe", ar: "وسط أوروبا" },
    isDestination: true,
    cost: {
      city: { en: "Warsaw", ar: "وارسو" },
      rentCenter: 900, rentOutside: 700, groceries: 230, utilities: 200,
      transport: 30, internet: 15, mealOut: 8, avgNetSalary: 1500,
    },
  },
  {
    code: "sa",
    name: { en: "Saudi Arabia", ar: "السعودية" },
    flag: "🇸🇦",
    currency: "SAR",
    region: { en: "Gulf", ar: "الخليج" },
    isDestination: true,
    cost: {
      city: { en: "Riyadh", ar: "الرياض" },
      rentCenter: 900, rentOutside: 600, groceries: 250, utilities: 130,
      transport: 40, internet: 60, mealOut: 7, avgNetSalary: 1900,
    },
  },
  {
    code: "tr",
    name: { en: "Türkiye", ar: "تركيا" },
    flag: "🇹🇷",
    currency: "TRY",
    region: { en: "West Asia", ar: "غرب آسيا" },
    isDestination: false,
    cost: {
      city: { en: "Istanbul", ar: "إسطنبول" },
      rentCenter: 700, rentOutside: 450, groceries: 250, utilities: 90,
      transport: 25, internet: 15, mealOut: 7, avgNetSalary: 700,
    },
  },
  {
    code: "ma",
    name: { en: "Morocco", ar: "المغرب" },
    flag: "🇲🇦",
    currency: "MAD",
    region: { en: "North Africa", ar: "شمال أفريقيا" },
    isDestination: false,
    cost: {
      city: { en: "Casablanca", ar: "الدار البيضاء" },
      rentCenter: 380, rentOutside: 230, groceries: 180, utilities: 60,
      transport: 25, internet: 25, mealOut: 4, avgNetSalary: 400,
    },
  },
  {
    code: "dz",
    name: { en: "Algeria", ar: "الجزائر" },
    flag: "🇩🇿",
    currency: "DZD",
    region: { en: "North Africa", ar: "شمال أفريقيا" },
    isDestination: false,
    cost: {
      city: { en: "Algiers", ar: "الجزائر العاصمة" },
      rentCenter: 250, rentOutside: 160, groceries: 150, utilities: 35,
      transport: 15, internet: 25, mealOut: 3, avgNetSalary: 300,
    },
  },
  {
    code: "tn",
    name: { en: "Tunisia", ar: "تونس" },
    flag: "🇹🇳",
    currency: "TND",
    region: { en: "North Africa", ar: "شمال أفريقيا" },
    isDestination: false,
    cost: {
      city: { en: "Tunis", ar: "تونس العاصمة" },
      rentCenter: 260, rentOutside: 170, groceries: 150, utilities: 45,
      transport: 15, internet: 20, mealOut: 3, avgNetSalary: 330,
    },
  },
  {
    code: "eg",
    name: { en: "Egypt", ar: "مصر" },
    flag: "🇪🇬",
    currency: "EGP",
    region: { en: "North Africa", ar: "شمال أفريقيا" },
    isDestination: false,
    cost: {
      city: { en: "Cairo", ar: "القاهرة" },
      rentCenter: 250, rentOutside: 150, groceries: 130, utilities: 40,
      transport: 20, internet: 15, mealOut: 3, avgNetSalary: 250,
    },
  },
  {
    code: "jo",
    name: { en: "Jordan", ar: "الأردن" },
    flag: "🇯🇴",
    currency: "JOD",
    region: { en: "Levant", ar: "بلاد الشام" },
    isDestination: false,
    cost: {
      city: { en: "Amman", ar: "عمّان" },
      rentCenter: 550, rentOutside: 380, groceries: 230, utilities: 90,
      transport: 40, internet: 30, mealOut: 5, avgNetSalary: 700,
    },
  },
];

export const DESTINATIONS = COUNTRIES.filter((c) => c.isDestination);

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toLowerCase());
}

/** Core monthly outgoings used for the headline comparison. */
export function coreMonthlyCost(country: Country): number {
  const c = country.cost;
  return c.rentCenter + c.groceries + c.utilities + c.transport + c.internet;
}
