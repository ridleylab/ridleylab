import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Syarat dan Ketentuan Layanan ${siteConfig.name}.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <Container size="md">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/terms-of-service" },
          ]}
          className="mb-8"
        />

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          Terakhir diperbarui: {siteConfig.legalLastUpdated}
        </p>

        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
          <p>
            Selamat datang di {siteConfig.name}. Syarat dan ketentuan ini
            menguraikan aturan penggunaan situs web {siteConfig.name} serta
            seluruh program layanannya (Online Course, Online Mentoring, dan
            Offline Mentoring).
          </p>

          <p>
            Dengan mengakses situs web ini dan mendaftar pada program kami,
            Anda menyetujui seluruh syarat dan ketentuan yang tercantum di
            halaman ini.
          </p>

          <h2>Lisensi &amp; Hak Kekayaan Intelektual</h2>
          <p>
            Kecuali dinyatakan lain, {siteConfig.name} memegang hak kekayaan
            intelektual atas seluruh materi pembelajaran (termasuk video modul,
            template prompt, dokumen SOP, dan materi presentasi).
          </p>
          <p>Peserta tidak diperbolehkan untuk:</p>
          <ul>
            <li>Mempublikasikan ulang materi berbayar milik {siteConfig.name} secara publik</li>
            <li>Menjual, menyewakan, atau mensublisensikan ulang modul kepada pihak ketiga</li>
            <li>Menggandakan materi course untuk distribusi komersial tanpa izin tertulis</li>
            <li>Mengatasnamakan materi pelatihan internal sebagai produk komersial pribadi</li>
          </ul>

          <h2>Kebijakan Pengembalian Dana (Refund Policy)</h2>
          <p>
            Harap tinjau rincian kurikulum dan cakupan program sebelum melakukan
            pendaftaran. Kami tidak melayani pengembalian dana untuk produk
            digital atau sesi mentoring yang telah diakses atau berjalan, kecuali
            terjadi gangguan sistem fatal dari pihak kami yang tidak dapat
            diselesaikan dalam jangka waktu wajar.
          </p>

          <h2>Pelepasan Tanggung Jawab</h2>
          <p>
            Seluruh program pelatihan dan implementasi AI disusun berdasarkan
            praktik terbaik untuk membantu efisiensi dan konversi bisnis jasa.
            Hasil akhir sangat bergantung pada konsistensi eksekusi, kapasitas
            tim, serta kondisi pasar masing-masing bisnis klien.{" "}
            {siteConfig.name} tidak menjanjikan jaminan angka omzet atau jumlah
            leads spesifik setelah pelatihan.
          </p>
        </div>
      </Container>
    </Section>
  );
}
