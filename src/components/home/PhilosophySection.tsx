import React from 'react';
import { ShieldCheck, Target, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

export const PhilosophySection: React.FC = () => {
  const { language, content } = useLanguage();
  const { philosophy } = content;

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Philosophy Statement & Quote */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
                {philosophy.eyebrow}
              </span>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {philosophy.heading}
              </h2>
            </div>

            <blockquote className="p-6 rounded-2xl bg-[#111117] border-l-2 border-[#d4af37] text-neutral-200 text-base sm:text-lg italic font-light leading-relaxed">
              {philosophy.quote}
            </blockquote>

            <div className="space-y-4 pt-2">
              {philosophy.points.map((pt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121218] border border-[#20202c]">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <span className="text-[#d4af37]">0{idx + 1}.</span>
                    <span>{pt.title}</span>
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cinematic Secondary Photo */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src={HIGH_RES_IMAGES.heroSecondary}
                alt="Gym Demo Dubai Athlete"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
                  <div className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-1">
                    PHYSIOLOGICAL EVOLUTION
                  </div>
                  <div className="text-sm text-white font-medium">
                    {language === 'ar'
                      ? 'لا مجال للعشوائية؛ كل تكرار محسوب بدقة متناهية.'
                      : 'Zero wasted movement. Every microcycle engineered for adaptation.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
