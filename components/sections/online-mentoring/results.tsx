import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { portfolioItems } from "@/config/portfolio";
import { locations } from "@/config/locations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const resultCards = [
  {
    src: "/images/services/offline-mentoring-result-1.png",
    title: "Bisnis Jasa Interior",
    metric: "Leads naik 3x lipat",
    points: ["Leads meningkat signifikan", "Closing lebih terstruktur", "Alur konten stabil"],
  },
  {
    src: "/images/services/offline-mentoring-result-2.png",
    title: "UMKM Fashion",
    metric: "Growth organik naik",
    points: ["Konsistensi upload terjaga", "Followers bertumbuh", "Penjualan ikut meningkat"],
  },
  {
    src: "/images/services/offline-mentoring-result-3.png",
    title: "Brand Skincare Lokal",
    metric: "Reach +180%",
    points: ["Reach meningkat signifikan", "Leads lebih relevan", "Sistem kerja lebih rapi"],
  },
  {
    src: "/images/services/offline-mentoring-result-4.png",
    title: "Personal Brand Coach",
    metric: "DM inquiry meningkat",
    points: ["DM inquiry meningkat", "Engagement naik", "Kolaborasi bertambah"],
  },
];

export default function OnlineMentoringResults() {
  return (
    <Section variant="default" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Studi Kasus &amp; Hasil Implementasi Tim Klien
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Mulai dari Yogyakarta hingga klien luar kota seperti{" "}
            <span className="font-semibold text-zinc-950 dark:text-zinc-100">
              Zipzap Garment (Jakarta)
            </span>
            , kurikulum mentoring kami terbukti membantu tim memproduksi konten
            lebih cepat dan relevan.
          </p>
        </div>

        {/* Client Highlight Strip */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {portfolioItems.map((client) => (
            <Card key={client.id} variant="subtle" padding="md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {client.location} · {client.businessType}
                  </p>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mt-1">
                    {client.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5">
                    {client.mentoringDetails}
                  </p>
                </div>
                <Link
                  href="/portfolio"
                  className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 hover:underline shrink-0 inline-flex items-center gap-1"
                >
                  <span>Portfolio</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* 4 Metric Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {resultCards.map((item) => (
            <Card key={item.title} variant="default" interactive padding="lg">
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200">
                  {item.metric}
                </span>
              </div>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 mb-5">
                <Image
                  src={item.src}
                  alt={`Hasil mentoring AI ${item.title} - ${item.metric}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>

              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {item.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <Check size={15} className="text-zinc-950 dark:text-zinc-100 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Location internal links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Jangkauan Google Meet ke seluruh Indonesia:</span>
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/lokasi/${loc.slug}`}
              className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-400 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {loc.city}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
