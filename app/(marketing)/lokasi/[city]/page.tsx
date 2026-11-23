import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Check,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { locations, getLocationBySlug } from "@/config/locations";
import { portfolioItems } from "@/config/portfolio";
import ProgramFaqSection from "@/components/sections/shared/program-faq";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocationSchemaGraph } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return locations.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return buildMetadata({
      title: "Lokasi Tidak Ditemukan",
      description: "Halaman area layanan yang Anda cari tidak tersedia.",
      path: `/lokasi/${city}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: location.title,
    description: location.metaDescription,
    path: `/lokasi/${location.slug}`,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const recommendedProgram = programs[location.recommendedProgramKey];
  const orderedPrograms = [
    programs.onlineCourse,
    programs.onlineMentoring,
    programs.offlineMentoring,
  ];
  const relevantPortfolio = portfolioItems.filter((item) =>
    location.relatedPortfolioIds.includes(item.id)
  );
  const otherCities = locations.filter((loc) => loc.slug !== location.slug);

  const cityWhatsappUrl = getWhatsAppUrl(
    `Halo RidleyLab, saya pemilik bisnis jasa di ${location.city}. Saya ingin konsultasi program pelatihan AI (${recommendedProgram.name}) untuk tim saya.`
  );

  return (
    <>
      <JsonLd data={getLocationSchemaGraph(location)} />

      {/* HERO */}
      <Section
        variant="default"
        spacing="none"
        className="pt-8 pb-16 md:pt-12 md:pb-20"
      >
        <Container size="xl">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: location.city, path: `/lokasi/${location.slug}` },
            ]}
            className="mb-8"
          />

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <Badge variant="outline" className="mb-5">
                <MapPin size={12} />
                <span>
                  {location.city} · {location.region}
                </span>
              </Badge>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.09] text-zinc-950 dark:text-zinc-50 mb-5">
                {location.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-8">
                {location.heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5">
                <ButtonLink
                  href={recommendedProgram.path}
                  variant="primary"
                  size="lg"
                >
                  <span>Rekomendasi: {recommendedProgram.name}</span>
                  <ArrowRight size={17} />
                </ButtonLink>
                <ButtonLink
                  href={cityWhatsappUrl}
                  external
                  variant="outline"
                  size="lg"
                >
                  <MessageCircle size={17} />
                  <span>Konsultasi Tim {location.city}</span>
                </ButtonLink>
              </div>
            </div>

            {/* Summary Highlight Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Skema Utama di {location.city}
                </p>
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
                  {recommendedProgram.name}
                </h2>
                <p className="text-2xl font-semibold text-zinc-950 dark:text-white mb-4">
                  {recommendedProgram.priceFormatted}{" "}
                  <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                    {recommendedProgram.priceUnit}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  {location.logisticsNote}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* KONTEKS LOKAL & SEKTOR INDUSTRI */}
      <Section variant="subtle" borderTop>
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
                Tantangan Konten Bisnis Jasa di {location.city}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {location.localContext}
              </p>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Sektor Bisnis Jasa yang Cocok di {location.city}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {location.targetIndustries.map((industry) => (
                  <Card key={industry} variant="default" padding="md">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-100 shrink-0">
                        <Building2 size={16} />
                      </div>
                      <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 leading-snug pt-1">
                        {industry}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PILIHAN PROGRAM UNTUK KOTA INI */}
      <Section variant="default" borderTop>
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
              Pilihan Program untuk Tim Anda di {location.city}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Pilih format yang paling efisien antara belajar mandiri, sesi
              live Google Meet, atau workshop tatap muka.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {orderedPrograms.map((prog) => {
              const isRec = prog.key === location.recommendedProgramKey;
              return (
                <div
                  key={prog.key}
                  className={
                    isRec
                      ? "rounded-3xl p-7 bg-zinc-950 dark:bg-zinc-900 text-zinc-50 border border-zinc-800 dark:border-zinc-700 flex flex-col"
                      : "rounded-3xl p-7 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 flex flex-col"
                  }
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={isRec ? "inverted" : "default"}>
                      {isRec ? `Rekomendasi ${location.city}` : prog.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-1.5">{prog.name}</h3>
                  <p className="text-2xl font-semibold mb-4">
                    {prog.priceFormatted}{" "}
                    <span
                      className={
                        isRec
                          ? "text-xs font-normal text-zinc-400"
                          : "text-xs font-normal text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {prog.priceUnit}
                    </span>
                  </p>

                  <ul
                    className={
                      isRec
                        ? "space-y-2.5 text-sm text-zinc-300 mb-7 flex-1"
                        : "space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400 mb-7 flex-1"
                    }
                  >
                    {prog.features.slice(0, 4).map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check size={15} className="shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={prog.path}
                    variant={isRec ? "inverted" : "outline"}
                    fullWidth
                  >
                    <span>Detail {prog.name}</span>
                    <ArrowRight size={15} />
                  </ButtonLink>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* STUDI KASUS RELEVAN */}
      {relevantPortfolio.length > 0 && (
        <Section variant="subtle" borderTop>
          <Container size="xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
                  Rekam Jejak Klien Mentoring Relevan
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Contoh implementasi mentoring 8x pertemuan untuk bisnis jasa.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat semua video portfolio</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {relevantPortfolio.map((item) => (
                <Card key={item.id} variant="default" padding="lg">
                  <Badge variant="outline" className="mb-3">
                    {item.location}
                  </Badge>
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                    {item.businessType}
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                    {item.mentoringDetails}
                  </p>
                  <Link
                    href="/portfolio"
                    className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Tonton hasil video kontennya</span>
                    <ArrowRight size={13} />
                  </Link>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ KOTA */}
      <ProgramFaqSection
        title={`Pertanyaan Seputar Pelatihan AI di ${location.city}`}
        subtitle={`Jawaban khusus terkait jadwal, mekanisme pelaksanaan, dan program untuk bisnis jasa di area ${location.city}.`}
        faqs={location.faqs}
        variant="default"
      />

      {/* SIBLING CITIES + CLOSING CTA */}
      <Section variant="inverted" spacing="md">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Siap Mulai Pelatihan AI untuk Tim Anda di {location.city}?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-7">
              Diskusikan kebutuhan konten dan target leads tim Anda melalui
              WhatsApp bersama tim RidleyLab.
            </p>
            <ButtonLink
              href={cityWhatsappUrl}
              external
              variant="inverted"
              size="lg"
            >
              <MessageCircle size={17} />
              <span>Jadwalkan Konsultasi {location.city}</span>
            </ButtonLink>
          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
            <span>Area layanan lainnya:</span>
            {otherCities.map((other) => (
              <Link
                key={other.slug}
                href={`/lokasi/${other.slug}`}
                className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors"
              >
                {other.city}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
