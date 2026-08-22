import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FacilityTourSectionProps {
  onOpenTrial: () => void;
}

export const FacilityTourSection: React.FC<FacilityTourSectionProps> = ({ onOpenTrial }) => {
  const { language, content, isRTL } = useLanguage();
  const { facilityTour } = content;
  const [activeZoneId, setActiveZoneId] = useState(facilityTour.zones[0]?.id || 'strength');

  const activeZone = facilityTour.zones.find((z) => z.id === activeZoneId) || facilityTour.zones[0];

  return (
    <section className="py-24 sm:py-32 bg-[#0d0d12] border-t border-[#1a1a24] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {facilityTour.eyebrow}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {facilityTour.heading}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
            {facilityTour.subheading}
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {facilityTour.zones.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                id={`zone-tab-${zone.id}`}
                onClick={() => setActiveZoneId(zone.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 scale-105'
                    : 'bg-[#15151e] border border-[#262634] text-neutral-300 hover:text-white hover:bg-[#1f1f2c]'
                }`}
              >
                {zone.title}
              </button>
            );
          })}
        </div>

        {/* Active Zone Display Card */}
        <AnimatePresence mode="wait">
          {activeZone && (
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121219] border border-[#222230] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl"
            >
              {/* Image Column */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={activeZone.image}
                  alt={activeZone.title}
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                  <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40">
                    {activeZone.squareFootage}
                  </span>
                </div>
              </div>

              {/* Specs & Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-2">
                    {activeZone.squareFootage} · DUBAI PRECISION
                  </span>
                  <h3
                    className={`text-2xl sm:text-3xl font-extrabold text-white mb-2 ${
                      language === 'ar' ? 'font-display-ar' : 'font-display-en'
                    }`}
                  >
                    {activeZone.title}
                  </h3>
                  <p className="text-sm font-medium text-[#f3e5ab] mb-4">{activeZone.subtitle}</p>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light">
                    {activeZone.description}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                    {language === 'ar' ? 'المواصفات والتجهيزات' : 'ZONE SPECIFICATIONS'}
                  </span>
                  <div className="space-y-2">
                    {activeZone.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#20202d]">
                  <button
                    onClick={onOpenTrial}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'احجز جولة خاصة واستمتع بالتجربة' : 'Schedule a Private Tour'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
