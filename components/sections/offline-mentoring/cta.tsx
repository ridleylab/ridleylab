import Image from "next/image";
import { Check } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const summaryBullets = [
  "8x Sesi Tatap Muka Intensif",
  "Implementasi Sistem Bersama Tim",
  "Full SOP & Template Prompt AI",
];

export default function MentoringCTA() {
  const program = programs.offlineMentoring;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <Section variant="inverted" spacing="lg">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT */}
          <div className="min-w-0 lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-white mb-5">
              Siap Mentransformasi Tim Marketing Anda dengan AI?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Ajukan sesi konsultasi awal untuk memetakan kebutuhan tim Anda.
              Kami akan mengecek kecocokan format workshop tatap muka maupun
              online untuk scale up bisnis Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-5">
              <ButtonLink href={whatsappUrl} external variant="inverted" size="lg">
                <WhatsAppIcon className="w-4 h-4" />
                <span>Daftar &amp; Kurasi Sekarang</span>
              </ButtonLink>
              <ButtonLink href="/services/online-mentoring" variant="inverted-outline" size="lg">
                Cek Online Mentoring (Rp4jt)
              </ButtonLink>
            </div>

            <p className="text-xs text-zinc-500 italic mb-8">
              *Slot dibatasi agar mentor tetap fokus membimbing setiap tim klien.
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-white text-4xl sm:text-5xl font-semibold tracking-tight">
                {program.priceFormatted}
              </span>
              <span className="text-zinc-400 text-sm sm:text-base">
                {program.priceUnit}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-300">
              {summaryBullets.map((item) => (
                <div key={item} className="inline-flex items-center gap-2">
                  <Check size={15} className="text-white shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="min-w-0 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[4/5]">
              <Image
                src="/images/services/cta.png"
                alt="Preview implementasi sistem Offline Mentoring RidleyLab"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 440px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
