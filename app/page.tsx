import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG, canDisplayPublicLicense } from '@/lib/config/business';
import { getFeaturedHomeServices, getTradeServices } from '@/lib/data/services';
import {
  PROJECT_ITEMS,
  WHY_NOVUS_COMMITMENTS,
  CORE_PROCESS_STEPS,
  HOMEPAGE_FAQS,
} from '@/lib/data/projects-and-faqs';
import FAQAccordion from '@/components/FAQAccordion';
import { buildFAQSchema } from '@/lib/seo/structured-data';

export default function HomePage() {
  const featuredServices = getFeaturedHomeServices();
  const tradeServices = getTradeServices();
  const previewProjects = PROJECT_ITEMS.slice(0, 3);
  const showLicense = canDisplayPublicLicense();
  const faqSchema = buildFAQSchema(HOMEPAGE_FAQS);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* SECTION B: HERO */}
      <section className="relative bg-[#1F252B] text-[#FFFFFF] overflow-hidden border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#D9DEE3]">
                <span className="text-[#F28C28] font-semibold">Southern California General Contracting</span>
                <span aria-hidden="true">·</span>
                <span>Riverside, Jurupa Valley &amp; the Inland Empire</span>
              </div>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold tracking-tight text-[#FFFFFF] leading-[1.08] max-w-2xl">
                Southern California Construction.{' '}
                <span className="block text-[#F5F4F0]">Built with Precision.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed max-w-2xl">
                From ADUs and home additions to complete remodels and commercial tenant improvements, Novus Construction Inc. helps bring well-planned spaces to life.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/request-estimate"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Request an Estimate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href={BUSINESS_CONFIG.credentials.hasRealApprovedProjects ? '/projects' : '/services'}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] hover:bg-[#34424F]/50 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>
                    {BUSINESS_CONFIG.credentials.hasRealApprovedProjects ? 'View Our Work' : 'Explore Our Services'}
                  </span>
                </Link>
              </div>
            </div>

            {/* Hero Architectural Visual Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative h-full min-h-[300px] sm:min-h-[360px] bg-[#34424F] border border-[#46525D] overflow-hidden flex flex-col justify-end">
                <img
                  src="/images/hero-socal-architecture.svg"
                  alt="Southern California modern residential construction and detached ADU architectural elevation"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 bg-gradient-to-t from-[#1F252B] via-[#1F252B]/80 to-transparent p-5 sm:p-6 pt-16">
                  <p className="text-xs font-mono text-[#F28C28] tracking-wide uppercase">
                    Residential &amp; Commercial Execution
                  </p>
                  <p className="text-sm text-[#F5F4F0] mt-1 font-medium">
                    ADUs · Structural Additions · Whole-Home Remodels · Commercial Build-Outs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: EARLY TRUST STRIP */}
      <section aria-label="Core Capabilities Summary" className="bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#D9DEE3]">
            <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
              <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">Project Scope</p>
              <p className="text-sm font-semibold text-[#1F252B] mt-0.5">Residential &amp; Commercial</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">Documentation</p>
              <p className="text-sm font-semibold text-[#1F252B] mt-0.5">Detailed Project Scopes</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">Service Region</p>
              <p className="text-sm font-semibold text-[#1F252B] mt-0.5">Southern California</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                {showLicense ? 'Verified Licensing' : 'Trade Execution'}
              </p>
              <p className="text-sm font-semibold text-[#1F252B] mt-0.5">
                {showLicense
                  ? `CSLB #${BUSINESS_CONFIG.license.rawInputNumber}`
                  : 'Structural & Finish Trades'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: TWO CLEAR AUDIENCE PATHS */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              Tailored Project Paths
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              Dedicated Execution for Residential &amp; Commercial Properties
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Path 1: Residential */}
            <div className="bg-[#FFFFFF] border border-[#D9DEE3] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] bg-[#1F252B] border-b border-[#D9DEE3] overflow-hidden">
                  <img
                    src="/images/residential-remodel.svg"
                    alt="Southern California custom residential kitchen and living space remodel"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                    For Homeowners &amp; Property Investors
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F252B]">
                    Build or Improve Your Home
                  </h3>
                  <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                    Whether you are adding a backyard ADU, expanding your home’s footprint with a structural addition, or remodeling your kitchen, bathrooms, and living areas, we coordinate each phase with clear documentation and respect for your property.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#34424F] font-medium">
                    <span>ADU Construction</span>
                    <span aria-hidden="true">·</span>
                    <span>Home Additions</span>
                    <span aria-hidden="true">·</span>
                    <span>Full Home Remodels</span>
                    <span aria-hidden="true">·</span>
                    <span>Kitchens &amp; Bathrooms</span>
                  </div>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-[#D9DEE3]/60 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/services#residential"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap"
                >
                  <span>Explore Residential Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/request-estimate?service=adu-construction"
                  className="text-xs font-semibold text-[#46525D] hover:text-[#1F252B] underline underline-offset-4 whitespace-nowrap"
                >
                  Start a Residential Estimate
                </Link>
              </div>
            </div>

            {/* Path 2: Commercial */}
            <div className="bg-[#FFFFFF] border border-[#D9DEE3] flex flex-col justify-between">
              <div>
                <div className="aspect-[16/9] bg-[#1F252B] border-b border-[#D9DEE3] overflow-hidden">
                  <img
                    src="/images/commercial-buildout.svg"
                    alt="Southern California commercial tenant improvement office and retail build-out"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
                    For Business Owners, Tenants &amp; Property Managers
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F252B]">
                    Build Out Your Commercial Space
                  </h3>
                  <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                    We execute commercial tenant improvements and interior build-outs from approved plans—coordinating selective demolition, interior partitions, drywall assemblies, acoustical ceilings, doors, hardware, and crisp commercial finishes.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#34424F] font-medium">
                    <span>Tenant Improvements</span>
                    <span aria-hidden="true">·</span>
                    <span>Suite Reconfigurations</span>
                    <span aria-hidden="true">·</span>
                    <span>Partitions &amp; Ceilings</span>
                    <span aria-hidden="true">·</span>
                    <span>Commercial Doors &amp; Finish</span>
                  </div>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-[#D9DEE3]/60 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/request-estimate?service=commercial-tenant-improvements"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap"
                >
                  <span>Discuss a Commercial Project</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/commercial-tenant-improvements"
                  className="text-xs font-semibold text-[#46525D] hover:text-[#1F252B] underline underline-offset-4 whitespace-nowrap"
                >
                  Commercial TI Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURED SERVICES (6 CARDS) + CONSTRUCTION TRADES (5 ITEMS) */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
                Core Capabilities
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Featured Construction &amp; Remodeling Services
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] mt-2">
                Structured general contracting for major residential investments and commercial interior build-outs.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap shrink-0"
            >
              <span>View All 11 Services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* 6 Featured Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
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
                    <div className="flex items-center gap-2 text-xs text-[#46525D]">
                      <span className="font-mono text-[#8C6D46] font-semibold">{service.indexNumber}.</span>
                      <span>{service.category}</span>
                    </div>
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
                <div className="px-6 pb-6 pt-3 border-t border-[#D9DEE3] flex items-center justify-between gap-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap"
                  >
                    <span>Explore {service.shortTitle} Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Compact Construction Trades Subsection (5 Trades) */}
          <div className="mt-16 pt-12 border-t border-[#D9DEE3]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1">
                  Self-Performed &amp; Coordinated Trades
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F252B]">
                  Essential Construction Trades
                </h3>
              </div>
              <p className="text-sm text-[#46525D] max-w-md">
                Strong trade execution across framing, wall assemblies, exterior envelopes, and finish millwork keeps quality consistent from the studs out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {tradeServices.map((trade) => (
                <Link
                  key={trade.slug}
                  href={`/services/${trade.slug}`}
                  className="p-5 bg-[#F5F4F0] border border-[#D9DEE3] hover:border-[#1F252B] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <p className="text-xs font-mono text-[#8C6D46] mb-1">{trade.indexNumber}. Trade Scope</p>
                    <h4 className="font-display text-base font-bold text-[#1F252B] group-hover:text-[#34424F]">
                      {trade.title}
                    </h4>
                    <p className="text-xs text-[#46525D] mt-2 leading-relaxed line-clamp-3">
                      {trade.heroSummary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F252B] mt-4 pt-3 border-t border-[#D9DEE3]">
                    <span>View {trade.title} Details</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: PROJECT EVIDENCE */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
                Project Scope Evidence
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Representative Construction Scopes &amp; Sequencing
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] mt-2">
                Explore how we structure project scopes, site logistics, and trade handoffs across Southern California residential and commercial work.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap shrink-0"
            >
              <span>View All Scope Studies</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {!BUSINESS_CONFIG.credentials.hasRealApprovedProjects && (
            <div className="mb-8 p-4 bg-[#FFFFFF] border border-[#D9DEE3] text-xs text-[#46525D]">
              <strong className="text-[#1F252B]">Note on Illustrative Scope Previews:</strong> While owner-approved photography of completed Novus Construction Inc. jobsites is being prepared for publication, the cards below use architectural illustrations to demonstrate typical project scopes, site considerations, and phasing.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewProjects.map((project) => (
              <article
                key={project.slug}
                className="bg-[#FFFFFF] border border-[#D9DEE3] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#1F252B] border-b border-[#D9DEE3] overflow-hidden">
                    <img
                      src={project.imagePath}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {project.isIllustrativePreview && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1F252B]/95 via-[#1F252B]/75 to-transparent px-4 pt-6 pb-2.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5F4F0]">
                          Illustrative Scope Preview
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#46525D]">
                      <span className="font-semibold text-[#8C6D46]">{project.projectTypeLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.city}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1F252B]">
                      <Link href={`/projects/${project.slug}`} className="hover:text-[#34424F]">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#46525D] leading-relaxed">
                      {project.conciseScope}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#D9DEE3]/60">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                  >
                    <span>Review Scope Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: WHY NOVUS */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Why Novus Construction Inc.
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F252B]">
                Confidence Comes From the Details.
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                A successful build is the result of clear written scopes, disciplined trade coordination, and respect for structural and finish tolerances before, during, and after construction.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                >
                  <span>Learn More About Our Standards</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#D9DEE3] border-y border-[#D9DEE3]">
              {WHY_NOVUS_COMMITMENTS.map((item) => (
                <div key={item.number} className="py-6 first:pt-6 last:pb-6 flex items-start gap-5">
                  <span className="font-mono text-sm font-semibold text-[#8C6D46] tabular-nums shrink-0 mt-0.5">
                    {item.number}.
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1F252B]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#46525D] mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: CONSTRUCTION PROCESS */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
                How We Work
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Five Steps From Initial Inquiry to Project Closeout
              </h2>
            </div>
            <Link
              href="/our-process"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap shrink-0"
            >
              <span>Read Full Process Guide</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {CORE_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F28C28] uppercase tracking-wider">
                    Step {step.step}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#1F252B] mt-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#46525D] mt-2.5 leading-relaxed">
                    {step.summary}
                  </p>
                </div>
                <p className="text-xs text-[#34424F] font-medium mt-4 pt-3 border-t border-[#D9DEE3]">
                  Outcome: {step.deliverable}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#46525D]">
            Note: Architectural design responsibilities, structural engineering, municipal permits, material selections, and specialized trade scopes are defined by each individual project agreement.
          </p>
        </div>
      </section>

      {/* SECTION I: COMMERCIAL CAPABILITY FEATURE */}
      <section className="py-16 sm:py-24 bg-[#1F252B] text-[#FFFFFF] border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
                Commercial Construction &amp; Tenant Improvements
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF]">
                Organized Tenant Improvements &amp; Commercial Suite Build-Outs
              </h2>
              <p className="text-sm sm:text-base text-[#D9DEE3] leading-relaxed">
                Commercial projects require strict adherence to architectural drawings, coordination with property management, and reliable execution of interior framing, drywall assemblies, ceilings, doors, and commercial finishes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#34424F]/50 border border-[#46525D]">
                  <h3 className="font-display text-sm font-bold text-[#FFFFFF]">
                    Plan Review &amp; Scope Coordination
                  </h3>
                  <p className="text-xs text-[#D9DEE3] mt-1 leading-relaxed">
                    We evaluate architectural TI plans, inspect existing plenum and slab conditions, and prepare clear division-by-division proposals.
                  </p>
                </div>
                <div className="p-4 bg-[#34424F]/50 border border-[#46525D]">
                  <h3 className="font-display text-sm font-bold text-[#FFFFFF]">
                    Partitions, Finishes &amp; Sequencing
                  </h3>
                  <p className="text-xs text-[#D9DEE3] mt-1 leading-relaxed">
                    From metal or wood stud framing and rated drywall to acoustical ceilings, commercial doors, and trim, we sequence work around site rules.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/request-estimate?service=commercial-tenant-improvements"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
                >
                  <span>Discuss a Commercial Project</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/commercial-tenant-improvements"
                  className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
                >
                  <span>Explore Commercial TI Scope</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#34424F] border border-[#46525D] overflow-hidden">
                <img
                  src="/images/commercial-buildout.svg"
                  alt="Commercial office and retail suite interior build-out with glass partitions and acoustic ceilings"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-5 bg-[#1F252B] border-t border-[#46525D] text-xs text-[#D9DEE3]">
                  Office Suites · Retail Storefronts · Medical &amp; Professional Build-Outs · White-Box Preparation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J: REVIEWS (Strictly gated until verified owner-approved reviews are supplied) */}
      {BUSINESS_CONFIG.credentials.reviewsVerified &&
        BUSINESS_CONFIG.credentials.approvedReviews.length > 0 && (
          <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B] mb-8">
                Verified Client Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BUSINESS_CONFIG.credentials.approvedReviews.map((review) => (
                  <blockquote key={review.id} className="p-6 bg-[#F5F4F0] border border-[#D9DEE3]">
                    <p className="text-sm text-[#1F252B] leading-relaxed">“{review.quote}”</p>
                    <footer className="mt-4 text-xs text-[#46525D]">
                      <strong className="text-[#1F252B]">{review.authorName}</strong> · {review.projectType} ({review.city})
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* SECTION K: LOCAL SERVICE-AREA SECTION */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                <MapPin className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                <span>Local Service Coverage</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Focused on Riverside, Jurupa Valley &amp; the Inland Empire
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                {BUSINESS_CONFIG.serviceArea.availabilityNote}
              </p>
              <div className="pt-2">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                >
                  <span>View Full Southern California Service Area Guide</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#F5F4F0] border border-[#D9DEE3] p-6 sm:p-8">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#1F252B] font-semibold mb-4 pb-3 border-b border-[#D9DEE3]">
                  Primary Inland Empire &amp; Surrounding Communities Served
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-[#34424F]">
                  {BUSINESS_CONFIG.serviceArea.confirmedCities.map((city) => (
                    <div key={city.name} className="font-medium text-[#1F252B]">
                      {city.name}, CA
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#46525D] mt-6 pt-4 border-t border-[#D9DEE3]">
                  Planning a project in a neighboring Southern California community? Include your city or ZIP code in our estimate request form so we can confirm scope and schedule fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION L: HELPFUL FAQS */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Project Planning Questions
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#46525D] leading-relaxed">
                Straightforward answers about how we evaluate scopes, work with plans and permits, and coordinate residential and commercial construction.
              </p>
            </div>

            <div className="lg:col-span-8">
              <FAQAccordion items={HOMEPAGE_FAQS} idPrefix="home-faq" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION M: FINAL CONVERSION SECTION */}
      <section className="py-16 sm:py-24 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Start the Conversation
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
              Let’s Talk About What You’re Building.
            </h2>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              Sharing your project type, city, current planning stage, and scope goals helps our team evaluate fit and prepare for a productive conversation about next steps.
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
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                <span>Contact Information</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
