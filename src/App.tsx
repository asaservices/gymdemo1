import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PageId } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TrialModal } from './components/common/TrialModal';
import { FloatingWhatsAppChat } from './components/common/FloatingWhatsAppChat';

// Home Page Sections
import { HeroSection } from './components/home/HeroSection';
import { ManifestoSection } from './components/home/ManifestoSection';
import { PillarsSection } from './components/home/PillarsSection';
import { ProgramsPreviewSection } from './components/home/ProgramsPreviewSection';
import { FacilityTourSection } from './components/home/FacilityTourSection';
import { PhilosophySection } from './components/home/PhilosophySection';
import { CoachesSection } from './components/home/CoachesSection';
import { BmiCalculatorSection } from './components/home/BmiCalculatorSection';
import { MembershipTeaserSection } from './components/home/MembershipTeaserSection';
import { TrialOfferSection } from './components/home/TrialOfferSection';
import { GalleryPreviewSection } from './components/home/GalleryPreviewSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { LocationSection } from './components/home/LocationSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';

// Dedicated Sub-Pages
import { AboutPage } from './components/pages/AboutPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { MembershipPage } from './components/pages/MembershipPage';
import { ContactPage } from './components/pages/ContactPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState<string | undefined>(undefined);
  const { language, isRTL } = useLanguage();

  const handleOpenTrial = (programTitle?: string) => {
    setPreselectedProgram(programTitle);
    setTrialModalOpen(true);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#09090b] text-[#f4f4f6] flex flex-col justify-between ${isRTL ? 'font-display-ar' : 'font-display-en'}`}>
      {/* JSON-LD Structured Data Schema for Local Dubai Gym */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ExerciseGym',
            name: 'GYM DEMO Dubai',
            description:
              'A bilingual premium luxury gym sanctuary in Dubai featuring Olympic strength equipment, master coaching, and restorative thermal recovery.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Downtown Dubai Boulevard',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            telephone: '+97140000000',
            priceRange: '$$$$',
            openingHours: 'Mo-Su 05:00-23:00',
          }),
        }}
      />

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenTrial={() => handleOpenTrial()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection onOpenTrial={() => handleOpenTrial()} onNavigate={handleNavigate} />
              <ManifestoSection />
              <PillarsSection />
              <ProgramsPreviewSection onNavigate={handleNavigate} onOpenTrial={() => handleOpenTrial()} />
              <FacilityTourSection onOpenTrial={() => handleOpenTrial()} />
              <PhilosophySection />
              <CoachesSection onOpenTrial={handleOpenTrial} onNavigate={handleNavigate} />
              <BmiCalculatorSection onOpenTrial={handleOpenTrial} />
              <MembershipTeaserSection onNavigate={handleNavigate} onOpenTrial={() => handleOpenTrial()} />
              <TrialOfferSection onOpenTrial={() => handleOpenTrial()} />
              <GalleryPreviewSection onNavigate={handleNavigate} />
              <TestimonialsSection />
              <FaqSection />
              <LocationSection />
              <FinalCtaSection onOpenTrial={() => handleOpenTrial()} onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage onOpenTrial={() => handleOpenTrial()} />
            </motion.div>
          )}

          {currentPage === 'programs' && (
            <motion.div
              key="programs-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgramsPage onOpenTrial={(progTitle) => handleOpenTrial(progTitle)} />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GalleryPage />
            </motion.div>
          )}

          {currentPage === 'membership' && (
            <motion.div
              key="membership-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MembershipPage onOpenTrial={() => handleOpenTrial()} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Book a Free Trial Modal */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        preselectedProgram={preselectedProgram}
      />

      {/* Floating WhatsApp Chat with GymDesk Instant Reply */}
      <FloatingWhatsAppChat
        onOpenTrial={() => handleOpenTrial()}
        onNavigate={handleNavigate}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onOpenTrial={() => handleOpenTrial()} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
