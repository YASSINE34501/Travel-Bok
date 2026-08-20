import type { Locale } from "@/i18n/routing";
import type { Country, VisaGuide } from "@/lib/types";
import { t as pick } from "@/lib/format";

/**
 * Title and description builders.
 *
 * Two rules drive everything here:
 *
 *  1. **The title tag is not the H1.** The H1 is editorial and reads like a
 *     headline; the title tag has to win a click from a search result in under
 *     ~60 characters. Before this file, 36 of 60 pages had titles Google would
 *     truncate — the Switzerland guide was 81 characters.
 *  2. **Descriptions must be unique per page.** A shared template across 22
 *     countries produces 22 near-duplicate snippets, which is its own ranking
 *     problem. Guide descriptions are therefore assembled from that country's
 *     own figures, so no two are alike.
 *
 * Both builders are length-aware by construction rather than by hand-counting,
 * and `scripts/seo-audit` re-checks every rendered page.
 */

const BRAND: Record<Locale, string> = { en: "TRAVLBOK", ar: "ترافل بوك" };

/** Google truncates around 600px; 60 characters is the safe proxy. */
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

/** The year buyers search with. Bumped once a year, in one place. */
export const SEO_YEAR = "2026";

/**
 * Picks the longest candidate that still fits inside the 60-character budget
 * *once the layout has appended the brand*.
 *
 * The root layout sets `title.template = "%s | TRAVLBOK"`, so this returns the
 * body only. Appending the brand here as well produced
 * "… | TRAVLBOK | TRAVLBOK" and pushed 48 pages past the truncation point.
 */
export function fitTitle(candidates: string[], locale: Locale): string {
  const budget = TITLE_MAX - ` | ${BRAND[locale]}`.length;

  for (const candidate of candidates) {
    if (candidate.length <= budget) return candidate;
  }
  return candidates[candidates.length - 1].slice(0, budget - 1).trimEnd() + "…";
}

/**
 * Assembles a description in the 150–160 band by appending optional tail
 * clauses until it lands in range, then returns the closest attempt if none
 * do. Keeps meta descriptions inside Google's display window without anyone
 * counting characters by hand.
 */
export function fitDescription(base: string, tails: string[]): string {
  if (base.length >= DESC_MIN && base.length <= DESC_MAX) return base;

  let best = base;
  for (const tail of tails) {
    const candidate = `${base} ${tail}`.replace(/\s+/g, " ").trim();
    if (candidate.length >= DESC_MIN && candidate.length <= DESC_MAX) return candidate;

    const distance = (s: string) =>
      s.length < DESC_MIN ? DESC_MIN - s.length : s.length - DESC_MAX;
    if (distance(candidate) < distance(best)) best = candidate;
  }

  return best.length > DESC_MAX
    ? best.slice(0, DESC_MAX - 1).replace(/[\s,.;:]+\S*$/, "") + "…"
    : best;
}

/* ------------------------------- guides ---------------------------------- */

export function guideTitle(country: Country, locale: Locale): string {
  const name = pick(country.name, locale);

  const candidates =
    locale === "ar"
      ? [
          `تأشيرة العمل في ${name} ${SEO_YEAR}: الشروط والتكاليف`,
          `تأشيرة العمل في ${name} ${SEO_YEAR}: الشروط`,
          `تأشيرة العمل في ${name} ${SEO_YEAR}`,
          `الهجرة إلى ${name} ${SEO_YEAR}`,
        ]
      : [
          `${name} Work Visa & Living Costs ${SEO_YEAR}`,
          `${name} Work Visa Requirements ${SEO_YEAR}`,
          `${name} Work Visa Guide ${SEO_YEAR}`,
          `${name} Work Visa ${SEO_YEAR}`,
        ];

  return fitTitle(candidates, locale);
}

/**
 * Unique per country: it interpolates that country's own city, rent and salary,
 * so no two guide descriptions read alike.
 */
