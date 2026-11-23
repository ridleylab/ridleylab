import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Globe, PlayCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function CourseCTA() {
  const program = programs.onlineCourse;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CONTENT */}
          <div className="min-w-0 lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight mb-5">
              Saatnya Latih Tim Anda Menggunakan AI Agar Bisnis Tumbuh
              Konsisten
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Berhenti menghabiskan jam kerja dengan produksi konten manual.
              Mulai bangun workflow AI yang lebih rapi dan menghasilkan closing
              secara terukur.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
              <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                <WhatsAppIcon className="w-4 h-4" />
                <span>Akses Online Course ({program.priceFormatted})</span>
              </ButtonLink>
              <ButtonLink href="/services/online-mentoring" variant="outline" size="lg">
                Ingin Pendampingan Tim Live?
              </ButtonLink>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-zinc-950 dark:text-zinc-100" />
                <span>Akses materi fleksibel</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Globe size={16} className="text-zinc-950 dark:text-zinc-100" />
                <span>Belajar dari mana saja</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <PlayCircle size={16} className="text-zinc-950 dark:text-zinc-100" />
                <span>Bisa diputar ulang</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
              Punya tim konten yang ingin dibimbing langsung 8x sesi? Pelajari{" "}
              <Link
                href={programs.onlineMentoring.path}
                className="font-semibold text-zinc-950 dark:text-zinc-200 underline underline-offset-4"
              >
                Online Mentoring via Google Meet
              </Link>
              .
            </p>
          </div>

          {/* IMAGE */}
          <div className="min-w-0 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden p-4">
              <Image
                src="/images/services/online-course-cta.png"
                alt="Preview materi Online Course AI Social Media Marketing RidleyLab"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
