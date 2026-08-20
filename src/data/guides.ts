import type { VisaGuide } from "@/lib/types";
import { GUIDE_SECTIONS } from "./guide-sections";
import { EUROPE_GUIDES } from "./guides-europe";
import { EUROPE_GUIDES_2 } from "./guides-europe-2";
import { GULF_GUIDES } from "./guides-gulf";

/**
 * Editorial visa guides. Each one is rendered as a static, indexable page and
 * carries its own Schema.org Article + FAQ markup.
 */
/**
 * The original eight guides. Their standardised sections live in
 * guide-sections.ts and are attached below, so this file stays focused on
 * visa routes and requirements.
 */
const BASE_GUIDES: VisaGuide[] = [
  {
    countryCode: "de",
    updatedAt: "2026-06-01",
    title: { en: "Moving to Germany: visa routes explained", ar: "الهجرة إلى ألمانيا: شرح مسارات التأشيرة" },
    summary: {
      en: "Germany has one of the most open skilled-worker systems in Europe, but it runs on paperwork: qualification recognition first, job second, visa third.",
      ar: "تمتلك ألمانيا أحد أكثر أنظمة العمالة الماهرة انفتاحًا في أوروبا، لكنه نظام يقوم على الأوراق: معادلة الشهادة أولًا، ثم الوظيفة، ثم التأشيرة.",
    },
    intro: {
      en: "The Skilled Immigration Act lets non-EU nationals move for work if their qualification is recognised as equivalent to a German one. That recognition step — not the job market — is what most applicants underestimate. Start it early, because it can run three to six months on its own.",
      ar: "يتيح قانون هجرة الكفاءات لغير الأوروبيين الانتقال للعمل إذا اعتُرف بمؤهلاتهم كمعادلة للمؤهل الألماني. وخطوة المعادلة هذه — لا سوق العمل — هي ما يستهين به أغلب المتقدمين. ابدأها مبكرًا لأنها قد تستغرق من ثلاثة إلى ستة أشهر وحدها.",
    },
    routes: [
      {
        name: { en: "EU Blue Card", ar: "البطاقة الزرقاء الأوروبية" },
        who: { en: "University graduates with a job offer above the salary threshold — lower for shortage occupations such as IT and engineering.", ar: "خريجو الجامعات الحاصلون على عرض عمل يتجاوز حد الراتب — وهو أقل في المهن الناقصة مثل تقنية المعلومات والهندسة." },
        processing: { en: "1–3 months after the appointment", ar: "من شهر إلى ثلاثة أشهر بعد الموعد" },
        cost: { en: "€75 visa fee", ar: "٧٥ يورو رسوم التأشيرة" },
      },
      {
        name: { en: "Skilled worker visa", ar: "تأشيرة العامل الماهر" },
        who: { en: "Holders of a recognised vocational qualification with a matching job offer — the main route for nurses, electricians and technicians.", ar: "حاملو مؤهل مهني معترف به مع عرض عمل مطابق — المسار الرئيسي للممرضين والكهربائيين والفنيين." },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "€75 plus recognition fees of €100–600", ar: "٧٥ يورو إضافة إلى رسوم معادلة من ١٠٠ إلى ٦٠٠ يورو" },
      },
      {
        name: { en: "Opportunity Card (Chancenkarte)", ar: "بطاقة الفرص" },
        who: { en: "Job seekers who score enough points on qualification, experience, language and age to spend up to a year looking for work in Germany.", ar: "الباحثون عن عمل الذين يجمعون نقاطًا كافية في المؤهل والخبرة واللغة والعمر للبقاء حتى سنة بحثًا عن عمل في ألمانيا." },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "€75, plus proof of funds", ar: "٧٥ يورو مع إثبات القدرة المالية" },
      },
    ],
    requirements: [
      { en: "Passport valid for at least the length of the permit", ar: "جواز سفر ساري المفعول طوال مدة التصريح على الأقل" },
      { en: "Recognition certificate for your degree or vocational qualification", ar: "شهادة معادلة لدرجتك العلمية أو مؤهلك المهني" },
      { en: "Signed employment contract or binding job offer", ar: "عقد عمل موقّع أو عرض عمل ملزم" },
      { en: "German language certificate where the profession requires it (usually B1–B2)", ar: "شهادة لغة ألمانية إن كانت المهنة تشترطها (عادة B1–B2)" },
      { en: "Proof of German health insurance from the first day", ar: "إثبات تأمين صحي ألماني من اليوم الأول" },
      { en: "Blocked account or salary proof covering living costs", ar: "حساب مجمّد أو إثبات راتب يغطي تكاليف المعيشة" },
    ],
  },
  {
    countryCode: "ca",
    updatedAt: "2026-06-01",
    title: { en: "Moving to Canada: Express Entry and the provincial routes", ar: "الهجرة إلى كندا: الدخول السريع والمسارات الإقليمية" },
    summary: {
      en: "Canada scores you before it invites you. Your points come from age, education, language tests and experience — and a provincial nomination can outweigh all of them.",
      ar: "كندا تقيّمك بالنقاط قبل أن تدعوك. تأتي نقاطك من العمر والتعليم واختبارات اللغة والخبرة — وترشيح المقاطعة قد يرجح كفتك أكثر منها جميعًا.",
    },
    intro: {
      en: "Most economic migrants enter through Express Entry, a pool where candidates are ranked by a comprehensive score and the highest are invited to apply for permanent residence. Unlike most systems, you can start without a job offer — but your language test results will make or break the score.",
      ar: "يدخل معظم المهاجرين الاقتصاديين عبر نظام الدخول السريع، وهو تجمّع يُرتَّب فيه المرشحون بدرجة شاملة وتُوجَّه الدعوة لأصحاب أعلى الدرجات لطلب الإقامة الدائمة. وخلافًا لمعظم الأنظمة، يمكنك البدء دون عرض عمل — لكن نتائج اختبار اللغة هي ما يصنع الفارق.",
    },
    routes: [
      {
        name: { en: "Express Entry — Federal Skilled Worker", ar: "الدخول السريع — العامل الماهر الفيدرالي" },
        who: { en: "Graduates with at least one year of skilled work experience and strong English or French results.", ar: "الخريجون بخبرة عمل ماهرة لا تقل عن سنة ونتائج قوية في الإنجليزية أو الفرنسية." },
        processing: { en: "About 6 months after the invitation", ar: "نحو ستة أشهر بعد الدعوة" },
        cost: { en: "CAD 1,525 per adult, plus about CAD 300 for tests and reports", ar: "١٥٢٥ دولارًا كنديًا للبالغ، إضافة إلى نحو ٣٠٠ دولار للاختبارات والتقارير" },
      },
      {
        name: { en: "Provincial Nominee Program", ar: "برنامج ترشيح المقاطعات" },
        who: { en: "Applicants whose occupation is in demand in a specific province — a nomination adds 600 points and effectively guarantees an invitation.", ar: "المتقدمون الذين تكون مهنتهم مطلوبة في مقاطعة معينة — الترشيح يضيف ٦٠٠ نقطة ويضمن الدعوة عمليًا." },
        processing: { en: "6–12 months including the provincial stage", ar: "من ٦ إلى ١٢ شهرًا شاملة المرحلة الإقليمية" },
        cost: { en: "CAD 1,525 federal plus CAD 0–1,500 provincial", ar: "١٥٢٥ دولارًا فيدراليًا إضافة إلى ٠–١٥٠٠ دولار إقليميًا" },
      },
      {
        name: { en: "Study-to-work pathway", ar: "مسار الدراسة ثم العمل" },
        who: { en: "Graduates of a designated Canadian institution, who receive an open post-graduation work permit and then apply for residence.", ar: "خريجو مؤسسة كندية معتمدة، ويحصلون على تصريح عمل مفتوح بعد التخرج ثم يتقدمون للإقامة." },
        processing: { en: "Study permit 4–12 weeks; work permit 3–5 months", ar: "تصريح الدراسة ٤–١٢ أسبوعًا، وتصريح العمل ٣–٥ أشهر" },
        cost: { en: "CAD 150 study permit plus tuition", ar: "١٥٠ دولارًا كنديًا لتصريح الدراسة إضافة إلى الرسوم الدراسية" },
      },
    ],
    requirements: [
      { en: "IELTS General or CELPIP results (TEF/TCF for French)", ar: "نتائج آيلتس العام أو CELPIP (أو TEF/TCF للفرنسية)" },
      { en: "Educational Credential Assessment from WES or an equivalent body", ar: "تقييم الشهادات التعليمية من WES أو جهة معادلة" },
      { en: "Proof of settlement funds — roughly CAD 15,000 for a single applicant", ar: "إثبات أموال الاستقرار — نحو ١٥٠٠٠ دولار كندي للمتقدم الفرد" },
      { en: "Police clearance certificates from every country lived in for six months or more", ar: "شهادات خلو سوابق من كل بلد أقمت فيه ستة أشهر فأكثر" },
      { en: "Upfront medical examination by a panel physician", ar: "فحص طبي مسبق لدى طبيب معتمد" },
      { en: "Reference letters proving your work experience and duties", ar: "خطابات مرجعية تثبت خبرتك ومهامك الوظيفية" },
    ],
  },
  {
    countryCode: "ae",
    updatedAt: "2026-06-01",
    title: { en: "Working in the UAE: employer sponsorship and Golden Visas", ar: "العمل في الإمارات: كفالة صاحب العمل والتأشيرة الذهبية" },
    summary: {
      en: "Almost every UAE residence permit is tied to a sponsor — usually your employer. The process is fast, but your status is linked to the job unless you qualify for a long-term visa.",
      ar: "تكاد كل إقامة في الإمارات ترتبط بكفيل — غالبًا صاحب العمل. الإجراءات سريعة، لكن وضعك مرتبط بالوظيفة ما لم تكن مؤهلًا لتأشيرة طويلة الأمد.",
    },
    intro: {
      en: "The employer applies for your entry permit, then converts it to a residence visa after you arrive, complete a medical test and register your Emirates ID. Expect two to six weeks end to end. The Golden Visa breaks that dependency by granting five or ten years of residence without a sponsor.",
      ar: "يتقدّم صاحب العمل بطلب تصريح الدخول، ثم يحوّله إلى إقامة بعد وصولك وإجراء الفحص الطبي وتسجيل الهوية الإماراتية. توقّع من أسبوعين إلى ستة أسابيع كاملة. أما التأشيرة الذهبية فتكسر هذا الارتباط بمنح إقامة لخمس أو عشر سنوات دون كفيل.",
    },
    routes: [
      {
        name: { en: "Standard employment visa", ar: "تأشيرة العمل الاعتيادية" },
        who: { en: "Anyone with an offer from a UAE-registered company, which handles the entire application.", ar: "كل من لديه عرض من شركة مسجّلة في الإمارات، وهي التي تتولى الطلب بالكامل." },
        processing: { en: "2–6 weeks", ar: "من أسبوعين إلى ستة أسابيع" },
        cost: { en: "Paid by the employer; typically AED 3,000–7,000", ar: "يتحمّلها صاحب العمل، وتتراوح عادة بين ٣٠٠٠ و٧٠٠٠ درهم" },
      },
      {
        name: { en: "Golden Visa", ar: "التأشيرة الذهبية" },
        who: { en: "Investors, entrepreneurs, doctors, scientists, specialised talent, and high earners above the monthly salary threshold.", ar: "المستثمرون ورواد الأعمال والأطباء والعلماء وأصحاب المواهب المتخصصة وذوو الرواتب المرتفعة فوق الحد الشهري." },
        processing: { en: "30–60 days", ar: "من ٣٠ إلى ٦٠ يومًا" },
        cost: { en: "AED 2,800–10,000 depending on category", ar: "من ٢٨٠٠ إلى ١٠٠٠٠ درهم حسب الفئة" },
      },
      {
        name: { en: "Freelance / green visa", ar: "تأشيرة العمل الحر / الخضراء" },
        who: { en: "Self-employed professionals who hold a freelance permit from a free zone and can show income and savings.", ar: "المهنيون المستقلون الحاصلون على رخصة عمل حر من منطقة حرة مع إثبات دخل ومدخرات." },
        processing: { en: "3–6 weeks", ar: "من ٣ إلى ٦ أسابيع" },
        cost: { en: "AED 7,500–15,000 including the permit", ar: "من ٧٥٠٠ إلى ١٥٠٠٠ درهم شاملة الرخصة" },
      },
    ],
    requirements: [
      { en: "Passport valid for at least six months", ar: "جواز سفر ساري لستة أشهر على الأقل" },
      { en: "Degree certificate attested by your foreign ministry and the UAE embassy", ar: "شهادة علمية مصدّقة من وزارة خارجية بلدك والسفارة الإماراتية" },
      { en: "Medical fitness test taken inside the UAE", ar: "فحص اللياقة الطبية داخل الإمارات" },
      { en: "Emirates ID biometric registration", ar: "تسجيل البصمة للهوية الإماراتية" },
      { en: "Employment contract registered with the Ministry of Human Resources", ar: "عقد عمل مسجّل لدى وزارة الموارد البشرية" },
      { en: "Professional licence for regulated roles in health, engineering or teaching", ar: "ترخيص مهني للوظائف المنظّمة في الصحة أو الهندسة أو التعليم" },
    ],
  },
  {
    countryCode: "nl",
    updatedAt: "2026-06-01",
    title: { en: "Moving to the Netherlands: the Highly Skilled Migrant route", ar: "الانتقال إلى هولندا: مسار المهاجر عالي المهارة" },
    summary: {
      en: "The Dutch system is unusually simple: if your employer is a recognised sponsor and pays above the age-based salary threshold, the permit is close to automatic.",
      ar: "النظام الهولندي بسيط بشكل لافت: إذا كان صاحب عملك كفيلًا معتمدًا ويدفع فوق حد الراتب المرتبط بالعمر، فإن التصريح يكاد يكون تلقائيًا.",
    },
    intro: {
      en: "There is no points test and no labour market test. Everything hinges on the employer's sponsor status, which you can verify yourself on the IND's public register before you sign anything. Housing, not immigration, is the hard part of moving to Amsterdam.",
      ar: "لا يوجد اختبار نقاط ولا اختبار لسوق العمل. كل شيء يتوقف على صفة صاحب العمل ككفيل معتمد، ويمكنك التحقق منها بنفسك في السجل العام لدائرة الهجرة قبل توقيع أي شيء. والسكن — لا الهجرة — هو الجزء الصعب في الانتقال إلى أمستردام.",
    },
    routes: [
      {
        name: { en: "Highly Skilled Migrant permit", ar: "تصريح المهاجر عالي المهارة" },
        who: { en: "Employees of an IND-recognised sponsor earning above the threshold for their age band.", ar: "موظفو كفيل معتمد لدى دائرة الهجرة براتب يفوق الحد المقرر لفئتهم العمرية." },
        processing: { en: "2–4 weeks", ar: "من أسبوعين إلى أربعة أسابيع" },
        cost: { en: "€405, usually paid by the employer", ar: "٤٠٥ يورو، يدفعها صاحب العمل عادةً" },
      },
      {
        name: { en: "Orientation year (zoekjaar)", ar: "سنة البحث عن عمل" },
        who: { en: "Recent graduates of Dutch universities or of a top-200 university worldwide, within three years of graduating.", ar: "خريجو الجامعات الهولندية أو إحدى أفضل ٢٠٠ جامعة عالميًا خلال ثلاث سنوات من التخرج." },
        processing: { en: "2–4 weeks", ar: "من أسبوعين إلى أربعة أسابيع" },
        cost: { en: "€228", ar: "٢٢٨ يورو" },
      },
      {
        name: { en: "EU Blue Card", ar: "البطاقة الزرقاء الأوروبية" },
        who: { en: "Degree holders who want mobility rights across EU states rather than a Netherlands-only permit.", ar: "حاملو الشهادات الجامعية الراغبون في حق التنقل بين دول الاتحاد بدل تصريح خاص بهولندا فقط." },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "€405", ar: "٤٠٥ يورو" },
      },
    ],
    requirements: [
      { en: "Employment contract with an IND-recognised sponsor", ar: "عقد عمل مع كفيل معتمد لدى دائرة الهجرة" },
      { en: "Gross salary above the threshold for your age group", ar: "راتب إجمالي يتجاوز الحد المقرر لفئتك العمرية" },
      { en: "Valid passport and, for some nationalities, an MVV entry visa", ar: "جواز سفر ساري، وتأشيرة دخول MVV لبعض الجنسيات" },
      { en: "Registration at your municipality within five days of arrival", ar: "التسجيل في البلدية خلال خمسة أيام من الوصول" },
      { en: "Dutch health insurance taken out within four months", ar: "تأمين صحي هولندي خلال أربعة أشهر" },
      { en: "Legalised birth certificate for the civil registry", ar: "شهادة ميلاد مصدّقة للسجل المدني" },
    ],
  },
  {
    countryCode: "au",
    updatedAt: "2026-06-01",
    title: { en: "Moving to Australia: skills assessment and the points test", ar: "الهجرة إلى أستراليا: تقييم المهارات واختبار النقاط" },
    summary: {
      en: "Australia asks two questions in order: is your occupation on the list, and does an assessing authority agree you can do it? Points come after that.",
      ar: "تطرح أستراليا سؤالين بالترتيب: هل مهنتك مدرجة في القائمة، وهل توافق جهة التقييم على أنك مؤهل لها؟ ثم تأتي النقاط بعد ذلك.",
    },
    intro: {
      en: "Every skilled visa starts with a positive skills assessment from the authority that governs your occupation — ACS for IT, Engineers Australia for engineering, AHPRA for health. Only then do you submit an Expression of Interest and wait to be invited. Regional visas carry extra points and lower thresholds.",
      ar: "تبدأ كل تأشيرة مهارات بتقييم إيجابي من الجهة المسؤولة عن مهنتك — ACS لتقنية المعلومات، ومهندسو أستراليا للهندسة، وAHPRA للصحة. بعد ذلك فقط تقدّم إبداء الاهتمام وتنتظر الدعوة. وتمنح تأشيرات المناطق الريفية نقاطًا إضافية بحدود أدنى.",
    },
    routes: [
      {
        name: { en: "Skilled Independent visa (subclass 189)", ar: "تأشيرة المهارات المستقلة (الفئة ١٨٩)" },
        who: { en: "High scorers in an occupation on the medium and long-term list, with no sponsor needed.", ar: "أصحاب النقاط المرتفعة في مهنة مدرجة على القائمة متوسطة وطويلة الأمد، دون حاجة لكفيل." },
        processing: { en: "6–12 months", ar: "من ٦ إلى ١٢ شهرًا" },
        cost: { en: "AUD 4,765 for the main applicant", ar: "٤٧٦٥ دولارًا أستراليًا للمتقدم الرئيسي" },
      },
      {
        name: { en: "State nominated visa (subclass 190)", ar: "تأشيرة ترشيح الولاية (الفئة ١٩٠)" },
        who: { en: "Applicants nominated by a state or territory, which adds five points and permanent residence on arrival.", ar: "المرشحون من ولاية أو إقليم، ما يضيف خمس نقاط ويمنح إقامة دائمة عند الوصول." },
        processing: { en: "6–12 months", ar: "من ٦ إلى ١٢ شهرًا" },
        cost: { en: "AUD 4,765 plus state fees", ar: "٤٧٦٥ دولارًا أستراليًا إضافة إلى رسوم الولاية" },
      },
      {
        name: { en: "Employer sponsored (subclass 482)", ar: "الكفالة من صاحب العمل (الفئة ٤٨٢)" },
        who: { en: "Workers with an approved sponsor, useful when your points score is below the invitation cut-off.", ar: "العاملون لدى كفيل معتمد، وهو مفيد إذا كانت نقاطك أقل من حد الدعوة." },
        processing: { en: "2–5 months", ar: "من شهرين إلى خمسة أشهر" },
        cost: { en: "AUD 3,115 plus the employer's levy", ar: "٣١١٥ دولارًا أستراليًا إضافة إلى رسوم صاحب العمل" },
      },
    ],
    requirements: [
      { en: "Positive skills assessment from the relevant assessing authority", ar: "تقييم مهارات إيجابي من جهة التقييم المختصة" },
      { en: "IELTS, PTE or equivalent — usually 7 in each band for competitive scores", ar: "آيلتس أو PTE أو ما يعادلهما — عادةً ٧ في كل قسم للنقاط التنافسية" },
      { en: "Occupation listed on the current skilled occupation list", ar: "مهنة مدرجة في قائمة المهن الماهرة الحالية" },
      { en: "Under 45 years old at the time of invitation", ar: "أن يكون عمرك أقل من ٤٥ عامًا وقت الدعوة" },
      { en: "Health examination and character (police) clearances", ar: "فحص طبي وشهادات حسن سيرة من الشرطة" },
      { en: "Evidence of skilled work experience matching your nominated occupation", ar: "إثبات خبرة عمل ماهرة مطابقة للمهنة المرشّحة" },
    ],
  },
  {
    countryCode: "gb",
    updatedAt: "2026-06-01",
    title: { en: "Moving to the UK: the Skilled Worker visa", ar: "الانتقال إلى بريطانيا: تأشيرة العامل الماهر" },
    summary: {
      en: "The UK route is entirely sponsor-led. Without a Certificate of Sponsorship from a licensed employer there is no skilled work visa, however qualified you are.",
      ar: "المسار البريطاني قائم بالكامل على الكفيل. فبدون شهادة كفالة من صاحب عمل مرخّص لا توجد تأشيرة عمل ماهر، مهما كانت مؤهلاتك.",
    },
    intro: {
      en: "Check the employer against the Home Office's published register of licensed sponsors before you pay anyone anything — sponsorship scams targeting care workers are common. Budget for the Immigration Health Surcharge, which is charged up front for the full length of the visa and is often the largest single cost.",
      ar: "تحقّق من صاحب العمل في سجل الكفلاء المرخّصين المنشور لدى وزارة الداخلية قبل أن تدفع لأي جهة — فعمليات النصب باسم الكفالة تستهدف عمال الرعاية كثيرًا. واحسب حساب رسوم الصحة للمهاجرين، إذ تُدفع مقدمًا عن كامل مدة التأشيرة وغالبًا ما تكون أكبر بند تكلفة.",
    },
    routes: [
      {
        name: { en: "Skilled Worker visa", ar: "تأشيرة العامل الماهر" },
        who: { en: "Anyone with a job offer from a licensed sponsor at or above the general salary threshold and skill level.", ar: "كل من لديه عرض عمل من كفيل مرخّص براتب ومستوى مهارة عند الحد المقرر أو أعلى." },
        processing: { en: "3 weeks from outside the UK", ar: "ثلاثة أسابيع من خارج بريطانيا" },
        cost: { en: "£769–1,751 visa fee plus £1,035 per year health surcharge", ar: "من ٧٦٩ إلى ١٧٥١ جنيهًا رسوم التأشيرة إضافة إلى ١٠٣٥ جنيهًا سنويًا للرسوم الصحية" },
      },
      {
        name: { en: "Health and Care Worker visa", ar: "تأشيرة العاملين في الصحة والرعاية" },
        who: { en: "Doctors, nurses and eligible care staff sponsored by the NHS or an approved provider.", ar: "الأطباء والممرضون وموظفو الرعاية المؤهلون بكفالة هيئة الصحة الوطنية أو جهة معتمدة." },
        processing: { en: "3 weeks", ar: "ثلاثة أسابيع" },
        cost: { en: "£304–590, and the health surcharge is waived", ar: "من ٣٠٤ إلى ٥٩٠ جنيهًا، مع إعفاء من الرسوم الصحية" },
      },
      {
        name: { en: "Global Talent visa", ar: "تأشيرة المواهب العالمية" },
        who: { en: "Leaders or emerging leaders in academia, research, arts or digital technology, endorsed by an approved body — no employer needed.", ar: "القادة أو القادة الصاعدون في الأوساط الأكاديمية أو البحث أو الفنون أو التقنية الرقمية، بتزكية من جهة معتمدة — دون حاجة لصاحب عمل." },
        processing: { en: "8 weeks including endorsement", ar: "ثمانية أسابيع شاملة التزكية" },
        cost: { en: "£766 in total across both stages", ar: "٧٦٦ جنيهًا إجمالًا عبر المرحلتين" },
      },
    ],
    requirements: [
      { en: "Certificate of Sponsorship from a licensed sponsor", ar: "شهادة كفالة من كفيل مرخّص" },
      { en: "English at B1 — IELTS for UKVI or an exempt nationality or degree", ar: "إنجليزية بمستوى B1 — آيلتس لأغراض الهجرة أو إعفاء بالجنسية أو الشهادة" },
      { en: "Salary meeting both the general and the occupation-specific threshold", ar: "راتب يستوفي الحد العام والحد الخاص بالمهنة معًا" },
      { en: "Tuberculosis test certificate for listed countries", ar: "شهادة فحص السل لمواطني الدول المدرجة" },
      { en: "Proof of savings unless your sponsor certifies maintenance", ar: "إثبات مدخرات ما لم يشهد الكفيل بتغطية الإعاشة" },
      { en: "Criminal record certificate for health, education and care roles", ar: "شهادة سجل جنائي لوظائف الصحة والتعليم والرعاية" },
    ],
  },
  {
    countryCode: "pt",
    updatedAt: "2026-06-01",
    title: { en: "Moving to Portugal: work, job-seeker and D7 visas", ar: "الانتقال إلى البرتغال: تأشيرات العمل والبحث عن عمل وD7" },
    summary: {
      en: "Portugal is one of the few EU countries that will give you a visa to come and look for work, and one of the cheapest Western European bases once you arrive.",
      ar: "البرتغال من الدول الأوروبية القليلة التي تمنحك تأشيرة للقدوم والبحث عن عمل، وهي من أرخص قواعد الإقامة في غرب أوروبا بعد الوصول.",
    },
    intro: {
      en: "Residence runs in two stages: a national visa from the consulate, then a residence permit issued by AIMA after you arrive. Book consulate appointments early — availability, not eligibility, is usually the delay. Five years of legal residence opens the door to citizenship.",
      ar: "تسير الإقامة على مرحلتين: تأشيرة وطنية من القنصلية، ثم تصريح إقامة تصدره AIMA بعد وصولك. احجز موعد القنصلية مبكرًا — فالتأخير يأتي عادة من توفر المواعيد لا من الأهلية. وخمس سنوات من الإقامة القانونية تفتح باب الجنسية.",
    },
    routes: [
      {
        name: { en: "Job-seeker visa", ar: "تأشيرة البحث عن عمل" },
        who: { en: "Applicants who want up to 120 days in Portugal to find work, extendable by 60 days.", ar: "من يرغب في البقاء حتى ١٢٠ يومًا في البرتغال للبحث عن عمل، قابلة للتمديد ٦٠ يومًا." },
        processing: { en: "60–90 days", ar: "من ٦٠ إلى ٩٠ يومًا" },
        cost: { en: "€90 visa plus €170 residence permit", ar: "٩٠ يورو للتأشيرة إضافة إلى ١٧٠ يورو لتصريح الإقامة" },
      },
      {
        name: { en: "D3 work visa", ar: "تأشيرة العمل D3" },
        who: { en: "Holders of a Portuguese employment contract, including seasonal and hospitality roles.", ar: "حاملو عقد عمل برتغالي، بما في ذلك الوظائف الموسمية ووظائف الضيافة." },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "€90 plus €170", ar: "٩٠ يورو إضافة إلى ١٧٠ يورو" },
      },
      {
        name: { en: "D7 passive income visa", ar: "تأشيرة الدخل السلبي D7" },
        who: { en: "Retirees and remote earners with stable income at least at the Portuguese minimum wage.", ar: "المتقاعدون وأصحاب الدخل عن بُعد بدخل ثابت لا يقل عن الحد الأدنى للأجور في البرتغال." },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "€90 plus €170", ar: "٩٠ يورو إضافة إلى ١٧٠ يورو" },
      },
    ],
    requirements: [
      { en: "Portuguese tax number (NIF), obtainable before you move", ar: "رقم ضريبي برتغالي (NIF) يمكن استخراجه قبل الانتقال" },
      { en: "Portuguese bank account with proof of funds", ar: "حساب بنكي برتغالي مع إثبات الأموال" },
      { en: "Twelve months of travel or health insurance", ar: "تأمين سفر أو صحي لمدة اثني عشر شهرًا" },
      { en: "Proof of accommodation — rental contract or hosting declaration", ar: "إثبات سكن — عقد إيجار أو إقرار استضافة" },
      { en: "Criminal record certificate, apostilled and translated", ar: "شهادة سجل جنائي مصدّقة ومترجمة" },
      { en: "Consulate appointment booked through VFS or the embassy portal", ar: "موعد قنصلي محجوز عبر VFS أو بوابة السفارة" },
    ],
  },
  {
    countryCode: "us",
    updatedAt: "2026-06-01",
    title: { en: "Moving to the United States: work visas and green cards", ar: "الهجرة إلى الولايات المتحدة: تأشيرات العمل والبطاقة الخضراء" },
    summary: {
      en: "The US has the highest ceiling and the longest queues. Most work routes are employer-driven, annually capped, and measured in years rather than months.",
      ar: "تمتلك أمريكا أعلى سقف وأطول طوابير انتظار. معظم مسارات العمل تعتمد على صاحب العمل، ومحدودة بسقف سنوي، وتُقاس بالسنوات لا بالأشهر.",
    },
    intro: {
      en: "There is no points system and no general skilled-worker visa. You need either an employer willing to petition for you, an extraordinary-ability case you can file yourself, or luck in the Diversity Visa lottery. Plan around the H-1B registration window each March.",
      ar: "لا يوجد نظام نقاط ولا تأشيرة عامة للعمالة الماهرة. تحتاج إما صاحب عمل مستعد لتقديم الالتماس نيابةً عنك، أو ملفًا لقدرات استثنائية تقدّمه بنفسك، أو حظًا في قرعة الهجرة العشوائية. وخطّط وفق نافذة تسجيل H-1B كل مارس.",
    },
    routes: [
      {
        name: { en: "H-1B specialty occupation", ar: "تأشيرة H-1B للمهن المتخصصة" },
        who: { en: "Degree holders in specialty roles whose employer registers them in the annual lottery.", ar: "حاملو الشهادات في وظائف متخصصة يسجّلهم صاحب العمل في القرعة السنوية." },
        processing: { en: "Lottery in March, work starts in October", ar: "القرعة في مارس والعمل يبدأ في أكتوبر" },
        cost: { en: "USD 2,000–5,000, paid by the employer", ar: "من ٢٠٠٠ إلى ٥٠٠٠ دولار يتحمّلها صاحب العمل" },
      },
      {
        name: { en: "EB-2 / EB-3 employment green card", ar: "البطاقة الخضراء عبر العمل EB-2 / EB-3" },
        who: { en: "Skilled workers and professionals sponsored for permanent residence, usually after labour certification.", ar: "العمال المهرة والمهنيون المكفولون للإقامة الدائمة، عادةً بعد شهادة سوق العمل." },
        processing: { en: "2–6 years depending on country of birth", ar: "من سنتين إلى ست سنوات حسب بلد الميلاد" },
        cost: { en: "USD 3,000–8,000 in filing and legal fees", ar: "من ٣٠٠٠ إلى ٨٠٠٠ دولار رسوم تقديم وأتعاب قانونية" },
      },
      {
        name: { en: "EB-1A / O-1 extraordinary ability", ar: "القدرات الاستثنائية EB-1A / O-1" },
        who: { en: "Applicants with awards, publications, press coverage or comparable evidence — you can self-petition for EB-1A.", ar: "أصحاب الجوائز والمنشورات والتغطية الصحفية أو ما يعادلها — ويمكنك تقديم التماس EB-1A بنفسك." },
        processing: { en: "Premium processing in 15 days; consular stage adds months", ar: "معالجة مميزة خلال ١٥ يومًا، مع أشهر إضافية للمرحلة القنصلية" },
        cost: { en: "USD 2,805 filing plus premium processing", ar: "٢٨٠٥ دولارات للتقديم إضافة إلى رسوم المعالجة المميزة" },
      },
    ],
    requirements: [
      { en: "Employer petition (Form I-129 or I-140) unless self-petitioning", ar: "التماس من صاحب العمل (نموذج I-129 أو I-140) ما لم تتقدّم بنفسك" },
      { en: "Credential evaluation showing US degree equivalency", ar: "تقييم شهادات يثبت معادلتها لدرجة أمريكية" },
      { en: "DS-160 form and consular interview at the US embassy", ar: "نموذج DS-160 ومقابلة قنصلية في السفارة الأمريكية" },
      { en: "Medical examination by an embassy-approved panel physician", ar: "فحص طبي لدى طبيب معتمد من السفارة" },
      { en: "Police certificates for immigrant visa applications", ar: "شهادات الشرطة لطلبات تأشيرة الهجرة" },
      { en: "Proof the offered wage meets the prevailing wage determination", ar: "إثبات أن الأجر المعروض يطابق الأجر السائد المعتمد" },
    ],
  },
];

/**
 * Every published country guide, sorted alphabetically by English title so the
 * index page has a stable order regardless of which file a guide lives in.
 */
export const VISA_GUIDES: VisaGuide[] = [
  ...BASE_GUIDES.map((guide) => ({
    ...guide,
    sections: guide.sections ?? GUIDE_SECTIONS[guide.countryCode],
  })),
  ...EUROPE_GUIDES,
  ...EUROPE_GUIDES_2,
  ...GULF_GUIDES,
].sort((a, b) => a.title.en.localeCompare(b.title.en));

export function getGuide(countryCode: string): VisaGuide | undefined {
  return VISA_GUIDES.find((g) => g.countryCode === countryCode.toLowerCase());
}

export function hasGuide(countryCode: string): boolean {
  return VISA_GUIDES.some((g) => g.countryCode === countryCode.toLowerCase());
}
