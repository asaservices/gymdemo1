import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { language, content } = useLanguage();
  const { faqs } = content;
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'COMMON QUESTIONS'}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {language === 'ar' ? 'كل ما تود معرفته عن النادي' : 'Clarity & Protocol'}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#14141c] border-[#d4af37]/50 shadow-lg'
                    : 'bg-[#101015] border-[#1e1e28] hover:border-[#2e2e3e]'
                }`}
              >
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-md">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1.5 rounded-full bg-[#1e1e28] text-[#d4af37] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-neutral-300 leading-relaxed font-light border-t border-[#1e1e28]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
