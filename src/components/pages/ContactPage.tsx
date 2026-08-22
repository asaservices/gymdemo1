import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Car,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { HIGH_RES_IMAGES } from '../../data/content';

export const ContactPage: React.FC = () => {
  const { language, siteConfig, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    languagePreference: language,
    goal: 'Strength & Hypertrophy',
    timeSlot: 'Morning (07:00 - 11:00)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const t = {
    eyebrow: language === 'ar' ? 'التواصل والكونسيرج' : 'VIP CONCIERGE & ACCESS',
    title: language === 'ar' ? 'تواصل مع كونسيرج دبي' : 'Begin Your Sanctuary Journey',
    subtitle:
      language === 'ar'
        ? 'فريق الكونسيرج متاح على مدار الساعة للإجابة على استفسارات العضوية، أو ترتيب جولة خاصة في الصالة.'
        : 'Our dedicated concierge desk is available to assist with membership admissions, private coach pairing, or scheduling a private facility walkthrough.',

    formHeading: language === 'ar' ? 'نموذج الاستفسار وحجز الزيارة' : 'Inquiry & Admissions Form',
    nameLabel: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
    namePlaceholder: language === 'ar' ? 'مثال: فيصل المنصوري' : 'e.g. Alexander Wright',
    emailLabel: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
    emailPlaceholder: language === 'ar' ? 'name@example.com' : 'name@example.com',
    phoneLabel: language === 'ar' ? 'رقم الهاتف' : 'Phone Number (UAE / Int.)',
    phonePlaceholder: language === 'ar' ? '٠٥٠ ٠٠٠ ٠٠٠٠+' : '+971 50 000 0000',
    goalLabel: language === 'ar' ? 'الهدف الرئيسي' : 'Primary Training Goal',
    timeSlotLabel: language === 'ar' ? 'الوقت المفضل للاتصال أو الزيارة' : 'Preferred Contact Time',
    morning: language === 'ar' ? 'الصباح (٠٧:٠٠ – ١١:٠٠)' : 'Morning (07:00 – 11:00)',
    midday: language === 'ar' ? 'الظهيرة (١٢:٠٠ – ١٦:٠٠)' : 'Midday (12:00 – 16:00)',
    evening: language === 'ar' ? 'المساء (١٧:٠٠ – ٢١:٠٠)' : 'Evening (17:00 – 21:00)',
    msgLabel: language === 'ar' ? 'رسالتك أو استفسارك' : 'Message or Special Inquiries',
    msgPlaceholder: language === 'ar' ? 'أود الاستفسار عن برامج التدريب الخاص...' : 'How can our concierge assist you?',
    submitBtn: language === 'ar' ? 'إرسال الاستفسار للكونسيرج' : 'TRANSMIT INQUIRY TO CONCIERGE',
    submittingBtn: language === 'ar' ? 'جاري الإرسال...' : 'Transmitting...',

    successTitle: language === 'ar' ? 'تم استلام استفسارك بنجاح' : 'Inquiry Successfully Received',
    successMsg:
      language === 'ar'
        ? 'شكراً لتواصلك. سيتواصل معك أحد أعضاء فريق الكونسيرج خلال وقت قصير لتلبية طلبك وترتيب موعد الزيارة.'
        : 'Thank you for connecting. A dedicated VIP concierge manager will contact you within moments to coordinate your inquiry.',

    whatsappDirect: language === 'ar' ? 'محادثة فورية عبر واتساب' : 'Direct WhatsApp Concierge',
  };

  return (
    <div className="relative pt-24 pb-28 bg-[#09090b] text-[#f4f4f6] overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Liquid Glass Background Glows */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-[#d4af37]/6 rounded-full blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-5 shadow-lg border border-[#d4af37]/35"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase mb-6 leading-[1.08] ${
            language === 'ar' ? 'font-display-ar' : 'font-display-en'
          }`}
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* Main Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column in Liquid Glass Elevated */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 liquid-glass-elevated rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/[0.1] relative overflow-hidden"
          >
            {/* Live Concierge Status Indicator */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
              <div>
                <h3
                  className={`text-2xl font-bold text-white mb-1 ${
                    language === 'ar' ? 'font-display-ar' : 'font-display-en'
                  }`}
                >
                  {t.formHeading}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {language === 'ar' ? 'استمارة تقديم العضويات وحجز المواعيد' : 'Private Membership Admissions & Private Walkthrough'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-subtle border border-[#d4af37]/30 text-[10px] font-mono text-[#d4af37]">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                <span>DESK ACTIVE</span>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                      {t.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white placeholder-neutral-500 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white placeholder-neutral-500 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white placeholder-neutral-500 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                      {t.goalLabel}
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="Strength & Hypertrophy" className="bg-[#181822] text-white">
                        {language === 'ar' ? 'القوة وتضخيم العضلات' : 'Strength & Hypertrophy'}
                      </option>
                      <option value="Athletic Conditioning" className="bg-[#181822] text-white">
                        {language === 'ar' ? 'اللياقة الحركية والسرعة' : 'Athletic & Speed Conditioning'}
                      </option>
                      <option value="VIP 1-on-1 Transformation" className="bg-[#181822] text-white">
                        {language === 'ar' ? 'تدريب شخصي VIP متكامل' : 'VIP 1-on-1 Transformation'}
                      </option>
                      <option value="Recovery & Longevity" className="bg-[#181822] text-white">
                        {language === 'ar' ? 'الاستشفاء والعلاج الحراري' : 'Recovery & Thermal Longevity'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Preferred Time Slots in Liquid Glass */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                    {t.timeSlotLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'Morning (07:00 - 11:00)', label: t.morning },
                      { id: 'Midday (12:00 - 16:00)', label: t.midday },
                      { id: 'Evening (17:00 - 21:00)', label: t.evening },
                    ].map((slot) => {
                      const isSelected = formData.timeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
                          className={`p-3 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
                            isSelected
                              ? 'bg-[#d4af37] text-black font-bold border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-102'
                              : 'liquid-glass-subtle text-neutral-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">
                    {t.msgLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.msgPlaceholder}
                    className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white placeholder-neutral-500 text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{submitting ? t.submittingBtn : t.submitBtn}</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center mx-auto border border-[#d4af37]/40 shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">{t.successTitle}</h4>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed font-light">
                  {t.successMsg}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full liquid-glass text-xs text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  {language === 'ar' ? 'إرسال استفسار جديد' : 'Submit Another Inquiry'}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Direct Concierge & Sanctuary Hub in Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Pods in Liquid Glass */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-xl space-y-6">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-4">
                SANCTUARY DIRECT CHANNELS
              </span>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {language === 'ar' ? 'الموقع في دبي' : 'Flagship Location'}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {language === 'ar' ? siteConfig.locationAr : siteConfig.locationEn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {language === 'ar' ? 'ساعات العمل' : 'Opening Hours'}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {language === 'ar' ? siteConfig.openingHoursAr : siteConfig.openingHoursEn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {language === 'ar' ? 'خدمة الفاليه ومواقف VIP' : 'VIP Valet & Parking'}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {language === 'ar'
                      ? 'خدمة صف سيارات مجانية ومظللة أمام المدخل الرئيسي لجميع الأعضاء والزوار.'
                      : 'Complimentary shaded valet service directly at the main sanctuary foyer.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout in Liquid Glass Gold */}
            <div className="liquid-glass-gold rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-black flex items-center justify-center mx-auto shadow-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {language === 'ar' ? 'تفضل بالمحادثة الفورية؟' : 'Prefer Immediate Concierge Access?'}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {language === 'ar'
                  ? 'تواصل مباشرة مع مدير مكتب الاستقبال للحصول على استجابة سريعة وحجز فوري.'
                  : 'Chat directly with our Dubai sanctuary manager via WhatsApp for instantaneous assistance.'}
              </p>
              <a
                href={`https://wa.me/971500000000?text=${encodeURIComponent(
                  'Hello, I would like to inquire about GYM DEMO Dubai memberships and VIP trial pass.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 hover:border-[#d4af37]"
              >
                <span>{t.whatsappDirect}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
