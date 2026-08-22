import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';

interface HeroSectionProps {
  onOpenTrial: () => void;
  onNavigate: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTrial, onNavigate }) => {
  const { language, isRTL, content } = useLanguage();
  const { hero } = content;

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a0707] pt-28 sm:pt-32 pb-12 sm:pb-16 selection:bg-[#d4af37] selection:text-black">
      {/* Background Video Walkthrough with Luxury Darkened Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        >
          <source
            src="https://res.cloudinary.com/afyzzxnp/video/upload/v1787377946/Walkthrough_of_modern_gym_202608221050_mxhqcn.mp4"
            type="video/mp4"
          />
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
            type="video/mp4"
          />
        </video>

        {/* Multi-layered darkened gradient for pristine left-aligned readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/70 to-transparent" />
        {/* Subtle radial ambient highlight */}
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Hero Content - Left Aligned */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-start my-auto">
        <div className="max-w-3xl">
          {/* Dubai Location Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,7,7,0.55)] backdrop-blur-[14px] border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8 shadow-lg"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{hero.badge}</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-5 sm:mb-6 drop-shadow-md ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            <span>{hero.headlinePrefix} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
              {hero.headlineAccent}
            </span>
            <br className="hidden sm:inline" />
            <span> {hero.headlineSuffix}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl"
          >
            {hero.subheading}
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 sm:gap-5 mb-10 sm:mb-12"
          >
            <button
              id="hero-primary-trial-cta-btn"
              onClick={onOpenTrial}
              className="px-8 sm:px-9 py-4 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{hero.primaryCta}</span>
            </button>

            <button
              id="hero-secondary-memberships-btn"
              onClick={() => onNavigate('membership')}
              className="px-8 sm:px-9 py-4 rounded-full bg-[rgba(10,7,7,0.55)] hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all backdrop-blur-[17px] flex items-center justify-center gap-2 cursor-pointer hover:border-[#d4af37]/60"
            >
              <span>{hero.secondaryCta}</span>
              <ArrowRight className={`w-4 h-4 text-[#d4af37] ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Three Sanctuary Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-white/10 max-w-xl"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{hero.stat1.number}</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                {hero.stat1.label}
              </div>
            </div>
            <div className="border-x border-white/10 px-2 sm:px-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{hero.stat2.number}</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                {hero.stat2.label}
              </div>
            </div>
            <div className="text-end">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{hero.stat3.number}</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mt-1">
                {hero.stat3.label}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 mt-6 inline-flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer self-center"
        onClick={() => {
          const el = document.getElementById('manifesto-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">{hero.scrollIndicator}</span>
        <ChevronDown className="w-4 h-4 text-[#d4af37]" />
      </motion.div>
    </section>
  );
};
