
export enum State {
  SELANGOR = 'Selangor',
  KUALA_LUMPUR = 'Kuala Lumpur',
  JOHOR = 'Johor',
  PENANG = 'Penang',
  SABAH = 'Sabah',
  SARAWAK = 'Sarawak',
  PERAK = 'Perak',
  KEDAH = 'Kedah',
  KELANTAN = 'Kelantan',
  TERENGGANU = 'Terengganu',
  MELAKA = 'Melaka',
  PAHANG = 'Pahang',
  NEGERI_SEMBILAN = 'Negeri Sembilan',
  PUTRAJAYA = 'Putrajaya',
  PERLIS = 'Perlis'
}

export enum AgeGroup {
  GEN_Z = '18-24',
  YOUNG_PROFESSIONAL = '25-34',
  MID_CAREER = '35-44',
  ESTABLISHED = '45-54',
  SILVER = '55+'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  ALL = 'All'
}

export enum SocialClass {
  T20 = 'T20 (High Income)',
  M40 = 'M40 (Middle Income)',
  B40 = 'B40 (Lower Income)'
}

export enum ItemCategory {
  FMCG = 'Fast Moving Consumer Goods',
  FASHION = 'Fashion & Apparel',
  ELECTRONICS = 'Electronics & Gadgets',
  HEALTH_WELLNESS = 'Health & Wellness',
  FOOD_BEVERAGE = 'Food & Beverage',
  SERVICES = 'Professional Services',
  AUTOMOTIVE = 'Automotive',
  REAL_ESTATE = 'Real Estate'
}

export interface AudienceSegment {
  id: string;
  name: string;
  location: State[];
  ageGroup: AgeGroup;
  gender: Gender;
  socialClass: SocialClass;
  estimatedSize: number;
  waUsageIntensity: 'High' | 'Medium' | 'Low' | 'Extreme';
  purchasingBehavior: string[];
  painPoints: string[];
  preferredContent: string[];
  specialRequirements: string;
  culturalTriggers: string[];
  primaryLanguage: 'Malay' | 'English' | 'Mandarin' | 'Tamil' | 'Manglish' | 'Mixed';
  peakActivityTime: string;
  topItemAffinities: ItemCategory[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  strategy: string;
  results: string;
  targetAudienceId: string;
}

export interface AdPlatform {
  name: string;
  setupComplexity: 'Low' | 'Medium' | 'High';
  avgCPL: string;
  trustFactor: number;
  conversionSpeed: 'Fast' | 'Medium' | 'Slow';
  bestFor: string;
  malaysianContext: string;
}
