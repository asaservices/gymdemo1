import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Sparkles,
  Star,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Flame,
  Dumbbell,
  HeartPulse,
  Crosshair,
  UserCheck,
  X,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { COACHES_DATA, SITE_CONFIG } from '../../data/content';
import { CoachItem, PageId } from '../../types';

interface CoachesSectionProps {
  onOpenTrial: (preselectedGoal?: string) => void;
  onNavigate?: (page: PageId) => void;
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ onOpenTrial, onNavigate }) => {
  const { language, isRTL } = useLanguage();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [activeCoachDetail, setActiveCoachDetail] = useState<CoachItem | null>(null);

  const coaches = COACHES_DATA[language] || COACHES_DATA.en;

  const t = {
    eyebrow: language === 'ar' ? 'نخبة المدربين المعتمدين' : 'MASTER COACHING FACULTY',
    heading: language === 'ar' ? 'إشراف مباشر من أبطال وخبراء دوليين' : 'Mentorship by Elite Master Coaches',
    subheading:
      language === 'ar'
        ? 'مدربونا حاصلون على درجات الماجستير في علوم الرياضة والميكانيكا الحيوية مع اعتمادات تدريب أولمبية. لا مدربين مبتدئين؛ بل نخبة من كبار الخبراء.'
        : 'Our coaching faculty comprises sports science postgraduates, former national lifters, and bio-longevity specialists. Zero junior instructors; pure mastery.',
    filterAll: language === 'ar' ? 'كافة التخصصات' : 'All Disciplines',
    filterStrength: language === 'ar' ? 'القوة والأوزان الأولمبية' : 'Olympic Strength',
    filterHypertrophy: language === 'ar' ? 'بناء وتشكيل القوام' : 'Physique & Recomp',
    filterCombat: language === 'ar' ? 'الملاكمة القتالية' : 'Tactical Combat',
    filterRecovery: language === 'ar' ? 'الاستشفاء وطول العمر' : 'Bio-Recovery & Longevity',
    experienceLabel: language === 'ar' ? 'سنوات خبرة' : 'Yrs Master Experience',
    transformationsLabel: language === 'ar' ? 'تحول بدني موثق' : 'Verified Transformations',
    bookCoachBtn: language === 'ar' ? 'احجز تدريباً خاصاً مع المدرب' : 'Book 1-on-1 VIP Session',
    chatCoachBtn: language === 'ar' ? 'محادثة عبر واتساب' : 'Chat on WhatsApp',
    viewBioBtn: language === 'ar' ? 'عرض السيرة والشهادات' : 'View Full Bio & Credentials',
    certifiedBadge: language === 'ar' ? 'معتمد دولياً ١٠٠٪' : '100% Gold Standard Certified',
    ratioStat: language === 'ar' ? 'نسبة ١ : ١ تدريب خاص' : '1 : 1 Dedicated VIP Ratio',
    modalClose: language === 'ar' ? 'إغلاق' : 'Close',
    specialtiesTitle: language === 'ar' ? 'مجالات التخصص الدقيقة' : 'Core Biomechanical Specialties',
    credentialsTitle: language === 'ar' ? 'الشهادات والاعتمادات الرسمية' : 'Certifications & Accreditations',
    philosophyTitle: language === 'ar' ? 'فلسفة التدريب' : 'Training Philosophy',
  };

  const filterOptions = [
    { id: 'all', label: t.filterAll, icon: Sparkles },
    { id: 'strength', label: t.filterStrength, icon: Dumbbell },
    { id: 'hypertrophy', label: t.filterHypertrophy, icon: Flame },
    { id: 'combat', label: t.filterCombat, icon: Crosshair },
    { id: 'recovery', label: t.filterRecovery, icon: HeartPulse },
  ];

  const filteredCoaches =
    selectedDiscipline === 'all'
      ? coaches
      : coaches.filter((c) => c.discipline === selectedDiscipline);

  const handleOpenCoachTrial = (coach: CoachItem) => {
    onOpenTrial(`1-on-1 Master Coaching with Coach ${coach.name}`);
  };

  const handleCoachWhatsApp = (coach: CoachItem) => {
    const text =
      language === 'ar'
        ? `مرحباً كونسيرج جيم ديسك، أود الاستفسار وحجز جلسة تدريب وتقييم خاصة مع المدرب ${coach.name} (${coach.role}).`
        : `Hello GymDesk Concierge, I would like to book a private assessment & 1-on-1 coaching consultation with Coach ${coach.name} (${coach.role}).`;
    const cleanPhone = SITE_CONFIG.whatsappDemo.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section
      id="coaches"
      className="relative py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6] overflow-hidden border-t border-[#181822]"
    >
      {/* Background Gold Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#d4af37]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {t.eyebrow}
          </span>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.heading}
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {t.subheading}
          </p>

          {/* Quick Credential Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-neutral-300">
            <div className="flex items-center gap-2 bg-[#121218] px-4 py-2 rounded-full border border-[#22222e] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>{t.certifiedBadge}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121218] px-4 py-2 rounded-full border border-[#22222e] shadow-sm">
              <UserCheck className="w-4 h-4 text-[#d4af37]" />
              <span>{t.ratioStat}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121218] px-4 py-2 rounded-full border border-[#22222e] shadow-sm">
              <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
              <span>4.98 / 5.00 Athlete Rating</span>
            </div>
          </div>
        </div>

        {/* Discipline Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selectedDiscipline === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedDiscipline(opt.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-black'
                    : 'bg-[#121218] text-neutral-400 hover:text-white hover:bg-[#181822] border border-[#22222e]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#d4af37]'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredCoaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="group bg-[#111116] border border-[#22222e] rounded-2xl overflow-hidden flex flex-col hover:border-[#d4af37]/50 hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300"
            >
              {/* Coach Image with Overlays */}
              <div className="relative h-80 overflow-hidden bg-neutral-900">
                <img
                  src={coach.image}
                  alt={coach.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/30 to-transparent" />

                {/* Badge Tag */}
                {coach.badge && (
                  <div className={`absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'}`}>
                    <span className="px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                      {coach.badge}
                    </span>
                  </div>
                )}

                {/* Rating pill */}
                <div className={`absolute top-3.5 ${isRTL ? 'left-3.5' : 'right-3.5'} bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md`}>
                  <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                  <span>{coach.rating || '4.98'}</span>
                </div>

                {/* Stat Overlays at Bottom of Image */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] text-neutral-300 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="font-bold text-[#d4af37]">
                    {coach.experienceYears}+ {t.experienceLabel}
                  </span>
                  <span className="text-neutral-400">
                    {coach.totalClientTransformations}+ {t.transformationsLabel}
                  </span>
                </div>
              </div>

              {/* Coach Body Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className={`text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}>
                  {coach.name}
                </h3>
                <p className="text-xs font-semibold text-[#d4af37]/90 mt-1 min-h-[32px] leading-snug">
                  {coach.role}
                </p>

                {/* Primary Credentials */}
                <div className="mt-3 pt-3 border-t border-[#22222e] space-y-1.5">
                  {coach.credentials.slice(0, 2).map((cred, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate">{cred}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-xs text-neutral-400 italic line-clamp-2 leading-relaxed bg-[#161620] p-3 rounded-xl border border-[#262636]">
                  "{coach.quote}"
                </p>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#22222e] space-y-2 flex-grow flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenCoachTrial(coach)}
                    className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-black text-xs font-extrabold uppercase tracking-wider py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/20 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.bookCoachBtn}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCoachWhatsApp(coach)}
                      className="w-full bg-[#181822] hover:bg-[#20202e] text-neutral-200 text-[11px] font-semibold py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 border border-[#2a2a3c] hover:border-[#d4af37]/40 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveCoachDetail(coach)}
                      className="w-full bg-[#181822] hover:bg-[#20202e] text-neutral-200 text-[11px] font-semibold py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 border border-[#2a2a3c] hover:border-[#d4af37]/40 transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coach Detail Modal */}
      <AnimatePresence>
        {activeCoachDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#121218] border border-[#d4af37]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/80 relative ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveCoachDetail(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-[#d4af37] text-neutral-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-white/10`}
                aria-label={t.modalClose}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#22222e]">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-[#d4af37] shadow-xl bg-neutral-900">
                    <img
                      src={activeCoachDetail.image}
                      alt={activeCoachDetail.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    {activeCoachDetail.badge && (
                      <span className="inline-block bg-[#d4af37] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                        {activeCoachDetail.badge}
                      </span>
                    )}
                    <h3 className={`text-2xl sm:text-3xl font-extrabold text-white ${
                      language === 'ar' ? 'font-display-ar' : 'font-display-en'
                    }`}>
                      {activeCoachDetail.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#d4af37] mt-1">
                      {activeCoachDetail.role}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-neutral-300">
                      <span className="bg-[#181822] px-3 py-1 rounded-full border border-[#2a2a3c]">
                        ⭐ {activeCoachDetail.rating || '4.98'} / 5.0 Rating
                      </span>
                      <span className="bg-[#181822] px-3 py-1 rounded-full border border-[#2a2a3c]">
                        🏆 {activeCoachDetail.experienceYears}+ {t.experienceLabel}
                      </span>
                      <span className="bg-[#181822] px-3 py-1 rounded-full border border-[#2a2a3c]">
                        ⚡ {activeCoachDetail.totalClientTransformations}+ {t.transformationsLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {activeCoachDetail.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-3">
                    {t.specialtiesTitle}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCoachDetail.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-[#181822] border border-[#2a2a3c] text-neutral-200 text-xs px-3 py-1.5 rounded-xl font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-3">
                    {t.credentialsTitle}
                  </h4>
                  <div className="space-y-2">
                    {activeCoachDetail.credentials.map((cred, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-neutral-200 bg-[#161620] p-3 rounded-xl border border-[#262636]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophy Quote */}
                <div className="mt-6 p-4 rounded-2xl bg-[#161620] border border-[#28283a]">
                  <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-wider block mb-1">
                    {t.philosophyTitle}
                  </span>
                  <p className="text-sm text-neutral-300 italic">
                    "{activeCoachDetail.quote}"
                  </p>
                </div>

                {/* Modal CTAs */}
                <div className="mt-8 pt-4 border-t border-[#22222e] flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const coach = activeCoachDetail;
                      setActiveCoachDetail(null);
                      handleOpenCoachTrial(coach);
                    }}
                    className="flex-1 bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold uppercase tracking-wider py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/25 cursor-pointer transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.bookCoachBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const coach = activeCoachDetail;
                      setActiveCoachDetail(null);
                      handleCoachWhatsApp(coach);
                    }}
                    className="flex-1 bg-[#181822] hover:bg-[#20202e] text-white font-semibold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#2a2a3c] hover:border-[#d4af37]/40 cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>{t.chatCoachBtn}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
