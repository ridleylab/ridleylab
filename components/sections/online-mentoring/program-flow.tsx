import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const phases = [
  {
    step: "Sesi 01 – 02",
    title: "Audit Bisnis & Strategi Funnel",
    description:
      "Memetakan penawaran jasa Anda, profil target klien, bottleneck akun sosial media saat ini, dan menyusun arsitektur funnel TikTok–IG menuju WhatsApp.",
  },
  {
    step: "Sesi 03 – 04",
    title: "Instalasi AI Workflow & Prompt Bank",
    description:
      "Membangun prompt khusus brand voice bisnis Anda untuk riset angle, penyusunan hook, penulisan script video pendek, dan kalender produksi mingguan.",
  },
  {
    step: "Sesi 05 – 06",
    title: "SOP Tim Konten & Training Admin Closing",
    description:
      "Menyusun SOP delegasi dari riset hingga upload agar tidak bergantung pada owner, dilanjutkan simulasi respon DM dan skrip follow-up WhatsApp admin.",
  },
  {
    step: "Sesi 07 – 08",
    title: "Review Eksekusi Nyata & Optimasi Scale Up",
    description:
      "Membedah data konten yang sudah tayang selama mentoring berjalan, memperbaiki bagian yang masih bocor, dan menetapkan ritme kerja jangka panjang.",
  },
];

export default function OnlineMentoringFlow() {
  return (
    <Section variant="default" borderTop>
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="outline" className="mb-4">
            Alur 8x Pertemuan
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Roadmap Implementasi via Google Meet
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Bukan kelas webinar ramai-ramai. Seluruh 8 pertemuan berjalan fokus
            membangun mesin konten dan closing untuk bisnis Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {phases.map((phase) => (
            <div
              key={phase.step}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-7"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 mb-4">
                {phase.step}
              </span>
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50 mb-2.5">
                {phase.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
