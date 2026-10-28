import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { WHY_NOVUS_COMMITMENTS } from '@/lib/data/projects-and-faqs';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Novus Construction Inc. | Southern California General Contractor',
  description:
    'Learn about Novus Construction Inc., our commitment to organized scopes, residential and commercial construction standards, and quality workmanship across Southern California.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Company Profile &amp; Construction Standards
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              Practical Construction Knowledge. Organized Execution.
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              Novus Construction Inc. was built around a straightforward standard: give residential and commercial property owners clear scopes of work, careful trade coordination, and durable craftsmanship from structural framing through final finishes.
            </p>
          </div>
        </div>
      </section>

      {/* Company Approach & Leadership */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                How We Approach Construction
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Built for Homeowners, Property Investors &amp; Commercial Clients
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#46525D] leading-relaxed">
                <p>
                  Whether you are constructing a detached ADU in Riverside, adding a primary suite in Jurupa Valley, remodeling a kitchen and living space, or building out a commercial suite in the Inland Empire, the quality of the finished project depends on how well the work is planned before tools touch the building.
                </p>
                <p>
                  At Novus Construction Inc., we focus on both sides of the building equation: the structural and envelope trades that protect the property—such as framing, roofing, drywall, and stucco—and the interior finish details that shape daily use, including cabinetry, tile waterproofing, doors, and finish carpentry.
                </p>
                <p>
                  Because we understand how rough framing tolerances affect drywall flatness, and how drywall flatness affects cabinet reveals and tile layouts, we coordinate each phase with the final walkthrough in mind.
                </p>
              </div>

              {BUSINESS_CONFIG.owner.includeInAboutCopy && (
                <div className="p-6 bg-[#F5F4F0] border border-[#D9DEE3] space-y-2 mt-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                    Leadership &amp; Direct Oversight
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1F252B]">
                    {BUSINESS_CONFIG.owner.name} · {BUSINESS_CONFIG.owner.role}
                  </h3>
                  <p className="text-sm text-[#46525D] leading-relaxed">
                    Under the leadership of {BUSINESS_CONFIG.owner.name}, Novus Construction Inc. emphasizes direct communication, realistic project planning, and documented scope management across every residential and commercial engagement.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1F252B] border border-[#34424F] overflow-hidden">
                <img
                  src="/images/hero-socal-architecture.svg"
                  alt="Architectural illustration representing Southern California residential and commercial construction standards"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-6 text-[#F5F4F0] space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
                    Regional Coverage
                  </p>
                  <p className="text-sm text-[#D9DEE3] leading-relaxed">
                    Primary focus across Riverside, Jurupa Valley, and the Inland Empire, with broader Southern California projects evaluated by scope and schedule availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Service Commitments */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              Service Commitments
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              Five Standards That Guide Our Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_NOVUS_COMMITMENTS.map((item) => (
              <div key={item.number} className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 space-y-3">
                <span className="font-mono text-xs font-semibold text-[#8C6D46]">
                  Standard {item.number}
                </span>
                <h3 className="font-display text-lg font-bold text-[#1F252B]">{item.title}</h3>
                <p className="text-sm text-[#46525D] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Discuss Your Upcoming Project With Novus Construction Inc.
            </h2>
            <p className="text-base text-[#D9DEE3] leading-relaxed">
              Tell us what you are building or improving in Southern California and we will review your scope and follow up.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/request-estimate"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
              >
                <span>Request an Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
