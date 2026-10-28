import { BUSINESS_CONFIG, canDisplayPublicLicense, hasVerifiedPhone } from '@/lib/config/business';
import { ServiceItem } from '@/lib/data/services';

export function buildGeneralContractorSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${BUSINESS_CONFIG.intendedDomain}/#organization`,
    name: BUSINESS_CONFIG.businessName,
    legalName: BUSINESS_CONFIG.legalName,
    url: BUSINESS_CONFIG.intendedDomain,
    description:
      'Explore residential and commercial construction with Novus Construction Inc. Serving Southern California with ADUs, additions, remodels, and tenant improvements.',
    areaServed: [
      ...BUSINESS_CONFIG.serviceArea.confirmedCities.map((city) => ({
        '@type': 'City',
        name: `${city.name}, CA`,
      })),
      {
        '@type': 'AdministrativeArea',
        name: 'Southern California',
      },
    ],
  };

  if (BUSINESS_CONFIG.contact.emailConfirmedForPublicDisplay && BUSINESS_CONFIG.contact.email) {
    schema.email = BUSINESS_CONFIG.contact.email;
  }

  if (hasVerifiedPhone()) {
    schema.telephone = BUSINESS_CONFIG.contact.phoneE164;
  }

  if (BUSINESS_CONFIG.contact.publicAddress) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.contact.publicAddress.streetAddress,
      addressLocality: BUSINESS_CONFIG.contact.publicAddress.addressLocality,
      addressRegion: BUSINESS_CONFIG.contact.publicAddress.addressRegion,
      postalCode: BUSINESS_CONFIG.contact.publicAddress.postalCode,
      addressCountry: 'US',
    };
  }

  if (canDisplayPublicLicense()) {
    schema.identifier = {
      '@type': 'PropertyValue',
      name: 'CSLB License',
      value: BUSINESS_CONFIG.license.rawInputNumber,
    };
  }

  return schema;
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${BUSINESS_CONFIG.intendedDomain}${item.path}`,
    })),
  };
}

export function buildServiceSchema(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS_CONFIG.intendedDomain}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${BUSINESS_CONFIG.intendedDomain}/services/${service.slug}`,
    provider: {
      '@type': 'GeneralContractor',
      name: BUSINESS_CONFIG.businessName,
      url: BUSINESS_CONFIG.intendedDomain,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Riverside, Jurupa Valley, Inland Empire & Southern California',
    },
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
