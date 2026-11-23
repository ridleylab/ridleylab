import { CheckCircle2, Clock, PlaneTakeoff, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const reasons = [
  {
    icon: PlaneTakeoff,
    title: "Hemat Tanpa Biaya Transport",
    description:
      "Tim di Jakarta, Bandung, Semarang, Surabaya, Malang, atau kota lain cukup bayar Rp4.000.000/tim tanpa tambahan tiket dan akomodasi.",
  },
  {
    icon: CheckCircle2,
    title: "100% Kurikulum & Output Sama",
    description:
      "Seluruh 8 bab, audit akun, instalasi prompt AI, SOP produksi tim, hingga simulasi skrip closing sama persis dengan versi Offline Mentoring.",
  },
  {
    icon: Clock,
    title: "Jadwal Fleksibel Mengikuti Tim",
    description:
      "Durasi dan jadwal 8x sesi diatur 1–2 kali per minggu agar tim tetap sempat mengeksekusi konten nyata di kantor sebelum evaluasi berikutnya.",
  },
  {
    icon: Video,
    title: "Rekaman Sesi untuk Onboarding",
    description:
      "Setiap sesi Google Meet dapat direkam sehingga menjadi aset pelatihan internal apabila suatu saat tim Anda menambah staf baru.",
  },
];

export default function OnlineMentoringWhy() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Efektivitas Setara Workshop Tatap Muka, Lebih Ringkas &amp; Hemat
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Setiap pertemuan berlangsung interaktif secara privat untuk satu
            bisnis saja, sehingga kami membedah layar, akun, dan prompt AI milik
            tim Anda secara langsung.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" interactive padding="lg">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
