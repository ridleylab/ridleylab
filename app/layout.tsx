import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${manrope.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        <GoogleAnalytics />
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
