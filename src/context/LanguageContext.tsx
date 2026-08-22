import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ALL_PROGRAMS_DATA,
  CONTENT_AR,
  CONTENT_EN,
  GALLERY_ITEMS_DATA,
  MEMBERSHIP_PLANS_DATA,
  SITE_CONFIG,
} from '../data/content';
import { GalleryItem, Language, MembershipPlan, ProgramItem } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  content: typeof CONTENT_EN;
  programs: ProgramItem[];
  memberships: MembershipPlan[];
  gallery: GalleryItem[];
  siteConfig: typeof SITE_CONFIG;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gym_demo_lang', lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('gym_demo_lang') as Language | null;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      document.title = 'جيم ديمو دبي — أطلق العنان لقوتك وصلابتك في قلب دبي';
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
      document.title = 'GYM DEMO — Unleash Your True Power & Strength in Dubai';
    }
  }, [language]);

  const isRTL = language === 'ar';
  const content = language === 'ar' ? (CONTENT_AR as unknown as typeof CONTENT_EN) : CONTENT_EN;
  const programs = ALL_PROGRAMS_DATA[language];
  const memberships = MEMBERSHIP_PLANS_DATA[language];
  const gallery = GALLERY_ITEMS_DATA[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRTL,
        content,
        programs,
        memberships,
        gallery,
        siteConfig: SITE_CONFIG,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
