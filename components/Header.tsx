'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, hasVerifiedPhone } from '@/lib/config/business';
import { getServicesByCategory } from '@/lib/data/services';
import { trackNovusEvent } from '@/lib/analytics';

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  const residentialServices = getServicesByCategory('Residential');
  const commercialServices = getServicesByCategory('Commercial');
  const tradeServices = getServicesByCategory('Construction Trades');
  const showPhone = hasVerifiedPhone();

  // Close menus on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (servicesOpen) {
          setServicesOpen(false);
          servicesButtonRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen, mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            href="/"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1F252B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28]"
          >
            NOVUS CONSTRUCTION INC.
          </Link>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#34424F]">
            <div className="relative" ref={dropdownRef}>
              <button
                ref={servicesButtonRef}
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1.5 py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1F252B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28] ${
                  pathname.startsWith('/services') ? 'text-[#1F252B] font-semibold' : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${servicesOpen ? 'rotate-180 text-[#F28C28]' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {servicesOpen && (
                <div
                  role="region"
                  aria-label="All Construction Services"
                  className="absolute left-0 top-full mt-2 w-[720px] bg-[#FFFFFF] border border-[#D9DEE3] shadow-lg p-6 grid grid-cols-3 gap-6 z-50"
                >
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#8C6D46] mb-3 pb-2 border-b border-[#D9DEE3]">
                      Residential
                    </p>
                    <ul className="space-y-2">
                      {residentialServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block py-1 text-sm text-[#34424F] hover:text-[#1F252B] hover:translate-x-0.5 transition-all"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#8C6D46] mb-3 pb-2 border-b border-[#D9DEE3]">
                      Commercial
                    </p>
                    <ul className="space-y-2 mb-6">
                      {commercialServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block py-1 text-sm text-[#34424F] hover:text-[#1F252B] hover:translate-x-0.5 transition-all"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="p-3.5 bg-[#F5F4F0] border border-[#D9DEE3]">
                      <p className="text-xs font-semibold text-[#1F252B] mb-1">Need a Commercial TI Bid?</p>
                      <p className="text-xs text-[#46525D] mb-2.5 leading-relaxed">
                        Share your architectural suite plans or scope requirements.
                      </p>
                      <Link
                        href="/request-estimate?service=commercial-tenant-improvements"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap"
                      >
                        <span>Discuss Commercial Project</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#8C6D46] mb-3 pb-2 border-b border-[#D9DEE3]">
                      Construction Trades
                    </p>
                    <ul className="space-y-2 mb-4">
                      {tradeServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block py-1 text-sm text-[#34424F] hover:text-[#1F252B] hover:translate-x-0.5 transition-all"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] pt-2 border-t border-[#D9DEE3] hover:text-[#8C6D46] w-full"
                    >
                      <span>View All 11 Services</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className={`py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1F252B] ${
                pathname.startsWith('/projects') ? 'text-[#1F252B] font-semibold underline underline-offset-8 decoration-[#F28C28] decoration-2' : ''
              }`}
            >
              Projects
            </Link>

            <Link
              href="/our-process"
              className={`py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1F252B] ${
                pathname === '/our-process' ? 'text-[#1F252B] font-semibold underline underline-offset-8 decoration-[#F28C28] decoration-2' : ''
              }`}
            >
              Our Process
            </Link>

            <Link
              href="/about"
              className={`py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1F252B] ${
                pathname === '/about' ? 'text-[#1F252B] font-semibold underline underline-offset-8 decoration-[#F28C28] decoration-2' : ''
              }`}
            >
              About
            </Link>

            <Link
              href="/service-areas"
              className={`py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#1F252B] ${
                pathname === '/service-areas' ? 'text-[#1F252B] font-semibold underline underline-offset-8 decoration-[#F28C28] decoration-2' : ''
              }`}
            >
              Service Areas
            </Link>
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {showPhone && (
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneE164}`}
                onClick={() => trackNovusEvent('phone_click', { cta_location: 'header' })}
                className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            )}

            <Link
              href="/request-estimate"
              onClick={() => trackNovusEvent('service_cta_click', { cta_location: 'header_primary' })}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F252B]"
            >
              Request an Estimate
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#1F252B] border border-[#D9DEE3] bg-[#F5F4F0] hover:bg-[#EAE8E1] focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Accessible Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="lg:hidden bg-[#FFFFFF] border-b border-[#D9DEE3] px-4 pt-4 pb-8 max-h-[82vh] overflow-y-auto"
          >
            <div className="space-y-6">
              <div>
                <Link
                  href="/services"
                  className="block text-base font-bold text-[#1F252B] py-2 border-b border-[#D9DEE3]"
                >
                  All Construction Services
                </Link>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1.5">
                      Residential
                    </p>
                    <ul className="space-y-1">
                      {residentialServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block py-1.5 text-sm text-[#34424F] hover:text-[#1F252B]"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1.5">
                      Commercial
                    </p>
                    <ul className="space-y-1">
                      {commercialServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block py-1.5 text-sm text-[#34424F] hover:text-[#1F252B]"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1.5">
                      Construction Trades
                    </p>
                    <ul className="space-y-1">
                      {tradeServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block py-1.5 text-sm text-[#34424F] hover:text-[#1F252B]"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D9DEE3]">
                <Link href="/projects" className="py-2.5 text-sm font-semibold text-[#1F252B]">
                  Projects
                </Link>
                <Link href="/our-process" className="py-2.5 text-sm font-semibold text-[#1F252B]">
                  Our Process
                </Link>
                <Link href="/about" className="py-2.5 text-sm font-semibold text-[#1F252B]">
                  About Novus
                </Link>
                <Link href="/service-areas" className="py-2.5 text-sm font-semibold text-[#1F252B]">
                  Service Areas
                </Link>
                <Link href="/contact" className="py-2.5 text-sm font-semibold text-[#1F252B]">
                  Contact Us
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/request-estimate"
                  className="flex items-center justify-center w-full py-3 min-h-[48px] text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b]"
                >
                  Request an Estimate
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Sticky Mobile Bottom Action Bar (Hidden on /request-estimate so it never covers form controls; compact <= 56px height) */}
      {pathname !== '/request-estimate' && (
        <div
          role="region"
          aria-label="Quick Project Actions"
          className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1F252B] border-t border-[#34424F] px-3 py-2 flex items-center gap-2"
        >
          {showPhone && (
            <a
              href={`tel:${BUSINESS_CONFIG.contact.phoneE164}`}
              onClick={() => trackNovusEvent('phone_click', { cta_location: 'mobile_sticky_bar' })}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 text-xs font-semibold text-[#FFFFFF] border border-[#46525D] whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#F28C28]" aria-hidden="true" />
              <span>Call</span>
            </a>
          )}
          <Link
            href="/request-estimate"
            onClick={() => trackNovusEvent('service_cta_click', { cta_location: 'mobile_sticky_bar' })}
            className="flex-1 inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-semibold text-[#1F252B] bg-[#F28C28] whitespace-nowrap"
          >
            Request Estimate
          </Link>
        </div>
      )}
    </>
  );
}
