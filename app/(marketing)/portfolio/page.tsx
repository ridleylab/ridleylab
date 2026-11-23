import { Metadata } from "next";
import Script from "next/script";
import PortfolioContent from "@/components/portfolio/portfolio-content";
import { portfolioItems } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Lihat hasil mentoring ${siteConfig.name} untuk berbagai klien bisnis jasa.`,
};

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="ridley-container">
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
            Portfolio {siteConfig.name}
          </h1>
          <p className="ridley-text text-gray-500 text-base">
            Berikut adalah beberapa klien yang telah berkembang bersama mentoring {siteConfig.name}.
          </p>
        </div>

        <PortfolioContent items={portfolioItems} />
      </div>

      {/* Script untuk TikTok Embed */}
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </div>
  );
}
