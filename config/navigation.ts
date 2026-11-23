import { programs } from "./programs";

export interface NavDropdownItem {
  name: string;
  path: string;
}

export interface NavLinkItem {
  name: string;
  path?: string;
  dropdown?: NavDropdownItem[];
}

/**
 * Header navigation links.
 * Note: `/services` hub and `/services/online-mentoring` will be added here
 * in Fase 3 once their routes are implemented.
 */
export const headerNavLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    dropdown: [
      {
        name: programs.offlineMentoring.name,
        path: programs.offlineMentoring.path,
      },
      {
        name: programs.onlineCourse.name,
        path: programs.onlineCourse.path,
      },
    ],
  },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
];

export const footerLinks = {
  services: [
    {
      name: programs.offlineMentoring.name,
      path: programs.offlineMentoring.path,
    },
    {
      name: programs.onlineCourse.name,
      path: programs.onlineCourse.path,
    },
  ],
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
