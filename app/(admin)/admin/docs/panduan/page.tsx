import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Panduan Penggunaan CMS - ${siteConfig.name} Admin`,
};

const guides = [
  {
    title: "1. AI Auto-Pilot Brief (Artikel SEO 1.200+ Kata)",
    description:
      "Hasilkan kerangka dan isi artikel blog komprehensif dari modal brief terstruktur.",
    steps: [
      "Buka menu Posts > Artikel Baru, lalu klik Buka AI Brief (atau klik langsung Tulis Artikel dari halaman List Topik).",
      "Isi Topik Artikel, Focus Keyword opsional, Target Audiens bisnis jasa, dan Gaya Bahasa.",
      "AI menghasilkan judul SEO (<=60 karakter), meta description, slug, subheading H2/H3, studi kasus, FAQ, dan tombol CTA semantik.",
    ],
  },
  {
    title: "2. Inline AI Rewrite Popover",
    description:
      "Revisi paragraf spesifik langsung di dalam editor Tiptap dengan preset cepat maupun custom prompt.",
    steps: [
      "Blok (select) teks yang ingin disempurnakan di dalam Tiptap editor.",
      "Klik tombol AI Rewrite di pojok kanan toolbar editor.",
      "Pilih preset (Perbaiki Bahasa, Perdalam Poin, Ringkas Padat, Ubah ke Bullet List) atau tulis instruksi custom.",
    ],
  },
  {
    title: "3. Live SERP Preview & SEO Health Checklist",
    description:
      "Pastikan metadata artikel siap bersaing di hasil pencarian Google sebelum diterbitkan.",
    steps: [
      "Isi Focus Keyword di panel SEO kanan untuk mengecek kehadirannya di judul, slug, dan paragraf pembuka.",
      "Pantau Live Google SERP Preview dan penghitung karakter Title (<=60) serta Meta Description (<=155).",
      "Gunakan tombol Generate SEO bila ingin AI merangkum judul & deskripsi secara otomatis.",
    ],
  },
  {
    title: "4. Tombol CTA Semantik & Sisipkan Media",
    description:
      "Sisipkan gambar dari UploadThing dan tombol CTA monokrom yang konsisten Light & Dark.",
    steps: [
      "Gunakan tombol Sisipkan Tombol CTA di toolbar editor dengan preset link program RidleyLab atau WhatsApp.",
      "Klik ikon Upload Gambar atau Pilih dari Media Gallery untuk memakai gambar yang sudah diunggah.",
      "Di halaman Media Gallery, klik Copy URL (1-klik) atau perbesar preview via Lightbox Modal.",
    ],
  },
  {
    title: "5. Kelola Posts, Categories & Tags",
    description:
      "Gunakan filter cepat, toggle Publish/Draft instan, serta modal edit/hapus di seluruh halaman manajemen.",
    steps: [
      "Di menu Posts, klik badge Published/Draft untuk mengubah status artikel secara instan.",
      "Menu Categories dan Tags kini mendukung Create, Rename/Edit, dan Delete penuh dengan konfirmasi modal.",
      "Cek menu System & SEO Overview untuk memverifikasi status env dan endpoint sitemap/robots/llms.txt.",
    ],
  },
];

export default function PanduanPage() {
  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 flex items-center gap-2.5">
            <BookOpen size={24} />
            <span>Panduan Penggunaan CMS</span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5">
            Workflow penulisan artikel SEO AI-Native dan manajemen konten{" "}
            {siteConfig.name}.
          </p>
        </div>

        <Link
          href="/admin/docs/topik"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity w-fit shrink-0"
        >
          <span>Lihat 99 Ide Topik</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => (
          <section
            key={guide.title}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-3"
          >
            <h2 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {guide.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1.5 leading-relaxed">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
