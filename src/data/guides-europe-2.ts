import type { VisaGuide } from "@/lib/types";

/** Second block of European guides. Same section order as guides-europe.ts. */
export const EUROPE_GUIDES_2: VisaGuide[] = [
  {
    countryCode: "be",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Belgium: single permits, regions and residency",
      ar: "الانتقال إلى بلجيكا: التصريح الموحّد والأقاليم والإقامة",
    },
    summary: {
      en: "Belgium issues one combined work-and-residence permit, but the rules are set by three regions rather than the federal government — Flanders, Wallonia and Brussels each have their own salary thresholds and shortage lists.",
      ar: "تصدر بلجيكا تصريحًا موحّدًا للعمل والإقامة، لكن القواعد تضعها ثلاثة أقاليم لا الحكومة الاتحادية — فلاندرز ووالونيا وبروكسل، ولكل منها حدود رواتب وقوائم مهن ناقصة خاصة.",
    },
    intro: {
      en: "Which region your employer is registered in decides your salary threshold, your paperwork and how quickly you are approved. Brussels is bilingual and hosts the EU institutions, Flanders runs in Dutch and has the strongest labour market, Wallonia runs in French and is cheaper to live in. Check the region before you check anything else.",
      ar: "الإقليم الذي يسجَّل فيه صاحب عملك هو ما يحدد حد راتبك وأوراقك وسرعة الموافقة عليك. فبروكسل ثنائية اللغة وتستضيف مؤسسات الاتحاد الأوروبي، وفلاندرز تعمل بالهولندية ولديها أقوى سوق عمل، ووالونيا تعمل بالفرنسية وأرخص في المعيشة. تحقّق من الإقليم قبل أي شيء آخر.",
    },
    routes: [
      {
        name: { en: "Single permit (highly skilled)", ar: "التصريح الموحّد (عالي المهارة)" },
        who: {
          en: "Degree holders with a job offer above the regional threshold — roughly €48,000–52,000 a year depending on region and age. One application covers both work and residence.",
          ar: "حاملو الشهادات بعرض عمل يتجاوز حد الإقليم — نحو ٤٨٠٠٠–٥٢٠٠٠ يورو سنويًا حسب الإقليم والعمر. ويغطي طلب واحد العمل والإقامة معًا.",
        },
        processing: { en: "6–16 weeks", ar: "من ٦ إلى ١٦ أسبوعًا" },
        cost: { en: "€150–200 regional fee plus €138 residence", ar: "من ١٥٠ إلى ٢٠٠ يورو رسوم إقليمية إضافة إلى ١٣٨ يورو للإقامة" },
      },
      {
        name: { en: "EU Blue Card", ar: "البطاقة الزرقاء الأوروبية" },
        who: {
          en: "Graduates on a contract of at least a year above the Blue Card threshold. Adds mobility rights across the EU that the single permit does not carry.",
          ar: "الخريجون بعقد لا يقل عن سنة يتجاوز حد البطاقة الزرقاء. وتضيف حقوق تنقل داخل الاتحاد الأوروبي لا يمنحها التصريح الموحّد.",
        },
        processing: { en: "3–4 months", ar: "من ٣ إلى ٤ أشهر" },
        cost: { en: "About €300 in total", ar: "نحو ٣٠٠ يورو إجمالًا" },
      },
      {
        name: { en: "Student and orientation year", ar: "الدراسة وسنة التوجيه" },
        who: {
          en: "Students may work 20 hours a week, and graduates of a Belgian institution get a 12-month search year to find qualifying work or launch a business.",
          ar: "يمكن للطلاب العمل ٢٠ ساعة أسبوعيًا، ويحصل خريجو المؤسسات البلجيكية على سنة بحث مدتها ١٢ شهرًا لإيجاد عمل مؤهل أو بدء مشروع.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "€250 visa plus tuition", ar: "٢٥٠ يورو للتأشيرة إضافة إلى الرسوم الدراسية" },
      },
    ],
    requirements: [
      { en: "Job offer from an employer registered in a Belgian region", ar: "عرض عمل من صاحب عمل مسجّل في أحد الأقاليم البلجيكية" },
      { en: "Legalised and translated diploma, and a medical certificate", ar: "شهادة مصدّقة ومترجمة، وشهادة طبية" },
      { en: "Criminal record certificate covering the last five years", ar: "شهادة سجل جنائي تغطي السنوات الخمس الأخيرة" },
      { en: "Registration at your commune within eight days of arrival", ar: "التسجيل في البلدية خلال ثمانية أيام من الوصول" },
      { en: "Enrolment with a mutuelle health fund", ar: "الانتساب إلى صندوق تأمين صحي (mutuelle)" },
      { en: "Proof the salary meets the region's threshold for your category", ar: "إثبات أن الراتب يستوفي حد الإقليم لفئتك" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Unlimited residence (F/K card) follows five years of continuous legal stay with stable income. Blue Card holders can count time spent in other EU states toward the total, which few other routes allow.",
          ar: "تأتي الإقامة غير المحدودة (بطاقة F/K) بعد خمس سنوات من الإقامة القانونية المتصلة بدخل مستقر. ويمكن لحاملي البطاقة الزرقاء احتساب المدة التي قضوها في دول أوروبية أخرى ضمن المجموع، وهو ما لا تتيحه مسارات أخرى كثيرة.",
        },
        citizenship: {
          en: "Five years of legal residence, proof of economic participation, social integration and knowledge of one of the three national languages at A2. Belgium allows dual nationality.",
          ar: "خمس سنوات من الإقامة القانونية، مع إثبات المشاركة الاقتصادية والاندماج الاجتماعي ومعرفة إحدى اللغات الوطنية الثلاث بمستوى A2. وتسمح بلجيكا بازدواج الجنسية.",
        },
        rights: [
          { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
          { en: "Spouses of single-permit holders receive full work rights.", ar: "يحصل أزواج حاملي التصريح الموحّد على حقوق عمل كاملة." },
          { en: "After 12 months you may change employer within the same region.", ar: "بعد ١٢ شهرًا يمكنك تغيير صاحب العمل داخل الإقليم نفسه." },
          { en: "EU institution staff follow a separate, more generous special-status regime.", ar: "موظفو مؤسسات الاتحاد الأوروبي يخضعون لنظام وضع خاص منفصل وأكثر سخاءً." },
        ],
        labourLaw: [
          { en: "38-hour week, 20 days of statutory leave and 10 public holidays.", ar: "أسبوع ٣٨ ساعة، و٢٠ يوم إجازة قانونية، و١٠ عطلات رسمية." },
          { en: "Holiday pay and a thirteenth month are standard in most sectors.", ar: "بدل الإجازة والراتب الثالث عشر معتادان في معظم القطاعات." },
          { en: "Notice periods scale with seniority and are strictly enforced.", ar: "فترات الإشعار تتناسب مع الأقدمية وتُطبَّق بصرامة." },
          { en: "Meal vouchers and transport reimbursement are near-universal benefits.", ar: "قسائم الوجبات وتعويض المواصلات مزايا شبه شاملة." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "EU institutions, NGOs and international policy work in Brussels", ar: "مؤسسات الاتحاد الأوروبي والمنظمات غير الحكومية والعمل السياساتي الدولي في بروكسل" },
          { en: "Pharmaceuticals and life sciences, a Belgian speciality", ar: "الأدوية وعلوم الحياة، وهو تخصص بلجيكي" },
          { en: "Logistics around the port of Antwerp", ar: "الخدمات اللوجستية حول ميناء أنتويرب" },
          { en: "IT and cybersecurity across all three regions", ar: "تقنية المعلومات والأمن السيبراني في الأقاليم الثلاثة" },
          { en: "Construction and technical trades on the shortage lists", ar: "البناء والحرف التقنية المدرجة في قوائم النقص" },
        ],
        equivalency: {
          en: "Recognition is regional: NARIC Vlaanderen for Flanders, the French Community service for Wallonia and Brussels. Regulated health professions go through the FPS Health. Apply to the region where you will actually work — a Flemish equivalence does not automatically transfer.",
          ar: "الاعتراف بالشهادات إقليمي: NARIC فلاندرز لفلاندرز، وخدمة المجتمع الفرنسي لوالونيا وبروكسل. أما المهن الصحية المنظّمة فتمر عبر الهيئة الاتحادية للصحة. وقدّم طلبك للإقليم الذي ستعمل فيه فعلًا — فالمعادلة الفلمنكية لا تنتقل تلقائيًا.",
        },
        wages: {
          en: "The national minimum is around €2,070 gross a month. Engineers and developers start near €42,000–50,000 and reach €70,000 with experience. Belgium's tax and social-security wedge is one of Europe's heaviest — budget on net, never on gross.",
          ar: "الحد الأدنى الوطني نحو ٢٠٧٠ يورو إجمالًا شهريًا. ويبدأ المهندسون والمطورون بنحو ٤٢٠٠٠–٥٠٠٠٠ ويصلون إلى ٧٠٠٠٠ مع الخبرة. وعبء الضرائب والاشتراكات في بلجيكا من الأثقل في أوروبا — احسب ميزانيتك على الصافي لا الإجمالي أبدًا.",
        },
      },
      life: {
        housing: {
          en: "Brussels is comfortably cheaper than Amsterdam or Paris for comparable space, and rental supply is reasonable. Registration at the commune triggers a police visit to confirm you live at the address — routine, but it surprises people.",
          ar: "بروكسل أرخص بوضوح من أمستردام أو باريس لمساحة مماثلة، والمعروض الإيجاري معقول. والتسجيل في البلدية يستدعي زيارة شرطة للتأكد من إقامتك في العنوان — إجراء روتيني لكنه يفاجئ الناس.",
        },
        language: {
          en: "Brussels functions in French with English widely spoken; Flanders expects Dutch and Wallonia French. English alone is viable in the EU bubble and international firms, and limiting almost everywhere else.",
          ar: "تعمل بروكسل بالفرنسية مع انتشار واسع للإنجليزية، بينما تتوقع فلاندرز الهولندية ووالونيا الفرنسية. والإنجليزية وحدها تكفي في وسط المؤسسات الأوروبية والشركات الدولية، ومقيّدة في كل مكان تقريبًا عداهما.",
        },
        integration: {
          en: "Flanders requires a formal inburgering integration course; the French Community has a lighter equivalent. Both are free, count toward citizenship, and include language tuition. Join a mutuelle early — it is how healthcare reimbursement works.",
          ar: "تشترط فلاندرز دورة اندماج رسمية (inburgering)، وللمجتمع الفرنسي نسخة أخف. وكلتاهما مجانيتان وتُحتسبان للجنسية وتشملان تعليم اللغة. وانضم إلى صندوق تأمين صحي مبكرًا — فهو آلية استرداد تكاليف الرعاية الصحية.",
        },
        pros: [
          { en: "Central location with fast rail to Paris, Amsterdam, Cologne and London.", ar: "موقع مركزي مع قطارات سريعة إلى باريس وأمستردام وكولونيا ولندن." },
          { en: "Five years to citizenship, shorter than most neighbours.", ar: "خمس سنوات للجنسية، أقصر من معظم دول الجوار." },
          { en: "Strong international job market concentrated in one small city.", ar: "سوق عمل دولي قوي متركز في مدينة صغيرة واحدة." },
          { en: "Housing is affordable relative to salaries.", ar: "السكن ميسور مقارنة بالرواتب." },
        ],
        cons: [
          { en: "Among the highest effective tax burdens in Europe.", ar: "من أعلى الأعباء الضريبية الفعلية في أوروبا." },
          { en: "Three-region bureaucracy duplicates rules and paperwork.", ar: "بيروقراطية الأقاليم الثلاثة تضاعف القواعد والأوراق." },
          { en: "Language politics affect jobs, schooling and services.", ar: "سياسات اللغة تؤثر في الوظائف والتعليم والخدمات." },
          { en: "Weather is grey and wet for much of the year.", ar: "الطقس رمادي وممطر معظم أشهر السنة." },
        ],
      },
    },
  },

  {
    countryCode: "se",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Sweden: work permits, salary floors and residency",
      ar: "الانتقال إلى السويد: تصاريح العمل وحدود الأجور والإقامة",
    },
    summary: {
      en: "Sweden's work permit is open to any occupation, but the salary floor has risen sharply and now excludes much of the low-wage hiring that used to drive migration here.",
      ar: "تصريح العمل السويدي مفتوح لأي مهنة، لكن الحد الأدنى للراتب ارتفع بشدة وصار يستبعد كثيرًا من التوظيف منخفض الأجر الذي كان يقود الهجرة إلى هنا.",
    },
    intro: {
      en: "There is no shortage list and no points test: if an employer offers you a job that meets the maintenance requirement and matches collective-agreement terms, you qualify. The catch is that the threshold has moved from a token amount to a substantial share of the median wage, and it is indexed — verify the current figure before relying on an offer.",
      ar: "لا توجد قائمة مهن ناقصة ولا اختبار نقاط: إذا عرض عليك صاحب عمل وظيفة تستوفي شرط الإعالة وتطابق شروط الاتفاقية الجماعية، فأنت مؤهل. لكن المشكلة أن الحد انتقل من مبلغ رمزي إلى نسبة كبيرة من الأجر الوسيط، وهو مرتبط بمؤشر — تحقّق من الرقم الحالي قبل الاعتماد على أي عرض.",
    },
    routes: [
      {
        name: { en: "Standard work permit", ar: "تصريح العمل الاعتيادي" },
        who: {
          en: "Any occupation, provided the salary clears the maintenance threshold and the employer offers insurance and terms matching the relevant collective agreement.",
          ar: "أي مهنة، شرط أن يتجاوز الراتب حد الإعالة وأن يوفّر صاحب العمل تأمينًا وشروطًا مطابقة للاتفاقية الجماعية المعنية.",
        },
        processing: { en: "1–4 months; certified employers are faster", ar: "من شهر إلى أربعة أشهر، وأصحاب العمل المعتمدون أسرع" },
        cost: { en: "SEK 2,200", ar: "٢٢٠٠ كرونة سويدية" },
      },
      {
        name: { en: "EU Blue Card", ar: "البطاقة الزرقاء الأوروبية" },
        who: {
          en: "Graduates on a contract of at least six months paid above the Blue Card threshold, with EU mobility rights attached.",
          ar: "الخريجون بعقد لا يقل عن ستة أشهر بأجر يتجاوز حد البطاقة الزرقاء، مع حقوق تنقل داخل الاتحاد الأوروبي.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "SEK 2,200", ar: "٢٢٠٠ كرونة سويدية" },
      },
      {
        name: { en: "Job seeker permit for the highly qualified", ar: "تصريح البحث عن عمل للمؤهلين تأهيلًا عاليًا" },
        who: {
          en: "Holders of a master's degree or higher may enter for three to nine months to look for work or investigate starting a business, with proof of funds and insurance.",
          ar: "يمكن لحاملي الماجستير فما فوق الدخول من ثلاثة إلى تسعة أشهر للبحث عن عمل أو دراسة بدء مشروع، مع إثبات أموال وتأمين.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "SEK 1,500", ar: "١٥٠٠ كرونة سويدية" },
      },
    ],
    requirements: [
      { en: "Formal written job offer advertised in the EU/EEA for at least ten days", ar: "عرض عمل خطي رسمي أُعلن في الاتحاد الأوروبي والمنطقة الاقتصادية عشرة أيام على الأقل" },
      { en: "Salary at or above the current maintenance threshold, indexed annually", ar: "راتب عند حد الإعالة الحالي أو أعلى، ويُحدَّث سنويًا" },
      { en: "Health, life, occupational injury and pension insurance from the employer", ar: "تأمين صحي وتأمين حياة وإصابات عمل ومعاش من صاحب العمل" },
      { en: "Union statement on the terms of employment", ar: "إفادة من النقابة بشأن شروط التوظيف" },
      { en: "Passport valid for the full permit period", ar: "جواز سفر ساري طوال مدة التصريح" },
      { en: "Personnummer registration with the Tax Agency after arrival", ar: "تسجيل الرقم الشخصي لدى مصلحة الضرائب بعد الوصول" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Permanent residence requires four years of work permits within the last seven, plus the ability to support yourself and, since recent reforms, a demonstrated command of Swedish and civics. The rules here have changed repeatedly — confirm the current test.",
          ar: "تتطلب الإقامة الدائمة أربع سنوات من تصاريح العمل خلال السبع الأخيرة، مع القدرة على إعالة نفسك، ومنذ إصلاحات حديثة إثبات إتقان السويدية والتربية الوطنية. وقد تغيّرت هذه القواعد مرارًا — تأكّد من الاختبار الحالي.",
        },
        citizenship: {
          en: "Five years of habitual residence for most applicants, with proposals to extend this and add language and self-sufficiency tests. Sweden permits dual nationality.",
          ar: "خمس سنوات من الإقامة المعتادة لمعظم المتقدمين، مع مقترحات لتمديدها وإضافة اختبارات لغة واكتفاء ذاتي. وتسمح السويد بازدواج الجنسية.",
        },
        rights: [
          { en: "Dual nationality is permitted.", ar: "ازدواج الجنسية مسموح." },
          { en: "Family members receive permits of the same length with full work rights.", ar: "يحصل أفراد الأسرة على تصاريح بالمدة نفسها مع حقوق عمل كاملة." },
          { en: "You may change employer freely after the first two years.", ar: "يمكنك تغيير صاحب العمل بحرية بعد أول سنتين." },
          { en: "The personnummer is the key to banking, healthcare and housing.", ar: "الرقم الشخصي هو مفتاح الخدمات المصرفية والصحية والسكن." },
        ],
        labourLaw: [
          { en: "40-hour week with 25 days of statutory paid leave.", ar: "أسبوع ٤٠ ساعة مع ٢٥ يوم إجازة قانونية مدفوعة." },
          { en: "480 days of shared parental leave per child, among the world's most generous.", ar: "٤٨٠ يومًا إجازة والدية مشتركة لكل طفل، من الأكثر سخاءً عالميًا." },
          { en: "There is no statutory minimum wage; collective agreements set the floor.", ar: "لا يوجد حد أدنى قانوني للأجور، والاتفاقيات الجماعية هي التي تحدد الحد." },
          { en: "Union membership is high and shapes pay and conditions in most sectors.", ar: "العضوية النقابية مرتفعة وتشكّل الأجور والشروط في معظم القطاعات." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Software, gaming and telecoms — Stockholm's core export", ar: "البرمجيات والألعاب والاتصالات — صادرات ستوكهولم الأساسية" },
          { en: "Healthcare, with persistent nurse and doctor shortages", ar: "الرعاية الصحية، مع نقص مستمر في الممرضين والأطباء" },
          { en: "Green industry and battery manufacturing in the north", ar: "الصناعة الخضراء وتصنيع البطاريات في الشمال" },
          { en: "Engineering and automotive around Gothenburg", ar: "الهندسة وصناعة السيارات حول غوتنبرغ" },
          { en: "Construction and skilled trades", ar: "البناء والحرف الماهرة" },
        ],
        equivalency: {
          en: "UHR evaluates foreign degrees for general purposes. Regulated professions go elsewhere: Socialstyrelsen for health roles, which requires Swedish at C1 for patient-facing work plus a proficiency assessment, and Skolverket for teachers. Health recognition is the long pole and can take two years.",
          ar: "تقيّم UHR الشهادات الأجنبية للأغراض العامة. أما المهن المنظّمة فلها جهات أخرى: الهيئة الوطنية للصحة للوظائف الصحية، وتشترط السويدية بمستوى C1 للعمل مع المرضى إضافة إلى تقييم كفاءة، وSkolverket للمعلمين. والاعتراف الصحي هو الأطول وقد يستغرق سنتين.",
        },
        wages: {
          en: "Median full-time pay is roughly SEK 37,000 a month gross. Developers earn SEK 45,000–65,000, nurses SEK 33,000–45,000. Income tax runs about 30–34% at municipal level with a state surcharge on higher earnings.",
          ar: "الأجر الوسيط للدوام الكامل نحو ٣٧٠٠٠ كرونة شهريًا إجمالًا. ويكسب المطورون ٤٥٠٠٠–٦٥٠٠٠ والممرضون ٣٣٠٠٠–٤٥٠٠٠. وضريبة الدخل نحو ٣٠–٣٤٪ على المستوى البلدي مع رسم إضافي حكومي على الدخول الأعلى.",
        },
      },
      life: {
        housing: {
          en: "Stockholm's first-hand rental queue is measured in years, so most newcomers start in expensive second-hand sublets. Employers sometimes hold housing allocations — ask before you accept an offer. Buying is common and mortgages are accessible once you have a personnummer.",
          ar: "طابور الإيجار الأول في ستوكهولم يُقاس بالسنوات، لذا يبدأ معظم القادمين الجدد بإيجارات ثانوية مكلفة. وأحيانًا يملك أصحاب العمل مخصصات سكن — اسأل قبل قبول العرض. والشراء شائع والقروض العقارية متاحة بمجرد حصولك على رقم شخصي.",
        },
        language: {
          en: "English is genuinely sufficient at work in tech and research, and Swedes speak it at a high level. Swedish still decides access to healthcare jobs, public sector roles, permanent residence and social depth.",
          ar: "الإنجليزية كافية فعلًا في العمل بقطاعي التقنية والبحث، والسويديون يتحدثونها بمستوى عالٍ. لكن السويدية تظل هي ما يحدد الوصول إلى الوظائف الصحية والقطاع العام والإقامة الدائمة والعمق الاجتماعي.",
        },
        integration: {
          en: "SFI (Swedish for Immigrants) is free and available to anyone with a personnummer. Register with the Tax Agency in your first week — nearly every other service depends on it, and delays there cascade into banking and healthcare.",
          ar: "دورات SFI (السويدية للمهاجرين) مجانية ومتاحة لكل من لديه رقم شخصي. وسجّل لدى مصلحة الضرائب في أسبوعك الأول — فكل خدمة أخرى تقريبًا تعتمد عليه، والتأخير فيه ينعكس على الخدمات المصرفية والصحية.",
        },
        pros: [
          { en: "No shortage list — any occupation can qualify for a permit.", ar: "لا توجد قائمة مهن ناقصة — أي مهنة يمكن أن تؤهلك للتصريح." },
          { en: "Exceptional parental leave, childcare and work-life balance.", ar: "إجازة والدية ورعاية أطفال وتوازن عمل وحياة استثنائي." },
          { en: "English-functional workplaces in tech and academia.", ar: "بيئات عمل تعمل بالإنجليزية في التقنية والأوساط الأكاديمية." },
          { en: "Family members get full work rights from day one.", ar: "أفراد الأسرة يحصلون على حقوق عمل كاملة من اليوم الأول." },
        ],
        cons: [
          { en: "Salary thresholds have risen sharply and keep moving.", ar: "حدود الرواتب ارتفعت بحدة وما زالت تتغير." },
          { en: "Stockholm housing is genuinely difficult for newcomers.", ar: "السكن في ستوكهولم صعب فعلًا على القادمين الجدد." },
          { en: "Residency and citizenship rules have tightened repeatedly.", ar: "قواعد الإقامة والجنسية تشدّدت مرارًا." },
          { en: "Long, dark winters take a real adjustment.", ar: "شتاء طويل ومظلم يتطلب تأقلمًا حقيقيًا." },
        ],
      },
    },
  },

  {
    countryCode: "ch",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Switzerland: quotas, permits and the highest wages in Europe",
      ar: "الانتقال إلى سويسرا: الحصص والتصاريح وأعلى الأجور في أوروبا",
    },
    summary: {
      en: "Switzerland pays more than anywhere else in Europe and admits fewer non-EU workers than almost anywhere else. Permits are capped by federal quota and your employer must prove nobody in Switzerland or the EU could do the job.",
      ar: "تدفع سويسرا أكثر من أي مكان في أوروبا وتقبل من العمال غير الأوروبيين أقل من معظم الدول. فالتصاريح محكومة بحصة اتحادية، وعلى صاحب عملك إثبات أن لا أحد في سويسرا أو الاتحاد الأوروبي يمكنه أداء الوظيفة.",
    },
    intro: {
      en: "For third-country nationals this is one of Europe's hardest markets to enter and one of its most rewarding to be in. Admission is restricted to managers, specialists and the highly qualified, the annual quota is small, and cantons administer it individually. Salaries and the quality of public services are the compensation.",
      ar: "بالنسبة لمواطني الدول الثالثة، هذه من أصعب الأسواق دخولًا في أوروبا ومن أكثرها مكافأةً بعد الدخول. فالقبول مقصور على المديرين والمتخصصين وذوي المؤهلات العالية، والحصة السنوية صغيرة، والكانتونات تديرها كلٌّ على حدة. والرواتب وجودة الخدمات العامة هي التعويض.",
    },
    routes: [
      {
        name: { en: "B permit — qualified third-country national", ar: "تصريح B — مواطن دولة ثالثة مؤهل" },
        who: {
          en: "Managers, specialists and university graduates with proven experience, hired at local market pay. Counted against the federal quota and tied initially to one canton and employer.",
          ar: "المديرون والمتخصصون وخريجو الجامعات ذوو الخبرة المثبتة، بأجر السوق المحلي. ويُحتسب ضمن الحصة الاتحادية ويرتبط مبدئيًا بكانتون واحد وصاحب عمل واحد.",
        },
        processing: { en: "2–4 months across cantonal and federal stages", ar: "من شهرين إلى أربعة أشهر عبر المرحلتين الكانتونية والاتحادية" },
        cost: { en: "CHF 100–800 depending on canton", ar: "من ١٠٠ إلى ٨٠٠ فرنك حسب الكانتون" },
      },
      {
        name: { en: "L permit — short-term", ar: "تصريح L — قصير الأمد" },
        who: {
          en: "Assignments under 12 months, including project work and intra-company transfers. Convertible to a B permit in some cantons, but not guaranteed.",
          ar: "المهام التي تقل عن ١٢ شهرًا، بما فيها العمل على المشاريع والنقل داخل الشركة. وقابل للتحويل إلى تصريح B في بعض الكانتونات، لكن دون ضمان.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "CHF 100–500", ar: "من ١٠٠ إلى ٥٠٠ فرنك" },
      },
      {
        name: { en: "Student permit and post-study stay", ar: "تصريح الدراسة والبقاء بعد التخرج" },
        who: {
          en: "Students at Swiss universities may work 15 hours a week and stay six months after graduating to find qualifying work. Graduates of Swiss institutions are exempt from part of the labour market test.",
          ar: "يمكن لطلاب الجامعات السويسرية العمل ١٥ ساعة أسبوعيًا والبقاء ستة أشهر بعد التخرج لإيجاد عمل مؤهل. وخريجو المؤسسات السويسرية معفون من جزء من اختبار سوق العمل.",
        },
        processing: { en: "8–12 weeks", ar: "من ٨ إلى ١٢ أسبوعًا" },
        cost: { en: "CHF 100–200 plus tuition", ar: "من ١٠٠ إلى ٢٠٠ فرنك إضافة إلى الرسوم الدراسية" },
      },
    ],
    requirements: [
      { en: "Employer proof that no Swiss or EU candidate was available", ar: "إثبات من صاحب العمل بعدم توفر مرشح سويسري أو أوروبي" },
      { en: "Salary and conditions matching local market rates for the role", ar: "راتب وشروط تطابق أسعار السوق المحلي للوظيفة" },
      { en: "Recognised university degree or equivalent professional record", ar: "شهادة جامعية معترف بها أو سجل مهني معادل" },
      { en: "Mandatory Swiss health insurance within three months of arrival", ar: "تأمين صحي سويسري إلزامي خلال ثلاثة أشهر من الوصول" },
      { en: "Registration with the commune within 14 days", ar: "التسجيل في البلدية خلال ١٤ يومًا" },
      { en: "Available place in the annual federal quota", ar: "توفر مكان في الحصة الاتحادية السنوية" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "The C settlement permit normally comes after ten years for third-country nationals, or five with strong integration and language proof. It removes the link to employer and canton and is close to unconditional.",
          ar: "يأتي تصريح الاستقرار C عادةً بعد عشر سنوات لمواطني الدول الثالثة، أو خمس مع اندماج قوي وإثبات لغوي. ويلغي الارتباط بصاحب العمل والكانتون ويكاد يكون غير مشروط.",
        },
        citizenship: {
          en: "Ten years of residence including a C permit, plus cantonal and communal residence conditions, a language level set locally (usually B1 spoken, A2 written) and an integration assessment. Switzerland permits dual nationality.",
          ar: "عشر سنوات إقامة تشمل تصريح C، إضافة إلى شروط إقامة كانتونية وبلدية، ومستوى لغوي يحدد محليًا (عادةً B1 محادثة وA2 كتابة)، وتقييم اندماج. وتسمح سويسرا بازدواج الجنسية.",
        },
        rights: [
          { en: "Dual nationality is permitted.", ar: "ازدواج الجنسية مسموح." },
          { en: "B permit holders need approval to change canton in the first year.", ar: "حاملو تصريح B يحتاجون موافقة لتغيير الكانتون في السنة الأولى." },
          { en: "Family reunion is available but requires adequate housing and income.", ar: "لمّ الشمل متاح لكنه يشترط سكنًا ودخلًا كافيين." },
          { en: "Naturalisation decisions involve your commune, not just the federal state.", ar: "قرارات التجنّس تشارك فيها بلديتك لا الدولة الاتحادية وحدها." },
        ],
        labourLaw: [
          { en: "Typical week is 40–42 hours; the legal maximum is 45–50 by sector.", ar: "الأسبوع المعتاد ٤٠–٤٢ ساعة، والحد القانوني الأقصى ٤٥–٥٠ حسب القطاع." },
          { en: "Four weeks of paid leave is the statutory minimum; five is common.", ar: "أربعة أسابيع إجازة مدفوعة هي الحد الأدنى القانوني، وخمسة شائعة." },
          { en: "There is no national minimum wage; a few cantons set their own.", ar: "لا يوجد حد أدنى وطني للأجور، وبعض الكانتونات تضع حدودها الخاصة." },
          { en: "Notice periods are short and dismissal protection is comparatively weak.", ar: "فترات الإشعار قصيرة والحماية من الفصل ضعيفة نسبيًا." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Pharmaceuticals and life sciences around Basel", ar: "الأدوية وعلوم الحياة حول بازل" },
          { en: "Banking, insurance and asset management in Zurich and Geneva", ar: "المصارف والتأمين وإدارة الأصول في زيورخ وجنيف" },
          { en: "Precision engineering, watchmaking and medtech", ar: "الهندسة الدقيقة وصناعة الساعات والتقنيات الطبية" },
          { en: "IT, data and quantitative research", ar: "تقنية المعلومات والبيانات والبحث الكمي" },
          { en: "International organisations and diplomacy in Geneva", ar: "المنظمات الدولية والدبلوماسية في جنيف" },
        ],
        equivalency: {
          en: "SERI (SBFI) handles recognition of foreign qualifications and is the starting point for regulated professions. Medical and nursing recognition is demanding and language-gated by canton. For unregulated roles Swiss employers weigh experience and references far more heavily than formal equivalence.",
          ar: "تتولى SERI الاعتراف بالمؤهلات الأجنبية وهي نقطة البداية للمهن المنظّمة. والاعتراف الطبي والتمريضي صارم ومشروط لغويًا حسب الكانتون. أما الوظائف غير المنظّمة فيزن أصحاب العمل السويسريون فيها الخبرة والتزكيات أكثر بكثير من المعادلة الرسمية.",
        },
        wages: {
          en: "Median pay is around CHF 6,800 gross a month. Engineers and developers commonly earn CHF 100,000–150,000 a year, and finance more. Income tax is low by European standards but health insurance is a private, unavoidable and substantial monthly cost.",
          ar: "الأجر الوسيط نحو ٦٨٠٠ فرنك إجمالًا شهريًا. ويكسب المهندسون والمطورون عادةً ١٠٠٠٠٠–١٥٠٠٠٠ فرنك سنويًا، والقطاع المالي أكثر. وضريبة الدخل منخفضة بالمقاييس الأوروبية، لكن التأمين الصحي تكلفة شهرية خاصة وكبيرة لا مفر منها.",
        },
      },
      life: {
        housing: {
          en: "Zurich and Geneva have vacancy rates near 1% and applications are competitive — expect to submit a dossier with a debt-collection extract. Deposits of three months are standard and held in a blocked account.",
          ar: "نسبة الشواغر في زيورخ وجنيف قرب ١٪ والطلبات تنافسية — توقّع تقديم ملف مع إفادة خلو من الديون. والتأمين المعتاد ثلاثة أشهر يُحفظ في حساب مجمّد.",
        },
        language: {
          en: "Four national languages, and which one matters depends entirely on the canton: German in Zurich and Basel, French in Geneva and Lausanne, Italian in Ticino. Multinationals run in English, but naturalisation and daily services do not.",
          ar: "أربع لغات وطنية، وأيها يهم يتوقف كليًا على الكانتون: الألمانية في زيورخ وبازل، والفرنسية في جنيف ولوزان، والإيطالية في تيتشينو. والشركات متعددة الجنسيات تعمل بالإنجليزية، أما التجنّس والخدمات اليومية فلا.",
        },
        integration: {
          en: "Health insurance is compulsory, private and chosen by you — compare providers, because premiums vary widely for identical statutory cover. Communes run subsidised language courses and expect participation as part of the integration record that naturalisation later depends on.",
          ar: "التأمين الصحي إلزامي وخاص وتختاره بنفسك — قارن بين الشركات لأن الأقساط تتفاوت كثيرًا لتغطية قانونية متطابقة. وتقدّم البلديات دورات لغة مدعومة وتتوقع المشاركة كجزء من سجل الاندماج الذي يعتمد عليه التجنّس لاحقًا.",
        },
        pros: [
          { en: "The highest net salaries in Europe by a wide margin.", ar: "أعلى الرواتب الصافية في أوروبا بفارق كبير." },
          { en: "Low income tax and excellent public infrastructure.", ar: "ضريبة دخل منخفضة وبنية تحتية عامة ممتازة." },
          { en: "Outstanding healthcare quality and short waiting times.", ar: "جودة رعاية صحية متميزة وأوقات انتظار قصيرة." },
          { en: "Central European location with superb transport.", ar: "موقع أوروبي مركزي مع نقل ممتاز." },
        ],
        cons: [
          { en: "Federal quotas make third-country hiring genuinely scarce.", ar: "الحصص الاتحادية تجعل توظيف غير الأوروبيين نادرًا فعلًا." },
          { en: "Living costs, especially rent and insurance, are the highest in Europe.", ar: "تكاليف المعيشة، خاصة الإيجار والتأمين، الأعلى في أوروبا." },
          { en: "Ten years to citizenship, with communal approval on top.", ar: "عشر سنوات للجنسية، مع موافقة بلدية فوق ذلك." },
          { en: "Social integration is slow and often described as closed.", ar: "الاندماج الاجتماعي بطيء ويوصف غالبًا بأنه مغلق." },
        ],
      },
    },
  },

  {
    countryCode: "at",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Austria: the Red-White-Red Card and residency",
      ar: "الانتقال إلى النمسا: البطاقة الحمراء البيضاء الحمراء والإقامة",
    },
    summary: {
      en: "Austria runs a transparent points system called the Red-White-Red Card. You can score yourself before applying, which makes it one of the few European routes where you know your odds in advance.",
      ar: "تدير النمسا نظام نقاط شفافًا يسمى البطاقة الحمراء البيضاء الحمراء. ويمكنك احتساب نقاطك قبل التقديم، ما يجعلها أحد المسارات الأوروبية القليلة التي تعرف فيها حظوظك مسبقًا.",
    },
    intro: {
      en: "Points come from qualifications, work experience, language skills (German and English both count) and age. Different categories have different thresholds, and the shortage-occupation category is the easiest to clear because it needs only a job offer in a listed profession plus the minimum score.",
      ar: "تأتي النقاط من المؤهلات والخبرة العملية والمهارات اللغوية (وتُحتسب الألمانية والإنجليزية معًا) والعمر. ولكل فئة حد مختلف، وفئة المهن الناقصة هي الأسهل لأنها تحتاج فقط عرض عمل في مهنة مدرجة مع الحد الأدنى من النقاط.",
    },
    routes: [
      {
        name: { en: "RWR Card — shortage occupation", ar: "البطاقة الحمراء البيضاء الحمراء — مهنة ناقصة" },
        who: {
          en: "Anyone with a job offer in a profession on the annual shortage list — currently heavy with engineering, IT, healthcare and skilled trades — who scores at least 55 of 90 points.",
          ar: "كل من لديه عرض عمل في مهنة مدرجة على قائمة النقص السنوية — وهي مثقلة حاليًا بالهندسة وتقنية المعلومات والرعاية الصحية والحرف — ويحقق ٥٥ نقطة على الأقل من ٩٠.",
        },
        processing: { en: "8–12 weeks", ar: "من ٨ إلى ١٢ أسبوعًا" },
        cost: { en: "€160 plus €20 card fee", ar: "١٦٠ يورو إضافة إلى ٢٠ يورو رسوم البطاقة" },
      },
      {
        name: { en: "RWR Card — very highly qualified", ar: "البطاقة الحمراء البيضاء الحمراء — مؤهل تأهيلًا عاليًا جدًا" },
        who: {
          en: "Applicants scoring at least 70 of 100 points may enter on a six-month job seeker visa without an offer in hand, then convert once hired.",
          ar: "من يحقق ٧٠ نقطة على الأقل من ١٠٠ يمكنه الدخول بتأشيرة بحث عن عمل لستة أشهر دون عرض في يده، ثم التحويل بعد التوظيف.",
        },
        processing: { en: "8–12 weeks", ar: "من ٨ إلى ١٢ أسبوعًا" },
        cost: { en: "€150 job seeker visa", ar: "١٥٠ يورو لتأشيرة البحث عن عمل" },
      },
      {
        name: { en: "Graduate of an Austrian institution", ar: "خريج مؤسسة نمساوية" },
        who: {
          en: "Graduates may stay twelve months to find work and face a lower salary threshold than other applicants — the smoothest route into the Austrian market.",
          ar: "يمكن للخريجين البقاء اثني عشر شهرًا لإيجاد عمل، ويواجهون حد راتب أقل من غيرهم — وهو أسلس مسار إلى السوق النمساوي.",
        },
        processing: { en: "6–10 weeks", ar: "من ٦ إلى ١٠ أسابيع" },
        cost: { en: "€160", ar: "١٦٠ يورو" },
      },
    ],
    requirements: [
      { en: "Points score meeting the threshold for your chosen category", ar: "نقاط تستوفي الحد المطلوب للفئة التي اخترتها" },
      { en: "Qualifications assessed and, where required, formally recognised", ar: "مؤهلات مقيَّمة، ومعترف بها رسميًا حيث يلزم" },
      { en: "Job offer meeting the minimum salary for the category", ar: "عرض عمل يستوفي الحد الأدنى للراتب في الفئة" },
      { en: "Health insurance covering all risks in Austria", ar: "تأمين صحي يغطي كل المخاطر في النمسا" },
      { en: "Proof of accommodation considered adequate for household size", ar: "إثبات سكن يُعدّ كافيًا لحجم الأسرة" },
      { en: "Meldezettel residence registration within three days of arrival", ar: "تسجيل الإقامة (Meldezettel) خلال ثلاثة أيام من الوصول" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "The Daueraufenthalt-EU permit follows five years of legal residence with stable income, health insurance and German at B1 under Module 2 of the Integration Agreement.",
          ar: "يأتي تصريح الإقامة الدائمة الأوروبي بعد خمس سنوات من الإقامة القانونية مع دخل مستقر وتأمين صحي وألمانية بمستوى B1 ضمن الوحدة الثانية من اتفاقية الاندماج.",
        },
        citizenship: {
          en: "Ten years of residence, or six with strong integration. Austria is strict: applicants normally must renounce their previous nationality, and the income requirement is high and sustained.",
          ar: "عشر سنوات إقامة، أو ست مع اندماج قوي. والنمسا صارمة: إذ يُطلب من المتقدمين عادةً التخلي عن جنسيتهم السابقة، وشرط الدخل مرتفع ومستمر.",
        },
        rights: [
          { en: "Dual nationality is generally NOT permitted — most naturalising applicants must renounce.", ar: "ازدواج الجنسية غير مسموح عمومًا — ويضطر معظم المتجنسين للتخلي عن جنسيتهم." },
          { en: "The RWR Card Plus, available after two years, removes the tie to one employer.", ar: "بطاقة RWR Plus، المتاحة بعد سنتين، تلغي الارتباط بصاحب عمل واحد." },
          { en: "Family members can apply for a Red-White-Red Card Plus with full labour access.", ar: "يمكن لأفراد الأسرة التقدّم لبطاقة RWR Plus مع وصول كامل لسوق العمل." },
          { en: "The Integration Agreement makes German milestones a legal condition, not advice.", ar: "اتفاقية الاندماج تجعل مراحل تعلّم الألمانية شرطًا قانونيًا لا نصيحة." },
        ],
        labourLaw: [
          { en: "38.5–40 hour week with five weeks of paid leave.", ar: "أسبوع ٣٨٫٥–٤٠ ساعة مع خمسة أسابيع إجازة مدفوعة." },
          { en: "Thirteenth and fourteenth salaries are standard and taxed at a low rate.", ar: "الراتبان الثالث عشر والرابع عشر معتادان ويخضعان لضريبة منخفضة." },
          { en: "Collective agreements cover almost the entire workforce.", ar: "الاتفاقيات الجماعية تغطي القوى العاملة كلها تقريبًا." },
          { en: "Chamber of Labour membership is automatic and provides free legal advice.", ar: "العضوية في غرفة العمل تلقائية وتوفّر استشارة قانونية مجانية." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Mechanical and electrical engineering", ar: "الهندسة الميكانيكية والكهربائية" },
          { en: "IT, especially software development and data", ar: "تقنية المعلومات، خاصة تطوير البرمجيات والبيانات" },
          { en: "Healthcare and nursing, on the shortage list for years", ar: "الرعاية الصحية والتمريض، على قائمة النقص منذ سنوات" },
          { en: "Tourism and hospitality, strongly seasonal in the Alps", ar: "السياحة والضيافة، وهي موسمية بقوة في جبال الألب" },
          { en: "International organisations based in Vienna", ar: "المنظمات الدولية التي تتخذ فيينا مقرًا" },
        ],
        equivalency: {
          en: "ENIC-NARIC Austria issues comparability assessments, and the AST advisory centres help migrants navigate recognition free of charge. Regulated professions — health, law, teaching, many trades — need Nostrifizierung, which is slow and may require supplementary examinations.",
          ar: "تصدر ENIC-NARIC النمسا تقييمات مقارنة، وتساعد مراكز AST الاستشارية المهاجرين في إجراءات الاعتراف مجانًا. أما المهن المنظّمة — الصحة والقانون والتعليم وكثير من الحرف — فتحتاج معادلة (Nostrifizierung) بطيئة وقد تستلزم امتحانات تكميلية.",
        },
        wages: {
          en: "Median gross pay is roughly €3,200 a month across fourteen payments. Engineers start near €42,000–48,000 a year and developers €45,000–60,000. Vienna dominates the professional market; the Alpine west is seasonal and hospitality-heavy.",
          ar: "الأجر الوسيط الإجمالي نحو ٣٢٠٠ يورو شهريًا على أربع عشرة دفعة. ويبدأ المهندسون بنحو ٤٢٠٠٠–٤٨٠٠٠ يورو سنويًا والمطورون ٤٥٠٠٠–٦٠٠٠٠. وتهيمن فيينا على السوق المهني، بينما الغرب الألبي موسمي وتغلب عليه الضيافة.",
        },
      },
      life: {
        housing: {
          en: "Vienna is the outlier in Europe: around a quarter of the city lives in municipal or subsidised housing, which holds private rents down. It is consistently the most affordable major western European capital for the quality of life on offer.",
          ar: "فيينا استثناء في أوروبا: نحو ربع المدينة يسكن في مساكن بلدية أو مدعومة، ما يبقي الإيجارات الخاصة منخفضة. وهي باستمرار أكثر عواصم غرب أوروبا الكبرى ميسوريةً مقابل جودة الحياة المتاحة.",
        },
        language: {
          en: "German is required for most jobs and legally required for residency milestones. English works in international organisations, tourism and some tech, but the Integration Agreement means you cannot indefinitely avoid German.",
          ar: "الألمانية مطلوبة لمعظم الوظائف ومطلوبة قانونًا لمراحل الإقامة. والإنجليزية تكفي في المنظمات الدولية والسياحة وبعض شركات التقنية، لكن اتفاقية الاندماج تعني أنك لا تستطيع تجنّب الألمانية إلى الأبد.",
        },
        integration: {
          en: "Module 1 of the Integration Agreement (A2 German plus a values course) must be completed within two years, and Module 2 (B1) unlocks permanent residence. ÖIF subsidises the courses. Register your address within three days — the deadline is short and enforced.",
          ar: "يجب إتمام الوحدة الأولى من اتفاقية الاندماج (ألمانية A2 مع دورة قيم) خلال سنتين، والوحدة الثانية (B1) تفتح الإقامة الدائمة. ويدعم صندوق ÖIF الدورات. وسجّل عنوانك خلال ثلاثة أيام — فالمهلة قصيرة ومطبَّقة.",
        },
        pros: [
          { en: "A transparent points test you can score yourself before applying.", ar: "اختبار نقاط شفاف يمكنك احتسابه بنفسك قبل التقديم." },
          { en: "Vienna combines high quality of life with unusually affordable rent.", ar: "فيينا تجمع جودة حياة عالية مع إيجار ميسور على غير المعتاد." },
          { en: "Fourteen salary payments a year, with the extra two lightly taxed.", ar: "أربع عشرة دفعة راتب سنويًا، والدفعتان الإضافيتان بضريبة خفيفة." },
          { en: "Strong healthcare and near-free public universities.", ar: "رعاية صحية قوية وجامعات عامة شبه مجانية." },
        ],
        cons: [
          { en: "Dual nationality is effectively barred for most naturalising applicants.", ar: "ازدواج الجنسية ممنوع عمليًا على معظم طالبي التجنّس." },
          { en: "German requirements are legal obligations with deadlines attached.", ar: "اشتراطات الألمانية التزامات قانونية بمواعيد نهائية." },
          { en: "Ten years to citizenship, with a demanding income test.", ar: "عشر سنوات للجنسية، مع اختبار دخل صارم." },
          { en: "The professional job market outside Vienna is thin.", ar: "سوق العمل المهني خارج فيينا ضعيف." },
        ],
      },
    },
  },

  {
    countryCode: "pl",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Poland: work permits, costs and residency",
      ar: "الانتقال إلى بولندا: تصاريح العمل والتكاليف والإقامة",
    },
    summary: {
      en: "Poland is the most accessible entry point into the EU labour market for many non-Europeans: permits are comparatively easy, costs are low, and the tech and logistics sectors hire continuously.",
      ar: "بولندا أيسر بوابة دخول إلى سوق العمل الأوروبي لكثير من غير الأوروبيين: فالتصاريح أسهل نسبيًا، والتكاليف منخفضة، وقطاعا التقنية والخدمات اللوجستية يوظّفان باستمرار.",
    },
    intro: {
      en: "Most people arrive on an employer-obtained work permit and a national D visa, then apply for a temporary residence card once in the country. Processing at the voivodeship offices is the slow step and varies enormously by region — Warsaw and Kraków are the most congested.",
      ar: "يصل معظم الناس بتصريح عمل يستخرجه صاحب العمل وتأشيرة وطنية من فئة D، ثم يتقدمون لبطاقة إقامة مؤقتة بعد دخولهم. والمعالجة في مكاتب المحافظات هي الخطوة البطيئة وتتفاوت كثيرًا بين المناطق — ووارسو وكراكوف الأكثر ازدحامًا.",
    },
    routes: [
      {
        name: { en: "Type A work permit", ar: "تصريح العمل من النوع A" },
        who: {
          en: "The standard route: your employer applies on your behalf for a specific role, then you apply for a D visa at the consulate. Valid up to three years and renewable.",
          ar: "المسار الاعتيادي: يتقدم صاحب العمل نيابةً عنك لوظيفة محددة، ثم تتقدم أنت لتأشيرة D في القنصلية. وهو صالح حتى ثلاث سنوات وقابل للتجديد.",
        },
        processing: { en: "1–3 months for the permit, plus visa time", ar: "من شهر إلى ثلاثة أشهر للتصريح، إضافة إلى وقت التأشيرة" },
        cost: { en: "PLN 100 permit plus €80 visa", ar: "١٠٠ زلوتي للتصريح إضافة إلى ٨٠ يورو للتأشيرة" },
      },
      {
        name: { en: "EU Blue Card", ar: "البطاقة الزرقاء الأوروبية" },
        who: {
          en: "Graduates earning at least 150% of the average national salary. Faster to permanent residence than the standard permit and carries EU mobility.",
          ar: "الخريجون الذين يكسبون ١٥٠٪ على الأقل من متوسط الراتب الوطني. وهي أسرع نحو الإقامة الدائمة من التصريح الاعتيادي وتمنح تنقلًا أوروبيًا.",
        },
        processing: { en: "1–3 months", ar: "من شهر إلى ثلاثة أشهر" },
        cost: { en: "PLN 440", ar: "٤٤٠ زلوتي" },
      },
      {
        name: { en: "Poland Business Harbour / IT route", ar: "مسار Poland Business Harbour / تقنية المعلومات" },
        who: {
          en: "A fast-tracked programme for IT specialists, founders and startups from selected countries, with simplified visa handling and relocation support.",
          ar: "برنامج سريع لمتخصصي تقنية المعلومات ورواد الأعمال والشركات الناشئة من دول مختارة، مع معالجة مبسطة للتأشيرات ودعم للانتقال.",
        },
        processing: { en: "2–6 weeks", ar: "من أسبوعين إلى ستة أسابيع" },
        cost: { en: "Visa fee only", ar: "رسوم التأشيرة فقط" },
      },
    ],
    requirements: [
      { en: "Employer-obtained work permit specifying role, pay and location", ar: "تصريح عمل يستخرجه صاحب العمل ويحدد الوظيفة والأجر والموقع" },
      { en: "National D visa from the Polish consulate in your country", ar: "تأشيرة وطنية من فئة D من القنصلية البولندية في بلدك" },
      { en: "PESEL number and residence registration (zameldowanie)", ar: "رقم PESEL وتسجيل الإقامة (zameldowanie)" },
      { en: "ZUS social insurance registration through your employer", ar: "تسجيل التأمين الاجتماعي ZUS عبر صاحب العمل" },
      { en: "Temporary residence card application at the voivodeship office", ar: "طلب بطاقة إقامة مؤقتة في مكتب المحافظة" },
      { en: "Legalised qualifications for regulated professions", ar: "مؤهلات مصدّقة للمهن المنظّمة" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "Long-term EU residence follows five years of continuous legal stay with stable income and Polish at B1. Blue Card holders may count time in other EU countries toward the five years.",
          ar: "تأتي الإقامة الأوروبية طويلة الأمد بعد خمس سنوات من الإقامة القانونية المتصلة مع دخل مستقر وبولندية بمستوى B1. ويمكن لحاملي البطاقة الزرقاء احتساب المدة في دول أوروبية أخرى ضمن الخمس سنوات.",
        },
        citizenship: {
          en: "Three years of permanent residence — so typically eight years in total — plus Polish at B1 by official certificate. Poland permits dual nationality, and descent-based claims are open to a large diaspora.",
          ar: "ثلاث سنوات من الإقامة الدائمة — أي ثماني سنوات إجمالًا عادةً — مع بولندية بمستوى B1 بشهادة رسمية. وتسمح بولندا بازدواج الجنسية، ومطالبات النسب مفتوحة لشتات واسع.",
        },
        rights: [
          { en: "Dual nationality is permitted.", ar: "ازدواج الجنسية مسموح." },
          { en: "The Karta Polaka gives people of Polish descent an accelerated route.", ar: "بطاقة البولندي تمنح من لهم أصول بولندية مسارًا مسرّعًا." },
          { en: "Changing employer requires a new or amended work permit.", ar: "تغيير صاحب العمل يتطلب تصريح عمل جديدًا أو معدّلًا." },
          { en: "Family reunion is available once you hold a residence card.", ar: "لمّ الشمل متاح بمجرد حصولك على بطاقة إقامة." },
        ],
        labourLaw: [
          { en: "40-hour week with 20–26 days of paid leave depending on seniority.", ar: "أسبوع ٤٠ ساعة مع ٢٠–٢٦ يوم إجازة مدفوعة حسب الأقدمية." },
          { en: "The minimum wage has risen fast and is revised at least annually.", ar: "الحد الأدنى للأجور ارتفع سريعًا ويُراجع سنويًا على الأقل." },
          { en: "Civil-law contracts (umowa zlecenie) carry fewer protections than employment contracts.", ar: "عقود القانون المدني (umowa zlecenie) تمنح حماية أقل من عقود العمل." },
          { en: "Public healthcare access comes through NFZ contributions via ZUS.", ar: "الوصول للرعاية الصحية العامة يأتي عبر اشتراكات NFZ من خلال ZUS." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "IT services and software outsourcing — the largest skilled sector", ar: "خدمات تقنية المعلومات وتعهيد البرمجيات — أكبر قطاع للكفاءات" },
          { en: "Shared services and finance centres for multinationals", ar: "مراكز الخدمات المشتركة والمالية للشركات متعددة الجنسيات" },
          { en: "Logistics and road transport across the EU", ar: "الخدمات اللوجستية والنقل البري عبر الاتحاد الأوروبي" },
          { en: "Manufacturing, appliances and automotive components", ar: "التصنيع والأجهزة ومكونات السيارات" },
          { en: "Construction and skilled trades", ar: "البناء والحرف الماهرة" },
        ],
        equivalency: {
          en: "NAWA handles degree recognition, and for many jobs a simple nostrification is enough. Regulated professions — medicine, nursing, law — require chamber approval and Polish language examinations. IT roles typically need no formal recognition at all.",
          ar: "تتولى NAWA الاعتراف بالشهادات، وتكفي معادلة بسيطة لكثير من الوظائف. أما المهن المنظّمة — الطب والتمريض والقانون — فتتطلب موافقة النقابة وامتحانات في اللغة البولندية. ووظائف تقنية المعلومات لا تحتاج اعترافًا رسميًا عادةً.",
        },
        wages: {
          en: "The average gross salary is roughly PLN 8,000 a month. Developers earn PLN 12,000–25,000, often on B2B contracts that carry a flat tax rate and are the norm in Polish tech. Wages are well below western Europe but so are costs.",
          ar: "متوسط الراتب الإجمالي نحو ٨٠٠٠ زلوتي شهريًا. ويكسب المطورون ١٢٠٠٠–٢٥٠٠٠، غالبًا بعقود B2B ذات ضريبة ثابتة وهي السائدة في قطاع التقنية البولندي. والأجور أدنى بكثير من غرب أوروبا، لكن التكاليف كذلك.",
        },
      },
      life: {
        housing: {
          en: "Rents in Warsaw and Kraków have risen substantially but remain far below western Europe. Wrocław, Poznań and Gdańsk offer similar job markets at lower cost. Deposits are usually one month.",
          ar: "ارتفعت الإيجارات في وارسو وكراكوف كثيرًا لكنها تبقى أدنى بكثير من غرب أوروبا. وتقدّم فروتسواف وبوزنان وغدانسك أسواق عمل مماثلة بتكلفة أقل. والتأمين عادةً شهر واحد.",
        },
        language: {
          en: "English is standard in IT and shared services. Polish is difficult but necessary for administration, healthcare and any customer-facing role, and B1 is a hard requirement for citizenship.",
          ar: "الإنجليزية معتادة في تقنية المعلومات ومراكز الخدمات المشتركة. والبولندية صعبة لكنها ضرورية للإدارة والرعاية الصحية وأي وظيفة تتعامل مع العملاء، ومستوى B1 شرط صارم للجنسية.",
        },
        integration: {
          en: "Get your PESEL number early — it unlocks banking, healthcare and online government services. Voivodeship residence-card queues can run many months, so apply the moment you are eligible and keep the stamped confirmation, which legalises your stay while you wait.",
          ar: "احصل على رقم PESEL مبكرًا — فهو يفتح الخدمات المصرفية والصحية والحكومية الإلكترونية. وطوابير بطاقة الإقامة في المحافظات قد تمتد أشهرًا، فتقدّم فور أهليتك واحتفظ بالإفادة المختومة التي تقنّن إقامتك أثناء الانتظار.",
        },
        pros: [
          { en: "One of the easiest EU labour markets for non-Europeans to enter.", ar: "من أيسر أسواق العمل الأوروبية دخولًا لغير الأوروبيين." },
          { en: "Low cost of living relative to IT and shared-services salaries.", ar: "تكلفة معيشة منخفضة مقارنة برواتب التقنية والخدمات المشتركة." },
          { en: "Central location with easy travel across the EU.", ar: "موقع مركزي مع سهولة السفر داخل الاتحاد الأوروبي." },
          { en: "Dual nationality permitted, and descent claims are open.", ar: "ازدواج الجنسية مسموح، ومطالبات النسب مفتوحة." },
        ],
        cons: [
          { en: "Voivodeship residence-card processing is notoriously slow.", ar: "معالجة بطاقة الإقامة في المحافظات بطيئة بشكل سيئ السمعة." },
          { en: "Polish is a hard language and a hard citizenship requirement.", ar: "البولندية لغة صعبة وشرط صعب للجنسية." },
          { en: "Salaries remain well below western European levels.", ar: "الرواتب تبقى أدنى بكثير من مستويات غرب أوروبا." },
          { en: "Public healthcare waiting times push many toward private cover.", ar: "أوقات الانتظار في الرعاية الصحية العامة تدفع كثيرين نحو التأمين الخاص." },
        ],
      },
    },
  },

  {
    countryCode: "ie",
    updatedAt: "2026-08-20",
    title: {
      en: "Moving to Ireland: employment permits, tech and residency",
      ar: "الانتقال إلى أيرلندا: تصاريح العمل والتقنية والإقامة",
    },
    summary: {
      en: "Ireland is the English-speaking gateway to the EU and the European base for most large US tech firms. The permit system is straightforward; the housing market is the genuine obstacle.",
      ar: "أيرلندا هي البوابة الناطقة بالإنجليزية إلى الاتحاد الأوروبي والقاعدة الأوروبية لمعظم شركات التقنية الأمريكية الكبرى. ونظام التصاريح واضح، لكن سوق السكن هو العقبة الحقيقية.",
    },
    intro: {
      en: "The Critical Skills Employment Permit is the flagship route: no labour market test for listed occupations, a two-year permit, and immediate eligibility for family reunification. What people underestimate is Dublin's rental market, where supply is so constrained that securing somewhere to live can be harder than securing the job.",
      ar: "تصريح العمل للمهارات الحرجة هو المسار الرئيسي: بلا اختبار لسوق العمل للمهن المدرجة، وتصريح لسنتين، وأهلية فورية للمّ شمل الأسرة. وما يستهين به الناس هو سوق الإيجار في دبلن، حيث المعروض مقيّد لدرجة أن تأمين سكن قد يكون أصعب من تأمين الوظيفة.",
    },
    routes: [
      {
        name: { en: "Critical Skills Employment Permit", ar: "تصريح العمل للمهارات الحرجة" },
        who: {
          en: "Occupations on the critical skills list — IT, engineering, healthcare, finance — with a salary above the threshold. No labour market test, and a path to long-term residence after two years.",
          ar: "المهن المدرجة على قائمة المهارات الحرجة — تقنية المعلومات والهندسة والرعاية الصحية والمالية — براتب يتجاوز الحد. بلا اختبار لسوق العمل، ومع مسار للإقامة طويلة الأمد بعد سنتين.",
        },
        processing: { en: "4–10 weeks", ar: "من ٤ إلى ١٠ أسابيع" },
        cost: { en: "€1,000 for two years", ar: "١٠٠٠ يورو لسنتين" },
      },
      {
        name: { en: "General Employment Permit", ar: "تصريح العمل العام" },
        who: {
          en: "Occupations not on the critical skills list, including many care, hospitality and transport roles. Requires a labour market needs test unless exempted.",
          ar: "المهن غير المدرجة على قائمة المهارات الحرجة، وتشمل كثيرًا من وظائف الرعاية والضيافة والنقل. ويتطلب اختبار احتياجات سوق العمل ما لم يُعفَ منه.",
        },
        processing: { en: "8–14 weeks", ar: "من ٨ إلى ١٤ أسبوعًا" },
        cost: { en: "€1,000 for two years", ar: "١٠٠٠ يورو لسنتين" },
      },
      {
        name: { en: "Third Level Graduate Scheme", ar: "برنامج خريجي التعليم العالي" },
        who: {
          en: "Graduates of Irish institutions may stay 12 months (24 for master's and PhD holders) to find work, with full labour market access in the meantime.",
          ar: "يمكن لخريجي المؤسسات الأيرلندية البقاء ١٢ شهرًا (٢٤ لحاملي الماجستير والدكتوراه) لإيجاد عمل، مع وصول كامل لسوق العمل خلال المدة.",
        },
        processing: { en: "Applied for in-country after graduation", ar: "يُقدَّم داخل البلد بعد التخرج" },
        cost: { en: "€300 registration", ar: "٣٠٠ يورو رسوم تسجيل" },
      },
    ],
    requirements: [
      { en: "Job offer meeting the salary threshold for the permit type", ar: "عرض عمل يستوفي حد الراتب لنوع التصريح" },
      { en: "Qualification or relevant experience matching the listed occupation", ar: "مؤهل أو خبرة ذات صلة تطابق المهنة المدرجة" },
      { en: "IRP registration with immigration within 90 days of arrival", ar: "تسجيل بطاقة الإقامة IRP لدى الهجرة خلال ٩٠ يومًا من الوصول" },
      { en: "PPS number for tax, banking and public services", ar: "رقم PPS للضرائب والخدمات المصرفية والخدمات العامة" },
      { en: "Private health insurance until you qualify for public cover", ar: "تأمين صحي خاص إلى أن تستوفي شروط التغطية العامة" },
      { en: "Proof of address, which is required for almost every registration", ar: "إثبات عنوان، وهو مطلوب لكل تسجيل تقريبًا" },
    ],
    sections: {
      residency: {
        permanent: {
          en: "After five years of legal residence you can apply for Stamp 4, which removes the employer tie and gives full labour market access. Critical Skills holders reach Stamp 4 after just two years — the single biggest advantage of that permit.",
          ar: "بعد خمس سنوات من الإقامة القانونية يمكنك التقدم للحصول على ختم Stamp 4، الذي يلغي الارتباط بصاحب العمل ويمنح وصولًا كاملًا لسوق العمل. ويصل حاملو تصريح المهارات الحرجة إليه بعد سنتين فقط — وهي أكبر ميزة في ذلك التصريح.",
        },
        citizenship: {
          en: "Five years of reckonable residence in the previous nine, including a full year immediately before applying. Ireland permits dual nationality, and there is a broad ancestry route for anyone with an Irish grandparent.",
          ar: "خمس سنوات من الإقامة المحتسبة خلال التسع السابقة، بما فيها سنة كاملة تسبق التقديم مباشرة. وتسمح أيرلندا بازدواج الجنسية، وثمة مسار نسب واسع لكل من له جد أيرلندي.",
        },
        rights: [
          { en: "Dual nationality is permitted without restriction.", ar: "ازدواج الجنسية مسموح دون قيود." },
          { en: "Critical Skills holders may bring family immediately, with spousal work rights.", ar: "يمكن لحاملي تصريح المهارات الحرجة إحضار الأسرة فورًا، مع حق العمل للزوج." },
          { en: "Irish citizenship carries EU free movement and, separately, UK residence rights.", ar: "الجنسية الأيرلندية تمنح حرية التنقل الأوروبية، وبشكل منفصل حق الإقامة في بريطانيا." },
          { en: "Citizenship by descent is open to grandchildren of Irish citizens.", ar: "الجنسية بالنسب مفتوحة لأحفاد المواطنين الأيرلنديين." },
        ],
        labourLaw: [
          { en: "39-hour typical week with 20 days of statutory leave and 10 public holidays.", ar: "أسبوع معتاد من ٣٩ ساعة مع ٢٠ يوم إجازة قانونية و١٠ عطلات رسمية." },
          { en: "A national minimum wage applies and is reviewed annually.", ar: "يُطبَّق حد أدنى وطني للأجور ويُراجع سنويًا." },
          { en: "Unfair dismissal protection begins after 12 months of service.", ar: "الحماية من الفصل التعسفي تبدأ بعد ١٢ شهرًا من الخدمة." },
          { en: "Public healthcare is means-tested; most employees carry private insurance.", ar: "الرعاية الصحية العامة مرتبطة بالدخل، ومعظم الموظفين لديهم تأمين خاص." },
        ],
      },
      jobMarket: {
        industries: [
          { en: "Technology — the European headquarters of most large US platforms", ar: "التقنية — المقر الأوروبي لمعظم المنصات الأمريكية الكبرى" },
          { en: "Pharmaceuticals and medical devices, a major export sector", ar: "الأدوية والأجهزة الطبية، قطاع تصدير رئيسي" },
          { en: "Financial services and fund administration", ar: "الخدمات المالية وإدارة الصناديق" },
          { en: "Healthcare, with sustained nursing shortages", ar: "الرعاية الصحية، مع نقص مستمر في التمريض" },
          { en: "Construction, currently constrained by its own labour shortage", ar: "البناء، وهو مقيّد حاليًا بنقص العمالة فيه" },
        ],
        equivalency: {
          en: "Quality and Qualifications Ireland (QQI) issues comparability statements through NARIC Ireland, free of charge. Nurses register with the NMBI, doctors with the Medical Council, engineers optionally with Engineers Ireland. English-language qualifications from most countries transfer smoothly, which is a real advantage over continental Europe.",
          ar: "تصدر هيئة الجودة والمؤهلات الأيرلندية (QQI) إفادات مقارنة عبر NARIC أيرلندا مجانًا. ويسجّل الممرضون لدى NMBI، والأطباء لدى المجلس الطبي، والمهندسون اختياريًا لدى Engineers Ireland. والمؤهلات باللغة الإنجليزية من معظم الدول تنتقل بسلاسة، وهي ميزة حقيقية على أوروبا القارية.",
        },
        wages: {
          en: "Median full-time pay is around €45,000 a year. Developers earn €50,000–90,000 and senior tech roles more. Ireland taxes higher earners heavily once the higher rate band starts, so the gap between gross and net widens quickly.",
          ar: "الأجر الوسيط للدوام الكامل نحو ٤٥٠٠٠ يورو سنويًا. ويكسب المطورون ٥٠٠٠٠–٩٠٠٠٠ والوظائف التقنية العليا أكثر. وتفرض أيرلندا ضرائب مرتفعة على أصحاب الدخول الأعلى بمجرد بدء الشريحة الأعلى، فتتسع الفجوة بين الإجمالي والصافي سريعًا.",
        },
      },
      life: {
        housing: {
          en: "This is the single hardest part of moving to Ireland. Dublin rents are among the highest in Europe and viewings routinely draw dozens of applicants. Many newcomers spend their first months in temporary accommodation. Secure something before you resign your current job.",
          ar: "هذا أصعب جزء في الانتقال إلى أيرلندا. فإيجارات دبلن من الأعلى في أوروبا، والمعاينات تجذب عشرات المتقدمين عادةً. ويقضي كثير من القادمين الجدد أشهرهم الأولى في سكن مؤقت. أمّن سكنًا قبل أن تستقيل من وظيفتك الحالية.",
        },
        language: {
          en: "English is the working language of the entire country. Irish is a constitutional first language taught in schools, but no employer or public service will require it of you.",
          ar: "الإنجليزية هي لغة العمل في البلد كله. والأيرلندية لغة أولى دستوريًا وتُدرَّس في المدارس، لكن لن يشترطها عليك أي صاحب عمل أو خدمة عامة.",
        },
        integration: {
          en: "Apply for your PPS number and register your IRP card as soon as you arrive — both require proof of address, which is why housing comes first. Ireland has large, well-established migrant communities and no formal integration course requirement.",
          ar: "تقدّم لرقم PPS وسجّل بطاقة IRP فور وصولك — وكلاهما يتطلب إثبات عنوان، ولهذا يأتي السكن أولًا. ولأيرلندا جاليات مهاجرة كبيرة وراسخة، ولا يوجد شرط رسمي لدورة اندماج.",
        },
        pros: [
          { en: "Everything runs in English — no language barrier at work or in admin.", ar: "كل شيء يعمل بالإنجليزية — بلا حاجز لغوي في العمل أو الإدارة." },
          { en: "Critical Skills holders reach Stamp 4 in two years instead of five.", ar: "حاملو المهارات الحرجة يصلون إلى Stamp 4 في سنتين بدل خمس." },
          { en: "Dense concentration of well-paid tech and pharma employers.", ar: "تركّز كثيف لأصحاب عمل في التقنية والأدوية بأجور جيدة." },
          { en: "Citizenship in five years, with EU free movement attached.", ar: "الجنسية خلال خمس سنوات، مع حرية التنقل الأوروبية." },
        ],
        cons: [
          { en: "The housing crisis is severe and is the main reason people leave.", ar: "أزمة السكن حادة وهي السبب الرئيسي لمغادرة الناس." },
          { en: "Dublin's cost of living rivals the most expensive European cities.", ar: "تكلفة المعيشة في دبلن تنافس أغلى المدن الأوروبية." },
          { en: "Public healthcare is limited; private insurance is a practical necessity.", ar: "الرعاية الصحية العامة محدودة، والتأمين الخاص ضرورة عملية." },
          { en: "Permit fees of €1,000 are among the highest in the EU.", ar: "رسوم التصريح البالغة ١٠٠٠ يورو من الأعلى في الاتحاد الأوروبي." },
        ],
      },
    },
  },
];
