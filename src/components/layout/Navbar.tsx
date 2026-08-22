import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenTrial }) => {
  const { language, toggleLanguage, isRTL, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(9,9,12,0.85)] backdrop-blur-[24px] border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#fceb99] p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-sm text-[#d4af37] tracking-tighter">GD</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-display-en group-hover:text-[#d4af37] transition-colors leading-tight">
                GYM DEMO
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#d4af37] font-bold uppercase">
                DUBAI SANCTUARY
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links in Liquid Glass Pill Container */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full liquid-glass border border-white/[0.08] shadow-lg shadow-black/20">
            {content.nav.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#d4af37] text-black shadow-md font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Toggle + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <button
              id="language-switcher-desktop-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full liquid-glass border border-white/10 hover:border-[#d4af37]/50 text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer shadow-md"
              title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-semibold">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Primary CTA */}
            <button
              id="header-trial-cta-btn"
              onClick={onOpenTrial}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black text-xs font-extrabold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{content.hero.primaryCta}</span>
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="language-switcher-mobile-header-btn"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg liquid-glass border border-white/10 text-xs font-semibold text-[#d4af37]"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl liquid-glass border border-white/10 text-white hover:text-[#d4af37] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile Menu Drawer in Liquid Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#0a0a0e]/95 backdrop-blur-[30px] pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {language === 'ar' ? 'القائمة الرئيسية' : 'SANCTUARY NAVIGATION'}
                </span>
                <div className="h-px bg-white/10 w-full mt-1" />
              </div>

              <div className="flex flex-col space-y-2">
                {content.nav.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between w-full py-4 px-5 rounded-2xl text-left text-lg font-bold transition-all ${
                        isActive
                          ? 'liquid-glass-gold text-white border border-[#d4af37]/40 shadow-lg'
                          : 'liquid-glass text-neutral-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className={language === 'ar' ? 'font-display-ar' : 'font-display-en'}>
                        {item.label}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-[#d4af37] ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                id="mobile-drawer-trial-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full py-4 rounded-xl bg-[#d4af37] text-black font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>{content.hero.primaryCta}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
                <button
                  id="mobile-drawer-language-toggle-btn"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 py-2 px-3.5 rounded-lg liquid-glass border border-white/10 text-white"
                >
                  <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}</span>
                </button>
                <span className="font-mono text-[10px] text-[#d4af37] tracking-widest">DUBAI · UAE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
