import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Check,
  ArrowRight,
  X,
  Clock,
  Flame,
  Dumbbell,
  ShieldCheck,
  Activity,
  Layers,
  Zap,
  Target,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ProgramItem } from '../../types';

interface ProgramsPageProps {
  onOpenTrial: (programTitle?: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onOpenTrial }) => {
  const { language, isRTL, programs } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<ProgramItem | null>(null);

  // Interactive Workout Split Simulator State
  const [simulatorDays, setSimulatorDays] = useState<number>(4);
  const [simulatorFocus, setSimulatorFocus] = useState<'hypertrophy' | 'athletic' | 'hybrid' | 'recovery'>('hypertrophy');

  const categories = [
    { id: 'all', label: language === 'ar' ? 'كافة البرامج' : 'All Disciplines' },
    { id: 'strength', label: language === 'ar' ? 'القوة والأوزان' : 'Strength & Power' },
    { id: 'personal', label: language === 'ar' ? 'التدريب الشخصي VIP' : 'VIP 1-on-1' },
    { id: 'conditioning', label: language === 'ar' ? 'اللياقة الحركية' : 'Functional & Speed' },
    { id: 'combat', label: language === 'ar' ? 'الملاكمة القتالية' : 'Tactical Boxing' },
    { id: 'recovery', label: language === 'ar' ? 'الاستشفاء والعلاج' : 'Thermal Recovery' },
  ];

  const filteredPrograms =
    selectedCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  // Split calculations
  const splitSchedule = {
    hypertrophy: [
      { day: 'Day 1', session: 'Upper Body A: Horizontal Push / Pull Precision', intensity: '85%' },
      { day: 'Day 2', session: 'Lower Body A: Quad Hypertrophy & Posterior Chain', intensity: '90%' },
      { day: 'Day 3', session: 'Thermal Recovery & Sub-Zero Plunge Protocol', intensity: 'Active Rest' },
      { day: 'Day 4', session: 'Upper Body B: Vertical Press & Arm Density', intensity: '80%' },
      { day: 'Day 5', session: 'Lower Body B: Posterior Dominant & Calves', intensity: '85%' },
    ],
    athletic: [
      { day: 'Day 1', session: 'Velocity Deceleration & Rotational Power', intensity: '92%' },
      { day: 'Day 2', session: 'Olympic Tri-Plex: Clean, Snatch & High Pulls', intensity: '95%' },
      { day: 'Day 3', session: 'Hydro-Recovery & Fascial Release Lab', intensity: 'Active Rest' },
      { day: 'Day 4', session: 'High-Lactate Boxing Rounds & Speed Agility', intensity: '88%' },
      { day: 'Day 5', session: 'Loaded Carries & Structural Trunk Integrity', intensity: '82%' },
    ],
    hybrid: [
      { day: 'Day 1', session: 'Max Strength 5x5 + Biomechanical Squats', intensity: '90%' },
      { day: 'Day 2', session: 'Zone-2 Engine Work & Tactical Bagwork', intensity: '75%' },
      { day: 'Day 3', session: 'Contrast Hydrotherapy (3°C / 90°C)', intensity: 'Active Rest' },
      { day: 'Day 4', session: 'Hypertrophy Accents & Kinetic Conditioning', intensity: '85%' },
      { day: 'Day 5', session: 'Metabolic Finisher & Mobility Flow', intensity: '80%' },
    ],
    recovery: [
      { day: 'Day 1', session: 'Spinal Decompression & Guided Breathwork', intensity: 'Low Stress' },
      { day: 'Day 2', session: 'Sub-Zero Hydrotherapy & Cedar Sauna 90°C', intensity: 'Circulation' },
      { day: 'Day 3', session: 'Deep Tissue Percussive Therapy & Normatec', intensity: 'Cellular' },
      { day: 'Day 4', session: 'Low-Impact Isometric Strength Calibration', intensity: '60%' },
      { day: 'Day 5', session: 'Infrared Bio-Frequency & Cold Immersion', intensity: 'Restorative' },
    ],
  }[simulatorFocus].slice(0, simulatorDays);

  return (
    <div className="relative pt-24 pb-28 bg-[#09090b] text-[#f4f4f6] overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Ambient Liquid Glass Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#d4af37]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[450px] h-[450px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-5 shadow-lg border border-[#d4af37]/35"
        >
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span>{language === 'ar' ? 'دليل التدريب والأداء' : 'TRAINING CURRICULUM'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase mb-6 leading-[1.08] ${
            language === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {language === 'ar' ? (
            <>
              هندسة الأداء{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                الرياضي المتفوق
              </span>
            </>
          ) : (
            <>
              Disciplines of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                Physical Mastery
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
        >
          {language === 'ar'
            ? 'برامج تدريبية تخصصية تجمع بين العلم والتقييم البيومتري الدقيق لتحقيق أهدافك الجسدية دون إهدار للوقت.'
            : 'Structured athletic disciplines designed with biomechanical precision. Every program incorporates progressive tracking, recovery science, and world-class coaching.'}
        </motion.p>

        {/* Liquid Glass Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-2 rounded-full liquid-glass border border-white/[0.1] shadow-2xl"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`program-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25 scale-105'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Programs Grid with Liquid Glass Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog, idx) => (
            <motion.div
              key={prog.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="liquid-glass rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(212,175,55,0.15)]"
            >
              {/* Image Header with Glass Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/45 to-transparent" />

                {prog.badge && (
                  <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                    <span className="px-3.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                      {prog.badge}
                    </span>
                  </div>
                )}

                <div className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white liquid-glass-pill px-3 py-1 rounded-md flex items-center gap-1.5 border border-white/15">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      {prog.duration}
                    </span>
                    <span className="text-[10px] font-mono text-white liquid-glass-pill px-3 py-1 rounded-md flex items-center gap-1.5 border border-white/15">
                      <Flame className="w-3 h-3 text-[#d4af37]" />
                      {prog.intensityLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content with Liquid Glass Styling */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3
                    className={`text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2 ${
                      language === 'ar' ? 'font-display-ar' : 'font-display-en'
                    }`}
                  >
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[#f3e5ab] font-medium mb-3 tracking-wide">{prog.tagline}</p>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-5">
                    {prog.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                    {prog.keyBenefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5 border border-[#d4af37]/40">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center gap-3">
                  <button
                    id={`trial-program-${prog.id}`}
                    onClick={() => onOpenTrial(prog.title)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'حجز تجربة' : 'Book Free Trial'}</span>
                  </button>

                  <button
                    id={`details-program-${prog.id}`}
                    onClick={() => setActiveModalProgram(prog)}
                    className="py-3.5 px-4 rounded-xl liquid-glass-subtle hover:bg-white/10 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-all border border-white/10 hover:border-white/20 cursor-pointer"
                  >
                    {language === 'ar' ? 'التفاصيل' : 'Details'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Biometric Split & Volume Analyzer (Liquid Glass Dashboard Component) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#d4af37]/30 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-[#d4af37] text-[11px] font-mono uppercase tracking-widest mb-3 border border-[#d4af37]/30">
                <Activity className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'محلل الجداول الرياضية التفاعلي' : 'INTERACTIVE SPLIT SIMULATOR'}</span>
              </div>
              <h2
                className={`text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {language === 'ar' ? 'محاكي التقسيم والجدول الأسبوعي' : 'Design Your Weekly Protocol'}
              </h2>
              <p className="text-sm text-neutral-300 max-w-2xl font-light mt-2">
                {language === 'ar'
                  ? 'اختر عدد أيام التدريب وهدفك الأساسي لمعاينة نموذج الجدول الموصى به من قبل مدربينا.'
                  : 'Select your preferred commitment frequency and physiological objective to preview a bespoke curriculum.'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Days Selector */}
              <div className="liquid-glass p-1.5 rounded-2xl flex items-center gap-1 border border-white/10">
                {[3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSimulatorDays(num)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                      simulatorDays === num
                        ? 'bg-[#d4af37] text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {num} {language === 'ar' ? 'أيام' : 'Days'}
                  </button>
                ))}
              </div>

              {/* Focus Selector */}
              <div className="liquid-glass p-1.5 rounded-2xl flex flex-wrap items-center gap-1 border border-white/10">
                {(
                  [
                    { id: 'hypertrophy', label: language === 'ar' ? 'تضخيم' : 'Hypertrophy' },
                    { id: 'athletic', label: language === 'ar' ? 'قوة وسرعة' : 'Athletic' },
                    { id: 'hybrid', label: language === 'ar' ? 'هجين' : 'Hybrid' },
                    { id: 'recovery', label: language === 'ar' ? 'استشفاء' : 'Recovery' },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSimulatorFocus(f.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      simulatorFocus === f.id
                        ? 'bg-[#d4af37] text-black font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule Cards Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {splitSchedule.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="liquid-glass p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-[#d4af37]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#d4af37] uppercase">{item.day}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded liquid-glass-pill text-neutral-300">
                      {item.intensity}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white leading-snug">{item.session}</h4>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Biometrics Tracked</span>
                  <span className="text-[#d4af37]">Active</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Simulator CTA Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>
                {language === 'ar'
                  ? 'يشمل البرنامج تقييماً أولياً مجانياً لـ InBody 770 واستشارة مدتها ٤٥ دقيقة.'
                  : 'All tailored programs include initial InBody 770 scan and a 45-minute Master Coach baseline assessment.'}
              </span>
            </div>

            <button
              onClick={() => onOpenTrial()}
              className="px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 cursor-pointer shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'احجز تقييم البرنامج مجاناً' : 'BOOK COMPLIMENTARY ASSESSMENT'}</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Program Details Modal with Liquid Glass Drawer */}
      <AnimatePresence>
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProgram(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-[24px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl liquid-glass-elevated border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 text-[#f4f4f6] z-10 my-8 shadow-2xl overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#d4af37]/15 rounded-full blur-[100px] pointer-events-none" />

              <button
                onClick={() => setActiveModalProgram(null)}
                className={`absolute top-5 ${
                  isRTL ? 'left-5' : 'right-5'
                } p-2.5 rounded-full text-neutral-400 hover:text-white liquid-glass border border-white/10 hover:border-white/30 transition-colors z-20 cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={activeModalProgram.image}
                  alt={activeModalProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md liquid-glass-pill text-[#d4af37] text-[10px] font-mono uppercase tracking-widest mb-2 border border-[#d4af37]/30">
                    <Flame className="w-3 h-3" />
                    <span>
                      {activeModalProgram.intensityLevel} INTENSITY • {activeModalProgram.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{activeModalProgram.title}</h3>
                </div>
              </div>

              <div className="space-y-5 text-sm text-neutral-300">
                <p className="leading-relaxed font-light">{activeModalProgram.longDescription}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-4 rounded-2xl liquid-glass border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-[#d4af37] tracking-wider block mb-1.5">
                      {language === 'ar' ? 'الهدف الرياضي الرئيسي' : 'PRIMARY OUTCOME'}
                    </span>
                    <span className="text-xs font-semibold text-white leading-relaxed block">
                      {activeModalProgram.targetGoal}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl liquid-glass border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-[#d4af37] tracking-wider block mb-1.5">
                      {language === 'ar' ? 'الفئة المستهدفة' : 'IDEAL ATHLETE'}
                    </span>
                    <span className="text-xs font-semibold text-white leading-relaxed block">
                      {activeModalProgram.idealMember}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex gap-3">
                  <button
                    onClick={() => {
                      const progName = activeModalProgram.title;
                      setActiveModalProgram(null);
                      onOpenTrial(progName);
                    }}
                    className="w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حجز تجربة مجانية لهذا البرنامج' : 'Book Free VIP Pass For This Discipline'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
