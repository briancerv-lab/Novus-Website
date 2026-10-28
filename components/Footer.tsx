'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, canDisplayPublicLicense, hasVerifiedPhone } from '@/lib/config/business';
import { getServicesByCategory } from '@/lib/data/services';
import { trackNovusEvent } from '@/lib/analytics';

export default function Footer() {
  const residentialServices = getServicesByCategory('Residential');
  const commercialServices = getServicesByCategory('Commercial');
  const tradeServices = getServicesByCategory('Construction Trades');

  const showLicense = canDisplayPublicLicense();
  const showPhone = hasVerifiedPhone();

  const socialEntries = [
    { label: 'Instagram', url: BUSINESS_CONFIG.socialLinks.instagram },
    { label: 'TikTok', url: BUSINESS_CONFIG.socialLinks.tiktok },
    { label: 'Facebook', url: BUSINESS_CONFIG.socialLinks.facebook },
    { label: 'Houzz', url: BUSINESS_CONFIG.socialLinks.houzz },
  ].filter((item) => Boolean(item.url && item.url.trim().length > 0));

  return (
    <footer className="bg-[#1F252B] text-[#F5F4F0] border-t border-[#34424F] pb-20 sm:pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#34424F]">
          {/* Column 1: Brand & Verified Contact */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight text-[#FFFFFF] inline-block"
            >
              NOVUS CONSTRUCTION INC.
            </Link>
            <p className="text-sm text-[#D9DEE3] leading-relaxed max-w-sm">
              Residential and commercial general contracting across Southern California. Organized scopes, careful trade coordination, and durable workmanship.
            </p>

            <div className="pt-2 space-y-2.5 text-sm text-[#D9DEE3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  {BUSINESS_CONFIG.contact.publicAddress && (
                    <p className="text-[#FFFFFF] font-medium">
                      {BUSINESS_CONFIG.contact.publicAddress.streetAddress},{' '}
                      {BUSINESS_CONFIG.contact.publicAddress.addressLocality},{' '}
                      {BUSINESS_CONFIG.contact.publicAddress.addressRegion}{' '}
                      {BUSINESS_CONFIG.contact.publicAddress.postalCode}
                    </p>
                  )}
                  <p className="text-xs text-[#D9DEE3] mt-0.5">
                    Primary Focus: {BUSINESS_CONFIG.serviceArea.primaryFocusLabel} · Serving {BUSINESS_CONFIG.serviceArea.broaderRegionLabel}
                  </p>
                </div>
              </div>

              {showPhone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F28C28] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneE164}`}
                    onClick={() => trackNovusEvent('phone_click', { cta_location: 'footer' })}
                    className="font-semibold text-[#FFFFFF] hover:text-[#F28C28] transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              )}

              {BUSINESS_CONFIG.contact.emailConfirmedForPublicDisplay && BUSINESS_CONFIG.contact.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F28C28] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                    onClick={() => trackNovusEvent('email_click', { cta_location: 'footer' })}
                    className="hover:text-[#FFFFFF] underline underline-offset-4 decoration-[#46525D] hover:decoration-[#F28C28] transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.email}
                  </a>
                </div>
              )}

              {showLicense && (
                <div className="pt-2 space-y-1 text-xs text-[#D9DEE3]">
                  <p className="font-semibold text-[#FFFFFF]">
                    CSLB License #{BUSINESS_CONFIG.license.rawInputNumber} · {BUSINESS_CONFIG.license.confirmedClassification} ({BUSINESS_CONFIG.license.confirmedStatus})
                  </p>
                  {BUSINESS_CONFIG.credentials.insuranceVerified && (
                    <p>{BUSINESS_CONFIG.credentials.insuranceSummary}</p>
                  )}
                  {BUSINESS_CONFIG.credentials.bondingVerified && (
                    <p>{BUSINESS_CONFIG.credentials.bondingSummary}</p>
                  )}
                </div>
              )}

              {socialEntries.length > 0 && (
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FFFFFF]">
                  {socialEntries.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#F28C28] transition-colors"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#F28C28]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Residential & Commercial Services */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F28C28]">
              Residential &amp; Commercial
            </h2>
            <ul className="space-y-2 text-sm text-[#D9DEE3]">
              {residentialServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-[#FFFFFF] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
              {commercialServices.map((service) => (
                <li key={service.slug} className="pt-1">
                  <Link href={`/services/${service.slug}`} className="hover:text-[#FFFFFF] font-medium text-[#FFFFFF] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Construction Trades */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F28C28]">
              Construction Trades
            </h2>
            <ul className="space-y-2 text-sm text-[#D9DEE3]">
              {tradeServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-[#FFFFFF] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-xs font-semibold text-[#F28C28] hover:underline">
                  All 11 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Project Resources */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F28C28]">
              Company &amp; Planning
            </h2>
            <ul className="space-y-2 text-sm text-[#D9DEE3]">
              <li>
                <Link href="/request-estimate" className="hover:text-[#FFFFFF] font-semibold text-[#FFFFFF] inline-flex items-center gap-1">
                  <span>Request an Estimate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F28C28]" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#FFFFFF] transition-colors">
                  Projects &amp; Scope Studies
                </Link>
              </li>
              <li>
                <Link href="/our-process" className="hover:text-[#FFFFFF] transition-colors">
                  Our Construction Process
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] transition-colors">
                  About Novus Construction Inc.
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-[#FFFFFF] transition-colors">
                  Southern California Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">
                  Contact &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#D9DEE3]/80">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.businessName} All rights reserved. Project scopes, engineering, permits, and schedules are governed by written project agreements.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/privacy-policy" className="hover:text-[#FFFFFF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#FFFFFF] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
