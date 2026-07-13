export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.ridleylab.com/#website",
    "name": "RIDLEY",
    "url": "https://www.ridleylab.com/",
    "description": "Pelatihan AI Social Media Marketing, sistem konten, dan implementasi AI untuk scale up bisnis jasa.",
    "inLanguage": "id-ID",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.ridleylab.com/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
