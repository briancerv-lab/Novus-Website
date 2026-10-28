'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  idPrefix?: string;
  darkTheme?: boolean;
}

export default function FAQAccordion({ items, idPrefix = 'faq', darkTheme = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#D9DEE3] border-y border-[#D9DEE3]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${idPrefix}-button-${idx}`;
        const panelId = `${idPrefix}-panel-${idx}`;

        return (
          <div key={item.question} className="py-1">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`w-full flex items-center justify-between gap-6 py-4 text-left font-display text-base sm:text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28] ${
                  darkTheme
                    ? 'text-[#FFFFFF] hover:text-[#F28C28]'
                    : 'text-[#1F252B] hover:text-[#34424F]'
                }`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-[#F28C28]' : darkTheme ? 'text-[#D9DEE3]' : 'text-[#46525D]'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`pb-5 pr-8 text-sm sm:text-base leading-relaxed ${
                darkTheme ? 'text-[#D9DEE3]' : 'text-[#46525D]'
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
