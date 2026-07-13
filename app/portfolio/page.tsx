import { Metadata } from "next";
import Script from "next/script";
import PortfolioContent, { PortfolioItem } from "@/components/portfolio/portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio | RIDLEY",
  description: "Lihat hasil mentoring RIDLEY untuk berbagai klien.",
};

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    name: "AKARA CIPTA KARYA",
    category: "Bisnis Jasa Bangun Rumah",
    businessType: "Bisnis Jasa Bangun Rumah",
    location: "Yogyakarta",
    mentoringDetails: "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Mei 2026",
    videoIds: ["7661101076828949778", "7653794096519073031"],
  },
  {
    id: "2",
    name: "ZIPZAP GARMENT",
    category: "Bisnis Konveksi",
    businessType: "Bisnis Konveksi",
    location: "Jakarta",
    mentoringDetails: "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Juni 2026",
    videoIds: ["7661076903004081426", "7653019592054295816"],
  },
  /*
  {
    id: "3",
    name: "Klien 3",
    category: "Kategori Bisnis",
    businessType: "TBD",
    location: "TBD",
    mentoringDetails: "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Juli 2026",
    videoIds: ["VIDEO_ID_1", "VIDEO_ID_2"],
  },
  {
    id: "4",
    name: "Klien 4",
    category: "Kategori Bisnis",
    businessType: "TBD",
    location: "TBD",
    mentoringDetails: "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Agustus 2026",
    videoIds: ["VIDEO_ID_1", "VIDEO_ID_2"],
  },
  */
];

export default function PortfolioPage() {
  return (
    <main className="bg-white min-h-screen py-16">
      <div className="ridley-container">
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
            Portfolio RIDLEY
          </h1>
          <p className="ridley-text text-gray-500 text-base">
            Berikut adalah beberapa klien yang telah berkembang bersama mentoring RIDLEY.
          </p>
        </div>

        <PortfolioContent items={portfolioItems} />
      </div>

      {/* Script untuk TikTok Embed */}
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </main>
  );
}
