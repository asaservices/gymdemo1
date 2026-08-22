import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  HelpCircle,
  Award,
  Crown,
  Key,
  Flame,
  Activity,
  Briefcase,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MembershipPageProps {
  onOpenTrial: () => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ onOpenTrial }) => {
  const { language, isRTL, memberships } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(true);

  const comparisonRows = [
    {
      feature: language === 'ar' ? 'ساعات الدخول للمنشأة' : 'Sanctuary Access Hours',
      essential: language === 'ar' ? '٠٥:٠٠ – ٢٣:٠٠ يومياً' : '05:00 – 23:00 Daily',
      performance: language === 'ar' ? 'أولوية ٢٤/٧ كاملة' : 'Priority 24/7 Access',
      elite: language === 'ar' ? 'دخول VIP غير مقيد ٢٤/٧' : 'VIP Unrestricted 24/7',
    },
    {
      feature: language === 'ar' ? 'فحص InBody 770 لتحليل القوام' : 'InBody 770 Bio-Scans',
      essential: language === 'ar' ? 'كل ٣٠ يوماً' : 'Monthly (Every 30 Days)',
      performance: language === 'ar' ? 'كل ١٤ يوماً' : 'Bi-Weekly (Every 14 Days)',
      elite: language === 'ar' ? 'غير محدود أسبوعياً' : 'Unlimited Weekly Bio-Tracking',
    },
    {
      feature: language === 'ar' ? 'مختبر الاستشفاء والحوض المثلج' : 'Thermal Recovery & Cold Plunge',
      essential: language === 'ar' ? 'الساونا الفنلندية فقط' : 'Dry Finnish Sauna Only',
      performance: language === 'ar' ? 'غير محدود (حوض 3°C + ساونا)' : 'Unlimited (3°C Plunge + IR)',
      elite: language === 'ar' ? 'جناح استشفاء خاص متكامل' : 'Private VIP Recovery Pods',
    },
    {
      feature: language === 'ar' ? 'جلسات تدريب شخصي ١:١ شهرياً' : 'Private PT Sessions Included',
      essential: language === 'ar' ? 'جلسة تقييم واحدة' : '1 Initial Assessment',
      performance: language === 'ar' ? '٤ جلسات / شهر' : '4 Sessions / Month',
      elite: language === 'ar' ? '٨ جلسات / شهر (Master Coach)' : '8 Sessions / Month (Master Coach)',
    },
    {
      feature: language === 'ar' ? 'خزانة ملابسك الدائمة الخاصة' : 'Permanent Locker & Laundry',
      essential: language === 'ar' ? 'خزانة يومية' : 'Day Use Locker',
      performance: language === 'ar' ? 'خزانة مخصصة دائمة' : 'Dedicated Locker',
      elite: language === 'ar' ? 'خزانة VIP + غسيل يومي للملابس' : 'VIP Locker Suite + Laundry Service',
    },
    {
      feature: language === 'ar' ? 'تجميد العضوية أثناء السفر' : 'Annual Travel Freeze Allowance',
      essential: language === 'ar' ? '١٤ يوماً / سنة' : '14 Days / Year',
      performance: language === 'ar' ? '٤٥ يوماً / سنة' : '45 Days / Year',
      elite: language === 'ar' ? '٦٠ يوماً / سنة (مرنة)' : '60 Days / Year (Flexible)',
    },
    {
      feature: language === 'ar' ? 'بطاقات ضيوف VIP شهرياً' : 'VIP Guest Passes',
      essential: language === 'ar' ? 'بطاقة واحدة / شهر' : '1 Pass / Month',
      performance: language === 'ar' ? '٣ بطاقات / شهر' : '3 Passes / Month',
      elite: language === 'ar' ? 'غير محدود للأصدقاء والشركاء' : 'Unlimited Guest Access',
    },
    {
      feature: language === 'ar' ? 'خدمة صف السيارات الفاخرة (فاليه)' : 'Complimentary VIP Valet',
      essential: false,
      performance: true,
      elite: true,
    },
  ];

  return (
    <div className="relative pt-24 pb-28 bg-[#09090b] text-[#f4f4f6] overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Liquid Glass Background Orbs */}
      <div className="absolute top-24 left-1/3 w-[550px] h-[550px] bg-[#d4af37]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-5 w-[600px] h-[600px] bg-[#d4af37]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-32 left-5 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 py-16 sm:py-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-bold tracking-[0.25em] uppercase mb-5 shadow-lg border border-[#d4af37]/35"
        >
          <Crown className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'عضويات النخبة في دبي' : 'MEMBERSHIP SANCTUARY'}</span>
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
              اختر مستوى{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                الارتقاء بأدائك
              </span>
            </>
          ) : (
            <>
              Invest in Pure{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceb99] to-[#c59b27]">
                Physical Excellence
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
            ? 'سعة محدودة لضمان أقصى درجات الخصوصية والتركيز. اختر الباقة التي تتناسب مع أهدافك الرياضية.'
            : 'Strictly capped capacity ensuring total privacy, pristine equipment availability, and VIP concierge treatment in Dubai.'}
        </motion.p>

        {/* Liquid Glass Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center p-1.5 rounded-full liquid-glass border border-white/[0.1] shadow-2xl"
        >
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              !isAnnual
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25 scale-105'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {language === 'ar' ? 'اشتراك شهري' : 'Monthly Flexible'}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              isAnnual
                ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25 scale-105'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'التزام سنوي (وفر ٢٠٪)' : 'Annual Sanctuary (Save 20%)'}</span>
          </button>
        </motion.div>
      </section>

      {/* 3 Pricing Cards with Liquid Glass & Liquid Gold Hierarchy */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {memberships.map((plan, idx) => {
            const price = isAnnual ? plan.annualMonthlyPriceAed : plan.monthlyPriceAed;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'liquid-glass-gold lg:-translate-y-3'
                    : 'liquid-glass hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 ${isRTL ? 'left-8' : 'right-8'}`}>
                    <span className="px-4 py-1.5 rounded-full bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-black" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-2xl sm:text-3xl font-extrabold text-white ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider liquid-glass-pill px-2.5 py-1 rounded">
                      Tier 0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="mb-6 pb-6 border-t border-b border-white/[0.08] pt-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                        AED / {language === 'ar' ? 'شهر' : 'Month'}
                      </span>
                    </div>
                    {isAnnual && (
                      <span className="text-[11px] text-neutral-400 font-mono mt-1.5 block">
                        {language === 'ar'
                          ? `إجمالي الفاتورة السنوية: ${plan.annualBilledTotalAed.toLocaleString()} درهم`
                          : `Total annual commitment: ${plan.annualBilledTotalAed.toLocaleString()} AED`}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3.5 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 mt-0.5 border border-[#d4af37]/40">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`select-tier-${plan.id}`}
                  onClick={onOpenTrial}
                  className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? 'bg-[#d4af37] hover:bg-[#e5c158] text-black shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.02]'
                      : 'liquid-glass-subtle hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'احجز تصريح تجربة VIP أولاً' : 'RESERVE VIP TRIAL PASS'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detailed Amenities Comparison Matrix in Liquid Glass */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-3 border border-[#d4af37]/30">
            <Activity className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مقارنة دقيقة وشاملة' : 'TIER DELIVERABLES MATRIX'}</span>
          </div>
          <h3 className={`text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-2 ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
            {language === 'ar' ? 'جدول مقارنة المزايا والامتيازات' : 'Privilege Comparison Matrix'}
          </h3>
          <p className="text-xs text-neutral-400 font-mono">
            {language === 'ar' ? 'تفاصيل الخدمات المشمولة في كل باقة' : 'Comprehensive breakdown of all floor, coaching & recovery perks'}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl liquid-glass border border-white/[0.1] shadow-2xl">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-[#121118]/90 backdrop-blur-md text-[#d4af37] font-mono uppercase tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="p-5 sm:p-6 text-left">{language === 'ar' ? 'الميزة / الخدمة' : 'Privilege Deliverable'}</th>
                <th className="p-5 sm:p-6 text-center">{memberships[0]?.name}</th>
                <th className="p-5 sm:p-6 text-center bg-[#d4af37]/15 text-white font-bold border-x border-[#d4af37]/30">
                  {memberships[1]?.name} (Flagship)
                </th>
                <th className="p-5 sm:p-6 text-center">{memberships[2]?.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                  <td className="p-5 sm:p-6 font-medium text-white">{row.feature}</td>

                  {/* Essential */}
                  <td className="p-5 sm:p-6 text-center text-neutral-300">
                    {typeof row.essential === 'boolean' ? (
                      row.essential ? (
                        <Check className="w-4 h-4 text-[#d4af37] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      row.essential
                    )}
                  </td>

                  {/* Performance */}
                  <td className="p-5 sm:p-6 text-center text-white font-semibold bg-[#d4af37]/5 border-x border-[#d4af37]/20">
                    {typeof row.performance === 'boolean' ? (
                      row.performance ? (
                        <Check className="w-4 h-4 text-[#d4af37] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      row.performance
                    )}
                  </td>

                  {/* Elite */}
                  <td className="p-5 sm:p-6 text-center text-[#d4af37] font-semibold">
                    {typeof row.elite === 'boolean' ? (
                      row.elite ? (
                        <Check className="w-4 h-4 text-[#d4af37] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 mx-auto" />
                      )
                    ) : (
                      row.elite
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corporate & Executive Inquiries Banner in Liquid Glass */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 rounded-3xl liquid-glass-elevated border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md liquid-glass-pill text-[#d4af37] text-[10px] font-mono uppercase tracking-widest mb-1 border border-[#d4af37]/30">
              <Briefcase className="w-3 h-3" />
              <span>{language === 'ar' ? 'حلول الشركات الفاخرة' : 'EXECUTIVE RETREATS & FAMILY OFFICES'}</span>
            </div>
            <h4 className={`text-xl sm:text-2xl font-extrabold text-white ${language === 'ar' ? 'font-display-ar' : 'font-display-en'}`}>
              {language === 'ar' ? 'عضويات الشركات والمكاتب العائلية' : 'Corporate & Executive Wellness Suites'}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl font-light">
              {language === 'ar'
                ? 'نوفر برامج لياقة مخصصة للفرق القيادية ومكاتب إدارة الثروات مع فواتير مرنة وتقارير صحية دورية.'
                : 'Bespoke corporate wellness accounts tailored for executive leadership teams, family offices, and board members across Dubai.'}
            </p>
          </div>
          <button
            onClick={onOpenTrial}
            className="px-8 py-4 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-black text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استشارة الشركات' : 'Inquire Corporate'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
