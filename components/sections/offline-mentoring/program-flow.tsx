import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const steps = [
  {
    num: "01",
    title: "Audit & Diagnosa",
    description:
      "Memetakan kondisi bisnis, target market, serta bottleneck operasional yang menghambat pertumbuhan.",
  },
  {
    num: "02",
    title: "AI Strategy & Workflow",
    description:
      "Menyusun SOP kerja tim, template prompt AI khusus brand Anda, dan alur produksi yang efisien.",
  },
  {
    num: "03",
    title: "Implementasi AI Tools",
    description:
      "Melatih tim menerapkan AI dalam riset konten, scripting harian, hingga SOP balasan admin closing.",
  },
  {
    num: "04",
    title: "Optimasi & Scale Up",
    description:
      "Evaluasi eksekusi nyata di lapangan agar output leads semakin stabil dan siap ditingkatkan.",
  },
];

export default function MentoringProgramFlow() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight mb-4">
            Dari Operasional Acak Menjadi Sistem Konten yang Bisa Jalan Bersama
            Tim
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Proses pendampingan dirancang agar tim tidak hanya memahami teori,
            tetapi memiliki SOP nyata yang berjalan setiap minggu.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="space-y-10">
            {steps.map((step, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={step.num}
                  className={`relative flex flex-col md:flex-row ${
                    isReversed ? "md:flex-row-reverse" : ""
                  } items-start md:items-center`}
                >
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center text-xs font-semibold z-10 border-4 border-zinc-50 dark:border-zinc-950">
                    {step.num}
                  </div>
                  <div
                    className={`pl-14 md:pl-0 md:w-1/2 ${
                      isReversed ? "md:pl-14 text-left" : "md:pr-14 md:text-right"
                    }`}
                  >
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6">
                      <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
