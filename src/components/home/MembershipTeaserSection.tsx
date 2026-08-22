import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

interface MembershipTeaserSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenTrial: () => void;
}

export const MembershipTeaserSection: React.FC<MembershipTeaserSectionProps> = ({
  onNavigate,
  onOpenTrial,
}) => {
  const { language, isRTL, content, memberships } = useLanguage();
  const { membershipPreview } = content;
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 sm:py-32 bg-[#0c0c10] border-t border-[#181822] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {membershipPreview.eyebrow}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {membershipPreview.heading}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
            {membershipPreview.subheading}
          </p>

          {/* Billing Frequency Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#161620] border border-[#262636] mt-8 shadow-inner">
            <button
              id="billing-monthly-btn"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isAnnual ? 'bg-[#d4af37] text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {membershipPreview.billingMonthly}
            </button>
            <button
              id="billing-annual-btn"
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#d4af37] text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{membershipPreview.billingAnnual}</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {memberships.map((plan, idx) => {
            const price = isAnnual ? plan.annualMonthlyPriceAed : plan.monthlyPriceAed;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#181822] to-[#121218] border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/10 -translate-y-2'
                    : 'bg-[#111116] border border-[#22222e] hover:border-[#d4af37]/40'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 ${isRTL ? 'left-8' : 'right-8'}`}>
                    <span className="px-3.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold text-white mb-2 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light min-h-[36px]">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="mb-6 pb-6 border-b border-[#20202d]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                        {membershipPreview.currency} / {language === 'ar' ? 'شهر' : 'month'}
                      </span>
                    </div>
                    {isAnnual && (
                      <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                        {language === 'ar'
                          ? `يُفوتر سنوياً بقيمة ${plan.annualBilledTotalAed.toLocaleString()} درهم`
                          : `Billed annually at ${plan.annualBilledTotalAed.toLocaleString()} AED`}
                      </span>
                    )}
                  </div>

                  {/* Highlight feature callout */}
                  <div className="p-3 rounded-xl bg-[#1a1a24] border border-[#282836] mb-6">
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                      {language === 'ar' ? 'الميزة الاستثنائية' : 'KEY PRIVILEGE'}
                    </span>
                    <span className="text-xs font-semibold text-white">{plan.highlightBenefit}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onOpenTrial}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-[#d4af37] hover:bg-[#e5c158] text-black shadow-lg shadow-[#d4af37]/20'
                        : 'bg-[#1e1e28] hover:bg-[#282836] text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{content.hero.primaryCta}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('membership')}
                    className="w-full text-center text-[11px] font-semibold text-neutral-400 hover:text-[#d4af37] uppercase tracking-wider transition-colors py-1"
                  >
                    {language === 'ar' ? 'مقارنة كافة المزايا بالتفصيل' : 'View Full Tier Comparison'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Demo Disclaimer */}
        <div className="text-center">
          <p className="text-xs font-mono text-neutral-500 max-w-xl mx-auto">
            {membershipPreview.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
