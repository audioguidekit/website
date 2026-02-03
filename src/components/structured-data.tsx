import React from 'react';

const siteUrl = "https://audioguidekit.org";

// SoftwareApplication schema for the main product
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AudioGuideKit",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free, open-source audio guide player for museums, galleries, and cultural institutions. Self-hosted PWA that works offline with no vendor lock-in.",
  "url": siteUrl,
  "downloadUrl": "https://github.com/audioguidekit/player-react",
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "AudioGuideKit",
    "url": siteUrl
  },
  "license": "https://opensource.org/licenses/MIT",
  "isAccessibleForFree": true,
  "featureList": [
    "Offline support via PWA",
    "Self-hosted deployment",
    "White-label branding",
    "Mobile-first design",
    "No vendor lock-in",
    "MIT licensed"
  ]
};

// Organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AudioGuideKit",
  "url": siteUrl,
  "logo": `${siteUrl}/audioguidekit-logo.svg`,
  "sameAs": [
    "https://github.com/audioguidekit/player-react",
    "https://twitter.com/audiotour_oss"
  ],
  "description": "Open-source audio guide solutions for museums and cultural institutions."
};

// WebSite schema with search action potential
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AudioGuideKit",
  "url": siteUrl,
  "description": "Free, open-source audio guide player for museums, galleries, and cultural institutions.",
  "publisher": {
    "@type": "Organization",
    "name": "AudioGuideKit"
  }
};

// FAQ schema for common questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is AudioGuideKit really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AudioGuideKit is completely free and open-source under the MIT license. There are no per-visitor fees, no subscription costs, and no hidden charges. You only pay for your own hosting, which can be free with services like Vercel or Netlify."
      }
    },
    {
      "@type": "Question",
      "name": "Does AudioGuideKit work offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AudioGuideKit is built as a Progressive Web App (PWA) with Service Workers that cache audio files and metadata. It works in airplane mode, underground, or anywhere with poor network connectivity."
      }
    },
    {
      "@type": "Question",
      "name": "What do I need to run AudioGuideKit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AudioGuideKit requires only static file hosting. There's no database or backend needed. You can deploy to Vercel, Netlify, GitHub Pages, AWS S3, or any web server that can serve static files."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize the branding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AudioGuideKit supports white-label branding through simple configuration changes. You can customize colors, logos, and branding without modifying the source code."
      }
    },
    {
      "@type": "Question",
      "name": "Who is AudioGuideKit for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AudioGuideKit is designed for museums, galleries, cultural institutions, heritage sites, developers building audio experiences, and agencies delivering exhibition projects. It's ideal for anyone who wants a free alternative to expensive audio guide hardware or SaaS platforms."
      }
    }
  ]
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
