import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { programs } from "@/config/programs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export default function HomeOffer() {
  const orderedPrograms = [
    {
      program: programs.onlineCourse,
      subtitle: "Belajar mandiri sistem akuisisi TikTok & Instagram.",
      highlighted: false,
      note: "Akses langsung seluruh modul",
    },
    {
      program: programs.onlineMentoring,
      subtitle: "Pendampingan live 8x via Google Meet untuk tim seluruh Indonesia.",
      highlighted: true,
      note: "Populer untuk tim luar Yogyakarta",
    },
    {
      program: programs.offlineMentoring,
      subtitle: "Workshop tatap muka intensif 8x sesi di lokasi bisnis Anda.",
      highlighted: false,
      note: "Area Yogyakarta & In-House",
    },
  ];

  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="outline" className="mb-4">
            3 Pilihan Program
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5 leading-tight">
            Program Pelatihan AI Marketing
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Pilih format belajar yang paling sesuai dengan tahap tim Anda —
            mandiri lewat Online Course, pendampingan live via Google Meet, atau
            workshop tatap muka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {orderedPrograms.map(({ program, subtitle, highlighted, note }) => (
            <div
              key={program.key}
              className={
                highlighted
                  ? "rounded-3xl p-8 bg-zinc-950 dark:bg-zinc-900 text-zinc-50 border border-zinc-800 dark:border-zinc-700 shadow-xl flex flex-col"
                  : "rounded-3xl p-8 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 flex flex-col"
              }
            >
              <div className="flex items-center justify-between gap-2 mb-5">
                <Badge variant={highlighted ? "inverted" : "default"}>
                  {program.badge}
                </Badge>
                {highlighted && (
                  <span className="text-[11px] font-medium text-zinc-400">
                    Tanpa Biaya Transport
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-semibold tracking-tight mb-2">
                {program.name}
              </h3>
              <p
                className={
                  highlighted
                    ? "text-sm text-zinc-400 leading-relaxed mb-6"
                    : "text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6"
                }
              >
                {subtitle}
              </p>

              <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {program.priceFormatted}
                  </span>
                  <span
                    className={
                      highlighted
                        ? "text-xs text-zinc-400"
                        : "text-xs text-zinc-500 dark:text-zinc-400"
                    }
                  >
                    {program.priceUnit}
                  </span>
                </div>
                <p
                  className={
                    highlighted
                      ? "text-xs text-zinc-400 mt-1.5"
                      : "text-xs text-zinc-500 dark:text-zinc-400 mt-1.5"
                  }
                >
                  {note}
                </p>
              </div>

              <ul
                className={
                  highlighted
                    ? "space-y-3 text-sm text-zinc-300 mb-8 flex-1"
                    : "space-y-3 text-sm text-zinc-700 dark:text-zinc-300 mb-8 flex-1"
                }
              >
                {program.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check size={16} className="shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={program.path}
                variant={highlighted ? "inverted" : "primary"}
                size="lg"
                fullWidth
              >
                <span>Detail {program.name}</span>
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline"
          >
            <span>Bandingkan tabel lengkap 3 program layanan</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
