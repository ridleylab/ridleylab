import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";

// --- HOMEPAGE ---
export function getHomeWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    "url": `${siteConfig.url}/`,
    "name": siteConfig.titleDefault,
    "description": `${siteConfig.name} menyediakan Pelatihan AI Social Media Marketing untuk membantu bisnis jasa membangun sistem konten dan alur konversi otomatis.`,
    "isPartOf": {
      "@id": `${siteConfig.url}/#website`,
    },
  };
}

// --- ONLINE COURSE ---
export function getOnlineCourseServiceSchema() {
  const program = programs.onlineCourse;
  const pageUrl = `${siteConfig.url}${program.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    "name": program.fullName,
    "image": `${siteConfig.url}${program.ogImage}`,
    "url": pageUrl,
    "serviceType": program.serviceType,
    "description": program.description,
    "provider": {
      "@id": `${siteConfig.url}/#organization`,
    },
    "areaServed": {
      "@type": "Country",
      "name": siteConfig.address.countryName,
    },
    "offers": {
      "@type": "Offer",
      "price": String(program.price),
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": pageUrl,
    },
  };
}

export function getOnlineCourseFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": programs.onlineCourse.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function getOnlineCourseWebPageSchema() {
  const program = programs.onlineCourse;
  const pageUrl = `${siteConfig.url}${program.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "url": pageUrl,
    "name": `${program.name} - Pelatihan AI Social Media Marketing | ${siteConfig.name}`,
    "description": "Belajar mandiri cara memakai AI untuk riset konten, pembuatan skrip, dan alur konversi otomatis di TikTok dan Instagram.",
    "isPartOf": {
      "@id": `${siteConfig.url}/#website`,
    },
  };
}

// --- OFFLINE MENTORING ---
export function getOfflineMentoringServiceSchema() {
  const program = programs.offlineMentoring;
  const pageUrl = `${siteConfig.url}${program.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    "name": program.fullName,
    "image": `${siteConfig.url}${program.ogImage}`,
    "url": pageUrl,
    "serviceType": program.serviceType,
    "description": program.description,
    "provider": {
      "@id": `${siteConfig.url}/#organization`,
    },
    "areaServed": {
      "@type": "Country",
      "name": siteConfig.address.countryName,
    },
    "offers": {
      "@type": "Offer",
      "price": String(program.price),
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": pageUrl,
    },
  };
}

export function getOfflineMentoringFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": programs.offlineMentoring.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function getOfflineMentoringWebPageSchema() {
  const program = programs.offlineMentoring;
  const pageUrl = `${siteConfig.url}${program.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    "url": pageUrl,
    "name": `${program.name} - Pelatihan AI Social Media Marketing | ${siteConfig.name}`,
    "description": program.description,
    "isPartOf": {
      "@id": `${siteConfig.url}/#website`,
    },
  };
}
