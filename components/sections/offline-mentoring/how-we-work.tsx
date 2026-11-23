import { CalendarCheck, Cpu, Target, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const pillars = [
  {
    icon: CalendarCheck,
    title: "Pendampingan Offline Terstruktur",
    description:
      "8 sesi tatap muka intensif di lokasi untuk memastikan seluruh implementasi berjalan tanpa hambatan teknis.",
  },
  {
    icon: Target,
    title: "Strategi Spesifik Bisnis Anda",
    description:
      "Analisis funnel, positioning jasa, dan target pasar sebelum menyusun blueprint konten bisnis Anda.",
  },
  {
    icon: Cpu,
    title: "Training Tim Berbasis AI",
    description:
      "Tim dilatih langsung menggunakan template prompt AI dan SOP produksi agar rutinitas harian jauh lebih efisien.",
  },
  {
    icon: TrendingUp,
    title: "Evaluasi & Scale-up Rutin",
    description:
      "Audit performa berkala untuk memastikan sistem konten menghasilkan leads dan closing yang terukur.",
  },
];

export default function MentoringHowWeWork() {
  return (
    <Section variant="inverted">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="inverted" className="mb-4">
            Metode Transformasi
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-tight">
            Bukan Sekadar Pelatihan. Ini Transformasi Tim Anda dengan AI.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Kami turun mendampingi bisnis Anda membangun workflow AI yang
            mempercepat seluruh proses dari ide konten hingga closing admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 hover:border-zinc-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center mb-5">
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-base text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
