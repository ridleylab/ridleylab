import { Check, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const points = [
  "8x Sesi Live Interaktif via Google Meet",
  "Kurikulum & SOP Disesuaikan Bisnis Anda",
  "Rekaman Sesi + Template Prompt AI",
];

export default function OnlineMentoringCTA() {
  const program = programs.onlineMentoring;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <Section variant="inverted" spacing="lg">
      <Container size="lg">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Badge variant="inverted" className="mb-5">
              Slot Bulanan Terbatas
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white mb-5">
              Siap Latih Tim Anda Pakai AI Lewat Google Meet?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              Ajukan sesi konsultasi singkat bersama RidleyLab untuk membahas
              kondisi tim, kebutuhan SOP, dan penjadwalan 8x pertemuan live.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
              <ButtonLink href={whatsappUrl} external variant="inverted" size="lg">
                <MessageCircle size={17} />
                <span>Daftar Online Mentoring Sekarang</span>
              </ButtonLink>
              <ButtonLink href="/services" variant="inverted-outline" size="lg">
                Bandingkan Program Lain
              </ButtonLink>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-300">
              {points.map((pt) => (
                <div key={pt} className="inline-flex items-center gap-2">
                  <Check size={15} className="text-white shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Investasi Program
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  {program.priceFormatted}
                </span>
                <span className="text-sm text-zinc-400">{program.priceUnit}</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4 mt-4">
                Sudah termasuk keikutsertaan owner, tim konten/kreator, serta
                admin CS dalam satu kelas khusus bisnis Anda. Tanpa biaya
                perjalanan mentor.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
