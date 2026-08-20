import type { Localized } from "@/lib/types";

/**
 * Per-page keyword sets, translated rather than transliterated — Arabic
 * searchers type "تكاليف المعيشة في ألمانيا", not a romanised version of it.
 */
export const PAGE_KEYWORDS: Record<string, Localized[]> = {
  home: [
    { en: "cost of living comparison", ar: "مقارنة تكاليف المعيشة" },
    { en: "move abroad", ar: "الهجرة إلى الخارج" },
    { en: "best countries to migrate to", ar: "أفضل دول الهجرة" },
    { en: "work abroad with my degree", ar: "العمل في الخارج بشهادتي" },
    { en: "visa requirements", ar: "متطلبات التأشيرة" },
  ],
  explorer: [
    { en: "cost of living comparison", ar: "مقارنة تكلفة المعيشة" },
    { en: "rent cost abroad", ar: "تكلفة الكراء" },
    { en: "cost of living calculator", ar: "حاسبة تكاليف المعيشة" },
    { en: "compare living costs between countries", ar: "مقارنة تكاليف المعيشة بين الدول" },
    { en: "rent prices abroad", ar: "أسعار الإيجار في الخارج" },
    { en: "average salary by country", ar: "متوسط الرواتب حسب الدولة" },
    { en: "how much money do I need to live abroad", ar: "كم أحتاج للعيش في الخارج" },
  ],
  jobs: [
    { en: "in-demand jobs for expats", ar: "المهن المطلوبة" },
    { en: "jobs abroad for my qualification", ar: "وظائف في الخارج تناسب مؤهلي" },
    { en: "in-demand jobs by country", ar: "الوظائف المطلوبة حسب الدولة" },
    { en: "visa sponsorship jobs", ar: "وظائف بكفالة تأشيرة" },
    { en: "skill shortage occupations", ar: "المهن التي تعاني نقصًا" },
    { en: "degree recognition abroad", ar: "معادلة الشهادات في الخارج" },
  ],
  guides: [
    { en: "visa requirements by country", ar: "متطلبات التأشيرة حسب الدولة" },
    { en: "immigration guide", ar: "دليل الهجرة" },
    { en: "work visa application", ar: "طلب تأشيرة عمل" },
    { en: "skilled worker visa", ar: "تأشيرة العمالة الماهرة" },
    { en: "work permit requirements", ar: "شروط الهجرة" },
    { en: "work visa", ar: "تأشيرة العمل" },
  ],
  about: [
    { en: "about TRAVLBOK", ar: "عن ترافل بوك" },
    { en: "cost of living data sources", ar: "مصادر بيانات تكاليف المعيشة" },
    { en: "migration information", ar: "معلومات الهجرة" },
  ],
  privacy: [
    { en: "privacy policy", ar: "سياسة الخصوصية" },
    { en: "cookie policy", ar: "سياسة ملفات تعريف الارتباط" },
    { en: "data protection", ar: "حماية البيانات" },
  ],
  terms: [
    { en: "terms of use", ar: "شروط الاستخدام" },
    { en: "website terms", ar: "شروط الموقع" },
  ],
  contact: [
    { en: "contact TRAVLBOK", ar: "تواصل مع ترافل بوك" },
    { en: "report incorrect data", ar: "الإبلاغ عن بيانات خاطئة" },
  ],
};

/** Guide pages add the destination name to the shared visa terms. */
export function guideKeywords(countryName: string, locale: "en" | "ar"): string[] {
  const base =
    locale === "ar"
      ? [
          `تأشيرة ${countryName}`,
          `الهجرة إلى ${countryName}`,
          `العمل في ${countryName}`,
          `الإقامة في ${countryName}`,
          `متطلبات فيزا ${countryName}`,
        ]
      : [
          `${countryName} visa`,
          `move to ${countryName}`,
          `work in ${countryName}`,
          `${countryName} residence permit`,
          `${countryName} immigration requirements`,
        ];
  return base;
}

export function keywordsFor(page: string, locale: "en" | "ar"): string[] {
  return (PAGE_KEYWORDS[page] ?? []).map((k) => k[locale]);
}
