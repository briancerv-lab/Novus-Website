import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import Breadcrumbs from '@/components/Breadcrumbs';
import EstimateFormFlow from '@/components/EstimateFormFlow';

export const metadata: Metadata = {
  title: 'Request a Construction Estimate | Novus Construction Inc.',
  description:
    'Request a residential or commercial construction estimate from Novus Construction Inc. Share your project type, Southern California city, and scope details.',
  alternates: {
    canonical: '/request-estimate',
  },
};

interface RequestEstimatePageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function RequestEstimatePage({ searchParams }: RequestEstimatePageProps) {
  const resolvedParams = await searchParams;
  const preselectedService = resolvedParams?.service || null;

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-12 sm:py-16 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Request an Estimate', path: '/request-estimate' },
            ]}
          />
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Project Inquiry &amp; Scope Review
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
              Request a Construction Estimate
            </h1>
            <p className="text-sm sm:text-base text-[#D9DEE3] leading-relaxed">
              Share your project basics, scope stage, and preferred contact method. Novus Construction Inc. reviews every inquiry to evaluate scope fit and next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Layout: 3-Step Form + What to Expect Sidebar */}
      <section className="py-12 sm:py-20 bg-[#F5F4F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <EstimateFormFlow initialServiceSlug={preselectedService} />
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46] font-semibold">
                  What Happens Next
                </p>
                <h2 className="font-display text-lg font-bold text-[#1F252B]">
                  How We Review Your Request
                </h2>
                <ol className="space-y-3.5 text-xs sm:text-sm text-[#46525D]">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-semibold text-[#F28C28] mt-0.5">01.</span>
                    <span>
                      <strong className="text-[#1F252B]">Scope &amp; Location Check:</strong> We review your project type, city, and current planning stage.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-semibold text-[#F28C28] mt-0.5">02.</span>
                    <span>
                      <strong className="text-[#1F252B]">Initial Follow-Up:</strong> We reach out via your preferred contact method to discuss your goals and any architectural or structural plans.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-semibold text-[#F28C28] mt-0.5">03.</span>
                    <span>
                      <strong className="text-[#1F252B]">Site Walk &amp; Written Proposal:</strong> For qualified projects, we schedule an on-site evaluation to prepare a detailed written scope.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-[#1F252B] text-[#F5F4F0] border border-[#34424F] p-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
                  Service Area Context
                </p>
                <p className="text-xs sm:text-sm text-[#D9DEE3] leading-relaxed">
                  Primary focus: {BUSINESS_CONFIG.serviceArea.primaryFocusLabel}. Broader Southern California residential and commercial projects are evaluated based on scope and schedule availability.
                </p>
                {BUSINESS_CONFIG.contact.emailConfirmedForPublicDisplay && BUSINESS_CONFIG.contact.email && (
                  <p className="text-xs text-[#D9DEE3] pt-2 border-t border-[#34424F]">
                    Direct Email:{' '}
                    <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="underline text-[#FFFFFF]">
                      {BUSINESS_CONFIG.contact.email}
                    </a>
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