export function guideDescription(
  guide: VisaGuide,
  country: Country,
  locale: Locale,
): string {
  const name = pick(country.name, locale);
  const city = pick(country.cost.city, locale);
  const rent = Math.round(country.cost.rentCenter);
  const salary = Math.round(country.cost.avgNetSalary);
  const routes = guide.routes.length;

  const base =
    locale === "ar"
      ? `شروط الهجرة إلى ${name}: ${routes} مسارات لتأشيرة العمل، وتكلفة الكراء في ${city} من ${rent}$ شهريًا، ومتوسط راتب صافٍ ${salary}$.`
      : `${name} work permit requirements: ${routes} visa routes, ${city} rent from $${rent}/month and an average net salary of $${salary}.`;

  // Rungs of decreasing length so at least one lands inside 150–160 whatever
  // the base clause measures.
  const tails =
    locale === "ar"
      ? [
          "دليل محدَّث يشمل المهن المطلوبة ومعادلة الشهادات والمستندات اللازمة.",
          "يشمل المهن المطلوبة ومعادلة الشهادات والمستندات.",
          "يشمل المهن المطلوبة ومعادلة الشهادات.",
          "يشمل المهن المطلوبة والمستندات.",
          "دليل محدَّث بالعربية.",
          "دليل محدَّث.",
        ]
      : [
          "Compare living costs, see in-demand jobs for expats and the documents you need.",
          "Compare living costs and in-demand jobs for expats.",
          "Compare costs and in-demand jobs for expats.",
          "Compare costs and jobs for expats.",
          "Updated cost and visa guide.",
          "Updated guide.",
        ];

  return fitDescription(base, tails);
}

/* ------------------------------ static pages ------------------------------ */

type PageKey =
  | "home"
  | "explorer"
  | "jobs"
  | "guides"
  | "about"
  | "privacy"
  | "terms"
  | "contact";

const TITLES: Record<PageKey, Record<Locale, string[]>> = {
  home: {
    en: [
      `Cost of Living, Jobs & Visas Abroad ${SEO_YEAR}`,
      `Cost of Living & Visa Guides ${SEO_YEAR}`,
    ],
    ar: [
      `تكلفة المعيشة والوظائف والتأشيرات ${SEO_YEAR}`,
      `تكلفة المعيشة وأدلة التأشيرات ${SEO_YEAR}`,
    ],
  },
  explorer: {
    en: [
      `Cost of Living Comparison by Country ${SEO_YEAR}`,
      `Cost of Living Comparison ${SEO_YEAR}`,
    ],
    ar: [
      `مقارنة تكلفة المعيشة بين الدول ${SEO_YEAR}`,
      `مقارنة تكلفة المعيشة ${SEO_YEAR}`,
    ],
  },
  jobs: {
    en: [
      `In-Demand Jobs for Expats by Degree ${SEO_YEAR}`,
      `In-Demand Jobs for Expats ${SEO_YEAR}`,
    ],
    ar: [
      `المهن المطلوبة للمغتربين حسب الشهادة ${SEO_YEAR}`,
      `المهن المطلوبة للمغتربين ${SEO_YEAR}`,
    ],
  },
  guides: {
    en: [
      `Work Permit Requirements by Country ${SEO_YEAR}`,
      `Work Visa Requirements by Country`,
    ],
    ar: [
      `شروط الهجرة وتأشيرة العمل حسب الدولة ${SEO_YEAR}`,
      `شروط تأشيرة العمل حسب الدولة ${SEO_YEAR}`,
    ],
  },
  // These were the shortest titles on the site — "About TRAVLBOK | TRAVLBOK"
  // said the brand twice and nothing else.
  about: {
    en: ["About Us: How We Compile Our Migration Data", "About Our Migration Data"],
    ar: ["من نحن: كيف نجمع بيانات الهجرة والتكاليف", "من نحن ومصادر بياناتنا"],
  },
  privacy: {
    en: ["Privacy Policy, Cookies & Advertising", "Privacy & Cookie Policy"],
    ar: ["سياسة الخصوصية وملفات الارتباط والإعلانات", "سياسة الخصوصية وملفات الارتباط"],
  },
  terms: {
    en: ["Terms of Use & Content Disclaimer", "Terms of Use"],
    ar: ["شروط الاستخدام وإخلاء المسؤولية", "شروط الاستخدام"],
  },
  contact: {
    en: ["Contact Us: Corrections & Data Questions", "Contact Us"],
    ar: ["تواصل معنا: التصحيحات والاستفسارات", "تواصل معنا"],
  },
};

