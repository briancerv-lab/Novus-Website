'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, FileText, ShieldCheck } from 'lucide-react';
import {
  EstimateFormState,
  INITIAL_ESTIMATE_FORM_STATE,
  PROJECT_TYPE_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  DESIRED_TIMEFRAME_OPTIONS,
  BUDGET_INQUIRY_OPTIONS,
  ValidationErrors,
  inferPropertyContext,
  resolvePreselectedService,
  validateStep1,
  validateStep2,
  validateStep3,
} from '@/lib/estimate-validation';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { trackNovusEvent } from '@/lib/analytics';

interface EstimateFormFlowProps {
  initialServiceSlug?: string | null;
}

export default function EstimateFormFlow({ initialServiceSlug }: EstimateFormFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formState, setFormState] = useState<EstimateFormState>(() => {
    const resolved = resolvePreselectedService(initialServiceSlug);
    return {
      ...INITIAL_ESTIMATE_FORM_STATE,
      projectType: resolved.projectType,
      propertyContext: resolved.propertyContext,
    };
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedConfirmation, setSubmittedConfirmation] = useState<{
    message: string;
    leadId: string;
  } | null>(null);
  const hasTrackedStartRef = useRef(false);

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Sync if initialServiceSlug changes via URL navigation
  useEffect(() => {
    if (initialServiceSlug) {
      const resolved = resolvePreselectedService(initialServiceSlug);
      if (resolved.projectType) {
        setFormState((prev) => ({
          ...prev,
          projectType: resolved.projectType,
          propertyContext: resolved.propertyContext || prev.propertyContext,
        }));
      }
    }
  }, [initialServiceSlug]);

  function markStarted(nextProjectType?: string) {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      trackNovusEvent('estimate_start', {
        project_type: nextProjectType || formState.projectType || 'unspecified',
        form_type: 'estimate_3step',
      });
    }
  }

  function updateField<K extends keyof EstimateFormState>(key: K, value: EstimateFormState[K]) {
    markStarted(key === 'projectType' ? (value as string) : undefined);
    setFormState((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'projectType') {
        const inferred = inferPropertyContext(value as string);
        if (inferred) {
          next.propertyContext = inferred;
        }
      }
      return next;
    });

    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
    if (serverError) {
      setServerError(null);
    }
  }

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (step === 1) {
      const step1Errors = validateStep1(formState);
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setErrors({});
      trackNovusEvent('estimate_step_complete', {
        step_number: 1,
        project_type: formState.projectType,
        property_context: formState.propertyContext || inferPropertyContext(formState.projectType) || undefined,
      });
      setStep(2);
      setTimeout(() => stepHeadingRef.current?.focus(), 30);
    } else if (step === 2) {
      const step2Errors = validateStep2(formState);
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }
      setErrors({});
      trackNovusEvent('estimate_step_complete', {
        step_number: 2,
        project_type: formState.projectType,
      });
      setStep(3);
      setTimeout(() => stepHeadingRef.current?.focus(), 30);
    }
  }

  function handleBackStep() {
    setServerError(null);
    setErrors({});
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
    setTimeout(() => stepHeadingRef.current?.focus(), 30);
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const step3Errors = validateStep3(formState);
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok || !data.accepted) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setServerError(
          data.error ||
            'We could not complete your request right now. Your entries have been preserved—please review and try again.'
        );
        trackNovusEvent('estimate_submit_error', {
          project_type: formState.projectType,
          error_reason: `http_${response.status}`,
        });
        setIsSubmitting(false);
        return;
      }

      trackNovusEvent('estimate_submit_success', {
        project_type: formState.projectType,
        property_context: formState.propertyContext || inferPropertyContext(formState.projectType) || undefined,
      });

      setSubmittedConfirmation({
        message:
          data.confirmationMessage ||
          'Thank you. Your project request has been received. Novus Construction Inc. will review the details and contact you about next steps.',
        leadId: data.leadId || 'RECEIVED',
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      setServerError(
        'A network error occurred while sending your request. Your form entries are still here—please try again.'
      );
      trackNovusEvent('estimate_submit_error', {
        project_type: formState.projectType,
        error_reason: 'network_exception',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inferredContext = inferPropertyContext(formState.projectType);
  const effectiveContext = formState.propertyContext || inferredContext;

  if (submittedConfirmation) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#FFFFFF] border border-[#D9DEE3] p-8 sm:p-10 space-y-6 scroll-mt-28"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F5F4F0] border border-[#D9DEE3] text-[#1F252B]">
          <CheckCircle2 className="w-6 h-6 text-[#F28C28]" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
          Project Request Received
        </h2>
        <p className="text-base sm:text-lg text-[#1F252B] font-medium leading-relaxed">
          {submittedConfirmation.message}
        </p>
        <div className="p-4 bg-[#F5F4F0] border border-[#D9DEE3] text-sm text-[#46525D] space-y-1.5">
          <p className="font-mono text-xs text-[#1F252B] tabular-nums">
            Reference ID: {submittedConfirmation.leadId}
          </p>
          <p>
            If you have architectural plans, structural drawings, or site photographs ready, you can share them when our team follows up with you.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/our-process"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors"
          >
            <span>Review Our Construction Process</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1F252B] border border-[#D9DEE3] hover:bg-[#F5F4F0] transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 lg:p-10">
      {/* Visible 3-Step Progress Indicator */}
      <div className="mb-8 pb-6 border-b border-[#D9DEE3]">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#46525D] mb-3">
          <span>Step {step} of 3</span>
          <span className="font-mono tabular-nums text-[#1F252B]">
            {step === 1 ? '01. Project Basics' : step === 2 ? '02. Scope & Readiness' : '03. Contact Details'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Estimate request progress: Step ${step} of 3`}>
          <div className={`h-2 transition-colors ${step >= 1 ? 'bg-[#F28C28]' : 'bg-[#D9DEE3]'}`} />
          <div className={`h-2 transition-colors ${step >= 2 ? 'bg-[#F28C28]' : 'bg-[#D9DEE3]'}`} />
          <div className={`h-2 transition-colors ${step >= 3 ? 'bg-[#F28C28]' : 'bg-[#D9DEE3]'}`} />
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-6 p-4 bg-[#FDF4F4] border border-[#C93B3B] text-sm text-[#1F252B] flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-[#C93B3B] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Unable to complete submission</p>
            <p className="text-[#46525D] mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={step < 3 ? handleNextStep : handleFinalSubmit} noValidate>
        {/* Honeypot anti-spam field (hidden from assistive tech and visual layout) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="websiteHoneypot">Leave this field blank</label>
          <input
            id="websiteHoneypot"
            name="websiteHoneypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formState.websiteHoneypot}
            onChange={(e) => updateField('websiteHoneypot', e.target.value)}
          />
        </div>

        {/* STEP 1: PROJECT BASICS */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-xl sm:text-2xl font-bold text-[#1F252B] focus:outline-none"
              >
                01. Tell Us What You Are Planning
              </h2>
              <p className="text-sm text-[#46525D] mt-1">
                Start with the primary project type and location so we can evaluate scope fit and service area coverage.
              </p>
            </div>

            <div>
              <label htmlFor="projectType" className="block text-sm font-semibold text-[#1F252B] mb-2">
                Primary Project Type <span className="text-[#C93B3B]">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formState.projectType}
                onChange={(e) => updateField('projectType', e.target.value)}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
              >
                <option value="">Select a construction service or project type...</option>
                <optgroup label="Residential Construction">
                  {PROJECT_TYPE_OPTIONS.filter((o) => o.inferredContext === 'Residential').map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Commercial Construction">
                  {PROJECT_TYPE_OPTIONS.filter((o) => o.inferredContext === 'Commercial').map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Construction Trades & Multi-Scope">
                  {PROJECT_TYPE_OPTIONS.filter((o) => o.inferredContext === null).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.projectType && (
                <p id="projectType-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cityOrZip" className="block text-sm font-semibold text-[#1F252B] mb-2">
                Project City or ZIP Code <span className="text-[#C93B3B]">*</span>
              </label>
              <input
                id="cityOrZip"
                name="cityOrZip"
                type="text"
                required
                placeholder="e.g., Riverside, Jurupa Valley, Corona, or 92501"
                value={formState.cityOrZip}
                onChange={(e) => updateField('cityOrZip', e.target.value)}
                aria-invalid={Boolean(errors.cityOrZip)}
                aria-describedby={errors.cityOrZip ? 'cityOrZip-error' : 'cityOrZip-hint'}
                className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
              />
              <p id="cityOrZip-hint" className="mt-1.5 text-xs text-[#46525D]">
                A full street address is not required for your initial inquiry.
              </p>
              {errors.cityOrZip && (
                <p id="cityOrZip-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                  {errors.cityOrZip}
                </p>
              )}
            </div>

            {/* Property Context: Shown always so user can confirm or specify when trade is selected */}
            <fieldset>
              <legend className="block text-sm font-semibold text-[#1F252B] mb-2">
                Property Setting {inferredContext === null && <span className="text-[#C93B3B]">*</span>}
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(['Residential', 'Commercial'] as const).map((ctx) => {
                  const isSelected = effectiveContext === ctx;
                  return (
                    <button
                      key={ctx}
                      type="button"
                      onClick={() => updateField('propertyContext', ctx)}
                      aria-pressed={isSelected}
                      className={`min-h-[48px] px-4 py-2.5 text-sm font-semibold border text-left transition-colors ${
                        isSelected
                          ? 'bg-[#1F252B] text-[#FFFFFF] border-[#1F252B]'
                          : 'bg-[#F5F4F0] text-[#34424F] border-[#D9DEE3] hover:bg-[#EAE8E1]'
                      }`}
                    >
                      {ctx} Property
                    </button>
                  );
                })}
              </div>
              {errors.propertyContext && (
                <p className="mt-1.5 text-xs font-medium text-[#C93B3B]">{errors.propertyContext}</p>
              )}
            </fieldset>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
              >
                <span>Continue to Scope &amp; Readiness</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCOPE & READINESS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-xl sm:text-2xl font-bold text-[#1F252B] focus:outline-none"
              >
                02. Project Scope &amp; Planning Stage
              </h2>
              <p className="text-sm text-[#46525D] mt-1">
                Help us understand the work you have in mind and where you are in the planning process.
              </p>
            </div>

            <div>
              <label htmlFor="projectDescription" className="block text-sm font-semibold text-[#1F252B] mb-2">
                Brief Project Description <span className="text-[#C93B3B]">*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                rows={4}
                required
                placeholder="Describe what you want to build or remodel, existing conditions, and any key goals..."
                value={formState.projectDescription}
                onChange={(e) => updateField('projectDescription', e.target.value)}
                aria-invalid={Boolean(errors.projectDescription)}
                aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
                className="w-full p-3.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
              />
              {errors.projectDescription && (
                <p id="projectDescription-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                  {errors.projectDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="projectStage" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Current Project Stage
                </label>
                <select
                  id="projectStage"
                  name="projectStage"
                  value={formState.projectStage}
                  onChange={(e) => updateField('projectStage', e.target.value as EstimateFormState['projectStage'])}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                >
                  {PROJECT_STAGE_OPTIONS.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="approximateSize" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Approximate Size <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                </label>
                <input
                  id="approximateSize"
                  name="approximateSize"
                  type="text"
                  placeholder="e.g., 750 sq ft ADU, 2-bath remodel, 2,500 sq ft suite"
                  value={formState.approximateSize}
                  onChange={(e) => updateField('approximateSize', e.target.value)}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="desiredTimeframe" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Desired Timeframe <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                </label>
                <select
                  id="desiredTimeframe"
                  name="desiredTimeframe"
                  value={formState.desiredTimeframe}
                  onChange={(e) =>
                    updateField('desiredTimeframe', e.target.value as EstimateFormState['desiredTimeframe'])
                  }
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                >
                  {DESIRED_TIMEFRAME_OPTIONS.map((tf) => (
                    <option key={tf} value={tf}>
                      {tf}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="approximateBudget" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Approximate Budget Range <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                </label>
                <select
                  id="approximateBudget"
                  name="approximateBudget"
                  value={formState.approximateBudget}
                  onChange={(e) =>
                    updateField('approximateBudget', e.target.value as EstimateFormState['approximateBudget'])
                  }
                  aria-describedby="budget-note"
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                >
                  {BUDGET_INQUIRY_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p id="budget-note" className="text-xs text-[#46525D]">
              Note: Budget ranges are general inquiry categories to help us understand project scale—not advertised pricing or minimum project values.
            </p>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBackStep}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 text-sm font-semibold text-[#1F252B] border border-[#D9DEE3] hover:bg-[#F5F4F0] transition-colors whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
              >
                <span>Continue to Contact Info</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-xl sm:text-2xl font-bold text-[#1F252B] focus:outline-none"
              >
                03. How Should We Reach You?
              </h2>
              <p className="text-sm text-[#46525D] mt-1">
                Share your contact details so Novus Construction Inc. can review your scope and follow up.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Your Name <span className="text-[#C93B3B]">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="First and last name"
                  value={formState.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Company or Organization <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  placeholder={
                    effectiveContext === 'Commercial'
                      ? 'Business, tenant, or property management name'
                      : 'Optional'
                  }
                  value={formState.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                />
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-semibold text-[#1F252B] mb-2">
                Preferred Contact Method <span className="text-[#C93B3B]">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(['Email', 'Phone'] as const).map((method) => {
                  const isSelected = formState.preferredContactMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateField('preferredContactMethod', method)}
                      aria-pressed={isSelected}
                      className={`min-h-[48px] px-4 py-2.5 text-sm font-semibold border text-left transition-colors ${
                        isSelected
                          ? 'bg-[#1F252B] text-[#FFFFFF] border-[#1F252B]'
                          : 'bg-[#F5F4F0] text-[#34424F] border-[#D9DEE3] hover:bg-[#EAE8E1]'
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Email Address{' '}
                  {formState.preferredContactMethod === 'Email' ? (
                    <span className="text-[#C93B3B]">*</span>
                  ) : (
                    <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                  )}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={formState.preferredContactMethod === 'Email'}
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#1F252B] mb-2">
                  Phone Number{' '}
                  {formState.preferredContactMethod === 'Phone' ? (
                    <span className="text-[#C93B3B]">*</span>
                  ) : (
                    <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                  )}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required={formState.preferredContactMethod === 'Phone'}
                  placeholder="(951) 555-0100"
                  value={formState.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-xs font-medium text-[#C93B3B]">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Plans / Photos Sharing Note (Secure upload hidden when unconfigured per Section 10) */}
            {!BUSINESS_CONFIG.technical.secureUploadConfigured && (
              <div className="p-4 bg-[#F5F4F0] border border-[#D9DEE3] flex items-start gap-3 text-xs text-[#46525D]">
                <FileText className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong className="text-[#1F252B]">Have architectural plans, drawings, or site photos?</strong> To keep your project documents private, file attachments are shared directly after our initial follow-up rather than uploaded through a public web form.
                </p>
              </div>
            )}

            {/* Required Project Contact Consent & Separate Optional Marketing Consent */}
            <div className="space-y-3 pt-2 border-t border-[#D9DEE3]">
              <div className="flex items-start gap-3">
                <input
                  id="acknowledgeProjectContact"
                  name="acknowledgeProjectContact"
                  type="checkbox"
                  checked={formState.acknowledgeProjectContact}
                  onChange={(e) => updateField('acknowledgeProjectContact', e.target.checked)}
                  aria-invalid={Boolean(errors.acknowledgeProjectContact)}
                  aria-describedby={errors.acknowledgeProjectContact ? 'ack-error' : undefined}
                  className="mt-1 w-4 h-4 accent-[#1F252B]"
                />
                <label htmlFor="acknowledgeProjectContact" className="text-xs text-[#34424F] leading-relaxed">
                  I am requesting that Novus Construction Inc. contact me regarding this project inquiry, and I have reviewed the{' '}
                  <Link href="/privacy-policy" className="underline text-[#1F252B] font-semibold">
                    Privacy Policy
                  </Link>
                  . <span className="text-[#C93B3B]">*</span>
                </label>
              </div>
              {errors.acknowledgeProjectContact && (
                <p id="ack-error" className="text-xs font-medium text-[#C93B3B]">
                  {errors.acknowledgeProjectContact}
                </p>
              )}

              <div className="flex items-start gap-3">
                <input
                  id="marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  checked={formState.marketingConsent}
                  onChange={(e) => updateField('marketingConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#1F252B]"
                />
                <label htmlFor="marketingConsent" className="text-xs text-[#46525D] leading-relaxed">
                  Optional: You may also send me occasional company updates from Novus Construction Inc. (Not required to request an estimate.)
                </label>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBackStep}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 text-sm font-semibold text-[#1F252B] border border-[#D9DEE3] hover:bg-[#F5F4F0] transition-colors whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>{isSubmitting ? 'Sending Project Request...' : 'Send Project Request'}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
