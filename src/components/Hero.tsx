import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface AnimateProps {
  children: React.ReactNode;
  type?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-scale';
  delay?: number;
  className?: string;
  id?: string;
}

export const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fade-up',
  delay = 0,
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`animate-${type} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65, 88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47, 92, 72,
];

interface NavProps {
  onOpenTrial?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenTrial, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Programs', href: '#programs-section' },
    { label: 'Facility', href: '#facility-section' },
    { label: 'Memberships', href: '#membership-section' },
    { label: 'Location', href: '#location-section' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(href.replace('#', ''));
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-50 w-full pt-4 sm:pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand / Logo */}
      <Animate type="fade-right" delay={100}>
        <a
          href="#top"
          id="apogee-brand-logo"
          className="flex items-center gap-2.5 text-white font-bold tracking-wider text-xl group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-mono tracking-[0.2em] text-sm uppercase text-white group-hover:text-[#d4af37] transition-colors">
              GYM DEMO
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] -mt-0.5">
              DUBAI SANCTUARY
            </span>
          </div>
        </a>
      </Animate>

      {/* Center Nav Pill */}
      <Animate type="fade-down" delay={200} className="hidden md:flex">
        <nav
          id="apogee-center-nav-pill"
          aria-label="Main Navigation"
          className="h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px] border border-white/[0.08] shadow-lg shadow-black/20"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.href)}
              className="text-[#989898] hover:text-white transition-colors text-[13.5px] font-[450] leading-[17px] cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('#faq-section')}
            className="text-[#989898] hover:text-white transition-colors text-[13.5px] font-[450] leading-[17px] flex items-center gap-1 cursor-pointer"
          >
            <span>Experience</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
        </nav>
      </Animate>

      {/* Right Auth / Action Pill */}
      <div className="flex items-center gap-3">
        <Animate type="fade-left" delay={300} className="hidden sm:flex">
          <div
            id="apogee-right-auth-pill"
            className="h-[52px] p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] border border-white/[0.08] flex items-center gap-[5px] shadow-lg shadow-black/20"
          >
            <button
              id="apogee-nav-signin-btn"
              onClick={() => {
                if (onOpenTrial) onOpenTrial();
              }}
              className="h-[46px] px-5 flex items-center text-white hover:text-[#d4af37] transition-colors text-[13.5px] font-[450] leading-[17px] rounded-[10px] hover:bg-white/[0.05] cursor-pointer"
            >
              Member Portal
            </button>
            <button
              id="apogee-nav-trial-btn"
              onClick={() => {
                if (onOpenTrial) onOpenTrial();
              }}
              className="h-[46px] px-5 rounded-[10px] bg-white text-black hover:bg-[#d4af37] hover:text-black transition-all text-[13.5px] font-semibold leading-[17px] flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Free Trial</span>
            </button>
          </div>
        </Animate>

        {/* Mobile Hamburger Toggle */}
        <Animate type="fade-left" delay={300} className="md:hidden">
          <button
            id="apogee-mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] border border-white/[0.08] text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </Animate>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      {mobileMenuOpen && (
        <div
          id="apogee-mobile-menu-overlay"
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-[24px] pt-24 px-6 flex flex-col justify-between pb-12 md:hidden"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-[20px] bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] border border-white/[0.08] space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.href)}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-neutral-200 hover:text-white hover:bg-white/5 transition-colors font-medium text-base cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTrial) onOpenTrial();
              }}
              className="w-full py-4 rounded-[12px] bg-[#d4af37] text-black font-bold uppercase tracking-wider text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Book VIP Trial Pass</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-[12px] bg-white/10 text-white font-medium text-sm text-center border border-white/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export const RevenueCard: React.FC = () => {
  const maxHeight = Math.max(...BAR_HEIGHTS);

  return (
    <div
      id="apogee-revenue-stat-card"
      className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.08] p-5 sm:p-8 pb-5 sm:pb-6 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle top-light gradient reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Header Metric */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
        <div>
          <div className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-2 sm:mb-3 flex items-center gap-2">
            <span>Peak Power & Facility Output</span>
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1 text-white font-light">
            <span className="text-[28px] sm:text-[40px] font-semibold tracking-tight text-white">
              99.4%
            </span>
            <span className="text-[16px] sm:text-[20px] text-white/50 font-mono">
              / 100
            </span>
          </div>
        </div>

        {/* Delta row */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="px-[6px] py-[3px] bg-white/20 rounded-[6px] text-[#d4af37] text-[12px] sm:text-[14px] font-[450] leading-[14px] border border-[#d4af37]/30">
            +32.4%
          </span>
          <span className="text-[#a0a0a0] text-[12px] sm:text-[14px] font-[450] leading-[14px]">
            biometric progress index
          </span>
        </div>
      </div>

      {/* Chart visualization */}
      <div className="relative pt-6 pb-2">
        {/* Horizontal gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="border-b border-white w-full" />
          <div className="border-b border-white w-full" />
          <div className="border-b border-white w-full" />
          <div className="border-b border-white w-full" />
        </div>

        {/* Bars Container */}
        <div className="h-[90px] sm:h-[130px] flex items-end justify-between gap-[2px] sm:gap-[3px] relative z-10">
          {BAR_HEIGHTS.map((height, i) => {
            const isProjected = i >= 28;
            const percentage = (height / maxHeight) * 100;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center h-full justify-end group/bar relative"
              >
                <div
                  className={`w-full rounded-t-[2px] sm:rounded-t-[3px] transition-all duration-300 ${
                    isProjected
                      ? 'bg-white/10 hover:bg-white/20'
                      : i % 4 === 0
                      ? 'bg-gradient-to-t from-[#d4af37] to-[#f3e5ab] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                      : 'bg-white hover:bg-[#d4af37]'
                  }`}
                  style={{
                    height: `${percentage}%`,
                    animation: `bar-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                    animationDelay: `${1100 + i * 30}ms`,
                    transformOrigin: 'bottom',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Time axis */}
        <div className="flex justify-between items-center text-[10px] sm:text-[12px] font-mono text-neutral-400 mt-3 pt-2 border-t border-white/[0.08]">
          <span className="opacity-100">06:00 AM</span>
          <span className="opacity-100">10:00 AM</span>
          <span className="opacity-100">02:00 PM</span>
          <span className="opacity-60">06:00 PM</span>
          <span className="opacity-40">10:00 PM</span>
        </div>
      </div>
    </div>
  );
};

