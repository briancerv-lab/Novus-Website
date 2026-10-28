import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="py-20 sm:py-32 bg-[#F5F4F0] border-b border-[#D9DEE3]">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="text-xs font-mono uppercase tracking-wider text-[#8C6D46]">
          Error 404 · Page Not Found
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1F252B]">
          We Could Not Find That Page
        </h1>
        <p className="text-base text-[#46525D] leading-relaxed">
          The page you are looking for may have moved or the URL may be mistyped. Use the links below to explore our Southern California construction services or request an estimate.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-sm font-semibold text-[#FFFFFF] bg-[#1F252B] hover:bg-[#34424F] transition-colors whitespace-nowrap"
          >
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-sm font-semibold text-[#1F252B] bg-[#FFFFFF] border border-[#D9DEE3] hover:bg-[#EAE8E1] transition-colors whitespace-nowrap"
          >
            <span>View All 11 Services</span>
          </Link>
          <Link
            href="/request-estimate"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-[#1F252B] bg-[#F28C28] hover:bg-[#e07d1b] transition-colors whitespace-nowrap"
          >
            <span>Request an Estimate</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
