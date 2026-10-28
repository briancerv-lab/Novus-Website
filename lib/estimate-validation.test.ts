import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_ESTIMATE_FORM_STATE,
  inferPropertyContext,
  resolvePreselectedService,
  validateStep1,
  validateStep2,
  validateStep3,
  validateFullEstimatePayload,
  computeSubmissionFingerprint,
} from './estimate-validation';
import {
  buildFormspreeEstimatePayload,
  buildFormspreeContactPayload,
  submitToFormspree,
} from './formspree';
import { buildSafeAnalyticsPayload } from './analytics';

test('inferPropertyContext infers Residential or Commercial for primary services and null for trade services', () => {
  assert.equal(inferPropertyContext('adu-construction'), 'Residential');
  assert.equal(inferPropertyContext('commercial-tenant-improvements'), 'Commercial');
  assert.equal(inferPropertyContext('framing'), null);
  assert.equal(inferPropertyContext('stucco'), null);
});

test('resolvePreselectedService maps valid service slugs and sets inferred context', () => {
  const commercial = resolvePreselectedService('commercial-tenant-improvements');
  assert.equal(commercial.projectType, 'commercial-tenant-improvements');
  assert.equal(commercial.propertyContext, 'Commercial');

  const trade = resolvePreselectedService('drywall');
  assert.equal(trade.projectType, 'drywall');
  assert.equal(trade.propertyContext, '');

  const invalid = resolvePreselectedService('non-existent-service');
  assert.equal(invalid.projectType, '');
  assert.equal(invalid.propertyContext, '');
});

test('validateStep1 enforces projectType, cityOrZip, and requires explicit context only when trade is ambiguous', () => {
  const emptyErrors = validateStep1({
    projectType: '',
    cityOrZip: '',
    propertyContext: '',
  });
  assert.ok(emptyErrors.projectType);
  assert.ok(emptyErrors.cityOrZip);
  assert.ok(emptyErrors.propertyContext);

  // ADU automatically infers Residential
  const aduStep1 = validateStep1({
    projectType: 'adu-construction',
    cityOrZip: 'Riverside, CA',
    propertyContext: '',
  });
  assert.equal(Object.keys(aduStep1).length, 0);

  // Framing requires explicit Residential or Commercial context
  const framingMissingContext = validateStep1({
    projectType: 'framing',
    cityOrZip: '92509',
    propertyContext: '',
  });
  assert.ok(framingMissingContext.propertyContext);

  const framingWithContext = validateStep1({
    projectType: 'framing',
    cityOrZip: '92509',
    propertyContext: 'Commercial',
  });
  assert.equal(Object.keys(framingWithContext).length, 0);
});

test('validateStep2 requires meaningful project description and never rejects small or uncertain budgets', () => {
  const tooShort = validateStep2({
    projectDescription: 'Kitchen',
    approximateSize: '',
    projectStage: 'Exploring',
    desiredTimeframe: 'Flexible',
    approximateBudget: 'Under $25,000',
  });
  assert.ok(tooShort.projectDescription);

  const smallBudgetValid = validateStep2({
    projectDescription: 'Looking to remodel our guest bathroom tub and tile in Jurupa Valley.',
    approximateSize: '65 sq ft',
    projectStage: 'Exploring',
    desiredTimeframe: 'Flexible',
    approximateBudget: 'Under $25,000',
  });
  assert.equal(Object.keys(smallBudgetValid).length, 0);

  const uncertainBudgetValid = validateStep2({
    projectDescription: 'Detached 650 sq ft ADU in backyard with two bedrooms and one bath.',
    approximateSize: '650 sq ft',
    projectStage: 'Plans in progress',
    desiredTimeframe: '3–6 months',
    approximateBudget: 'Not sure yet',
  });
  assert.equal(Object.keys(uncertainBudgetValid).length, 0);
});

test('validateStep3 validates preferred contact method (Email vs Phone) and project contact acknowledgment', () => {
  const missingEmail = validateStep3({
    fullName: 'Alex Rivera',
    preferredContactMethod: 'Email',
    email: 'invalid-email',
    phone: '',
    companyName: '',
    acknowledgeProjectContact: true,
  });
  assert.ok(missingEmail.email);

  const validEmailPreference = validateStep3({
    fullName: 'Alex Rivera',
    preferredContactMethod: 'Email',
    email: 'alex@example.com',
    phone: '',
    companyName: '',
    acknowledgeProjectContact: true,
  });
  assert.equal(Object.keys(validEmailPreference).length, 0);

  const validPhonePreference = validateStep3({
    fullName: 'Alex Rivera',
    preferredContactMethod: 'Phone',
    email: '',
    phone: '(951) 555-0142',
    companyName: 'Rivera Logistics LLC',
    acknowledgeProjectContact: true,
  });
  assert.equal(Object.keys(validPhonePreference).length, 0);

  const missingAcknowledge = validateStep3({
    fullName: 'Alex Rivera',
    preferredContactMethod: 'Phone',
    email: '',
    phone: '(951) 555-0142',
    companyName: '',
    acknowledgeProjectContact: false,
  });
  assert.ok(missingAcknowledge.acknowledgeProjectContact);
});

