import Image from "next/image";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function HomeHero() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <Section variant="default" spacing="none" className="pt-10 pb-16 md:pt-16 md:pb-24">
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <Badge variant="outline" className="mb-6">
              <Sparkles size={12} />
              <span>AI Marketing System untuk Bisnis Jasa</span>
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.08] text-zinc-950 dark:text-zinc-50 mb-6">
              Pelatihan AI untuk Social Media Marketing Bisnis Jasa.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
              Mengajarkan tim Anda cara pakai AI untuk riset konten, menulis skrip,
              dan merapikan closing WhatsApp secara efektif. Kurikulum khusus,
              latihan kasus nyata, dan hasil terukur.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
              <ButtonLink href="/services" variant="primary" size="lg">
                <span>Lihat Semua Program</span>
                <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl}
                external
                variant="outline"
                size="lg"
              >
                <MessageCircle size={17} />
                <span>Konsultasi via WA</span>
              </ButtonLink>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 max-w-lg text-xs">
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Online Course</p>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100 mt-0.5">
                  {programs.onlineCourse.priceFormatted}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Google Meet</p>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100 mt-0.5">
                  {programs.onlineMentoring.priceFormatted}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 dark:text-zinc-400">Tatap Muka</p>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100 mt-0.5">
                  {programs.offlineMentoring.priceFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Editorial Workshop Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-[4/3] sm:aspect-[5/4] shadow-xl">
              <Image
                src="/images/services/offline-mentoring-hero.jpg"
                alt={`Sesi workshop ${siteConfig.name} pelatihan AI Social Media Marketing untuk tim bisnis jasa`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 px-4 py-3 text-white">
                  <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                    Dampak Klien
                  </p>
                  <p className="text-sm sm:text-base font-semibold mt-0.5">
                    +3x Chat Masuk / 50 Hari
                  </p>
                </div>
                <div className="rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 px-4 py-3 text-white">
                  <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                    Format Pendampingan
                  </p>
                  <p className="text-sm sm:text-base font-semibold mt-0.5">
                    8x Sesi Praktik Live
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
