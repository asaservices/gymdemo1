import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Calendar, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TrialBookingState } from '../../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, preselectedProgram }) => {
  const { language, isRTL, programs, siteConfig } = useLanguage();

  const [formState, setFormState] = useState<TrialBookingState>({
    fullName: '',
    email: '',
    phone: '',
    preferredLanguage: language,
    primaryGoal: 'Strength & Muscle Density',
    selectedProgram: preselectedProgram || (programs[0]?.title ?? 'Olympic Strength'),
    preferredTimeOfDay: 'Morning (07:00 - 11:00)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  const t = {
    title: language === 'ar' ? 'احجز تصريح تجربة VIP مجانية' : 'Reserve Your VIP Free Trial Pass',
    subtitle:
      language === 'ar'
        ? 'اختبر معايير الفخامة والأداء في جيم ديمو دبي. يشمل الدخول الكامل واستشارة مدتها ٤٥ دقيقة مع مدرب رئيسي.'
        : 'Experience the benchmark of Dubai luxury fitness. Includes full facility access, thermal recovery lounge, and a 45-minute Master Coach assessment.',
    fullNameLabel: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
    fullNamePlaceholder: language === 'ar' ? 'مثال: فيصل المنصوري' : 'e.g. Alexander Wright',
    emailLabel: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
    emailPlaceholder: language === 'ar' ? 'name@example.com' : 'name@example.com',
    phoneLabel: language === 'ar' ? 'رقم الهاتف (الإمارات)' : 'Phone Number (UAE / International)',
    phonePlaceholder: language === 'ar' ? '٠٥٠ ٠٠٠ ٠٠٠٠+' : '+971 50 000 0000',
    programLabel: language === 'ar' ? 'المسار التدريبي المفضل' : 'Preferred Training Discipline',
    timeSlotLabel: language === 'ar' ? 'الوقت المفضل للزيارة' : 'Preferred Time Slot',
    morning: language === 'ar' ? 'الصباح (٠٧:٠٠ – ١١:٠٠)' : 'Morning (07:00 – 11:00)',
    midday: language === 'ar' ? 'الظهيرة (١٢:٠٠ – ١٦:٠٠)' : 'Midday (12:00 – 16:00)',
    evening: language === 'ar' ? 'المساء (١٧:٠٠ – ٢١:٠٠)' : 'Evening (17:00 – 21:00)',
    notesLabel: language === 'ar' ? 'أهدافك الرياضية أو متطلبات خاصة (اختياري)' : 'Specific Goals or Health Notes (Optional)',
    submitBtn: language === 'ar' ? 'تأكيد حجز التجربة المجانية' : 'CONFIRM VIP PASS RESERVATION',
    submitting: language === 'ar' ? 'جاري تجهيز التصريح...' : 'Securing Pass...',
    successTitle: language === 'ar' ? 'تم تأكيد حجز التجربة بنجاح' : 'VIP Day Pass Reserved',
    successMsg:
      language === 'ar'
        ? 'تم تسجيل طلبك في نظام الكونسيرج بنجاح. سيتواصل معك فريق الاستقبال لتأكيد موعد وصولك وتجهيز خزانة ملابسك الخاصة.'
        : 'Your priority reservation has been recorded in the VIP concierge queue. Our concierge team will contact you to coordinate your arrival and prepare your private locker.',
    whatsappCta: language === 'ar' ? 'تأكيد فوري عبر واتساب' : 'Direct WhatsApp Confirmation',
    doneBtn: language === 'ar' ? 'إغلاق النافذة' : 'Close Window',
    demoBadge: language === 'ar' ? 'تصريح دخول VIP تجريبي' : 'COMPLIMENTARY VIP INVITATION',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/85 backdrop-blur-[24px]"
        />

        {/* Modal Window in Liquid Glass Elevated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl liquid-glass-elevated border border-[#d4af37]/40 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] p-6 sm:p-9 text-[#f4f4f6] z-10 my-8 overflow-hidden"
        >
          {/* Subtle gold glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Close button */}
          <button
            id="close-trial-modal-btn"
            onClick={handleReset}
            className={`absolute top-5 ${
              isRTL ? 'left-5' : 'right-5'
            } p-2.5 rounded-full text-neutral-400 hover:text-white liquid-glass border border-white/10 hover:border-white/25 transition-all cursor-pointer z-20`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-3 border border-[#d4af37]/35">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.demoBadge}</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                  {t.title}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">{t.subtitle}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                      {t.fullNameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder={t.fullNamePlaceholder}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                    {t.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl liquid-glass-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                      {t.programLabel}
                    </label>
                    <select
                      value={formState.selectedProgram}
                      onChange={(e) => setFormState({ ...formState, selectedProgram: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-sm text-white focus:outline-none cursor-pointer"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.title} className="bg-[#181822] text-white">
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                      {t.timeSlotLabel}
                    </label>
                    <select
                      value={formState.preferredTimeOfDay}
                      onChange={(e) => setFormState({ ...formState, preferredTimeOfDay: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="Morning (07:00 - 11:00)" className="bg-[#181822] text-white">
                        {t.morning}
                      </option>
                      <option value="Midday (12:00 - 16:00)" className="bg-[#181822] text-white">
                        {t.midday}
                      </option>
                      <option value="Evening (17:00 - 21:00)" className="bg-[#181822] text-white">
                        {t.evening}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#d4af37] mb-1.5 tracking-wider">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    placeholder={language === 'ar' ? 'أي ملاحظات أو أهداف معينة ترغب في مناقشتها...' : 'e.g. Interested in Olympic lifting & cold plunge recovery...'}
                    className="w-full px-4 py-2.5 rounded-xl liquid-glass-input text-sm text-white placeholder-neutral-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    id="submit-trial-booking-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.submitting}</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>{t.submitBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center mx-auto mb-5 border border-[#d4af37]/40 shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-3 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                {t.successTitle}
              </h3>
              <p className="text-neutral-300 max-w-md mx-auto text-sm leading-relaxed mb-6 font-light">
                {t.successMsg}
              </p>

              {/* Pass details summary in Liquid Glass */}
              <div className="liquid-glass border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left mb-6 space-y-2.5">
                <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-neutral-400">Guest:</span>
                  <span className="text-white font-medium">{formState.fullName}</span>
                </div>
                <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-neutral-400">Discipline:</span>
                  <span className="text-[#d4af37] font-medium">{formState.selectedProgram}</span>
                </div>
                <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-neutral-400">Time Slot:</span>
                  <span className="text-white font-medium">{formState.preferredTimeOfDay}</span>
                </div>
                <div className={`flex justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-neutral-400">Sanctuary Pass Code:</span>
                  <span className="font-mono text-xs text-[#d4af37] font-bold">DXB-SANCTUARY-2026</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <a
                  href={`https://wa.me/971500000000?text=${encodeURIComponent(
                    `Hello GYM DEMO Concierge, I have reserved my VIP Free Trial for ${formState.selectedProgram}. Name: ${formState.fullName}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.whatsappCta}</span>
                </a>
                <button
                  id="close-confirmation-modal-btn"
                  onClick={handleReset}
                  className="flex-1 py-3.5 px-4 rounded-xl liquid-glass hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors border border-white/10"
                >
                  {t.doneBtn}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
