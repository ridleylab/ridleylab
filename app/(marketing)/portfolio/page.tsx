import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PortfolioContent from "@/components/portfolio/portfolio-content";
import JsonLd from "@/components/seo/json-ld";
import { portfolioItems } from "@/config/portfolio";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPortfolioSchemaGraph } from "@/lib/seo/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WhatsAppIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Studi Kasus Klien AI Marketing",
  description: `Lihat dokumentasi hasil nyata dan studi kasus program mentoring ${siteConfig.name} untuk berbagai bisnis jasa di Indonesia.`,
  path: "/portfolio",
});

export default function PortfolioPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Halo RidleyLab, saya sudah melihat studi kasus di Portfolio dan ingin konsultasi pelatihan AI untuk tim bisnis saya."
  );

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
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
              Portfolio &amp; Studi Kasus {siteConfig.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              Dokumentasi program pendampingan 8x pertemuan serta bukti hasil
              implementasi sistem konten AI di berbagai bisnis jasa di Indonesia.
            </p>
          </div>

          <PortfolioContent items={portfolioItems} />

          {/* Closing CTA Strip */}
          <div className="mt-16 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-7 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
              Ingin Hasil yang Terukur Seperti Studi Kasus di Atas?
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-7 leading-relaxed">
              Diskusikan kondisi tim dan target bisnis Anda sekarang — pilih
              Offline Mentoring tatap muka, Online Mentoring live Google Meet,
              atau Online Course mandiri.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3.5">
              <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                <WhatsAppIcon className="w-4 h-4" />
                <span>Konsultasi via WhatsApp</span>
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                <span>Bandingkan Semua Program</span>
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
