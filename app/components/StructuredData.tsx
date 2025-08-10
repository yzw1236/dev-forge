'use client';

import { toolMetadata } from '../utils/seo';

interface StructuredDataProps {
  toolName: string;
  locale: string;
}

export default function StructuredData({ toolName, locale }: StructuredDataProps) {
  const tool = toolMetadata[toolName];
  if (!tool?.structuredData) return null;

  const baseUrl = 'https://dev-forge.vercel.app';
  const isEnglish = locale === 'en';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.structuredData.name,
    "description": isEnglish ? tool.description : tool.description, // You can add Chinese translations here
    "url": `${baseUrl}/${locale}/${toolName}`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "bbj",
      "url": "https://github.com/yzw1236"
    },
    "creator": {
      "@type": "Person",
      "name": "bbj"
    },
    "inLanguage": isEnglish ? "en" : "zh",
    "isPartOf": {
      "@type": "WebApplication",
      "name": "Dev Forge",
      "url": baseUrl
    },
    "featureList": tool.keywords,
    "screenshot": `${baseUrl}/og-image.png`,
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
