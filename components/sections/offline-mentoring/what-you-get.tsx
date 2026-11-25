import Image from "next/image";
import {
  Calendar,
  Check,
  Laptop,
  LineChart,
  MessageSquare,
  Rocket,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Calendar,
    title: "8x Sesi Tatap Muka",
    desc: "Pendampingan langsung untuk strategi, implementasi, serta evaluasi eksekusi.",
  },
  {
    icon: Laptop,
    title: "Praktek AI Bersama",
    desc: "Kami pandu tim Anda mengoperasikan AI langsung, bukan sekadar memberi materi.",
  },
  {
    icon: Workflow,
    title: "Workflow AI Lengkap",
    desc: "SOP produksi yang menggabungkan tenaga manusia dan kecepatan AI.",
  },
  {
    icon: Sparkles,
    title: "Template Prompt AI",
    desc: "Prompt siap pakai agar riset dan scripting lebih cepat serta konsisten.",
  },
  {
    icon: MessageSquare,
    title: "Training Admin Closing",
    desc: "SOP komunikasi untuk DM & WhatsApp agar leads berujung transaksi.",
  },
  {
    icon: LineChart,
    title: "Monitoring & Feedback",
    desc: "Evaluasi sistematis untuk peningkatan performa konten berkelanjutan.",
  },
];

export default function MentoringWhatYouGet() {
  return (
    <Section variant="default" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            Semua yang Dibutuhkan Tim Anda untuk Menguasai AI Marketing
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch mb-14">
          {/* IMAGE */}
          <div className="min-w-0 lg:col-span-5 lg:relative flex items-center justify-center">
            <div className="w-full max-w-[400px] lg:max-w-none lg:absolute lg:inset-0 flex items-center justify-center">
              <Image
                src="/images/services/ai-powered.png"
                alt="Preview output sistem konten AI dan SOP Offline Mentoring RidleyLab"
                width={1122}
                height={1402}
                className="w-full h-auto lg:w-auto lg:max-w-full lg:h-full object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
          </div>

          {/* CARDS */}
          <div className="min-w-0 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} variant="subtle" interactive padding="md">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Highlight */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-7 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center shrink-0">
                <Wrench size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Bukan Sekadar Materi
                </p>
                <p className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
                  Sistem siap dijalankan oleh tim Anda
                </p>
              </div>
            </div>

            <div className="space-y-2 lg:border-x lg:border-zinc-200 dark:lg:border-zinc-800 lg:px-8 text-sm text-zinc-800 dark:text-zinc-200">
              <p className="flex items-center gap-2 font-medium">
                <Check size={15} /> SOP operasional yang jelas
              </p>
              <p className="flex items-center gap-2 font-medium">
                <Check size={15} /> Workflow produksi terstruktur
              </p>
              <p className="flex items-center gap-2 font-medium">
                <Check size={15} /> Evaluasi hasil yang terukur
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center shrink-0">
                <Rocket size={20} />
              </div>
              <div>
                <p className="text-[11px] uppercase font-semibold tracking-wider text-zinc-500 dark:text-zinc-400">
                  Tujuan Akhir
                </p>
                <p className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
                  Mesin konten yang bekerja konsisten
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
