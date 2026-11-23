import {
  CheckSquare,
  ClipboardList,
  Infinity as InfinityIcon,
  PlayCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { programs } from "@/config/programs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const deliverables = [
  {
    icon: PlayCircle,
    title: "10+ Video Pembelajaran",
    desc: "Materi terstruktur yang bisa dipelajari ulang kapan saja sesuai jadwal Anda.",
  },
  {
    icon: Sparkles,
    title: "Template Prompt AI",
    desc: "Prompt siap adaptasi untuk riset ide, penulisan skrip, dan optimasi penawaran.",
  },
  {
    icon: ClipboardList,
    title: "SOP Tim Konten",
    desc: "Membantu workflow harian tim lebih rapi dan konsisten.",
  },
  {
    icon: CheckSquare,
    title: "Bonus Checklist",
    desc: "Checklist audit akun dan fondasi profil agar siap menerima leads.",
  },
  {
    icon: InfinityIcon,
    title: "Sekali Bayar",
    desc: "Tidak ada tagihan langganan bulanan untuk mengakses materi course.",
  },
  {
    icon: RefreshCw,
    title: "Update Materi Baru",
    desc: "Penyesuaian materi sesuai perkembangan tren konten dan tools AI.",
  },
];

export default function CourseOffer() {
  const program = programs.onlineCourse;

  return (
    <Section variant="inverted">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-tight">
            Semua Materi Pelatihan AI Ini Bisa Anda Akses Sekali Bayar
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
            Dirancang untuk membantu bisnis membangun fondasi tim marketing yang
            lebih rapi, cepat beradaptasi, dan siap berkembang.
          </p>

          <div className="inline-flex items-baseline gap-3 rounded-full bg-white text-zinc-950 px-7 py-3.5 shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Investasi
            </span>
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {program.priceFormatted}
            </span>
            <span className="text-xs text-zinc-600">{program.priceUnit}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 text-center flex flex-col items-center hover:border-zinc-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
