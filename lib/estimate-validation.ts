export type ProjectContextType = 'Residential' | 'Commercial';

export type ProjectStageOption =
  | 'Exploring'
  | 'Planning'
  | 'Plans in progress'
  | 'Plans ready'
  | 'Ready to discuss construction';

export type DesiredTimeframeOption =
  | 'Flexible'
  | '1–3 months'
  | '3–6 months'
  | '6–12 months'
  | 'Later';

export type BudgetInquiryCategory =
  | 'Under $25,000'
  | '$25,000–$50,000'
  | '$50,000–$100,000'
  | '$100,000–$250,000'
  | '$250,000–$500,000'
  | '$500,000–$1 million'
  | 'Over $1 million'
  | 'Not sure yet';

export type PreferredContactMethod = 'Email' | 'Phone';

export interface EstimateFormState {
  // Step 1: Project basics
  projectType: string;
  cityOrZip: string;
  propertyContext: ProjectContextType | '';

  // Step 2: Scope and readiness
  projectDescription: string;
  approximateSize: string;
  projectStage: ProjectStageOption | '';
  desiredTimeframe: DesiredTimeframeOption | '';
  approximateBudget: BudgetInquiryCategory | '';

  // Step 3: Contact
  fullName: string;
  preferredContactMethod: PreferredContactMethod;
  email: string;
  phone: string;
  companyName: string;
  acknowledgeProjectContact: boolean;
  marketingConsent: boolean;

  // Anti-spam honeypot (must remain empty)
  websiteHoneypot: string;
}

export const INITIAL_ESTIMATE_FORM_STATE: EstimateFormState = {
  projectType: '',
  cityOrZip: '',
  propertyContext: '',
  projectDescription: '',
  approximateSize: '',
  projectStage: 'Planning',
  desiredTimeframe: 'Flexible',
  approximateBudget: 'Not sure yet',
  fullName: '',
  preferredContactMethod: 'Email',
  email: '',
  phone: '',
  companyName: '',
  acknowledgeProjectContact: false,
  marketingConsent: false,
  websiteHoneypot: '',
};

export const PROJECT_TYPE_OPTIONS = [
  { value: 'adu-construction', label: 'ADU Construction (Detached, Attached, Conversion)', inferredContext: 'Residential' as const },
  { value: 'home-additions', label: 'Home Addition / Structural Expansion', inferredContext: 'Residential' as const },
  { value: 'full-home-remodeling', label: 'Full Home Remodeling', inferredContext: 'Residential' as const },
  { value: 'kitchen-remodeling', label: 'Kitchen Remodeling', inferredContext: 'Residential' as const },
  { value: 'bathroom-remodeling', label: 'Bathroom Remodeling', inferredContext: 'Residential' as const },
  { value: 'commercial-tenant-improvements', label: 'Commercial Tenant Improvements / Build-Out', inferredContext: 'Commercial' as const },
  { value: 'framing', label: 'Structural or Interior Framing', inferredContext: null },
  { value: 'drywall', label: 'Drywall Installation & Finishing', inferredContext: null },
  { value: 'stucco', label: 'Exterior Stucco System or Repair', inferredContext: null },
  { value: 'roofing', label: 'Roofing Replacement or Tie-In', inferredContext: null },
  { value: 'finish-carpentry', label: 'Finish Carpentry, Doors & Trim', inferredContext: null },
  { value: 'other-general-contracting', label: 'Multiple Scopes / Other Construction Project', inferredContext: null },
];

export const PROJECT_STAGE_OPTIONS: ProjectStageOption[] = [
  'Exploring',
  'Planning',
  'Plans in progress',
  'Plans ready',
  'Ready to discuss construction',
];

export const DESIRED_TIMEFRAME_OPTIONS: DesiredTimeframeOption[] = [
  'Flexible',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  'Later',
];

export const BUDGET_INQUIRY_OPTIONS: BudgetInquiryCategory[] = [
  'Under $25,000',
  '$25,000–$50,000',
  '$50,000–$100,000',
  '$100,000–$250,000',
  '$250,000–$500,000',
  '$500,000–$1 million',
  'Over $1 million',
  'Not sure yet',
];

/**
 * Infers Residential or Commercial context when unambiguous from the project type.
 * Returns null for trade scopes (framing, drywall, stucco, roofing, finish carpentry)
 * where the visitor must specify whether the property is Residential or Commercial.
 */
export function inferPropertyContext(projectType: string): ProjectContextType | null {
  const found = PROJECT_TYPE_OPTIONS.find((opt) => opt.value === projectType);
  return found ? found.inferredContext : null;
}

/**
 * Resolves a query parameter `?service=...` into a valid projectType and initial context
 */
