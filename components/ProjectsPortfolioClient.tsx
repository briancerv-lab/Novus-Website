'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  PROJECT_ITEMS,
  ProjectFilterCategory,
} from '@/lib/data/projects-and-faqs';
import { trackNovusEvent } from '@/lib/analytics';

const FILTER_CATEGORIES: ProjectFilterCategory[] = [
  'All',
  'ADU & Additions',
  'Interior Remodels',
  'Commercial',
  'Trades & Structural',
];

export default function ProjectsPortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilterCategory>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECT_ITEMS
      : PROJECT_ITEMS.filter((item) => item.filterCategory === selectedCategory);

  return (
    <div>
      {/* Interactive Segmented Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#D9DEE3]">
        <div
          role="group"
          aria-label="Filter project scope studies by category"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F5F4F0] border border-[#D9DEE3]"
        >
          {FILTER_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isActive}
                className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1F252B] text-[#FFFFFF]'
                    : 'text-[#34424F] hover:text-[#1F252B] hover:bg-[#FFFFFF]/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="text-xs font-mono tabular-nums text-[#46525D]" aria-live="polite">
          Showing {filteredProjects.length} of {PROJECT_ITEMS.length} scope studies
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-[#FFFFFF] border border-[#D9DEE3] flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[4/3] bg-[#1F252B] overflow-hidden border-b border-[#D9DEE3]">
                <img
                  src={project.imagePath}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {project.isIllustrativePreview && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1F252B]/95 via-[#1F252B]/75 to-transparent px-4 pt-6 pb-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#F5F4F0]">
                      Illustrative Scope Study · Sample Representation
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                {/* Clean unboxed metadata with typographic separators (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#46525D]">
                  <span className="font-semibold text-[#8C6D46]">{project.projectTypeLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.city}</span>
                </div>

                <h2 className="font-display text-lg font-bold text-[#1F252B] leading-snug">
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={() =>
                      trackNovusEvent('project_view', {
                        project_slug: project.slug,
                        service_category: project.filterCategory,
                      })
                    }
                    className="hover:text-[#34424F] focus-visible:outline-2 focus-visible:outline-[#F28C28]"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="text-sm text-[#46525D] leading-relaxed">
                  {project.conciseScope}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#D9DEE3]/60 flex items-center justify-between gap-4">
              <Link
                href={`/projects/${project.slug}`}
                onClick={() =>
                  trackNovusEvent('project_view', {
                    project_slug: project.slug,
                    service_category: project.filterCategory,
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F252B] hover:text-[#8C6D46] whitespace-nowrap"
              >
                <span>Examine Scope Details</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              <Link
                href={`/request-estimate?service=${project.serviceSlug}`}
                className="text-xs font-semibold text-[#46525D] hover:text-[#1F252B] underline underline-offset-4 whitespace-nowrap"
              >
                Request Similar Scope
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
