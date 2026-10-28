import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { SERVICES_DATA } from '@/lib/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Southern California Service Areas | Riverside, Jurupa Valley & Inland Empire | Novus Construction Inc.',
  description:
    'Novus Construction Inc. serves Riverside, Jurupa Valley, Corona, Norco, Eastvale, Ontario, Rancho Cucamonga, the Inland Empire, and select Southern California communities.',
  alternates: {
    canonical: '/service-areas',
  },
};

export default function ServiceAreasPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Service Areas', path: '/service-areas' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Regional Operations &amp; Coverage
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              Serving Riverside, Jurupa Valley, the Inland Empire &amp; Southern California
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              {BUSINESS_CONFIG.serviceArea.availabilityNote}
            </p>
          </div>
        </div>
      </section>

      {/* Primary Local Communities Grid */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              Primary Operating Area
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              Inland Empire &amp; Surrounding Communities
            </h2>
            <p className="text-sm sm:text-base text-[#46525D] mt-2">
              We regularly evaluate residential and commercial construction scopes across these communities without implying physical branch offices in individual cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_CONFIG.serviceArea.confirmedCities.map((city) => (
              <div
                key={city.name}
                className="bg-[#F5F4F0] border border-[#D9DEE3] p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#46525D]">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#8C6D46]">
                      <MapPin className="w-3.5 h-3.5 text-[#F28C28]" aria-hidden="true" />
                      <span>{city.county}</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1F252B]">
                    {city.name}, CA
                  </h3>
                  <p className="text-sm text-[#46525D] leading-relaxed">
                    {city.focusNote}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9DEE3]">
                  <Link
                    href="/request-estimate"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                  >
                    <span>Request Estimate in {city.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Evaluate Broader Southern California Projects */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Regional Project Evaluation
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Broader Southern California Projects
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                For larger-scope projects—such as full-home renovations, ground-up ADUs, structural additions, or commercial tenant improvements—in neighboring parts of Orange County, Los Angeles County, or San Bernardino and Riverside counties, we evaluate mobilization based on project scale, current schedule availability, and trade logistics.
              </p>
              <div className="p-5 bg-[#FFFFFF] border border-[#D9DEE3] space-y-2">
                <h3 className="font-display text-base font-bold text-[#1F252B]">
                  Counties Considered by Project Scope
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#34424F] pt-1">
                  {BUSINESS_CONFIG.serviceArea.countiesServed.map((county) => (
                    <li key={county} className="flex items-center gap-2">
                      <span className="text-[#F28C28] font-bold">·</span>
                      <span>{county}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Available Across Our Service Area
              </p>
              <h2 className="font-display text-xl font-bold text-[#1F252B]">
                Services Provided Across Southern California
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_DATA.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="p-3 bg-[#F5F4F0] border border-[#D9DEE3] hover:border-[#1F252B] transition-colors flex items-center justify-between text-xs font-semibold text-[#1F252B]"
                  >
                    <span>{service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C6D46]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Check Availability for Your City &amp; Project Scope
            </h2>
            <p className="text-base text-[#D9DEE3] leading-relaxed">
              Enter your city or ZIP code in Step 1 of our estimate form and tell us about the work you are planning.
            </p>
            <div className="pt-2">
              <Link
                href="/request-estimate"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
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
