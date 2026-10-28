import { BUSINESS_CONFIG } from '@/lib/config/business';

/**
 * PRIVACY-SAFE GOOGLE ANALYTICS 4 (GA4) MEASUREMENT & EVENT HOOKS
 *
 * Supported events:
 * - page_view (handled via GoogleAnalytics route listener with send_page_view: false on init)
 * - estimate_start
 * - estimate_step_complete
 * - estimate_submit_success
 * - estimate_submit_error
 * - contact_submit_success
 * - contact_submit_error
 * - phone_click
 * - email_click
 * - service_cta_click
 * - project_view
 *
 * SECURITY & PRIVACY RULE:
 * - Never pass personal contact details (name, email, phone, project description, message) into analytics payloads.
 * - Prevent duplicate events from React Strict Mode or rapid double-clicks.
 */

export type NovusAnalyticsEventName =
  | 'estimate_start'
  | 'estimate_step_complete'
  | 'estimate_submit_success'
  | 'estimate_submit_error'
  | 'contact_submit_success'
  | 'contact_submit_error'
  | 'phone_click'
  | 'email_click'
  | 'service_cta_click'
  | 'project_view';

export interface SafeAnalyticsParams {
  service_category?: string;
  project_type?: string;
  property_context?: string;
  step_number?: number;
  page_path?: string;
  cta_location?: string;
  project_slug?: string;
  error_reason?: string;
  form_type?: 'estimate_3step' | 'contact_direct';
}

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetIdOrEventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: Array<unknown>;
  }
}

export function getGa4MeasurementId(): string {
  return (
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
    BUSINESS_CONFIG.technical.ga4MeasurementId ||
    ''
  ).trim();
}

/**
 * Pure helper (unit-tested) that builds a strictly whitelisted, PII-free GA4 event payload.
 */
export function buildSafeAnalyticsPayload(
  params: SafeAnalyticsParams,
  fallbackPath = '/'
): Record<string, string | number> {
  const allowed: Record<string, string | number | undefined> = {
    service_category: params.service_category,
    project_type: params.project_type,
    property_context: params.property_context,
    step_number: params.step_number,
    page_path: params.page_path || fallbackPath,
    cta_location: params.cta_location,
    project_slug: params.project_slug,
    error_reason: params.error_reason,
    form_type: params.form_type,
  };

  const clean: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(allowed)) {
    if (value !== undefined && value !== '') {
      clean[key] = value;
    }
  }
  return clean;
}

// Deduplication state to prevent duplicate page_view or rapid duplicate interaction events
let lastPageViewKey = '';
let lastPageViewTimestamp = 0;
const recentEventTimestamps = new Map<string, number>();
const EVENT_DEDUP_WINDOW_MS = 400;

export function trackPageView(pathname: string, serviceQueryParam?: string | null): void {
  if (typeof window === 'undefined') return;
  const measurementId = getGa4MeasurementId();
  if (!measurementId) return;

  // Only include non-PII `service` query parameter if present
  const safePath = serviceQueryParam
    ? `${pathname}?service=${encodeURIComponent(serviceQueryParam)}`
    : pathname;

  const now = Date.now();
  if (safePath === lastPageViewKey && now - lastPageViewTimestamp < 1500) {
    return;
  }
  lastPageViewKey = safePath;
  lastPageViewTimestamp = now;

  const payload = {
    page_path: safePath,
    page_title: document.title,
    send_to: measurementId,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', payload);
  }
}

export function trackNovusEvent(
  eventName: NovusAnalyticsEventName,
  params: SafeAnalyticsParams = {}
): void {
  if (typeof window === 'undefined') return;
  const measurementId = getGa4MeasurementId();
  if (!measurementId) return;

  const currentPath = window.location.pathname || '/';
  const safePayload = buildSafeAnalyticsPayload(params, currentPath);

  // Deduplicate identical event + context within 400ms
  const dedupKey = `${eventName}::${safePayload.page_path}::${safePayload.cta_location || ''}::${safePayload.step_number || ''}`;
  const now = Date.now();
  const prevTs = recentEventTimestamps.get(dedupKey);
  if (prevTs && now - prevTs < EVENT_DEDUP_WINDOW_MS) {
    return;
  }
  recentEventTimestamps.set(dedupKey, now);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, safePayload);
  }
}