export function resolvePreselectedService(serviceParam: string | null | undefined): {
  projectType: string;
  propertyContext: ProjectContextType | '';
} {
  if (!serviceParam) {
    return { projectType: '', propertyContext: '' };
  }
  const normalized = serviceParam.trim().toLowerCase();
  const match = PROJECT_TYPE_OPTIONS.find((opt) => opt.value === normalized);
  if (!match) {
    return { projectType: '', propertyContext: '' };
  }
  return {
    projectType: match.value,
    propertyContext: match.inferredContext || '',
  };
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export type ValidationErrors = Partial<Record<keyof EstimateFormState, string>>;

export function validateStep1(state: Pick<EstimateFormState, 'projectType' | 'cityOrZip' | 'propertyContext'>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!state.projectType || !PROJECT_TYPE_OPTIONS.some((o) => o.value === state.projectType)) {
    errors.projectType = 'Please select the primary project type.';
  }

  const cityZip = (state.cityOrZip || '').trim();
  if (!cityZip || cityZip.length < 2) {
    errors.cityOrZip = 'Please enter the project city or 5-digit ZIP code.';
  } else if (cityZip.length > 100) {
    errors.cityOrZip = 'Please enter a concise city name or ZIP code (under 100 characters).';
  }

  const inferred = inferPropertyContext(state.projectType);
  const effectiveContext = state.propertyContext || inferred;
  if (!effectiveContext || (effectiveContext !== 'Residential' && effectiveContext !== 'Commercial')) {
    errors.propertyContext = 'Please select whether this project is for a residential or commercial property.';
  }

  return errors;
}

export function validateStep2(
  state: Pick<
    EstimateFormState,
    'projectDescription' | 'approximateSize' | 'projectStage' | 'desiredTimeframe' | 'approximateBudget'
  >
): ValidationErrors {
  const errors: ValidationErrors = {};

  const desc = (state.projectDescription || '').trim();
  if (!desc) {
    errors.projectDescription = 'Please share a brief description of the work you are planning.';
  } else if (desc.length < 12) {
    errors.projectDescription = 'Please include a few more details (at least 12 characters) so we can understand your scope.';
  } else if (desc.length > 3000) {
    errors.projectDescription = 'Please keep the description under 3,000 characters.';
  }

  // Note: We intentionally NEVER reject a visitor for selecting a small or uncertain budget.
  return errors;
}

export function validateStep3(
  state: Pick<
    EstimateFormState,
    'fullName' | 'preferredContactMethod' | 'email' | 'phone' | 'companyName' | 'acknowledgeProjectContact'
  >
): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = (state.fullName || '').trim();
  if (!name || name.length < 2) {
    errors.fullName = 'Please enter your name.';
  } else if (name.length > 120) {
    errors.fullName = 'Name must be under 120 characters.';
  }

  if (state.preferredContactMethod !== 'Email' && state.preferredContactMethod !== 'Phone') {
    errors.preferredContactMethod = 'Please choose your preferred contact method.';
  }

  const emailTrimmed = (state.email || '').trim();
  const phoneTrimmed = (state.phone || '').trim();

  if (state.preferredContactMethod === 'Email') {
    if (!emailTrimmed) {
      errors.email = 'Please provide your email address so we can follow up.';
    } else if (!isValidEmail(emailTrimmed)) {
      errors.email = 'Please enter a valid email address (for example, name@domain.com).';
    }
    if (phoneTrimmed && !isValidPhone(phoneTrimmed)) {
      errors.phone = 'Please enter a valid 10-digit phone number or leave this optional field blank.';
    }
  } else if (state.preferredContactMethod === 'Phone') {
    if (!phoneTrimmed) {
      errors.phone = 'Please provide your phone number so we can call you.';
    } else if (!isValidPhone(phoneTrimmed)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (emailTrimmed && !isValidEmail(emailTrimmed)) {
      errors.email = 'Please enter a valid email address or leave this optional field blank.';
    }
  }

  if (!state.acknowledgeProjectContact) {
    errors.acknowledgeProjectContact =
      'Please confirm that you are requesting contact from Novus Construction Inc. regarding this project.';
  }

  return errors;
}

export function validateFullEstimatePayload(state: EstimateFormState): {
  valid: boolean;
  errors: ValidationErrors;
  isSpamHoneypot: boolean;
} {
  if (state.websiteHoneypot && state.websiteHoneypot.trim().length > 0) {
    return {
      valid: false,
      errors: {},
      isSpamHoneypot: true,
    };
  }

  const errors: ValidationErrors = {
    ...validateStep1(state),
    ...validateStep2(state),
    ...validateStep3(state),
  };

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    isSpamHoneypot: false,
  };
}

/**
 * Generates a deterministic fingerprint for duplicate submission prevention within a time window.
 */
export function computeSubmissionFingerprint(state: EstimateFormState): string {
  const normalizedName = (state.fullName || '').trim().toLowerCase();
  const normalizedEmail = (state.email || '').trim().toLowerCase();
  const normalizedPhone = (state.phone || '').replace(/\D/g, '');
  const normalizedContact = `${normalizedEmail}|${normalizedPhone}`;
  const normalizedType = (state.projectType || '').trim().toLowerCase();
  const normalizedCity = (state.cityOrZip || '').trim().toLowerCase();
  const normalizedDesc = (state.projectDescription || '').trim().toLowerCase().slice(0, 120);

  return `${normalizedName}::${normalizedContact}::${normalizedType}::${normalizedCity}::${normalizedDesc}`;
}
