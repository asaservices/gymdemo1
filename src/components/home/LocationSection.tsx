import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, MessageSquare, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

export const LocationSection: React.FC = () => {
  const { language, content, siteConfig, isRTL } = useLanguage();
  const { locationSection } = content;

  return (
    <section className="py-24 sm:py-32 bg-[#0c0c10] border-t border-[#181822] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
                {locationSection.eyebrow}
              </span>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
                  language === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                {locationSection.heading}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#14141c] border border-[#22222e] flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {language === 'ar' ? 'العنوان' : 'ADDRESS'}
                  </h4>
                  <p className="text-sm text-white font-medium">{locationSection.address}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#14141c] border border-[#22222e] flex items-start gap-4">
                <Car className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {language === 'ar' ? 'خدمة السيارات' : 'VALET & PARKING'}
                  </h4>
                  <p className="text-sm text-white font-medium">{locationSection.parking}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#14141c] border border-[#22222e] flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {language === 'ar' ? 'ساعات العمل' : 'HOURS'}
                  </h4>
                  <p className="text-sm text-white font-medium">
                    {language === 'ar' ? siteConfig.openingHoursAr : siteConfig.openingHoursEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/971500000000?text=${encodeURIComponent(
                  'Hello GYM DEMO Concierge, I would like directions or assistance.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
              <span className="text-[11px] font-mono text-neutral-500 self-center">
                {locationSection.demoNotice}
              </span>
            </div>
          </div>

          {/* Stylized Architectural Map / Skyline Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group h-[420px]">
              <img
                src={HIGH_RES_IMAGES.dubaiSkyline}
                alt="Gym Demo Dubai Skyline"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

              {/* Map pin mockup overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-[#d4af37]/60 text-center shadow-2xl max-w-xs w-full">
                <div className="w-10 h-10 rounded-full bg-[#d4af37] text-black flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">GYM DEMO SANCTUARY</h4>
                <p className="text-xs text-neutral-300 font-mono">DOWNTOWN DUBAI · UAE</p>
                <span className="inline-block mt-3 text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider bg-[#d4af37]/10 px-2 py-0.5 rounded">
                  VIP VALET AT MAIN ENTRANCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
