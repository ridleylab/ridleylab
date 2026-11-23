import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs, programComparisonRows } from "@/config/programs";
import { locations } from "@/config/locations";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServicesHubSchemaGraph } from "@/lib/seo/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Program Pelatihan AI Social Media Marketing",
  description:
    "Bandingkan 3 program pelatihan AI Social Media Marketing RidleyLab: Online Course Rp199.000, Online Mentoring via Google Meet Rp4.000.000/tim, dan Offline Mentoring Rp4.500.000/tim.",
  path: "/services",
});

export default function ServicesHubPage() {
  const orderedPrograms = [
    programs.onlineCourse,
    programs.onlineMentoring,
    programs.offlineMentoring,
  ];
  const whatsappUrl = getWhatsAppUrl(
    "Halo RidleyLab, saya ingin berkonsultasi untuk memilih program pelatihan AI yang paling sesuai untuk tim saya."
  );

  return (
    <>
      <JsonLd data={getServicesHubSchemaGraph()} />

      {/* HERO */}
      <Section variant="default" spacing="none" className="pt-8 pb-16 md:pt-12 md:pb-20">
        <Container size="xl">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
            className="mb-8"
          />

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-950 dark:text-zinc-50 mb-5">
              Pilih Program Pelatihan AI yang Paling Tepat untuk Tim Anda
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Mulai dari belajar mandiri lewat video modul hingga pendampingan
              implementasi 8x sesi khusus untuk satu tim bisnis — baik via
              Google Meet ke seluruh Indonesia maupun tatap muka langsung.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3 PROGRAM CARDS */}
      <Section variant="subtle" borderTop>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {orderedPrograms.map((prog) => {
              const isHighlighted = prog.key === "onlineMentoring";
              return (
                <div
                  key={prog.key}
                  className={
                    isHighlighted
                      ? "rounded-3xl p-8 bg-zinc-950 dark:bg-zinc-900 text-zinc-50 border border-zinc-800 dark:border-zinc-700 shadow-xl flex flex-col"
                      : "rounded-3xl p-8 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 flex flex-col"
                  }
                >
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={
                        isHighlighted
                          ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400"
                          : "text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {prog.badge}
                    </span>
                    {prog.sessions && (
                      <span className="text-xs text-zinc-400">{prog.sessions}</span>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight mb-2">
                    {prog.name}
                  </h2>
                  <p
                    className={
                      isHighlighted
                        ? "text-sm text-zinc-400 leading-relaxed mb-6"
                        : "text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6"
                    }
                  >
                    {prog.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
                      {prog.priceFormatted}
                    </span>{" "}
                    <span
                      className={
                        isHighlighted
                          ? "text-xs text-zinc-400"
                          : "text-xs text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {prog.priceUnit}
                    </span>
                  </div>

                  <ul
                    className={
                      isHighlighted
                        ? "space-y-3 text-sm text-zinc-300 mb-8 flex-1"
                        : "space-y-3 text-sm text-zinc-700 dark:text-zinc-300 mb-8 flex-1"
                    }
                  >
                    {prog.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2.5">
                    <ButtonLink
                      href={prog.path}
                      variant={isHighlighted ? "inverted" : "primary"}
                      fullWidth
                    >
                      <span>Pelajari {prog.name}</span>
                      <ArrowRight size={16} />
                    </ButtonLink>
                    <ButtonLink
                      href={getWhatsAppUrl(prog.whatsappMessage)}
                      external
                      variant={isHighlighted ? "inverted-outline" : "outline"}
                      fullWidth
                      size="sm"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Konsultasi via WA</span>
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* COMPARISON MATRIX */}
      <Section variant="default" borderTop>
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
              Perbandingan Detail Program
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Materi inti Online Mentoring dan Offline Mentoring sama — yang
              membedakan hanya format pertemuan via Google Meet atau tatap muka
              di lokasi.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <th className="py-4 px-5 font-semibold text-zinc-950 dark:text-zinc-100">
                    Aspek
                  </th>
                  <th className="py-4 px-5 font-semibold text-zinc-950 dark:text-zinc-100">
                    {programs.onlineCourse.name}
                  </th>
                  <th className="py-4 px-5 font-semibold text-zinc-950 dark:text-zinc-100">
                    {programs.onlineMentoring.name}
                  </th>
                  <th className="py-4 px-5 font-semibold text-zinc-950 dark:text-zinc-100">
                    {programs.offlineMentoring.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                {programComparisonRows.map((row) => (
                  <tr key={row.aspect}>
                    <td className="py-4 px-5 font-medium text-zinc-950 dark:text-zinc-100 whitespace-nowrap">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-5 text-zinc-600 dark:text-zinc-400">
                      {row.onlineCourse}
                    </td>
                    <td className="py-4 px-5 text-zinc-950 dark:text-zinc-100 font-medium">
                      {row.onlineMentoring}
                    </td>
                    <td className="py-4 px-5 text-zinc-600 dark:text-zinc-400">
                      {row.offlineMentoring}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* PANDUAN MEMILIH & LOKASI */}
      <Section variant="subtle" borderTop>
        <Container size="xl">
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            <Card variant="default" padding="lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Solo / Pemilik Awal
              </p>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                Pilih Online Course
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Cocok jika Anda ingin memahami fondasi riset konten AI, struktur
                skrip, dan funnel TikTok–Instagram secara mandiri dengan biaya
                ringan.
              </p>
              <Link
                href={programs.onlineCourse.path}
                className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Online Course</span>
                <ArrowRight size={14} />
              </Link>
            </Card>

            <Card variant="default" padding="lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Tim Bisnis Luar Yogyakarta
              </p>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                Pilih Online Mentoring
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Cocok untuk tim di Jakarta, Bandung, Semarang, Surabaya, Malang,
                atau kota lain yang ingin 8x bimbingan live Google Meet tanpa
                biaya transport.
              </p>
              <Link
                href={programs.onlineMentoring.path}
                className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Online Mentoring</span>
                <ArrowRight size={14} />
              </Link>
            </Card>

            <Card variant="default" padding="lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Yogyakarta &amp; In-House
              </p>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                Pilih Offline Mentoring
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Cocok untuk tim yang membutuhkan mentor hadir langsung di kantor
                atau studio guna praktek produksi, setup SOP, dan audit admin.
              </p>
              <Link
                href={programs.offlineMentoring.path}
                className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Offline Mentoring</span>
                <ArrowRight size={14} />
              </Link>
            </Card>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-7 sm:p-9">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50 mb-2 flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Cek Detail Layanan Berdasarkan Kota</span>
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Pelajari skema pelaksanaan mentoring terbaik untuk bisnis jasa
                  di kota Anda.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/lokasi/${loc.slug}`}
                    className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-950 dark:hover:border-zinc-400 transition-colors"
                  >
                    {loc.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CLOSING CTA */}
      <Section variant="inverted" spacing="md">
        <Container size="md" className="text-center">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
            Masih Ragu Menentukan Program yang Paling Cocok?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Ceritakan jumlah tim konten, kota bisnis Anda, dan kendala saat ini.
            Kami bantu rekomendasikan skema belajar atau mentoring yang tepat.
          </p>
          <ButtonLink href={whatsappUrl} external variant="inverted" size="lg">
            <WhatsAppIcon className="w-4 h-4" />
            <span>Konsultasi Gratis via WhatsApp</span>
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
