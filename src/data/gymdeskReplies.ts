import { GymDeskActionCard, GymDeskQuickPrompt, Language } from '../types';

export interface GymDeskKnowledgeEntry {
  keywords: string[];
  response: {
    en: string;
    ar: string;
  };
  actionCards?: {
    en: GymDeskActionCard[];
    ar: GymDeskActionCard[];
  };
  suggestedPrompts?: {
    en: GymDeskQuickPrompt[];
    ar: GymDeskQuickPrompt[];
  };
}

export const GYMDESK_INITIAL_PROMPTS: Record<Language, GymDeskQuickPrompt[]> = {
  en: [
    { id: 'trial', label: '⚡ Free VIP Trial Pass', query: 'How can I book a free trial pass?' },
    { id: 'prices', label: '💳 Memberships & Pricing', query: 'What are the membership tiers and prices?' },
    { id: 'trainers', label: '🏋️‍♂️ Master Personal Coaches', query: 'Tell me about your personal trainers' },
    { id: 'hours', label: '🕒 Hours & Location', query: 'What are your opening hours and location?' },
    { id: 'recovery', label: '🧊 Cold Plunge & Recovery', query: 'What recovery facilities do you offer?' },
    { id: 'whatsapp', label: '💬 Talk to Front Desk on WhatsApp', query: 'Connect me to front desk on WhatsApp' },
  ],
  ar: [
    { id: 'trial', label: '⚡ حجز تجربة VIP مجانية', query: 'كيف يمكنني حجز تصريح تجربة مجانية؟' },
    { id: 'prices', label: '💳 باقات الاشتراك والأسعار', query: 'ما هي باقات الاشتراك والأسعار المتاحة؟' },
    { id: 'trainers', label: '🏋️‍♂️ المدربون والتدريب الخاص', query: 'أخبرني عن المدربين والتدريب الشخصي' },
    { id: 'hours', label: '🕒 مواعيد العمل والموقع', query: 'ما هي مواعيد العمل وأين يقع الجيم؟' },
    { id: 'recovery', label: '🧊 المغطس البارد والاستشفاء', query: 'ما هي مرافق الاستشفاء والمغطس البارد؟' },
    { id: 'whatsapp', label: '💬 التحدث مع الاستقبال عبر واتساب', query: 'تحويل للمحادثة عبر واتساب مباشرة' },
  ],
};

