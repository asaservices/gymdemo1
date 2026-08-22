import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

export const ManifestoSection: React.FC = () => {
  const { language, content, isRTL } = useLanguage();
  const { manifesto } = content;

  return (
    <section id="manifesto-section" className="py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
                {manifesto.eyebrow}
              </span>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {manifesto.heading}
              </h2>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              <p>{manifesto.body1}</p>
              <p className="text-neutral-400">{manifesto.body2}</p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-px bg-[#d4af37]" />
              <span className="font-mono text-xs text-[#d4af37] tracking-widest uppercase font-semibold">
                {manifesto.author}
              </span>
            </div>
          </div>

          {/* High-Contrast Editorial Photo with Luxury Border */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={HIGH_RES_IMAGES.brandManifesto}
                alt="Gym Demo Dubai Philosophy"
                className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <p className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
                  ARCHITECTURAL TRAINING
                </p>
                <p className="text-xs text-neutral-300">
                  {language === 'ar' ? 'تصميم يحترم طاقة الرياضي ووقت الإنجاز' : 'Calibrated for absolute biological focus.'}
                </p>
              </div>
            </div>

            {/* Subtle decorative gold corner */}
            <div className={`absolute -top-3 ${isRTL ? '-left-3' : '-right-3'} w-16 h-16 border-t-2 border-[#d4af37] ${isRTL ? 'border-l-2' : 'border-r-2'} pointer-events-none opacity-60`} />
          </div>
        </div>
      </div>
    </section>
  );
};
