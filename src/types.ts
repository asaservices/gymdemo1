export type Language = 'en' | 'ar';

export type PageId = 'home' | 'about' | 'programs' | 'gallery' | 'membership' | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
  href: string;
}

export interface ProgramItem {
  id: string;
  category: 'strength' | 'conditioning' | 'personal' | 'combat' | 'recovery';
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  targetGoal: string;
  idealMember: string;
  intensityLevel: 'High' | 'Very High' | 'Custom' | 'Moderate';
  duration: string;
  keyBenefits: string[];
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
}

export interface MembershipPlan {
  id: string;
  tier: 'essential' | 'performance' | 'elite';
  name: string;
  badge?: string;
  subtitle: string;
  monthlyPriceAed: number;
  annualMonthlyPriceAed: number;
  annualBilledTotalAed: number;
  isPopular?: boolean;
  highlightBenefit: string;
  features: string[];
  facilityAccess: string;
  guestPrivileges: string;
  ptSessionsIncluded: string;
  recoveryAccess: string;
}

export interface FacilityZone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  squareFootage: string;
}

export interface GalleryItem {
  id: string;
  category: 'training' | 'facility' | 'equipment' | 'coaches' | 'lifestyle';
  title: string;
  caption: string;
  image: string;
  aspectRatio: 'wide' | 'tall' | 'square';
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  discipline: 'strength' | 'hypertrophy' | 'conditioning' | 'combat' | 'recovery';
  credentials: string[];
  experienceYears: number;
  specialties: string[];
  quote: string;
  bio: string;
  image: string;
  badge?: string;
  rating?: number;
  totalClientTransformations?: number;
}

export type GenderType = 'male' | 'female';
export type UnitSystem = 'metric' | 'imperial';
export type ActivityLevel = 'sedentary' | 'moderate' | 'active' | 'athlete';

export interface BmiAnalysis {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  categoryLabel: string;
  bodyFatPercent: number;
  idealWeightRange: { min: number; max: number; unit: string };
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  calorieTargets: {
    maintenance: number;
    fatLoss: number;
    muscleGain: number;
  };
  recommendedProgramId: string;
  recommendedProgramTitle: string;
  healthAdvice: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleOrGoal: string;
  quote: string;
  timeline: string;
  programFocus: string;
  image: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface BrandPillar {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface TrialBookingState {
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: Language;
  primaryGoal: string;
  selectedProgram: string;
  preferredTimeOfDay: string;
  notes?: string;
}

export type GymDeskActionType =
  | 'open_trial'
  | 'navigate_membership'
  | 'navigate_programs'
  | 'navigate_contact'
  | 'navigate_about'
  | 'open_whatsapp'
  | 'call_gym';

export interface GymDeskActionCard {
  title: string;
  description?: string;
  ctaText: string;
  ctaAction: GymDeskActionType;
  ctaPayload?: string;
  iconType?: 'trial' | 'membership' | 'program' | 'phone' | 'whatsapp' | 'info';
}

export interface GymDeskQuickPrompt {
  id: string;
  label: string;
  query: string;
  icon?: string;
}

export interface GymDeskChatMessage {
  id: string;
  sender: 'user' | 'gymdesk';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  actionCards?: GymDeskActionCard[];
  suggestedPrompts?: GymDeskQuickPrompt[];
}
