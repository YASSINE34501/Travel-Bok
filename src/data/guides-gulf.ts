import type { VisaGuide } from "@/lib/types";

/**
 * Gulf destination guides.
 *
 * One structural point applies to all six and is stated in each guide rather
 * than assumed: residence is tied to employment, and naturalisation is not a
 * realistic pathway for the overwhelming majority of foreign workers. Long-term
 * visa categories reduce the dependence on a single employer but do not change
 * that. Guides that omit this leave people planning for a future the system
 * does not offer.
 */
export const GULF_GUIDES: VisaGuide[] = [
  {
    countryCode: "sa",
    updatedAt: "2026-08-20",
    title: {
      en: "Working in Saudi Arabia: work visas, Premium Residency and Vision 2030",
      ar: "العمل في السعودية: تأشيرات العمل والإقامة المميزة ورؤية ٢٠٣٠",
    },
    summary: {
      en: "Saudi Arabia is hiring at scale for Vision 2030 projects, salaries are tax-free, and labour reforms have loosened the old sponsorship system. Residence still depends on your employer unless you buy into Premium Residency.",
      ar: "توظّف السعودية على نطاق واسع لمشاريع رؤية ٢٠٣٠، والرواتب معفاة من الضرائب، وإصلاحات العمل خفّفت نظام الكفالة القديم. لكن الإقامة تظل مرتبطة بصاحب عملك ما لم تحصل على الإقامة المميزة.",
    },
    intro: {
      en: "Your employer applies for a block visa, then a work visa, and you complete medical and biometric steps before travel. Since the 2021 Labour Reform Initiative, workers on a valid contract can transfer employer, obtain exit and re-entry permits and travel without the employer's consent in defined circumstances — a substantial change from the older kafala arrangement, though not its complete removal.",
      ar: "يتقدم صاحب عملك بطلب تأشيرة كتلة، ثم تأشيرة عمل، وتُنجز أنت الفحوصات الطبية والبصمة قبل السفر. ومنذ مبادرة إصلاح سوق العمل عام ٢٠٢١، يمكن للعامل بعقد ساري نقل الكفالة والحصول على تأشيرة خروج وعودة والسفر دون موافقة صاحب العمل في حالات محددة — وهو تغيير جوهري عن نظام الكفالة القديم، وإن لم يكن إلغاءً كاملًا له.",
    },
    routes: [
      {
        name: { en: "Standard work visa (iqama)", ar: "تأشيرة العمل الاعتيادية (الإقامة)" },
        who: {
          en: "Anyone with an offer from a Saudi-registered employer, who handles the block visa and converts it to an iqama after arrival. Renewed annually alongside your contract.",
          ar: "كل من لديه عرض من صاحب عمل مسجّل في السعودية، وهو من يتولى تأشيرة الكتلة ويحوّلها إلى إقامة بعد الوصول. وتُجدَّد سنويًا مع عقدك.",
        },
        processing: { en: "4–10 weeks", ar: "من ٤ إلى ١٠ أسابيع" },
        cost: { en: "Employer-paid; iqama and levies run SAR 7,000–10,000 a year", ar: "يتحملها صاحب العمل، ورسوم الإقامة والمقابل نحو ٧٠٠٠–١٠٠٠٠ ريال سنويًا" },
      },
      {
        name: { en: "Premium Residency", ar: "الإقامة المميزة" },
        who: {
          en: "Investors, entrepreneurs, exceptional talent and property owners. Grants residence without a sponsor, the right to own property and to run a business, in limited or renewable annual forms.",
          ar: "المستثمرون ورواد الأعمال وأصحاب المواهب الاستثنائية ومالكو العقارات. وتمنح إقامة دون كفيل، مع حق تملّك العقار وممارسة الأعمال، بصيغة دائمة محدودة أو سنوية قابلة للتجديد.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "SAR 100,000 annual or SAR 800,000 permanent, plus category fees", ar: "١٠٠٠٠٠ ريال سنويًا أو ٨٠٠٠٠٠ ريال دائمة، إضافة إلى رسوم الفئة" },
      },
      {
        name: { en: "Visit and business visit visas", ar: "تأشيرات الزيارة والزيارة التجارية" },
        who: {
          en: "For interviews, meetings and short assignments. These do not permit employment — working on a visit visa carries penalties and deportation risk.",
          ar: "للمقابلات والاجتماعات والمهام القصيرة. ولا تسمح بالعمل — فالعمل بتأشيرة زيارة يعرّضك لغرامات وخطر الترحيل.",
        },
        processing: { en: "Days to weeks", ar: "من أيام إلى أسابيع" },
        cost: { en: "SAR 300–500", ar: "من ٣٠٠ إلى ٥٠٠ ريال" },
      },
    ],
    requirements: [
      { en: "Degree attested by your foreign ministry and the Saudi embassy", ar: "شهادة مصدّقة من وزارة خارجية بلدك والسفارة السعودية" },
      { en: "Medical examination at an approved centre before travel", ar: "فحص طبي في مركز معتمد قبل السفر" },
      { en: "Police clearance certificate", ar: "شهادة خلو سوابق من الشرطة" },
      { en: "Professional accreditation for engineers, doctors, nurses and teachers", ar: "اعتماد مهني للمهندسين والأطباء والممرضين والمعلمين" },
      { en: "Employment contract registered in the Qiwa platform", ar: "عقد عمل مسجّل في منصة قوى" },
      { en: "Mandatory health insurance arranged by the employer", ar: "تأمين صحي إلزامي يوفّره صاحب العمل" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "There is no ordinary route to permanent residence through employment. The iqama is renewed annually and lapses when your job ends. Premium Residency is the only durable status available to most foreigners, and it is purchased rather than earned through years of residence.",
          ar: "لا يوجد مسار اعتيادي للإقامة الدائمة عبر العمل. فالإقامة تُجدَّد سنويًا وتسقط بانتهاء وظيفتك. والإقامة المميزة هي الوضع المستقر الوحيد المتاح لمعظم الأجانب، وتُشترى ولا تُكتسب بسنوات الإقامة.",
        },
        citizenship: {
          en: "Naturalisation is discretionary and exceptionally rare, granted by royal decree to individuals with distinguished expertise. No number of years of residence creates an entitlement. Plan on the basis that you will not naturalise.",
          ar: "التجنّس تقديري ونادر للغاية، ويُمنح بمرسوم ملكي لأصحاب الكفاءات المتميزة. ولا يخلق أي عدد من سنوات الإقامة استحقاقًا. خطّط على أساس أنك لن تحصل على الجنسية.",
        },
        rights: [
          { en: "Employer transfer is permitted after your first year, or immediately if the employer breaches the contract.", ar: "نقل الكفالة مسموح بعد سنتك الأولى، أو فورًا إذا أخلّ صاحب العمل بالعقد." },
          { en: "Exit and re-entry permits can now be requested by the worker directly.", ar: "يمكن للعامل الآن طلب تأشيرة الخروج والعودة مباشرة." },
          { en: "Family sponsorship requires a qualifying job title and minimum salary.", ar: "كفالة الأسرة تتطلب مسمى وظيفيًا مؤهلًا وحدًا أدنى للراتب." },
          { en: "Your passport is legally yours — an employer holding it is committing a violation.", ar: "جواز سفرك ملكك قانونًا — واحتجازه من صاحب العمل مخالفة." },
        ],
        labourLaw: [
          { en: "48-hour week, reduced to 36 during Ramadan for Muslim employees.", ar: "أسبوع ٤٨ ساعة، يُخفَّض إلى ٣٦ في رمضان للموظفين المسلمين." },
          { en: "21 days of annual leave, rising to 30 after five years of service.", ar: "٢١ يوم إجازة سنوية، ترتفع إلى ٣٠ بعد خمس سنوات خدمة." },
          { en: "End-of-service gratuity accrues per year worked and is paid on departure.", ar: "مكافأة نهاية الخدمة تتراكم عن كل سنة عمل وتُدفع عند المغادرة." },
          { en: "Wage Protection System monitors salary payments; report non-payment through Qiwa.", ar: "نظام حماية الأجور يراقب صرف الرواتب، وبلّغ عن التأخير عبر منصة قوى." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Construction and giga-projects — NEOM, the Red Sea, Qiddiya, Diriyah", ar: "البناء والمشاريع الكبرى — نيوم والبحر الأحمر والقدية والدرعية" },
          { en: "Energy, petrochemicals and the renewables build-out", ar: "الطاقة والبتروكيماويات والتوسع في الطاقة المتجددة" },
          { en: "Healthcare, with continuous demand for nurses and specialists", ar: "الرعاية الصحية، مع طلب مستمر على الممرضين والأخصائيين" },
          { en: "Education, particularly English teaching and higher education", ar: "التعليم، خاصة تدريس الإنجليزية والتعليم العالي" },
          { en: "Technology, finance and tourism under Vision 2030 diversification", ar: "التقنية والمالية والسياحة ضمن تنويع رؤية ٢٠٣٠" },
        ],
        equivalency: {
          en: "Attestation is the gate: your degree must be verified by your education ministry, your foreign ministry and the Saudi embassy before a work visa issues. Engineers register with the Saudi Council of Engineers, health workers are classified by the Saudi Commission for Health Specialties, both of which take weeks and should start before you sign.",
          ar: "التصديق هو البوابة: يجب اعتماد شهادتك من وزارة التعليم في بلدك ثم الخارجية ثم السفارة السعودية قبل صدور تأشيرة العمل. ويسجّل المهندسون في الهيئة السعودية للمهندسين، ويُصنَّف العاملون الصحيون لدى الهيئة السعودية للتخصصات الصحية، وكلاهما يستغرق أسابيع ويجدر البدء فيه قبل التوقيع.",
        },
        wages: {
          en: "Salaries are tax-free, which makes headline figures deceptive in your favour — but check what the package includes. Engineers earn SAR 150,000–260,000 a year, nurses SAR 84,000–132,000, teachers SAR 96,000–168,000. Housing and transport allowances are often separate line items worth 25–30% of base pay.",
          ar: "الرواتب معفاة من الضرائب، ما يجعل الأرقام المعلنة مضللة لصالحك — لكن تحقّق مما تشمله الحزمة. ويكسب المهندسون ١٥٠٠٠٠–٢٦٠٠٠٠ ريال سنويًا، والممرضون ٨٤٠٠٠–١٣٢٠٠٠، والمعلمون ٩٦٠٠٠–١٦٨٠٠٠. وبدلات السكن والمواصلات غالبًا بنود منفصلة تعادل ٢٥–٣٠٪ من الراتب الأساسي.",
        },
      },
      life: {
        housing: {
          en: "Rent is usually paid annually in advance, which is the biggest cash-flow shock for newcomers — budget for a full year up front unless your employer provides housing or an advance. Riyadh and Jeddah compounds cost considerably more than local neighbourhoods but offer different living arrangements.",
          ar: "يُدفع الإيجار عادةً سنويًا مقدمًا، وهي أكبر صدمة سيولة للقادمين الجدد — فاحسب حساب سنة كاملة مقدمًا ما لم يوفّر صاحب العمل السكن أو سلفة. ومجمعات الرياض وجدة أغلى بكثير من الأحياء المحلية لكنها تتيح نمط معيشة مختلفًا.",
        },
        language: {
          en: "Arabic is the official language and dominates government, healthcare administration and daily life outside corporate settings. English is standard in multinationals, healthcare delivery, engineering and the giga-projects.",
          ar: "العربية هي اللغة الرسمية وتهيمن على الحكومة وإدارة الرعاية الصحية والحياة اليومية خارج بيئات الشركات. والإنجليزية معتادة في الشركات متعددة الجنسيات وتقديم الرعاية الصحية والهندسة والمشاريع الكبرى.",
        },
        integration: {
          en: "Absher and Muqeem are the government apps that run your residency, exit permits and dependants — set them up immediately. Social rules have relaxed considerably in recent years, but they remain more conservative than the Gulf's smaller states; read the current position rather than older accounts.",
          ar: "تطبيقا أبشر ومقيم هما ما يدير إقامتك وتصاريح الخروج والمرافقين — فعّلهما فورًا. وقد تراجعت القيود الاجتماعية كثيرًا في السنوات الأخيرة، لكنها تبقى أكثر محافظة من دول الخليج الأصغر، فاطّلع على الوضع الحالي لا على روايات قديمة.",
        },
        pros: [
          { en: "Tax-free salaries with allowances that often add 25–30% on top.", ar: "رواتب معفاة من الضرائب مع بدلات تضيف غالبًا ٢٥–٣٠٪ فوقها." },
          { en: "Enormous hiring volume across the Vision 2030 project pipeline.", ar: "حجم توظيف هائل عبر مشاريع رؤية ٢٠٣٠." },
          { en: "Labour reforms have materially improved worker mobility since 2021.", ar: "إصلاحات العمل حسّنت تنقّل العمال بشكل ملموس منذ ٢٠٢١." },
          { en: "Arabic speakers face no language barrier at all.", ar: "الناطقون بالعربية لا يواجهون أي حاجز لغوي." },
        ],
        cons: [
          { en: "No path to permanent residence or citizenship through work.", ar: "لا مسار للإقامة الدائمة أو الجنسية عبر العمل." },
          { en: "Residence ends with the job, and dependants' status ends with yours.", ar: "الإقامة تنتهي بانتهاء الوظيفة، ووضع المرافقين ينتهي بانتهاء وضعك." },
          { en: "Annual advance rent is a heavy up-front cost.", ar: "الإيجار السنوي المقدّم تكلفة أولية ثقيلة." },
          { en: "Saudisation quotas restrict foreign hiring in a growing list of roles.", ar: "نسب السعودة تقيّد توظيف الأجانب في قائمة متزايدة من الوظائف." },
        ],
      },
    },
  },

  {
    countryCode: "qa",
    updatedAt: "2026-08-20",
    title: {
      en: "Working in Qatar: work visas, labour reform and residency",
      ar: "العمل في قطر: تأشيرات العمل وإصلاح العمل والإقامة",
    },
    summary: {
      en: "Qatar has gone furthest among the Gulf states in dismantling kafala: workers can change jobs without employer permission and a non-discriminatory minimum wage applies to everyone.",
      ar: "قطر هي الأبعد بين دول الخليج في تفكيك نظام الكفالة: إذ يمكن للعامل تغيير وظيفته دون إذن صاحب العمل، ويُطبَّق حد أدنى للأجور غير تمييزي على الجميع.",
    },
    intro: {
      en: "Since 2020 Qatar has removed the No Objection Certificate requirement for changing employer and abolished exit permits for most workers. A minimum wage of QAR 1,000 plus food and accommodation allowances applies regardless of nationality. These are meaningful reforms; enforcement still varies by employer, so the written contract matters.",
      ar: "منذ ٢٠٢٠ ألغت قطر شرط شهادة عدم الممانعة لتغيير صاحب العمل، وألغت تصاريح الخروج لمعظم العاملين. ويُطبَّق حد أدنى للأجور قدره ١٠٠٠ ريال مع بدلي طعام وسكن بغضّ النظر عن الجنسية. وهذه إصلاحات جوهرية، لكن التطبيق ما زال يتفاوت بين أصحاب العمل، لذا يبقى العقد المكتوب هو الفيصل.",
    },
    routes: [
      {
        name: { en: "Work residence permit", ar: "إقامة العمل" },
        who: {
          en: "Anyone with an offer from a Qatar-registered employer. The employer secures the entry visa and converts it to a residence permit after medical screening and biometrics.",
          ar: "كل من لديه عرض من صاحب عمل مسجّل في قطر. ويؤمّن صاحب العمل تأشيرة الدخول ويحوّلها إلى إقامة بعد الفحص الطبي والبصمة.",
        },
        processing: { en: "3–8 weeks", ar: "من ٣ إلى ٨ أسابيع" },
        cost: { en: "Employer-paid, typically QAR 3,000–6,000", ar: "يتحملها صاحب العمل، وعادةً ٣٠٠٠–٦٠٠٠ ريال" },
      },
      {
        name: { en: "Permanent residency permit", ar: "تصريح الإقامة الدائمة" },
        who: {
          en: "A capped annual number granted to long-term residents (20 years, or 10 if born in Qatar) with sufficient income and Arabic proficiency. Grants healthcare, education and some ownership rights.",
          ar: "عدد سنوي محدود يُمنح للمقيمين طويلي الأمد (٢٠ عامًا، أو ١٠ لمن وُلد في قطر) بدخل كافٍ وإتقان للعربية. ويمنح الرعاية الصحية والتعليم وبعض حقوق التملّك.",
        },
        processing: { en: "Several months; approval is discretionary", ar: "عدة أشهر، والموافقة تقديرية" },
        cost: { en: "Application fees vary", ar: "رسوم الطلب متفاوتة" },
      },
      {
        name: { en: "Investor and property residence", ar: "إقامة المستثمر والمالك العقاري" },
        who: {
          en: "Property owners above a qualifying value receive renewable residence for themselves and family, without an employer sponsor.",
          ar: "مالكو العقارات فوق قيمة محددة يحصلون على إقامة قابلة للتجديد لهم ولأسرهم، دون كفيل من أصحاب العمل.",
        },
        processing: { en: "4–8 weeks", ar: "من ٤ إلى ٨ أسابيع" },
        cost: { en: "Tied to the property investment threshold", ar: "مرتبطة بحد الاستثمار العقاري" },
      },
    ],
    requirements: [
      { en: "Attested educational certificates for professional roles", ar: "شهادات علمية مصدّقة للوظائف المهنية" },
      { en: "Medical screening and fingerprinting after arrival", ar: "فحص طبي وبصمة بعد الوصول" },
      { en: "Employment contract registered with the Ministry of Labour", ar: "عقد عمل مسجّل لدى وزارة العمل" },
      { en: "Health card registration for public healthcare access", ar: "تسجيل البطاقة الصحية للوصول إلى الرعاية الصحية العامة" },
      { en: "Police clearance from your home country", ar: "شهادة خلو سوابق من بلدك" },
      { en: "Professional licensing for medical, engineering and teaching roles", ar: "ترخيص مهني للوظائف الطبية والهندسية والتعليمية" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "A permanent residency permit exists but is capped at a small annual quota and requires twenty years of residence for most applicants, along with Arabic proficiency and adequate income. For nearly everyone, residence remains tied to employment.",
          ar: "توجد إقامة دائمة لكنها محدودة بحصة سنوية صغيرة وتتطلب عشرين عامًا من الإقامة لمعظم المتقدمين، مع إتقان العربية ودخل كافٍ. وبالنسبة لمعظم الناس تبقى الإقامة مرتبطة بالعمل.",
        },
        citizenship: {
          en: "Naturalisation is exceptionally restricted and effectively unavailable. Qatar does not permit dual nationality, and even the permanent residency permit does not lead to citizenship.",
          ar: "التجنّس مقيّد للغاية وغير متاح عمليًا. ولا تسمح قطر بازدواج الجنسية، وحتى تصريح الإقامة الدائمة لا يؤدي إلى الجنسية.",
        },
        rights: [
          { en: "You may change employer without a No Objection Certificate after notice.", ar: "يمكنك تغيير صاحب العمل دون شهادة عدم ممانعة بعد الإشعار." },
          { en: "Exit permits have been abolished for most private-sector workers.", ar: "أُلغيت تصاريح الخروج لمعظم العاملين في القطاع الخاص." },
          { en: "A non-discriminatory minimum wage applies to all nationalities.", ar: "حد أدنى للأجور غير تمييزي يُطبَّق على كل الجنسيات." },
          { en: "Family sponsorship requires a minimum salary and suitable housing.", ar: "كفالة الأسرة تتطلب حدًا أدنى للراتب وسكنًا مناسبًا." },
        ],
        labourLaw: [
          { en: "48-hour week, 36 during Ramadan, with overtime paid at a premium.", ar: "أسبوع ٤٨ ساعة، و٣٦ في رمضان، مع أجر إضافي للعمل الإضافي." },
          { en: "Minimum three weeks of annual leave, rising with service.", ar: "ثلاثة أسابيع إجازة سنوية كحد أدنى، وتزيد مع الخدمة." },
          { en: "End-of-service gratuity of at least three weeks' pay per year worked.", ar: "مكافأة نهاية خدمة لا تقل عن أجر ثلاثة أسابيع عن كل سنة عمل." },
          { en: "The Wage Protection System requires salaries to be paid into a Qatari bank account.", ar: "نظام حماية الأجور يشترط صرف الرواتب في حساب بنكي قطري." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Energy and LNG, the backbone of the economy", ar: "الطاقة والغاز الطبيعي المسال، عمود الاقتصاد" },
          { en: "Construction and infrastructure under the National Vision 2030", ar: "البناء والبنية التحتية ضمن رؤية قطر الوطنية ٢٠٣٠" },
          { en: "Healthcare through Hamad Medical Corporation and private providers", ar: "الرعاية الصحية عبر مؤسسة حمد الطبية ومقدمي الخدمات الخاصة" },
          { en: "Education, including international schools and Education City", ar: "التعليم، بما فيه المدارس الدولية والمدينة التعليمية" },
          { en: "Aviation, hospitality and sports event management", ar: "الطيران والضيافة وإدارة الفعاليات الرياضية" },
        ],
        equivalency: {
          en: "Degrees must be attested by your home authorities and the Qatari embassy. Healthcare professionals license through the Department of Healthcare Professions (QCHP), which requires an exam and verified experience; engineers register with the Ministry of Municipality (MME/UPDA), which grades you by qualification and years of practice.",
          ar: "يجب تصديق الشهادات من جهات بلدك والسفارة القطرية. ويُرخَّص العاملون الصحيون عبر إدارة المهن الصحية (QCHP) التي تشترط امتحانًا وخبرة موثّقة، ويسجّل المهندسون لدى وزارة البلدية (UPDA) التي تصنّفك حسب المؤهل وسنوات الممارسة.",
        },
        wages: {
          en: "Salaries are tax-free. The statutory minimum is QAR 1,000 plus QAR 300 food and QAR 500 housing allowance where not provided in kind. Engineers commonly earn QAR 15,000–30,000 a month, doctors and specialists considerably more.",
          ar: "الرواتب معفاة من الضرائب. والحد الأدنى القانوني ١٠٠٠ ريال إضافة إلى ٣٠٠ ريال بدل طعام و٥٠٠ ريال بدل سكن إن لم يُقدَّما عينًا. ويكسب المهندسون عادةً ١٥٠٠٠–٣٠٠٠٠ ريال شهريًا، والأطباء والأخصائيون أكثر بكثير.",
        },
      },
      life: {
        housing: {
          en: "Doha rents are high and, as elsewhere in the Gulf, often payable in several post-dated cheques. Many professional packages include accommodation or a housing allowance — confirm which before comparing an offer with one from Europe.",
          ar: "إيجارات الدوحة مرتفعة، وكما في بقية الخليج تُدفع غالبًا بشيكات مؤجلة متعددة. وكثير من الحزم المهنية تشمل السكن أو بدل سكن — تأكّد أيّهما قبل مقارنة العرض بعرض أوروبي.",
        },
        language: {
          en: "Arabic is official; English is the working language of business, healthcare and most professional environments. Government portals increasingly offer both.",
          ar: "العربية هي اللغة الرسمية، والإنجليزية لغة العمل في الأعمال والرعاية الصحية ومعظم البيئات المهنية. وبوابات الحكومة توفّر الاثنتين بشكل متزايد.",
        },
        integration: {
          en: "Register your health card early and use the Metrash2 app for residency, traffic and dependants. Qatar is small and heavily expatriate — around nine in ten residents are foreign — so professional communities form quickly.",
          ar: "سجّل بطاقتك الصحية مبكرًا واستخدم تطبيق مطراش٢ للإقامة والمرور والمرافقين. وقطر بلد صغير ذو أغلبية وافدة — نحو تسعة من كل عشرة مقيمين أجانب — لذا تتشكّل المجتمعات المهنية سريعًا.",
        },
        pros: [
          { en: "The most far-reaching labour reforms in the Gulf, including job mobility.", ar: "أوسع إصلاحات عمل في الخليج، وتشمل حرية تغيير الوظيفة." },
          { en: "Tax-free income with strong wage-protection enforcement.", ar: "دخل معفى من الضرائب مع تطبيق قوي لحماية الأجور." },
          { en: "Excellent healthcare and international schooling infrastructure.", ar: "بنية ممتازة للرعاية الصحية والمدارس الدولية." },
          { en: "Compact country with a short commute and a large expatriate majority.", ar: "بلد صغير المسافات مع تنقّل قصير وأغلبية وافدة كبيرة." },
        ],
        cons: [
          { en: "Permanent residency is quota-capped; citizenship is effectively closed.", ar: "الإقامة الدائمة محدودة بحصة، والجنسية مغلقة عمليًا." },
          { en: "Residence and your family's status both end with your job.", ar: "الإقامة ووضع أسرتك ينتهيان معًا بانتهاء وظيفتك." },
          { en: "High living costs, particularly rent and schooling.", ar: "تكاليف معيشة مرتفعة، خاصة الإيجار والتعليم." },
          { en: "Extreme summer heat limits outdoor life for months.", ar: "حرارة الصيف الشديدة تحدّ من الحياة في الخارج لأشهر." },
        ],
      },
    },
  },

  {
    countryCode: "kw",
    updatedAt: "2026-08-20",
    title: {
      en: "Working in Kuwait: work visas, sponsorship and residency",
      ar: "العمل في الكويت: تأشيرات العمل والكفالة والإقامة",
    },
    summary: {
      en: "Kuwait offers tax-free salaries and low utility costs, but retains a more traditional sponsorship system than Qatar or Saudi Arabia, and has tightened rules on foreign hiring in recent years.",
      ar: "تقدّم الكويت رواتب معفاة من الضرائب وتكاليف خدمات منخفضة، لكنها تحتفظ بنظام كفالة أكثر تقليدية من قطر أو السعودية، وشدّدت قواعد توظيف الأجانب في السنوات الأخيرة.",
    },
    intro: {
      en: "Your employer obtains a work permit from the Public Authority of Manpower, you enter on a work visa, then complete medical checks, fingerprinting and Civil ID registration. Transferring sponsor is possible but generally requires employer consent and a minimum period with your current sponsor — this is the main practical difference from Qatar.",
      ar: "يحصل صاحب عملك على إذن عمل من الهيئة العامة للقوى العاملة، وتدخل أنت بتأشيرة عمل، ثم تُنجز الفحوصات الطبية والبصمة وتسجيل البطاقة المدنية. ونقل الكفالة ممكن لكنه يتطلب عادةً موافقة صاحب العمل ومدة دنيا لديه — وهذا هو الفارق العملي الرئيسي عن قطر.",
    },
    routes: [
      {
        name: { en: "Private sector work visa (Article 18)", ar: "تأشيرة العمل في القطاع الخاص (المادة ١٨)" },
        who: {
          en: "The standard route for employees of private companies. Residence is renewed annually or biannually alongside the work permit.",
          ar: "المسار الاعتيادي لموظفي الشركات الخاصة. وتُجدَّد الإقامة سنويًا أو كل سنتين مع إذن العمل.",
        },
        processing: { en: "4–10 weeks", ar: "من ٤ إلى ١٠ أسابيع" },
        cost: { en: "Employer-paid, typically KWD 150–350", ar: "يتحملها صاحب العمل، وعادةً ١٥٠–٣٥٠ دينارًا" },
      },
      {
        name: { en: "Government sector visa (Article 17)", ar: "تأشيرة القطاع الحكومي (المادة ١٧)" },
        who: {
          en: "Doctors, teachers, engineers and specialists hired directly by ministries, typically on fixed-term contracts with housing included.",
          ar: "الأطباء والمعلمون والمهندسون والأخصائيون الذين توظّفهم الوزارات مباشرة، عادةً بعقود محددة المدة تشمل السكن.",
        },
        processing: { en: "2–4 months", ar: "من شهرين إلى أربعة أشهر" },
        cost: { en: "Covered by the hiring ministry", ar: "تتحملها الوزارة الموظِّفة" },
      },
      {
        name: { en: "Family residence (Article 22)", ar: "إقامة العائلة (المادة ٢٢)" },
        who: {
          en: "Dependants sponsored by a resident who meets the minimum salary requirement, currently around KWD 800 a month for most categories.",
          ar: "المرافقون بكفالة مقيم يستوفي الحد الأدنى للراتب، وهو حاليًا نحو ٨٠٠ دينار شهريًا لمعظم الفئات.",
        },
        processing: { en: "3–6 weeks", ar: "من ٣ إلى ٦ أسابيع" },
        cost: { en: "KWD 10–100 depending on category", ar: "من ١٠ إلى ١٠٠ دينار حسب الفئة" },
      },
    ],
    requirements: [
      { en: "Degree attested by your ministries and the Kuwaiti embassy", ar: "شهادة مصدّقة من وزارات بلدك والسفارة الكويتية" },
      { en: "Medical examination including screening tests before residence issues", ar: "فحص طبي يشمل تحاليل قبل إصدار الإقامة" },
      { en: "Fingerprinting at the Ministry of Interior", ar: "البصمة في وزارة الداخلية" },
      { en: "Civil ID registration within 30 days of residence issue", ar: "تسجيل البطاقة المدنية خلال ٣٠ يومًا من إصدار الإقامة" },
      { en: "Health insurance, which is compulsory for residents", ar: "تأمين صحي إلزامي للمقيمين" },
      { en: "Professional licence for medical and engineering practice", ar: "ترخيص مهني لممارسة الطب والهندسة" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "There is no permanent residence category. Residency is renewed in one- or two-year cycles and is entirely dependent on continuing employment or on being sponsored by a family member who is employed.",
          ar: "لا توجد فئة إقامة دائمة. فالإقامة تُجدَّد بدورات سنة أو سنتين وتعتمد كليًا على استمرار العمل أو على كفالة فرد من الأسرة يعمل.",
        },
        citizenship: {
          en: "Kuwaiti nationality is among the most difficult in the world to obtain and is not a realistic outcome for foreign workers. Dual nationality is not permitted.",
          ar: "الجنسية الكويتية من أصعب الجنسيات حصولًا في العالم وليست نتيجة واقعية للعاملين الأجانب. وازدواج الجنسية غير مسموح.",
        },
        rights: [
          { en: "Sponsor transfer usually requires employer consent plus a minimum period in the job.", ar: "نقل الكفالة يتطلب عادةً موافقة صاحب العمل ومدة دنيا في الوظيفة." },
          { en: "Family sponsorship depends on your salary and job title.", ar: "كفالة الأسرة تعتمد على راتبك ومسماك الوظيفي." },
          { en: "Residency lapses if you remain outside Kuwait beyond six months.", ar: "تسقط الإقامة إذا بقيت خارج الكويت أكثر من ستة أشهر." },
          { en: "Driving licence eligibility is tied to salary, degree and years of residence.", ar: "أهلية رخصة القيادة مرتبطة بالراتب والشهادة وسنوات الإقامة." },
        ],
        labourLaw: [
          { en: "48-hour week with overtime provisions in the private sector law.", ar: "أسبوع ٤٨ ساعة مع أحكام للعمل الإضافي في قانون القطاع الخاص." },
          { en: "30 days of annual leave after the first year of service.", ar: "٣٠ يوم إجازة سنوية بعد السنة الأولى من الخدمة." },
          { en: "End-of-service indemnity accrues per year and is paid on departure.", ar: "مكافأة نهاية الخدمة تتراكم سنويًا وتُدفع عند المغادرة." },
          { en: "Salaries must be paid through the Wage Protection System.", ar: "يجب صرف الرواتب عبر نظام حماية الأجور." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Oil, gas and petrochemicals, the dominant employer", ar: "النفط والغاز والبتروكيماويات، المشغّل المهيمن" },
          { en: "Healthcare, both government hospitals and private clinics", ar: "الرعاية الصحية، في المستشفيات الحكومية والعيادات الخاصة" },
          { en: "Education, especially international and bilingual schools", ar: "التعليم، خاصة المدارس الدولية وثنائية اللغة" },
          { en: "Construction and infrastructure contracting", ar: "البناء ومقاولات البنية التحتية" },
          { en: "Banking, finance and retail", ar: "المصارف والمالية والتجزئة" },
        ],
        equivalency: {
          en: "Attestation through your foreign ministry and the Kuwaiti embassy is mandatory before a residence permit issues, and the Ministry of Higher Education verifies that your institution is on its recognised list — check that list before enrolling anywhere. Health professionals license through the Ministry of Health, engineers through the Kuwait Society of Engineers.",
          ar: "التصديق عبر وزارة خارجية بلدك والسفارة الكويتية إلزامي قبل إصدار الإقامة، وتتحقق وزارة التعليم العالي من إدراج مؤسستك في قائمتها المعتمدة — راجع تلك القائمة قبل التسجيل في أي جامعة. ويُرخَّص العاملون الصحيون عبر وزارة الصحة، والمهندسون عبر جمعية المهندسين الكويتية.",
        },
        wages: {
          en: "Salaries are tax-free. Engineers typically earn KWD 700–1,500 a month, doctors and specialists KWD 1,500–3,000, teachers KWD 600–1,200. Housing allowance is a standard component of professional packages.",
          ar: "الرواتب معفاة من الضرائب. ويكسب المهندسون عادةً ٧٠٠–١٥٠٠ دينار شهريًا، والأطباء والأخصائيون ١٥٠٠–٣٠٠٠، والمعلمون ٦٠٠–١٢٠٠. وبدل السكن مكوّن معتاد في الحزم المهنية.",
        },
      },
      life: {
        housing: {
          en: "Rent is typically paid monthly rather than annually, which is easier on cash flow than Saudi Arabia or the UAE. Utilities are heavily subsidised and among the cheapest in the world, which noticeably lowers the monthly total.",
          ar: "يُدفع الإيجار عادةً شهريًا لا سنويًا، وهو أيسر على السيولة من السعودية أو الإمارات. والخدمات مدعومة بقوة ومن الأرخص عالميًا، ما يخفض الإجمالي الشهري بوضوح.",
        },
        language: {
          en: "Arabic is official and widely required in government dealings. English is common in business, healthcare and private schools, but less universally than in Dubai or Doha.",
          ar: "العربية رسمية ومطلوبة على نطاق واسع في المعاملات الحكومية. والإنجليزية شائعة في الأعمال والرعاية الصحية والمدارس الخاصة، لكن بدرجة أقل شمولًا من دبي أو الدوحة.",
        },
        integration: {
          en: "Your Civil ID is the document that matters — banking, healthcare, schooling and even a phone line depend on it, so complete registration promptly. Kuwait has long-established South Asian and Arab communities.",
          ar: "البطاقة المدنية هي الوثيقة الأهم — فالخدمات المصرفية والصحية والمدرسية وحتى خط الهاتف تعتمد عليها، فأنجز التسجيل سريعًا. وللكويت جاليات جنوب آسيوية وعربية راسخة منذ زمن.",
        },
        pros: [
          { en: "Tax-free income with very low utility and fuel costs.", ar: "دخل معفى من الضرائب مع تكاليف خدمات ووقود منخفضة جدًا." },
          { en: "Monthly rather than annual rent payment eases cash flow.", ar: "دفع الإيجار شهريًا لا سنويًا يخفف ضغط السيولة." },
          { en: "Strong demand in healthcare, oil and education.", ar: "طلب قوي في الرعاية الصحية والنفط والتعليم." },
          { en: "Established Arab communities and no language barrier for Arabic speakers.", ar: "جاليات عربية راسخة وبلا حاجز لغوي للناطقين بالعربية." },
        ],
        cons: [
          { en: "Sponsorship rules remain more restrictive than Qatar's reforms.", ar: "قواعد الكفالة تبقى أكثر تقييدًا من إصلاحات قطر." },
          { en: "No permanent residence and effectively no citizenship route.", ar: "لا إقامة دائمة ولا مسار جنسية عمليًا." },
          { en: "Kuwaitisation policies are steadily narrowing foreign hiring.", ar: "سياسات التكويت تضيّق توظيف الأجانب تدريجيًا." },
          { en: "Fewer leisure options than neighbouring Gulf states.", ar: "خيارات ترفيهية أقل من دول الخليج المجاورة." },
        ],
      },
    },
  },

  {
    countryCode: "om",
    updatedAt: "2026-08-20",
    title: {
      en: "Working in Oman: work visas, Investor Residency and life costs",
      ar: "العمل في عُمان: تأشيرات العمل وإقامة المستثمر وتكاليف الحياة",
    },
    summary: {
      en: "Oman is the Gulf's quietest and cheapest option: lower salaries than its neighbours, but markedly lower living costs and a long-term residency programme that does not depend on an employer.",
      ar: "عُمان هي الخيار الأهدأ والأرخص في الخليج: رواتب أقل من جيرانها، لكن تكاليف معيشة أدنى بوضوح، وبرنامج إقامة طويلة الأمد لا يعتمد على صاحب عمل.",
    },
    intro: {
      en: "Employment visas are employer-sponsored and issued through the Ministry of Labour, with a labour clearance step that checks the role against Omanisation quotas. Separately, the Investor Residency Programme grants five- or ten-year renewable residence to property buyers and investors, independent of any job.",
      ar: "تأشيرات العمل بكفالة صاحب العمل وتُصدر عبر وزارة العمل، مع خطوة تصريح عمل تتحقق من الوظيفة مقابل نسب التعمين. وبشكل منفصل، يمنح برنامج إقامة المستثمر إقامة قابلة للتجديد لخمس أو عشر سنوات لمشتري العقارات والمستثمرين، بمعزل عن أي وظيفة.",
    },
    routes: [
      {
        name: { en: "Employment visa", ar: "تأشيرة العمل" },
        who: {
          en: "Workers with an offer from an Omani-registered employer who has labour clearance for the role. Valid two years and renewable.",
          ar: "العاملون بعرض من صاحب عمل مسجّل في عُمان لديه تصريح عمل للوظيفة. صالحة سنتين وقابلة للتجديد.",
        },
        processing: { en: "3–8 weeks", ar: "من ٣ إلى ٨ أسابيع" },
        cost: { en: "OMR 200–300, employer-paid", ar: "من ٢٠٠ إلى ٣٠٠ ريال، يتحملها صاحب العمل" },
      },
      {
        name: { en: "Investor Residency Programme", ar: "برنامج إقامة المستثمر" },
        who: {
          en: "Property buyers and investors above set thresholds receive five- or ten-year renewable residence covering spouse, children and parents, with no employer sponsor required.",
          ar: "مشترو العقارات والمستثمرون فوق حدود محددة يحصلون على إقامة قابلة للتجديد لخمس أو عشر سنوات تشمل الزوج والأبناء والوالدين، دون حاجة لكفيل من أصحاب العمل.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "OMR 500–1,000 plus the qualifying investment", ar: "من ٥٠٠ إلى ١٠٠٠ ريال إضافة إلى الاستثمار المؤهل" },
      },
      {
        name: { en: "Family joining visa", ar: "تأشيرة التحاق العائلة" },
        who: {
          en: "Residents meeting the minimum salary requirement may sponsor spouse and children, subject to job category.",
          ar: "المقيمون الذين يستوفون الحد الأدنى للراتب يمكنهم كفالة الزوج والأبناء، حسب فئة الوظيفة.",
        },
        processing: { en: "2–6 weeks", ar: "من أسبوعين إلى ستة أسابيع" },
        cost: { en: "OMR 20–50 per dependant", ar: "من ٢٠ إلى ٥٠ ريالًا لكل مرافق" },
      },
    ],
    requirements: [
      { en: "Labour clearance obtained by the employer before the visa", ar: "تصريح عمل يحصل عليه صاحب العمل قبل التأشيرة" },
      { en: "Attested degree certificates for professional positions", ar: "شهادات علمية مصدّقة للوظائف المهنية" },
      { en: "Medical fitness certificate from an approved clinic", ar: "شهادة لياقة طبية من عيادة معتمدة" },
      { en: "Resident card registration with the Royal Oman Police", ar: "تسجيل بطاقة الإقامة لدى شرطة عُمان السلطانية" },
      { en: "Health insurance, mandatory for private sector workers", ar: "تأمين صحي إلزامي لعمال القطاع الخاص" },
      { en: "Professional licence for medical and engineering practice", ar: "ترخيص مهني لممارسة الطب والهندسة" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Employment-based residence is renewed in two-year cycles and ends with the job. The Investor Residency Programme is the only long-term status available, granting five or ten years renewable and extending to immediate family.",
          ar: "الإقامة القائمة على العمل تُجدَّد بدورات سنتين وتنتهي بانتهاء الوظيفة. وبرنامج إقامة المستثمر هو الوضع طويل الأمد الوحيد المتاح، ويمنح خمس أو عشر سنوات قابلة للتجديد ويمتد للأسرة المباشرة.",
        },
        citizenship: {
          en: "Naturalisation is possible in principle after long residence, Arabic proficiency and other conditions, but is granted rarely and at the state's discretion. Oman does not permit dual nationality.",
          ar: "التجنّس ممكن مبدئيًا بعد إقامة طويلة وإتقان العربية وشروط أخرى، لكنه يُمنح نادرًا وبتقدير الدولة. ولا تسمح عُمان بازدواج الجنسية.",
        },
        rights: [
          { en: "Investor residency removes dependence on an employer sponsor.", ar: "إقامة المستثمر تلغي الاعتماد على كفيل من أصحاب العمل." },
          { en: "Changing employer generally requires a No Objection Certificate.", ar: "تغيير صاحب العمل يتطلب عمومًا شهادة عدم ممانعة." },
          { en: "Foreigners may own property in designated integrated tourism complexes.", ar: "يمكن للأجانب تملّك العقارات في المجمعات السياحية المتكاملة المحددة." },
          { en: "Family sponsorship depends on meeting the salary threshold for your category.", ar: "كفالة الأسرة تعتمد على استيفاء حد الراتب لفئتك." },
        ],
        labourLaw: [
          { en: "45-hour week, reduced during Ramadan for Muslim employees.", ar: "أسبوع ٤٥ ساعة، يُخفَّض في رمضان للموظفين المسلمين." },
          { en: "30 days of annual leave after one year of service.", ar: "٣٠ يوم إجازة سنوية بعد سنة من الخدمة." },
          { en: "End-of-service benefits are payable on completion of the contract.", ar: "مستحقات نهاية الخدمة تُدفع عند إتمام العقد." },
          { en: "Omanisation quotas reserve defined percentages of roles for nationals.", ar: "نسب التعمين تخصص نسبًا محددة من الوظائف للمواطنين." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Oil, gas and the growing green hydrogen sector", ar: "النفط والغاز وقطاع الهيدروجين الأخضر المتنامي" },
          { en: "Logistics and ports, especially Duqm and Sohar", ar: "الخدمات اللوجستية والموانئ، خاصة الدقم وصحار" },
          { en: "Tourism and hospitality, a national diversification priority", ar: "السياحة والضيافة، وهي أولوية تنويع وطنية" },
          { en: "Healthcare and education", ar: "الرعاية الصحية والتعليم" },
          { en: "Construction and infrastructure", ar: "البناء والبنية التحتية" },
        ],
        equivalency: {
          en: "Degrees require attestation through your foreign ministry and the Omani embassy, and the Ministry of Higher Education maintains a list of recognised institutions. Medical staff license through the Oman Medical Specialty Board, engineers through the Oman Society of Engineers.",
          ar: "تتطلب الشهادات تصديقًا عبر وزارة خارجية بلدك والسفارة العُمانية، وتحتفظ وزارة التعليم العالي بقائمة مؤسسات معترف بها. ويُرخَّص الطاقم الطبي عبر المجلس العُماني للاختصاصات الطبية، والمهندسون عبر الجمعية العُمانية للمهندسين.",
        },
        wages: {
          en: "Salaries are tax-free but lower than in the UAE, Qatar or Saudi Arabia. Engineers typically earn OMR 800–1,800 a month and healthcare professionals OMR 900–2,000. Living costs are correspondingly lower, so net saving capacity can be comparable.",
          ar: "الرواتب معفاة من الضرائب لكنها أقل من الإمارات وقطر والسعودية. ويكسب المهندسون عادةً ٨٠٠–١٨٠٠ ريال شهريًا، والعاملون الصحيون ٩٠٠–٢٠٠٠. وتكاليف المعيشة أقل بالمقابل، فقد تكون القدرة الصافية على الادخار متقاربة.",
        },
      },
      life: {
        housing: {
          en: "Muscat rents are the lowest of any Gulf capital for comparable quality, and payment terms are usually monthly or quarterly rather than a year in advance. Housing outside the capital is cheaper again.",
          ar: "إيجارات مسقط الأدنى بين عواصم الخليج لجودة مماثلة، وشروط الدفع عادةً شهرية أو ربع سنوية لا سنوية مقدمًا. والسكن خارج العاصمة أرخص أيضًا.",
        },
        language: {
          en: "Arabic is the official language and is used more widely in daily life than in Dubai or Doha. English is standard in professional and healthcare settings, and Omanis in cities generally speak it well.",
          ar: "العربية هي اللغة الرسمية وتُستخدم في الحياة اليومية أوسع من دبي أو الدوحة. والإنجليزية معتادة في البيئات المهنية والصحية، والعُمانيون في المدن يجيدونها عمومًا.",
        },
        integration: {
          en: "Oman is more socially conservative in public life than the UAE but is widely described as relaxed and welcoming in daily interaction. The expatriate community is smaller, which makes integration with Omani colleagues more common than in the larger Gulf hubs.",
          ar: "عُمان أكثر محافظة في الحياة العامة من الإمارات لكنها توصف على نطاق واسع بأنها هادئة ومرحّبة في التعامل اليومي. والجالية الأجنبية أصغر، ما يجعل الاندماج مع الزملاء العُمانيين أكثر شيوعًا من المراكز الخليجية الأكبر.",
        },
        pros: [
          { en: "The lowest cost of living in the Gulf, especially housing.", ar: "أدنى تكلفة معيشة في الخليج، خاصة السكن." },
          { en: "Investor residency gives long-term status without an employer.", ar: "إقامة المستثمر تمنح وضعًا طويل الأمد دون صاحب عمل." },
          { en: "Tax-free income and rent usually payable monthly.", ar: "دخل معفى من الضرائب وإيجار يُدفع شهريًا عادةً." },
          { en: "Exceptional natural landscape and a slower pace of life.", ar: "طبيعة استثنائية وإيقاع حياة أهدأ." },
        ],
        cons: [
          { en: "Salaries are the lowest among the Gulf states.", ar: "الرواتب الأدنى بين دول الخليج." },
          { en: "Omanisation quotas are tightening across many sectors.", ar: "نسب التعمين تتشدّد في قطاعات كثيرة." },
          { en: "Changing employer usually needs a No Objection Certificate.", ar: "تغيير صاحب العمل يحتاج عادةً شهادة عدم ممانعة." },
          { en: "A smaller job market with fewer openings at senior level.", ar: "سوق عمل أصغر بفرص أقل في المستويات العليا." },
        ],
      },
    },
  },

  {
    countryCode: "bh",
    updatedAt: "2026-08-20",
    title: {
      en: "Working in Bahrain: flexible permits, self-sponsorship and residency",
      ar: "العمل في البحرين: التصاريح المرنة والكفالة الذاتية والإقامة",
    },
    summary: {
      en: "Bahrain is the only Gulf state that lets some foreign workers sponsor themselves. The Flexi Permit and Golden Residency both break the link between your job and your right to stay.",
      ar: "البحرين هي دولة الخليج الوحيدة التي تتيح لبعض العمال الأجانب كفالة أنفسهم. فالتصريح المرن والإقامة الذهبية كلاهما يفصل بين وظيفتك وحقك في البقاء.",
    },
    intro: {
      en: "Standard employment still runs through employer sponsorship via the Labour Market Regulatory Authority. What sets Bahrain apart are the alternatives: the Flexi Permit, which allows eligible workers to work for multiple employers without a sponsor, and Golden Residency, which grants indefinite renewable residence based on income, property or talent.",
      ar: "التوظيف الاعتيادي ما زال يمر عبر كفالة صاحب العمل من خلال هيئة تنظيم سوق العمل. لكن ما يميّز البحرين هو البدائل: التصريح المرن الذي يتيح للعاملين المؤهلين العمل لدى أصحاب عمل متعددين دون كفيل، والإقامة الذهبية التي تمنح إقامة غير محددة قابلة للتجديد بناءً على الدخل أو العقار أو الموهبة.",
    },
    routes: [
      {
        name: { en: "Standard work visa", ar: "تأشيرة العمل الاعتيادية" },
        who: {
          en: "Employees sponsored by a Bahrain-registered employer through the LMRA. Typically valid two years and renewable.",
          ar: "الموظفون بكفالة صاحب عمل مسجّل في البحرين عبر هيئة تنظيم سوق العمل. وعادةً صالحة سنتين وقابلة للتجديد.",
        },
        processing: { en: "2–6 weeks", ar: "من أسبوعين إلى ستة أسابيع" },
        cost: { en: "BHD 200–300, employer-paid", ar: "من ٢٠٠ إلى ٣٠٠ دينار، يتحملها صاحب العمل" },
      },
      {
        name: { en: "Golden Residency", ar: "الإقامة الذهبية" },
        who: {
          en: "Residents of five years with a qualifying salary, property owners above a threshold, retirees with pension income, and recognised talent. Indefinite renewable residence with the right to work and sponsor family.",
          ar: "المقيمون منذ خمس سنوات براتب مؤهل، ومالكو العقارات فوق حد معين، والمتقاعدون بدخل تقاعدي، وأصحاب المواهب المعترف بها. وتمنح إقامة غير محددة قابلة للتجديد مع حق العمل وكفالة الأسرة.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "BHD 300 application plus renewal fees", ar: "٣٠٠ دينار للطلب إضافة إلى رسوم التجديد" },
      },
      {
        name: { en: "Flexi Permit", ar: "التصريح المرن" },
        who: {
          en: "Eligible workers already in Bahrain who wish to work without a single sponsor, across multiple employers. Renewable in one- or two-year terms.",
          ar: "العاملون المؤهلون الموجودون في البحرين ويرغبون في العمل دون كفيل واحد، لدى أصحاب عمل متعددين. قابل للتجديد لمدة سنة أو سنتين.",
        },
        processing: { en: "2–4 weeks", ar: "من أسبوعين إلى أربعة أسابيع" },
        cost: { en: "About BHD 449 for two years plus monthly fees", ar: "نحو ٤٤٩ دينارًا لسنتين إضافة إلى رسوم شهرية" },
      },
    ],
    requirements: [
      { en: "LMRA work permit obtained by the employer, or a Flexi Permit application", ar: "إذن عمل من هيئة تنظيم سوق العمل يستخرجه صاحب العمل، أو طلب تصريح مرن" },
      { en: "Attested qualifications for professional and licensed roles", ar: "مؤهلات مصدّقة للوظائف المهنية والمرخّصة" },
      { en: "Medical examination at an approved centre", ar: "فحص طبي في مركز معتمد" },
      { en: "CPR (Central Population Registry) card registration", ar: "تسجيل بطاقة السجل السكاني المركزي (CPR)" },
      { en: "Compulsory health insurance contribution", ar: "اشتراك تأمين صحي إلزامي" },
      { en: "Professional licensing through NHRA for healthcare roles", ar: "ترخيص مهني عبر الهيئة الوطنية لتنظيم المهن الصحية للوظائف الصحية" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Golden Residency is the closest thing to permanent status in the Gulf: indefinite and renewable, it survives a change of job and covers your family. It is the main reason Bahrain appeals to people who want Gulf income without Gulf precarity.",
          ar: "الإقامة الذهبية هي الأقرب إلى الوضع الدائم في الخليج: غير محددة وقابلة للتجديد، وتبقى رغم تغيير الوظيفة وتشمل أسرتك. وهي السبب الرئيسي لجاذبية البحرين لمن يريد دخل الخليج دون هشاشة أوضاعه.",
        },
        citizenship: {
          en: "Naturalisation requires long residence — commonly cited at 25 years for non-Arabs and 15 for Arab nationals — plus Arabic proficiency, and remains discretionary and rarely granted. Do not plan around it.",
          ar: "يتطلب التجنّس إقامة طويلة — يُشار عادةً إلى ٢٥ عامًا لغير العرب و١٥ للعرب — مع إتقان العربية، ويبقى تقديريًا ونادر المنح. لا تبنِ خططك عليه.",
        },
        rights: [
          { en: "Flexi Permit holders work without a sponsor and may change employers freely.", ar: "حاملو التصريح المرن يعملون دون كفيل ويمكنهم تغيير أصحاب العمل بحرية." },
          { en: "Golden Residency survives loss of employment and covers dependants.", ar: "الإقامة الذهبية تبقى رغم فقدان العمل وتشمل المرافقين." },
          { en: "Foreigners may own freehold property in designated areas.", ar: "يمكن للأجانب التملّك الحر في مناطق محددة." },
          { en: "Bahrain does not permit dual nationality for naturalised citizens.", ar: "لا تسمح البحرين بازدواج الجنسية للمتجنسين." },
        ],
        labourLaw: [
          { en: "48-hour week, 36 during Ramadan for Muslim employees.", ar: "أسبوع ٤٨ ساعة، و٣٦ في رمضان للموظفين المسلمين." },
          { en: "30 days of annual leave after one year of continuous service.", ar: "٣٠ يوم إجازة سنوية بعد سنة من الخدمة المتصلة." },
          { en: "End-of-service gratuity is payable on termination of the contract.", ar: "مكافأة نهاية الخدمة تُدفع عند إنهاء العقد." },
          { en: "The LMRA regulates permits and handles worker complaints.", ar: "هيئة تنظيم سوق العمل تنظّم التصاريح وتتعامل مع شكاوى العمال." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Banking and financial services — the Gulf's oldest finance hub", ar: "المصارف والخدمات المالية — أقدم مركز مالي في الخليج" },
          { en: "Fintech and regulated digital finance", ar: "التقنية المالية والتمويل الرقمي المنظّم" },
          { en: "Aluminium production and heavy manufacturing", ar: "إنتاج الألمنيوم والصناعات الثقيلة" },
          { en: "Healthcare and private clinics", ar: "الرعاية الصحية والعيادات الخاصة" },
          { en: "Hospitality, retail and logistics", ar: "الضيافة والتجزئة والخدمات اللوجستية" },
        ],
        equivalency: {
          en: "Attestation through your foreign ministry and the Bahraini embassy is required for professional roles. Healthcare licensing runs through the NHRA with an examination and verified experience; engineers register with the Council for Regulating the Practice of Engineering Professions.",
          ar: "التصديق عبر وزارة خارجية بلدك والسفارة البحرينية مطلوب للوظائف المهنية. ويمر ترخيص الرعاية الصحية عبر الهيئة الوطنية لتنظيم المهن الصحية بامتحان وخبرة موثّقة، ويسجّل المهندسون لدى مجلس تنظيم مزاولة المهن الهندسية.",
        },
        wages: {
          en: "Salaries are tax-free but sit below Qatar and the UAE. Finance professionals earn BHD 800–2,500 a month, engineers BHD 700–1,600, healthcare staff BHD 700–1,800. Living costs are the second lowest in the Gulf after Oman.",
          ar: "الرواتب معفاة من الضرائب لكنها أدنى من قطر والإمارات. ويكسب مهنيو المالية ٨٠٠–٢٥٠٠ دينار شهريًا، والمهندسون ٧٠٠–١٦٠٠، والعاملون الصحيون ٧٠٠–١٨٠٠. وتكاليف المعيشة الثانية الأدنى في الخليج بعد عُمان.",
        },
      },
      life: {
        housing: {
          en: "Manama rents are moderate by Gulf standards and typically paid monthly. The island is small enough that commuting is short from almost anywhere, and many residents commute to Saudi Arabia over the King Fahd Causeway.",
          ar: "إيجارات المنامة معتدلة بمقاييس الخليج وتُدفع شهريًا عادةً. والجزيرة صغيرة بما يكفي لتكون المسافات قصيرة من أي مكان تقريبًا، ويتنقل كثير من المقيمين إلى السعودية عبر جسر الملك فهد.",
        },
        language: {
          en: "Arabic is official and English is very widely used in business, banking and healthcare. Bahrain is among the easiest Gulf states to operate in with English alone.",
          ar: "العربية رسمية والإنجليزية مستخدمة على نطاق واسع جدًا في الأعمال والمصارف والرعاية الصحية. والبحرين من أيسر دول الخليج للعمل بالإنجليزية وحدها.",
        },
        integration: {
          en: "Your CPR card is the key document for banking, healthcare and housing. Bahrain is generally regarded as the most socially liberal of the Gulf states, with a long-settled and diverse expatriate population.",
          ar: "بطاقة CPR هي الوثيقة المفتاح للخدمات المصرفية والصحية والسكن. وتُعدّ البحرين عمومًا الأكثر انفتاحًا اجتماعيًا بين دول الخليج، بجالية أجنبية متنوعة ومستقرة منذ زمن طويل.",
        },
        pros: [
          { en: "Flexi Permit and Golden Residency allow life without an employer sponsor.", ar: "التصريح المرن والإقامة الذهبية يتيحان الحياة دون كفيل." },
          { en: "Tax-free income with living costs well below Dubai or Doha.", ar: "دخل معفى من الضرائب مع تكاليف معيشة أدنى بكثير من دبي أو الدوحة." },
          { en: "Established financial sector with genuine career depth.", ar: "قطاع مالي راسخ بعمق مهني حقيقي." },
          { en: "The most socially open environment in the Gulf.", ar: "البيئة الأكثر انفتاحًا اجتماعيًا في الخليج." },
        ],
        cons: [
          { en: "Salaries are lower than in Qatar, the UAE and Saudi Arabia.", ar: "الرواتب أقل من قطر والإمارات والسعودية." },
          { en: "A small job market limits senior-level opportunities.", ar: "سوق عمل صغير يحدّ من الفرص في المستويات العليا." },
          { en: "Citizenship remains effectively closed after decades of residence.", ar: "الجنسية تبقى مغلقة عمليًا حتى بعد عقود من الإقامة." },
          { en: "Bahrainisation quotas apply to many private-sector roles.", ar: "نسب البحرنة تنطبق على كثير من وظائف القطاع الخاص." },
        ],
      },
    },
  },
];
