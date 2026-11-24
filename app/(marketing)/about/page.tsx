import { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { InstagramIcon, TikTokIcon } from "@/components/ui/social-icons";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAboutSchemaGraph } from "@/lib/seo/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: `Tentang ${siteConfig.name} & Founder`,
  description: `Pelajari lebih lanjut tentang misi ${siteConfig.name} dan founder ${siteConfig.founder.name} dalam membantu bisnis jasa membangun sistem konten dan alur konversi otomatis berbasis AI.`,
  path: "/about",
});

const metrics = [
  {
    icon: TrendingUp,
    value: "3x Lipat",
    label: "Interaksi & chat masuk dalam 50 hari",
  },
  {
    icon: Users,
    value: "283+",
    label: "Leads bisnis baru dari konten organik",
  },
  {
    icon: Award,
    value: "6.500+",
    label: "Pertumbuhan follower murni organik",
  },
  {
    icon: Zap,
    value: "100%",
    label: "Tim lebih efisien tanpa tambah SDM",
  },
];

export default function AboutPage() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <>
      <JsonLd data={getAboutSchemaGraph()} />

      <Section
        variant="default"
        spacing="none"
        className="pt-8 pb-16 md:pt-12 md:pb-20"
      >
        <Container size="xl">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
            className="mb-8"
          />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5 leading-tight">
              Tentang {siteConfig.name}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Platform Pelatihan AI Social Media Marketing untuk membantu bisnis
              jasa beradaptasi, membangun sistem konten yang kuat, dan
              menciptakan alur konversi terukur berbasis AI.
            </p>
          </div>

          {/* MISSION & METRICS */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5">
                Misi Kami
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed text-sm sm:text-base">
                Banyak bisnis punya target pertumbuhan besar, namun lupa bahwa
                target tersebut membutuhkan operasional konten yang cepat dan
                rapi. Di era digital saat ini, adaptasi terhadap Artificial
                Intelligence (AI) bukan sekadar tren, melainkan fondasi efisiensi
                tim.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-sm sm:text-base">
                {siteConfig.name} hadir mengajarkan tim Anda cara memakai AI
                secara taktis — mulai dari riset angle konten, penulisan skrip,
                hingga teknik <em>closing</em> di DM dan WhatsApp dengan latihan
                berbasis kasus nyata.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5">
                <ButtonLink href="/services" variant="primary" size="lg">
                  <span>Lihat Semua Layanan</span>
                  <ArrowRight size={16} />
                </ButtonLink>
                <ButtonLink
                  href={programs.onlineMentoring.path}
                  variant="outline"
                  size="lg"
                >
                  {programs.onlineMentoring.name}
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <Card
                    key={m.value}
                    variant="subtle"
                    padding="lg"
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 text-zinc-950 dark:text-zinc-50">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-1.5">
                      {m.value}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                      {m.label}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FOUNDER */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-7 pt-7 pb-7 sm:px-10 sm:pt-10 md:pb-0 mb-20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 md:items-end">
              <div className="min-w-0 md:col-span-5 lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-square">
                  <Image
                    src="/images/about/zakaanshori.png"
                    alt={`${siteConfig.founder.name} - ${siteConfig.founder.role}`}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 100vw, 340px"
                  />
                </div>
              </div>

              <div className="min-w-0 md:col-span-7 lg:col-span-8 md:pb-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  {siteConfig.founder.role}
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5">
                  {siteConfig.founder.name}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  <p>
                    Saya mendirikan {siteConfig.name} dengan satu keyakinan:
                    teknologi AI harus bisa diakses dan diterapkan secara
                    praktis oleh bisnis jasa yang ingin berkembang lebih cepat.
                  </p>
                  <p>
                    Pengalaman lapangan menunjukkan bahwa kendala terbesar
                    banyak pengusaha bukanlah kurangnya ide, melainkan lambatnya
                    eksekusi produksi dan belum adanya sistem konversi yang
                    terdokumentasi untuk tim.
                  </p>
                  <p>
                    Melalui kurikulum kursus dan <em>mentoring</em> langsung di{" "}
                    {siteConfig.name}, fokus kami membantu tim Anda menjadikan AI
                    sebagai bagian nyata dari operasional marketing sehari-hari.
                  </p>
                </div>

                <ButtonLink
                  href={siteConfig.founder.portfolioUrl}
                  external
                  variant="outline"
                  size="sm"
                >
                  <span>Portfolio Personal Founder</span>
                  <ExternalLink size={14} />
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 text-center mb-10">
              Hubungi Kami
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <Card variant="default" padding="md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-950 dark:text-zinc-50">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 mb-1">
                      Basecamp
                    </h3>
                    <a
                      href={siteConfig.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors block leading-relaxed"
                    >
                      {siteConfig.address.streetAddress}
                      <br />
                      {siteConfig.address.locality},{" "}
                      {siteConfig.address.regionShort}{" "}
                      {siteConfig.address.postalCode}
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="default" padding="md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-950 dark:text-zinc-50">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 mb-1">
                      WhatsApp
                    </h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      {siteConfig.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </Card>

              <Card variant="default" padding="md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-950 dark:text-zinc-50">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-10 flex justify-center gap-6">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>{siteConfig.social.instagram.handle}</span>
              </a>
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
                <span>{siteConfig.social.tiktok.handle}</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
