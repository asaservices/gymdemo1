import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Lightbox } from '../common/Lightbox';
import { PageId } from '../../types';

interface GalleryPreviewSectionProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPreviewSection: React.FC<GalleryPreviewSectionProps> = ({ onNavigate }) => {
  const { language, isRTL, gallery } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const previewItems = gallery.slice(0, 6);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#09090b] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
              {language === 'ar' ? 'المعرض البصري' : 'THE SANCTUARY IN FRAMES'}
            </span>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight ${
                language === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {language === 'ar' ? 'هندسة الضوء والحديد في دبي' : 'Visual Architecture of Power'}
            </h2>
          </div>

          <button
            id="view-full-gallery-btn"
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-white uppercase tracking-widest transition-colors self-start md:self-end"
          >
            <span>{language === 'ar' ? 'تصفح المعرض الكامل' : 'EXPLORE COMPLETE GALLERY'}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Editorial Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#14141c] border border-white/10 cursor-pointer h-72 sm:h-80 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-white mb-0.5">{item.title}</h4>
                <p className="text-xs text-neutral-300 line-clamp-1">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        items={previewItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : previewItems.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < previewItems.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
};
