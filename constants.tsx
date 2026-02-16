
import { State, AgeGroup, Gender, SocialClass, AudienceSegment, CaseStudy, AdPlatform, ItemCategory } from './types';

export const MALAYSIAN_AUDIENCE_DATA: AudienceSegment[] = [
  {
    id: 'seg-001',
    name: 'Klang Valley Urban Foodies',
    location: [State.SELANGOR, State.KUALA_LUMPUR],
    ageGroup: AgeGroup.YOUNG_PROFESSIONAL,
    gender: Gender.ALL,
    socialClass: SocialClass.M40,
    estimatedSize: 2400000,
    waUsageIntensity: 'High',
    purchasingBehavior: ['Home delivery', 'Late-night snacks', 'Coffee culture'],
    painPoints: ['Traffic jams', 'Busy schedules', 'Price sensitivity to delivery fees'],
    preferredContent: ['Status updates with food photos', 'Exclusive promo codes', 'Quick response'],
    specialRequirements: 'Halal focus is paramount. Fast response time (< 5 mins) highly expected.',
    culturalTriggers: ['Payday weekends', 'Ramadan Buka Puasa', 'Food trends'],
    primaryLanguage: 'Manglish',
    peakActivityTime: '8 PM - 11 PM',
    topItemAffinities: [ItemCategory.FOOD_BEVERAGE, ItemCategory.FMCG]
  },
  {
    id: 'seg-002',
    name: 'Johor Bahru Cross-Border Shoppers',
    location: [State.JOHOR],
    ageGroup: AgeGroup.MID_CAREER,
    gender: Gender.FEMALE,
    socialClass: SocialClass.T20,
    estimatedSize: 850000,
    waUsageIntensity: 'Medium',
    purchasingBehavior: ['Luxury goods', 'Bulk groceries', 'Health supplements'],
    painPoints: ['Currency fluctuation', 'Product authenticity', 'Customs delays'],
    preferredContent: ['PDF catalogs', 'Bulk order lists', 'Personalized shopping assistance'],
    specialRequirements: 'Highly value personalized one-to-one communication and after-sales service.',
    culturalTriggers: ['SG Dollar strength', 'CNY Shopping', 'Long weekends'],
    primaryLanguage: 'Mandarin',
    peakActivityTime: '12 PM - 2 PM',
    topItemAffinities: [ItemCategory.FASHION, ItemCategory.HEALTH_WELLNESS]
  },
  {
    id: 'seg-003',
    name: 'Penang Tech-Savvy Gen Z',
    location: [State.PENANG],
    ageGroup: AgeGroup.GEN_Z,
    gender: Gender.ALL,
    socialClass: SocialClass.M40,
    estimatedSize: 600000,
    waUsageIntensity: 'High',
    purchasingBehavior: ['Gadgets', 'Thrift fashion', 'Concert tickets'],
    painPoints: ['Information overload', 'Slow mobile apps', 'Lack of installment options'],
    preferredContent: ['Stickers/GIFs', 'Short video demonstrations', 'WhatsApp Pay (beta) adoption'],
    specialRequirements: 'Prefer messaging over calls. Use of "Lingo" (e.g., "Bossku", "Abang Delivery") creates rapport.',
    culturalTriggers: ['Viral TikTok trends', 'Tech launches', 'Music festivals'],
    primaryLanguage: 'Mixed',
    peakActivityTime: '10 PM - 1 AM',
    topItemAffinities: [ItemCategory.ELECTRONICS, ItemCategory.FASHION]
  },
  {
    id: 'seg-004',
    name: 'East Malaysian Rural Direct-to-Consumer',
    location: [State.SABAH, State.SARAWAK],
    ageGroup: AgeGroup.ESTABLISHED,
    gender: Gender.ALL,
    socialClass: SocialClass.B40,
    estimatedSize: 3200000,
    waUsageIntensity: 'High',
    purchasingBehavior: ['Agricultural tools', 'Fast-moving consumer goods', 'Educational materials'],
    painPoints: ['High shipping costs', 'Network instability', 'Language barriers (local dialects)'],
    preferredContent: ['Voice notes', 'Local language instructions', 'Broadcast lists for community updates'],
    specialRequirements: 'Heavy reliance on voice notes due to local dialect nuances. Community-led trust is vital.',
    culturalTriggers: ['Gawai Festival', 'Kaamatan Festival', 'Harvest seasons'],
    primaryLanguage: 'Malay',
    peakActivityTime: '7 AM - 9 AM',
    topItemAffinities: [ItemCategory.FMCG, ItemCategory.AUTOMOTIVE]
  },
  {
    id: 'seg-005',
    name: 'Silver Generation Health Seekers',
    location: [State.SELANGOR, State.PERAK],
    ageGroup: AgeGroup.SILVER,
    gender: Gender.FEMALE,
    socialClass: SocialClass.M40,
    estimatedSize: 1100000,
    waUsageIntensity: 'Medium',
    purchasingBehavior: ['Traditional herbs', 'Wellness retreats', 'Religious items'],
    painPoints: ['Complex checkout processes', 'Fear of scams', 'Small fonts'],
    preferredContent: ['Simple text instructions', 'High-contrast images', 'Direct call button in WA'],
    specialRequirements: 'Need high trust cues. Avoid "Bots" - prefer human interaction. WhatsApp Status is their main feed.',
    culturalTriggers: ['Family health news', 'Religious holidays', 'Morning greetings'],
    primaryLanguage: 'Malay',
    peakActivityTime: '6 AM - 8 AM',
    topItemAffinities: [ItemCategory.HEALTH_WELLNESS, ItemCategory.FOOD_BEVERAGE]
  },
  {
    id: 'seg-006',
    name: 'Putrajaya Civil Servants',
    location: [State.PUTRAJAYA],
    ageGroup: AgeGroup.MID_CAREER,
    gender: Gender.ALL,
    socialClass: SocialClass.M40,
    estimatedSize: 450000,
    waUsageIntensity: 'High',
    purchasingBehavior: ['Office lunch catering', 'Personal insurance', 'Investment plans'],
    painPoints: ['Lack of time', 'Rigid work hours', 'Bureaucracy in private transactions'],
    preferredContent: ['Official-looking PDF brochures', 'Group order links', 'Professional tone'],
    specialRequirements: 'Respect office hours (contact after 5 PM or during lunch). High value on professional etiquette.',
    culturalTriggers: ['Government budget announcements', 'Public holiday eve', 'Annual bonus'],
    primaryLanguage: 'Malay',
    peakActivityTime: '1 PM - 2 PM',
    topItemAffinities: [ItemCategory.SERVICES, ItemCategory.FOOD_BEVERAGE]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-001',
    title: 'Dapur Mak Min (Nasi Lemak SME)',
    industry: 'Food & Beverage',
    targetAudienceId: 'seg-001',
    strategy: 'Utilized WhatsApp Business Catalog and Automated Labels to manage peak breakfast rush in Petaling Jaya. Used WhatsApp Status to showcase daily special "Lauk".',
    results: 'Increased repeat orders by 45% and reduced manual order entry time by 3 hours daily.'
  },
  {
    id: 'cs-002',
    title: 'Aura Hijab (Online Retailer)',
    industry: 'E-commerce Fashion',
    targetAudienceId: 'seg-002',
    strategy: 'Targeted JB-based customers with "WhatsApp Only" flash sales every Friday. Integrated a chatbot for initial size/color queries.',
    results: 'Achieved RM50,000 sales in a single 4-hour window with 90% attribution to WhatsApp.'
  }
];

