import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectsPortfolioClient from '@/components/ProjectsPortfolioClient';

export const metadata: Metadata = {
  title: 'Construction Projects & Scope Studies | Novus Construction Inc.',
  description:
    'Review residential and commercial construction scope studies from Novus Construction Inc., including ADUs, room additions, kitchen and bath remodels, and commercial tenant improvements.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Portfolio &amp; Scope Evidence
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              Residential &amp; Commercial Construction Scope Studies
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              See how Novus Construction Inc. structures project scopes, evaluates site conditions, and coordinates residential and commercial construction across Southern California.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filterable Portfolio Section */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {!BUSINESS_CONFIG.credentials.hasRealApprovedProjects && (
            <div className="mb-10 p-5 bg-[#F5F4F0] border border-[#D9DEE3] text-xs sm:text-sm text-[#34424F] leading-relaxed">
              <strong className="text-[#1F252B]">Truthful Portfolio Disclosure:</strong> While owner-approved photographs of completed Novus Construction Inc. jobsites are being finalized for publication, the entries below are presented as{' '}
              <strong className="text-[#1F252B]">Illustrative Scope Studies</strong>. They use architectural diagrams to show our typical scope breakdowns, site considerations, and construction sequencing without representing sample illustrations as completed client photography.
            </div>
          )}

          <ProjectsPortfolioClient />
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 sm:py-20 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Have a Specific Scope in Mind?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Request a Proposal Tailored to Your Property
            </h2>
            <p className="text-sm sm:text-base text-[#D9DEE3] leading-relaxed">
              Whether you have permitted architectural drawings ready for pricing or are preparing your project scope, share your details with our team.
            </p>
            <div className="pt-2">
              <Link
                href="/request-estimate"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
              >
                <span>Request an Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
