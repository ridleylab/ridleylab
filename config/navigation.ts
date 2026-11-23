import { programs } from "./programs";
import { locations } from "./locations";

export interface NavDropdownItem {
  name: string;
  path: string;
  description?: string;
}

export interface NavLinkItem {
  name: string;
  path?: string;
  dropdown?: NavDropdownItem[];
}

/**
 * Header navigation links.
 */
export const headerNavLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    dropdown: [
      {
        name: "Semua Layanan",
        path: "/services",
        description: "Bandingkan 3 program pelatihan AI",
      },
      {
        name: programs.onlineCourse.name,
        path: programs.onlineCourse.path,
        description: `${programs.onlineCourse.priceFormatted} · Belajar mandiri`,
      },
      {
        name: programs.onlineMentoring.name,
        path: programs.onlineMentoring.path,
        description: `${programs.onlineMentoring.priceFormatted}/tim · 8x Google Meet`,
      },
      {
        name: programs.offlineMentoring.name,
        path: programs.offlineMentoring.path,
        description: `${programs.offlineMentoring.priceFormatted}/tim · 8x tatap muka`,
      },
    ],
  },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
];

export const footerLinks = {
  services: [
    { name: "Semua Layanan", path: "/services" },
    {
      name: programs.onlineCourse.name,
      path: programs.onlineCourse.path,
    },
    {
      name: programs.onlineMentoring.name,
      path: programs.onlineMentoring.path,
    },
    {
      name: programs.offlineMentoring.name,
      path: programs.offlineMentoring.path,
    },
  ],
  locations: locations.map((loc) => ({
    name: loc.city,
    path: `/lokasi/${loc.slug}`,
  })),
  company: [
    { name: "About Us", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ],
} as const;
