import type { EducationLevel, JobField, JobOpportunity } from "@/lib/types";

export const EDUCATION_LEVELS: EducationLevel[] = [
  { slug: "secondary", name: { en: "Secondary school", ar: "الثانوية العامة" }, rank: 1 },
  { slug: "vocational", name: { en: "Vocational / technical diploma", ar: "دبلوم مهني أو تقني" }, rank: 2 },
  { slug: "bachelor", name: { en: "Bachelor's degree", ar: "بكالوريوس" }, rank: 3 },
  { slug: "master", name: { en: "Master's degree", ar: "ماجستير" }, rank: 4 },
  { slug: "phd", name: { en: "Doctorate", ar: "دكتوراه" }, rank: 5 },
];

export const JOB_FIELDS: JobField[] = [
  { slug: "healthcare", name: { en: "Healthcare & nursing", ar: "الرعاية الصحية والتمريض" }, icon: "🩺" },
  { slug: "it", name: { en: "IT & software", ar: "تقنية المعلومات والبرمجيات" }, icon: "💻" },
  { slug: "engineering", name: { en: "Engineering", ar: "الهندسة" }, icon: "⚙️" },
  { slug: "trades", name: { en: "Skilled trades & construction", ar: "الحرف والبناء" }, icon: "🔧" },
  { slug: "logistics", name: { en: "Logistics & transport", ar: "النقل واللوجستيات" }, icon: "🚚" },
  { slug: "hospitality", name: { en: "Hospitality & tourism", ar: "الضيافة والسياحة" }, icon: "🍽️" },
  { slug: "education", name: { en: "Education & teaching", ar: "التعليم والتدريس" }, icon: "🎓" },
  { slug: "finance", name: { en: "Finance & accounting", ar: "المالية والمحاسبة" }, icon: "📊" },
  { slug: "care", name: { en: "Elderly & child care", ar: "رعاية المسنين والأطفال" }, icon: "🤝" },
  { slug: "agriculture", name: { en: "Agriculture & food", ar: "الزراعة والأغذية" }, icon: "🌾" },
];

export function educationRank(slug: string): number {
  return EDUCATION_LEVELS.find((l) => l.slug === slug)?.rank ?? 0;
}

/**
 * Illustrative demand snapshot per destination. Salary ranges are annual gross
 * in the destination's own currency, matching how local job boards advertise.
 */
