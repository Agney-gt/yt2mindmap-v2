'use client';

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube to Mind Map",
    "alternateName": "Y2Map",
    "url": "https://www.y2map.com",
    "description": "Transform YouTube videos into interactive mind maps. Our AI-powered platform helps you learn smarter by converting video content into visual knowledge maps.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web browser",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "highPrice": 29.99,
      "lowPrice": 0,
      "offerCount": 3,
      "offers": [{
        "@type": "Offer",
        "name": "Free Plan",
        "price": 0,
        "priceCurrency": "USD"
      }, {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": 9.99,
        "priceCurrency": "USD"
      }, {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": 29.99,
        "priceCurrency": "USD"
      }]
    },
    "featureList": [
      "AI-Powered Mind Mapping",
      "Real-Time Editing",
      "Knowledge Library",
      "Concept Connections",
      "Learning Analytics",
      "Collaborative Learning"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://y2map.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "YouTube to Mind Map",
      "logo": {
        "@type": "/favicon.ico",
        "url": "https://y2map.com/android-chrome-192x192.png"
      },
      "sameAs": [
        "https://twitter.com/y2map",
        "https://www.linkedin.com/company/y2map"
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Students, Professionals, Lifelong Learners"
    },
    "keywords": "mind mapping, YouTube learning, visual learning, AI learning tools, educational technology, knowledge management"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}