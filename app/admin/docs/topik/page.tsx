export const metadata = {
  title: "List Topik Artikel - RIDLEY Admin",
};

export default function TopikPage() {
  const categories = [
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
        "Membuat Presentasi Bisnis Otomatis dengan Bantuan AI Generatif"
      ]
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
        "Mengapa Berbagi Edukasi Gratis Justru Meningkatkan Penjualan B2B?"
      ]
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
        "Cara Membaca Data Insight Social Media untuk Perbaikan Konten Selanjutnya"
      ]
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
        "Review Kinerja Tim (Performance Review) Berbasis Data, Bukan Perasaan"
      ]
    }
  ];

  return (
    <div className="max-w-5xl space-y-10 text-black pb-20">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-medium text-black">💡 List Topik Artikel</h1>
        <p className="text-gray-500 mt-3 text-lg">
          Ada <strong>99 ide konten eksklusif</strong> yang dibagi ke dalam 4 pilar utama bisnis Ridley. Silakan salin (copy) dan tempel (paste) ke <strong>AI Auto-Pilot</strong>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-ridley-blue mb-2 text-lg">💡 Cara Penggunaan (1-Click Article)</h3>
        <p className="text-gray-700">
          Blok salah satu teks di bawah, klik kanan lalu pilih <strong>Copy</strong>. Setelah itu masuk ke menu <strong>Buat Artikel Baru</strong>, klik tombol <strong>🚀 Tulis dengan AI</strong>, dan <strong>Paste</strong> topik tersebut di sana.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="bg-white rounded-2xl border border-white/60 shadow-sm overflow-hidden flex flex-col">
            {/* Header Kategori */}
            <div className="bg-white/50 border-b border-white/60 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-medium text-ridley-blue">{category.name}</h2>
              <span className="bg-ridley-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                {category.topics.length} Topik
              </span>
            </div>

            {/* List Topik */}
            <ul className="divide-y divide-gray-100 flex-grow h-[400px] overflow-y-auto p-2">
              {category.topics.map((topic, i) => (
                <li key={i} className="p-3 hover:bg-white/50 transition flex items-start gap-3 rounded-xl group cursor-text">
                  <span className="text-gray-400 font-bold text-sm mt-0.5 group-hover:text-ridley-blue transition">
                    {(i + 1).toString().padStart(2, '0')}.
                  </span>
                  <p className="font-medium text-gray-800 text-sm leading-relaxed select-all">
                    {topic}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
