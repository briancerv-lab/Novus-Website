import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_DATA, getServiceBySlug } from '@/lib/data/services';
import { PROJECT_ITEMS } from '@/lib/data/projects-and-faqs';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import { buildServiceSchema, buildFAQSchema } from '@/lib/seo/structured-data';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Service Not Found | Novus Construction Inc.',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedProjects = PROJECT_ITEMS.filter(
    (p) => p.serviceSlug === service.slug || p.conciseScope.toLowerCase().includes(service.shortTitle.toLowerCase())
  ).slice(0, 2);

  const serviceSchema = buildServiceSchema(service);
  const faqSchema = buildFAQSchema(service.faqs);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO SECTION */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch pt-2">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D9DEE3]">
                <span className="text-[#F28C28] font-semibold">{service.indexNumber}. {service.category}</span>
                <span aria-hidden="true">·</span>
                <span>Riverside, Jurupa Valley &amp; Southern California</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] leading-[1.1]">
                {service.h1}
              </h1>

              <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
                {service.heroSummary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/request-estimate?service=${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
                >
                  <span>Request an Estimate for {service.shortTitle}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/our-process"
                  className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
                >
                  <span>How We Scope Projects</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[260px] bg-[#34424F] border border-[#46525D] overflow-hidden flex flex-col justify-between">
                <img
                  src={service.imagePath}
                  alt={service.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-[#1F252B] border-t border-[#46525D] text-xs text-[#D9DEE3]">
                  Illustrative Architectural Representation · {service.title} Scope
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR & PROBLEMS ADDRESSED */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <div className="bg-[#F5F4F0] border border-[#D9DEE3] p-6 sm:p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Ideal Project Fit
              </p>
              <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                Who {service.title} Is For
              </h2>
              <ul className="space-y-3 pt-2">
                {service.whoItIsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#34424F] leading-relaxed">
                    <Check className="w-4 h-4 text-[#F28C28] shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F5F4F0] border border-[#D9DEE3] p-6 sm:p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Construction Considerations
              </p>
              <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                What This Service Addresses
              </h2>
              <ul className="space-y-3 pt-2">
                {service.problemsAddressed.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#34424F] leading-relaxed">
                    <Check className="w-4 h-4 text-[#8C6D46] shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TYPICAL SCOPE & SCOPE DRIVERS */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Typical Scope */}
            <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                Written Scope Structure
              </p>
              <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                Typical {service.title} Scope
              </h2>
              <p className="text-xs text-[#46525D]">
                Every proposal is tailored to your plans and site conditions. Typical construction items evaluated for {service.title.toLowerCase()} include:
              </p>
              <ul className="space-y-3 divide-y divide-[#D9DEE3]">
                {service.typicalScope.map((scopeItem, index) => (
                  <li key={scopeItem} className="pt-3 first:pt-0 flex items-start gap-3 text-sm text-[#1F252B]">
                    <span className="font-mono text-xs text-[#8C6D46] font-semibold mt-0.5 tabular-nums">
                      0{index + 1}.
                    </span>
                    <span className="leading-relaxed">{scopeItem}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-[#F5F4F0] border border-[#D9DEE3] text-xs text-[#46525D] leading-relaxed">
                <strong className="text-[#1F252B]">Contract Scope Note:</strong> {service.scopeNote}
              </div>
            </div>

            {/* Scope Drivers */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
                  Budget &amp; Schedule Factors
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                  Key Decisions &amp; Conditions That Drive Project Scope
                </h2>
                <p className="text-sm sm:text-base text-[#46525D] mt-2">
                  Understanding what influences labor, materials, and sequencing helps you plan accurately before construction begins.
                </p>
              </div>

              <div className="space-y-4">
                {service.scopeDrivers.map((driver, idx) => (
                  <div key={driver.factor} className="bg-[#FFFFFF] border border-[#D9DEE3] p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8C6D46] mb-1">
                      <span>Factor 0{idx + 1}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1F252B]">
                      {driver.factor}
                    </h3>
                    <p className="text-sm text-[#46525D] mt-2 leading-relaxed">
                      {driver.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS FOR THIS PROJECT TYPE */}
      <section className="py-16 sm:py-24 bg-[#1F252B] text-[#FFFFFF] border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28] mb-2">
              Project Sequencing
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              How We Execute {service.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D9DEE3] mt-2">
              Clear milestones from initial plan and site evaluation through final walkthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {service.processSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-[#34424F]/40 border border-[#46525D] p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F28C28]">
                    Phase {step.stepNumber}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#FFFFFF] mt-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D9DEE3] mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPRESENTATIVE SCOPE EVIDENCE */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#D9DEE3]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1">
                  Illustrative Scope Studies
                </p>
                <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                  Related {service.shortTitle} Scope Examples
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
              >
                <span>View All Scope Studies</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-[#F5F4F0] border border-[#D9DEE3] p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#46525D]">
                      <span className="font-mono uppercase text-[#8C6D46]">Illustrative Scope Study</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.city}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1F252B]">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#46525D] leading-relaxed">
                      {project.conciseScope}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46]"
                  >
                    <span>Read Full Scope Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE FAQS & RELATED SERVICES */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-1">
                  Common Questions
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
                  {service.title} FAQs
                </h2>
              </div>
              <FAQAccordion items={service.faqs} idPrefix={`faq-${service.slug}`} />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                  Complementary Capabilities
                </p>
                <h2 className="font-display text-xl font-bold text-[#1F252B]">
                  Related Construction Services
                </h2>
                <div className="divide-y divide-[#D9DEE3]">
                  {relatedServices.map((rel) => (
                    <div key={rel.slug} className="py-3.5 first:pt-0 last:pb-0">
                      <Link
                        href={`/services/${rel.slug}`}
                        className="group flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-display text-sm font-bold text-[#1F252B] group-hover:text-[#8C6D46] transition-colors">
                            {rel.title}
                          </p>
                          <p className="text-xs text-[#46525D] line-clamp-1 mt-0.5">
                            {rel.heroSummary}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#46525D] group-hover:text-[#1F252B] shrink-0" aria-hidden="true" />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#D9DEE3]">
                  <Link
                    href="/service-areas"
                    className="text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46] underline underline-offset-4"
                  >
                    View Riverside, Jurupa Valley &amp; SoCal Service Areas →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUSED ESTIMATE CTA WITH SERVICE PRESELECTED */}
      <section className="py-16 sm:py-20 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Next Step for Your Project
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#FFFFFF]">
              Planning a {service.title} Project in Southern California?
            </h2>
            <p className="text-base text-[#D9DEE3] leading-relaxed">
              Share your location, project stage, and scope goals. We will preselect {service.title} in our estimate request flow so you can tell us about your project in just a few minutes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/request-estimate?service=${service.slug}`}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
              >
                <span>Request an Estimate for {service.shortTitle}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                <span>Browse All 11 Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
