export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.ridleylab.com/#organization",
    "name": "RIDLEY",
    "logo": "https://www.ridleylab.com/assets/images/ridleylogo.png",
    "image": "https://www.ridleylab.com/assets/images/homepage/homepage-OG.jpg",
    "url": "https://www.ridleylab.com/",
    "telephone": "+6281210004453",
    "email": "labridley@gmail.com",
    "areaServed": "Indonesia",
    "priceRange": "Rp199.000 - Rp3.500.000+",
    "description": "RIDLEY menyediakan Pelatihan AI Social Media Marketing untuk membantu bisnis jasa membangun sistem konten dan alur konversi otomatis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kenaruhan RT 02 RW 17, Donokerto",
      "addressLocality": "Turi",
      "addressRegion": "Daerah Istimewa Yogyakarta",
      "postalCode": "55551",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.665029,
      "longitude": 110.358709
    },
    "hasMap": "https://maps.app.goo.gl/9uK1Ceb6SmFtLFb29",
    "founder": {
      "@type": "Person",
      "name": "Thofhan Zaka Anshori"
    },
    "sameAs": [
      "https://www.instagram.com/ridley.lab",
      "https://www.tiktok.com/@ridley.lab"
    ]
  };
}

