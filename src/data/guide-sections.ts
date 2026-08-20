import type { GuideSections } from "@/lib/types";

/**
 * Standardised sections for the original eight guides, which predate the
 * schema. Keyed by country code and merged onto those guides in guides.ts so
 * every country answers the same questions in the same order.
 */
export const GUIDE_SECTIONS: Record<string, GuideSections> = {
  de: {
    residency: {
      permanent: {
        en: "A settlement permit (Niederlassungserlaubnis) comes after five years of contributions, or 33 months on an EU Blue Card — 21 months with German at B1. Skilled workers with recognised vocational qualifications can also reach it in four years.",
        ar: "تُمنح تصريح الاستقرار بعد خمس سنوات من الاشتراكات، أو ٣٣ شهرًا على البطاقة الزرقاء الأوروبية — و٢١ شهرًا مع ألمانية بمستوى B1. ويمكن للعمال المهرة بمؤهلات مهنية معترف بها الوصول إليه في أربع سنوات أيضًا.",
      },
      citizenship: {
        en: "Reforms have cut the standard route to five years, or three with exceptional integration and C1 German. B1 German and proof you can support yourself without benefits are required, plus a naturalisation test.",
        ar: "خفّضت الإصلاحات المسار المعتاد إلى خمس سنوات، أو ثلاث مع اندماج استثنائي وألمانية بمستوى C1. ويشترط الألمانية بمستوى B1 وإثبات قدرتك على إعالة نفسك دون إعانات، إضافة إلى اختبار التجنّس.",
      },
      rights: [
        { en: "Germany now permits dual nationality, a major change from the previous rule.", ar: "تسمح ألمانيا الآن بازدواج الجنسية، وهو تغيير كبير عن القاعدة السابقة." },
        { en: "Blue Card holders may change employer after the first year without approval.", ar: "يمكن لحاملي البطاقة الزرقاء تغيير صاحب العمل بعد السنة الأولى دون موافقة." },
        { en: "Spouses of Blue Card and skilled worker permit holders get full work rights.", ar: "أزواج حاملي البطاقة الزرقاء وتصريح العامل الماهر يحصلون على حقوق عمل كاملة." },
        { en: "Children born in Germany to long-term residents acquire citizenship at birth.", ar: "الأطفال المولودون في ألمانيا لمقيمين طويلي الأمد يكتسبون الجنسية عند الولادة." },
      ],
      labourLaw: [
        { en: "Statutory minimum wage applies to nearly all employees and rises regularly.", ar: "الحد الأدنى القانوني للأجور ينطبق على جميع الموظفين تقريبًا ويرتفع دوريًا." },
        { en: "Minimum 20 days of paid leave on a five-day week; 25–30 is the norm in practice.", ar: "٢٠ يوم إجازة مدفوعة كحد أدنى لأسبوع من خمسة أيام، و٢٥–٣٠ هو المعتاد عمليًا." },
        { en: "Strong dismissal protection applies after six months in firms above ten staff.", ar: "حماية قوية من الفصل تسري بعد ستة أشهر في المنشآت التي تتجاوز عشرة موظفين." },
        { en: "Works councils give employees a formal voice in larger companies.", ar: "مجالس العمل تمنح الموظفين صوتًا رسميًا في الشركات الكبرى." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Engineering and automotive, concentrated in Bavaria and Baden-Württemberg", ar: "الهندسة وصناعة السيارات، وتتركز في بافاريا وبادن-فورتمبيرغ" },
        { en: "IT and software, with English-only teams common in Berlin and Munich", ar: "تقنية المعلومات والبرمجيات، مع شيوع فرق تعمل بالإنجليزية في برلين وميونخ" },
        { en: "Healthcare and elderly care, a structural and long-term shortage", ar: "الرعاية الصحية ورعاية المسنين، نقص هيكلي وطويل الأمد" },
        { en: "Skilled trades — electricians, plumbers, welders — on the shortage list", ar: "الحرف الماهرة — كهربائيون وسبّاكون ولحّامون — على قائمة النقص" },
        { en: "Logistics, rail and renewable energy infrastructure", ar: "الخدمات اللوجستية والسكك الحديدية وبنية الطاقة المتجددة" },
      ],
      equivalency: {
        en: "Recognition (Anerkennung) is the real bottleneck, not the job market. Vocational qualifications go through the relevant chamber (IHK or HWK), university degrees through the anabin database, and regulated health professions through the state authority. Budget three to six months and start before you apply for jobs.",
        ar: "المعادلة (Anerkennung) هي العائق الحقيقي لا سوق العمل. فالمؤهلات المهنية تمر عبر الغرفة المختصة (IHK أو HWK)، والشهادات الجامعية عبر قاعدة بيانات anabin، والمهن الصحية المنظّمة عبر سلطة الولاية. احسب من ثلاثة إلى ستة أشهر وابدأ قبل التقديم على الوظائف.",
      },
      wages: {
        en: "Median gross pay is around €4,300 a month. Software developers earn €55,000–85,000 a year, engineers €52,000–78,000, nurses €38,000–52,000. Deductions are heavy — roughly 35–45% of gross goes to tax and social contributions.",
        ar: "الأجر الوسيط الإجمالي نحو ٤٣٠٠ يورو شهريًا. ويكسب مطورو البرمجيات ٥٥٠٠٠–٨٥٠٠٠ يورو سنويًا، والمهندسون ٥٢٠٠٠–٧٨٠٠٠، والممرضون ٣٨٠٠٠–٥٢٠٠٠. والاستقطاعات ثقيلة — نحو ٣٥–٤٥٪ من الإجمالي تذهب للضرائب والاشتراكات الاجتماعية.",
      },
    },
    life: {
      housing: {
        en: "Rental markets in Munich, Berlin, Hamburg and Frankfurt are severely constrained; viewings draw dozens of applicants and landlords ask for a SCHUFA credit report you will not have on arrival. Expect an unfurnished flat to arrive without a kitchen.",
        ar: "أسواق الإيجار في ميونخ وبرلين وهامبورغ وفرانكفورت مضغوطة بشدة، والمعاينات تجذب عشرات المتقدمين، ويطلب الملاك تقرير SCHUFA الائتماني الذي لن يكون بحوزتك عند الوصول. وتوقّع أن تصلك الشقة غير المفروشة بلا مطبخ.",
      },
      language: {
        en: "English works in tech, research and multinationals. Everything else — administration, healthcare, schools, most employers — runs in German, and B1 is a legal condition for citizenship.",
        ar: "الإنجليزية تكفي في التقنية والبحث والشركات متعددة الجنسيات. وكل ما عداها — الإدارة والرعاية الصحية والمدارس ومعظم أصحاب العمل — يعمل بالألمانية، ومستوى B1 شرط قانوني للجنسية.",
      },
      integration: {
        en: "Anmeldung (address registration) comes first and unlocks everything else: bank account, tax ID, health insurance. Integration courses through the BAMF are subsidised and count toward naturalisation. Health insurance is mandatory from your first day.",
        ar: "تسجيل العنوان (Anmeldung) يأتي أولًا ويفتح كل ما عداه: الحساب البنكي والرقم الضريبي والتأمين الصحي. ودورات الاندماج عبر BAMF مدعومة وتُحتسب للتجنّس. والتأمين الصحي إلزامي من يومك الأول.",
      },
      pros: [
        { en: "Europe's largest economy with deep demand for skilled workers.", ar: "أكبر اقتصاد في أوروبا مع طلب عميق على العمالة الماهرة." },
        { en: "Dual nationality now permitted and citizenship reduced to five years.", ar: "ازدواج الجنسية مسموح الآن والجنسية خُفّضت إلى خمس سنوات." },
        { en: "Free university education, including for international students.", ar: "تعليم جامعي مجاني، بما في ذلك للطلاب الدوليين." },
        { en: "Comprehensive healthcare and strong employment protection.", ar: "رعاية صحية شاملة وحماية قوية للتوظيف." },
      ],
      cons: [
        { en: "Qualification recognition is slow and often underestimated.", ar: "معادلة المؤهلات بطيئة وغالبًا ما يُستهان بها." },
        { en: "Housing in major cities is genuinely hard to secure.", ar: "السكن في المدن الكبرى صعب التأمين فعلًا." },
        { en: "High tax and social contribution burden on gross pay.", ar: "عبء ضريبي واشتراكات اجتماعية مرتفع على الأجر الإجمالي." },
        { en: "Bureaucracy is paper-based and appointment-gated.", ar: "البيروقراطية ورقية وتعتمد على المواعيد المسبقة." },
      ],
    },
  },

  ca: {
    residency: {
      permanent: {
        en: "Express Entry and Provincial Nominee Programs grant permanent residence directly — Canada is unusual in that you often arrive as a permanent resident rather than working toward it. PR must be maintained with 730 days of physical presence in every five-year period.",
        ar: "يمنح نظام الدخول السريع وبرامج ترشيح المقاطعات الإقامة الدائمة مباشرة — وكندا استثنائية في أنك تصل غالبًا مقيمًا دائمًا بدل أن تسعى إليها. ويجب الحفاظ على الإقامة الدائمة بوجود فعلي ٧٣٠ يومًا في كل فترة خمس سنوات.",
      },
      citizenship: {
        en: "Three years (1,095 days) of physical presence within the last five, plus a language test at CLB 4 and a citizenship test for applicants aged 18–54. Canada permits dual nationality without restriction.",
        ar: "ثلاث سنوات (١٠٩٥ يومًا) من الوجود الفعلي خلال الخمس الأخيرة، مع اختبار لغة بمستوى CLB 4 واختبار مواطنة لمن تتراوح أعمارهم بين ١٨ و٥٤. وتسمح كندا بازدواج الجنسية دون قيود.",
      },
      rights: [
        { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
        { en: "Permanent residents may live, work and study anywhere in Canada.", ar: "يمكن للمقيمين الدائمين العيش والعمل والدراسة في أي مكان في كندا." },
        { en: "Spouses of skilled workers receive open work permits.", ar: "أزواج العمال المهرة يحصلون على تصاريح عمل مفتوحة." },
        { en: "Children born in Canada are citizens by birth regardless of parents' status.", ar: "الأطفال المولودون في كندا مواطنون بالولادة بغض النظر عن وضع الوالدين." },
      ],
      labourLaw: [
        { en: "Employment standards are provincial — hours, leave and minimum wage vary by province.", ar: "معايير العمل إقليمية — فالساعات والإجازات والحد الأدنى للأجور تختلف بين المقاطعات." },
        { en: "Two weeks of paid vacation is the common statutory minimum, rising with service.", ar: "أسبوعان إجازة مدفوعة هما الحد الأدنى القانوني الشائع، ويزيدان مع الخدمة." },
        { en: "Employment Insurance and the Canada Pension Plan are deducted from pay.", ar: "تأمين العمل وخطة التقاعد الكندية يُخصمان من الراتب." },
        { en: "Provincial healthcare has a waiting period of up to three months in some provinces.", ar: "الرعاية الصحية الإقليمية لها فترة انتظار تصل إلى ثلاثة أشهر في بعض المقاطعات." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Technology, concentrated in Toronto, Vancouver, Montreal and Waterloo", ar: "التقنية، وتتركز في تورونتو وفانكوفر ومونتريال وواترلو" },
        { en: "Healthcare, with acute nursing and physician shortages nationwide", ar: "الرعاية الصحية، مع نقص حاد في التمريض والأطباء على مستوى البلاد" },
        { en: "Skilled trades and construction across every province", ar: "الحرف الماهرة والبناء في كل المقاطعات" },
        { en: "Transport and logistics, especially long-haul driving", ar: "النقل والخدمات اللوجستية، خاصة القيادة لمسافات طويلة" },
        { en: "Natural resources, energy and agriculture", ar: "الموارد الطبيعية والطاقة والزراعة" },
      ],
      equivalency: {
        en: "An Educational Credential Assessment from WES, ICES or an equivalent body is mandatory for Express Entry points and takes weeks to months. Regulated professions are licensed provincially: nurses through NNAS then the provincial college, engineers through the provincial association, doctors through the medical college. Health licensing is the slowest and should begin a year ahead.",
        ar: "تقييم الشهادات التعليمية من WES أو ICES أو جهة معادلة إلزامي لنقاط الدخول السريع ويستغرق أسابيع إلى أشهر. والمهن المنظّمة تُرخَّص إقليميًا: الممرضون عبر NNAS ثم كلية المقاطعة، والمهندسون عبر جمعية المقاطعة، والأطباء عبر الكلية الطبية. والترخيص الصحي هو الأبطأ ويجدر البدء فيه قبل سنة.",
      },
      wages: {
        en: "Median full-time pay is around CAD 65,000 a year. Software developers earn CAD 85,000–130,000, registered nurses CAD 72,000–98,000, skilled trades CAD 55,000–90,000. Combined federal and provincial tax takes roughly 25–35%.",
        ar: "الأجر الوسيط للدوام الكامل نحو ٦٥٠٠٠ دولار كندي سنويًا. ويكسب مطورو البرمجيات ٨٥٠٠٠–١٣٠٠٠٠، والممرضون المسجلون ٧٢٠٠٠–٩٨٠٠٠، والحرفيون المهرة ٥٥٠٠٠–٩٠٠٠٠. والضريبة الاتحادية والإقليمية معًا تأخذ نحو ٢٥–٣٥٪.",
      },
    },
    life: {
      housing: {
        en: "Toronto and Vancouver are among the least affordable housing markets in the developed world relative to income. Calgary, Edmonton, Winnipeg, Halifax and much of Quebec cost dramatically less, and provincial nomination programmes actively steer newcomers there.",
        ar: "تورونتو وفانكوفر من أقل أسواق السكن ميسوريةً في العالم المتقدم مقارنة بالدخل. وكالغاري وإدمونتون ووينيبيغ وهاليفاكس ومعظم كيبيك أرخص بكثير، وبرامج ترشيح المقاطعات توجّه القادمين الجدد إليها فعليًا.",
      },
      language: {
        en: "English suffices nationwide except Quebec, where French is required for most work and for provincial immigration. Strong French adds substantial Express Entry points and opens a separate, faster federal stream.",
        ar: "الإنجليزية تكفي في البلاد كلها عدا كيبيك، حيث تُشترط الفرنسية لمعظم الأعمال وللهجرة الإقليمية. والفرنسية القوية تضيف نقاطًا كبيرة في الدخول السريع وتفتح مسارًا اتحاديًا منفصلًا وأسرع.",
      },
      integration: {
        en: "Apply for a SIN on arrival and register for provincial health cover immediately, since some provinces impose a waiting period. Federally funded settlement services offer free language classes and job search support to permanent residents.",
        ar: "تقدّم لرقم التأمين الاجتماعي عند الوصول وسجّل في التغطية الصحية الإقليمية فورًا، إذ تفرض بعض المقاطعات فترة انتظار. وتقدّم خدمات الاستقرار الممولة اتحاديًا دروس لغة مجانية ودعمًا للبحث عن عمل للمقيمين الدائمين.",
      },
      pros: [
        { en: "You can arrive as a permanent resident without a job offer.", ar: "يمكنك الوصول مقيمًا دائمًا دون عرض عمل." },
        { en: "Citizenship in three years, among the fastest in the developed world.", ar: "الجنسية خلال ثلاث سنوات، من الأسرع في العالم المتقدم." },
        { en: "Publicly funded healthcare and free schooling.", ar: "رعاية صحية ممولة حكوميًا وتعليم مدرسي مجاني." },
        { en: "Established, large communities from almost every country.", ar: "جاليات كبيرة وراسخة من كل بلد تقريبًا." },
      ],
      cons: [
        { en: "Housing costs in Toronto and Vancouver are severe.", ar: "تكاليف السكن في تورونتو وفانكوفر قاسية." },
        { en: "Professional licensing can delay work in your field by a year or more.", ar: "الترخيص المهني قد يؤخر العمل في مجالك سنة أو أكثر." },
        { en: "\"Canadian experience\" expectations disadvantage new arrivals.", ar: "توقّع «الخبرة الكندية» يضع القادمين الجدد في موقف أصعب." },
        { en: "Winters in most of the country are long and severe.", ar: "الشتاء في معظم أنحاء البلاد طويل وقاسٍ." },
      ],
    },
  },

  ae: {
    residency: {
      permanent: {
        en: "There is no permanent residence in the ordinary sense. The Golden Visa is the closest equivalent: five or ten years, renewable, self-sponsored, and it survives losing your job — which the standard employment visa does not.",
        ar: "لا توجد إقامة دائمة بالمعنى المعتاد. والتأشيرة الذهبية هي الأقرب: خمس أو عشر سنوات قابلة للتجديد بكفالة ذاتية، وتبقى رغم فقدان وظيفتك — بخلاف تأشيرة العمل الاعتيادية.",
      },
      citizenship: {
        en: "Naturalisation was opened in 2021 to a narrow group — investors, doctors, scientists, inventors and creative talent — by nomination only. It is not a pathway most residents can plan for, and applicants generally retain their original nationality.",
        ar: "فُتح التجنّس عام ٢٠٢١ لفئة ضيقة — المستثمرون والأطباء والعلماء والمخترعون وأصحاب المواهب الإبداعية — بالترشيح فقط. وليس مسارًا يمكن لمعظم المقيمين التخطيط له، ويحتفظ المتقدمون عمومًا بجنسيتهم الأصلية.",
      },
      rights: [
        { en: "Golden Visa holders sponsor themselves and are not tied to an employer.", ar: "حاملو التأشيرة الذهبية يكفلون أنفسهم ولا يرتبطون بصاحب عمل." },
        { en: "Standard employment visas end when the job does, with a grace period to find another.", ar: "تأشيرات العمل الاعتيادية تنتهي بانتهاء الوظيفة، مع مهلة سماح لإيجاد أخرى." },
        { en: "Family sponsorship requires a minimum salary, typically AED 4,000–10,000 a month.", ar: "كفالة الأسرة تتطلب حدًا أدنى للراتب، عادةً ٤٠٠٠–١٠٠٠٠ درهم شهريًا." },
        { en: "Foreigners may own freehold property in designated areas of each emirate.", ar: "يمكن للأجانب التملّك الحر في مناطق محددة بكل إمارة." },
      ],
      labourLaw: [
        { en: "48-hour week with overtime pay; 36 hours during Ramadan for Muslim staff.", ar: "أسبوع ٤٨ ساعة مع أجر إضافي، و٣٦ ساعة في رمضان للموظفين المسلمين." },
        { en: "30 calendar days of annual leave after one year of service.", ar: "٣٠ يومًا تقويميًا إجازة سنوية بعد سنة من الخدمة." },
        { en: "End-of-service gratuity of 21 days' pay per year for the first five years.", ar: "مكافأة نهاية الخدمة أجر ٢١ يومًا عن كل سنة في السنوات الخمس الأولى." },
        { en: "The Wage Protection System requires salaries through a UAE bank account.", ar: "نظام حماية الأجور يشترط صرف الرواتب عبر حساب بنكي إماراتي." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Technology, fintech and digital services in Dubai", ar: "التقنية والتقنية المالية والخدمات الرقمية في دبي" },
        { en: "Construction, real estate and infrastructure", ar: "البناء والعقارات والبنية التحتية" },
        { en: "Healthcare across public and private providers", ar: "الرعاية الصحية لدى مقدمي الخدمات العامين والخاصين" },
        { en: "Aviation, logistics and trade", ar: "الطيران والخدمات اللوجستية والتجارة" },
        { en: "Hospitality, tourism and retail", ar: "الضيافة والسياحة والتجزئة" },
      ],
      equivalency: {
        en: "Degree attestation by your ministries and the UAE embassy is required before a work visa is issued — start it before you resign. Health professionals license through DHA (Dubai), DoH (Abu Dhabi) or MOHAP; teachers need KHDA approval; engineers register with the Society of Engineers.",
        ar: "تصديق الشهادة من وزارات بلدك والسفارة الإماراتية مطلوب قبل إصدار تأشيرة العمل — ابدأه قبل الاستقالة. ويُرخَّص العاملون الصحيون عبر هيئة الصحة بدبي أو دائرة الصحة بأبوظبي أو وزارة الصحة، ويحتاج المعلمون موافقة هيئة المعرفة، ويسجّل المهندسون في جمعية المهندسين.",
      },
      wages: {
        en: "Salaries are tax-free. Software engineers earn AED 180,000–320,000 a year, civil engineers AED 144,000–240,000, nurses AED 96,000–150,000. Confirm whether housing, transport and schooling allowances are included — they can be a third of the package.",
        ar: "الرواتب معفاة من الضرائب. ويكسب مهندسو البرمجيات ١٨٠٠٠٠–٣٢٠٠٠٠ درهم سنويًا، والمهندسون المدنيون ١٤٤٠٠٠–٢٤٠٠٠٠، والممرضون ٩٦٠٠٠–١٥٠٠٠٠. وتأكّد مما إذا كانت بدلات السكن والمواصلات والتعليم مشمولة — فقد تشكّل ثلث الحزمة.",
      },
    },
    life: {
      housing: {
        en: "Dubai and Abu Dhabi rents are typically paid in one to four cheques a year, so the up-front requirement is large. Rents rose sharply after 2021 and remain the biggest single expense for most residents.",
        ar: "إيجارات دبي وأبوظبي تُدفع عادةً بشيك إلى أربعة شيكات سنويًا، فالمطلوب مقدمًا كبير. وارتفعت الإيجارات بحدة بعد ٢٠٢١ وتظل أكبر بند إنفاق منفرد لمعظم المقيمين.",
      },
      language: {
        en: "Arabic is official but English is the working language of business, healthcare and daily life. Around 88% of residents are foreign nationals, and you can live entirely in English.",
        ar: "العربية رسمية لكن الإنجليزية هي لغة العمل في الأعمال والرعاية الصحية والحياة اليومية. ونحو ٨٨٪ من المقيمين أجانب، ويمكنك العيش بالإنجليزية وحدها تمامًا.",
      },
      integration: {
        en: "Your Emirates ID governs everything from banking to healthcare. Health insurance is mandatory and employer-provided in Dubai and Abu Dhabi. International school fees are a major budget item — check whether your package covers them before accepting.",
        ar: "الهوية الإماراتية تحكم كل شيء من الخدمات المصرفية إلى الصحية. والتأمين الصحي إلزامي ويوفّره صاحب العمل في دبي وأبوظبي. ورسوم المدارس الدولية بند ميزانية كبير — تحقّق مما إذا كانت حزمتك تغطيها قبل القبول.",
      },
      pros: [
        { en: "Tax-free income and a genuinely international labour market.", ar: "دخل معفى من الضرائب وسوق عمل دولي فعلًا." },
        { en: "Golden Visa offers long-term residence without an employer.", ar: "التأشيرة الذهبية تمنح إقامة طويلة الأمد دون صاحب عمل." },
        { en: "Excellent connectivity and infrastructure; you can live in English.", ar: "اتصال وبنية تحتية ممتازان، ويمكنك العيش بالإنجليزية." },
        { en: "Freehold property ownership available to foreigners.", ar: "التملّك الحر للعقارات متاح للأجانب." },
      ],
      cons: [
        { en: "Standard residence ends with your job, and dependants' status with it.", ar: "الإقامة الاعتيادية تنتهي بانتهاء وظيفتك، ووضع المرافقين معها." },
        { en: "Rent paid in a few large cheques strains cash flow.", ar: "دفع الإيجار بشيكات كبيرة قليلة يضغط على السيولة." },
        { en: "School fees are high and rarely fully covered.", ar: "رسوم المدارس مرتفعة ونادرًا ما تُغطى بالكامل." },
        { en: "Citizenship is closed to almost everyone.", ar: "الجنسية مغلقة أمام الجميع تقريبًا." },
      ],
    },
  },

  nl: {
    residency: {
      permanent: {
        en: "Permanent residence follows five years of continuous legal stay with stable income and a passed civic integration exam. Highly Skilled Migrants are exempt from the integration requirement only in limited circumstances — check your category.",
        ar: "تأتي الإقامة الدائمة بعد خمس سنوات من الإقامة القانونية المتصلة مع دخل مستقر واجتياز امتحان الاندماج المدني. والمهاجرون عالو المهارة معفون من شرط الاندماج في حالات محدودة فقط — تحقّق من فئتك.",
      },
      citizenship: {
        en: "Five years of residence plus the civic integration exam at A2 or higher. The Netherlands generally requires you to renounce your existing nationality, with exceptions for those who cannot, and for spouses of Dutch nationals.",
        ar: "خمس سنوات إقامة مع امتحان الاندماج المدني بمستوى A2 أو أعلى. وتشترط هولندا عمومًا التخلي عن جنسيتك الحالية، مع استثناءات لمن لا يستطيع، ولأزواج المواطنين الهولنديين.",
      },
      rights: [
        { en: "Dual nationality is generally NOT permitted — most applicants must renounce.", ar: "ازدواج الجنسية غير مسموح عمومًا — ويضطر معظم المتقدمين للتخلي عن جنسيتهم." },
        { en: "Partners of Highly Skilled Migrants receive unrestricted work rights.", ar: "شركاء المهاجرين عالي المهارة يحصلون على حقوق عمل غير مقيدة." },
        { en: "The 30% ruling gives qualifying migrants a substantial tax advantage for five years.", ar: "قاعدة الـ٣٠٪ تمنح المهاجرين المؤهلين ميزة ضريبية كبيرة لخمس سنوات." },
        { en: "Changing employer requires the new employer to be a recognised sponsor.", ar: "تغيير صاحب العمل يتطلب أن يكون صاحب العمل الجديد كفيلًا معتمدًا." },
      ],
      labourLaw: [
        { en: "36–40 hour week, with part-time work culturally normal and well protected.", ar: "أسبوع ٣٦–٤٠ ساعة، والعمل بدوام جزئي معتاد ثقافيًا ومحمي جيدًا." },
        { en: "Minimum four times the weekly hours as annual leave — typically 20+ days.", ar: "الحد الأدنى للإجازة السنوية أربعة أضعاف ساعات الأسبوع — عادةً ٢٠ يومًا فأكثر." },
        { en: "An 8% holiday allowance is paid annually on top of salary.", ar: "بدل إجازة ٨٪ يُدفع سنويًا فوق الراتب." },
        { en: "Dismissal requires UWV or court approval — among Europe's stricter regimes.", ar: "الفصل يتطلب موافقة UWV أو المحكمة — من أكثر الأنظمة صرامة في أوروبا." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Technology, data and semiconductors, including the Eindhoven cluster", ar: "التقنية والبيانات وأشباه الموصلات، بما فيها تجمّع أيندهوفن" },
        { en: "Logistics and trade around Rotterdam and Schiphol", ar: "الخدمات اللوجستية والتجارة حول روتردام وسخيبول" },
        { en: "Finance, legal and international business services", ar: "المالية والقانون وخدمات الأعمال الدولية" },
        { en: "Agriculture and horticulture technology, a world-leading sector", ar: "تقنيات الزراعة والبستنة، وهو قطاع رائد عالميًا" },
        { en: "Research and higher education", ar: "البحث والتعليم العالي" },
      ],
      equivalency: {
        en: "Nuffic issues credential evaluations for general purposes. Regulated professions register through BIG (health) or the relevant professional body, and health roles require Dutch. For most other work, no formal recognition is needed — the recognised sponsor system does the vetting instead.",
        ar: "تصدر Nuffic تقييمات للشهادات للأغراض العامة. وتُسجَّل المهن المنظّمة عبر سجل BIG (الصحة) أو الهيئة المهنية المختصة، وتتطلب الوظائف الصحية الهولندية. أما معظم الأعمال الأخرى فلا تحتاج اعترافًا رسميًا — إذ يقوم نظام الكفيل المعتمد بالتحقق بدلًا من ذلك.",
      },
      wages: {
        en: "Median gross pay is roughly €3,300 a month. Data and software engineers earn €55,000–82,000 a year. The 30% ruling, if you qualify, exempts nearly a third of your salary from income tax for five years and materially changes your net.",
        ar: "الأجر الوسيط الإجمالي نحو ٣٣٠٠ يورو شهريًا. ويكسب مهندسو البيانات والبرمجيات ٥٥٠٠٠–٨٢٠٠٠ يورو سنويًا. وقاعدة الـ٣٠٪، إن كنت مؤهلًا، تعفي نحو ثلث راتبك من ضريبة الدخل لخمس سنوات وتغيّر صافيك جوهريًا.",
      },
    },
    life: {
      housing: {
        en: "Housing, not immigration, is the hard part. Amsterdam and Utrecht have severe shortages, agencies charge fees, and many landlords require an income of three to four times the rent. Consider Rotterdam, The Hague or Eindhoven, all well connected by rail.",
        ar: "السكن، لا الهجرة، هو الجزء الصعب. ففي أمستردام وأوترخت نقص حاد، والوكالات تفرض رسومًا، ويشترط كثير من الملاك دخلًا يعادل ثلاثة إلى أربعة أضعاف الإيجار. وفكّر في روتردام أو لاهاي أو أيندهوفن، وكلها متصلة جيدًا بالقطارات.",
      },
      language: {
        en: "English proficiency is among the highest in the world and you can work and live in English indefinitely. Dutch is nonetheless required for the civic integration exam, and therefore for permanent residence and citizenship.",
        ar: "إتقان الإنجليزية من الأعلى عالميًا، ويمكنك العمل والعيش بها إلى أجل غير مسمى. ومع ذلك تُشترط الهولندية لامتحان الاندماج المدني، وبالتالي للإقامة الدائمة والجنسية.",
      },
      integration: {
        en: "Register at your municipality within five days to get a BSN, which everything else depends on. Take out Dutch health insurance within four months or face a fine. The civic integration exam has a legal deadline once it applies to you.",
        ar: "سجّل في بلديتك خلال خمسة أيام للحصول على رقم BSN الذي يعتمد عليه كل شيء آخر. واستخرج تأمينًا صحيًا هولنديًا خلال أربعة أشهر وإلا تعرضت لغرامة. ولامتحان الاندماج المدني مهلة قانونية بمجرد سريانه عليك.",
      },
      pros: [
        { en: "The Highly Skilled Migrant route is fast and largely administrative.", ar: "مسار المهاجر عالي المهارة سريع وإداري في معظمه." },
        { en: "The 30% ruling substantially raises net pay for qualifying migrants.", ar: "قاعدة الـ٣٠٪ ترفع الراتب الصافي بشكل كبير للمهاجرين المؤهلين." },
        { en: "You can build a full career and life in English.", ar: "يمكنك بناء مهنة وحياة كاملة بالإنجليزية." },
        { en: "Excellent work-life balance and part-time norms.", ar: "توازن ممتاز بين العمل والحياة وأعراف راسخة للدوام الجزئي." },
      ],
      cons: [
        { en: "Dual nationality is generally not permitted.", ar: "ازدواج الجنسية غير مسموح عمومًا." },
        { en: "The housing shortage is severe in the Randstad cities.", ar: "نقص السكن حاد في مدن راندستاد." },
        { en: "Your permit depends on your employer holding sponsor status.", ar: "تصريحك يعتمد على تمتّع صاحب عملك بصفة الكفيل." },
        { en: "Civic integration is a legal requirement with deadlines.", ar: "الاندماج المدني شرط قانوني بمواعيد نهائية." },
      ],
    },
  },

  au: {
    residency: {
      permanent: {
        en: "Subclasses 189 and 190 grant permanent residence on arrival. Employer-sponsored 482 holders transition to PR after two to three years through the employer nomination scheme. PR carries a five-year travel facility that must be renewed to re-enter.",
        ar: "تمنح الفئتان ١٨٩ و١٩٠ الإقامة الدائمة عند الوصول. وينتقل حاملو التأشيرة ٤٨٢ بكفالة صاحب العمل إلى الإقامة الدائمة بعد سنتين إلى ثلاث عبر برنامج ترشيح صاحب العمل. وللإقامة الدائمة تسهيل سفر لخمس سنوات يجب تجديده لإعادة الدخول.",
      },
      citizenship: {
        en: "Four years of lawful residence including twelve months as a permanent resident, plus a citizenship test on values and history. Australia permits dual nationality.",
        ar: "أربع سنوات إقامة قانونية تشمل اثني عشر شهرًا كمقيم دائم، إضافة إلى اختبار مواطنة في القيم والتاريخ. وتسمح أستراليا بازدواج الجنسية.",
      },
      rights: [
        { en: "Dual nationality is permitted.", ar: "ازدواج الجنسية مسموح." },
        { en: "Permanent residents access Medicare and most government services.", ar: "المقيمون الدائمون يحصلون على Medicare ومعظم الخدمات الحكومية." },
        { en: "Partners are included in the same application with full work rights.", ar: "الشركاء مشمولون في الطلب نفسه بحقوق عمل كاملة." },
        { en: "Regional visas trade location restrictions for extra points and faster PR.", ar: "تأشيرات المناطق تقايض قيود الموقع بنقاط إضافية وإقامة دائمة أسرع." },
      ],
      labourLaw: [
        { en: "38-hour standard week with four weeks of paid annual leave.", ar: "أسبوع معياري ٣٨ ساعة مع أربعة أسابيع إجازة سنوية مدفوعة." },
        { en: "One of the world's highest minimum wages, reviewed annually.", ar: "أحد أعلى الحدود الدنيا للأجور في العالم، ويُراجع سنويًا." },
        { en: "Superannuation contributions are paid by the employer on top of salary.", ar: "اشتراكات التقاعد يدفعها صاحب العمل فوق الراتب." },
        { en: "Awards set minimum pay and conditions industry by industry.", ar: "قرارات الأجور تحدد الحد الأدنى للأجر والشروط في كل صناعة." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Healthcare and social assistance, the largest employer nationally", ar: "الرعاية الصحية والمساعدة الاجتماعية، أكبر مشغّل وطنيًا" },
        { en: "Construction and skilled trades", ar: "البناء والحرف الماهرة" },
        { en: "Mining, resources and energy", ar: "التعدين والموارد والطاقة" },
        { en: "Technology, especially cloud, cybersecurity and data", ar: "التقنية، خاصة السحابة والأمن السيبراني والبيانات" },
        { en: "Education and agriculture, both with regional shortages", ar: "التعليم والزراعة، وكلاهما يعاني نقصًا في المناطق" },
      ],
      equivalency: {
        en: "A skills assessment from the authority governing your occupation is the mandatory first step — ACS for IT, Engineers Australia for engineering, AHPRA for health, TRA for trades. It precedes the points test, and a negative assessment ends the application before it starts.",
        ar: "تقييم المهارات من الجهة المسؤولة عن مهنتك هو الخطوة الأولى الإلزامية — ACS لتقنية المعلومات، ومهندسو أستراليا للهندسة، وAHPRA للصحة، وTRA للحرف. ويسبق اختبار النقاط، والتقييم السلبي ينهي الطلب قبل أن يبدأ.",
      },
      wages: {
        en: "Median full-time pay is around AUD 90,000 a year. Cloud engineers earn AUD 110,000–160,000, registered nurses AUD 75,000–105,000, carpenters AUD 70,000–95,000. Superannuation adds over 11% on top of the headline figure.",
        ar: "الأجر الوسيط للدوام الكامل نحو ٩٠٠٠٠ دولار أسترالي سنويًا. ويكسب مهندسو الحوسبة السحابية ١١٠٠٠٠–١٦٠٠٠٠، والممرضون المسجلون ٧٥٠٠٠–١٠٥٠٠٠، والنجارون ٧٠٠٠٠–٩٥٠٠٠. ويضيف التقاعد أكثر من ١١٪ فوق الرقم المعلن.",
      },
    },
    life: {
      housing: {
        en: "Sydney and Melbourne rank among the world's least affordable housing markets. Brisbane, Adelaide, Perth and regional centres are substantially cheaper, and regional visas actively reward moving there.",
        ar: "سيدني وملبورن من أقل أسواق السكن ميسوريةً عالميًا. وبريزبن وأديلايد وبيرث والمراكز الإقليمية أرخص بكثير، وتأشيرات المناطق تكافئ الانتقال إليها فعليًا.",
      },
      language: {
        en: "English is the working language, and the points test rewards high scores heavily — IELTS 8 across all bands adds twenty points, which frequently decides whether you are invited at all.",
        ar: "الإنجليزية هي لغة العمل، واختبار النقاط يكافئ الدرجات العالية بقوة — فدرجة ٨ في كل أقسام الآيلتس تضيف عشرين نقطة، وهو ما يحسم غالبًا دعوتك من عدمها.",
      },
      integration: {
        en: "Apply for a Tax File Number and enrol in Medicare as soon as you land. Permanent residents wait two years for most welfare payments. Distance is real: domestic flights between major cities take hours.",
        ar: "تقدّم لرقم الملف الضريبي وسجّل في Medicare فور وصولك. وينتظر المقيمون الدائمون سنتين لمعظم الإعانات. والمسافات حقيقية: فالرحلات الداخلية بين المدن الكبرى تستغرق ساعات.",
      },
      pros: [
        { en: "Permanent residence on arrival through the points-tested streams.", ar: "إقامة دائمة عند الوصول عبر مسارات اختبار النقاط." },
        { en: "Very high minimum wage and strong workplace conditions.", ar: "حد أدنى مرتفع جدًا للأجور وشروط عمل قوية." },
        { en: "Citizenship in four years with dual nationality permitted.", ar: "الجنسية خلال أربع سنوات مع السماح بازدواج الجنسية." },
        { en: "Medicare covers permanent residents from arrival.", ar: "Medicare يغطي المقيمين الدائمين منذ الوصول." },
      ],
      cons: [
        { en: "Skills assessment plus visa fees run to several thousand dollars.", ar: "تقييم المهارات مع رسوم التأشيرة يبلغان عدة آلاف من الدولارات." },
        { en: "Sydney and Melbourne housing costs are extreme.", ar: "تكاليف السكن في سيدني وملبورن قاسية." },
        { en: "Points cut-offs move, so a qualifying score is not a guaranteed invitation.", ar: "حدود النقاط تتغير، فالنقاط المؤهلة لا تضمن الدعوة." },
        { en: "Geographic isolation makes visiting family expensive.", ar: "العزلة الجغرافية تجعل زيارة الأهل مكلفة." },
      ],
    },
  },

  gb: {
    residency: {
      permanent: {
        en: "Indefinite Leave to Remain follows five years on a Skilled Worker visa, with continuous residence, a Life in the UK test and English at B1. Absences over 180 days in any twelve-month period break continuity.",
        ar: "تأتي الإقامة غير المحددة بعد خمس سنوات على تأشيرة العامل الماهر، مع إقامة متصلة واجتياز اختبار «الحياة في بريطانيا» وإنجليزية بمستوى B1. والغياب أكثر من ١٨٠ يومًا في أي فترة اثني عشر شهرًا يقطع الاتصال.",
      },
      citizenship: {
        en: "Twelve months after obtaining ILR, so typically six years in total. The UK permits dual nationality without restriction.",
        ar: "اثنا عشر شهرًا بعد الحصول على الإقامة غير المحددة، أي ست سنوات إجمالًا عادةً. وتسمح بريطانيا بازدواج الجنسية دون قيود.",
      },
      rights: [
        { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
        { en: "Dependants receive work rights and can study without a separate visa.", ar: "المرافقون يحصلون على حقوق عمل ويمكنهم الدراسة دون تأشيرة منفصلة." },
        { en: "Changing employer requires a new Certificate of Sponsorship.", ar: "تغيير صاحب العمل يتطلب شهادة كفالة جديدة." },
        { en: "The Immigration Health Surcharge buys full NHS access from day one.", ar: "رسوم الصحة للمهاجرين تمنحك وصولًا كاملًا لهيئة الصحة الوطنية من اليوم الأول." },
      ],
      labourLaw: [
        { en: "48-hour weekly limit, which employees may opt out of individually.", ar: "حد أسبوعي ٤٨ ساعة، ويمكن للموظف التنازل عنه فرديًا." },
        { en: "28 days of paid leave including public holidays.", ar: "٢٨ يوم إجازة مدفوعة تشمل العطلات الرسمية." },
        { en: "Unfair dismissal protection generally begins after two years of service.", ar: "الحماية من الفصل التعسفي تبدأ عمومًا بعد سنتين من الخدمة." },
        { en: "Automatic pension enrolment with employer contributions.", ar: "تسجيل تلقائي في المعاش مع مساهمات من صاحب العمل." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Health and social care — the largest sponsored-visa route", ar: "الصحة والرعاية الاجتماعية — أكبر مسار للتأشيرات المكفولة" },
        { en: "Technology and fintech, concentrated in London, Manchester and Cambridge", ar: "التقنية والتقنية المالية، وتتركز في لندن ومانشستر وكامبريدج" },
        { en: "Financial and professional services", ar: "الخدمات المالية والمهنية" },
        { en: "Higher education and research", ar: "التعليم العالي والبحث" },
        { en: "Construction, engineering and logistics", ar: "البناء والهندسة والخدمات اللوجستية" },
      ],
      equivalency: {
        en: "UK ENIC compares foreign qualifications for a fee. Nurses register with the NMC (with an OSCE exam), doctors with the GMC, teachers through QTS. Most other roles need no formal recognition — the sponsorship system substitutes for it.",
        ar: "تقارن UK ENIC المؤهلات الأجنبية مقابل رسوم. ويسجّل الممرضون لدى NMC (مع امتحان OSCE)، والأطباء لدى GMC، والمعلمون عبر شهادة QTS. ومعظم الوظائف الأخرى لا تحتاج اعترافًا رسميًا — إذ يحل نظام الكفالة محله.",
      },
      wages: {
        en: "Median full-time pay is around £35,000 a year. DevOps engineers earn £55,000–85,000, NHS nurses £29,000–36,000, senior care workers £23,000–30,000. Visa costs are substantial: fees plus the health surcharge for the full permit length are paid up front.",
        ar: "الأجر الوسيط للدوام الكامل نحو ٣٥٠٠٠ جنيه سنويًا. ويكسب مهندسو ديف أوبس ٥٥٠٠٠–٨٥٠٠٠، وممرضو هيئة الصحة ٢٩٠٠٠–٣٦٠٠٠، وأخصائيو الرعاية الأوائل ٢٣٠٠٠–٣٠٠٠٠. وتكاليف التأشيرة كبيرة: فالرسوم مع رسوم الصحة عن كامل مدة التصريح تُدفع مقدمًا.",
      },
    },
    life: {
      housing: {
        en: "London rents are among Europe's highest and most landlords require a UK guarantor or six months' rent in advance from new arrivals. Manchester, Birmingham, Leeds and Glasgow cost far less with real job markets.",
        ar: "إيجارات لندن من الأعلى في أوروبا، ويشترط معظم الملاك كفيلًا بريطانيًا أو إيجار ستة أشهر مقدمًا من القادمين الجدد. ومانشستر وبرمنغهام وليدز وغلاسكو أرخص بكثير مع أسواق عمل حقيقية.",
      },
      language: {
        en: "English throughout, with a B1 requirement for the visa and for settlement. Many nationalities and degree holders are exempt from taking a test.",
        ar: "الإنجليزية في كل شيء، مع اشتراط مستوى B1 للتأشيرة وللاستقرار. وكثير من الجنسيات وحاملي الشهادات معفون من أداء الاختبار.",
      },
      integration: {
        en: "Register with a GP as soon as you arrive — NHS access depends on it and the surcharge has already been paid. Verify your sponsor on the Home Office register of licensed sponsors before paying anyone anything; sponsorship scams targeting care workers are widespread.",
        ar: "سجّل لدى طبيب عام فور وصولك — فالوصول إلى هيئة الصحة يعتمد عليه وقد دفعت الرسوم مسبقًا. وتحقّق من كفيلك في سجل وزارة الداخلية للكفلاء المرخّصين قبل أن تدفع لأي جهة، فعمليات النصب باسم الكفالة تستهدف عمال الرعاية على نطاق واسع.",
      },
      pros: [
        { en: "Everything operates in English, with no integration exam beyond B1.", ar: "كل شيء يعمل بالإنجليزية، بلا امتحان اندماج يتجاوز مستوى B1." },
        { en: "Settlement in five years and citizenship in six, with dual nationality allowed.", ar: "الاستقرار خلال خمس سنوات والجنسية خلال ست، مع السماح بازدواج الجنسية." },
        { en: "NHS access from day one once the surcharge is paid.", ar: "الوصول لهيئة الصحة الوطنية من اليوم الأول بعد دفع الرسوم." },
        { en: "Dependants get full work rights immediately.", ar: "المرافقون يحصلون على حقوق عمل كاملة فورًا." },
      ],
      cons: [
        { en: "Visa and health surcharge costs are among the highest in the world.", ar: "تكاليف التأشيرة ورسوم الصحة من الأعلى عالميًا." },
        { en: "You cannot work without a licensed sponsor, whatever your qualifications.", ar: "لا يمكنك العمل دون كفيل مرخّص مهما كانت مؤهلاتك." },
        { en: "London housing costs consume a large share of net pay.", ar: "تكاليف السكن في لندن تلتهم حصة كبيرة من الراتب الصافي." },
        { en: "Sponsorship fraud targeting care workers is a documented risk.", ar: "الاحتيال باسم الكفالة الذي يستهدف عمال الرعاية خطر موثّق." },
      ],
    },
  },

  pt: {
    residency: {
      permanent: {
        en: "Permanent residence follows five years of legal residence with A2 Portuguese. Time on a job-seeker, work or D7 visa all counts, and the years accumulate from the date you first applied rather than when the card was issued.",
        ar: "تأتي الإقامة الدائمة بعد خمس سنوات من الإقامة القانونية مع برتغالية بمستوى A2. وتُحتسب المدة على تأشيرة البحث عن عمل أو العمل أو D7 جميعها، وتتراكم السنوات من تاريخ أول تقديم لا من تاريخ إصدار البطاقة.",
      },
      citizenship: {
        en: "Five years of legal residence and A2 Portuguese — one of the shortest and most accessible routes in the European Union. Portugal permits dual nationality, and there is a separate route for descendants of Sephardic Jews.",
        ar: "خمس سنوات من الإقامة القانونية وبرتغالية بمستوى A2 — أحد أقصر المسارات وأيسرها في الاتحاد الأوروبي. وتسمح البرتغال بازدواج الجنسية، وثمة مسار منفصل لأحفاد اليهود السفارديم.",
      },
      rights: [
        { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
        { en: "Five years to citizenship makes Portugal one of the fastest EU passports.", ar: "خمس سنوات للجنسية تجعل البرتغال من أسرع جوازات الاتحاد الأوروبي." },
        { en: "Family reunion is available soon after you obtain a residence permit.", ar: "لمّ الشمل متاح بعد حصولك على تصريح الإقامة بوقت قصير." },
        { en: "Residence permits allow free movement within the Schengen area.", ar: "تصاريح الإقامة تتيح التنقل الحر داخل منطقة شنغن." },
      ],
      labourLaw: [
        { en: "40-hour week with 22 days of paid leave and 13 public holidays.", ar: "أسبوع ٤٠ ساعة مع ٢٢ يوم إجازة مدفوعة و١٣ عطلة رسمية." },
        { en: "Fourteen salary payments a year, including holiday and Christmas subsidies.", ar: "أربع عشرة دفعة راتب سنويًا، تشمل بدلي الإجازة وعيد الميلاد." },
        { en: "The minimum wage rises annually and covers a large share of the workforce.", ar: "الحد الأدنى للأجور يرتفع سنويًا ويغطي شريحة كبيرة من القوى العاملة." },
        { en: "Social security contributions give access to public healthcare (SNS).", ar: "اشتراكات الضمان الاجتماعي تمنح الوصول إلى الرعاية الصحية العامة (SNS)." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Technology and shared services in Lisbon and Porto", ar: "التقنية والخدمات المشتركة في لشبونة وبورتو" },
        { en: "Tourism and hospitality, heavily seasonal in the Algarve", ar: "السياحة والضيافة، موسمية بقوة في الغارف" },
        { en: "Elderly and home care in an ageing population", ar: "رعاية المسنين والرعاية المنزلية في مجتمع يشيخ" },
        { en: "Construction and civil works", ar: "البناء والأشغال المدنية" },
        { en: "Agriculture and food production", ar: "الزراعة وإنتاج الغذاء" },
      ],
      equivalency: {
        en: "DGES handles degree recognition, offering either a quick automatic equivalence or a fuller recognition process. Regulated professions go through their ordem — nurses, doctors, engineers and lawyers each have one. Costs are modest compared with most of Europe.",
        ar: "تتولى DGES الاعتراف بالشهادات، وتوفّر إما معادلة تلقائية سريعة أو إجراء اعتراف أشمل. أما المهن المنظّمة فتمر عبر نقابتها — وللممرضين والأطباء والمهندسين والمحامين نقابة لكلٍّ منهم. والتكاليف متواضعة مقارنة بمعظم أوروبا.",
      },
      wages: {
        en: "The minimum wage is roughly €870 a month across fourteen payments and the median is not far above it. Developers earn €28,000–48,000 a year — well below northern Europe, though international employers in Lisbon pay above the local market.",
        ar: "الحد الأدنى للأجور نحو ٨٧٠ يورو شهريًا على أربع عشرة دفعة، والوسيط ليس أعلى منه بكثير. ويكسب المطورون ٢٨٠٠٠–٤٨٠٠٠ يورو سنويًا — أقل بكثير من شمال أوروبا، وإن كان أصحاب العمل الدوليون في لشبونة يدفعون فوق السوق المحلي.",
      },
    },
    life: {
      housing: {
        en: "Lisbon and Porto rents have risen sharply, driven by tourism and foreign demand, and are now high relative to local wages. Coimbra, Braga and inland towns remain genuinely affordable.",
        ar: "ارتفعت إيجارات لشبونة وبورتو بحدة بفعل السياحة والطلب الأجنبي، وصارت مرتفعة مقارنة بالأجور المحلية. وتبقى كويمبرا وبراغا والمدن الداخلية ميسورة فعلًا.",
      },
      language: {
        en: "English is widely spoken in cities and in the tech sector. Portuguese is needed for administration, healthcare and most local employment, and A2 is required for both permanent residence and citizenship.",
        ar: "الإنجليزية منتشرة في المدن وفي قطاع التقنية. والبرتغالية لازمة للإدارة والرعاية الصحية ومعظم فرص العمل المحلية، ومستوى A2 مطلوب للإقامة الدائمة والجنسية معًا.",
      },
      integration: {
        en: "Get a NIF tax number early — it is needed for a lease, a bank account and a phone contract. Register with your local health centre for an SNS number. AIMA appointment availability, not eligibility, is usually what delays people.",
        ar: "احصل على الرقم الضريبي NIF مبكرًا — فهو لازم لعقد الإيجار والحساب البنكي وعقد الهاتف. وسجّل في مركزك الصحي المحلي للحصول على رقم SNS. وما يؤخر الناس عادةً هو توفر مواعيد AIMA لا الأهلية.",
      },
      pros: [
        { en: "Five years to an EU passport, among the shortest routes available.", ar: "خمس سنوات لجواز أوروبي، من أقصر المسارات المتاحة." },
        { en: "A job-seeker visa lets you look for work from inside the country.", ar: "تأشيرة البحث عن عمل تتيح لك البحث من داخل البلد." },
        { en: "Low cost of living outside Lisbon, with a mild climate.", ar: "تكلفة معيشة منخفضة خارج لشبونة، مع مناخ معتدل." },
        { en: "Only A2 Portuguese is required for citizenship.", ar: "لا يُشترط سوى مستوى A2 في البرتغالية للجنسية." },
      ],
      cons: [
        { en: "Wages are among the lowest in western Europe.", ar: "الأجور من الأدنى في غرب أوروبا." },
        { en: "Lisbon rents have outpaced local salaries badly.", ar: "إيجارات لشبونة تجاوزت الرواتب المحلية بفارق كبير." },
        { en: "AIMA appointment backlogs cause long, unpredictable delays.", ar: "تراكم مواعيد AIMA يسبب تأخيرات طويلة غير متوقعة." },
        { en: "The professional job market is thin outside tech and tourism.", ar: "سوق العمل المهني ضعيف خارج التقنية والسياحة." },
      ],
    },
  },

  us: {
    residency: {
      permanent: {
        en: "A green card is permanent residence. Employment-based categories (EB-2, EB-3) require employer sponsorship and, usually, labour certification. Waiting times depend on your country of birth — applicants born in India or China face queues measured in years or decades.",
        ar: "البطاقة الخضراء هي الإقامة الدائمة. وتتطلب فئات العمل (EB-2 وEB-3) كفالة صاحب العمل، وعادةً شهادة سوق العمل. وأوقات الانتظار تعتمد على بلد ميلادك — فالمولودون في الهند أو الصين يواجهون طوابير تُقاس بالسنوات أو العقود.",
      },
      citizenship: {
        en: "Five years as a permanent resident, or three if married to a US citizen, plus an English and civics test. The United States permits dual nationality.",
        ar: "خمس سنوات كمقيم دائم، أو ثلاث في حال الزواج من مواطن أمريكي، إضافة إلى اختبار في الإنجليزية والتربية الوطنية. وتسمح الولايات المتحدة بازدواج الجنسية.",
      },
      rights: [
        { en: "Dual nationality is permitted.", ar: "ازدواج الجنسية مسموح." },
        { en: "H-1B status is tied to your employer; changing jobs requires a transfer petition.", ar: "وضع H-1B مرتبط بصاحب عملك، وتغيير الوظيفة يتطلب التماس نقل." },
        { en: "H-4 spouses can work only in limited circumstances, unlike most countries.", ar: "أزواج حاملي H-4 لا يمكنهم العمل إلا في حالات محدودة، بخلاف معظم الدول." },
        { en: "Children born in the US are citizens by birth regardless of parents' status.", ar: "الأطفال المولودون في أمريكا مواطنون بالولادة بغض النظر عن وضع الوالدين." },
      ],
      labourLaw: [
        { en: "There is no federal statutory paid annual leave — holidays are employer discretion.", ar: "لا توجد إجازة سنوية مدفوعة بموجب القانون الاتحادي — فالإجازات تقدير صاحب العمل." },
        { en: "Most employment is at-will and can be ended without cause or notice.", ar: "معظم التوظيف «حسب الرغبة» ويمكن إنهاؤه دون سبب أو إشعار." },
        { en: "Health insurance is usually tied to your employer, which raises the cost of losing a job.", ar: "التأمين الصحي مرتبط عادةً بصاحب العمل، ما يرفع كلفة فقدان الوظيفة." },
        { en: "Labour standards vary widely by state, more than in any other destination here.", ar: "معايير العمل تتفاوت كثيرًا بين الولايات، أكثر من أي وجهة أخرى هنا." },
      ],
    },
    jobMarket: {
      industries: [
        { en: "Technology, from the Bay Area to Seattle, Austin and New York", ar: "التقنية، من منطقة الخليج إلى سياتل وأوستن ونيويورك" },
        { en: "Healthcare, with sustained nationwide nursing shortages", ar: "الرعاية الصحية، مع نقص مستمر في التمريض على مستوى البلاد" },
        { en: "Finance and professional services", ar: "المالية والخدمات المهنية" },
        { en: "Research, biotech and higher education", ar: "البحث والتقنية الحيوية والتعليم العالي" },
        { en: "Engineering and advanced manufacturing", ar: "الهندسة والتصنيع المتقدم" },
      ],
      equivalency: {
        en: "There is no central recognition body. Private credential evaluators (WES, ECE) produce the assessments employers and universities expect. Nurses take the NCLEX-RN and license state by state; doctors need ECFMG certification and a US residency; engineers license through state boards. Licensing is per-state, so moving can mean re-licensing.",
        ar: "لا توجد جهة اعتراف مركزية. وتصدر شركات تقييم الشهادات الخاصة (WES وECE) التقييمات التي يتوقعها أصحاب العمل والجامعات. ويؤدي الممرضون امتحان NCLEX-RN ويُرخَّصون في كل ولاية على حدة، ويحتاج الأطباء شهادة ECFMG وإقامة تدريبية أمريكية، ويُرخَّص المهندسون عبر مجالس الولايات. والترخيص لكل ولاية، فالانتقال قد يعني إعادة الترخيص.",
      },
      wages: {
        en: "Salaries are the highest here of any destination in this guide. Software engineers earn USD 110,000–185,000, registered nurses USD 75,000–110,000. Set against that: health insurance premiums, deductibles, and childcare and education costs that are public services elsewhere.",
        ar: "الرواتب هي الأعلى بين كل الوجهات في هذا الدليل. ويكسب مهندسو البرمجيات ١١٠٠٠٠–١٨٥٠٠٠ دولار، والممرضون المسجلون ٧٥٠٠٠–١١٠٠٠٠. وفي المقابل: أقساط التأمين الصحي والتحملات وتكاليف رعاية الأطفال والتعليم التي تكون خدمات عامة في أماكن أخرى.",
      },
    },
    life: {
      housing: {
        en: "Costs vary more within the US than between most countries. San Francisco and New York are extreme; much of the Midwest and South is affordable on the same salary. Landlords typically want credit history, which new arrivals do not have — expect to pay a larger deposit instead.",
        ar: "تتفاوت التكاليف داخل أمريكا أكثر مما تتفاوت بين معظم الدول. فسان فرانسيسكو ونيويورك متطرفتان، بينما معظم الغرب الأوسط والجنوب ميسور بالراتب نفسه. ويطلب الملاك عادةً سجلًا ائتمانيًا لا يملكه القادمون الجدد — فتوقّع دفع تأمين أكبر بدلًا منه.",
      },
      language: {
        en: "English throughout. No formal language test applies to work visas, though the naturalisation test includes English.",
        ar: "الإنجليزية في كل شيء. ولا ينطبق اختبار لغة رسمي على تأشيرات العمل، وإن كان اختبار التجنّس يشمل الإنجليزية.",
      },
      integration: {
        en: "Apply for a Social Security Number immediately; banking, credit and employment all depend on it. Understand your employer's health plan before you start — deductibles and networks vary enormously and a serious illness without good cover is financially dangerous.",
        ar: "تقدّم لرقم الضمان الاجتماعي فورًا، فالخدمات المصرفية والائتمان والتوظيف تعتمد عليه جميعًا. وافهم خطة صاحب عملك الصحية قبل أن تبدأ — فالتحمّلات وشبكات المزودين تتفاوت بشدة، والمرض الخطير دون تغطية جيدة خطر مالي.",
      },
      pros: [
        { en: "The highest salaries and deepest specialist job markets available.", ar: "أعلى الرواتب وأعمق أسواق التخصص المتاحة." },
        { en: "Dual nationality permitted and birthright citizenship for children.", ar: "ازدواج الجنسية مسموح وجنسية بالولادة للأطفال." },
        { en: "World-leading research institutions and career ceilings.", ar: "مؤسسات بحثية رائدة عالميًا وسقوف مهنية عالية." },
        { en: "Enormous internal variety in cost of living and lifestyle.", ar: "تنوع داخلي هائل في تكلفة المعيشة ونمط الحياة." },
      ],
      cons: [
        { en: "The H-1B lottery makes the main work route a matter of chance.", ar: "قرعة H-1B تجعل المسار الوظيفي الرئيسي مسألة حظ." },
        { en: "Green card queues run years or decades for some countries of birth.", ar: "طوابير البطاقة الخضراء تمتد سنوات أو عقودًا لبعض بلدان الميلاد." },
        { en: "Healthcare costs and employer-tied insurance are a structural risk.", ar: "تكاليف الرعاية الصحية والتأمين المرتبط بصاحب العمل خطر هيكلي." },
        { en: "No statutory paid leave and at-will employment.", ar: "لا إجازة مدفوعة بموجب القانون، والتوظيف «حسب الرغبة»." },
      ],
    },
  },
};
