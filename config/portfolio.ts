export interface PortfolioItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  businessType: string;
  location: string;
  program: string;
  period: string;
  image: string;
  imageAlt: string;
  resultMetric: string;
  mentoringDetails: string;
  highlights: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    slug: "akara-cipta-karya",
    name: "Akara Cipta Karya",
    category: "Jasa Bangun Rumah",
    businessType: "Bisnis Jasa Bangun Rumah",
    location: "Yogyakarta",
    program: "Offline Mentoring 8x Pertemuan",
    period: "Mei 2026",
    image: "/images/portfolio/pelatihan-akara.png",
    imageAlt:
      "Dokumentasi sesi Offline Mentoring AI Social Media Marketing bersama tim Akara Cipta Karya di Yogyakarta",
    resultMetric: "Sistem konten & tim berjalan mandiri",
    mentoringDetails:
      "Offline mentoring dilaksanakan 8x pertemuan tatap muka di Yogyakarta untuk menyusun SOP riset konten arsitektur–bangun rumah, penulisan skrip TikTok/Reels berbasis AI, serta alur follow-up lead konsultasi proyek.",
    highlights: [
      "Setup workflow riset angle konten konstruksi berbasis AI",
      "SOP produksi mingguan untuk tim konten & editor internal",
      "Optimalisasi funnel bio TikTok & Instagram ke konsultasi WA",
    ],
  },
  {
    id: "2",
    slug: "zipzap-garment",
    name: "Zipzap Garment",
    category: "Konveksi & Fashion",
    businessType: "Bisnis Konveksi",
    location: "Jakarta",
    program: "Mentoring 8x Pertemuan",
    period: "Juni 2026",
    image: "/images/portfolio/pelatihan-zipzap.png",
    imageAlt:
      "Sesi pendampingan sistem konten AI dan SOP tim bersama klien konveksi Zipzap Garment Jakarta",
    resultMetric: "Pipeline konten B2B konveksi lebih rapi",
    mentoringDetails:
      "Pendampingan 8x pertemuan untuk menata kalender konten penawaran konveksi B2B/korporat, template prompt AI untuk variasi skrip iklan organik, serta skrip closing admin WhatsApp.",
    highlights: [
      "Bank ide konten showcase produksi konveksi B2B & retail",
      "Template prompt AI khusus penulisan skrip 30–60 detik",
      "Standarisasi skrip respon cepat admin saat menerima inquiry order",
    ],
  },
  {
    id: "3",
    slug: "bisnis-jasa-interior",
    name: "Klien Bisnis Jasa Interior",
    category: "Jasa Interior",
    businessType: "Jasa Desain & Build Interior",
    location: "Yogyakarta",
    program: "Mentoring Intensif AI Marketing",
    period: "50 Hari Implementasi",
    image: "/images/home/proof-1.png",
    imageAlt:
      "Bukti peningkatan chat WhatsApp masuk 3x lipat dalam 50 hari pada klien jasa interior RidleyLab",
    resultMetric: "Chat masuk naik 3x lipat / 50 hari",
    mentoringDetails:
      "Perbaikan sudut pandang konten edukasi desain interior agar tidak sekadar showcase foto, melainkan memancing calon klien bertanya estimasi biaya dan jadwal survei via WhatsApp.",
    highlights: [
      "Riset pain point calon pemilik rumah dengan prompt AI",
      "Format video hook masalah-solusi dengan CTA survei lokasi",
      "Peningkatan chat WhatsApp berkualitas hingga 3x lipat",
    ],
  },
  {
    id: "4",
    slug: "umkm-fashion-lokal",
    name: "Klien UMKM Fashion Lokal",
    category: "Konveksi & Fashion",
    businessType: "UMKM Fashion & Apparel",
    location: "Indonesia",
    program: "Sistem Konten & Closing AI",
    period: "50 Hari Implementasi",
    image: "/images/home/proof-2.png",
    imageAlt:
      "Bukti pertambahan 283 leads baru dalam 50 hari pada klien UMKM Fashion binaan RidleyLab",
    resultMetric: "+283 leads baru dalam 50 hari",
    mentoringDetails:
      "Menyusun struktur skrip pendek yang memadukan storytelling produk dan penawaran jelas sehingga traffic dari FYP langsung terdorong mengirim pesan konsultasi.",
    highlights: [
      "Batch produksi skrip 2 minggu selesai dalam 1 sesi riset AI",
      "Penataan struktur penawaran & pin komentar penarik leads",
      "Penambahan 283+ kontak leads organik terukur dalam 50 hari",
    ],
  },
  {
    id: "5",
    slug: "brand-skincare-lokal",
    name: "Klien Brand Skincare Lokal",
    category: "Brand Lokal & Klinik",
    businessType: "Brand Skincare Lokal",
    location: "Indonesia",
    program: "Workflow Tim Konten AI",
    period: "Evaluasi Pasca Mentoring",
    image: "/images/services/offline-mentoring-result-3.png",
    imageAlt:
      "Bukti kenaikan reach konten organik sebesar 180 persen pada brand skincare lokal klien RidleyLab",
    resultMetric: "Reach organik naik +180%",
    mentoringDetails:
      "Menstandarkan pola hook 3 detik pertama dan riset komentar audiens memakai AI sehingga konten edukasi bahan aktif lebih relevan dan mudah dibagikan.",
    highlights: [
      "Analisis komentar kompetitor dengan AI untuk bahan edukasi",
      "Struktur skrip edukatif yang tetap menggiring CTA produk",
      "Reach akun bertumbuh +180% dengan jadwal upload stabil",
    ],
  },
  {
    id: "6",
    slug: "personal-brand-mua",
    name: "Personal Brand MUA & Coach",
    category: "Personal Brand",
    businessType: "Personal Brand Profesional",
    location: "Indonesia",
    program: "Content Positioning & AI",
    period: "Pertumbuhan Organik",
    image: "/images/home/proof-4.png",
    imageAlt:
      "Bukti pertumbuhan akun dari nol hingga 6.500 lebih follower organik pada klien personal brand MUA",
    resultMetric: "0 → 6.500+ follower organik",
    mentoringDetails:
      "Membangun otoritas personal brand dari akun nol followers lewat topik portofolio kerja dan edukasi klien yang konsisten tanpa iklan berbayar.",
    highlights: [
      "Penentuan pilar konten khas personal brand jasa",
      "Produksi skrip cerita di balik layar yang cepat pakai AI",
      "Pertumbuhan 0 menuju 6.500+ followers relevan & inquiry DM",
    ],
  },
];
