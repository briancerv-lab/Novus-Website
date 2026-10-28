import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import { buildGeneralContractorSchema } from '@/lib/seo/structured-data';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS_CONFIG.intendedDomain),
  title: 'SoCal General Contractor | Novus Construction Inc.',
  description:
    'Explore residential and commercial construction with Novus Construction Inc. Serving Southern California with ADUs, additions, remodels, and tenant improvements.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SoCal General Contractor | Novus Construction Inc.',
    description:
      'Explore residential and commercial construction with Novus Construction Inc. Serving Southern California with ADUs, additions, remodels, and tenant improvements.',
    url: BUSINESS_CONFIG.intendedDomain,
    siteName: BUSINESS_CONFIG.businessName,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoCal General Contractor | Novus Construction Inc.',
    description:
      'Explore residential and commercial construction with Novus Construction Inc. Serving Southern California with ADUs, additions, remodels, and tenant improvements.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const contractorSchema = buildGeneralContractorSchema();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#46525D] antialiased selection:bg-[#F28C28]/25 selection:text-[#1F252B]"
      >
        <GoogleAnalytics />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1F252B] focus:text-[#FFFFFF] focus:font-semibold focus:text-sm focus:border focus:border-[#F28C28]"
        >
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorSchema) }}
        />

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
