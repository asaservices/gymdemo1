import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

interface TrialOfferSectionProps {
  onOpenTrial: () => void;
}

export const TrialOfferSection: React.FC<TrialOfferSectionProps> = ({ onOpenTrial }) => {
  const { language, content, isRTL } = useLanguage();
  const { trialOffer } = content;

  return (
    <section className="py-20 bg-[#09090b] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14141d] via-[#1a1a26] to-[#14141d] border border-[#2a2a3c] p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Gold Glow backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                <span>{trialOffer.eyebrow}</span>
              </div>

              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {trialOffer.heading}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                {trialOffer.body}
              </p>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>{trialOffer.guarantee}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                id="trial-offer-cta-btn"
                onClick={onOpenTrial}
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-[#d4af37]/30 flex items-center justify-center gap-3 cursor-pointer hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>{trialOffer.cta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
