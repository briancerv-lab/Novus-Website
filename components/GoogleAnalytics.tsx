'use client';

import React, { useEffect, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { getGa4MeasurementId, trackPageView } from '@/lib/analytics';

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get('service') || null;

  useEffect(() => {
    if (!pathname) return;
    trackPageView(pathname, serviceParam);
  }, [pathname, serviceParam]);

  return null;
}

export default function GoogleAnalytics() {
  const measurementId = getGa4MeasurementId();

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}