export const AD_PLATFORMS: AdPlatform[] = [
  {
    name: 'WhatsApp Business',
    setupComplexity: 'Low',
    avgCPL: 'RM 1.50 - 5.00',
    trustFactor: 5,
    conversionSpeed: 'Fast',
    bestFor: 'Retention & Closing',
    malaysianContext: 'Deeply ingrained in daily life. Highest response rates for Malay-speaking market.'
  },
  {
    name: 'Facebook / IG Ads',
    setupComplexity: 'High',
    avgCPL: 'RM 3.00 - 15.00',
    trustFactor: 3,
    conversionSpeed: 'Medium',
    bestFor: 'Top-of-Funnel Reach',
    malaysianContext: 'Essential for T20/M40 urban segments. High competition in Klang Valley.'
  },
  {
    name: 'TikTok Shop / Ads',
    setupComplexity: 'Medium',
    avgCPL: 'RM 2.00 - 8.00',
    trustFactor: 4,
    conversionSpeed: 'Fast',
    bestFor: 'Impulse Purchases',
    malaysianContext: 'Booming in Gen Z and B40/M40 rural segments. Influencer led.'
  },
  {
    name: 'Shopee Ads',
    setupComplexity: 'Medium',
    avgCPL: 'RM 0.50 - 3.00',
    trustFactor: 4,
    conversionSpeed: 'Fast',
    bestFor: 'Ready-to-Buy Users',
    malaysianContext: 'Go-to for comparison shoppers. High dependency on platform vouchers.'
  }
];
