import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const checklist = [
  "8x sesi tatap muka langsung",
  "SOP Produksi Konten",
  "Workflow Tim Terstruktur",
  "Template Prompt AI",
  "SOP Closing Admin",
  "Evaluasi & Scale-up",
];

export default function MentoringHero() {
  const program = programs.offlineMentoring;
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT CONTENT */}
          <div className="min-w-0 lg:col-span-6">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.09] text-zinc-950 dark:text-zinc-50 mb-6">
              Offline Mentoring AI Social Media Marketing di Lokasi Bisnis Anda.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
              Workshop tatap muka di lokasi (
              <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                {program.priceFormatted} {program.priceUnit}
              </span>
              ) yang melatih tim Anda menggunakan AI untuk produksi konten dan
              closing secara efektif. Kurikulum khusus, latihan kasus nyata,
              dan hasil terukur.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <Check
                    size={16}
                    className="shrink-0 text-zinc-950 dark:text-zinc-50"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
              <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                <WhatsAppIcon className="w-4 h-4" />
                <span>{program.ctaLabel}</span>
              </ButtonLink>
              <ButtonLink href="/services/online-mentoring" variant="outline" size="lg">
                Luar Kota? Pakai Google Meet
              </ButtonLink>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Respon cepat · Terjadwal · Slot terbatas. Area luar Yogyakarta
              tersedia{" "}
              <Link
                href={programs.onlineMentoring.path}
                className="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-200"
              >
                Online Mentoring (Rp4.000.000)
              </Link>{" "}
              maupun{" "}
              <Link
                href="/lokasi/jakarta"
                className="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-200"
              >
                In-House Workshop
              </Link>
              .
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="min-w-0 lg:col-span-6">
            <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src="/images/services/hero-offmen.png"
                alt={`Offline Mentoring ${siteConfig.name} sesi tatap muka langsung di kantor klien`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
