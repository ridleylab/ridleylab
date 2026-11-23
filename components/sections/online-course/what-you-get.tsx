import { FileCheck2, Search, Target, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const modules = [
  {
    icon: Search,
    title: "Riset Konten dengan AI",
    description:
      "Membaca kebutuhan market bisnis jasa dan memetakan ide konten relevan secara presisi menggunakan AI.",
  },
  {
    icon: Workflow,
    title: "Workflow Berbasis AI",
    description:
      "Mempercepat brainstorming, penulisan skrip hook–isi–CTA, hingga jadwal produksi agar kerja tim efisien.",
  },
  {
    icon: FileCheck2,
    title: "SOP AI & Delegasi Tim",
    description:
      "Panduan praktis menyerahkan alur produksi konten ke staf dengan instruksi yang jelas dan mudah diulang.",
  },
  {
    icon: Target,
    title: "Landing Page & Closing",
    description:
      "Menata penawaran serta respons admin agar audiens lebih yakin untuk berkonsultasi hingga transaksi.",
  },
];

export default function CourseWhatYouGet() {
  return (
    <Section variant="default" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Semua yang Dibutuhkan untuk Membangun Tim Marketing Berbasis AI
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Bukan sekadar teori konten, melainkan panduan operasional yang
            membuat bisnis bergerak lebih cepat dan rapi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="subtle" interactive padding="lg">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 mb-6">
                  <Icon size={21} />
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
