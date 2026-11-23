import { siteConfig } from "@/config/site";
import TopicsExplorer, {
  type TopicCategoryGroup,
} from "@/components/admin/topics-explorer";

export const metadata = {
  title: `List Topik Artikel - ${siteConfig.name} Admin`,
};

const topicCategories: TopicCategoryGroup[] = [
  {
    name: "AI Implementation",
    topics: [
      "Cara Menggunakan ChatGPT untuk Menulis Script Video Pendek",
      "Penerapan AI dalam Customer Service: Chatbot untuk Bisnis Lokal",
      "Tools AI Terbaik untuk Membantu Riset Keyword SEO di 2026",
      "Otomatisasi Email Marketing Menggunakan Kecerdasan Buatan",
      "Masa Depan Copywriting: Kolaborasi Penulis dan AI",
      "Cara Membuat Gambar Promosi dengan Midjourney atau DALL-E",
      "Menggunakan AI untuk Menganalisis Data Penjualan Toko Online",
      "Strategi Personalisasi Konten Menggunakan Machine Learning",
      "AI untuk Pemula: Langkah Pertama Membangun Sistem Cerdas di Bisnis",
      "Otomatisasi Jadwal Posting Media Sosial dengan Bantuan AI",
      "Cara Memakai AI untuk Membuat SOP Otomatis dari Rekaman Suara",
      "Keuntungan Menggunakan AI Voice Over untuk Video Edukasi",
      "Membuat Chatbot WhatsApp Cerdas untuk Menjawab FAQ Pelanggan",
      "AI vs Manusia: Kapan Sebaiknya Menggunakan Sentuhan Manusia?",
      "Tools AI Generatif untuk Membuat Konten Blog dalam Hitungan Menit",
      "Cara Menghindari Plagiarisme Saat Menggunakan Konten Hasil AI",
      "Pemanfaatan AI untuk Menemukan Winning Campaign di Facebook Ads",
      "Optimasi Landing Page Menggunakan Rekomendasi Algoritma AI",
      "Menganalisis Perilaku Konsumen dengan Bantuan AI Predictive",
      "Cara Menyusun Prompt AI yang Efektif untuk Kebutuhan Bisnis",
      "Pengaruh Artificial Intelligence Terhadap Algoritma Instagram",
      "Membangun Sistem Rekomendasi Produk Sederhana dengan AI",
      "Apakah AI Akan Menggantikan Peran Digital Marketer?",
      "Integrasi AI ke dalam CRM untuk Meningkatkan Retensi Pelanggan",
      "Membuat Presentasi Bisnis Otomatis dengan Bantuan AI Generatif",
    ],
  },
  {
    name: "Business Scale Up",
    topics: [
      "Cara Scale Up Bisnis Kuliner Lewat Digital Marketing Terukur",
      "Kapan Saat yang Tepat untuk Merekrut Karyawan Pertama Anda?",
      "Strategi Pricing: Cara Menaikkan Harga Tanpa Kehilangan Pelanggan",
      "Perbedaan Pola Pikir Pengusaha Sukses vs Pemula dalam Menghadapi Krisis",
      "Membangun Funnel Marketing untuk Mengubah Traffic Menjadi Profit",
      "Cara Meningkatkan Average Order Value (AOV) di Toko Online",
      "Pentingnya Customer Lifetime Value (CLV) dalam Mengukur Kesuksesan",
      "Strategi Upsell dan Cross-sell yang Tidak Terlihat Memaksa",
      "Cara Mengelola Cashflow Saat Sedang Melakukan Ekspansi Bisnis",
      "Membangun Tim Digital Marketing Internal vs Menggunakan Agensi",
      "Bagaimana Cara Mengetahui Product-Market Fit untuk Produk Baru?",
      "Tips Menghadapi Persaingan Harga (Price War) yang Tidak Sehat",
      "Pentingnya Networking dan Membangun Relasi B2B untuk Scale Up",
      "Cara Ekspansi ke Platform Baru (Misal: dari Instagram ke TikTok)",
      "Mengubah Pembeli Sesekali Menjadi Pelanggan Setia (Brand Loyalist)",
      "Pentingnya Memiliki Mentor Bisnis untuk Menghindari Kesalahan Fatal",
      "Cara Membangun Budaya Kerja (Company Culture) di Perusahaan Startup",
      "Kapan Harus Mencari Investor (Funding) vs Bootstrapping?",
      "Meningkatkan Kapasitas Produksi Tanpa Menurunkan Kualitas",
      "Strategi Mengurangi Churn Rate pada Bisnis Berbasis Langganan",
      "Pentingnya Inovasi Produk Berkala Agar Tidak Ditinggalkan Pasar",
      "Cara Membuat Penawaran yang Tidak Bisa Ditolak (Irresistible Offer)",
      "Rahasia Membangun Sistem Affiliate untuk Mendongkrak Penjualan",
      "Evaluasi Kinerja Bisnis Akhir Tahun: Apa Saja yang Perlu Dilihat?",
      "Mengapa Berbagi Edukasi Gratis Justru Meningkatkan Penjualan B2B?",
    ],
  },
  {
    name: "Content System",
    topics: [
      "Cara Menemukan Ide Konten yang Tidak Pernah Habis (Content Pillars)",
      "Pentingnya Storytelling dalam Pembuatan Konten Bisnis Jasa",
      "Cara Membuat Content Calendar Selama 1 Bulan Penuh dalam Sehari",
      "Repurposing Konten: Cara Memaksimalkan Satu Ide untuk 5 Platform",
      "Membangun Brand Voice yang Unik dan Mudah Diingat Konsumen",
      "Tips Menulis Hook Video (Reels/TikTok) yang Menahan Penonton",
      "Membuat Konten Edukasi vs Promosi: Bagaimana Rasio Idealnya?",
      "Cara Melakukan Audit Konten Instagram Sendiri Secara Berkala",
      "Pentingnya Visual Branding (Warna & Font) dalam Konten Digital",
      "Strategi Konten untuk Fase Awareness, Consideration, dan Conversion",
      "Cara Mengukur Keberhasilan Sebuah Konten Melalui KPI yang Tepat",
      "Mengapa User Generated Content (UGC) Sangat Berpengaruh di 2026?",
      "Tools Gratis dan Berbayar Terbaik untuk Content Creator Pemula",
      "Cara Konsisten Posting Tanpa Mengalami Burnout (Kelelahan Mental)",
      "Pentingnya Call to Action (CTA) yang Jelas dalam Setiap Postingan",
      "Memahami Psikologi Warna dalam Desain Konten Promosi",
      "Cara Membuat Konten Interaktif di Instagram Stories (Polling & QnA)",
      "Strategi Kolaborasi dengan Mikro-Influencer yang Efektif",
      "Cara Menangani Komentar Negatif di Media Sosial Brand Anda",
      "Live Streaming di TikTok/IG: Persiapan dan Tips Berbicara",
      "Membangun Sistem Arsip (Asset Library) untuk Kebutuhan Konten",
      "Cara Menganalisis Konten Kompetitor Tanpa Terlihat Menjiplak",
      "Pentingnya Membalas DM dan Komen dengan Gaya Bahasa Humanis",
      "Strategi Penulisan Caption Long-Form vs Short-Form",
      "Cara Membaca Data Insight Social Media untuk Perbaikan Konten Selanjutnya",
    ],
  },
  {
    name: "Workflow & SOP",
    topics: [
      "Pentingnya Membangun SOP Konten di Agensi Kreatif Skala Kecil",
      "Cara Melakukan Delegasi Tugas Secara Efektif kepada Tim Konten",
      "Langkah-Langkah Membuat SOP Customer Service yang Ramah dan Solutif",
      "Tools Manajemen Proyek Terbaik untuk Mengatur Alur Kerja Tim",
      "Cara Mengurangi Bottleneck dalam Proses Revisi Desain",
      "Membangun SOP Onboarding Karyawan Baru agar Cepat Beradaptasi",
      "Checklist Harian Seorang Social Media Specialist yang Efektif",
      "Pentingnya Dokumentasi Proses Kerja untuk Mencegah Ketergantungan Individu",
      "Cara Menyelaraskan Target (KPI) antara Tim Sales dan Tim Marketing",
      "Sistem Pelaporan Mingguan (Weekly Report) yang Tidak Membuang Waktu",
      "Mengatur Alur Persetujuan (Approval Workflow) Klien yang Bebas Drama",
      "Cara Mengelola Waktu (Time Management) Menggunakan Teknik Pomodoro",
      "SOP Penanganan Komplain Pelanggan (Service Recovery Strategy)",
      "Membuat Standar Kualitas (Quality Control) untuk Produksi Video",
      "Cara Mengatur Folder Penyimpanan File di Google Drive Bersama",
      "Pentingnya Brief Konten yang Jelas Sebelum Proses Produksi Dimulai",
      "Alur Kerja Publikasi Artikel Blog: Dari Riset Keyword hingga Publish",
      "SOP Melakukan A/B Testing pada Iklan Facebook Ads / Google Ads",
      "Cara Merawat Database Email (Email Marketing Strategy) Secara Rutin",
      "Membangun Workflow Otomatisasi Antar Aplikasi Menggunakan Zapier/Make",
      "SOP Mempersiapkan Campaign Promo Tanggal Kembar (Harbolnas)",
      "Standar Keamanan Data Pelanggan yang Harus Diketahui Semua Karyawan",
      "Cara Mengelola Komunikasi Internal Tim (Kapan Pakai Chat vs Email)",
      "Review Kinerja Tim (Performance Review) Berbasis Data, Bukan Perasaan",
    ],
  },
];

export default function TopikPage() {
  const totalCount = topicCategories.reduce(
    (sum, cat) => sum + cat.topics.length,
    0
  );

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          List Topik Artikel ({totalCount} Ide)
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Pilih salah satu dari {totalCount} ide konten di 4 pilar utama{" "}
          {siteConfig.name} lalu klik <strong>Tulis Artikel</strong> untuk langsung
          membuka AI Brief Modal.
        </p>
      </div>

      <TopicsExplorer categories={topicCategories} />
    </div>
  );
}
