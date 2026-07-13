import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import GoogleTagManager from "@/components/analytics/google-tag-manager";

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RIDLEY - Pelatihan AI Social Media Marketing Bisnis Jasa",
    template: "%s | RIDLEY",
  },
  description: "Pelatihan AI untuk Social Media Marketing Bisnis Jasa. Workshop langsung di lokasi yang mengajarkan tim Anda cara pakai AI untuk bikin konten & closing secara efektif.",
  metadataBase: new URL("https://www.ridleylab.com"),
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
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
