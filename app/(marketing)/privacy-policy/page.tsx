import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Kebijakan Privasi ${siteConfig.name}. Kami melindungi data dan informasi Anda.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
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
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]}
          className="mb-8"
        />

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          Terakhir diperbarui: {siteConfig.legalLastUpdated}
        </p>

        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
          <p>
            Di {siteConfig.name}, privasi pengunjung kami adalah salah satu
            prioritas utama kami. Dokumen Kebijakan Privasi ini berisi jenis
            informasi yang dikumpulkan dan dicatat oleh {siteConfig.name} serta
            bagaimana kami menggunakannya.
          </p>

          <h2>Informasi yang Kami Kumpulkan</h2>
          <p>
            Informasi pribadi yang diminta untuk Anda berikan, beserta alasan
            mengapa Anda diminta memberikannya, akan dijelaskan kepada Anda
            pada saat pengumpulan data berlangsung.
          </p>
          <p>
            Jika Anda menghubungi kami secara langsung (misalnya melalui
            WhatsApp atau email), kami dapat menerima informasi tambahan tentang
            Anda seperti nama, alamat email, nomor telepon, isi pesan, dan
            informasi lain yang Anda pilih untuk dibagikan.
          </p>

          <h2>Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>
            Kami menggunakan informasi yang kami kumpulkan dengan berbagai cara,
            termasuk untuk:
          </p>
          <ul>
            <li>Menyediakan, mengoperasikan, dan memelihara situs web kami</li>
            <li>Meningkatkan, mempersonalisasi, dan memperluas layanan kami</li>
            <li>Memahami dan menganalisis bagaimana pengunjung menggunakan situs web</li>
            <li>Mengembangkan materi pelatihan dan fitur layanan baru</li>
            <li>Berkomunikasi dengan Anda terkait konsultasi dan layanan</li>
            <li>Mengirimkan pembaruan materi yang relevan</li>
            <li>Mencegah aktivitas penyalahgunaan atau penipuan</li>
          </ul>

          <h2>Log Files</h2>
          <p>
            {siteConfig.name} mengikuti prosedur standar penggunaan file log.
            File log mencatat aktivitas teknis standar saat pengunjung mengakses
            situs web untuk kebutuhan analitik performa dan keamanan layanan
            hosting.
          </p>

          <h2>Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
            silakan hubungi kami melalui email di{" "}
            <strong>{siteConfig.contact.email}</strong>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
