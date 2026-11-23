import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const audienceTypes = [
  "UMKM bisnis jasa",
  "Brand lokal berkembang",
  "Personal brand profesional",
  "Tim kecil tanpa divisi kreatif khusus",
];

const outcomes = [
  "Chat WhatsApp & DM masuk lebih stabil",
  "Pipeline leads organik lebih terukur",
  "Skrip closing admin lebih rapi",
  "Pertumbuhan audiens yang relevan",
];

const proofCards = [
  {
    src: "/images/home/proof-1.png",
    alt: "Bukti pertumbuhan chat masuk klien bisnis jasa interior bersama RidleyLab",
    title: "Bisnis Jasa Interior",
    metric: "Chat masuk meningkat 3x lipat dalam 50 hari",
  },
  {
    src: "/images/home/proof-2.png",
    alt: "Bukti peningkatan leads klien UMKM fashion setelah pelatihan AI",
    title: "UMKM Fashion",
    metric: "Leads naik 283 dalam 50 hari",
  },
  {
    src: "/images/home/proof-3.png",
    alt: "Bukti peningkatan penjualan organik klien brand skincare",
    title: "Brand Skincare",
    metric: "Penjualan meningkat dari konten organik",
  },
  {
    src: "/images/home/proof-4.png",
    alt: "Bukti pertumbuhan follower organik personal brand MUA",
    title: "Personal Brand MUA",
    metric: "0 menjadi 6.500+ follower organik",
  },
];

export default function HomeProof() {
  return (
    <Section variant="default" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="outline" className="mb-4">
            Studi Kasus & Output
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5 leading-tight">
            Hasil Nyata dari Bisnis Jasa Setelah Mengikuti Pelatihan AI Kami
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Bukan sekadar konsep. Sistem kerja ini sudah dipakai untuk
            menghasilkan leads, meningkatkan chat masuk, dan mempercepat eksekusi
            tim di berbagai niche bisnis.
          </p>
        </div>

        {/* TOP INFO */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <Card variant="subtle" padding="lg">
            <h3 className="font-semibold text-base text-zinc-950 dark:text-zinc-50 mb-4">
              Dipakai oleh:
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
              {audienceTypes.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check size={16} className="shrink-0 text-zinc-950 dark:text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="subtle" padding="lg">
            <h3 className="font-semibold text-base text-zinc-950 dark:text-zinc-50 mb-4">
              Output yang terjadi:
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
              {outcomes.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-zinc-950 dark:text-white"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 4 PROOF CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {proofCards.map((item) => (
            <Card
              key={item.title}
              variant="default"
              padding="none"
              interactive
              className="overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {item.metric}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline"
          >
            <span>Lihat video hasil mentoring klien di Portfolio</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