interface HeroProps {
  videoUrl?: string;
  onOpenTrial?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  videoUrl = 'https://res.cloudinary.com/afyzzxnp/video/upload/v1787377946/Walkthrough_of_modern_gym_202608221050_mxhqcn.mp4',
  onOpenTrial,
  onNavigateSection,
}) => {
  return (
    <section className="relative min-h-screen w-full bg-[#0a0707] overflow-hidden flex flex-col justify-between selection:bg-[#d4af37] selection:text-black font-['Suisse_Intl',sans-serif]">
      {/* Background Video Walkthrough with Glass Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-90 contrast-105"
        >
          <source src={videoUrl} type="video/mp4" />
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette and Darkened Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/70 to-transparent" />
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Navbar */}
      <Nav onOpenTrial={onOpenTrial} onNavigateSection={onNavigateSection} />

      {/* Main Left-Aligned Hero Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 my-auto text-left">
        <div className="max-w-3xl">
          {/* Dubai Location Pill */}
          <Animate type="fade-up" delay={300}>
            <div
              id="apogee-hero-location-pill"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,7,7,0.55)] backdrop-blur-[14px] border border-[#d4af37]/35 text-[#d4af37] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-6 sm:mb-8 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span>Dubai Marina & Downtown Luxury Flagship</span>
            </div>
          </Animate>

          {/* Master Headline */}
          <Animate type="fade-up" delay={450}>
            <h1
              id="apogee-hero-headline"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] drop-shadow-md mb-5 sm:mb-6"
            >
              Unleash Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                True Power & Strength
              </span>
            </h1>
          </Animate>

          {/* Subhead */}
          <Animate type="fade-up" delay={600}>
            <p
              id="apogee-hero-subhead"
              className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl"
            >
              Dubai's premier high-performance fitness sanctuary. Bespoke personal
              coaching, world-class biomechanical equipment, and elite recovery.
            </p>
          </Animate>

          {/* CTA Button Array */}
          <Animate type="fade-up" delay={750}>
            <div
              id="apogee-hero-cta-container"
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 mb-8"
            >
              <button
                id="apogee-hero-primary-trial-cta"
                onClick={() => {
                  if (onOpenTrial) onOpenTrial();
                }}
                className="px-8 sm:px-9 py-4 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Book VIP Free Trial</span>
              </button>

              <button
                id="apogee-hero-secondary-explore-cta"
                onClick={() => {
                  const el = document.getElementById('programs-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onNavigateSection) onNavigateSection('programs-section');
                }}
                className="px-8 sm:px-9 py-4 rounded-full bg-[rgba(10,7,7,0.55)] hover:bg-[rgba(255,255,255,0.08)] border border-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-[17px] flex items-center justify-center gap-2 cursor-pointer hover:border-[#d4af37]/60"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </Animate>
        </div>
      </main>

      {/* Footer Floating Scroller */}
      <footer className="relative z-10 w-full pb-6 flex items-center justify-center">
        <button
          onClick={() => {
            const el = document.getElementById('manifesto-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-widest"
        >
          <span>Scroll to explore sanctuary</span>
          <ChevronDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
        </button>
      </footer>
    </section>
  );
};

export default Hero;
