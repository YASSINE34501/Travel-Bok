import type { VisaGuide } from "@/lib/types";

/**
 * European destination guides. Every entry follows the same section order so
 * two countries can be read side by side: pathways, then residency and legal
 * framework, then the job market, then what daily life is actually like.
 *
 * Figures are indicative and reviewed periodically. Fees and salary thresholds
 * in particular move every year — each guide page links the country's official
 * authority, which is the only source that is authoritative on them.
 */
export const EUROPE_GUIDES: VisaGuide[] = [
  {
    countryCode: "fr",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to France: visas, residency and the job market",
      ar: "الانتقال إلى فرنسا: التأشيرات والإقامة وسوق العمل",
    },
    summary: {
      en: "France runs on the Passeport Talent for qualified hires and a shortage list for everyone else. The language requirement is real above entry level, and it is now part of the residency test too.",
      ar: "تعتمد فرنسا على «جواز المواهب» للكفاءات وعلى قائمة المهن الناقصة لغيرهم. واشتراط اللغة حقيقي فوق المستويات المبتدئة، وقد صار جزءًا من اختبار الإقامة أيضًا.",
    },
    intro: {
      en: "Almost every long-stay route begins at a consulate with a VLS-TS visa, which doubles as your first residence permit once validated online after arrival. France is unusual in how much it rewards French: it changes which jobs you can hold, how fast you reach a multi-year card, and whether naturalisation is realistic.",
      ar: "تبدأ كل مسارات الإقامة الطويلة تقريبًا من القنصلية بتأشيرة VLS-TS، التي تتحوّل إلى أول تصريح إقامة لك بعد تفعيلها إلكترونيًا عقب الوصول. وفرنسا استثنائية في مقدار ما تكافئ به إتقان الفرنسية: فهي تحدّد الوظائف المتاحة لك، وسرعة حصولك على بطاقة متعددة السنوات، وواقعية التجنّس من عدمها.",
    },
    routes: [
      {
        name: { en: "Passeport Talent", ar: "جواز المواهب" },
        who: {
          en: "Graduates with a job offer above roughly twice the minimum wage, plus researchers, founders and artists. Issues a four-year card from the start and lets your spouse work immediately.",
          ar: "الخريجون الحاصلون على عرض عمل يقارب ضعف الحد الأدنى للأجور، إضافةً إلى الباحثين ورواد الأعمال والفنانين. تمنح بطاقة لأربع سنوات منذ البداية وتتيح لزوجك العمل فورًا.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "€99 visa plus €225 residence tax", ar: "٩٩ يورو للتأشيرة إضافة إلى ٢٢٥ يورو رسوم إقامة" },
      },
      {
        name: { en: "Salarié / shortage occupation", ar: "تأشيرة الموظف / المهن الناقصة" },
        who: {
          en: "Standard employment route. If your job is on the métiers en tension list, the labour market test is waived — it covers construction, hospitality, care and parts of engineering.",
          ar: "المسار الوظيفي الاعتيادي. وإذا كانت مهنتك في قائمة المهن الناقصة، يُلغى اختبار سوق العمل — وتشمل القائمة البناء والضيافة والرعاية وأجزاءً من الهندسة.",
        },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "€99 plus employer levy", ar: "٩٩ يورو إضافة إلى رسوم على صاحب العمل" },
      },
      {
        name: { en: "Student and post-study search", ar: "الدراسة والبحث عن عمل بعد التخرج" },
        who: {
          en: "Students at a recognised institution may work 964 hours a year, and master's graduates can stay a further year on an APS permit to find work or start a business.",
          ar: "يحق لطلاب المؤسسات المعتمدة العمل ٩٦٤ ساعة سنويًا، ويمكن لخريجي الماجستير البقاء سنة إضافية بتصريح APS للبحث عن عمل أو تأسيس مشروع.",
        },
        processing: { en: "3–8 weeks via Campus France", ar: "من ٣ إلى ٨ أسابيع عبر Campus France" },
        cost: { en: "€50 application plus €99 visa", ar: "٥٠ يورو للطلب إضافة إلى ٩٩ يورو للتأشيرة" },
      },
    ],
    requirements: [
      { en: "Long-stay visa application through France-Visas and your local VFS centre", ar: "طلب تأشيرة إقامة طويلة عبر France-Visas ومركز VFS المحلي" },
      { en: "Employment contract stamped by the labour authority, or a school acceptance letter", ar: "عقد عمل مختوم من سلطة العمل، أو خطاب قبول من مؤسسة تعليمية" },
      { en: "Proof of accommodation in France for the first months", ar: "إثبات سكن في فرنسا للأشهر الأولى" },
      { en: "Financial means at or above the minimum wage for the visa category", ar: "موارد مالية عند الحد الأدنى للأجور أو أعلى حسب فئة التأشيرة" },
      { en: "Online validation of the VLS-TS within three months of arrival", ar: "تفعيل تأشيرة VLS-TS إلكترونيًا خلال ثلاثة أشهر من الوصول" },
      { en: "French language certificate where the permit or profession requires it", ar: "شهادة لغة فرنسية إذا اشترطها التصريح أو المهنة" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "A ten-year resident card becomes available after five years of continuous legal residence, with stable income and French at B1. Passeport Talent holders reach it on the same timeline but with far less paperwork in between.",
          ar: "تتاح بطاقة الإقامة لعشر سنوات بعد خمس سنوات من الإقامة القانونية المتصلة، مع دخل مستقر وفرنسية بمستوى B1. ويصل إليها حاملو جواز المواهب في المدة نفسها لكن بأوراق أقل بكثير في الطريق.",
        },
        citizenship: {
          en: "Naturalisation opens after five years of residence — two if you graduated from a French university. It requires French at B2, a civics interview, and tax compliance for the whole period. France permits dual nationality.",
          ar: "يفتح باب التجنّس بعد خمس سنوات من الإقامة — وسنتين إن تخرجت من جامعة فرنسية. ويشترط الفرنسية بمستوى B2 ومقابلة في التربية الوطنية والالتزام الضريبي طوال المدة. وتسمح فرنسا بازدواج الجنسية.",
        },
        rights: [
          { en: "Dual nationality is permitted, so you need not renounce your original citizenship.", ar: "ازدواج الجنسية مسموح، فلا حاجة للتخلي عن جنسيتك الأصلية." },
          { en: "Family reunion is available after 18 months of legal residence, with housing and income conditions.", ar: "لمّ الشمل العائلي متاح بعد ١٨ شهرًا من الإقامة القانونية، بشروط سكن ودخل." },
          { en: "Passeport Talent spouses receive a work-authorised card automatically; other categories must apply.", ar: "يحصل أزواج حاملي جواز المواهب على بطاقة تسمح بالعمل تلقائيًا، بينما تتطلب الفئات الأخرى تقديم طلب." },
          { en: "Changing employer within the same occupation is allowed; changing occupation usually needs a new permit.", ar: "تغيير صاحب العمل ضمن المهنة نفسها مسموح، أما تغيير المهنة فيتطلب عادةً تصريحًا جديدًا." },
        ],
        labourLaw: [
          { en: "The legal working week is 35 hours; hours beyond that are paid or banked as RTT days off.", ar: "أسبوع العمل القانوني ٣٥ ساعة، وما يزيد يُدفع أجرًا أو يُرصَّد كأيام إجازة RTT." },
          { en: "Five weeks of paid annual leave is the statutory minimum, plus 11 public holidays.", ar: "خمسة أسابيع إجازة سنوية مدفوعة هي الحد الأدنى القانوني، إضافة إلى ١١ عطلة رسمية." },
          { en: "Permanent contracts (CDI) are hard to terminate without cause; most first offers are fixed-term (CDD).", ar: "العقود الدائمة (CDI) يصعب إنهاؤها دون سبب، ومعظم العروض الأولى تكون محددة المدة (CDD)." },
          { en: "Sector-wide collective agreements set minimum pay per role, often above the national minimum wage.", ar: "الاتفاقيات الجماعية القطاعية تحدد حدًا أدنى للأجر لكل وظيفة، وغالبًا فوق الحد الأدنى الوطني." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Software, data and cybersecurity — the largest English-tolerant sector", ar: "البرمجيات والبيانات والأمن السيبراني — أكبر قطاع يتسامح مع الإنجليزية" },
          { en: "Aerospace and rail engineering, concentrated around Toulouse and Lyon", ar: "هندسة الطيران والسكك الحديدية، وتتركز حول تولوز وليون" },
          { en: "Healthcare and elderly care, with structural nurse shortages", ar: "الرعاية الصحية ورعاية المسنين، مع نقص هيكلي في الممرضين" },
          { en: "Hospitality and food service, especially seasonal coastal work", ar: "الضيافة وخدمات الطعام، خاصة الأعمال الموسمية الساحلية" },
          { en: "Construction and skilled trades on the shortage list", ar: "البناء والحرف المدرجة في قائمة المهن الناقصة" },
        ],
        equivalency: {
          en: "France has no general degree-recognition requirement for unregulated jobs — employers judge your CV. For regulated professions (medicine, nursing, law, architecture, teaching) the relevant ordre or ARS must authorise you, which means a dossier, sometimes an adaptation period, and French at B2. ENIC-NARIC France issues comparability statements that help with everything else.",
          ar: "لا تشترط فرنسا معادلة عامة للشهادات في المهن غير المنظّمة — يقيّم أصحاب العمل سيرتك الذاتية. أما المهن المنظّمة (الطب والتمريض والقانون والعمارة والتعليم) فتتطلب تصريحًا من النقابة المختصة أو الوكالة الإقليمية للصحة، أي ملفًا كاملًا وأحيانًا فترة تأهيل وفرنسية بمستوى B2. وتصدر ENIC-NARIC فرنسا إفادات مقارنة تفيد في بقية الحالات.",
        },
        wages: {
          en: "The minimum wage (SMIC) sits near €1,800 gross a month. Junior engineers start around €38,000–45,000 gross a year in Paris and less in the regions; senior developers reach €60,000–75,000. Expect roughly 22–25% of gross to disappear into social contributions before income tax.",
          ar: "يقارب الحد الأدنى للأجور (SMIC) ١٨٠٠ يورو إجمالًا شهريًا. ويبدأ المهندسون المبتدئون بنحو ٣٨٠٠٠–٤٥٠٠٠ يورو سنويًا في باريس وأقل في الأقاليم، بينما يصل المطورون الخبراء إلى ٦٠٠٠٠–٧٥٠٠٠. وتوقّع خصم نحو ٢٢–٢٥٪ من الإجمالي للاشتراكات الاجتماعية قبل ضريبة الدخل.",
        },
      },
      life: {
        housing: {
          en: "Paris rentals are gatekept by the dossier: landlords typically want proof of income at three times the rent and a French guarantor. The state-backed Visale scheme replaces the guarantor for most newcomers and is worth arranging before you arrive.",
          ar: "الإيجار في باريس يحكمه «الملف»: يطلب الملاك عادةً إثبات دخل يعادل ثلاثة أضعاف الإيجار وكفيلًا فرنسيًا. ويحل برنامج Visale المدعوم حكوميًا محل الكفيل لمعظم القادمين الجدد، ويستحق ترتيبه قبل وصولك.",
        },
        language: {
          en: "English is workable inside tech and research, and almost nowhere else. Administration, healthcare and schools run in French. B1 is the practical floor for daily life and is also the residency-card requirement.",
          ar: "الإنجليزية تكفي داخل قطاع التقنية والبحث، ولا تكاد تكفي في غيرهما. فالإدارة والرعاية الصحية والمدارس تعمل بالفرنسية. ومستوى B1 هو الحد العملي للحياة اليومية، وهو أيضًا شرط بطاقة الإقامة.",
        },
        integration: {
          en: "Signing the CIR integration contract at OFII is mandatory and includes free language and civics classes that count toward later applications. Register with CPAM for health cover and CAF for housing assistance in your first weeks — both are slow and both backdate.",
          ar: "توقيع عقد الاندماج الجمهوري (CIR) لدى OFII إلزامي ويشمل دروس لغة وتربية وطنية مجانية تُحتسب في الطلبات اللاحقة. وسجّل لدى CPAM للتغطية الصحية وCAF لمساعدة السكن في أسابيعك الأولى — كلاهما بطيء وكلاهما يحتسب بأثر رجعي.",
        },
        pros: [
          { en: "Healthcare is among the best-value systems in the world once you are registered.", ar: "الرعاية الصحية من أفضل الأنظمة قيمةً في العالم بمجرد تسجيلك." },
          { en: "Strong worker protections and genuinely long paid holidays.", ar: "حماية قوية للعاملين وإجازات مدفوعة طويلة فعلًا." },
          { en: "Childcare and public education are heavily subsidised.", ar: "رعاية الأطفال والتعليم العام مدعومان بقوة." },
          { en: "Fast rail makes living outside Paris practical while working in it.", ar: "القطارات السريعة تجعل السكن خارج باريس عمليًا مع العمل فيها." },
        ],
        cons: [
          { en: "Administration is slow and paper-heavy; expect months for routine steps.", ar: "الإدارة بطيئة وكثيفة الأوراق، وتوقّع أشهرًا لخطوات روتينية." },
          { en: "Paris housing is scarce and the dossier requirements exclude many newcomers.", ar: "السكن في باريس شحيح، وشروط الملف تستبعد كثيرًا من القادمين الجدد." },
          { en: "Take-home pay is noticeably lower than the headline salary.", ar: "الراتب الصافي أقل بوضوح من الرقم المعلن." },
          { en: "Career progress without fluent French plateaus quickly outside tech.", ar: "التقدّم المهني دون إتقان الفرنسية يتوقف سريعًا خارج قطاع التقنية." },
        ],
      },
    },
  },

  {
    countryCode: "es",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Spain: work, startup law and residency",
      ar: "الانتقال إلى إسبانيا: العمل وقانون الشركات الناشئة والإقامة",
    },
    summary: {
      en: "Spain's startup law created a genuinely fast route for qualified hires and remote workers, sitting alongside a slower conventional work permit and one of Europe's shortest paths to citizenship for some nationalities.",
      ar: "أنشأ قانون الشركات الناشئة في إسبانيا مسارًا سريعًا فعليًا للكفاءات والعاملين عن بُعد، إلى جانب تصريح عمل تقليدي أبطأ، وأحد أقصر مسارات الجنسية في أوروبا لبعض الجنسيات.",
    },
    intro: {
      en: "Two systems run in parallel. The general regime is employer-led, slow, and subject to a labour market test. The Ley de Startups regime — highly qualified professionals, digital nomads, entrepreneurs — is handled by a dedicated unit that answers in about twenty working days. Check which one your offer falls under before you plan anything.",
      ar: "يعمل نظامان بالتوازي. النظام العام يقوده صاحب العمل، وهو بطيء ويخضع لاختبار سوق العمل. أما نظام قانون الشركات الناشئة — للمهنيين ذوي المؤهلات العالية والعاملين الرقميين ورواد الأعمال — فتديره وحدة مخصصة تردّ خلال نحو عشرين يوم عمل. تحقّق أي النظامين ينطبق على عرضك قبل أن تخطط لأي شيء.",
    },
    routes: [
      {
        name: { en: "Highly qualified professional (Ley de Startups)", ar: "المهني عالي المؤهل (قانون الشركات الناشئة)" },
        who: {
          en: "Degree holders or those with three years of equivalent experience, hired above the sector threshold. Three-year permit, family included in the same application.",
          ar: "حاملو الشهادات أو من لديهم ثلاث سنوات خبرة معادلة، بعقد يتجاوز حد القطاع. تصريح لثلاث سنوات، والعائلة ضمن الطلب نفسه.",
        },
        processing: { en: "About 20 working days", ar: "نحو ٢٠ يوم عمل" },
        cost: { en: "€80–200 in fees", ar: "من ٨٠ إلى ٢٠٠ يورو رسوم" },
      },
      {
        name: { en: "Digital nomad visa", ar: "تأشيرة العمل الرقمي" },
        who: {
          en: "Remote employees or freelancers earning roughly twice the minimum wage from clients outside Spain, with no more than 20% of income from Spanish sources.",
          ar: "الموظفون عن بُعد أو المستقلون بدخل يقارب ضعف الحد الأدنى للأجور من عملاء خارج إسبانيا، على ألا يتجاوز الدخل من مصادر إسبانية ٢٠٪.",
        },
        processing: { en: "20 working days from inside Spain", ar: "٢٠ يوم عمل من داخل إسبانيا" },
        cost: { en: "€80 plus consular fees", ar: "٨٠ يورو إضافة إلى رسوم قنصلية" },
      },
      {
        name: { en: "General work permit (cuenta ajena)", ar: "تصريح العمل العام" },
        who: {
          en: "Standard employer-sponsored route, subject to the shortage-occupation catalogue or a labour market test. The main path for hospitality, agriculture and care work.",
          ar: "المسار الاعتيادي بكفالة صاحب العمل، ويخضع لدليل المهن الناقصة أو لاختبار سوق العمل. وهو المسار الرئيسي للضيافة والزراعة والرعاية.",
        },
        processing: { en: "3–6 months", ar: "من ٣ إلى ٦ أشهر" },
        cost: { en: "€200–400 including employer fees", ar: "من ٢٠٠ إلى ٤٠٠ يورو شاملة رسوم صاحب العمل" },
      },
    ],
    requirements: [
      { en: "NIE foreigner identification number, needed before almost anything else", ar: "رقم تعريف الأجانب NIE، ويلزم قبل كل شيء تقريبًا" },
      { en: "Criminal record certificate, apostilled and sworn-translated into Spanish", ar: "شهادة سجل جنائي مصدّقة ومترجمة ترجمة محلّفة إلى الإسبانية" },
      { en: "Private health insurance without co-payments, until you join social security", ar: "تأمين صحي خاص دون مشاركة في التكلفة، إلى أن تنضم للضمان الاجتماعي" },
      { en: "Proof of qualification or three years of relevant experience", ar: "إثبات المؤهل أو ثلاث سنوات من الخبرة ذات الصلة" },
      { en: "TIE residence card appointment within a month of arrival", ar: "موعد بطاقة الإقامة TIE خلال شهر من الوصول" },
      { en: "Padrón registration at your town hall, which unlocks healthcare and schools", ar: "التسجيل في السجل البلدي (padrón)، وهو ما يفتح لك الرعاية الصحية والمدارس" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Long-term residence comes after five years of continuous legal stay, with absences of no more than ten months in total. It carries full work rights and is renewed every five years as a formality.",
          ar: "تُمنح الإقامة طويلة الأمد بعد خمس سنوات من الإقامة القانونية المتصلة، بغياب لا يتجاوز عشرة أشهر إجمالًا. وتمنح حقوق عمل كاملة وتُجدَّد كل خمس سنوات كإجراء شكلي.",
        },
        citizenship: {
          en: "Ten years for most nationalities — but only two for citizens of Morocco's neighbours in Latin America, the Philippines, Equatorial Guinea, Portugal and Sephardic Jews. Spain does not generally allow dual nationality outside those countries, so most applicants must formally renounce.",
          ar: "عشر سنوات لمعظم الجنسيات — لكن سنتين فقط لمواطني دول أمريكا اللاتينية والفلبين وغينيا الاستوائية والبرتغال ولليهود السفارديم. ولا تسمح إسبانيا عمومًا بازدواج الجنسية خارج تلك الدول، لذا يضطر معظم المتقدمين للتخلي رسميًا عن جنسيتهم.",
        },
        rights: [
          { en: "Startup-law permits include your spouse and children in the same application.", ar: "تشمل تصاريح قانون الشركات الناشئة زوجك وأطفالك في الطلب نفسه." },
          { en: "Healthcare access follows padrón registration, even before your card arrives.", ar: "تتاح الرعاية الصحية بعد التسجيل البلدي، حتى قبل وصول بطاقتك." },
          { en: "After one year on a work permit you may change employer and region freely.", ar: "بعد سنة على تصريح العمل يمكنك تغيير صاحب العمل والمنطقة بحرية." },
          { en: "Arraigo routes can regularise people already in Spain after two to three years.", ar: "مسارات «التجذّر» يمكن أن تسوّي وضع المقيمين في إسبانيا بعد سنتين إلى ثلاث." },
        ],
        labourLaw: [
          { en: "40-hour week, 30 calendar days of paid leave, and 14 public holidays.", ar: "أسبوع ٤٠ ساعة، و٣٠ يومًا تقويميًا إجازة مدفوعة، و١٤ عطلة رسمية." },
          { en: "Salaries are usually quoted in 14 payments — 12 months plus two extra pagas.", ar: "تُذكر الرواتب عادةً على ١٤ دفعة — ١٢ شهرًا إضافة إلى دفعتين إضافيتين." },
          { en: "Dismissal without cause requires severance, typically 20 days' pay per year worked.", ar: "الفصل دون سبب يستوجب تعويضًا، عادةً أجر ٢٠ يومًا عن كل سنة عمل." },
          { en: "Temporary contracts are now legally restricted after a 2022 labour reform.", ar: "العقود المؤقتة صارت مقيّدة قانونًا بعد إصلاح العمل لعام ٢٠٢٢." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Technology hubs in Madrid, Barcelona and Valencia", ar: "مراكز التقنية في مدريد وبرشلونة وفالنسيا" },
          { en: "Tourism and hospitality, the largest single employer of migrants", ar: "السياحة والضيافة، أكبر مشغّل منفرد للمهاجرين" },
          { en: "Agriculture, recruited partly through bilateral agreements with Morocco", ar: "الزراعة، ويجري التوظيف فيها جزئيًا عبر اتفاقيات ثنائية مع المغرب" },
          { en: "Healthcare and elderly care in an ageing population", ar: "الرعاية الصحية ورعاية المسنين في مجتمع يشيخ" },
          { en: "Logistics and warehousing around the Mediterranean ports", ar: "الخدمات اللوجستية والمستودعات حول موانئ البحر المتوسط" },
        ],
        equivalency: {
          en: "Homologación through the Ministry of Universities is required for regulated professions and can take a year or more — start it before you move. For unregulated work, a simpler equivalencia or no recognition at all is normal. Trade qualifications are assessed separately through the vocational catalogue.",
          ar: "المعادلة عبر وزارة الجامعات مطلوبة للمهن المنظّمة وقد تستغرق سنة أو أكثر — ابدأها قبل انتقالك. أما الأعمال غير المنظّمة فتكفيها معادلة أبسط أو لا تحتاج اعترافًا أصلًا. وتُقيَّم المؤهلات الحرفية بشكل منفصل عبر الدليل المهني.",
        },
        wages: {
          en: "The minimum wage is roughly €1,320 gross across 14 payments. Developers earn €30,000–50,000 and seniors more in Madrid; hospitality and agriculture cluster near the minimum. Spain pays visibly less than northern Europe, which the cost of living only partly offsets.",
          ar: "الحد الأدنى للأجور نحو ١٣٢٠ يورو إجمالًا على ١٤ دفعة. ويكسب المطورون ٣٠٠٠٠–٥٠٠٠٠ يورو والخبراء أكثر في مدريد، بينما تتركز الضيافة والزراعة قرب الحد الأدنى. وتدفع إسبانيا أقل بوضوح من شمال أوروبا، وتكلفة المعيشة تعوّض ذلك جزئيًا فقط.",
        },
      },
      life: {
        housing: {
          en: "Rental supply in Madrid and Barcelona is tight and landlords often ask for two months' deposit plus an aval. Barcelona restricts short-term lets, which helps long-term supply. Valencia, Seville and Málaga are markedly cheaper for the same standard.",
          ar: "المعروض الإيجاري في مدريد وبرشلونة ضيّق، ويطلب الملاك غالبًا تأمينًا بشهرين مع ضمان بنكي. وتقيّد برشلونة الإيجارات قصيرة الأمد، ما يساعد المعروض طويل الأمد. وفالنسيا وإشبيلية ومالقة أرخص بوضوح لنفس المستوى.",
        },
        language: {
          en: "Spanish is essential outside international tech teams. Catalonia, the Basque Country and Galicia add a co-official language that matters for public sector work and schooling, though Spanish alone is enough day to day.",
          ar: "الإسبانية ضرورية خارج فرق التقنية الدولية. وتضيف كتالونيا وإقليم الباسك وغاليسيا لغة رسمية ثانية تهم العمل الحكومي والتعليم، وإن كانت الإسبانية وحدها تكفي في الحياة اليومية.",
        },
        integration: {
          en: "Register on the padrón immediately: it is the key to the health card, school places and most municipal services, and the years counted on it support later residency claims. Public healthcare is free at the point of use once you are in the system.",
          ar: "سجّل في السجل البلدي فورًا: فهو مفتاح البطاقة الصحية ومقاعد المدارس ومعظم الخدمات البلدية، والسنوات المحتسبة فيه تدعم طلبات الإقامة لاحقًا. والرعاية الصحية العامة مجانية عند الاستخدام بمجرد دخولك النظام.",
        },
        pros: [
          { en: "Startup-law permits are among the fastest in Europe at about 20 working days.", ar: "تصاريح قانون الشركات الناشئة من الأسرع في أوروبا بنحو ٢٠ يوم عمل." },
          { en: "Cost of living well below northern Europe for a similar standard.", ar: "تكلفة المعيشة أقل بكثير من شمال أوروبا لمستوى مماثل." },
          { en: "Two-year citizenship route for several nationalities, unusually short.", ar: "مسار جنسية بسنتين لعدة جنسيات، وهو قصير على غير المعتاد." },
          { en: "Strong Arabic-speaking communities in Madrid, Barcelona and the south.", ar: "جاليات ناطقة بالعربية قوية في مدريد وبرشلونة والجنوب." },
        ],
        cons: [
          { en: "Salaries are low relative to the rest of western Europe.", ar: "الرواتب منخفضة مقارنة ببقية غرب أوروبا." },
          { en: "Youth and general unemployment stay structurally high.", ar: "البطالة بين الشباب والبطالة العامة مرتفعتان هيكليًا." },
          { en: "Dual nationality is not permitted for most applicants.", ar: "ازدواج الجنسية غير مسموح لمعظم المتقدمين." },
          { en: "Degree homologación for regulated professions is genuinely slow.", ar: "معادلة الشهادات للمهن المنظّمة بطيئة فعلًا." },
        ],
      },
    },
  },

  {
    countryCode: "it",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Italy: the quota system, work permits and residency",
      ar: "الانتقال إلى إيطاليا: نظام الحصص وتصاريح العمل والإقامة",
    },
    summary: {
      en: "Most Italian work permits are rationed by an annual quota called the Decreto Flussi, which opens for a matter of hours. Missing that window usually means waiting a year, whatever your qualifications.",
      ar: "معظم تصاريح العمل الإيطالية محكومة بحصة سنوية تُسمى «مرسوم التدفقات»، وتُفتح لساعات معدودة. وتفويت تلك النافذة يعني عادةً انتظار سنة كاملة، مهما كانت مؤهلاتك.",
    },
    intro: {
      en: "Italy splits its routes in two. Quota-based permits cover most employment and are released on a click-day each year against a fixed national allocation. Outside the quota sit the EU Blue Card, intra-company transfers, research and self-employment in special categories — these can be applied for at any time, which makes them far more reliable if you qualify.",
      ar: "تقسّم إيطاليا مساراتها إلى قسمين. تصاريح الحصص تغطي معظم التوظيف وتُطرح في «يوم النقر» سنويًا مقابل مخصصات وطنية محددة. وخارج الحصص تقع البطاقة الزرقاء الأوروبية والنقل داخل الشركة والبحث والعمل الحر في فئات خاصة — ويمكن التقديم عليها في أي وقت، ما يجعلها أكثر موثوقية إن كنت مؤهلًا.",
    },
    routes: [
      {
        name: { en: "EU Blue Card (Carta Blu)", ar: "البطاقة الزرقاء الأوروبية" },
        who: {
          en: "Graduates or holders of five years' professional experience with a job offer above the salary threshold. Outside the quota, so no click-day, and it is the most dependable skilled route into Italy.",
          ar: "الخريجون أو أصحاب خمس سنوات خبرة مهنية مع عرض عمل يتجاوز حد الراتب. وهي خارج الحصص فلا تخضع ليوم النقر، وتُعدّ أكثر مسارات الكفاءات موثوقية إلى إيطاليا.",
        },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "€116 permit plus €50 visa", ar: "١١٦ يورو للتصريح إضافة إلى ٥٠ يورو للتأشيرة" },
      },
      {
        name: { en: "Decreto Flussi work permit", ar: "تصريح العمل ضمن مرسوم التدفقات" },
        who: {
          en: "Seasonal and non-seasonal workers in construction, tourism, transport, agriculture and care. Your employer must file the moment the portal opens; allocations are exhausted within hours.",
          ar: "العمال الموسميون وغير الموسميين في البناء والسياحة والنقل والزراعة والرعاية. ويجب أن يقدّم صاحب العمل الطلب فور فتح البوابة، إذ تُستنفد المخصصات خلال ساعات.",
        },
        processing: { en: "3–8 months after a successful filing", ar: "من ٣ إلى ٨ أشهر بعد التقديم الناجح" },
        cost: { en: "€116 plus employer costs", ar: "١١٦ يورو إضافة إلى تكاليف صاحب العمل" },
      },
      {
        name: { en: "Study and post-study conversion", ar: "الدراسة والتحويل بعد التخرج" },
        who: {
          en: "Students may work 20 hours a week and convert to a work permit on graduation without touching the quota — the most reliable back door into the Italian labour market.",
          ar: "يمكن للطلاب العمل ٢٠ ساعة أسبوعيًا والتحوّل إلى تصريح عمل عند التخرج دون المرور بالحصص — وهو أوثق باب خلفي إلى سوق العمل الإيطالي.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "€116 plus tuition", ar: "١١٦ يورو إضافة إلى الرسوم الدراسية" },
      },
    ],
    requirements: [
      { en: "Nulla osta work authorisation obtained by your employer before the visa", ar: "تصريح العمل (nulla osta) يحصل عليه صاحب العمل قبل التأشيرة" },
      { en: "Codice fiscale tax code, required for a contract, a lease or a bank account", ar: "الرمز الضريبي (codice fiscale)، ويلزم للعقد أو الإيجار أو الحساب البنكي" },
      { en: "Permesso di soggiorno application within eight days of arrival", ar: "طلب تصريح الإقامة خلال ثمانية أيام من الوصول" },
      { en: "Proof of suitable accommodation, certified by the local authority", ar: "إثبات سكن مناسب معتمد من السلطة المحلية" },
      { en: "Health cover through the SSN registration or private insurance", ar: "تغطية صحية عبر التسجيل في النظام الصحي الوطني أو تأمين خاص" },
      { en: "Declared and apostilled qualifications for regulated professions", ar: "مؤهلات معلنة ومصدّقة للمهن المنظّمة" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "The permesso di soggiorno UE per soggiornanti di lungo periodo comes after five years of legal residence, with adequate income and a proven A2 level of Italian. It has no expiry for work purposes, though the card is reissued periodically.",
          ar: "تُمنح الإقامة الأوروبية طويلة الأمد بعد خمس سنوات من الإقامة القانونية، مع دخل كافٍ ومستوى A2 مثبت في الإيطالية. ولا تنتهي صلاحيتها لأغراض العمل، وإن كانت البطاقة تُصدر من جديد دوريًا.",
        },
        citizenship: {
          en: "Ten years of continuous residence for non-EU nationals, reduced to four for EU citizens and three for those with an Italian parent or grandparent. B1 Italian is required. Italy permits dual nationality, and descent-based claims (jure sanguinis) bypass residency entirely.",
          ar: "عشر سنوات من الإقامة المتصلة لغير الأوروبيين، وتنخفض إلى أربع للأوروبيين وثلاث لمن له أب أو جد إيطالي. ويشترط مستوى B1 في الإيطالية. وتسمح إيطاليا بازدواج الجنسية، ومطالبات النسب تتجاوز شرط الإقامة تمامًا.",
        },
        rights: [
          { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
          { en: "Family reunion is available once you hold a permit valid for at least a year.", ar: "لمّ الشمل متاح بمجرد حصولك على تصريح صالح لسنة على الأقل." },
          { en: "Long-term permit holders may move to other EU states more easily.", ar: "حاملو التصريح طويل الأمد ينتقلون إلى دول أوروبية أخرى بسهولة أكبر." },
          { en: "Descent-based citizenship remains open to many with Italian ancestry.", ar: "الجنسية بالنسب تبقى متاحة لكثيرين من أصول إيطالية." },
        ],
        labourLaw: [
          { en: "40-hour week with four weeks of paid leave and 12 public holidays.", ar: "أسبوع ٤٠ ساعة مع أربعة أسابيع إجازة مدفوعة و١٢ عطلة رسمية." },
          { en: "A thirteenth-month salary is standard and often a fourteenth in some sectors.", ar: "الراتب الثالث عشر معتاد، وفي بعض القطاعات راتب رابع عشر أيضًا." },
          { en: "TFR severance accrues throughout employment and is paid when you leave.", ar: "مكافأة نهاية الخدمة (TFR) تتراكم طوال العمل وتُدفع عند مغادرتك." },
          { en: "National collective agreements (CCNL) set pay and conditions per sector.", ar: "الاتفاقيات الجماعية الوطنية (CCNL) تحدد الأجور والشروط لكل قطاع." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Manufacturing and mechanical engineering across the northern regions", ar: "التصنيع والهندسة الميكانيكية في الأقاليم الشمالية" },
          { en: "Tourism and hospitality, seasonal and very large", ar: "السياحة والضيافة، موسمية وضخمة الحجم" },
          { en: "Elderly care — badanti work is a major regularised migrant sector", ar: "رعاية المسنين — وهي قطاع مهاجر كبير ومنظّم" },
          { en: "Agriculture and food processing in the south", ar: "الزراعة وتصنيع الأغذية في الجنوب" },
          { en: "Fashion, design and logistics around Milan", ar: "الأزياء والتصميم والخدمات اللوجستية حول ميلانو" },
        ],
        equivalency: {
          en: "Regulated professions require riconoscimento from the relevant ministry — health qualifications through the Ministry of Health, teaching through the Ministry of Education. It is document-heavy and slow. For everything else a Dichiarazione di Valore from the Italian consulate in your country, or a CIMEA statement, is usually what employers and universities want.",
          ar: "المهن المنظّمة تتطلب اعترافًا من الوزارة المختصة — المؤهلات الصحية عبر وزارة الصحة، والتعليم عبر وزارة التعليم. والإجراء كثيف الأوراق وبطيء. أما بقية الحالات فيطلب أصحاب العمل والجامعات عادةً «إفادة القيمة» من القنصلية الإيطالية في بلدك أو إفادة من CIMEA.",
        },
        wages: {
          en: "Italy has no statutory minimum wage; pay floors come from sector agreements instead. Engineers start near €28,000–35,000 gross, developers €30,000–45,000, and the north pays substantially more than the south for identical work.",
          ar: "لا يوجد حد أدنى قانوني للأجور في إيطاليا، بل تأتي حدود الأجور من الاتفاقيات القطاعية. ويبدأ المهندسون بنحو ٢٨٠٠٠–٣٥٠٠٠ يورو إجمالًا، والمطورون ٣٠٠٠٠–٤٥٠٠٠، ويدفع الشمال أكثر بكثير من الجنوب للعمل نفسه.",
        },
      },
      life: {
        housing: {
          en: "Milan is the expensive outlier; Rome, Turin and Bologna cost noticeably less, and the south less again. Landlords commonly want a payslip and a guarantor, and contracts follow fixed formats (4+4 or 3+2 years) that are worth understanding before signing.",
          ar: "ميلانو هي الاستثناء المكلف، بينما تكلّف روما وتورينو وبولونيا أقل بوضوح، والجنوب أقل منها. ويطلب الملاك عادةً كشف راتب وكفيلًا، والعقود تتبع صيغًا ثابتة (٤+٤ أو ٣+٢ سنوات) يجدر فهمها قبل التوقيع.",
        },
        language: {
          en: "Italian is necessary almost everywhere. English-only workplaces exist in Milan finance and a handful of multinationals, but public administration, healthcare and most employers operate in Italian only.",
          ar: "الإيطالية ضرورية في كل مكان تقريبًا. وتوجد بيئات عمل بالإنجليزية فقط في قطاع المال بميلانو وحفنة من الشركات متعددة الجنسيات، لكن الإدارة العامة والرعاية الصحية ومعظم أصحاب العمل يعملون بالإيطالية وحدها.",
        },
        integration: {
          en: "Register with the anagrafe for residency and enrol in the SSN for a family doctor — health cover is broad and cheap once you are in. CPIA centres run free state Italian courses that also satisfy the A2 requirement for the long-term permit.",
          ar: "سجّل في السجل المدني للإقامة وانضم للنظام الصحي الوطني للحصول على طبيب أسرة — فالتغطية واسعة ورخيصة بمجرد دخولك. وتقدّم مراكز CPIA دورات إيطالية حكومية مجانية تفي أيضًا بشرط A2 للتصريح طويل الأمد.",
        },
        pros: [
          { en: "Healthcare is comprehensive and among the cheapest in western Europe.", ar: "الرعاية الصحية شاملة ومن الأرخص في غرب أوروبا." },
          { en: "Living costs outside Milan are low for a western European country.", ar: "تكاليف المعيشة خارج ميلانو منخفضة بالنسبة لدولة في غرب أوروبا." },
          { en: "Established migrant communities and well-trodden regularisation routes.", ar: "جاليات مهاجرة راسخة ومسارات تسوية أوضاع مطروقة." },
          { en: "Ancestry-based citizenship is open to a large diaspora.", ar: "الجنسية بالنسب متاحة لشتات واسع." },
        ],
        cons: [
          { en: "The quota system makes most work permits a lottery with a fixed date.", ar: "نظام الحصص يجعل معظم تصاريح العمل قرعة بموعد ثابت." },
          { en: "Wages are low and youth unemployment in the south is severe.", ar: "الأجور منخفضة والبطالة بين شباب الجنوب حادة." },
          { en: "Bureaucracy is slow even by regional standards.", ar: "البيروقراطية بطيئة حتى بمقاييس المنطقة." },
          { en: "Ten years to citizenship is among the longest in the EU.", ar: "عشر سنوات للجنسية من الأطول في الاتحاد الأوروبي." },
        ],
      },
    },
  },
];
