import Image from "next/image";
import { Download, Play, Sparkles, Terminal } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const previewModules = [
  { num: "01", title: "Fondasi Funnel TikTok & Instagram Jasa", meta: "Video · 18m" },
  { num: "02", title: "Riset Angle & Hook Kompetitor Pakai AI", meta: "Video + Prompt" },
  { num: "03", title: "Scripting Video Pendek 30–60 Detik", meta: "Template Siap Pakai" },
  { num: "04", title: "SOP Produksi Tim & Alur Closing WA", meta: "Dokumen SOP" },
];

export default function CourseHero() {
  const program = programs.onlineCourse;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <Section variant="default" spacing="none" className="pt-8 pb-16 md:pt-12 md:pb-24">
      <Container size="xl">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: program.name, path: program.path },
          ]}
          className="mb-8"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6">
            <Badge variant="outline" className="mb-5">
              {program.badge} · {program.priceFormatted}
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-950 dark:text-zinc-50 mb-6">
              Online Course AI Social Media Marketing untuk TikTok &amp; Instagram.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
              Belajar mandiri cara memakai AI untuk riset pasar, menulis skrip
              konten, dan membangun alur konversi yang rapi — lengkap dengan
              template prompt dan SOP dasar tim konten.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
              <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                <Download size={17} />
                <span>{program.ctaLabel}</span>
              </ButtonLink>
              <ButtonLink href="/services/online-mentoring" variant="outline" size="lg">
                Butuh Bimbingan Tim Live?
              </ButtonLink>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-14 h-9 shrink-0">
                <Image
                  src="/images/services/online-course-proof-avatars.png"
                  alt="Peserta Online Course RidleyLab"
                  fill
                  className="object-contain object-left"
                  sizes="56px"
                />
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Sudah dipraktikkan oleh 1.200+ pemilik bisnis.
              </p>
            </div>
          </div>

          {/* RIGHT — Monochrome UI Curriculum Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 p-5 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Kurikulum Preview
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  10+ Modul · Akses Selamanya
                </span>
              </div>

              <div className="space-y-3 mb-5">
                {previewModules.map((mod) => (
                  <div
                    key={mod.num}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold flex items-center justify-center shrink-0">
                        <Play size={12} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 truncate">
                          {mod.num}. {mod.title}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
                      {mod.meta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-950 border border-zinc-800 p-4 text-zinc-100">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Terminal size={12} />
                    <span>Prompt Snippet · Riset Konten</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-zinc-300">
                    <Sparkles size={11} />
                    <span>Siap Copy</span>
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  &ldquo;Petakan 10 pain point calon klien [niche jasa] dan
                  susun 3 variasi hook video pendek yang mengarah ke konsultasi
                  WhatsApp...&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
