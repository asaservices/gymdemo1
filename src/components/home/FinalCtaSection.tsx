import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, PhoneCall, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';
import { PageId } from '../../types';

interface FinalCtaSectionProps {
  onOpenTrial: () => void;
  onNavigate: (page: PageId) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenTrial, onNavigate }) => {
  const { language, content, isRTL } = useLanguage();
  const { finalCta } = content;

  return (
    <section className="py-28 sm:py-36 bg-[#070709] text-[#f4f4f6] relative overflow-hidden text-center">
      {/* Subtle Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={HIGH_RES_IMAGES.hero}
          alt="Gym Demo Dubai Arena"
          className="w-full h-full object-cover object-center opacity-15 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono font-bold tracking-[0.3em] text-[#d4af37] uppercase block mb-4"
        >
          {finalCta.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.1] mb-6 ${
            language === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {finalCta.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {finalCta.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="final-cta-trial-btn"
            onClick={onOpenTrial}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{finalCta.primaryBtn}</span>
          </button>

          <button
            id="final-cta-contact-btn"
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-5 rounded-full bg-[#161622] hover:bg-[#202030] border border-white/15 text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-[#d4af37]/60"
          >
            <span>{finalCta.secondaryBtn}</span>
            <ArrowRight className={`w-4 h-4 text-[#d4af37] ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
