import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Award,
  HeartHandshake,
  Compass,
  Wind,
  VolumeX,
  SunMedium,
  CheckCircle2,
  Users,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

interface AboutPageProps {
  onOpenTrial: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenTrial }) => {
  const { language, isRTL } = useLanguage();
  const [activeAcousticTab, setActiveAcousticTab] = useState<'air' | 'acoustic' | 'lighting'>('air');

  const t = {
    eyebrow: language === 'ar' ? 'فلسفة ورؤية التأسيس' : 'OUR MANIFESTO & ORIGINS',
    title: language === 'ar' ? 'صُمم ليتجاوز التوقعات في دبي' : 'An Architectural Benchmark for Human Strength',
    subtitle:
      language === 'ar'
        ? 'لم نقم ببناء مجرد صالة ألعاب رياضية؛ بل صممنا ملاذاً متكاملاً للتركيز، حيث تلتقي الهندسة الحيوية الدقيقة مع فخامة لا مثيل لها.'
        : 'We did not construct a conventional fitness facility. We engineered a sanctuary of focus where biomechanical precision meets unapologetic Dubai luxury.',

    missionTitle: language === 'ar' ? 'رسالتنا' : 'Our Mission',
    missionDesc:
      language === 'ar'
        ? 'تمكين الرياضيين ورواد الأعمال والقادة من إطلاق أقصى طاقاتهم الجسدية والعقلية عبر بيئة تدريبية متطورة تخلو من العشوائية والتشتيت.'
        : 'To empower ambitious individuals, executives, and athletes to attain peak physical and mental resilience through data-guided training and an uncompromising environment.',

    visionTitle: language === 'ar' ? 'رؤيتنا' : 'Our Vision',
    visionDesc:
      language === 'ar'
        ? 'أن نكون المعيار الذهبي الأول في دبي والشرق الأوسط للتدريب الرياضي النخبوي، وعلوم الاستشفاء الخلوي، والخدمة المصممة خصيصاً لكل عضو.'
        : 'To define the absolute gold standard for high-performance training, bio-longevity, and bespoke concierge hospitality across Dubai and the Middle East.',

    facilityTitle: language === 'ar' ? 'فلسفة المكان والهندسة المعمارية' : 'The Architecture of Sanctuary',
    facilityDesc1:
      language === 'ar'
        ? 'تمت معالجة كل ركن صوتياً لمنع الترددات المزعجة، وتزويد الصالة بنظام تنقية هواء متطور يحافظ على مستويات أكسجين مثالية خلال التمارين القاسية.'
        : 'Every corner of the facility is acoustically treated to eliminate chaotic noise, complemented by hospital-grade HEPA air purification that maintains peak oxygen saturation during maximum efforts.',
    facilityDesc2:
      language === 'ar'
        ? 'الإضاءة مصممة بزوايا موجهة مانعة للتوهج تعزز التركيز الذهني وتحافظ على خصوصية الأعضاء التامة.'
        : 'Directional architectural lighting sharpens neuromuscular focus while preventing glare, ensuring an intimate, distraction-free arena.',

    pillarsTitle: language === 'ar' ? 'المبادئ التأسيسية' : 'Foundational Pillars',
    pillars: [
      {
        icon: Target,
        title: language === 'ar' ? 'الدقة البيوميكانيكية' : 'Biomechanical Precision',
        desc: language === 'ar' ? 'أوزان أولمبية معايرة وأجهزة مصممة لحركة المفاصل الطبيعية دون إجهاد سلبي.' : 'Calibrated Olympic plates, Eleiko steel, and convergent strength machinery.',
      },
      {
        icon: HeartHandshake,
        title: language === 'ar' ? 'الخصوصية الفائقة' : 'Absolute Member Privacy',
        desc: language === 'ar' ? 'تحديد سعة الأعضاء لضمان تجربة هادئة خالية تماماً من الازدحام والانتظار.' : 'Strict floor capacity caps to eliminate waiting, noise, and crowding.',
      },
      {
        icon: Award,
        title: language === 'ar' ? 'الاستشفاء الخلوي الشامل' : 'Cellular Restoration',
        desc: language === 'ar' ? 'أحواض تبريد وسونا فنلندية لتسريع التعافي العصبي والجسدي بمعدل الضعف.' : 'Sub-zero hydrotherapy and infrared protocols for rapid CNS recovery.',
      },
    ],

    ctaHeading: language === 'ar' ? 'اختبر الفارق بنفسك' : 'Experience the Benchmark',
    ctaSub: language === 'ar' ? 'احجز زيارة واستشارة خاصة مع أحد مدربينا الرئيسيين في دبي.' : 'Reserve a private walkthrough and consultation with our Master Coaching staff.',
    ctaBtn: language === 'ar' ? 'احجز تجربة VIP مجانية' : 'RESERVE VIP TRIAL PASS',
  };

  const coaches = [
    {
      name: 'Marcus Vance',
      role: language === 'ar' ? 'رئيس قسم الأداء والقوة الأولمبية' : 'Head of Biomechanics & Olympic Strength',
      cred: 'M.Sc. Sports Science · Ex-Olympic Coach',
      image: HIGH_RES_IMAGES.coachMale,
      specialty: language === 'ar' ? 'إعادة التشكيل العضلي والكتلة' : 'Hypertrophy & Neuromuscular Drive',
    },
    {
      name: 'Elena Rostova',
      role: language === 'ar' ? 'رئيسة برامج الاستشفاء والتكييف الحركي' : 'Director of Recovery & Metabolic Conditioning',
      cred: 'Bio-Longevity Specialist · CSCS',
      image: HIGH_RES_IMAGES.coachFemale,
      specialty: language === 'ar' ? 'الاستشفاء الحراري وبروتوكولات التنفس' : 'CNS Restoration & Contrast Therapy',
    },
  ];

  return (
    <div className="relative pt-24 pb-28 bg-[#09090b] text-[#f4f4f6] overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Liquid Glass Background Ambiance */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#d4af37]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[450px] h-[450px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-5 shadow-lg border border-[#d4af37]/35"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase max-w-4xl mx-auto mb-6 leading-[1.08] ${
            language === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* High-Resolution Architectural Banner with Liquid Glass HUD */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[440px] sm:h-[540px] group"
        >
          <img
            src={HIGH_RES_IMAGES.brandManifesto}
            alt="Gym Demo Dubai Sanctuary Floor"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {/* Liquid Glass HUD Telemetry Overlay */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <div className="liquid-glass-pill px-4 py-2 rounded-full border border-white/15 text-[11px] font-mono text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span>DUBAI FLAGSHIP • 15,000 SQ. FT.</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 liquid-glass-pill px-3 py-1.5 rounded-full border border-white/15 text-[10px] font-mono text-neutral-300">
              <span>LAT: 25.1972° N</span>
              <span>•</span>
              <span>LON: 55.2744° E</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-1">
                ACOUSTIC & BIOMECHANICAL RIGOR
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">ENGINEERED FOR SUPREMACY</h3>
            </div>
            <button
              onClick={onOpenTrial}
              className="px-8 py-4 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{t.ctaBtn}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision Section in Liquid Glass */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl liquid-glass border border-white/[0.08] hover:border-[#d4af37]/40 transition-all shadow-2xl relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-6 border border-[#d4af37]/30">
              <Target className="w-7 h-7" />
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
              {t.missionTitle}
            </h3>
            <p className="text-neutral-300 leading-relaxed font-light text-sm sm:text-base">
              {t.missionDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 sm:p-10 rounded-3xl liquid-glass border border-white/[0.08] hover:border-[#d4af37]/40 transition-all shadow-2xl relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-6 border border-[#d4af37]/30">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
              {t.visionTitle}
            </h3>
            <p className="text-neutral-300 leading-relaxed font-light text-sm sm:text-base">
              {t.visionDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Environmental & Acoustic Sanctuary Section with Interactive Specs */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="liquid-glass-elevated rounded-3xl p-8 sm:p-12 border border-white/[0.1] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-[#d4af37] text-[10px] font-mono uppercase tracking-widest border border-[#d4af37]/30">
                <Wind className="w-3 h-3" />
                <span>ENVIRONMENTAL PROTOCOLS</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold text-white leading-tight ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                {t.facilityTitle}
              </h2>
              <p className="text-neutral-300 leading-relaxed font-light text-sm sm:text-base">
                {t.facilityDesc1}
              </p>
              <p className="text-neutral-400 leading-relaxed font-light text-sm sm:text-base">
                {t.facilityDesc2}
              </p>

              {/* Environmental Spec Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-center">
                  <div className="text-lg font-mono font-bold text-[#d4af37]">99.97%</div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400 mt-0.5">HEPA Air Pure</div>
                </div>
                <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-center">
                  <div className="text-lg font-mono font-bold text-[#d4af37]">&lt;42 dB</div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400 mt-0.5">Acoustic Shield</div>
                </div>
                <div className="p-3.5 rounded-2xl liquid-glass border border-white/10 text-center">
                  <div className="text-lg font-mono font-bold text-[#d4af37]">2700K</div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400 mt-0.5">Glare-Free Lumens</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden h-60 border border-white/10 shadow-lg group">
                  <img
                    src={HIGH_RES_IMAGES.strengthZone}
                    alt="Strength Arena"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white font-mono">
                    Olympic Lifting Pods
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-60 border border-white/10 shadow-lg group sm:mt-6">
                  <img
                    src={HIGH_RES_IMAGES.recoveryPlunge}
                    alt="Thermal Lounge"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white font-mono">
                    3°C Sub-Zero Hydro Plunge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Clinicians / Coaching Staff in Liquid Glass */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-2">
            MASTER COACHING FACULTY
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-white uppercase ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
            {language === 'ar' ? 'نخبة من علماء ومدربي الرياضة' : 'The Sports Science Staff'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coaches.map((coach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-white/[0.08] hover:border-[#d4af37]/40 transition-all shadow-xl"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-[#d4af37]/30 shadow-lg">
                <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 text-center sm:text-start">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block">
                  {coach.cred}
                </span>
                <h4 className="text-xl font-bold text-white">{coach.name}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">{coach.role}</p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full liquid-glass-subtle text-[11px] text-[#f3e5ab] font-medium border border-white/10">
                    Focus: {coach.specialty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars in Liquid Glass */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-2">
            CORE VALUES
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-white ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
            {t.pillarsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-3xl liquid-glass border border-white/[0.08] hover:border-[#d4af37]/40 transition-colors shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-6 border border-[#d4af37]/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{p.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Final Trial CTA Card in Liquid Glass Gold */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 sm:p-14 rounded-3xl liquid-glass-gold text-center shadow-2xl space-y-6 relative overflow-hidden"
        >
          <h3 className={`text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
            {t.ctaHeading}
          </h3>
          <p className="text-neutral-200 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            {t.ctaSub}
          </p>
          <button
            onClick={onOpenTrial}
            className="px-9 py-4 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{t.ctaBtn}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