export const GYMDESK_KNOWLEDGE_BASE: GymDeskKnowledgeEntry[] = [
  // 1. VIP Free Trial Pass
  {
    keywords: [
      'trial',
      'free pass',
      'day pass',
      'guest pass',
      'try',
      'test',
      'visit',
      'experience',
      'book trial',
      'free trial',
      'تجربة',
      'مجاني',
      'يوم مجاني',
      'تصريح',
      'زيارة',
      'اجرب',
      'حجز تجربة',
    ],
    response: {
      en: '🌟 **Complimentary VIP Day Pass Available!**\n\nExperience GYM DEMO Dubai firsthand with our all-inclusive VIP Day Pass. Your pass includes:\n• Full access to our 15,000 sq. ft. Olympic biomechanics floor\n• 45-minute Master Coach 1-on-1 physiological assessment\n• Access to the Sub-Zero Cold Plunge & Cedar Saunas\n• Complimentary VIP valet parking & luxury locker suite\n\nWould you like to confirm your VIP pass reservation now?',
      ar: '🌟 **تصريح تجربة VIP مجانية متاح الآن!**\n\nاختبر معايير الفخامة والأداء في جيم ديمو دبي بتصريح زيارة VIP مجاني يشمل:\n• الدخول الكامل لصالة الأجهزة الأولمبية بمساحة ١٥,٠٠٠ قدم مربع\n• استشارة وتقييم فسيولوجي لمدة ٤٥ دقيقة مع مدرب رئيسي\n• دخول كامل لمختبر الاستشفاء، المغطس البارد ٣°C وغرف الساونا\n• خدمة صف السيارات VIP مجاناً وخزانة خاصة مجهزة\n\nهل ترغب في تأكيد حجز تصريحك الآن؟',
    },
    actionCards: {
      en: [
        {
          title: 'Reserve VIP Free Trial Pass',
          description: 'Instant priority pass · Zero obligation',
          ctaText: 'Open Free Trial Form',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
        {
          title: 'WhatsApp Concierge Desk',
          description: 'Direct WhatsApp booking with reception',
          ctaText: 'Chat on WhatsApp',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'Hi GymDesk, I would like to book a VIP Free Trial Pass for Dubai branch.',
          iconType: 'whatsapp',
        },
      ],
      ar: [
        {
          title: 'حجز تصريح تجربة VIP مجانية',
          description: 'أولوية فورية في الحجز · بدون أي التزام',
          ctaText: 'فتح نموذج حجز التجربة',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
        {
          title: 'كونسيرج الاستقبال عبر واتساب',
          description: 'تأكيد الحجز فوراً عبر واتساب مع موظف الاستقبال',
          ctaText: 'تحدث عبر واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'مرحباً جيم ديسك، أود حجز تصريح تجربة VIP مجانية لفرع دبي.',
          iconType: 'whatsapp',
        },
      ],
    },
  },

  // 2. Memberships & Pricing
  {
    keywords: [
      'price',
      'prices',
      'cost',
      'membership',
      'memberships',
      'plan',
      'plans',
      'fee',
      'fees',
      'subscription',
      'package',
      'tier',
      'black',
      'titanium',
      'elite',
      'vip',
      'aed',
      'rate',
      'سعر',
      'أسعار',
      'اسعار',
      'اشتراك',
      'اشتراكات',
      'باقة',
      'باقات',
      'عضوية',
      'عضويات',
      'تكلفة',
      'رسوم',
      'كم السعر',
    ],
    response: {
      en: '💎 **GYM DEMO Bespoke Membership Tiers (AED):**\n\n1. **Essential Tier** — AED 1,200 / month\n   • Full facility access (05:00 - 23:00)\n   • Olympic biomechanics zone & cardio deck\n   • 2 Recovery Lab passes / month\n\n2. **Performance Tier (Most Popular)** — AED 1,850 / month\n   • 24/7 biometric priority access\n   • Unlimited Recovery Lab (Cold Plunge & Saunas)\n   • 2 Master Coach 1-on-1 PT sessions / month\n   • Complimentary VIP Valet & 2 Guest Passes\n\n3. **Black Elite Tier (VIP Private)** — AED 3,200 / month\n   • Unlimited 1-on-1 Master Coaching & Nutrition\n   • Private VIP Locker Suite & Laundry service\n   • Unlimited guest access & international lounge privileges\n\n*Save up to 20% on Annual Upfront Memberships.*',
      ar: '💎 **باقات عضوية جيم ديمو دبي المخصصة (بالدرهم الإماراتي):**\n\n١. **الباقة الأساسية (Essential)** — ١,٢٠٠ درهم / شهرياً\n   • دخول كامل للمرافق (٠٥:٠٠ – ٢٣:٠٠)\n   • صالة الأوزان الحرة والأجهزة الميكانيكية الأولمبية\n   • تصريحان شهرياً لمختبر الاستشفاء\n\n٢. **باقة الأداء (Performance - الأكثر طلباً)** — ١,٨٥٠ درهم / شهرياً\n   • دخول بأولوية بيومترية على مدار الساعة\n   • استخدام غير محدود لمختبر الاستشفاء (المغطس البارد والساونا)\n   • جلستان تدريب خاص 1-on-1 شهرياً مع مدرب رئيسي\n   • خدمة صف سيارات VIP مجانية وتصريحان لضيوفك\n\n٣. **باقة بلاك إيليت VIP (Black Elite)** — ٣,٢٠٠ درهم / شهرياً\n   • جلسات تدريب خاص واستشارات تغذية غير محدودة\n   • خزانة VIP خاصة دائمة وخدمة غسيل الملابس الرياضية\n   • استضافة ضيوف غير محدودة وامتيازات صالة كبار الشخصيات\n\n*خصم ٢٠٪ عند السداد السنوي.*',
    },
    actionCards: {
      en: [
        {
          title: 'Explore All Membership Plans',
          description: 'Compare full features and annual savings',
          ctaText: 'View Membership Page',
          ctaAction: 'navigate_membership',
          iconType: 'membership',
        },
        {
          title: 'Request Bespoke Corporate Quote',
          description: 'Special corporate & executive rates',
          ctaText: 'Chat on WhatsApp',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'Hi GymDesk, I want more information on the Performance and Elite membership packages.',
          iconType: 'whatsapp',
        },
      ],
      ar: [
        {
          title: 'استعراض كافة تفاصيل العضويات',
          description: 'مقارنة المزايا ونسب التوفير السنوية',
          ctaText: 'الانتقال لصفحة العضويات',
          ctaAction: 'navigate_membership',
          iconType: 'membership',
        },
        {
          title: 'طلب عرض أسعار مخصص أو للشركات',
          description: 'باقات مخصصة للتنفيذيين والشركات',
          ctaText: 'تحدث عبر واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'مرحباً جيم ديسك، أود الاستفسار عن تفاصيل باقتي Performance و Elite.',
          iconType: 'whatsapp',
        },
      ],
    },
  },

  // 3. Personal Training & Master Coaches
  {
    keywords: [
      'trainer',
      'trainers',
      'coach',
      'coaches',
      'pt',
      'personal training',
      'private coach',
      'instruction',
      'marcus',
      'elena',
      'tariq',
      'nutrition',
      'مدرب',
      'مدربين',
      'مدربة',
      'كوتش',
      'تدريب خاص',
      'تدريب شخصي',
      'تغذية',
      'برايفت',
    ],
    response: {
      en: '🏋️‍♂️ **Master Coaching & Biomechanical Optimization:**\n\nOur coaching team consists of world-class sports scientists, Olympic lifting coaches, and IFBB Pro conditioning specialists:\n\n• **Coach Marcus Vance** — Head of Biomechanics & Hypertrophy\n• **Coach Elena Rostova** — Olympic Weightlifting & Athletic Conditioning\n• **Coach Tariq Al-Hashemi** — Master Functional Movement & Recomposition\n\nEvery 1-on-1 PT package begins with high-resolution InBody 970 body composition analysis, 3D movement screening, and personalized macro-nutrition protocols.',
      ar: '🏋️‍♂️ **فريق المدربين الرئيسيين والتدريب الخاص:**\n\nيضم فريقنا نخبة من علماء الرياضة والفيزيولوجيا، مدربي رفع الأثقال الأولمبي وأخصائيي إعادة تشكيل القوام:\n\n• **المدرب ماركوس فانس** — رئيس قسم الميكانيكا الحيوية والتضخيم العضلي\n• **المدربة إيلينا روستوفا** — بطلة رفع الأثقال الأولمبي واللياقة الرياضية\n• **المدرب طارق الهاشمي** — خبير الحركة الوظيفية وإعادة التشكيل الجسدي\n\nتبدأ كافة برامج التدريب الخاص بتحليل تكوين الجسم InBody 970 عالي الدقة، وفحص الحركة ثلاثي الأبعاد، وجداول تغذية مخصصة.',
    },
    actionCards: {
      en: [
        {
          title: 'View Training Programs',
          description: 'Olympic Strength, Hypertrophy, Combat & HYROX',
          ctaText: 'Explore Programs',
          ctaAction: 'navigate_programs',
          iconType: 'program',
        },
        {
          title: 'Consult with Head Coach',
          description: 'Match with your ideal personal trainer',
          ctaText: 'Chat on WhatsApp',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'Hi GymDesk, I would like to book a 1-on-1 personal training consultation.',
          iconType: 'whatsapp',
        },
      ],
      ar: [
        {
          title: 'استعراض المسارات التدريبية',
          description: 'القوة الأولمبية، التضخيم العضلي، الملاكمة و HYROX',
          ctaText: 'استعراض البرامج',
          ctaAction: 'navigate_programs',
          iconType: 'program',
        },
        {
          title: 'استشارة مع المدرب الرئيسي',
          description: 'اختيار المدرب الشخصي الأنسب لأهدافك',
          ctaText: 'تحدث عبر واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'مرحباً جيم ديسك، أود حجز استشارة تدريب شخصي 1-on-1.',
          iconType: 'whatsapp',
        },
      ],
    },
  },

  // 4. Hours & Timings
  {
    keywords: [
      'hour',
      'hours',
      'timing',
      'timings',
      'open',
      'opening',
      'close',
      'closing',
      'time',
      'schedule',
      'friday',
      'weekend',
      'sunday',
      'holiday',
      'ساعة',
      'ساعات',
      'مواعيد',
      'أوقات',
      'اوقات',
      'الدوام',
      'مفتوح',
      'يغلق',
      'الجمعة',
      'السبت',
      'العطلات',
    ],
    response: {
      en: '🕒 **Operating Hours — Downtown Dubai Sanctuary:**\n\n• **Monday – Friday:** 05:00 AM – 11:00 PM\n• **Saturday – Sunday:** 06:00 AM – 10:00 PM\n• **24/7 Access:** Available for Performance & Black Elite biometric key holders\n• **Public Holidays & Ramadan:** Open with special extended wellness hours\n\n*The Recovery Lab and Hydrotherapy plunge are open throughout all operating hours.*',
      ar: '🕒 **مواعيد العمل — مقر بوليفارد وسط مدينة دبي:**\n\n• **الإثنين – الجمعة:** ٠٥:٠٠ صباحاً – ١١:٠٠ مساءً\n• **السبت – الأحد:** ٠٦:٠٠ صباحاً – ١٠:٠٠ مساءً\n• **دخول 24/7 على مدار الساعة:** متاح لأصحاب عضويات Performance و Black Elite بالبصمة البيومترية\n• **العطلات الرسمية وشهر رمضان:** مفتوح مع ساعات ممتدة مخصصة\n\n*مختبر الاستشفاء والمغطس البارد متاحان طوال ساعات العمل.*',
    },
    actionCards: {
      en: [
        {
          title: 'Book a Visit During Open Hours',
          description: 'Reserve your time slot with concierge',
          ctaText: 'Book VIP Pass',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
      ],
      ar: [
        {
          title: 'حجز زيارة خلال ساعات العمل',
          description: 'تحديد وقت مناسب مع فريق الاستقبال',
          ctaText: 'حجز تجربة VIP',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
      ],
    },
  },

  // 5. Location, Valet & Directions
  {
    keywords: [
      'location',
      'address',
      'where',
      'direction',
      'directions',
      'map',
      'valet',
      'parking',
      'downtown',
      'boulevard',
      'burj khalifa',
      'موقع',
      'عنوان',
      'وين',
      'أين',
      'مواقف',
      'باركينج',
      'فاليه',
      'داون تاون',
      'بوليفارد',
      'برج خليفة',
    ],
    response: {
      en: '📍 **Sanctuary Location & VIP Arrival:**\n\n• **Address:** Downtown Dubai Boulevard, Dubai, United Arab Emirates (Opposite Dubai Opera District)\n• **Valet Parking:** Complimentary white-glove VIP valet service directly at the main private entrance.\n• **Metro / Access:** 3-minute transit from Burj Khalifa / Dubai Mall Metro Station, with direct private drop-off lane.',
      ar: '📍 **الموقع وخدمة صف السيارات الفاخرة:**\n\n• **العنوان:** بوليفارد وسط مدينة دبي، دبي، الإمارات العربية المتحدة (مقابل منطقة دبي أوبرا)\n• **خدمة صف السيارات (Valet):** خدمة فاليه مجانية VIP أمام المدخل الرئيسي الخاص مباشرة.\n• **الوصول بالمترو / السيارات:** ٣ دقائق من محطة مترو برج خليفة / دبي مول، مع مسار خاص ومباشر لنزول السيارات.',
    },
    actionCards: {
      en: [
        {
          title: 'Get Directions on Maps',
          description: 'Downtown Dubai Boulevard Sanctuary',
          ctaText: 'View Contact & Map',
          ctaAction: 'navigate_contact',
          iconType: 'info',
        },
        {
          title: 'Send Location Pin on WhatsApp',
          description: 'Get live GPS pin delivered to your WhatsApp',
          ctaText: 'WhatsApp GPS Pin',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'Hi GymDesk, please send me the exact GPS location pin for GYM DEMO Dubai.',
          iconType: 'whatsapp',
        },
      ],
      ar: [
        {
          title: 'عرض الموقع والاتجاهات على الخريطة',
          description: 'مقر بوليفارد وسط مدينة دبي',
          ctaText: 'صفحة الموقع والتواصل',
          ctaAction: 'navigate_contact',
          iconType: 'info',
        },
        {
          title: 'إرسال موقع GPS عبر واتساب',
          description: 'استلام رابط الموقع الجغرافي المباشر على هاتفك',
          ctaText: 'طلب الموقع عبر واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'مرحباً جيم ديسك، أرجو تزويدي برابط موقع GPS المباشر للجيم في دبي.',
          iconType: 'whatsapp',
        },
      ],
    },
  },

  // 6. Recovery Lab, Cold Plunge & Saunas
  {
    keywords: [
      'recovery',
      'cold plunge',
      'ice bath',
      'sauna',
      'cryotherapy',
      'steam',
      'spa',
      'massage',
      'normatec',
      'contrast',
      'استشفاء',
      'مغطس بارد',
      'حوض ثلج',
      'ساونا',
      'مساج',
      'علاج طبيعي',
      'ريكفري',
      'سبا',
    ],
    response: {
      en: '🧊 **Sub-Zero Recovery Lab & Thermal Sanctuary:**\n\nOur medical-grade recovery lab accelerates central nervous system restoration and muscle hypertrophy:\n\n• **3°C Contrast Cold Plunges** — Custom-engineered stainless hydro pools with active filtration.\n• **Finnish Cedar Dry Saunas** — High-temperature thermal therapy at 85°C - 90°C.\n• **Full-Body Infrared Red-Light Pods** — Mitochondrial cellular rejuvenation and joint relief.\n• **NormaTec 3 Compression Lounges** — Rapid lymphatic drainage and lactic clearance.',
      ar: '🧊 **مختبر الاستشفاء الفسيولوجي والمغطس البارد:**\n\nمختبر استشفاء رياضي متطور لتسريع تعافي الجهاز العصبي واستشفاء الألياف العضلية:\n\n• **أحواض الغطس البارد بدرجة ٣° مئوية** — أحواض ستانلس ستيل مزودة بأنظمة فلترة وتبريد فوري.\n• **غرف الساونا الفنلندية بخشب الأرز** — درجات حرارة مثالية بين ٨٥° – ٩٠° مئوية.\n• **أجهزة الأشعة تحت الحمراء والضوء الأحمر** — لتنشيط الخلايا وتخفيف إجهاد المفاصل.\n• **أجنحة الضغط الهوائي NormaTec 3** — لتصريف حمض اللاكتيك وتنشيط الدورة الدموية.',
    },
    actionCards: {
      en: [
        {
          title: 'Try Recovery Lab on Free Pass',
          description: 'Experience cold plunge & sauna free on your first visit',
          ctaText: 'Book VIP Pass',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
      ],
      ar: [
        {
          title: 'تجربة مختبر الاستشفاء مجاناً',
          description: 'جرب المغطس البارد والساونا مجاناً في زيارتك الأولى',
          ctaText: 'حجز تجربة VIP',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
      ],
    },
  },

  // 7. Equipment, Locker Rooms & Luxury Amenities
  {
    keywords: [
      'equipment',
      'machines',
      'eleiko',
      'arsenal',
      'locker',
      'lockers',
      'shower',
      'showers',
      'amenities',
      'towel',
      'towels',
      'dyson',
      'cafe',
      'shake',
      'protein',
      'أجهزة',
      'معدات',
      'خزائن',
      'خزانات',
      'شاور',
      'استحمام',
      'مناشف',
      'بروتين',
      'كافيه',
      'مرافق',
    ],
    response: {
      en: '✨ **Unrivaled Equipment & 5-Star Amenities:**\n\n• **Biomechanics Floor:** Eleiko IPF-certified calibrated barbells, Arsenal Strength selectorized machines, and custom Prime Fitness attachments.\n• **Locker Suites:** Private marble shower suites, Dyson Supersonic hair styling bars, Grown Alchemist luxury toiletries.\n• **Hospitality:** Chilled eucalyptus-infused towels, alkaline electrolyte hydration stations, and in-house Artisan Protein & Espresso Bar.',
      ar: '✨ **تجهيزات ميكانيكية استثنائية ومرافق فندقية فاخرة:**\n\n• **صالة الأجهزة:** أوزان وقضبان Eleiko الأولمبية المعتمدة، أجهزة Arsenal Strength الإيطالية الميكانيكية، ومقابض Prime Fitness.\n• **أجنحة الخزائن والاستحمام:** كبائن استحمام رخامية مستقلة، مصففات شعر Dyson Supersonic، ومستحضرات Grown Alchemist الفاخرة.\n• **الضيافة:** مناشف باردة برائحة الأوكالبتوس المنعشة، محطات ماء قلوي وكهارل، وبار عصائر بروتينية وقهوة مختصة.',
    },
    actionCards: {
      en: [
        {
          title: 'Browse High-Res Facility Tour',
          description: 'Explore the 15,000 sq. ft. Dubai facility',
          ctaText: 'View About Sanctuary',
          ctaAction: 'navigate_about',
          iconType: 'info',
        },
      ],
      ar: [
        {
          title: 'جولة مصورة داخل مرافق الجيم',
          description: 'استكشف المقر المتكامل في قلب دبي',
          ctaText: 'استعراض صفحة المرافق',
          ctaAction: 'navigate_about',
          iconType: 'info',
        },
      ],
    },
  },

  // 8. Human Agent / WhatsApp / Direct Call
  {
    keywords: [
      'whatsapp',
      'human',
      'agent',
      'person',
      'reception',
      'desk',
      'concierge',
      'call',
      'phone',
      'contact',
      'talk',
      'speak',
      'number',
      'واتساب',
      'واتس',
      'موظف',
      'استقبال',
      'كونسيرج',
      'اتصال',
      'رقم',
      'تليفون',
      'هاتف',
      'مكالمة',
      'تحدث مع شخص',
    ],
    response: {
      en: '📲 **Connect Directly with Dubai Front Desk Concierge:**\n\nOur dedicated reception team is active right now on WhatsApp and phone:\n\n• **WhatsApp Hotline:** +971 50 000 0000 *(Instant response)*\n• **Direct Landline:** +971 4 000 0000\n• **Email Concierge:** concierge@gymdemo-dubai.ae\n\nTap below to launch a direct WhatsApp chat with our front desk team!',
      ar: '📲 **التواصل المباشر مع كونسيرج واستقبال دبي:**\n\nفريق الاستقبال متواجد الآن للرد على استفساراتكم عبر واتساب والهاتف:\n\n• **خط واتساب المباشر:** ٠٠٠٠ ٠٠٠ ٥٠ ٩٧١+ *(رد فوري)*\n• **الهاتف المباشر:** ٠٠٠٠ ٠٠٠ ٤ ٩٧١+\n• **البريد الإلكتروني:** concierge@gymdemo-dubai.ae\n\nاضغط بالأسفل لبدء محادثة واتساب فورية مع موظف الاستقبال!',
    },
    actionCards: {
      en: [
        {
          title: 'Launch WhatsApp Live Chat',
          description: 'Chat directly with Dubai reception on WhatsApp',
          ctaText: 'Open in WhatsApp App',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'Hi GymDesk Front Desk, I have a question about GYM DEMO Dubai.',
          iconType: 'whatsapp',
        },
        {
          title: 'Call Sanctuary Reception',
          description: '+971 4 000 0000',
          ctaText: 'Call +971 4 000 0000',
          ctaAction: 'call_gym',
          ctaPayload: '+97140000000',
          iconType: 'phone',
        },
      ],
      ar: [
        {
          title: 'فتح المحادثة عبر تطبيق واتساب',
          description: 'تحدث مباشرة مع فريق الاستقبال في دبي',
          ctaText: 'فتح في واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: 'مرحباً جيم ديسك، لدي استفسار بخصوص جيم ديمو دبي.',
          iconType: 'whatsapp',
        },
        {
          title: 'اتصال هاتفي مباشر بالاستقبال',
          description: '٠٠٠٠ ٠٠٠ ٤ ٩٧١+',
          ctaText: 'اتصل الآن',
          ctaAction: 'call_gym',
          ctaPayload: '+97140000000',
          iconType: 'phone',
        },
      ],
    },
  },

  // 9. Greeting / Hello
  {
    keywords: [
      'hi',
      'hello',
      'hey',
      'greetings',
      'good morning',
      'good afternoon',
      'good evening',
      'salam',
      'marhaba',
      'مرحبا',
      'أهلا',
      'اهلا',
      'السلام عليكم',
      'صباح الخير',
      'مساء الخير',
      'مرحبتين',
      'هلا',
      'سلام',
    ],
    response: {
      en: '👋 **Welcome to GYM DEMO Dubai — GymDesk Concierge!**\n\nI am your 24/7 instant assistant for all questions regarding memberships, free VIP day passes, master trainers, or recovery facilities.\n\nHow may I assist you today? You can select a quick topic below or type your inquiry.',
      ar: '👋 **أهلاً بك في جيم ديمو دبي — كونسيرج جيم ديسك!**\n\nأنا مساعدك الفوري على مدار الساعة للإجابة عن استفسارات الاشتراكات، حجز تصريح التجربة المجاني، المدربين الشخصيين ومرافق الاستشفاء.\n\nكيف يمكنني خدمتك اليوم؟ يمكنك اختيار أحد المواضيع السريعة أدناه أو كتابة سؤالك مباشرة.',
    },
  },
];

export const getGymDeskInstantReply = (
  userQuery: string,
  lang: Language
): {
  replyText: string;
  actionCards?: GymDeskActionCard[];
  suggestedPrompts?: GymDeskQuickPrompt[];
} => {
  const normalized = userQuery.toLowerCase().trim();

  // Match against knowledge base entries
  let bestEntry: GymDeskKnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of GYMDESK_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (normalized === kwLower) {
        score += 10;
      } else if (normalized.includes(kwLower)) {
        score += kwLower.length > 4 ? 4 : 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && highestScore > 0) {
    return {
      replyText: bestEntry.response[lang],
      actionCards: bestEntry.actionCards ? bestEntry.actionCards[lang] : undefined,
      suggestedPrompts: bestEntry.suggestedPrompts
        ? bestEntry.suggestedPrompts[lang]
        : GYMDESK_INITIAL_PROMPTS[lang].slice(0, 3),
    };
  }

  // Fallback generic response
  if (lang === 'ar') {
    return {
      replyText: `شكرًا لتواصلك مع كونسيرج **جيم ديسك دبي**! ✨\n\nبخصوص استفسارك: *" ${userQuery} "*، يسعدنا تزويدك بكافة المعلومات، أو يمكنك حجز تصريح تجربة VIP مجانية، أو التواصل مباشرة مع موظف الاستقبال عبر واتساب.`,
      actionCards: [
        {
          title: 'حجز تجربة VIP مجانية',
          description: 'دخول كامل + استشارة مدرب 45 دقيقة',
          ctaText: 'فتح نموذج الحجز',
          ctaAction: 'open_trial',
          iconType: 'trial',
        },
        {
          title: 'محادثة فورية مع الاستقبال عبر واتساب',
          description: 'تحدث مع موظف الاستقبال الآن',
          ctaText: 'محادثة واتساب',
          ctaAction: 'open_whatsapp',
          ctaPayload: `مرحباً جيم ديسك، أستفسر عن: ${userQuery}`,
          iconType: 'whatsapp',
        },
      ],
      suggestedPrompts: GYMDESK_INITIAL_PROMPTS.ar,
    };
  }

  return {
    replyText: `Thank you for contacting **GYM DEMO Dubai Concierge**! ✨\n\nRegarding: *" ${userQuery} "*, our front desk team is delighted to assist you. You can reserve a complimentary VIP Day Pass, view our bespoke memberships, or chat directly with our reception on WhatsApp.`,
    actionCards: [
      {
        title: 'Reserve VIP Free Trial Pass',
        description: 'Full facility access + 45-min master coach session',
        ctaText: 'Open Free Trial Form',
        ctaAction: 'open_trial',
        iconType: 'trial',
      },
      {
        title: 'Direct WhatsApp Concierge',
        description: 'Connect with live reception on WhatsApp',
        ctaText: 'Chat on WhatsApp',
        ctaAction: 'open_whatsapp',
        ctaPayload: `Hi GymDesk, I have a question regarding: ${userQuery}`,
        iconType: 'whatsapp',
      },
    ],
    suggestedPrompts: GYMDESK_INITIAL_PROMPTS.en,
  };
};
