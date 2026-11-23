import { Metadata } from "next";
import Script from "next/script";
import PortfolioContent from "@/components/portfolio/portfolio-content";
import JsonLd from "@/components/seo/json-ld";
import { portfolioItems } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPortfolioSchemaGraph } from "@/lib/seo/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Klien Mentoring AI Marketing",
  description: `Lihat studi kasus dan hasil nyata program mentoring ${siteConfig.name} untuk berbagai bisnis jasa di Indonesia.`,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={getPortfolioSchemaGraph(portfolioItems)} />

      <Section
        variant="default"
        spacing="none"
        className="pt-8 pb-20 md:pt-12 md:pb-24"
      >
        <Container size="xl">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/portfolio" },
            ]}
            className="mb-8"
          />

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
              Portfolio {siteConfig.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              Berikut adalah beberapa bisnis jasa yang telah mengikuti program
              mentoring 8x pertemuan dan membangun sistem produksi konten
              berbasis AI bersama {siteConfig.name}.
            </p>
          </div>

          <PortfolioContent items={portfolioItems} />
        </Container>

        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      </Section>
    </>
  );
}