test('validateFullEstimatePayload flags spam honeypot and computes deterministic fingerprint', () => {
  const validPayload = {
    ...INITIAL_ESTIMATE_FORM_STATE,
    projectType: 'commercial-tenant-improvements',
    cityOrZip: 'Ontario, CA',
    propertyContext: 'Commercial' as const,
    projectDescription: 'Interior build-out for a 2,400 sq ft medical office suite with 4 exam rooms.',
    fullName: 'Jordan Patel',
    preferredContactMethod: 'Email' as const,
    email: 'jordan@patelclinic.com',
    acknowledgeProjectContact: true,
  };

  const result = validateFullEstimatePayload(validPayload);
  assert.equal(result.valid, true);
  assert.equal(result.isSpamHoneypot, false);

  const spamResult = validateFullEstimatePayload({
    ...validPayload,
    websiteHoneypot: 'http://spam-bot.example.com',
  });
  assert.equal(spamResult.valid, false);
  assert.equal(spamResult.isSpamHoneypot, true);

  const fp1 = computeSubmissionFingerprint(validPayload);
  const fp2 = computeSubmissionFingerprint({
    ...validPayload,
    email: '  JORDAN@patelclinic.com ',
  });
  assert.equal(fp1, fp2);
});

test('buildFormspreeEstimatePayload and buildFormspreeContactPayload preserve all relevant project fields', () => {
  const estimatePayload = buildFormspreeEstimatePayload(
    {
      ...INITIAL_ESTIMATE_FORM_STATE,
      projectType: 'adu-construction',
      cityOrZip: 'Jurupa Valley, CA',
      propertyContext: 'Residential',
      projectDescription: 'Detached 750 sq ft 2-bed 1-bath ADU with stucco finish.',
      approximateSize: '750 sq ft',
      projectStage: 'Plans in progress',
      desiredTimeframe: '3–6 months',
      approximateBudget: '$150,000–$300,000',
      fullName: 'Brian Test',
      preferredContactMethod: 'Phone',
      email: 'brian@example.com',
      phone: '(951) 555-0199',
      companyName: '',
      acknowledgeProjectContact: true,
    },
    'NVS-TEST123',
    '2026-10-21T22:00:00.000Z'
  );

  assert.equal(estimatePayload.leadId, 'NVS-TEST123');
  assert.equal(estimatePayload.projectType, 'adu-construction');
  assert.equal(estimatePayload.cityOrZip, 'Jurupa Valley, CA');
  assert.equal(estimatePayload.propertyContext, 'Residential');
  assert.equal(estimatePayload.approximateBudget, '$150,000–$300,000');
  assert.equal(estimatePayload._replyto, 'brian@example.com');

  const contactPayload = buildFormspreeContactPayload(
    {
      fullName: 'Elena Vance',
      email: 'elena@example.com',
      phone: '(951) 555-0144',
      cityOrZip: 'Riverside, CA',
      inquiryTopic: 'Commercial Tenant Improvement',
      message: 'We have a 3,200 sq ft retail suite and would like to discuss framing and drywall.',
      acknowledgePrivacy: true,
    },
    'NVS-MSG999',
    '2026-10-21T22:00:00.000Z'
  );

  assert.equal(contactPayload.leadId, 'NVS-MSG999');
  assert.equal(contactPayload.inquiryTopic, 'Commercial Tenant Improvement');
  assert.equal(contactPayload._replyto, 'elena@example.com');
});

test('submitToFormspree returns ok: true only when Formspree responds with 2xx and returns ok: false on failure', async () => {
  const mockSuccessFetch = (async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })) as unknown as typeof fetch;

  const sampleContactPayload = buildFormspreeContactPayload(
    {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '(951) 555-0100',
      cityOrZip: 'Jurupa Valley, CA',
      inquiryTopic: 'General Question',
      message: 'Testing Formspree integration payload.',
      acknowledgePrivacy: true,
    },
    'NVS-MOCK1',
    '2026-10-21T22:00:00.000Z'
  );

  const okResult = await submitToFormspree(
    'https://formspree.io/f/xaeqrkpg',
    sampleContactPayload,
    mockSuccessFetch
  );
  assert.equal(okResult.ok, true);
  assert.equal(okResult.status, 200);

  const mockErrorFetch = (async () =>
    new Response(
      JSON.stringify({ errors: [{ message: 'Form not found or rate limited' }] }),
      {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      }
    )) as unknown as typeof fetch;

  const failResult = await submitToFormspree(
    'https://formspree.io/f/xaeqrkpg',
    sampleContactPayload,
    mockErrorFetch
  );
  assert.equal(failResult.ok, false);
  assert.equal(failResult.status, 422);
  assert.match(failResult.errorMessage || '', /Form not found/);
});

test('buildSafeAnalyticsPayload strips PII (name, email, phone, projectDescription) from GA4 events', () => {
  const rawPayload = {
    cta_location: 'estimate_form_step_3',
    project_type: 'adu-construction',
    property_context: 'Residential',
    step_number: 3,
    // Attempted PII injection that must be stripped:
    fullName: 'Secret Name',
    email: 'secret@example.com',
    phone: '951-903-0824',
    projectDescription: 'Private residence gate code is 1234',
  } as Record<string, string | number | undefined>;

  const sanitized = buildSafeAnalyticsPayload(rawPayload);
  assert.equal(sanitized.cta_location, 'estimate_form_step_3');
  assert.equal(sanitized.project_type, 'adu-construction');
  assert.equal(sanitized.property_context, 'Residential');
  assert.equal(sanitized.step_number, 3);
  assert.equal('fullName' in sanitized, false);
  assert.equal('email' in sanitized, false);
  assert.equal('phone' in sanitized, false);
  assert.equal('projectDescription' in sanitized, false);
});