export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  // Germany
  {
    id: "de-nurse", countryCode: "de", fieldSlug: "healthcare",
    title: { en: "Registered nurse", ar: "ممرض/ممرضة مسجل" },
    minEducation: "vocational", demand: "high",
    salaryFrom: 38000, salaryTo: 52000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Recognition of your nursing qualification plus B2 German is the usual bottleneck, not the job market.", ar: "الاعتراف بشهادة التمريض ومستوى B2 في الألمانية هما العائق المعتاد، لا سوق العمل." },
  },
  {
    id: "de-dev", countryCode: "de", fieldSlug: "it",
    title: { en: "Software developer", ar: "مطوّر برمجيات" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 55000, salaryTo: 85000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "EU Blue Card threshold is lower for IT roles, and English-only teams are common in Berlin and Munich.", ar: "حد البطاقة الزرقاء الأوروبية أقل لوظائف تقنية المعلومات، وفرق العمل بالإنجليزية شائعة في برلين وميونخ." },
  },
  {
    id: "de-electrician", countryCode: "de", fieldSlug: "trades",
    title: { en: "Electrician", ar: "كهربائي" },
    minEducation: "vocational", demand: "high",
    salaryFrom: 34000, salaryTo: 48000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Listed as a shortage occupation; an Ausbildung equivalency assessment is required.", ar: "مدرجة ضمن المهن التي تعاني نقصًا؛ ويلزم تقييم معادلة للتدريب المهني." },
  },
  {
    id: "de-mech-eng", countryCode: "de", fieldSlug: "engineering",
    title: { en: "Mechanical engineer", ar: "مهندس ميكانيكي" },
    minEducation: "bachelor", demand: "medium",
    salaryFrom: 52000, salaryTo: 78000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Automotive and machinery hubs in Bavaria and Baden-Württemberg hire year-round.", ar: "مراكز السيارات والآلات في بافاريا وبادن-فورتمبيرغ توظّف على مدار العام." },
  },
  {
    id: "de-elderly", countryCode: "de", fieldSlug: "care",
    title: { en: "Elderly care assistant", ar: "مساعد رعاية مسنين" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 28000, salaryTo: 36000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Employers frequently sponsor language courses before arrival.", ar: "يموّل أصحاب العمل غالبًا دورات اللغة قبل الوصول." },
  },

  // Canada
  {
    id: "ca-nurse", countryCode: "ca", fieldSlug: "healthcare",
    title: { en: "Registered nurse", ar: "ممرض/ممرضة مسجل" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 72000, salaryTo: 98000, salaryCurrency: "CAD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Provincial licensing through NNAS takes months — start it before you apply for jobs.", ar: "الترخيص الإقليمي عبر NNAS يستغرق أشهرًا — ابدأه قبل التقديم على الوظائف." },
  },
  {
    id: "ca-dev", countryCode: "ca", fieldSlug: "it",
    title: { en: "Full-stack developer", ar: "مطوّر ويب متكامل" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 85000, salaryTo: 130000, salaryCurrency: "CAD",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Express Entry awards strong points for this occupation group.", ar: "يمنح نظام الدخول السريع نقاطًا مرتفعة لهذه الفئة المهنية." },
  },
  {
    id: "ca-truck", countryCode: "ca", fieldSlug: "logistics",
    title: { en: "Long-haul truck driver", ar: "سائق شاحنة للمسافات الطويلة" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 60000, salaryTo: 85000, salaryCurrency: "CAD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Requires a provincial commercial licence obtained after arrival.", ar: "يتطلب رخصة قيادة تجارية إقليمية تُستخرج بعد الوصول." },
  },
  {
    id: "ca-welder", countryCode: "ca", fieldSlug: "trades",
    title: { en: "Welder", ar: "لحّام" },
    minEducation: "vocational", demand: "medium",
    salaryFrom: 55000, salaryTo: 80000, salaryCurrency: "CAD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Red Seal certification lets you work across provinces.", ar: "شهادة الختم الأحمر تتيح لك العمل في كل المقاطعات." },
  },
  {
    id: "ca-accountant", countryCode: "ca", fieldSlug: "finance",
    title: { en: "Financial accountant", ar: "محاسب مالي" },
    minEducation: "bachelor", demand: "medium",
    salaryFrom: 65000, salaryTo: 95000, salaryCurrency: "CAD",
    visaSponsorship: false, licenceRequired: true,
    note: { en: "CPA Canada evaluates foreign credentials; most employers expect it in progress.", ar: "تقيّم CPA Canada الشهادات الأجنبية، ويتوقع معظم أصحاب العمل أن تكون قيد الإنجاز." },
  },

  // UAE
  {
    id: "ae-dev", countryCode: "ae", fieldSlug: "it",
    title: { en: "Backend engineer", ar: "مهندس أنظمة خلفية" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 180000, salaryTo: 320000, salaryCurrency: "AED",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Salary is tax-free; check whether housing allowance is included in the offer.", ar: "الراتب معفى من الضرائب؛ تحقّق مما إذا كان بدل السكن مشمولًا في العرض." },
  },
  {
    id: "ae-teacher", countryCode: "ae", fieldSlug: "education",
    title: { en: "School teacher", ar: "معلّم مدرسة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 120000, salaryTo: 200000, salaryCurrency: "AED",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "KHDA approval and an attested degree are mandatory before the visa is issued.", ar: "موافقة هيئة المعرفة وتصديق الشهادة إلزاميان قبل إصدار التأشيرة." },
  },
  {
    id: "ae-civil", countryCode: "ae", fieldSlug: "engineering",
    title: { en: "Civil / site engineer", ar: "مهندس مدني / موقع" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 144000, salaryTo: 240000, salaryCurrency: "AED",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Society of Engineers registration is required to sign off work.", ar: "التسجيل في جمعية المهندسين مطلوب لاعتماد الأعمال." },
  },
  {
    id: "ae-hotel", countryCode: "ae", fieldSlug: "hospitality",
    title: { en: "Hotel front office agent", ar: "موظف استقبال فندقي" },
    minEducation: "secondary", demand: "medium",
    salaryFrom: 48000, salaryTo: 78000, salaryCurrency: "AED",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Accommodation and transport are often provided on top of salary.", ar: "غالبًا ما يُوفَّر السكن والمواصلات إضافةً إلى الراتب." },
  },
  {
    id: "ae-nurse", countryCode: "ae", fieldSlug: "healthcare",
    title: { en: "Staff nurse", ar: "ممرض/ممرضة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 96000, salaryTo: 150000, salaryCurrency: "AED",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "DHA, HAAD or MOH licensing exam depending on the emirate.", ar: "امتحان ترخيص من DHA أو HAAD أو وزارة الصحة حسب الإمارة." },
  },

  // Netherlands
  {
    id: "nl-dev", countryCode: "nl", fieldSlug: "it",
    title: { en: "Data engineer", ar: "مهندس بيانات" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 55000, salaryTo: 82000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Highly Skilled Migrant route is fast when the employer is a recognised sponsor.", ar: "مسار المهاجر عالي المهارة سريع إذا كان صاحب العمل كفيلًا معتمدًا." },
  },
  {
    id: "nl-logistics", countryCode: "nl", fieldSlug: "logistics",
    title: { en: "Warehouse supervisor", ar: "مشرف مستودع" },
    minEducation: "vocational", demand: "medium",
    salaryFrom: 34000, salaryTo: 46000, salaryCurrency: "EUR",
    visaSponsorship: false, licenceRequired: false,
    note: { en: "Rotterdam and Venlo hubs hire continuously, mostly via agencies.", ar: "مراكز روتردام وفينلو توظّف باستمرار، غالبًا عبر وكالات التوظيف." },
  },
  {
    id: "nl-researcher", countryCode: "nl", fieldSlug: "education",
    title: { en: "University researcher", ar: "باحث جامعي" },
    minEducation: "phd", demand: "medium",
    salaryFrom: 48000, salaryTo: 68000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Universities hold sponsor status, so the permit is usually straightforward.", ar: "الجامعات تتمتع بصفة الكفيل المعتمد، لذا يكون التصريح سهلًا عادةً." },
  },

  // France
  {
    id: "fr-dev", countryCode: "fr", fieldSlug: "it",
    title: { en: "Software engineer", ar: "مهندس برمجيات" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 42000, salaryTo: 65000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "The Passeport Talent route suits salaries above the national threshold.", ar: "مسار جواز المواهب مناسب للرواتب التي تتجاوز الحد الوطني." },
  },
  {
    id: "fr-chef", countryCode: "fr", fieldSlug: "hospitality",
    title: { en: "Commis chef", ar: "مساعد طاهٍ" },
    minEducation: "vocational", demand: "high",
    salaryFrom: 22000, salaryTo: 30000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "On the shortage-occupation list, which waives the labour market test.", ar: "مدرجة في قائمة المهن الناقصة، ما يعفي من اختبار سوق العمل." },
  },
  {
    id: "fr-nurse", countryCode: "fr", fieldSlug: "healthcare",
    title: { en: "Nurse", ar: "ممرض/ممرضة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 28000, salaryTo: 40000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Requires French at B2 and an ARS authorisation to practise.", ar: "يتطلب الفرنسية بمستوى B2 وتصريح ممارسة من الوكالة الإقليمية للصحة." },
  },

  // Australia
  {
    id: "au-nurse", countryCode: "au", fieldSlug: "healthcare",
    title: { en: "Registered nurse", ar: "ممرض/ممرضة مسجل" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 75000, salaryTo: 105000, salaryCurrency: "AUD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "AHPRA registration plus IELTS 7 across all bands.", ar: "التسجيل في AHPRA مع درجة 7 في كل أقسام الآيلتس." },
  },
  {
    id: "au-carpenter", countryCode: "au", fieldSlug: "trades",
    title: { en: "Carpenter", ar: "نجّار" },
    minEducation: "vocational", demand: "high",
    salaryFrom: 70000, salaryTo: 95000, salaryCurrency: "AUD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "A skills assessment by TRA is the first step of the points test.", ar: "تقييم المهارات من TRA هو الخطوة الأولى في اختبار النقاط." },
  },
  {
    id: "au-dev", countryCode: "au", fieldSlug: "it",
    title: { en: "Cloud engineer", ar: "مهندس حوسبة سحابية" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 110000, salaryTo: 160000, salaryCurrency: "AUD",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "ACS assesses your degree; unrelated majors need extra work experience.", ar: "تقيّم ACS شهادتك؛ التخصصات غير المرتبطة تحتاج خبرة عملية إضافية." },
  },
  {
    id: "au-farm", countryCode: "au", fieldSlug: "agriculture",
    title: { en: "Farm supervisor", ar: "مشرف مزرعة" },
    minEducation: "secondary", demand: "medium",
    salaryFrom: 60000, salaryTo: 78000, salaryCurrency: "AUD",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Regional roles add points toward permanent residence.", ar: "الوظائف في المناطق الريفية تضيف نقاطًا نحو الإقامة الدائمة." },
  },

  // Portugal
  {
    id: "pt-dev", countryCode: "pt", fieldSlug: "it",
    title: { en: "Frontend developer", ar: "مطوّر واجهات أمامية" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 28000, salaryTo: 48000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Lisbon and Porto tech hubs recruit internationally and pay above local average.", ar: "مراكز التقنية في لشبونة وبورتو توظّف دوليًا وتدفع أعلى من المتوسط المحلي." },
  },
  {
    id: "pt-hotel", countryCode: "pt", fieldSlug: "hospitality",
    title: { en: "Restaurant server", ar: "نادل مطعم" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 12000, salaryTo: 17000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Seasonal peaks in the Algarve; contracts often run March to October.", ar: "ذروة موسمية في الغارف، والعقود غالبًا من مارس إلى أكتوبر." },
  },
  {
    id: "pt-care", countryCode: "pt", fieldSlug: "care",
    title: { en: "Home care worker", ar: "عامل رعاية منزلية" },
    minEducation: "secondary", demand: "medium",
    salaryFrom: 11000, salaryTo: 15000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "An ageing population keeps demand steady outside the big cities.", ar: "شيخوخة السكان تبقي الطلب مستقرًا خارج المدن الكبرى." },
  },

  // Spain
  {
    id: "es-dev", countryCode: "es", fieldSlug: "it",
    title: { en: "Software developer", ar: "مطوّر برمجيات" },
    minEducation: "bachelor", demand: "medium",
    salaryFrom: 30000, salaryTo: 50000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "The startup law created a faster permit for qualified tech hires.", ar: "قانون الشركات الناشئة أنشأ تصريحًا أسرع للكفاءات التقنية." },
  },
  {
    id: "es-agri", countryCode: "es", fieldSlug: "agriculture",
    title: { en: "Seasonal harvest worker", ar: "عامل حصاد موسمي" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 14000, salaryTo: 19000, salaryCurrency: "EUR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Recruited through bilateral agreements with Morocco and other countries.", ar: "يتم التوظيف عبر اتفاقيات ثنائية مع المغرب ودول أخرى." },
  },

  // Sweden
  {
    id: "se-dev", countryCode: "se", fieldSlug: "it",
    title: { en: "Systems developer", ar: "مطوّر أنظمة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 540000, salaryTo: 780000, salaryCurrency: "SEK",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Work permits require a collective-agreement-level salary and insurance.", ar: "تصاريح العمل تشترط راتبًا بمستوى الاتفاقية الجماعية وتأمينًا." },
  },
  {
    id: "se-nurse", countryCode: "se", fieldSlug: "healthcare",
    title: { en: "Nurse", ar: "ممرض/ممرضة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 400000, salaryTo: 540000, salaryCurrency: "SEK",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Socialstyrelsen licence and Swedish at C1 for patient-facing work.", ar: "ترخيص من الهيئة الوطنية للصحة والسويدية بمستوى C1 للعمل مع المرضى." },
  },

  // United Kingdom
  {
    id: "gb-care", countryCode: "gb", fieldSlug: "care",
    title: { en: "Senior care worker", ar: "أخصائي رعاية أول" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 23000, salaryTo: 30000, salaryCurrency: "GBP",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Only licensed sponsors can hire from abroad — verify the licence before paying anyone.", ar: "الكفلاء المرخّصون وحدهم يمكنهم التوظيف من الخارج — تحقّق من الترخيص قبل دفع أي مبلغ." },
  },
  {
    id: "gb-nurse", countryCode: "gb", fieldSlug: "healthcare",
    title: { en: "NHS staff nurse", ar: "ممرض في هيئة الصحة الوطنية" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 29000, salaryTo: 36000, salaryCurrency: "GBP",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "NMC registration, OSCE exam, and the Health and Care Worker visa route.", ar: "التسجيل في NMC واجتياز امتحان OSCE ومسار تأشيرة العاملين في الصحة والرعاية." },
  },
  {
    id: "gb-dev", countryCode: "gb", fieldSlug: "it",
    title: { en: "DevOps engineer", ar: "مهندس ديف أوبس" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 55000, salaryTo: 85000, salaryCurrency: "GBP",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Skilled Worker visa; the employer pays the immigration skills charge.", ar: "تأشيرة العامل الماهر؛ ويتحمّل صاحب العمل رسوم مهارات الهجرة." },
  },

  // United States
  {
    id: "us-dev", countryCode: "us", fieldSlug: "it",
    title: { en: "Software engineer", ar: "مهندس برمجيات" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 110000, salaryTo: 185000, salaryCurrency: "USD",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "H-1B is capped and allocated by lottery each March — plan around the timeline.", ar: "تأشيرة H-1B محدودة العدد وتُوزَّع بقرعة كل مارس — خطّط وفق هذا الجدول." },
  },
  {
    id: "us-nurse", countryCode: "us", fieldSlug: "healthcare",
    title: { en: "Registered nurse", ar: "ممرض/ممرضة مسجل" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 75000, salaryTo: 110000, salaryCurrency: "USD",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "NCLEX-RN plus a state licence; EB-3 green card sponsorship is common.", ar: "امتحان NCLEX-RN مع ترخيص الولاية؛ وكفالة الإقامة عبر EB-3 شائعة." },
  },
  {
    id: "us-prof", countryCode: "us", fieldSlug: "education",
    title: { en: "University lecturer", ar: "محاضر جامعي" },
    minEducation: "phd", demand: "low",
    salaryFrom: 62000, salaryTo: 95000, salaryCurrency: "USD",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Cap-exempt H-1B applies to universities, so hiring is not lottery-bound.", ar: "الجامعات معفاة من سقف H-1B، لذا لا يخضع التوظيف للقرعة." },
  },

  // Poland
  {
    id: "pl-dev", countryCode: "pl", fieldSlug: "it",
    title: { en: "Software developer", ar: "مطوّر برمجيات" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 120000, salaryTo: 220000, salaryCurrency: "PLN",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Large outsourcing sector; costs stay low relative to Western Europe.", ar: "قطاع تعهيد كبير مع تكاليف معيشة أقل من غرب أوروبا." },
  },
  {
    id: "pl-driver", countryCode: "pl", fieldSlug: "logistics",
    title: { en: "HGV driver", ar: "سائق شاحنة ثقيلة" },
    minEducation: "secondary", demand: "high",
    salaryFrom: 72000, salaryTo: 110000, salaryCurrency: "PLN",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "A Polish work permit plus a driver qualification card is required.", ar: "يلزم تصريح عمل بولندي مع بطاقة تأهيل السائق." },
  },

  // Saudi Arabia
  {
    id: "sa-eng", countryCode: "sa", fieldSlug: "engineering",
    title: { en: "Project engineer", ar: "مهندس مشاريع" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 150000, salaryTo: 260000, salaryCurrency: "SAR",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Saudi Council of Engineers membership is required before the work visa.", ar: "عضوية الهيئة السعودية للمهندسين مطلوبة قبل تأشيرة العمل." },
  },
  {
    id: "sa-teacher", countryCode: "sa", fieldSlug: "education",
    title: { en: "English teacher", ar: "معلّم لغة إنجليزية" },
    minEducation: "bachelor", demand: "medium",
    salaryFrom: 96000, salaryTo: 168000, salaryCurrency: "SAR",
    visaSponsorship: true, licenceRequired: false,
    note: { en: "Degree attestation through the Saudi embassy is mandatory.", ar: "تصديق الشهادة عبر السفارة السعودية إلزامي." },
  },
  {
    id: "sa-nurse", countryCode: "sa", fieldSlug: "healthcare",
    title: { en: "Staff nurse", ar: "ممرض/ممرضة" },
    minEducation: "bachelor", demand: "high",
    salaryFrom: 84000, salaryTo: 132000, salaryCurrency: "SAR",
    visaSponsorship: true, licenceRequired: true,
    note: { en: "Saudi Commission for Health Specialties classification is the first step.", ar: "تصنيف الهيئة السعودية للتخصصات الصحية هو الخطوة الأولى." },
  },
];
