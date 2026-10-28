import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getServicesByCategory } from '@/lib/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Residential & Commercial Construction Services | Novus Construction Inc.',
  description:
    'Explore all 11 construction services from Novus Construction Inc. in Southern California: ADUs, additions, remodeling, commercial tenant improvements, framing, drywall, stucco, roofing, and finish carpentry.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesIndexPage() {
  const residentialServices = getServicesByCategory('Residential');
  const commercialServices = getServicesByCategory('Commercial');
  const tradeServices = getServicesByCategory('Construction Trades');

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Capabilities &amp; Scopes of Work
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              Residential, Commercial &amp; Trade Construction Services in Southern California
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              Novus Construction Inc. provides organized general contracting and core construction trade execution across Riverside, Jurupa Valley, the Inland Empire, and surrounding Southern California communities.
            </p>
          </div>
        </div>
      </section>

      {/* Category 1: Residential Services */}
      <section id="residential" className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              01. Residential General Contracting
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              ADUs, Additions &amp; Residential Remodeling
            </h2>
            <p className="text-sm sm:text-base text-[#46525D] mt-2">
              Well-planned residential construction built from clear scopes, structural integrity, and coordinated trade sequencing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residentialServices.map((service) => (
              <article
                key={service.slug}
                className="bg-[#F5F4F0] border border-[#D9DEE3] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#1F252B] border-b border-[#D9DEE3] overflow-hidden">
                    <img
                      src={service.imagePath}
                      alt={service.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-mono text-[#8C6D46] font-semibold">
                      {service.indexNumber}. Residential Scope
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#1F252B]">
                      <Link href={`/services/${service.slug}`} className="hover:text-[#34424F]">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#46525D] leading-relaxed">
                      {service.heroSummary}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-[#D9DEE3] flex items-center justify-between gap-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                  >
                    <span>Explore {service.shortTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/request-estimate?service=${service.slug}`}
                    className="text-xs font-semibold text-[#46525D] hover:text-[#1F252B] underline underline-offset-4"
                  >
                    Request Estimate
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category 2: Commercial Services */}
      <section id="commercial" className="py-16 sm:py-24 bg-[#1F252B] text-[#FFFFFF] border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28] mb-2">
              02. Commercial Construction
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Commercial Tenant Improvements &amp; Interior Build-Outs
            </h2>
            <p className="text-sm sm:text-base text-[#D9DEE3] mt-2">
              Responsive plan review, site coordination, interior framing, drywall assemblies, ceilings, and commercial finishes for offices, retail spaces, and commercial suites.
            </p>
          </div>

          {commercialServices.map((service) => (
            <div
              key={service.slug}
              className="bg-[#34424F]/40 border border-[#46525D] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
            >
              <div className="lg:col-span-5 bg-[#1F252B] border-b lg:border-b-0 lg:border-r border-[#46525D]">
                <img
                  src={service.imagePath}
                  alt={service.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover min-h-[260px]"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
                    {service.indexNumber}. Commercial Scope
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#FFFFFF]">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#D9DEE3] leading-relaxed">
                    {service.heroSummary}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-[#F5F4F0]">
                    {service.typicalScope.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#F28C28] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-[#46525D] flex flex-wrap items-center gap-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
                  >
                    <span>View Commercial TI Capabilities</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/request-estimate?service=${service.slug}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
                  >
                    <span>Discuss a Commercial Project</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category 3: Construction Trades */}
      <section id="trades" className="py-16 sm:py-24 bg-[#F5F4F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              03. Construction Trades
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              Framing, Drywall, Stucco, Roofing &amp; Finish Carpentry
            </h2>
            <p className="text-sm sm:text-base text-[#46525D] mt-2">
              Core building trades performed as part of full general contracting scopes or standalone trade packages subject to project scale and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradeServices.map((trade) => (
              <article
                key={trade.slug}
                className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <p className="text-xs font-mono text-[#8C6D46] font-semibold">
                    {trade.indexNumber}. Construction Trade
                  </p>
                  <h3 className="font-display text-xl font-bold text-[#1F252B]">
                    <Link href={`/services/${trade.slug}`} className="hover:text-[#34424F]">
                      {trade.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#46525D] leading-relaxed">
                    {trade.heroSummary}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#D9DEE3] flex items-center justify-between gap-4">
                  <Link
                    href={`/services/${trade.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                  >
                    <span>Explore {trade.title} Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/request-estimate?service=${trade.slug}`}
                    className="text-xs font-semibold text-[#46525D] hover:text-[#1F252B] underline underline-offset-4"
                  >
                    Request Estimate
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
