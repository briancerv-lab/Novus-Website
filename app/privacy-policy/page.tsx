import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Novus Construction Inc.',
  description:
    'Privacy Policy for Novus Construction Inc. explaining how project inquiry information, contact details, and website interactions are handled.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const { publicAddress } = BUSINESS_CONFIG.contact;
  const formattedAddress = `${publicAddress.streetAddress}, ${publicAddress.addressLocality}, ${publicAddress.addressRegion} ${publicAddress.postalCode}`;

  return (
    <div>
      <section className="bg-[#1F252B] text-[#FFFFFF] py-12 sm:py-16 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Privacy Policy', path: '/privacy-policy' },
            ]}
          />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#D9DEE3] mt-2">
            Effective Date: October 2026 · {BUSINESS_CONFIG.businessName}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#FFFFFF]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base text-[#46525D] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#1F252B]">
              1. Information We Collect When You Request an Estimate or Contact Us
            </h2>
            <p>
              When you submit a project inquiry, estimate request, or direct contact message through {BUSINESS_CONFIG.businessName} ({BUSINESS_CONFIG.intendedDomain}), we collect the information you voluntarily provide:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Project type, property context (residential or commercial), and project city or ZIP code.</li>
              <li>Project scope description, approximate size, current planning stage, desired timeframe, and optional budget inquiry range.</li>
              <li>Your name, preferred contact method, email address, phone number, optional company name, and your communication consent selections.</li>
            </ul>
            <p>
              We do not require account creation or a full street address for an initial online estimate request, and we do not store your personal form entries in browser <code className="font-mono text-xs">localStorage</code>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#1F252B]">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information you submit to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Review your project scope, location, and schedule requirements.</li>
              <li>Contact you via your requested contact method (email or phone) regarding your construction inquiry.</li>
              <li>Send occasional company updates only if you explicitly check the separate, optional marketing consent box.</li>
              <li>Protect our website from automated spam, duplicate submissions, and abuse using server-side validation and rate limits.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#1F252B]">
              3. Data Delivery, Security &amp; Project Documents
            </h2>
            <p>
              Submitted project inquiries and contact messages are validated on our server and securely transmitted via HTTPS to our configured form delivery service (Formspree) and company inbox. Personal contact details and project descriptions are never placed into public URLs, client-visible console logs, or analytics payloads.
            </p>
            <p>
              To protect the privacy of architectural drawings, engineering calculations, and site photographs, we arrange direct document sharing after initial contact rather than collecting public file uploads on our website forms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#1F252B]">
              4. Website Measurement &amp; Analytics
            </h2>
            <p>
              Our website uses Google Analytics 4 to measure aggregate website traffic and non-personal interaction events—such as page views, starting or submitting an estimate request, viewing a service category, or clicking a phone contact link. These events include non-personal context (such as the selected service category or page path) and strictly exclude names, email addresses, phone numbers, and project descriptions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#1F252B]">
              5. Contacting Us Regarding Your Information
            </h2>
            <p>
              If you have questions about this Privacy Policy or wish to update or request deletion of a project inquiry you submitted to {BUSINESS_CONFIG.businessName}, please contact us:
            </p>
            <div className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] space-y-1 text-sm text-[#1F252B]">
              <p className="font-bold">{BUSINESS_CONFIG.businessName}</p>
              <p className="text-[#46525D]">{formattedAddress}</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="font-semibold text-[#1F252B] underline"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneE164}`}
                  className="font-semibold text-[#1F252B] underline"
                >
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
