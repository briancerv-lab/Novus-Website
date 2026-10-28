import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CORE_PROCESS_STEPS } from '@/lib/data/projects-and-faqs';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Construction Process | Novus Construction Inc.',
  description:
    'Learn how Novus Construction Inc. manages residential and commercial construction from initial inquiry and site review through written proposals, change documentation, and closeout.',
  alternates: {
    canonical: '/our-process',
  },
};

const DETAILED_PROCESS_PHASES = [
  {
    number: '01',
    title: 'Initial Inquiry & Project Fit Review',
    whatHappens:
      'You share your project type, city or ZIP code, current planning stage, and a brief description of the work through our estimate request flow.',
    whyItMatters:
      'Understanding whether you have permitted drawings, preliminary plans, or a conceptual remodel scope allows us to prepare the right questions before meeting on site.',
    ownerChecklist: [
      'Share existing architectural or structural plans if available.',
      'Note any target move-in or commercial lease turnover dates.',
      'Identify whether the home or commercial suite will be occupied during construction.',
    ],
  },
  {
    number: '02',
    title: 'Site Walk, Existing Conditions & Scope Alignment',
    whatHappens:
      'We visit the property to inspect lot access, staging areas, structural tie-in conditions, utility panel/lateral locations, and finish expectations.',
    whyItMatters:
      'Many construction surprises come from overlooking site logistics—such as narrow side-yard clearances for an ADU, subfloor elevation changes in a remodel, or above-ceiling plenum conditions in a commercial suite.',
    ownerChecklist: [
      'Walk the space with our team to point out priority areas and must-have details.',
      'Discuss who is furnishing long-lead items such as appliances, windows, cabinetry, and plumbing fixtures.',
      'Clarify landlord or HOA work-hour and access requirements if applicable.',
    ],
  },
  {
    number: '03',
    title: 'Detailed Written Proposal & Agreement',
    whatHappens:
      'We prepare a clear, itemized written proposal outlining the scope of work by construction phase, material allowances, inclusions, and exclusions.',
    whyItMatters:
      'A vague one-line estimate creates friction later. A written scope establishes shared expectations so both sides know exactly what work is contracted.',
    ownerChecklist: [
      'Review line-by-line scope inclusions, exclusions, and fixture allowances.',
      'Confirm how architectural design, structural engineering, and municipal permit fees are assigned.',
      'Review the project-specific construction agreement and milestone schedule.',
    ],
  },
  {
    number: '04',
    title: 'Pre-Construction, Sequencing & Documented Changes',
    whatHappens:
      'We set up dust containment and surface protection, sequence demolition, framing, rough trades, inspections, exterior envelope, and interior finishes, and keep you updated as milestones are completed.',
    whyItMatters:
      'Construction involves dozens of interdependent handoffs. If concealed damage is uncovered after opening a wall or you decide to adjust a finish selection, we document the scope and cost/schedule adjustment in a written change order before proceeding.',
    ownerChecklist: [
      'Finalize rough-in plumbing valves, appliance specs, and cabinet layouts early to prevent schedule holds.',
      'Review and approve any written change orders prior to execution of modified work.',
      'Attend key milestone walks (such as post-framing / pre-drywall).',
    ],
  },
  {
    number: '05',
    title: 'Final Walkthrough, Punch List & Closeout',
    whatHappens:
      'When finishes, hardware, and fixtures are complete, we walk the entire project together under full lighting, complete any final touch-ups, and hand over the finished space.',
    whyItMatters:
      'The last five percent of a project determines how the craftsmanship feels every day. A disciplined walkthrough ensures doors latch cleanly, reveals are uniform, and the site is left clean.',
    ownerChecklist: [
      'Walk every room or suite area with our team to verify finish details and fixture operation.',
      'Confirm completion of municipal final inspections where applicable.',
      'Receive closeout documentation and care notes for newly installed surfaces.',
    ],
  },
];

export default function OurProcessPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1F252B] text-[#FFFFFF] py-14 sm:py-20 border-b border-[#34424F]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            lightText
            items={[
              { name: 'Home', path: '/' },
              { name: 'Our Process', path: '/our-process' },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F28C28]">
              Project Management &amp; Execution
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF]">
              An Organized Process Built Around Written Scopes
            </h1>
            <p className="text-base sm:text-lg text-[#D9DEE3] leading-relaxed">
              Construction goes smoothly when expectations are documented upfront, trades are sequenced in the right order, and changes are communicated before work proceeds.
            </p>
          </div>
        </div>
      </section>

      {/* Quick 5-Step Summary Strip */}
      <section className="py-12 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CORE_PROCESS_STEPS.map((item) => (
              <div key={item.step} className="p-5 bg-[#F5F4F0] border border-[#D9DEE3]">
                <p className="font-mono text-xs font-semibold text-[#8C6D46]">Step {item.step}</p>
                <h2 className="font-display text-base font-bold text-[#1F252B] mt-1">{item.title}</h2>
                <p className="text-xs text-[#46525D] mt-2 leading-relaxed">{item.deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Phases */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46] mb-2">
              Phase-by-Phase Standards
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1F252B]">
              What to Expect at Every Stage of Your Project
            </h2>
          </div>

          {DETAILED_PROCESS_PHASES.map((phase) => (
            <div
              key={phase.number}
              className="bg-[#FFFFFF] border border-[#D9DEE3] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C6D46] font-semibold">
                  <span>Phase {phase.number}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F252B]">
                  {phase.title}
                </h3>
                <div className="space-y-3 text-sm sm:text-base text-[#46525D] leading-relaxed">
                  <p>
                    <strong className="text-[#1F252B]">What happens:</strong> {phase.whatHappens}
                  </p>
                  <p>
                    <strong className="text-[#1F252B]">Why it matters:</strong> {phase.whyItMatters}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F5F4F0] border border-[#D9DEE3] p-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-[#1F252B] font-semibold">
                  Key Planning &amp; Coordination Items
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#34424F]">
                  {phase.ownerChecklist.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-[#F28C28] font-bold">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plain-Language Policy on Contracts, Permits & Change Documentation */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#D9DEE3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-3">
              <h2 className="font-display text-lg font-bold text-[#1F252B]">
                Written Scope &amp; Contract Clarity
              </h2>
              <p className="text-sm text-[#46525D] leading-relaxed">
                Every project is governed by a written agreement specific to that property. Payment schedules, milestone definitions, material allowances, and division responsibilities are documented in plain language before construction begins.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-3">
              <h2 className="font-display text-lg font-bold text-[#1F252B]">
                Plans, Engineering &amp; Permits
              </h2>
              <p className="text-sm text-[#46525D] leading-relaxed">
                Depending on your project’s stage, we can build from your architect’s and structural engineer’s approved plans or help you understand what drawings and municipal approvals are needed prior to construction mobilization.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#F5F4F0] border border-[#D9DEE3] space-y-3">
              <h2 className="font-display text-lg font-bold text-[#1F252B]">
                Documented Change Orders
              </h2>
              <p className="text-sm text-[#46525D] leading-relaxed">
                If you request a scope addition, select a different material grade, or if concealed structural or utility issues are discovered after demolition, we provide a written change order detailing the adjustment prior to performing the work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#1F252B] text-[#FFFFFF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Ready to Start Step 1?
            </h2>
            <p className="text-base text-[#D9DEE3] leading-relaxed">
              Share your project details in our three-step estimate form and let’s review your scope.
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
