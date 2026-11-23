import Link from "next/link";
import {
  Laptop,
  LineChart,
  MessageSquare,
  Sparkles,
  Video,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { programs } from "@/config/programs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const deliverables = [
  {
    icon: Video,
    title: "8x Sesi Live Eksklusif",
    description:
      "Pertemuan privat khusus untuk satu tim bisnis Anda bersama mentor via Google Meet.",
  },
  {
    icon: Laptop,
    title: "Share Screen Praktek Langsung",
    description:
      "Kami memandu langkah demi langkah cara menjalankan tools AI langsung dari laptop tim Anda.",
  },
  {
    icon: Workflow,
    title: "SOP Produksi & Delegasi",
    description:
      "Dokumen alur kerja harian yang menghubungkan riset, penulisan skrip, produksi, hingga upload.",
  },
  {
    icon: Sparkles,
    title: "Custom Prompt Library",
    description:
      "Kumpulan prompt AI yang sudah disesuaikan dengan gaya bahasa dan penawaran bisnis jasa Anda.",
  },
  {
    icon: MessageSquare,
    title: "Training Admin Closing",
    description:
      "SOP serta latihan skrip balasan DM dan WhatsApp agar leads yang masuk terkonversi lebih rapi.",
  },
  {
    icon: LineChart,
    title: "Audit Data & Evaluasi",
    description:
      "Pembacaan metrik konten dan chat mingguan untuk terus menyempurnakan angle konten yang menang.",
  },
];

export default function OnlineMentoringWhatYouGet() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Semua yang Tim Anda Dapatkan di Online Mentoring
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Output akhir kami bukan sekadar tim paham teori AI, tetapi tim
            punya SOP nyata dan skrip kerja yang bisa diulang setiap minggu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" interactive padding="lg">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 mb-5">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Berdomisili di Yogyakarta atau membutuhkan sesi workshop fisik di
            kantor? Cek paket{" "}
            <span className="font-semibold text-zinc-950 dark:text-white">
              Offline Mentoring ({programs.offlineMentoring.priceFormatted})
            </span>
            .
          </p>
          <Link
            href={programs.offlineMentoring.path}
            className="text-sm font-semibold text-zinc-950 dark:text-white hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Lihat Offline Mentoring</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
