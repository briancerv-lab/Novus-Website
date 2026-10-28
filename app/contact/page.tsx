'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG, canDisplayPublicLicense, hasVerifiedPhone } from '@/lib/config/business';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackNovusEvent } from '@/lib/analytics';

export default function ContactPage() {
  const showPhone = hasVerifiedPhone();
  const showLicense = canDisplayPublicLicense();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityOrZip, setCityOrZip] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('General Project Question');
  const [message, setMessage] = useState('');
  const [acknowledgePrivacy, setAcknowledgePrivacy] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ message: string; leadId: string } | null>(null);
  const hasTrackedStartRef = useRef(false);

  function markContactStart() {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true;
      trackNovusEvent('estimate_start', {
        project_type: inquiryTopic,
        form_type: 'contact_direct',
      });
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          cityOrZip,
          inquiryTopic,
          message,
          acknowledgePrivacy,
          websiteHoneypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.accepted) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerError(
          data.error ||
            'We could not send your message right now. Your entries have been preserved—please review and try again.'
        );
        trackNovusEvent('contact_submit_error', {
          project_type: inquiryTopic,
          form_type: 'contact_direct',
          error_reason: `http_${response.status}`,
        });
        setIsSubmitting(false);
        return;
      }

      trackNovusEvent('estimate_submit_success', {
        project_type: inquiryTopic,
        form_type: 'contact_direct',
      });

      setConfirmation({
        message:
          data.confirmationMessage ||
          'Thank you. Your message has been received by Novus Construction Inc. We will review your inquiry and follow up with you.',
        leadId: data.leadId || 'RECEIVED',
      });
    } catch {
      setServerError(
        'A network error occurred while sending your message. Your entries have been preserved—please try again.'
      );
      trackNovusEvent('contact_submit_error', {
        project_type: inquiryTopic,
        form_type: 'contact_direct',
        error_reason: 'network_exception',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Get in Touch
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              Contact Novus Construction Inc.
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              Reach out to discuss residential construction, ADUs, additions, remodeling, construction trades, or commercial tenant improvements across Southern California.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Channels & Direct Contact Form */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Verified Contact Details & Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
                  Direct Channels
                </p>
                <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                  Company Contact Information
                </h2>
                <p className="text-sm text-[#46525D] mt-2 leading-relaxed">
                  Call, email, or send a direct message below. If you are ready to scope a specific project, you can also use our{' '}
                  <Link href="/request-estimate" className="underline font-semibold text-[#1F252B]">
                    3-Step Estimate Request Form
                  </Link>
                  .
                </p>
              </div>

              <div className="space-y-4">
                {showPhone && (
                  <div className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                        Direct Phone
                      </p>
                      <a
                        href={`tel:${BUSINESS_CONFIG.contact.phoneE164}`}
                        onClick={() => trackNovusEvent('phone_click', { cta_location: 'contact_page' })}
                        className="font-display text-lg font-bold text-[#1F252B] hover:text-[#8C6D46]"
                      >
                        {BUSINESS_CONFIG.contact.phoneDisplay}
                      </a>
                      <p className="text-xs text-[#46525D] mt-1">
                        Call to discuss residential or commercial project inquiries.
                      </p>
                    </div>
                  </div>
                )}

                {BUSINESS_CONFIG.contact.emailConfirmedForPublicDisplay && BUSINESS_CONFIG.contact.email && (
                  <div className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                        Direct Email
                      </p>
                      <a
                        href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                        onClick={() => trackNovusEvent('email_click', { cta_location: 'contact_page' })}
                        className="font-display text-base font-bold text-[#1F252B] hover:text-[#8C6D46] break-all"
                      >
                        {BUSINESS_CONFIG.contact.email}
                      </a>
                      <p className="text-xs text-[#46525D] mt-1">
                        For general inquiries, vendor correspondence, or plan coordination.
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                      Address &amp; Service Region
                    </p>
                    {BUSINESS_CONFIG.contact.publicAddress ? (
                      <p className="font-display text-base font-bold text-[#1F252B]">
                        {BUSINESS_CONFIG.contact.publicAddress.streetAddress},{' '}
                        {BUSINESS_CONFIG.contact.publicAddress.addressLocality},{' '}
                        {BUSINESS_CONFIG.contact.publicAddress.addressRegion}{' '}
                        {BUSINESS_CONFIG.contact.publicAddress.postalCode}
                      </p>
                    ) : (
                      <p className="font-display text-base font-bold text-[#1F252B]">
                        {BUSINESS_CONFIG.serviceArea.primaryFocusLabel}
                      </p>
                    )}
                    <p className="text-xs text-[#46525D] mt-1 leading-relaxed">
                      Serving {BUSINESS_CONFIG.serviceArea.primaryFocusLabel} and surrounding Southern California communities.
                    </p>
                  </div>
                </div>

                {BUSINESS_CONFIG.contact.businessHours && (
                  <div className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                        Business Hours
                      </p>
                      <p className="text-sm font-medium text-[#1F252B] mt-0.5">
                        {BUSINESS_CONFIG.contact.businessHours}
                      </p>
                    </div>
                  </div>
                )}

                {showLicense && (
                  <div className="p-5 bg-[#1F252B] text-[#F5F4F0] border border-[#34424F] space-y-1.5">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
                      Verified Credentials
                    </p>
                    <p className="text-sm font-semibold text-[#FFFFFF]">
                      CSLB License #{BUSINESS_CONFIG.license.rawInputNumber} · {BUSINESS_CONFIG.license.confirmedClassification} ({BUSINESS_CONFIG.license.confirmedStatus})
                    </p>
                    {BUSINESS_CONFIG.credentials.insuranceVerified && (
                      <p className="text-xs text-[#D9DEE3]">{BUSINESS_CONFIG.credentials.insuranceSummary}</p>
                    )}
                    {BUSINESS_CONFIG.credentials.bondingVerified && (
                      <p className="text-xs text-[#D9DEE3]">{BUSINESS_CONFIG.credentials.bondingSummary}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Direct Contact Form + Link to 3-Step Estimate Flow */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 lg:p-10">
                <div className="mb-6 pb-4 border-b border-[#D9DEE3]">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46] mb-1">
                    Direct Message
                  </p>
                  <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-[#46525D] mt-1">
                    Have a question before starting a full estimate? Send a note below and we will follow up.
                  </p>
                </div>

                {confirmation ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-6 bg-[#F5F4F0] border border-[#D9DEE3] space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#FFFFFF] border border-[#D9DEE3]">
                      <CheckCircle2 className="w-5 h-5 text-[#F28C28]" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1F252B]">
                      Message Received
                    </h3>
                    <p className="text-sm sm:text-base text-[#1F252B] leading-relaxed">
                      {confirmation.message}
                    </p>
                    <p className="font-mono text-xs text-[#46525D] tabular-nums">
                      Reference ID: {confirmation.leadId}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                    {serverError && (
                      <div
                        role="alert"
                        className="p-4 bg-[#FDF4F4] border border-[#C93B3B] text-sm text-[#1F252B] flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-[#C93B3B] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="font-semibold">Unable to complete submission</p>
                          <p className="text-[#46525D] mt-0.5">{serverError}</p>
                        </div>
                      </div>
                    )}

                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contactHoneypot">Leave blank</label>
                      <input
                        id="contactHoneypot"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={websiteHoneypot}
                        onChange={(e) => setWebsiteHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contactFullName" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                          Your Name <span className="text-[#C93B3B]">*</span>
                        </label>
                        <input
                          id="contactFullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            markContactStart();
                            setFullName(e.target.value);
                          }}
                          placeholder="First and last name"
                          className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1 text-xs font-medium text-[#C93B3B]">{fieldErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                          Email Address <span className="text-[#C93B3B]">*</span>
                        </label>
                        <input
                          id="contactEmail"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            markContactStart();
                            setEmail(e.target.value);
                          }}
                          placeholder="you@example.com"
                          className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-xs font-medium text-[#C93B3B]">{fieldErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                          Phone Number <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                        </label>
                        <input
                          id="contactPhone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            markContactStart();
                            setPhone(e.target.value);
                          }}
                          placeholder="(951) 555-0100"
                          className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1 text-xs font-medium text-[#C93B3B]">{fieldErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contactCity" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                          Project City or ZIP <span className="text-xs font-normal text-[#46525D]">(Optional)</span>
                        </label>
                        <input
                          id="contactCity"
                          type="text"
                          value={cityOrZip}
                          onChange={(e) => {
                            markContactStart();
                            setCityOrZip(e.target.value);
                          }}
                          placeholder="e.g., Riverside, Jurupa Valley"
                          className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactTopic" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                        Inquiry Topic <span className="text-[#C93B3B]">*</span>
                      </label>
                      <select
                        id="contactTopic"
                        value={inquiryTopic}
                        onChange={(e) => {
                          markContactStart();
                          setInquiryTopic(e.target.value);
                        }}
                        className="w-full min-h-[48px] px-3.5 py-2.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                      >
                        <option value="General Project Question">General Project Question</option>
                        <option value="Residential Remodel / Addition / ADU">Residential Remodel / Addition / ADU</option>
                        <option value="Commercial Tenant Improvement">Commercial Tenant Improvement</option>
                        <option value="Construction Trades (Framing, Drywall, Stucco, Roofing, Carpentry)">
                          Construction Trades (Framing, Drywall, Stucco, Roofing, Carpentry)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contactMessage" className="block text-sm font-semibold text-[#1F252B] mb-1.5">
                        Message <span className="text-[#C93B3B]">*</span>
                      </label>
                      <textarea
                        id="contactMessage"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => {
                          markContactStart();
                          setMessage(e.target.value);
                        }}
                        placeholder="How can Novus Construction Inc. help with your project?"
                        className="w-full p-3.5 text-sm text-[#1F252B] bg-[#F5F4F0] border border-[#D9DEE3] focus:bg-[#FFFFFF] focus:border-[#1F252B] focus:outline-none"
                      />
                      {fieldErrors.message && (
                        <p className="mt-1 text-xs font-medium text-[#C93B3B]">{fieldErrors.message}</p>
                      )}
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="contactPrivacy"
                        type="checkbox"
                        checked={acknowledgePrivacy}
                        onChange={(e) => {
                          markContactStart();
                          setAcknowledgePrivacy(e.target.checked);
                        }}
                        className="mt-1 w-4 h-4 accent-[#1F252B]"
                      />
                      <label htmlFor="contactPrivacy" className="text-xs text-[#34424F] leading-relaxed">
                        I am requesting that Novus Construction Inc. contact me regarding this inquiry, and I have reviewed the{' '}
                        <Link href="/privacy-policy" className="underline font-semibold text-[#1F252B]">
                          Privacy Policy
                        </Link>
                        . <span className="text-[#C93B3B]">*</span>
                      </label>
                    </div>
                    {fieldErrors.acknowledgePrivacy && (
                      <p className="text-xs font-medium text-[#C93B3B]">{fieldErrors.acknowledgePrivacy}</p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] disabled:opacity-60 transition-colors whitespace-nowrap"
                      >
                        <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                        <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      </button>

                      <Link
                        href="/request-estimate"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                      >
                        <span>Prefer the guided 3-step estimate form?</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
