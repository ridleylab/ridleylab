import { Layers, SlidersHorizontal, Users } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function HomeCTA() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <Section variant="inverted" spacing="lg">
      <Container size="lg" className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white max-w-3xl mx-auto mb-5">
          Mau Lanjut Kerja Manual, atau Bangun Tim Marketing Berbasis AI
          Sekarang?
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Setiap minggu tanpa sistem kerja berbasis AI membuat produksi konten
          tetap berat di owner dan tim tertinggal dari kompetitor yang bergerak
          lebih cepat.
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-12">
          <ButtonLink href="/services" variant="inverted" size="lg">
            Bandingkan Program
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl}
            external
            variant="inverted-outline"
            size="lg"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Tanya dulu via WhatsApp</span>
          </ButtonLink>
        </div>

        <div className="border-t border-zinc-800 pt-8 grid sm:grid-cols-3 gap-6 text-zinc-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Layers size={16} className="text-zinc-300" />
            <span>Kurikulum Berbasis Kasus Nyata</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <SlidersHorizontal size={16} className="text-zinc-300" />
            <span>SOP &amp; Template Prompt Siap Pakai</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users size={16} className="text-zinc-300" />
            <span>Untuk Owner &amp; Tim Bisnis Jasa</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
