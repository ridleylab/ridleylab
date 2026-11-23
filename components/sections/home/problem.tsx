import { Clock, FileText, RefreshCw, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const problems = [
  {
    icon: Clock,
    title: "Proses riset konten lambat karena serba manual",
    detail:
      "Ide konten dikumpulkan tanpa sistem sehingga tim menghabiskan jam kerja hanya untuk mencari bahan.",
  },
  {
    icon: FileText,
    title: "Tim bingung cara menulis script yang menarik",
    detail:
      "Hook video kurang menggigit dan narasi belum mengarah pada ketertarikan calon klien bisnis jasa.",
  },
  {
    icon: RefreshCw,
    title: "Produksi tidak konsisten dan boros waktu",
    detail:
      "Upload sering berhenti di tengah jalan karena tidak ada template kerja dan SOP produksi harian.",
  },
  {
    icon: Workflow,
    title: "Tahu ada AI, tapi bingung integrasi ke workflow",
    detail:
      "AI hanya dipakai sesekali untuk tanya jawab acak, belum terpasang menjadi pipeline tim marketing.",
  },
];

export default function HomeProblem() {
  return (
    <Section variant="inverted">
      <Container size="xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.12] text-white mb-6">
              Masalahnya Bukan di Kreativitas, Tapi Tim Belum Memaksimalkan AI.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Banyak bisnis sebenarnya sudah punya tim. Namun proses riset,
              produksi konten, hingga tindak lanjut chat masih berjalan manual
              dan bergantung penuh pada keputusan owner.
            </p>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 hover:border-zinc-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white mb-5">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-white leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                Selama semuanya masih manual dan bergantung pada owner, bisnis
                akan terus membuang banyak waktu.{" "}
                <span className="font-semibold text-white">
                  Tim Anda membutuhkan skill dan sistem kerja berbasis AI.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
