import { siteConfig } from "@/config/site";
import { priceRangeLabel } from "@/config/programs";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "alternateName": [...siteConfig.alternateNames],
    "logo": `${siteConfig.url}${siteConfig.brandAssets.logo}`,
    "image": `${siteConfig.url}${siteConfig.brandAssets.ogDefault}`,
    "url": `${siteConfig.url}/`,
    "telephone": `+${siteConfig.contact.whatsappNumber}`,
    "email": siteConfig.contact.email,
    "areaServed": siteConfig.address.countryName,
    "priceRange": priceRangeLabel,
    "description": `${siteConfig.name} menyediakan Pelatihan AI Social Media Marketing untuk membantu bisnis jasa membangun sistem konten dan alur konversi otomatis.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.streetAddress,
      "addressLocality": siteConfig.address.locality,
      "addressRegion": siteConfig.address.region,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.address.geo.latitude,
      "longitude": siteConfig.address.geo.longitude,
    },
    "hasMap": siteConfig.address.mapsUrl,
    "founder": {
      "@type": "Person",
      "name": siteConfig.founder.name,
    },
    "sameAs": [
      siteConfig.social.instagram.url,
      siteConfig.social.tiktok.url,
    ],
  };
}
