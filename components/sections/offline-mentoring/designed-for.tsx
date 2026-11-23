import { CheckCircle2, XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const fitList = [
  "Bisnis sudah berjalan dan ingin scale up lebih rapi",
  "Ingin tim kerja lebih cepat dengan integrasi AI",
  "Ingin sistem konten TikTok & Instagram yang repeatable",
  "Workflow konten ingin lebih cepat dan terdelegasi",
  "Alur closing DM & WhatsApp ingin lebih terstruktur",
];

const notFitList = [
  "Hanya ingin belajar teori tanpa keseriusan implementasi",
  "Belum siap konsisten menjalankan sistem yang dibuat",
  "Mencari hasil instan tanpa proses uji coba & evaluasi",
  "Belum memiliki waktu membangun fondasi bisnis",
];

export default function MentoringDesignedFor() {
  return (
    <Section variant="default" borderTop>
      <Container size="xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Untuk Bisnis yang Siap Naik Level
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="subtle" padding="lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50">
                Cocok untuk Anda jika:
              </h3>
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
              {fitList.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-zinc-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="default" padding="lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                <XCircle size={18} />
              </div>
              <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50">
                Kurang cocok jika:
              </h3>
            </div>
            <ul className="space-y-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              {notFitList.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-zinc-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
