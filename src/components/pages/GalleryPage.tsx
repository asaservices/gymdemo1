import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Camera, Sparkles, MapPin, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Lightbox } from '../common/Lightbox';

export const GalleryPage: React.FC = () => {
  const { language, isRTL, gallery } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All Works' },
    { id: 'facility', label: language === 'ar' ? 'المرافق والتصميم' : 'Sanctuary Architecture' },
    { id: 'training', label: language === 'ar' ? 'التدريب والأداء' : 'Training Disciplines' },
    { id: 'equipment', label: language === 'ar' ? 'الأجهزة والمعدات' : 'Precision Equipment' },
    { id: 'coaches', label: language === 'ar' ? 'المدربون' : 'Master Coaches' },
    { id: 'lifestyle', label: language === 'ar' ? 'نمط الحياة في دبي' : 'Dubai Lifestyle' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative pt-24 pb-28 bg-[#09090b] text-[#f4f4f6] overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Liquid Glass Ambient Glows */}
      <div className="absolute top-24 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[550px] h-[550px] bg-[#d4af37]/6 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-5 shadow-lg border border-[#d4af37]/35"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'المعرض البصري التوثيقي' : 'EDITORIAL VISUAL GALLERY'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase mb-6 leading-[1.08] ${
            language === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {language === 'ar' ? (
            <>
              جماليات القوة{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                والهندسة المعمارية
              </span>
            </>
          ) : (
            <>
              The Architecture of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                Human Performance
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {language === 'ar'
            ? 'نظرة بصرية على تفاصيل النادي، والأجهزة الأولمبية، وأجنحة الاستشفاء، وأجواء التدريب الحقيقية في دبي.'
            : 'An intimate visual retrospective of our Olympic strength decks, bespoke Arsenal machinery, and restorative thermal sanctuaries in Downtown Dubai.'}
        </motion.p>

        {/* Liquid Glass Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-2 rounded-full liquid-glass border border-white/[0.1] shadow-2xl"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`gallery-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25 scale-105'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Masonry-Style Image Grid with Liquid Glass Frames */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden liquid-glass border border-white/[0.08] hover:border-[#d4af37]/60 cursor-pointer h-80 sm:h-[400px] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(212,175,55,0.15)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Indicator in Liquid Glass */}
              <div
                className={`absolute top-4 ${
                  isRTL ? 'left-4' : 'right-4'
                } p-3 rounded-full liquid-glass border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl group-hover:scale-110`}
              >
                <Maximize2 className="w-4 h-4 text-[#d4af37]" />
              </div>

              {/* Top Tag */}
              <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                <span className="px-3 py-1 rounded-full liquid-glass-pill text-[10px] font-mono text-[#d4af37] uppercase tracking-wider border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Caption Card in Liquid Glass */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="p-4 rounded-2xl liquid-glass border border-white/10 backdrop-blur-[20px] transition-all group-hover:border-[#d4af37]/40">
                  <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-light line-clamp-1">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
        }
      />
    </div>
  );
};