const DESCRIPTIONS: Record<PageKey, Record<Locale, [string, string[]]>> = {
  home: {
    en: [
      "Compare the cost of living between countries, find in-demand jobs that accept your degree, and read work permit requirements for 22 destinations.",
      ["Free, in English and Arabic.", "Free to use."],
    ],
    ar: [
      "قارن تكلفة المعيشة بين الدول، واعثر على المهن المطلوبة التي تقبل شهادتك، واطّلع على شروط الهجرة وتأشيرة العمل في 22 وجهة.",
      ["مجانًا وبالعربية والإنجليزية.", "مجانًا بالكامل."],
    ],
  },
  explorer: {
    en: [
      "Side-by-side cost of living comparison for 28 countries: rent, groceries, utilities, transport, health insurance and average net salary in one currency.",
      ["See what a move really costs.", "Updated regularly."],
    ],
    ar: [
      "مقارنة تكلفة المعيشة بين 28 دولة جنبًا إلى جنب: تكلفة الكراء والطعام والفواتير والمواصلات والتأمين الصحي ومتوسط الراتب الصافي بعملة واحدة.",
      ["اعرف التكلفة الحقيقية للانتقال.", "محدَّث دوريًا."],
    ],
  },
  jobs: {
    en: [
      "Match your education level, field and experience to in-demand jobs for expats abroad — with salary ranges, visa sponsorship and licensing requirements.",
      ["Filter by country and degree.", "Free to use."],
    ],
    ar: [
      "طابق مستواك التعليمي ومجالك وخبرتك مع المهن المطلوبة للمغتربين في الخارج، مع نطاقات الرواتب وكفالة التأشيرة وشروط الترخيص المهني.",
      ["صفِّ حسب الدولة والشهادة.", "مجانًا بالكامل."],
    ],
  },
  guides: {
    en: [
      "Work permit requirements for 22 countries: visa routes, eligibility, processing times, required documents, residency rules and the official authority to check.",
      ["In English and Arabic.", "Updated guides."],
    ],
    ar: [
      "شروط الهجرة وتأشيرة العمل في 22 دولة: مسارات التأشيرة وشروط الأهلية ومدد المعالجة والمستندات المطلوبة وقواعد الإقامة والجهة الرسمية للتحقق.",
      ["بالعربية والإنجليزية.", "أدلة محدَّثة."],
    ],
  },
  about: {
    en: [
      "Why TRAVLBOK exists, how we compile cost of living and visa data, which sources we rely on, and how we keep our guides independent of advertisers.",
      ["Written for migrants and future expats.", "Free and bilingual.", "Free to use.", "Bilingual."],
    ],
    ar: [
      "لماذا وُجدت ترافل بوك، وكيف نجمع بيانات تكلفة المعيشة والتأشيرات، وما المصادر التي نعتمدها، وكيف نحافظ على استقلال أدلتنا عن المعلنين.",
      ["مكتوب للمهاجرين والمغتربين المستقبليين.", "مجاني وثنائي اللغة."],
    ],
  },
  privacy: {
    en: [
      "How TRAVLBOK collects, uses and protects your data: cookies, Google AdSense and third-party advertising, your GDPR and CCPA rights, and how to opt out.",
      ["Updated for 2026.", "Plain language."],
    ],
    ar: [
      "كيف تجمع ترافل بوك بياناتك وتستخدمها وتحميها: ملفات تعريف الارتباط وجوجل أدسنس وإعلانات الأطراف الثالثة، وحقوقك، وكيفية إلغاء الاشتراك.",
      ["محدَّثة لعام 2026.", "بلغة واضحة."],
    ],
  },
  terms: {
    en: [
      "The terms governing your use of TRAVLBOK, including the limits of our cost and visa information, account rules, advertising disclosure and liability limits.",
      ["Read before you rely on our figures.", "Updated for 2026.", "Updated 2026.", "Read first."],
    ],
    ar: [
      "الشروط التي تحكم استخدامك لترافل بوك، بما في ذلك حدود معلومات التكاليف والتأشيرات وقواعد الحسابات والإفصاح الإعلاني وحدود المسؤولية.",
      ["اقرأها قبل الاعتماد على أرقامنا.", "محدَّثة لعام 2026."],
    ],
  },
  contact: {
    en: [
      "Contact TRAVLBOK to report an out-of-date cost, salary or visa fee, ask a privacy question, or reach us about the site. We reply within three working days.",
      ["We read every message.", "Corrections welcome."],
    ],
    ar: [
      "تواصل مع ترافل بوك للإبلاغ عن تكلفة أو راتب أو رسوم تأشيرة غير محدَّثة، أو لطرح سؤال عن الخصوصية وبياناتك. نردّ خلال ثلاثة أيام عمل.",
      ["نقرأ كل رسالة تصلنا.", "التصحيحات مرحَّب بها.", "نقرأ كل رسالة.", "راسلنا."],
    ],
  },
};

export function pageTitle(key: PageKey, locale: Locale): string {
  return fitTitle(TITLES[key][locale], locale);
}

export function pageDescription(key: PageKey, locale: Locale): string {
  const [base, tails] = DESCRIPTIONS[key][locale];
  return fitDescription(base, tails);
}
