import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calculator,
  Flame,
  Activity,
  Sparkles,
  ChevronRight,
  Dumbbell,
  Calendar,
  Scale,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { GenderType, UnitSystem, ActivityLevel } from '../../types';

interface BmiCalculatorSectionProps {
  onOpenTrial: (goalWithBmiStats?: string) => void;
}

export const BmiCalculatorSection: React.FC<BmiCalculatorSectionProps> = ({ onOpenTrial }) => {
  const { language, isRTL } = useLanguage();

  // Calculator Form State
  const [gender, setGender] = useState<GenderType>('male');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [age, setAge] = useState<number>(28);

  // Metric values
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(78);

  // Imperial values
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(172);

  // Activity level
  const [activity, setActivity] = useState<ActivityLevel>('moderate');

  // Sync unit conversion when switching unit system
  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    if (newSystem === unitSystem) return;

    if (newSystem === 'imperial') {
      // Convert cm -> feet & inches
      const totalInches = heightCm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFeet(feet || 5);
      setHeightInches(inches || 10);

      // Convert kg -> lbs
      const lbs = Math.round(weightKg * 2.20462);
      setWeightLbs(lbs);
    } else {
      // Convert feet + inches -> cm
      const totalInches = heightFeet * 12 + heightInches;
      const cm = Math.round(totalInches * 2.54);
      setHeightCm(cm);

      // Convert lbs -> kg
      const kg = Math.round(weightLbs / 2.20462);
      setWeightKg(kg);
    }

    setUnitSystem(newSystem);
  };

  // Perform calculations in standardized metric units
  const effectiveHeightCm = useMemo(() => {
    if (unitSystem === 'metric') return heightCm;
    return Math.round((heightFeet * 12 + heightInches) * 2.54);
  }, [unitSystem, heightCm, heightFeet, heightInches]);

  const effectiveWeightKg = useMemo(() => {
    if (unitSystem === 'metric') return weightKg;
    return Math.round((weightLbs / 2.20462) * 10) / 10;
  }, [unitSystem, weightKg, weightLbs]);

  // Scientific Biometric Calculations
  const calculations = useMemo(() => {
    const heightM = effectiveHeightCm / 100;
    if (heightM <= 0 || effectiveWeightKg <= 0) {
      return null;
    }

    // BMI = weight (kg) / (height (m))^2
    const bmi = Math.round((effectiveWeightKg / (heightM * heightM)) * 10) / 10;

    // BMI Category classification
    let category: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
    let categoryLabelEn = 'Normal & Optimal';
    let categoryLabelAr = 'وزن مثالي وطبيعي';
    let categoryColor = 'text-[#d4af37]';
    let categoryBg = 'bg-[#d4af37]/15 border-[#d4af37]/40';
    let progressPercent = 50;

    if (bmi < 18.5) {
      category = 'underweight';
      categoryLabelEn = 'Underweight';
      categoryLabelAr = 'نقص في الوزن';
      categoryColor = 'text-sky-300';
      categoryBg = 'bg-sky-500/15 border-sky-500/30';
      progressPercent = Math.max(8, (bmi / 18.5) * 25);
    } else if (bmi <= 24.9) {
      category = 'normal';
      categoryLabelEn = 'Normal & Lean';
      categoryLabelAr = 'وزن مثالي متناسق';
      categoryColor = 'text-[#d4af37]';
      categoryBg = 'bg-[#d4af37]/15 border-[#d4af37]/40';
      progressPercent = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
    } else if (bmi <= 29.9) {
      category = 'overweight';
      categoryLabelEn = 'Overweight / Muscle Density';
      categoryLabelAr = 'زيادة وزن / كتلة عضلية';
      categoryColor = 'text-amber-400';
      categoryBg = 'bg-amber-500/15 border-amber-500/30';
      progressPercent = 50 + ((bmi - 25.0) / (29.9 - 25.0)) * 25;
    } else {
      category = 'obese';
      categoryLabelEn = 'High Adipose Tier';
      categoryLabelAr = 'سمنة';
      categoryColor = 'text-rose-400';
      categoryBg = 'bg-rose-500/15 border-rose-500/30';
      progressPercent = Math.min(96, 75 + ((bmi - 30.0) / 10) * 25);
    }

    // Adult Body Fat % estimation (Deurenberg formula):
    // BF% = (1.20 × BMI) + (0.23 × Age) - (10.8 × sex) - 5.4
    // sex = 1 for male, 0 for female
    const sexConstant = gender === 'male' ? 1 : 0;
    const rawBodyFat = 1.2 * bmi + 0.23 * age - 10.8 * sexConstant - 5.4;
    const bodyFatPercent = Math.max(5, Math.min(50, Math.round(rawBodyFat * 10) / 10));

    // Ideal Weight Range for BMI 18.5 - 24.9
    const minIdealKg = Math.round(18.5 * heightM * heightM);
    const maxIdealKg = Math.round(24.9 * heightM * heightM);

    const idealWeightMin = unitSystem === 'metric' ? minIdealKg : Math.round(minIdealKg * 2.20462);
    const idealWeightMax = unitSystem === 'metric' ? maxIdealKg : Math.round(maxIdealKg * 2.20462);
    const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';

    // BMR (Basal Metabolic Rate) via Mifflin-St Jeor:
    // Men: 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
    // Women: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
    const baseBmr =
      gender === 'male'
        ? 10 * effectiveWeightKg + 6.25 * effectiveHeightCm - 5 * age + 5
        : 10 * effectiveWeightKg + 6.25 * effectiveHeightCm - 5 * age - 161;
    const bmr = Math.round(baseBmr);

    // TDEE Activity Multipliers
    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      moderate: 1.45,
      active: 1.65,
      athlete: 1.85,
    };
    const tdee = Math.round(bmr * activityMultipliers[activity]);

    // Caloric Targets
    const maintenanceCalories = tdee;
    const fatLossCalories = Math.max(1200, tdee - 450);
    const muscleGainCalories = tdee + 350;

    // Macro suggestions (g)
    const proteinGrams = Math.round(effectiveWeightKg * (gender === 'male' ? 2.0 : 1.8));
    const fatGrams = Math.round((tdee * 0.25) / 9);
    const carbGrams = Math.round((tdee - (proteinGrams * 4 + fatGrams * 9)) / 4);

    // Recommended Gym Program
    let programRecommendationEn = 'Hypertrophy & Physique Architecture';
    let programRecommendationAr = 'بناء العضلات وإعادة تشكيل القوام';
    let adviceEn =
      'Focus on progressive hypertrophy overload with a calibrated caloric surplus to build dense muscle mass while optimizing metabolic biomarkers.';
    let adviceAr =
      'ركز على تمارين التضخيم العضلي التدريجي مع فائض طفيف في السعرات لبناء كتلة عضلية نقية مع تحسين كفاءة الحرق.';

    if (bmi >= 25) {
      programRecommendationEn = 'High-Output Functional Athletics & Tactical Boxing';
      programRecommendationAr = 'اللياقة الحركية المتفجرة والملاكمة التكتيكية';
      adviceEn =
        'Prioritize high metabolic demand circuits, boxing intervals, and a 450 kcal deficit to rapidly trim adipose tissue while sparing lean muscle mass.';
      adviceAr =
        'ركز على الحصص الأيضية عالية الكثافة، والملاكمة، مع عجز معتدل ٤٥٠ سعرة حرارية لحرق الدهون وحماية البنية العضلية.';
    } else if (bmi < 18.5) {
      programRecommendationEn = 'Olympic Strength & Barbell Kinematics';
      programRecommendationAr = 'القوة والرفع الأولمبي للبار';
      adviceEn =
        'Target maximal central nervous system motor unit recruitment with compound barbell lifts and an energy-dense nutrition protocol.';
      adviceAr =
        'استهدف تعزيز القوة العصبية العضلية عبر الرفعات الأولمبية مع جدول غذائي غني بالطاقة لزيادة الكتلة الصافية.';
    }

    return {
      bmi,
      category,
      categoryLabel: language === 'ar' ? categoryLabelAr : categoryLabelEn,
      categoryColor,
      categoryBg,
      progressPercent,
      bodyFatPercent,
      idealWeightMin,
      idealWeightMax,
      weightUnit,
      bmr,
      tdee,
      maintenanceCalories,
      fatLossCalories,
      muscleGainCalories,
      proteinGrams,
      fatGrams,
      carbGrams,
      programRecommendation:
        language === 'ar' ? programRecommendationAr : programRecommendationEn,
      advice: language === 'ar' ? adviceAr : adviceEn,
    };
  }, [gender, unitSystem, age, effectiveHeightCm, effectiveWeightKg, activity, language]);

  const t = {
    eyebrow: language === 'ar' ? 'التحليل البيومتري الدقيق' : 'PRECISION BIOMETRICS',
    heading:
      language === 'ar'
        ? 'حاسبة مؤشر كتلة الجسم وتكوين الأنسجة'
        : 'Scientific BMI & Body Composition Engine',
    subheading:
      language === 'ar'
        ? 'احسب مؤشر كتلة الجسم (BMI)، ونسبة الدهون الحيوية المقدرة، ومعدل الأيض الأساسي (BMR)، والاحتياج اليومي من السعرات بدقة للرجال والنساء.'
        : 'Calculate your BMI, biological body fat %, basal metabolic burn rate (BMR), and custom caloric blueprint tailored for men and women.',
    genderLabel: language === 'ar' ? 'النوع البيولوجي' : 'Biological Sex',
    maleBtn: language === 'ar' ? 'رجال' : 'Men',
    femaleBtn: language === 'ar' ? 'نساء' : 'Women',
    unitsLabel: language === 'ar' ? 'نظام القياس' : 'Measurement Unit',
    metricBtn: language === 'ar' ? 'متري (كجم / سم)' : 'Metric (kg / cm)',
    imperialBtn: language === 'ar' ? 'إمبريالي (باوند / قدم)' : 'Imperial (lbs / ft-in)',
    ageLabel: language === 'ar' ? 'العمر' : 'Age',
    weightLabel: language === 'ar' ? 'الوزن' : 'Weight',
    heightLabel: language === 'ar' ? 'الطول' : 'Height',
    feetLabel: language === 'ar' ? 'قدم' : 'Feet',
    inchesLabel: language === 'ar' ? 'بوصة' : 'Inches',
    activityLabel: language === 'ar' ? 'النشاط الرياضي الأسبوعي' : 'Weekly Activity Level',
    activitySedentary: language === 'ar' ? 'مكتبي / قليل الحركة (١-٢ يوم)' : 'Sedentary / Desk-Bound (1-2 days/wk)',
    activityModerate: language === 'ar' ? 'نشاط متوسط (٣-٤ أيام)' : 'Moderately Active (3-4 days/wk)',
    activityActive: language === 'ar' ? 'تمارين شاقة (٥-٦ أيام)' : 'High Intensity Training (5-6 days/wk)',
    activityAthlete: language === 'ar' ? 'رياضي محترف / يومي' : 'Elite Athlete / Daily Double (7+ days/wk)',
    scoreTitle: language === 'ar' ? 'مؤشر كتلة جسمك' : 'Your Calculated BMI',
    bodyFatTitle: language === 'ar' ? 'نسبة الدهون المقدرة' : 'Est. Body Fat',
    idealRangeTitle: language === 'ar' ? 'الوزن المثالي الموصى به' : 'Ideal Weight Range',
    bmrTitle: language === 'ar' ? 'الحرق الأساسي (BMR)' : 'Basal Metabolic Rate',
    tdeeTitle: language === 'ar' ? 'استهلاك الطاقة اليومي (TDEE)' : 'Total Daily Burn (TDEE)',
    targetsTitle: language === 'ar' ? 'أهداف السعرات الحرارية اليومية' : 'Daily Caloric Blueprint',
    maintenanceLabel: language === 'ar' ? 'تثبيت الوزن' : 'Maintenance',
    fatLossLabel: language === 'ar' ? 'خسارة دهون' : 'Fat Loss Deficit',
    muscleGainLabel: language === 'ar' ? 'بناء عضلات' : 'Muscle Growth',
    programMatchTitle: language === 'ar' ? 'البرنامج الرياضي الموصى به' : 'Recommended Training Pathway',
    macrosTitle: language === 'ar' ? 'توزيع المغذيات الكبرى الموصى به' : 'Daily Macro Targets',
    proteinLabel: language === 'ar' ? 'بروتين' : 'Protein',
    carbsLabel: language === 'ar' ? 'كاربوهيدرات' : 'Carbs',
    fatsLabel: language === 'ar' ? 'دهون صحية' : 'Healthy Fats',
    bookTrialWithGoalBtn:
      language === 'ar'
        ? 'احجز تجربة VIP مجانية بناءً على هذه النتائج'
        : 'BOOK VIP TRIAL FOR THIS BIOMETRIC PROFILE',
    disclaimer:
      language === 'ar'
        ? 'ملاحظة: هذه الحاسبة تقدم مؤشرات استرشادية علمية. يتضمن تصريح الدخول المجاني فحص InBody 770 الطبي المعتمد في المنشأة.'
        : 'Note: BMI & Deurenberg body fat formulas provide clinical estimates. Your VIP Free Trial includes a medical-grade InBody 770 segmental scan on-site.',
  };

  const handleBookWithProfile = () => {
    if (!calculations) {
      onOpenTrial();
      return;
    }
    const goalString = `BMI: ${calculations.bmi} (${calculations.categoryLabel}) | Target: ${calculations.programRecommendation}`;
    onOpenTrial(goalString);
  };

  return (
    <section
      id="bmi-calculator"
      className="relative py-24 sm:py-32 bg-[#0c0c10] text-[#f4f4f6] overflow-hidden border-t border-[#181822]"
    >
      {/* Background Gold Ambient Gradients */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[300px] bg-[#d4af37]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37] uppercase block mb-3">
            {t.eyebrow}
          </span>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 ${
              language === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {t.heading}
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Main 2-Column Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 bg-[#111116] border border-[#22222e] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* 1. Biological Sex / Gender Toggle (Men / Women) */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                {t.genderLabel}
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#09090b] rounded-2xl border border-[#1f1f2c]">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">👨</span>
                  <span>{t.maleBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-black'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">👩</span>
                  <span>{t.femaleBtn}</span>
                </button>
              </div>
            </div>

            {/* 2. Unit System Toggle (Metric vs Imperial) */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                {t.unitsLabel}
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#09090b] rounded-2xl border border-[#1f1f2c]">
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange('metric')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    unitSystem === 'metric'
                      ? 'bg-[#181822] text-[#d4af37] border border-[#d4af37]/40 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t.metricBtn}
                </button>

                <button
                  type="button"
                  onClick={() => handleUnitSystemChange('imperial')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    unitSystem === 'imperial'
                      ? 'bg-[#181822] text-[#d4af37] border border-[#d4af37]/40 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t.imperialBtn}
                </button>
              </div>
            </div>

            {/* 3. Age Input Slider & Box */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {t.ageLabel}
                </label>
                <span className="text-sm font-black text-white bg-[#181822] px-3 py-1 rounded-lg border border-[#2a2a3c]">
                  {age} <span className="text-xs text-neutral-400 font-normal">yrs</span>
                </span>
              </div>
              <input
                type="range"
                min={16}
                max={85}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#1f1f2c] rounded-lg"
              />
            </div>

            {/* 4. Height Input (Metric or Imperial) */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c]">
              {unitSystem === 'metric' ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      {t.heightLabel}
                    </label>
                    <span className="text-sm font-black text-white bg-[#181822] px-3 py-1 rounded-lg border border-[#2a2a3c]">
                      {heightCm} <span className="text-xs text-neutral-400 font-normal">cm</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={130}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#1f1f2c] rounded-lg"
                  />
                </>
              ) : (
                <>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    {t.heightLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                        <span>{t.feetLabel}</span>
                        <span className="font-bold text-white">{heightFeet} ft</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={7}
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#1f1f2c] rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                        <span>{t.inchesLabel}</span>
                        <span className="font-bold text-white">{heightInches} in</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={11}
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                        className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#1f1f2c] rounded-lg"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 5. Weight Input (kg or lbs) */}
            <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {t.weightLabel}
                </label>
                <span className="text-sm font-black text-white bg-[#181822] px-3 py-1 rounded-lg border border-[#2a2a3c]">
                  {unitSystem === 'metric' ? weightKg : weightLbs}{' '}
                  <span className="text-xs text-neutral-400 font-normal">
                    {unitSystem === 'metric' ? 'kg' : 'lbs'}
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={unitSystem === 'metric' ? 40 : 90}
                max={unitSystem === 'metric' ? 180 : 400}
                value={unitSystem === 'metric' ? weightKg : weightLbs}
                onChange={(e) =>
                  unitSystem === 'metric'
                    ? setWeightKg(Number(e.target.value))
                    : setWeightLbs(Number(e.target.value))
                }
                className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#1f1f2c] rounded-lg"
              />
            </div>

            {/* 6. Activity Level Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                {t.activityLabel}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className="w-full bg-[#09090b] border border-[#22222e] text-white rounded-xl py-3 px-3.5 text-xs font-semibold focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="sedentary">{t.activitySedentary}</option>
                <option value="moderate">{t.activityModerate}</option>
                <option value="active">{t.activityActive}</option>
                <option value="athlete">{t.activityAthlete}</option>
              </select>
            </div>
          </motion.div>

          {/* Right Column: Live Results & Biometric Analytics (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-[#111116] border border-[#22222e] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between"
          >
            {calculations && (
              <>
                {/* BMI Score Hero Card with Gauge */}
                <div className="bg-[#09090b] p-6 rounded-2xl border border-[#1f1f2c] relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        {t.scoreTitle}
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                          {calculations.bmi}
                        </span>
                        <span
                          className={`text-xs font-extrabold px-3 py-1 rounded-full border ${calculations.categoryBg} ${calculations.categoryColor}`}
                        >
                          {calculations.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 text-right">
                      <div className="text-xs text-neutral-400">
                        {t.bodyFatTitle}:{' '}
                        <strong className="text-white text-sm font-bold">
                          ~{calculations.bodyFatPercent}%
                        </strong>
                      </div>
                      <div className="text-xs text-neutral-400">
                        {t.idealRangeTitle}:{' '}
                        <strong className="text-[#d4af37] text-sm font-bold">
                          {calculations.idealWeightMin} - {calculations.idealWeightMax}{' '}
                          {calculations.weightUnit}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Animated Visual Gauge */}
                  <div className="mt-6">
                    <div className="relative h-3 w-full rounded-full bg-[#181824] overflow-hidden flex">
                      <div className="w-1/4 h-full bg-sky-400/80" title="Underweight (<18.5)" />
                      <div className="w-1/4 h-full bg-[#d4af37]" title="Normal & Optimal (18.5 - 24.9)" />
                      <div className="w-1/4 h-full bg-amber-400" title="Overweight (25 - 29.9)" />
                      <div className="w-1/4 h-full bg-rose-500" title="Obese (30+)" />
                    </div>

                    {/* Indicator pin */}
                    <div
                      className="relative w-full h-4 mt-1"
                      style={{
                        paddingLeft: `${Math.min(95, Math.max(3, calculations.progressPercent))}%`,
                      }}
                    >
                      <div className="w-3 h-3 -ml-1.5 bg-white border-2 border-[#d4af37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </div>

                    {/* Scale legend */}
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400 px-1 mt-1">
                      <span>&lt; 18.5</span>
                      <span>18.5 - 24.9</span>
                      <span>25.0 - 29.9</span>
                      <span>30.0+</span>
                    </div>
                  </div>
                </div>

                {/* Energy & Metabolism Grid (BMR, TDEE, Calorie Targets) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* BMR & TDEE */}
                  <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                      <Flame className="w-4 h-4" />
                      <span>{t.bmrTitle}</span>
                    </div>
                    <p className="text-2xl font-black text-white">
                      {calculations.bmr.toLocaleString()}{' '}
                      <span className="text-xs text-neutral-400 font-normal">kcal/day</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {t.tdeeTitle}:{' '}
                      <strong className="text-neutral-200">
                        {calculations.tdee.toLocaleString()} kcal
                      </strong>
                    </p>
                  </div>

                  {/* Calorie Blueprint */}
                  <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">{t.maintenanceLabel}:</span>
                      <strong className="text-white font-bold">
                        {calculations.maintenanceCalories} kcal
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#d4af37] font-medium">{t.fatLossLabel}:</span>
                      <strong className="text-[#d4af37] font-bold">
                        {calculations.fatLossCalories} kcal
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-medium">{t.muscleGainLabel}:</span>
                      <strong className="text-amber-400 font-bold">
                        {calculations.muscleGainCalories} kcal
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Macronutrient Split */}
                <div className="bg-[#09090b] p-4 rounded-2xl border border-[#1f1f2c]">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                    {t.macrosTitle}
                  </span>
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="bg-[#14141c] p-2.5 rounded-xl border border-[#22222e]">
                      <span className="text-[10px] font-mono text-neutral-400 block">{t.proteinLabel}</span>
                      <span className="text-base font-black text-[#d4af37]">
                        {calculations.proteinGrams}g
                      </span>
                    </div>
                    <div className="bg-[#14141c] p-2.5 rounded-xl border border-[#22222e]">
                      <span className="text-[10px] font-mono text-neutral-400 block">{t.carbsLabel}</span>
                      <span className="text-base font-black text-neutral-200">
                        {calculations.carbGrams}g
                      </span>
                    </div>
                    <div className="bg-[#14141c] p-2.5 rounded-xl border border-[#22222e]">
                      <span className="text-[10px] font-mono text-neutral-400 block">{t.fatsLabel}</span>
                      <span className="text-base font-black text-amber-400">
                        {calculations.fatGrams}g
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommended Training Pathway */}
                <div className="p-4 rounded-2xl bg-[#161620] border border-[#2c2c3e]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                    <Dumbbell className="w-4 h-4" />
                    <span>{t.programMatchTitle}</span>
                  </div>
                  <h4 className={`text-base font-bold text-white ${
                    language === 'ar' ? 'font-display-ar' : 'font-display-en'
                  }`}>
                    {calculations.programRecommendation}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    {calculations.advice}
                  </p>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={handleBookWithProfile}
                  className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-black font-extrabold uppercase tracking-wider py-3.5 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookTrialWithGoalBtn}</span>
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                {/* Clinical disclaimer */}
                <p className="text-[11px] text-neutral-400 text-center leading-normal">
                  {t.disclaimer}
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
