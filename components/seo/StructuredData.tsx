import React from 'react';

interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'Tool';
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name,
  description,
  url,
  applicationCategory = "UtilitiesApplication",
  operatingSystem = "Any",
  offers = { price: "0", priceCurrency: "USD" }
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency
    },
    "creator": {
      "@type": "Organization",
      "name": "Timestamp.im",
      "url": "https://timestamp.im"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": ["en", "cn", "ja", "ko", "es", "fr", "de", "it", "ru", "pt", "hi", "ar"],
    "isAccessibleForFree": true,
    "isFamilyFriendly": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default StructuredData;