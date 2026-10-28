import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { PROJECT_ITEMS } from '@/lib/data/projects-and-faqs';
import Breadcrumbs from '@/components/Breadcrumbs';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

function findProjectBySlug(rawSlug: string) {
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase().replace(/\s+/g, '-');
  return PROJECT_ITEMS.find(
    (p) => p.slug.toLowerCase().replace(/\s+/g, '-') === normalized || p.slug === rawSlug
  );
}

export async function generateStaticParams() {
  return PROJECT_ITEMS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Novus Construction Inc.',
    };
  }

  return {
    title: `${project.title} | Novus Construction Inc.`,
    description: project.conciseScope,
    // Keep illustrative case studies out of search indexes per Section 12
    robots: project.isIllustrativePreview
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: project.title, path: `/projects/${project.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-2">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D9DEE3]">
                <span className="text-[#F28C28] font-semibold">{project.projectTypeLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{project.city}</span>
                {project.isIllustrativePreview && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase">Illustrative Scope Study</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#FFFFFF] leading-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
                {project.conciseScope}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/request-estimate?service=${project.serviceSlug}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
                >
                  <span>Request Estimate for a Similar Scope</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/services/${project.serviceSlug}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#FFFFFF] border border-[#D9DEE3]/40 hover:border-[#FFFFFF] transition-colors whitespace-nowrap"
                >
                  <span>View Related Service Page</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#34424F] border border-[#46525D] overflow-hidden">
                <img
                  src={project.imagePath}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                />
                {project.isIllustrativePreview && (
                  <div className="p-4 bg-[#1F252B] border-t border-[#46525D] text-xs text-[#D9DEE3]">
                    Illustrative Architectural Representation · Excluded from search indexing until replaced by owner-approved jobsite photography.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                01. Project Objective
              </p>
              <h2 className="font-display text-xl font-bold text-[#1F252B]">
                Client Goal
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                {project.clientGoal}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                02. Pre-Construction Context
              </p>
              <h2 className="font-display text-xl font-bold text-[#1F252B]">
                Initial Site &amp; Building Conditions
              </h2>
              <p className="text-sm sm:text-base text-[#46525D] leading-relaxed">
                {project.initialConditions}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FFFFFF] border border-[#D9DEE3] space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                03. Sequenced Work Breakdown
              </p>
              <h2 className="font-display text-2xl font-bold text-[#1F252B]">
                Construction Scope Breakdown
              </h2>
              <ul className="space-y-3 pt-2">
                {project.actualScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#34424F] leading-relaxed">
                    <Check className="w-4 h-4 text-[#F28C28] shrink-0 mt-1" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]">
                  04. Field Coordination
                </p>
                <h2 className="font-display text-xl font-bold text-[#1F252B] mt-1">
                  Key Construction Considerations
                </h2>
                <ul className="space-y-3 mt-4">
                  {project.constructionConsiderations.map((item) => (
                    <li key={item} className="text-sm text-[#46525D] leading-relaxed border-b border-[#D9DEE3] pb-3 last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D9DEE3]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1F252B]">
                  Scope Takeaway
                </p>
                <p className="text-xs sm:text-sm text-[#46525D] mt-1.5 leading-relaxed">
                  {project.outcomeSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
