import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface LightboxProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const { isRTL } = useLanguage();
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') (isRTL ? onNext() : onPrev());
      if (e.key === 'ArrowRight') (isRTL ? onPrev() : onNext());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, isRTL]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-[24px] select-none p-4 sm:p-6">
        {/* Close Button in Liquid Glass */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className={`absolute top-6 ${
            isRTL ? 'left-6' : 'right-6'
          } p-3 rounded-full liquid-glass text-neutral-300 hover:text-white hover:border-[#d4af37]/60 transition-all z-20 cursor-pointer border border-white/10`}
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button in Liquid Glass */}
        <button
          id="prev-lightbox-btn"
          onClick={isRTL ? onNext : onPrev}
          className={`absolute ${
            isRTL ? 'right-6' : 'left-6'
          } top-1/2 -translate-y-1/2 p-4 rounded-full liquid-glass text-white hover:bg-[#d4af37] hover:text-black transition-all z-20 cursor-pointer border border-white/10`}
          aria-label="Previous Image"
        >
          <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
        </button>

        {/* Next Button in Liquid Glass */}
        <button
          id="next-lightbox-btn"
          onClick={isRTL ? onPrev : onNext}
          className={`absolute ${
            isRTL ? 'left-6' : 'right-6'
          } top-1/2 -translate-y-1/2 p-4 rounded-full liquid-glass text-white hover:bg-[#d4af37] hover:text-black transition-all z-20 cursor-pointer border border-white/10`}
          aria-label="Next Image"
        >
          <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
        </button>

        {/* Main Content Area */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-h-[72vh]">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[72vh] w-auto object-contain rounded-2xl"
            />
          </div>

          <div className="mt-5 text-center max-w-xl liquid-glass-elevated px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-center gap-3 text-[11px] tracking-widest text-[#d4af37] uppercase font-mono mb-1">
              <Camera className="w-3 h-3" />
              <span>{currentItem.category}</span>
              <span>•</span>
              <span>
                {currentIndex + 1} / {items.length}
              </span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">{currentItem.title}</h4>
            <p className="text-xs text-neutral-300 font-light">{currentItem.caption}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
