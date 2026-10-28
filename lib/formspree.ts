import { EstimateFormState, inferPropertyContext } from '@/lib/estimate-validation';
import { BUSINESS_CONFIG } from '@/lib/config/business';

export const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaeqrkpg';

/**
 * Resolves the active Formspree / webhook endpoint.
 * Prioritizes LEAD_WEBHOOK_URL environment variable when set in AI Studio Secrets or production,
 * and falls back to the configured Formspree endpoint in BUSINESS_CONFIG.
 */
export function getActiveFormspreeEndpoint(): string {
  const envUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (envUrl && envUrl.startsWith('https://')) {
    return envUrl;
  }
  return BUSINESS_CONFIG.technical.formspreeEndpoint || DEFAULT_FORMSPREE_ENDPOINT;
}

export interface FormspreeEstimatePayload {
  _subject: string;
  _replyto?: string;
  formType: 'Estimate Request (3-Step)';
  leadId: string;
  sourceDomain: string;
  receivedAtIso: string;
  projectType: string;
  propertyContext: string;
  cityOrZip: string;
  projectDescription: string;
  approximateSize: string;
  projectStage: string;
  desiredTimeframe: string;
  approximateBudget: string;
  name: string;
  preferredContactMethod: string;
  email: string;
  phone: string;
  companyName: string;
  acknowledgeProjectContact: string;
  marketingConsent: string;
}

export interface ContactInquiryInput {
  fullName: string;
  email: string;
  phone: string;
  cityOrZip: string;
  inquiryTopic: string;
  message: string;
  acknowledgePrivacy: boolean;
  websiteHoneypot?: string;
}

export interface FormspreeContactPayload {
  _subject: string;
  _replyto: string;
  formType: 'General Contact Inquiry';
  leadId: string;
  sourceDomain: string;
  receivedAtIso: string;
  name: string;
  email: string;
  phone: string;
  cityOrZip: string;
  inquiryTopic: string;
  message: string;
  acknowledgePrivacy: string;
}

/**
 * Builds a clean, human-readable JSON payload formatted for Formspree's JSON submission API.
 * Includes standard Formspree fields (`name`, `email`, `_replyto`, `_subject`) alongside all project fields.
 */
export function buildFormspreeEstimatePayload(
  state: EstimateFormState,
  leadId: string,
  receivedAtIso: string
): FormspreeEstimatePayload {
  const inferred = inferPropertyContext(state.projectType);
  const effectiveContext = state.propertyContext || inferred || 'Residential';
  const cleanEmail = (state.email || '').trim();
  const cleanName = state.fullName.trim();
  const cleanCity = state.cityOrZip.trim();

  const payload: FormspreeEstimatePayload = {
    _subject: `New Estimate Request [${leadId}]: ${state.projectType} in ${cleanCity} (${cleanName})`,
    formType: 'Estimate Request (3-Step)',
    leadId,
    sourceDomain: BUSINESS_CONFIG.intendedDomain,
    receivedAtIso,
    projectType: state.projectType,
    propertyContext: effectiveContext,
    cityOrZip: cleanCity,
    projectDescription: state.projectDescription.trim(),
    approximateSize: (state.approximateSize || '').trim() || 'Not specified',
    projectStage: state.projectStage || 'Planning',
    desiredTimeframe: state.desiredTimeframe || 'Flexible',
    approximateBudget: state.approximateBudget || 'Not sure yet',
    name: cleanName,
    preferredContactMethod: state.preferredContactMethod,
    email: cleanEmail || 'Not provided (Phone preferred)',
    phone: (state.phone || '').trim() || 'Not provided (Email preferred)',
    companyName: (state.companyName || '').trim() || 'N/A',
    acknowledgeProjectContact: state.acknowledgeProjectContact ? 'Yes' : 'No',
    marketingConsent: state.marketingConsent ? 'Opted In' : 'Not Opted In',
  };

  if (cleanEmail) {
    payload._replyto = cleanEmail;
  }

  return payload;
}

export function buildFormspreeContactPayload(
  input: ContactInquiryInput,
  leadId: string,
  receivedAtIso: string
): FormspreeContactPayload {
  const cleanEmail = input.email.trim();
  const cleanName = input.fullName.trim();

  return {
    _subject: `New Contact Inquiry [${leadId}]: ${input.inquiryTopic} (${cleanName})`,
    _replyto: cleanEmail,
    formType: 'General Contact Inquiry',
    leadId,
    sourceDomain: BUSINESS_CONFIG.intendedDomain,
    receivedAtIso,
    name: cleanName,
    email: cleanEmail,
    phone: (input.phone || '').trim() || 'Not provided',
    cityOrZip: (input.cityOrZip || '').trim() || 'Not specified',
    inquiryTopic: input.inquiryTopic.trim(),
    message: input.message.trim(),
    acknowledgePrivacy: input.acknowledgePrivacy ? 'Yes' : 'No',
  };
}

/**
 * Submits a JSON payload to Formspree using its supported AJAX/JSON protocol (`Accept: application/json`).
 * Returns `ok: true` ONLY when Formspree responds with a 2xx status and `ok: true` body.
 */
export async function submitToFormspree(
  endpointUrl: string,
  payload: FormspreeEstimatePayload | FormspreeContactPayload,
  fetchImpl: typeof fetch = fetch
): Promise<{ ok: boolean; status: number; errorMessage?: string }> {
  if (!endpointUrl || !endpointUrl.startsWith('https://')) {
    return {
      ok: false,
      status: 500,
      errorMessage: 'Form delivery endpoint is not configured.',
    };
  }

  try {
    const response = await fetchImpl(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let responseData: { ok?: boolean; errors?: Array<{ message?: string }> } | null = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      const formspreeDetail =
        responseData?.errors?.map((e) => e.message).filter(Boolean).join(' ') ||
        `Formspree returned HTTP ${response.status}.`;
      return {
        ok: false,
        status: response.status,
        errorMessage: formspreeDetail,
      };
    }

    return {
      ok: true,
      status: response.status,
    };
  } catch {
    return {
      ok: false,
      status: 502,
      errorMessage: 'Network error while connecting to Formspree.',
    };
  }
}
