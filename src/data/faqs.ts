import type { Localized } from "@/lib/types";

export type Faq = { question: Localized; answer: Localized };

/**
 * Real questions, answered on the page and mirrored into FAQPage JSON-LD.
 * Google only rewards FAQ markup when the answer is visible to the user, so
 * these render as content first and structured data second.
 */
export const EXPLORER_FAQS: Faq[] = [
  {
    question: {
      en: "How much money do I need to move abroad?",
      ar: "كم أحتاج من المال للانتقال إلى الخارج؟",
    },
    answer: {
      en: "As a rule of thumb, budget the destination's core monthly cost — rent, groceries, utilities, transport and internet — multiplied by three, plus your visa fees and flights. The comparison above gives you that core figure; the first months abroad cost more because of deposits, furniture and the gap before your first salary.",
      ar: "كقاعدة عامة، احسب التكلفة الشهرية الأساسية في بلد الوجهة — الإيجار والطعام والفواتير والمواصلات والإنترنت — مضروبة في ثلاثة، مضافًا إليها رسوم التأشيرة وتذاكر السفر. تعطيك المقارنة أعلاه هذا الرقم الأساسي، لكن الأشهر الأولى تكلّف أكثر بسبب التأمينات والأثاث والفترة قبل أول راتب.",
    },
  },
  {
    question: {
      en: "Why is my city cheaper than the figure you show?",
      ar: "لماذا مدينتي أرخص من الرقم الذي تعرضونه؟",
    },
    answer: {
      en: "Every figure is for the capital or largest city, in the centre. Rent outside the centre is typically 20–35% lower, and a mid-sized city can be cheaper again. Use the outside-centre row in the breakdown as your realistic floor.",
      ar: "كل رقم يخص العاصمة أو أكبر مدينة، وفي وسطها تحديدًا. الإيجار خارج المركز أقل عادةً بنسبة ٢٠–٣٥٪، والمدن المتوسطة أرخص أكثر. استخدم صف «خارج المركز» في التفصيل كحدّ أدنى واقعي لك.",
    },
  },
  {
    question: {
      en: "Are salaries here before or after tax?",
      ar: "هل الرواتب المعروضة قبل الضريبة أم بعدها؟",
    },
    answer: {
      en: "The average salary shown in the comparison is net — what lands in your account after income tax and social contributions. Job listings in the matcher show gross annual ranges instead, because that is how employers advertise them.",
      ar: "متوسط الراتب في المقارنة هو الصافي — ما يصل إلى حسابك بعد ضريبة الدخل والاشتراكات الاجتماعية. أما الوظائف في صفحة المطابقة فتعرض نطاقات سنوية إجمالية، لأن هذه هي الطريقة التي يعلن بها أصحاب العمل.",
    },
  },
  {
    question: {
      en: "Why is everything shown in US dollars?",
      ar: "لماذا تُعرض كل الأرقام بالدولار الأمريكي؟",
    },
    answer: {
      en: "A single currency is the only way to compare nineteen countries honestly. Converting each figure into local money would hide the differences behind exchange rates that move weekly.",
      ar: "العملة الموحّدة هي السبيل الوحيد لمقارنة تسع عشرة دولة بصدق. فتحويل كل رقم إلى العملة المحلية يخفي الفروق خلف أسعار صرف تتغيّر أسبوعيًا.",
    },
  },
];

export const JOBS_FAQS: Faq[] = [
  {
    question: {
      en: "Will my degree be recognised abroad?",
      ar: "هل سيُعترف بشهادتي في الخارج؟",
    },
    answer: {
      en: "Recognition is separate from getting hired, and it is usually the slower half. Regulated professions — nursing, medicine, engineering, teaching, law — require a formal equivalency assessment before you can work, which takes months. Unregulated fields such as IT usually need no assessment at all, only an employer willing to sponsor you.",
      ar: "الاعتراف بالشهادة مسار منفصل عن الحصول على الوظيفة، وهو غالبًا الأبطأ. المهن المنظّمة — التمريض والطب والهندسة والتعليم والقانون — تتطلب تقييم معادلة رسميًا قبل مزاولة العمل، ويستغرق أشهرًا. أما المجالات غير المنظّمة مثل تقنية المعلومات فلا تحتاج تقييمًا عادةً، بل صاحب عمل مستعدًا لكفالتك.",
    },
  },
  {
    question: {
      en: "What does \"visa sponsorship common\" actually mean?",
      ar: "ماذا تعني عبارة «كفالة التأشيرة شائعة» فعليًا؟",
    },
    answer: {
      en: "It means employers in that role routinely hire from outside the country and are set up to handle the paperwork. It is not a guarantee for any individual job. Always verify that a specific employer is licensed to sponsor before you invest time — or money — in an application.",
      ar: "تعني أن أصحاب العمل في هذه الوظيفة يوظّفون من خارج البلد بشكل معتاد ولديهم القدرة على إنجاز الإجراءات. وهي ليست ضمانًا لأي وظيفة بعينها. تحقّق دائمًا من أن صاحب العمل المحدّد مرخّص للكفالة قبل أن تستثمر وقتك — أو مالك — في التقديم.",
    },
  },
  {
    question: {
      en: "Can I work abroad without a university degree?",
      ar: "هل يمكنني العمل في الخارج دون شهادة جامعية؟",
    },
    answer: {
      en: "Yes. Set the filter to secondary school or vocational diploma and you will still see roles in care work, skilled trades, logistics, hospitality and agriculture — several of them on official shortage lists, which is exactly what makes a work visa possible.",
      ar: "نعم. اضبط الفلتر على الثانوية أو الدبلوم المهني وستظل ترى وظائف في الرعاية والحرف والنقل والضيافة والزراعة — وعدد منها مدرج في قوائم نقص العمالة الرسمية، وهو تحديدًا ما يجعل تأشيرة العمل ممكنة.",
    },
  },
  {
    question: {
      en: "Do I need to speak the local language?",
      ar: "هل أحتاج إلى إتقان اللغة المحلية؟",
    },
    answer: {
      en: "It depends on the field more than the country. Patient-facing healthcare and teaching almost always require a certified language level. IT, engineering and research frequently run in English, even in Germany, the Netherlands and the Nordics. The note on each role tells you which case applies.",
      ar: "الأمر يتوقف على المجال أكثر من الدولة. الرعاية الصحية المباشرة مع المرضى والتعليم تشترطان غالبًا مستوى لغويًا معتمدًا. أما تقنية المعلومات والهندسة والبحث فتُدار كثيرًا بالإنجليزية، حتى في ألمانيا وهولندا والدول الإسكندنافية. وملاحظة كل وظيفة توضّح أي الحالتين تنطبق.",
    },
  },
];
