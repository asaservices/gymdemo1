import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, UserCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { language, content } = useLanguage();
  const { testimonials } = content;

  return (
    <section className="py-24 sm:py-32 bg-[#0c0c10] border-t border-[#1a1a24] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {language === 'ar' ? 'تجارب الأعضاء' : 'MEMBER EXPERIENCES'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {language === 'ar' ? 'أصوات من قلب الساحة التدريبية' : 'Words From the Arena'}
          </h2>
          <p className="text-neutral-400 text-xs font-mono mt-3">
            {language === 'ar'
              ? 'ملاحظة: شهادات تجريبية توضيحية قابلة للتعديل عند إطلاق المنشأة.'
              : 'Configurable demonstration testimonials reflecting member transformation focus.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#121218] border border-[#22222e] rounded-3xl p-8 flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-[#d4af37]/40 mb-6" />
                <p className="text-sm text-neutral-200 leading-relaxed font-light mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#1e1e28] flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-neutral-400 font-light">{t.roleOrGoal}</p>
                  <span className="text-[10px] font-mono text-[#d4af37] block mt-0.5">{t.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
