import { Search, PenTool, Cpu, MessageSquareCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    icon: Search,
    title: "Riset & Ideasi Cepat",
    description:
      "Gunakan AI untuk membaca kebutuhan market dan menemukan ide konten relevan dalam hitungan menit, bukan jam.",
  },
  {
    icon: PenTool,
    title: "Scripting Berkualitas",
    description:
      "Latih tim menghasilkan script hook dan storytelling yang terstruktur dan terbukti menarik perhatian calon klien.",
  },
  {
    icon: Cpu,
    title: "Workflow Berbasis AI",
    description:
      "AI diintegrasikan langsung ke dalam rutinitas kerja harian tim marketing beserta pembagian peran yang jelas.",
  },
  {
    icon: MessageSquareCheck,
    title: "SOP Konversi & Closing",
    description:
      "Standar respon DM Instagram dan WhatsApp agar chat yang masuk lebih cepat ditangani hingga closing.",
  },
];

export default function HomeSolution() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5 leading-tight">
            Pelatihan AI Praktis untuk Tim Marketing Anda
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Bukan sekadar teori prompt umum. Kami melatih tim Anda memakai AI
            untuk mempercepat produksi konten, merapikan workflow, dan
            meningkatkan konversi leads.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" interactive padding="lg">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-lg text-zinc-950 dark:text-zinc-50 mb-3">
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
