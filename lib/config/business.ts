/**
 * CENTRAL BUSINESS CONFIGURATION — NOVUS CONSTRUCTION INC.
 *
 * Separates confirmed public business information from credentials, contact details,
 * and licensing inputs awaiting owner verification.
 *
 * IMPORTANT LAUNCH RULE:
 * - Never display unverified credentials, license numbers, insurance claims, or phone numbers
 *   as verified facts on customer-facing pages.
 * - Unset fields cleanly hide their corresponding UI modules in production.
 * - Missing/pending items are tracked in `LAUNCH_CHECKLIST` for owner/developer review.
 */

export interface LicenseVerificationConfig {
  /** Raw CSLB input supplied for verification only — DO NOT publish until verified */
  rawInputNumber: string;
  /** Must be set to true ONLY after confirming active status, classification, and entity match */
  verifiedForPublish: boolean;
  /** Confirmed license classification (e.g., "B - General Building Contractor") */
  confirmedClassification: string;
  /** Confirmed license status (e.g., "Active") */
  confirmedStatus: string;
  /** Confirmed entity name on CSLB record */
  confirmedHolderName: string;
  /** True only if the license is issued directly to Novus Construction Inc. or an approved DBA */
  matchesAdvertisedBusinessName: boolean;
}

export interface ApprovedReview {
  id: string;
  authorName: string;
  projectType: string;
  city: string;
  quote: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface LaunchChecklistItem {
  id: string;
  category: 'Credentials & Legal' | 'Contact & Operations' | 'Visual Assets & Proof' | 'Technical & Delivery';
  priority: 'P0 - Blocking Launch' | 'P1 - High Impact' | 'P2 - Post-Launch Enhancement';
  title: string;
  status: 'Action Required' | 'Configured (Verify)' | 'Ready';
  ownerAction: string;
  configPath: string;
}

export const BUSINESS_CONFIG = {
  // Confirmed / Primary Identity
  businessName: 'Novus Construction Inc.',
  legalName: 'Novus Construction Inc.',
  intendedDomain: 'https://novusconstructioninc.com',
  tagline: 'Southern California General Contracting & Construction',

  // Owner & Leadership (Configurable)
  owner: {
    name: 'Brian Cervantes',
    role: 'President & Principal',
    includeInAboutCopy: true,
    ownerBioConfirmed: true,
  },

  // Contact Details (Confirmed by Owner)
  contact: {
    email: 'infocerv@novusconstructioninc.com',
    emailConfirmedForPublicDisplay: true,
    phoneDisplay: '(951) 903-0824',
    phoneE164: '+19519030824',
    phoneVerified: true,
    publicAddress: {
      streetAddress: '9730 53rd St',
      addressLocality: 'Jurupa Valley',
      addressRegion: 'CA',
      postalCode: '92509',
    },
    businessHours:
      'Monday–Friday: 8:00 AM–5:00 PM. Saturday: By appointment. Sunday: Closed.',
  },

  // Regional & Local Service Focus
  serviceArea: {
    primaryFocusLabel: 'Riverside, Jurupa Valley & the Inland Empire',
    broaderRegionLabel: 'Southern California',
    availabilityNote:
      'Primary project operations focus on Riverside, Jurupa Valley, and the surrounding Inland Empire, with broader Southern California residential and commercial projects considered based on project scope and schedule availability.',
    confirmedCities: [
      {
        name: 'Riverside',
        county: 'Riverside County',
        focusNote: 'ADUs, custom home additions, full-home remodeling, kitchen & bath upgrades, and commercial tenant improvements.',
      },
      {
        name: 'Jurupa Valley',
        county: 'Riverside County',
        focusNote: 'Detached ADUs, garage conversions, structural additions, stucco, roofing, and property improvements.',
      },
      {
        name: 'Corona',
        county: 'Riverside County',
        focusNote: 'Residential remodeling, structural framing, additions, and commercial interior build-outs.',
      },
      {
        name: 'Norco',
        county: 'Riverside County',
        focusNote: 'Large-lot detached ADUs, structural additions, framing, stucco, and exterior envelope improvements.',
      },
      {
        name: 'Eastvale',
        county: 'Riverside County',
        focusNote: 'Interior remodeling, kitchen and bathroom renovations, finish carpentry, and commercial suite build-outs.',
      },
      {
        name: 'Moreno Valley',
        county: 'Riverside County',
        focusNote: 'Residential additions, ADU construction, full-home renovations, and commercial tenant improvements.',
      },
      {
        name: 'Ontario',
        county: 'San Bernardino County',
        focusNote: 'Commercial tenant improvements, office/retail build-outs, and residential renovations.',
      },
      {
        name: 'Rancho Cucamonga',
        county: 'San Bernardino County',
        focusNote: 'Custom kitchen and bathroom remodeling, whole-home updates, additions, and commercial space improvements.',
      },
      {
        name: 'Upland',
        county: 'San Bernardino County',
        focusNote: 'Home additions, structural remodeling, custom finish carpentry, and exterior stucco/roofing.',
      },
      {
        name: 'Redlands',
        county: 'San Bernardino County',
        focusNote: 'Architectural home renovations, sensitive structural additions, and custom interior finishes.',
      },
      {
        name: 'Chino Hills',
        county: 'San Bernardino County',
        focusNote: 'Kitchen and primary bath remodels, full-home interior renovations, and custom carpentry.',
      },
      {
        name: 'Temecula',
        county: 'Riverside County',
        focusNote: 'Select larger-scope residential remodels, ADUs, and commercial tenant improvements subject to schedule.',
      },
    ],
    countiesServed: ['Riverside County', 'San Bernardino County', 'Orange County (Select Scopes)', 'Los Angeles County (Select Scopes)'],
  },

  // CSLB License Verification Gate (Verified by Owner)
  license: {
    rawInputNumber: '1133226',
    verifiedForPublish: true,
    confirmedClassification: 'General B',
    confirmedStatus: 'Active',
    confirmedHolderName: 'Brian Cervantes',
    matchesAdvertisedBusinessName: true,
  } as LicenseVerificationConfig,

  // Trust & Proof Modules
  credentials: {
    insuranceVerified: true,
    insuranceSummary: 'General liability insurance. Certificate of insurance available upon request.',
    bondingVerified: true,
    bondingSummary: 'Active contractor license bond.',
    reviewsVerified: false,
    approvedReviews: [] as ApprovedReview[],
    hasRealApprovedProjects: true,
  },

  // Social Profiles
  socialLinks: {
    instagram: 'https://www.instagram.com/novusconstructioninc?srtk=MW1odTNiZDF6eGtqaQ==',
    tiktok: 'https://www.tiktok.com/@novus.constructio?_r=1&_t=ZT-9Ak0X1B9fiv',
    facebook: 'https://www.facebook.com/profile.php?id=61581687695397&mibextid=ZbWKwL',
    houzz: '',
  },

  // Form Delivery & Analytics Configuration
  technical: {
    /**
     * Connected to Formspree webhook delivery (`webhook_crm`).
     * Uses `process.env.LEAD_WEBHOOK_URL` when set, with fallback to the configured Formspree endpoint.
     */
    leadDeliveryMode: 'webhook_crm' as 'durable_server_record' | 'webhook_crm' | 'demo_preview',
    formspreeEndpoint: 'https://formspree.io/f/xaeqrkpg',
    secureUploadConfigured: false,
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-LZCS5VH737',
  },
};

/**
 * Helper to determine if license badge can be publicly rendered
 */
export function canDisplayPublicLicense(): boolean {
  const { verifiedForPublish, matchesAdvertisedBusinessName, confirmedClassification, rawInputNumber } =
    BUSINESS_CONFIG.license;
  return Boolean(
    verifiedForPublish &&
      matchesAdvertisedBusinessName &&
      confirmedClassification.trim().length > 0 &&
      rawInputNumber.trim().length > 0
  );
}

/**
 * Helper to determine if click-to-call phone is active
 */
export function hasVerifiedPhone(): boolean {
  return Boolean(
    BUSINESS_CONFIG.contact.phoneVerified &&
      BUSINESS_CONFIG.contact.phoneDisplay.trim().length > 0 &&
      BUSINESS_CONFIG.contact.phoneE164.trim().length > 0
  );
}

/**
 * PRIORITIZED DEVELOPER & OWNER LAUNCH CHECKLIST
 */
export const LAUNCH_CHECKLIST: LaunchChecklistItem[] = [
  {
    id: 'cslb-verification',
    category: 'Credentials & Legal',
    priority: 'P0 - Blocking Launch',
    title: 'CSLB #1133226 Entity, Status & Classification',
    status: 'Ready',
    ownerAction:
      'Configured as Active General B license (#1133226) held by Brian Cervantes.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.license',
  },
  {
    id: 'phone-verification',
    category: 'Contact & Operations',
    priority: 'P0 - Blocking Launch',
    title: 'Primary Business Phone Number',
    status: 'Ready',
    ownerAction:
      'Configured as (951) 903-0824 (+19519030824). Active across header, footer, contact page, and mobile sticky Call bar.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.contact',
  },
  {
    id: 'email-routing',
    category: 'Technical & Delivery',
    priority: 'P0 - Blocking Launch',
    title: 'Formspree Lead Delivery & Public Contact Email',
    status: 'Ready',
    ownerAction:
      'Public email set to infocerv@novusconstructioninc.com. Estimate and contact forms connected to Formspree (https://formspree.io/f/xaeqrkpg) with leadDeliveryMode = "webhook_crm".',
    configPath: 'lib/config/business.ts & app/api/estimate/route.ts',
  },
  {
    id: 'ga4-analytics',
    category: 'Technical & Delivery',
    priority: 'P1 - High Impact',
    title: 'Google Analytics 4 (G-LZCS5VH737) Measurement',
    status: 'Ready',
    ownerAction:
      'GA4 tracking script installed with PII-free page_view, estimate_start, estimate_submit_success, and phone_click tracking.',
    configPath: 'components/GoogleAnalytics.tsx & lib/analytics.ts',
  },
  {
    id: 'address-hours',
    category: 'Contact & Operations',
    priority: 'P1 - High Impact',
    title: 'Public Business Address & Office Hours',
    status: 'Ready',
    ownerAction:
      'Configured as 9730 53rd St, Jurupa Valley, CA 92509 with Monday–Friday 8:00 AM–5:00 PM hours.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.contact.publicAddress',
  },
  {
    id: 'insurance-bonding',
    category: 'Credentials & Legal',
    priority: 'P1 - High Impact',
    title: 'General Liability Insurance & Contractor License Bond',
    status: 'Ready',
    ownerAction:
      'Insurance and active contractor license bond summaries enabled.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.credentials',
  },
  {
    id: 'project-photography',
    category: 'Visual Assets & Proof',
    priority: 'P1 - High Impact',
    title: 'Owner-Approved Novus Project Portfolio & Case Studies',
    status: 'Ready',
    ownerAction:
      'Configured with 6 real Novus projects (Corona Exterior Remodel, Jurupa Valley Addition, Corona Kitchen Remodel, Slice House Fountain Valley TI, Corona Bathroom Remodel, Torrance Kitchen & Structural Framing) and hasRealApprovedProjects = true.',
    configPath: 'lib/data/projects-and-faqs.ts -> PROJECT_ITEMS',
  },
  {
    id: 'verified-reviews',
    category: 'Visual Assets & Proof',
    priority: 'P2 - Post-Launch Enhancement',
    title: 'Verified Client Reviews & Attribution',
    status: 'Ready',
    ownerAction:
      'Intentionally kept false (reviewsVerified = false) for launch so review modules remain cleanly hidden until client testimonials are added.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.credentials.reviewsVerified',
  },
  {
    id: 'privacy-legal-review',
    category: 'Credentials & Legal',
    priority: 'P1 - High Impact',
    title: 'Privacy Policy Approved & Published',
    status: 'Ready',
    ownerAction:
      'Signed off and published at /privacy-policy with Formspree lead handling, GA4 measurement disclosure, and Jurupa Valley contact details.',
    configPath: 'app/privacy-policy/page.tsx',
  },
  {
    id: 'secure-plan-uploads',
    category: 'Technical & Delivery',
    priority: 'P2 - Post-Launch Enhancement',
    title: 'Direct File Uploads Disabled by Design',
    status: 'Ready',
    ownerAction:
      'Intentionally kept disabled (secureUploadConfigured = false). Architectural plans and photos are shared directly during project follow-up.',
    configPath: 'lib/config/business.ts -> BUSINESS_CONFIG.technical.secureUploadConfigured',
  },
];
