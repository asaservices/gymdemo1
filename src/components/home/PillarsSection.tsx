import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export const PillarsSection: React.FC = () => {
  const { language, content } = useLanguage();
  const { pillars } = content;

  return (
    <section className="py-24 bg-[#0d0d12] border-y border-[#181822] text-[#f4f4f6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {language === 'ar' ? 'معايير التميز والفخامة' : 'WHY GYM DEMO'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {language === 'ar' ? 'أركان الأداء البشري الاستثنائي' : 'Engineered for Uncompromising Athletes'}
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-[#13131a] hover:bg-[#181824] border border-[#22222e] hover:border-[#d4af37]/40 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xl font-black text-[#d4af37] opacity-80 group-hover:opacity-100 transition-opacity">
                    {pillar.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]/40 group-hover:bg-[#d4af37] transition-colors" />
                </div>

                <h3 className={`text-xl font-bold text-white mb-3 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                  {pillar.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-light mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#20202d]">
                <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider">
                  {pillar.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
