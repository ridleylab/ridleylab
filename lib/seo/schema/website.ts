import { siteConfig } from "@/config/site";

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.name,
    "url": `${siteConfig.url}/`,
    "description": "Pelatihan AI Social Media Marketing, sistem konten, dan implementasi AI untuk scale up bisnis jasa.",
    "inLanguage": siteConfig.language,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
