import type { Localized } from "@/lib/types";

export type DataSource = {
  name: string;
  url: string;
  note: Localized;
};

/** Where the cost-of-living figures in the explorer come from. */
export const COST_SOURCES: DataSource[] = [
  {
    name: "Numbeo",
    url: "https://www.numbeo.com/cost-of-living/",
    note: {
      en: "Crowd-sourced prices for rent, groceries, utilities and transport by city.",
      ar: "أسعار جماعية المصدر للإيجار والطعام والفواتير والمواصلات حسب المدينة.",
    },
  },
  {
    name: "Eurostat",
    url: "https://ec.europa.eu/eurostat/web/purchasing-power-parities",
    note: {
      en: "Official EU price level indices and purchasing power parities.",
      ar: "مؤشرات مستويات الأسعار الرسمية وتعادلات القوة الشرائية في الاتحاد الأوروبي.",
    },
  },
  {
    name: "OECD Data",
    url: "https://data.oecd.org/earnwage/average-wages.htm",
    note: {
      en: "Average wages and net household income across member countries.",
      ar: "متوسط الأجور وصافي دخل الأسرة في الدول الأعضاء.",
    },
  },
  {
    name: "ILOSTAT",
    url: "https://ilostat.ilo.org/data/",
    note: {
      en: "International Labour Organization wage and employment statistics.",
      ar: "إحصاءات الأجور والتشغيل الصادرة عن منظمة العمل الدولية.",
    },
  },
];

/**
 * The official immigration authority for each destination. Every visa guide
 * links here, because this is the only source that is authoritative on fees
 * and processing times — ours are a snapshot.
 */
export const OFFICIAL_IMMIGRATION_SOURCES: Record<string, DataSource> = {
  de: {
    name: "Make it in Germany (Federal Government)",
    url: "https://www.make-it-in-germany.com/en/visa-residence",
    note: { en: "Official German government portal for skilled workers.", ar: "البوابة الرسمية للحكومة الألمانية للعمالة الماهرة." },
  },
  ca: {
    name: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/services/immigration-citizenship.html",
    note: { en: "Official Canadian immigration department.", ar: "الدائرة الرسمية للهجرة في كندا." },
  },
  ae: {
    name: "The Official Portal of the UAE Government",
    url: "https://u.ae/en/information-and-services/visa-and-emirates-id",
    note: { en: "UAE government visa and Emirates ID services.", ar: "خدمات التأشيرات والهوية الإماراتية من حكومة الإمارات." },
  },
  nl: {
    name: "Immigratie- en Naturalisatiedienst (IND)",
    url: "https://ind.nl/en",
    note: { en: "Dutch immigration service, including the recognised sponsor register.", ar: "دائرة الهجرة الهولندية، وتشمل سجل الكفلاء المعتمدين." },
  },
  fr: {
    name: "France-Visas",
    url: "https://france-visas.gouv.fr/en/",
    note: { en: "Official French visa portal.", ar: "البوابة الرسمية للتأشيرات الفرنسية." },
  },
  au: {
    name: "Department of Home Affairs",
    url: "https://immi.homeaffairs.gov.au/",
    note: { en: "Australian visa finder and points calculator.", ar: "دليل التأشيرات الأسترالي وحاسبة النقاط." },
  },
  pt: {
    name: "AIMA / Portuguese Ministry of Foreign Affairs",
    url: "https://vistos.mne.gov.pt/en/",
    note: { en: "Portuguese national visa and residence permit information.", ar: "معلومات التأشيرات الوطنية وتصاريح الإقامة في البرتغال." },
  },
  es: {
    name: "Ministerio de Asuntos Exteriores",
    url: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx",
    note: { en: "Spanish foreign ministry visa information.", ar: "معلومات التأشيرات من وزارة الخارجية الإسبانية." },
  },
  se: {
    name: "Migrationsverket",
    url: "https://www.migrationsverket.se/English.html",
    note: { en: "Swedish Migration Agency.", ar: "وكالة الهجرة السويدية." },
  },
  gb: {
    name: "GOV.UK — Visas and immigration",
    url: "https://www.gov.uk/browse/visas-immigration",
    note: { en: "Includes the public register of licensed sponsors.", ar: "يتضمن السجل العام للكفلاء المرخّصين." },
  },
  us: {
    name: "U.S. Citizenship and Immigration Services",
    url: "https://www.uscis.gov/working-in-the-united-states",
    note: { en: "Official US work visa and green card information.", ar: "المعلومات الرسمية لتأشيرات العمل والبطاقة الخضراء الأمريكية." },
  },
  pl: {
    name: "Office for Foreigners (UdSC)",
    url: "https://www.gov.pl/web/udsc-en",
    note: { en: "Polish office for foreigners.", ar: "مكتب شؤون الأجانب البولندي." },
  },
  sa: {
    name: "Saudi Ministry of Foreign Affairs",
    url: "https://www.mofa.gov.sa/en/ServicesAndInformation/Pages/VisasServices.aspx",
    note: { en: "Saudi visa services and requirements.", ar: "خدمات ومتطلبات التأشيرات السعودية." },
  },
};

export function getOfficialSource(countryCode: string): DataSource | undefined {
  return OFFICIAL_IMMIGRATION_SOURCES[countryCode.toLowerCase()];
}

/** When the cost-of-living dataset was last reviewed end to end. */
export const COST_DATA_UPDATED = "2026-08-20";

/**
 * When the job dataset was last reviewed end to end.
 *
 * Not a guess and not the build date: it is the date the file that holds these
 * records was last edited, which git confirms is the same sweep that produced
 * COST_DATA_UPDATED. /jobs was the only major page carrying no freshness signal
 * at all, and the honest fix was to surface the real date rather than invent a
 * more flattering one. Move this the day the records actually change.
 */
export const JOBS_DATA_UPDATED = "2026-08-20";
