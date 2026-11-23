import Image from "next/image";
import { Award, Check, Home, ShoppingBag, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

const results = [
  {
    icon: Home,
    title: "Bisnis Jasa Interior",
    metric: "Leads naik 3x lipat",
    src: "/images/services/offline-mentoring-result-1.png",
    alt: "Hasil peningkatan leads 3x lipat pada bisnis jasa interior klien RidleyLab",
    points: [
      "Leads meningkat signifikan",
      "Closing lebih terstruktur",
      "Alur konten lebih stabil",
    ],
  },
  {
    icon: ShoppingBag,
    title: "UMKM Fashion",
    metric: "Growth organik naik",
    src: "/images/services/offline-mentoring-result-2.png",
    alt: "Hasil pertumbuhan konten organik UMKM fashion klien RidleyLab",
    points: [
      "Konsistensi konten meningkat",
      "Followers bertumbuh",
      "Penjualan ikut naik",
    ],
  },
  {
    icon: Sparkles,
    title: "Brand Skincare Lokal",
    metric: "Reach +180%",
    src: "/images/services/offline-mentoring-result-3.png",
    alt: "Hasil peningkatan reach +180% brand skincare lokal klien RidleyLab",
    points: [
      "Reach meningkat signifikan",
      "Leads lebih relevan",
      "Sistem lebih stabil",
    ],
  },
  {
    icon: Award,
    title: "Personal Brand Coach",
    metric: "DM meningkat",
    src: "/images/services/offline-mentoring-result-4.png",
    alt: "Hasil peningkatan DM inquiry personal brand coach klien RidleyLab",
    points: [
      "DM inquiry meningkat",
      "Engagement naik",
      "Kolaborasi bertambah",
    ],
  },
];

export default function MentoringResults() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight mb-4">
            Bisnis yang Bertumbuh Setelah Timnya Dilatih Menggunakan AI
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Beberapa hasil nyata dari bisnis yang sudah menerapkan workflow AI
            marketing bersama tim internal mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} variant="default" interactive padding="lg">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-zinc-950 dark:text-zinc-50">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      {item.metric}
                    </p>
                  </div>
                </div>

                <div className="relative w-full aspect-video mb-5 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </div>

                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <Check size={15} className="shrink-0 text-zinc-950 dark:text-zinc-100" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 text-center text-zinc-500 dark:text-zinc-400 text-xs italic max-w-2xl mx-auto">
          *Hasil setiap bisnis berbeda tergantung eksekusi, kapasitas tim,
          niche jasa, dan konsistensi implementasi.
        </p>
      </Container>
    </Section>
  );
}
