/**
 * Single source of truth for RidleyLab brand identity, canonical domain,
 * contact details, physical address, social accounts, and brand assets.
 */
export const siteConfig = {
  name: "RidleyLab",
  shortName: "RidleyLab",
  alternateNames: ["Ridley Lab", "RIDLEY"] as const,
  url: "https://ridleylab.com",
  titleDefault: "RidleyLab - Pelatihan AI Social Media Marketing Bisnis Jasa",
  description:
    "Pelatihan AI untuk Social Media Marketing Bisnis Jasa. Membantu tim Anda membangun sistem konten, SOP kerja, dan alur konversi otomatis berbasis AI.",
  locale: "id_ID",
  language: "id-ID",
  legalLastUpdated: "23 November 2026",
  founder: {
    name: "Thofhan Zaka Anshori",
    role: "Founder RidleyLab",
    portfolioUrl: "https://zakaanshori-porto.vercel.app/",
  },
  contact: {
    whatsappNumber: "6281210004453",
    whatsappDisplay: "+62 812-1000-4453",
    phoneLocal: "081210004453",
    email: "labridley@gmail.com",
  },
  address: {
    streetAddress: "Kenaruhan RT 02 RW 17, Donokerto",
    locality: "Turi",
    district: "Sleman",
    region: "Daerah Istimewa Yogyakarta",
    regionShort: "DIY",
    postalCode: "55551",
    country: "ID",
    countryName: "Indonesia",
    shortDisplay: "Kenaruhan RT 02 RW 17, Donokerto, Turi, DIY 55551",
    geo: {
      latitude: -7.665029,
      longitude: 110.358709,
    },
    mapsUrl: "https://maps.app.goo.gl/9uK1Ceb6SmFtLFb29",
  },
  social: {
    instagram: {
      handle: "@ridley.lab",
      url: "https://www.instagram.com/ridley.lab",
    },
    tiktok: {
      handle: "@ridley.lab",
      url: "https://www.tiktok.com/@ridley.lab",
    },
  },
  brandAssets: {
    logo: "/images/brand/ridleylab-logo.png",
    icon: "/images/brand/icon.png",
    ogDefault: "/opengraph-image",
  },
} as const;

/**
 * Build a WhatsApp chat URL with an optional pre-filled message.
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
