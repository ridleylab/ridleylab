import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
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
                <WhatsAppIcon className="w-4 h-4" />
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
            <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl">
              <Image
                src="/images/services/offline-mentoring-hero.jpg"
                alt={`Sesi workshop ${siteConfig.name} pelatihan AI Social Media Marketing untuk tim bisnis jasa`}
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
