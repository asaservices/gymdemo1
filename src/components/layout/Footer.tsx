import React from 'react';
import { Globe, MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrial }) => {
  const { language, toggleLanguage, content, siteConfig, isRTL, programs, memberships } = useLanguage();

  return (
    <footer className="relative bg-[#070709] border-t border-white/[0.08] text-[#f4f4f6] pt-16 pb-12 overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Subtle liquid glass ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#fceb99] p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                  <span className="font-mono font-black text-sm text-[#d4af37]">GD</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-display-en">
                  GYM DEMO
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#d4af37] font-bold uppercase">
                  DUBAI SANCTUARY
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm font-light">
              {content.footer.description}
            </p>

            {/* Trial CTA button */}
            <div className="pt-2">
              <button
                id="footer-trial-cta-btn"
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass hover:bg-[#d4af37] hover:text-black border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.hero.primaryCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              {content.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              {content.nav.map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-nav-${item.id}`}
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              {content.footer.programsTitle}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              {programs.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button
                    id={`footer-prog-${p.id}`}
                    onClick={() => {
                      onNavigate('programs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              {content.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{language === 'ar' ? siteConfig.locationAr : siteConfig.locationEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{language === 'ar' ? siteConfig.openingHoursAr : siteConfig.openingHoursEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{siteConfig.whatsappDemo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar in Liquid Glass */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} GYM DEMO DUBAI. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#d4af37]/80 font-mono">DEMO PROTOTYPE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
