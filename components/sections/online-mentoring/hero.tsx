import Link from "next/link";
import {
  Check,
  MessageCircle,
  Mic,
  Monitor,
  Users,
  Video,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const checklist = [
  "8x sesi live via Google Meet",
  "Kurikulum custom sesuai bisnis",
  "SOP produksi konten & delegasi",
  "Template prompt AI siap pakai",
  "Training admin closing DM & WA",
  "Evaluasi eksekusi + rekaman sesi",
];

export default function OnlineMentoringHero() {
  const program = programs.onlineMentoring;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <Section variant="default" spacing="none" className="pt-8 pb-16 md:pt-12 md:pb-24">
      <Container size="xl">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: program.name, path: program.path },
          ]}
          className="mb-8"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <Badge variant="outline" className="mb-5">
              {program.badge} · {program.priceFormatted} {program.priceUnit}
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.09] text-zinc-950 dark:text-zinc-50 mb-6">
              Online Mentoring AI Social Media Marketing Live via Google Meet.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
              Pendampingan intensif 8x pertemuan untuk tim bisnis jasa di
              seluruh Indonesia. Bab materi, setup SOP, prompt AI, hingga
              training admin closing sama persis dengan Offline Mentoring —
              tanpa biaya akomodasi ke luar kota.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <Check
                    size={16}
                    className="shrink-0 text-zinc-950 dark:text-zinc-50"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
              <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                <MessageCircle size={17} />
                <span>{program.ctaLabel}</span>
              </ButtonLink>
              <ButtonLink
                href={programs.offlineMentoring.path}
                variant="outline"
                size="lg"
              >
                Lihat Versi Tatap Muka
              </ButtonLink>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Privat 1 bisnis per kelas · Jadwal fleksibel · Rekaman sesi tersedia.{" "}
              <Link
                href="/lokasi/jakarta"
                className="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-200"
              >
                Cek layanan luar kota
              </Link>
              .
            </p>
          </div>

          {/* RIGHT — Monochrome Google Meet Session Preview UI */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-5 sm:p-6 shadow-2xl">
              {/* Top Call Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold tracking-wide">
                    Google Meet · Sesi 3 / 8
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium">
                  Privat Tim Bisnis Jasa
                </span>
              </div>

              {/* Shared Screen Area */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 mb-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-zinc-200 font-medium">
                    <Monitor size={14} />
                    <span>Screen Share · Bedah Funnel &amp; Prompt AI</span>
                  </span>
                  <span>Direct Feedback</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-left">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      Tahap 1
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      Riset Angle &amp; Hook AI
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      Tahap 2
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      SOP Produksi Tim
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      Tahap 3
                    </p>
                    <p className="text-xs font-semibold text-white mt-1">
                      Skrip Closing WA
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {["Mentor RidleyLab", "Owner Bisnis", "Tim Konten", "Admin CS / WA"].map(
                  (role) => (
                    <div
                      key={role}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2.5 flex items-center gap-2"
                    >
                      <Users size={13} className="text-zinc-400 shrink-0" />
                      <span className="text-[11px] font-medium text-zinc-200 truncate">
                        {role}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                    <Mic size={14} />
                  </span>
                  <span className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                    <Video size={14} />
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  Seluruh materi &amp; template Notion/Doc dibagikan setelah sesi
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
