import type { Localized } from "@/lib/types";

/**
 * Editorial content for the static policy pages. Kept as structured data
 * rather than message-file strings so the pages share one renderer, and so
 * every section gets a stable anchor id for the table of contents.
 */
export type LegalSection = {
  id: string;
  heading: Localized;
  paragraphs?: Localized[];
  bullets?: Localized[];
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "about" | "contact";
  title: Localized;
  description: Localized;
  intro: Localized;
  updatedAt: string;
  sections: LegalSection[];
};

const CONTACT_EMAIL = "hello@travlbok.com";
const PRIVACY_EMAIL = "privacy@travlbok.com";

export const PRIVACY: LegalDocument = {
  slug: "privacy",
  updatedAt: "2026-08-20",
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  description: {
    en: "How TRAVLBOK collects, uses and protects your data, including cookies and third-party advertising through Google AdSense.",
    ar: "كيف تجمع ترافل بوك بياناتك وتستخدمها وتحميها، بما في ذلك ملفات تعريف الارتباط والإعلانات من أطراف ثالثة عبر جوجل أدسنس.",
  },
  intro: {
    en: "This policy explains what TRAVLBOK collects when you use the site, why we collect it, and the choices you have. We keep it in plain language because a policy you cannot read protects nobody.",
    ar: "توضّح هذه السياسة ما تجمعه ترافل بوك عند استخدامك للموقع، ولماذا نجمعه، وما الخيارات المتاحة أمامك. نكتبها بلغة واضحة لأن السياسة التي لا يمكن قراءتها لا تحمي أحدًا.",
  },
  sections: [
    {
      id: "what-we-collect",
      heading: { en: "What we collect", ar: "ما الذي نجمعه" },
      paragraphs: [
        {
          en: "You can use the cost explorer, the job matcher and every visa guide without an account and without giving us any personal information.",
          ar: "يمكنك استخدام مستكشف التكاليف ومطابقة الوظائف وكل أدلة التأشيرات دون حساب ودون تقديم أي معلومات شخصية.",
        },
      ],
      bullets: [
        {
          en: "Account data — if you register, we store your email address and, optionally, your display name, home country, education level and field. This is held in our Supabase database.",
          ar: "بيانات الحساب — إذا سجّلت، نحتفظ ببريدك الإلكتروني، واختياريًا باسم العرض وبلد الإقامة والمستوى التعليمي والمجال. تُحفظ هذه البيانات في قاعدة بيانات Supabase الخاصة بنا.",
        },
        {
          en: "Saved comparisons — the country pairs and income figures you choose to save to your account.",
          ar: "المقارنات المحفوظة — أزواج الدول وأرقام الدخل التي تختار حفظها في حسابك.",
        },
        {
          en: "Technical data — your browser type, approximate region, and the pages you visit, collected through standard server logs and our analytics.",
          ar: "بيانات تقنية — نوع المتصفح والمنطقة التقريبية والصفحات التي تزورها، وتُجمع عبر سجلات الخادم القياسية وأدوات التحليلات لدينا.",
        },
        {
          en: "Language preference — stored in a cookie so the site opens in Arabic or English next time.",
          ar: "تفضيل اللغة — يُحفظ في ملف تعريف ارتباط ليفتح الموقع بالعربية أو الإنجليزية في زيارتك القادمة.",
        },
      ],
    },
    {
      id: "advertising",
      heading: {
        en: "Advertising and Google AdSense",
        ar: "الإعلانات وجوجل أدسنس",
      },
      paragraphs: [
        {
          en: "TRAVLBOK is free to use and is funded by advertising. We use Google AdSense, a third-party advertising service provided by Google LLC, to display ads on this site.",
          ar: "ترافل بوك مجاني الاستخدام ويُموَّل عبر الإعلانات. نستخدم جوجل أدسنس، وهي خدمة إعلانية من طرف ثالث تقدّمها شركة Google LLC، لعرض الإعلانات على هذا الموقع.",
        },
        {
          en: "Google and its partners act as third-party vendors and use cookies to serve ads based on your prior visits to this and other websites.",
          ar: "تعمل جوجل وشركاؤها كموردين من أطراف ثالثة ويستخدمون ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة لهذا الموقع ولمواقع أخرى.",
        },
      ],
      bullets: [
        {
          en: "Google's use of advertising cookies — including the DoubleClick DART cookie — enables it and its partners to serve ads to you based on your visit to this site and other sites on the internet.",
          ar: "يتيح استخدام جوجل لملفات تعريف ارتباط الإعلانات — بما فيها ملف DoubleClick DART — لها ولشركائها عرض إعلانات لك بناءً على زيارتك لهذا الموقع ولمواقع أخرى على الإنترنت.",
        },
        {
          en: "You may opt out of personalised advertising by visiting Google's Ads Settings at google.com/settings/ads.",
          ar: "يمكنك إلغاء الاشتراك في الإعلانات المخصّصة عبر إعدادات إعلانات جوجل على google.com/settings/ads.",
        },
        {
          en: "You can opt out of third-party vendor cookies more broadly at aboutads.info/choices or youronlinechoices.eu.",
          ar: "يمكنك إلغاء الاشتراك في ملفات تعريف ارتباط الموردين الخارجيين بشكل أوسع عبر aboutads.info/choices أو youronlinechoices.eu.",
        },
        {
          en: "Third-party vendors serving ads on this site may place cookies we do not control. We do not have access to, and cannot read, cookies set by advertisers.",
          ar: "قد يضع الموردون الخارجيون الذين يعرضون الإعلانات على هذا الموقع ملفات تعريف ارتباط لا نتحكم بها. ولا يمكننا الوصول إلى ملفات تعريف الارتباط التي يضبطها المعلنون ولا قراءتها.",
        },
        {
          en: "We never share your account email address, saved comparisons or profile details with advertisers.",
          ar: "لا نشارك أبدًا بريدك الإلكتروني أو مقارناتك المحفوظة أو تفاصيل ملفك الشخصي مع المعلنين.",
        },
      ],
    },
    {
      id: "consent",
      heading: {
        en: "Consent for users in the EEA, UK and Switzerland",
        ar: "الموافقة للمستخدمين في المنطقة الاقتصادية الأوروبية وبريطانيا وسويسرا",
      },
      paragraphs: [
        {
          en: "If you are in the European Economic Area, the United Kingdom or Switzerland, we ask for your consent before non-essential cookies — including advertising cookies — are set, in line with Google's EU User Consent Policy and the GDPR.",
          ar: "إذا كنت في المنطقة الاقتصادية الأوروبية أو المملكة المتحدة أو سويسرا، فإننا نطلب موافقتك قبل ضبط ملفات تعريف الارتباط غير الضرورية — ومنها ملفات الإعلانات — وفقًا لسياسة موافقة مستخدمي الاتحاد الأوروبي من جوجل واللائحة العامة لحماية البيانات.",
        },
        {
          en: "You can withdraw or change your consent at any time through the cookie settings link in the site footer. Declining advertising cookies does not restrict access to any part of the site — you will simply see non-personalised ads.",
          ar: "يمكنك سحب موافقتك أو تعديلها في أي وقت عبر رابط إعدادات ملفات تعريف الارتباط في تذييل الموقع. ورفض ملفات ارتباط الإعلانات لا يقيّد وصولك إلى أي جزء من الموقع — ستشاهد فقط إعلانات غير مخصّصة.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: { en: "Your rights over your data", ar: "حقوقك في بياناتك" },
      bullets: [
        {
          en: "Access — request a copy of the personal data we hold about you.",
          ar: "الاطّلاع — طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك.",
        },
        {
          en: "Correction — fix anything inaccurate from your account settings or by writing to us.",
          ar: "التصحيح — تصحيح أي معلومة غير دقيقة من إعدادات حسابك أو بمراسلتنا.",
        },
        {
          en: "Deletion — delete your account and everything attached to it. We act on deletion requests within 30 days.",
          ar: "الحذف — حذف حسابك وكل ما يرتبط به. ونستجيب لطلبات الحذف خلال ٣٠ يومًا.",
        },
        {
          en: "Objection — tell us to stop processing your data for a given purpose, including marketing.",
          ar: "الاعتراض — مطالبتنا بالتوقف عن معالجة بياناتك لغرض معيّن، بما في ذلك التسويق.",
        },
      ],
      paragraphs: [
        {
          en: `To exercise any of these rights, email ${PRIVACY_EMAIL}. If you are in California, the CCPA gives you equivalent rights, and we do not sell personal information as that term is defined in the Act.`,
          ar: `لممارسة أي من هذه الحقوق راسلنا على ${PRIVACY_EMAIL}. وإذا كنت في كاليفورنيا، يمنحك قانون CCPA حقوقًا مماثلة، ونحن لا نبيع المعلومات الشخصية بالمعنى المحدّد في ذلك القانون.`,
        },
      ],
    },
    {
      id: "security-retention",
      heading: { en: "Security and retention", ar: "الأمان والاحتفاظ بالبيانات" },
      paragraphs: [
        {
          en: "Account data is stored with Supabase and protected by row-level security, meaning your records are readable only by your own authenticated session. Passwords are hashed by Supabase Auth and are never visible to us.",
          ar: "تُحفظ بيانات الحساب لدى Supabase وتُحمى بأمان على مستوى الصف، بما يعني أن سجلاتك لا تُقرأ إلا من جلستك المصادَق عليها. وتُشفَّر كلمات المرور بواسطة Supabase Auth ولا تكون مرئية لنا إطلاقًا.",
        },
        {
          en: "We keep account data for as long as your account is open, and delete it within 30 days of a deletion request. Server logs are retained for 90 days.",
          ar: "نحتفظ ببيانات الحساب طالما بقي حسابك مفتوحًا، ونحذفها خلال ٣٠ يومًا من طلب الحذف. وتُحفظ سجلات الخادم لمدة ٩٠ يومًا.",
        },
      ],
    },
    {
      id: "children",
      heading: { en: "Children", ar: "الأطفال" },
      paragraphs: [
        {
          en: "TRAVLBOK is not directed at children under 16, and we do not knowingly collect data from them. If you believe a child has given us personal data, contact us and we will delete it.",
          ar: "ترافل بوك ليست موجّهة للأطفال دون سن ١٦ عامًا، ولا نجمع بياناتهم عن علم. وإذا كنت تعتقد أن طفلًا زوّدنا ببيانات شخصية، فتواصل معنا وسنحذفها.",
        },
      ],
    },
    {
      id: "changes",
      heading: { en: "Changes to this policy", ar: "تعديلات هذه السياسة" },
      paragraphs: [
        {
          en: `We update this policy when our practices change. The date at the top of this page always reflects the current version. Questions go to ${PRIVACY_EMAIL}.`,
          ar: `نحدّث هذه السياسة عندما تتغيّر ممارساتنا. ويعكس التاريخ أعلى هذه الصفحة النسخة الحالية دائمًا. وتُرسل الاستفسارات إلى ${PRIVACY_EMAIL}.`,
        },
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  slug: "terms",
  updatedAt: "2026-08-20",
  title: { en: "Terms of Use", ar: "شروط الاستخدام" },
  description: {
    en: "The terms that govern your use of TRAVLBOK, including the limits of the information we publish.",
    ar: "الشروط التي تحكم استخدامك لترافل بوك، بما في ذلك حدود المعلومات التي ننشرها.",
  },
  intro: {
    en: "By using TRAVLBOK you accept these terms. The most important one is the second: this site helps you shortlist a destination, but it does not give you legal, immigration or financial advice.",
    ar: "باستخدامك ترافل بوك فإنك تقبل هذه الشروط. وأهمها الشرط الثاني: هذا الموقع يساعدك على ترشيح وجهة، لكنه لا يقدّم استشارة قانونية أو استشارة هجرة أو استشارة مالية.",
  },
  sections: [
    {
      id: "using-the-site",
      heading: { en: "Using the site", ar: "استخدام الموقع" },
      paragraphs: [
        {
          en: "You may use TRAVLBOK for your own personal, non-commercial planning. You may not scrape it at scale, resell our data, or republish substantial portions of our guides without written permission.",
          ar: "يمكنك استخدام ترافل بوك لتخطيطك الشخصي غير التجاري. ولا يجوز لك استخراج بياناته آليًا على نطاق واسع أو إعادة بيعها أو إعادة نشر أجزاء كبيرة من أدلتنا دون إذن كتابي.",
        },
      ],
    },
    {
      id: "not-advice",
      heading: {
        en: "This is information, not advice",
        ar: "هذه معلومات وليست استشارة",
      },
      paragraphs: [
        {
          en: "We are not immigration lawyers, licensed advisers, or financial planners, and nothing on this site creates an adviser-client relationship.",
          ar: "نحن لسنا محامي هجرة ولا مستشارين مرخّصين ولا مخططين ماليين، ولا ينشئ أي محتوى في هذا الموقع علاقة مستشار بعميل.",
        },
      ],
      bullets: [
        {
          en: "Cost figures are indicative averages for a single city, intended for comparing countries — not for building a personal budget.",
          ar: "أرقام التكاليف متوسطات استرشادية لمدينة واحدة، وتصلح للمقارنة بين الدول لا لبناء ميزانية شخصية.",
        },
        {
          en: "Visa routes, fees and processing times change frequently and without notice. Always confirm with the official immigration authority of the destination country before you apply or pay anything.",
          ar: "تتغيّر مسارات التأشيرات ورسومها ومدد معالجتها باستمرار ودون إشعار. تحقّق دائمًا من الجهة الرسمية للهجرة في بلد الوجهة قبل التقديم أو دفع أي مبلغ.",
        },
        {
          en: "Salary ranges and demand levels describe a market, not an offer, and are no guarantee that you will find work.",
          ar: "نطاقات الرواتب ومستويات الطلب تصف سوقًا لا عرض عمل، وليست ضمانًا لحصولك على وظيفة.",
        },
        {
          en: "We are not responsible for decisions you take, or money you spend, on the basis of information published here.",
          ar: "لسنا مسؤولين عن القرارات التي تتخذها أو الأموال التي تنفقها استنادًا إلى المعلومات المنشورة هنا.",
        },
      ],
    },
    {
      id: "accounts",
      heading: { en: "Accounts", ar: "الحسابات" },
      paragraphs: [
        {
          en: "You are responsible for keeping your password secure and for activity under your account. Tell us immediately if you suspect unauthorised access. We may suspend accounts used for abuse, scraping, or anything unlawful.",
          ar: "أنت مسؤول عن الحفاظ على سرية كلمة مرورك وعن النشاط الذي يجري عبر حسابك. أبلغنا فورًا إذا اشتبهت في وصول غير مصرّح به. ويحق لنا تعليق الحسابات المستخدمة في إساءة الاستخدام أو الاستخراج الآلي أو أي نشاط غير قانوني.",
        },
      ],
    },
    {
      id: "beware-fraud",
      heading: { en: "A warning about migration fraud", ar: "تحذير من الاحتيال في الهجرة" },
      paragraphs: [
        {
          en: "TRAVLBOK never asks you to pay for a visa, a job offer, or sponsorship, and we have no agents acting on our behalf. Anyone who contacts you claiming to represent us and requests payment is committing fraud. Report it to us and to your local authorities.",
          ar: "لا تطلب منك ترافل بوك مطلقًا دفع مقابل للحصول على تأشيرة أو عرض عمل أو كفالة، وليس لدينا وكلاء يتصرفون نيابةً عنا. وكل من يتواصل معك مدّعيًا تمثيلنا ويطلب مالًا فهو محتال. أبلغنا وأبلغ السلطات المحلية عن ذلك.",
        },
      ],
    },
    {
      id: "advertising-terms",
      heading: { en: "Advertising", ar: "الإعلانات" },
      paragraphs: [
        {
          en: "The site carries third-party advertising. Ads are selected automatically by Google AdSense and are not endorsements. We have no relationship with the advertisers and take no responsibility for their products, services or claims. Our editorial content is written independently of who advertises here.",
          ar: "يعرض الموقع إعلانات من أطراف ثالثة. وتُختار الإعلانات تلقائيًا عبر جوجل أدسنس ولا تُعدّ تزكية منّا. ولا تربطنا علاقة بالمعلنين ولا نتحمّل مسؤولية منتجاتهم أو خدماتهم أو ادعاءاتهم. ويُكتب محتوانا التحريري باستقلال تام عمّن يعلن هنا.",
        },
      ],
    },
    {
      id: "liability",
      heading: { en: "Liability", ar: "المسؤولية" },
      paragraphs: [
        {
          en: "The site is provided \"as is\", without warranty of any kind. To the fullest extent permitted by law, TRAVLBOK is not liable for any indirect or consequential loss arising from your use of the site. Nothing here limits liability that cannot be limited by law.",
          ar: "يُقدَّم الموقع «كما هو» دون أي ضمان من أي نوع. وإلى أقصى حد يسمح به القانون، لا تتحمّل ترافل بوك مسؤولية أي خسارة غير مباشرة أو تبعية ناشئة عن استخدامك للموقع. ولا يحدّ أي مما ورد هنا من مسؤولية لا يجوز الحد منها قانونًا.",
        },
      ],
    },
    {
      id: "changes-terms",
      heading: { en: "Changes", ar: "التعديلات" },
      paragraphs: [
        {
          en: `We may update these terms; the date above shows the current version. Continued use after a change means you accept it. Questions go to ${CONTACT_EMAIL}.`,
          ar: `قد نحدّث هذه الشروط، ويوضّح التاريخ أعلاه النسخة الحالية. واستمرارك في الاستخدام بعد التعديل يعني قبولك له. وتُرسل الاستفسارات إلى ${CONTACT_EMAIL}.`,
        },
      ],
    },
  ],
};

export const ABOUT: LegalDocument = {
  slug: "about",
  updatedAt: "2026-08-20",
  title: { en: "About TRAVLBOK", ar: "عن ترافل بوك" },
  description: {
    en: "Why TRAVLBOK exists, how we compile our numbers, and how we keep our guides independent.",
    ar: "لماذا وُجدت ترافل بوك، وكيف نجمع أرقامنا، وكيف نحافظ على استقلال أدلتنا.",
  },
  intro: {
    en: "Most people decide where to migrate on the strength of a cousin's story or a viral video. TRAVLBOK exists to put a number next to the story.",
    ar: "يقرّر معظم الناس وجهة هجرتهم بناءً على قصة قريب أو مقطع منتشر. وُجدت ترافل بوك لتضع رقمًا إلى جانب القصة.",
  },
  sections: [
    {
      id: "why",
      heading: { en: "Why we built it", ar: "لماذا بنينا المنصة" },
      paragraphs: [
        {
          en: "Migration information is scattered across government PDFs, forum threads and agencies with something to sell. What is missing is the boring middle: what a month actually costs, whether your diploma is worth anything there, and which visa fits your situation.",
          ar: "معلومات الهجرة مبعثرة بين ملفات حكومية ومنتديات ووكالات لديها ما تبيعه. وما ينقص هو الجزء الممل والمهم: كم يكلّف الشهر فعلًا، وهل تساوي شهادتك شيئًا هناك، وأي تأشيرة تناسب وضعك.",
        },
        {
          en: "We answer those three questions in two languages, for free, without asking you to book a consultation.",
          ar: "نجيب عن هذه الأسئلة الثلاثة بلغتين، مجانًا، ودون أن نطلب منك حجز استشارة.",
        },
      ],
    },
    {
      id: "how-data",
      heading: { en: "How we compile the numbers", ar: "كيف نجمع الأرقام" },
      paragraphs: [
        {
          en: "Cost figures are averages for each country's capital or largest city, expressed in US dollars so countries stay directly comparable. They are compiled from public cost-of-living datasets and national statistics offices, and reviewed periodically.",
          ar: "أرقام التكاليف متوسطات لعاصمة كل دولة أو أكبر مدنها، ومعروضة بالدولار الأمريكي لتبقى المقارنة مباشرة بين الدول. وتُجمع من قواعد بيانات عامة لتكاليف المعيشة ومن مكاتب الإحصاء الوطنية، وتُراجع دوريًا.",
        },
        {
          en: "Visa information is drawn from official immigration authorities. Salary ranges and demand levels reflect what local job boards and labour-shortage lists show at the time of review.",
          ar: "تُستقى معلومات التأشيرات من الجهات الرسمية للهجرة. وتعكس نطاقات الرواتب ومستويات الطلب ما تعرضه مواقع التوظيف المحلية وقوائم نقص العمالة وقت المراجعة.",
        },
        {
          en: "We say so on every page that carries a figure: these are estimates for shortlisting, not quotes. Every source we rely on is listed on the pages where the numbers appear.",
          ar: "ونقول ذلك في كل صفحة تحمل رقمًا: هذه تقديرات للترشيح الأولي لا عروض أسعار. وكل مصدر نعتمد عليه مذكور في الصفحات التي تظهر فيها الأرقام.",
        },
      ],
    },
    {
      id: "independence",
      heading: { en: "Independence", ar: "الاستقلالية" },
      paragraphs: [
        {
          en: "TRAVLBOK is funded by advertising, which is why you see ad slots on the site. We do not take payment to feature a country, an employer, a university or an immigration agency, and no advertiser sees or approves our guides before publication.",
          ar: "تُموَّل ترافل بوك عبر الإعلانات، ولهذا ترى مساحات إعلانية في الموقع. ولا نتقاضى مقابلًا لإبراز دولة أو صاحب عمل أو جامعة أو وكالة هجرة، ولا يطّلع أي معلن على أدلتنا أو يوافق عليها قبل النشر.",
        },
        {
          en: "We also do not sell leads. If a page ever contains a paid placement, it will be labelled as one.",
          ar: "كما أننا لا نبيع بيانات المهتمين. وإذا احتوت صفحة يومًا على إدراج مدفوع فسيُوسم بذلك بوضوح.",
        },
      ],
    },
    {
      id: "who-for",
      heading: { en: "Who it is for", ar: "لمن هذه المنصة" },
      paragraphs: [
        {
          en: "Anyone weighing a move: graduates comparing where a degree travels well, nurses and tradespeople looking at shortage lists, families checking whether one income stretches, and returnees working out what home now costs. The site is fully bilingual because that audience reads in Arabic as often as in English.",
          ar: "كل من يدرس الانتقال: خريجون يقارنون أين تُقدَّر شهاداتهم، وممرضون وحرفيون يتابعون قوائم نقص العمالة، وعائلات تتحقق مما إذا كان دخل واحد يكفي، وعائدون يحسبون كم صار الوطن يكلّف. والموقع ثنائي اللغة بالكامل لأن هذا الجمهور يقرأ بالعربية بقدر ما يقرأ بالإنجليزية.",
        },
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS = [PRIVACY, TERMS, ABOUT];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);
}

export const CONTACT_DETAILS = {
  general: CONTACT_EMAIL,
  privacy: PRIVACY_EMAIL,
  corrections: "corrections@travlbok.com",
};
