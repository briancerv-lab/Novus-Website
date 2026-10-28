import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { buildBreadcrumbSchema } from '@/lib/seo/structured-data';

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
  lightText?: boolean;
}

export default function Breadcrumbs({ items, lightText = false }: BreadcrumbsProps) {
  const schema = buildBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol
          className={`flex flex-wrap items-center gap-1.5 text-xs ${
            lightText ? 'text-[#D9DEE3]' : 'text-[#46525D]'
          }`}
        >
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 ${lightText ? 'text-[#D9DEE3]/60' : 'text-[#46525D]/60'}`}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={`font-semibold ${lightText ? 'text-[#FFFFFF]' : 'text-[#1F252B]'}`}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`hover:underline underline-offset-4 ${
                      lightText ? 'hover:text-[#FFFFFF]' : 'hover:text-[#1F252B]'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
