import {
  BarChart2,
  BatteryLow,
  Database,
  Quote,
  Repeat,
  UserCog,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const challenges = [
  {
    icon: Repeat,
    title: "Tidak ada sistem repeatable",
    description:
      "Konten dibuat berdasarkan mood dan ide dadakan. Belum ada SOP produksi yang konsisten untuk tim.",
  },
  {
    icon: Users,
    title: "Tim ada, tapi belum terarah",
    description:
      "Staf belum memiliki workflow kerja yang jelas, template prompt, maupun standar evaluasi performa.",
  },
  {
    icon: BatteryLow,
    title: "Produksi terasa melelahkan",
    description:
      "Karena belum ada alur kerja yang efisien, proses riset hingga syuting terasa lambat dan memicu burnout.",
  },
  {
    icon: BarChart2,
    title: "Sudah keluar biaya, sulit diukur",
    description:
      "Konten tetap diproduksi rutin, tetapi belum terhubung ke sistem akuisisi leads yang terukur.",
  },
  {
    icon: UserCog,
    title: "Owner masih terlibat teknis",
    description:
      "Bisnis sulit scale up karena hampir seluruh ide konten dan keputusan harian masih bergantung ke owner.",
  },
  {
    icon: Database,
    title: "Data insight sering diabaikan",
    description:
      "Konten diunggah tanpa pembacaan data performa, sehingga pengembangan materi berikutnya kurang terarah.",
  },
];

export default function MentoringChallenges() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Produksi Konten Masih Lambat, Karena Tim Belum Pakai AI
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Banyak bisnis sebenarnya sudah aktif membuat konten. Namun produksi
            masih serba manual, memakan waktu lama, dan tim belum tahu cara
            mengintegrasikan AI ke pekerjaan harian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {challenges.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" interactive padding="lg">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border-l-4 border-zinc-950 dark:border-zinc-100 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-7 sm:p-9">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
              <Quote size={18} />
            </div>
            <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
              Dalam banyak kasus, masalahnya bukan pada kreativitas. Masalahnya
              adalah bisnis belum melatih tim menggunakan AI untuk mempercepat
              alur kerja dan efisiensi produksi konten.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
