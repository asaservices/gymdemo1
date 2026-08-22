import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Activity, ShieldAlert, Dumbbell } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

interface ProgramsPreviewSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenTrial: () => void;
}

export const ProgramsPreviewSection: React.FC<ProgramsPreviewSectionProps> = ({
  onNavigate,
  onOpenTrial,
}) => {
  const { language, isRTL, content, programs } = useLanguage();
  const { programsPreview } = content;

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
              {programsPreview.eyebrow}
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
                language === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {programsPreview.heading}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
              {programsPreview.subheading}
            </p>
          </div>

          <button
            id="view-all-programs-btn"
            onClick={() => onNavigate('programs')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-[#f3e5ab] uppercase tracking-widest transition-colors self-start md:self-end"
          >
            <span>{programsPreview.exploreAllCta}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* 3 Featured Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programs.slice(0, 3).map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-[#121218] border border-[#22222d] hover:border-[#d4af37]/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />

                {prog.badge && (
                  <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                    <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                      {prog.badge}
                    </span>
                  </div>
                )}

                <div className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    {prog.duration} • {prog.intensityLevel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    className={`text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2 ${
                      language === 'ar' ? 'font-display-ar' : 'font-display-en'
                    }`}
                  >
                    {prog.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e1e28] flex items-center justify-between">
                  <button
                    onClick={onOpenTrial}
                    className="text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تجربة البرنامج مجاناً' : 'Trial This Program'}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('programs')}
                    className="p-2 rounded-full bg-[#1c1c26] text-neutral-400 group-hover:text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors"
                    aria-label="View program details"
                  >
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
