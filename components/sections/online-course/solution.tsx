import { Cpu, LayoutTemplate } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const pillars = [
  {
    icon: TikTokIcon,
    title: "TikTok",
    description:
      "Menjangkau audiens baru secara organik lewat format video pendek yang mudah menyebar.",
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    description:
      "Membangun kredibilitas portofolio jasa dan trust agar calon klien mantap menghubungi Anda.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Workflow",
    description:
      "Memanfaatkan AI untuk mempercepat riset topik, penulisan hook, hingga skrip harian tim.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page & WA Funnel",
    description:
      "Mengarahkan traffic organik menjadi chat konsultasi dan transaksi dengan alur yang jelas.",
  },
];

export default function CourseSolution() {
  return (
    <Section variant="inverted">
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-tight">
            Bangun Sistem Penjualan Terstruktur dengan TikTok, Instagram, AI, dan
            Landing Page
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Bukan sekadar mengejar video viral, tetapi menyambungkan empat pilar
            utama agar perhatian audiens berubah menjadi inquiry bisnis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 hover:border-zinc-600 transition-colors flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-zinc-400 italic text-base sm:text-lg max-w-3xl mx-auto">
          &ldquo;Tarik perhatian audiens, bangun kepercayaan, lalu ubah menjadi
          penjualan dengan sistem yang bisa dijalankan secara konsisten.&rdquo;
        </p>
      </Container>
    </Section>
  );
}
