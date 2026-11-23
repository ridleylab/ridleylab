import type { ProgramFaq, ProgramItem } from "./programs";

export interface LocationItem {
  slug: "yogyakarta" | "jakarta" | "bandung" | "semarang" | "surabaya" | "malang";
  city: string;
  region: string;
  title: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  localContext: string;
  targetIndustries: string[];
  logisticsNote: string;
  recommendedProgramKey: ProgramItem["key"];
  relatedPortfolioIds: string[];
  faqs: ProgramFaq[];
}

export const locations: LocationItem[] = [
  {
    slug: "yogyakarta",
    city: "Yogyakarta",
    region: "Daerah Istimewa Yogyakarta",
    title: "Pelatihan AI Social Media Marketing Yogyakarta",
    metaDescription:
      "Pelatihan AI Social Media Marketing & Offline Mentoring langsung di Yogyakarta untuk bisnis jasa, konstruksi, klinik, dan UMKM bersama RidleyLab.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Yogyakarta",
    heroSubheadline:
      "Pendampingan tatap muka langsung dari basecamp RidleyLab di Sleman, DIY — bangun sistem konten AI dan alur closing bersama tim Anda tanpa biaya akomodasi.",
    localContext:
      "Ekosistem bisnis jasa di Yogyakarta—mulai dari jasa bangun rumah/interior, klinik kecantikan, hospitality, hingga brand lokal—punya persaingan konten organik yang makin ketat sementara biaya SDM kreatif terus naik. Tim kecil di Jogja membutuhkan workflow AI yang ringan tapi konsisten mengubah views menjadi chat WhatsApp.",
    targetIndustries: [
      "Jasa Arsitektur, Interior & Kontraktor",
      "Klinik Kecantikan & Kesehatan",
      "Hospitality, Villa & Wisata",
      "Brand Lokal & Edukasi",
    ],
    logisticsNote:
      "Basecamp RidleyLab berlokasi di Turi, Sleman, Yogyakarta. Seluruh sesi 8x Offline Mentoring (Rp4.500.000/tim) di area DIY dilaksanakan tatap muka langsung di lokasi bisnis Anda tanpa tambahan biaya perjalanan luar kota.",
    recommendedProgramKey: "offlineMentoring",
    relatedPortfolioIds: ["1"],
    faqs: [
      {
        question: "Apakah mentoring tatap muka di Yogyakarta dikenakan biaya transport?",
        answer:
          "Tidak. Untuk area Yogyakarta dan Sleman, investasi Offline Mentoring tetap Rp4.500.000 per tim untuk 8x pertemuan tatap muka tanpa biaya transport luar kota.",
      },
      {
        question: "Apakah tim bisa praktek langsung di kantor kami di Jogja?",
        answer:
          "Ya. Mentor RidleyLab datang langsung ke kantor atau studio bisnis Anda di area DIY agar proses audit workflow dan setup AI sesuai kondisi kerja tim sehari-hari.",
      },
      {
        question: "Apakah ada contoh klien bisnis jasa di Yogyakarta?",
        answer:
          "Ya, salah satunya Akara Cipta Karya (bisnis jasa bangun rumah di Yogyakarta) yang mengikuti 8x sesi tatap muka dan membangun mesin konten TikTok & Instagram yang lebih terstruktur.",
      },
      {
        question: "Bagaimana jika tim kami di Jogja ingin jadwal fleksibel via online?",
        answer:
          "Anda tetap bisa memilih paket Online Mentoring via Google Meet (Rp4.000.000/tim) dengan materi dan 8x sesi pendampingan yang sama persis.",
      },
    ],
  },
  {
    slug: "jakarta",
    city: "Jakarta",
    region: "DKI Jakarta & Jabodetabek",
    title: "Pelatihan AI Social Media Marketing Jakarta",
    metaDescription:
      "Pelatihan AI Social Media Marketing untuk bisnis jasa, konveksi, dan B2B di Jakarta via Online Mentoring Google Meet atau In-House Workshop RidleyLab.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Jakarta",
    heroSubheadline:
      "Tingkatkan output konten dan kecepatan respon tim tanpa menambah headcount mahal di Jakarta — tersedia Online Mentoring via Google Meet dan opsi In-House Workshop.",
    localContext:
      "Bisnis jasa di Jakarta dan Jabodetabek menghadapi biaya iklan berbayar (Ads) yang tinggi serta ekspektasi respon calon klien B2B maupun B2C yang sangat cepat. Mengandalkan produksi konten serba manual membuat tim agency, konveksi, hingga jasa profesional tertinggal dari kompetitor yang sudah mengintegrasikan AI ke pipeline harian.",
    targetIndustries: [
      "Jasa Konveksi & Manufaktur Custom",
      "Agensi Kreatif & Konsultan B2B",
      "Klinik Spesialis & Estetika",
      "Jasa Properti & Renovasi Komersial",
    ],
    logisticsNote:
      "Untuk tim di Jakarta & Jabodetabek, pilihan tercepat dan paling hemat adalah Online Mentoring via Google Meet (Rp4.000.000/tim untuk 8x sesi live) tanpa biaya akomodasi. Tersedia juga opsi In-House Offline Mentoring (Rp4.500.000/tim + akomodasi yang disepakati di awal).",
    recommendedProgramKey: "onlineMentoring",
    relatedPortfolioIds: ["2"],
    faqs: [
      {
        question: "Bagaimana mekanisme pelatihan RidleyLab untuk bisnis di Jakarta?",
        answer:
          "Mayoritas klien Jakarta memilih Online Mentoring 8x sesi live via Google Meet (Rp4.000.000/tim) karena jadwal lebih fleksibel di tengah mobilitas Jakarta. Untuk kebutuhan in-house tatap muka di kantor Jakarta, tersedia juga skema Offline Mentoring dengan kesepakatan akomodasi.",
      },
      {
        question: "Apakah Online Mentoring efektif untuk tim konveksi atau B2B Jakarta?",
        answer:
          "Sangat efektif. Seluruh 8 bab materi—mulai dari riset angle, prompt scripting, SOP produksi, hingga pelatihan admin closing WA—dipraktekkan langsung lewat share screen dan evaluasi mingguan.",
      },
      {
        question: "Apakah sudah ada studi kasus klien dari Jakarta?",
        answer:
          "Ya, Zipzap Garment (bisnis konveksi di Jakarta) telah mengikuti program mentoring 8x pertemuan RidleyLab untuk menata alur konten organik dan akuisisi leads.",
      },
      {
        question: "Berapa orang dalam satu tim yang bisa ikut sesi mentoring Jakarta?",
        answer:
          "Investasi dihitung per tim bisnis (owner, tim konten/sosmed, dan admin closing dapat bergabung bersamaan dalam satu kelas khusus bisnis Anda).",
      },
    ],
  },
  {
    slug: "bandung",
    city: "Bandung",
    region: "Jawa Barat",
    title: "Pelatihan AI Social Media Marketing Bandung",
    metaDescription:
      "Pelatihan AI Social Media Marketing untuk brand kreatif, fashion, F&B, dan bisnis jasa di Bandung bersama RidleyLab via Google Meet & In-House.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Bandung",
    heroSubheadline:
      "Percepat riset visual, skrip video pendek, dan SOP admin closing agar bisnis jasa dan brand kreatif Bandung tetap unggul di tengah ketatnya persaingan konten.",
    localContext:
      "Bandung dikenal sebagai kota kreatif dengan standar selera visual dan storytelling yang tinggi—mulai dari brand fashion, studio jasa kreatif, wedding/event, hingga kuliner. Tantangan terbesar pelaku usaha Bandung bukan kurang ide, melainkan konsistensi produksi di berbagai platform tanpa membuat tim kreatif kelelahan (burnout).",
    targetIndustries: [
      "Studio Kreatif, Fotografi & Wedding",
      "Fashion Lokal & Jasa Produksi",
      "Jasa Hospitality, Cafe & Katering",
      "Klinik Perawatan & Jasa Gaya Hidup",
    ],
    logisticsNote:
      "Tim di Bandung dapat langsung memulai kapan saja lewat Online Mentoring via Google Meet (Rp4.000.000/tim, 8x sesi) atau menjadwalkan In-House Workshop tatap muka dengan skema penyesuaian akomodasi.",
    recommendedProgramKey: "onlineMentoring",
    relatedPortfolioIds: ["1", "2"],
    faqs: [
      {
        question: "Apakah AI tidak membuat konten brand Bandung terasa kaku atau generik?",
        answer:
          "Tidak, karena RidleyLab melatih tim Anda menyusun brand voice prompt dan struktur storytelling khusus sesuai karakter brand Anda—AI mempercepat riset dan kerangka, sentuhan kreatif tim tetap dominan.",
      },
      {
        question: "Program mana yang paling cocok untuk bisnis jasa di Bandung?",
        answer:
          "Untuk kecepatan mulai tanpa biaya perjalanan, Online Mentoring via Google Meet (Rp4.000.000/tim) paling direkomendasikan karena membahas 8 bab implementasi lengkap yang sama dengan program tatap muka.",
      },
      {
        question: "Apakah admin DM Instagram dan WhatsApp ikut dilatih?",
        answer:
          "Ya. Salah satu pilar inti mentoring adalah menyusun SOP respon admin closing agar traffic yang masuk dari Reels dan TikTok tidak terbuang sia-sia.",
      },
      {
        question: "Bisakah mulai dari Online Course dulu sebelum mentoring tim Bandung?",
        answer:
          "Tentu. Anda atau tim dapat mempelajari fondasinya lebih dulu melalui Online Course Rp199.000 sebelum naik ke sesi mentoring intensif 8 pertemuan.",
      },
    ],
  },
  {
    slug: "semarang",
    city: "Semarang",
    region: "Jawa Tengah",
    title: "Pelatihan AI Social Media Marketing Semarang",
    metaDescription:
      "Pelatihan AI Social Media Marketing & penyusunan SOP tim konten untuk bisnis jasa, properti, dan distributor di Semarang bersama RidleyLab.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Semarang",
    heroSubheadline:
      "Bangun sistem akuisisi organik yang rapi dari Semarang tanpa bergantung pada owner — pendampingan langsung via Google Meet atau workshop tatap muka.",
    localContext:
      "Sebagai pusat perdagangan dan jasa di Jawa Tengah, banyak bisnis di Semarang—seperti jasa logistik, properti, kontraktor, dan layanan kesehatan—masih mengandalkan referensi mulut ke mulut atau bergantung pada keputusan teknis owner. Dengan SOP konten dan AI workflow yang tepat, tim internal bisa menjalankan mesin leads harian secara mandiri.",
    targetIndustries: [
      "Jasa Properti, Kontraktor & Interior",
      "Distribusi, Logistik & Jasa B2B",
      "Klinik Kesehatan & Gigi",
      "Jasa Otomotif & Bengkel Spesialis",
    ],
    logisticsNote:
      "Jarak Yogyakarta–Semarang memungkinkan fleksibilitas tinggi: pilih Online Mentoring via Google Meet (Rp4.000.000/tim) untuk implementasi cepat, atau Offline Mentoring tatap muka di Semarang (Rp4.500.000/tim + kesepakatan transport).",
    recommendedProgramKey: "onlineMentoring",
    relatedPortfolioIds: ["1"],
    faqs: [
      {
        question: "Apakah RidleyLab melayani sesi tatap muka di Semarang?",
        answer:
          "Ya. Karena posisi basecamp RidleyLab berada di Yogyakarta, tim kami dapat dijadwalkan untuk sesi tatap muka di Semarang dengan kesepakatan akomodasi, atau langsung via Online Mentoring Google Meet Rp4.000.000/tim.",
      },
      {
        question: "Cocokkah pelatihan ini untuk tim marketing Semarang yang masih pemula?",
        answer:
          "Sangat cocok. Mentoring dimulai dari audit posisi bisnis dan fondasi funnel sebelum masuk ke template prompt AI dan SOP harian yang mudah diikuti staf.",
      },
      {
        question: "Apakah materi hanya seputar bikin video TikTok?",
        answer:
          "Tidak. Fokusnya adalah keseluruhan alur akuisisi bisnis jasa: riset topik bernilai komersial, produksi konten TikTok/IG yang terarah, hingga skrip closing di WhatsApp.",
      },
      {
        question: "Berapa lama seluruh rangkaian 8x sesi diselesaikan?",
        answer:
          "Umumnya berjalan selama 4 hingga 8 minggu (1–2 sesi per minggu) agar tim Semarang punya waktu mempraktekkan tugas implementasi di antara sesi.",
      },
    ],
  },
  {
    slug: "surabaya",
    city: "Surabaya",
    region: "Jawa Timur",
    title: "Pelatihan AI Social Media Marketing Surabaya",
    metaDescription:
      "Pelatihan AI Social Media Marketing untuk bisnis jasa B2B, klinik, manufaktur, dan perusahaan berkembang di Surabaya bersama RidleyLab.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Surabaya",
    heroSubheadline:
      "Skalakan kapasitas tim marketing bisnis jasa Anda di Surabaya dengan SOP berbasis AI dan sistem konversi yang terukur lewat 8x sesi intensif.",
    localContext:
      "Pasar bisnis di Surabaya dan Jawa Timur bagian timur sangat berorientasi pada kecepatan eksekusi, angka ROI, dan skalabilitas operasional. Perusahaan jasa teknis, klinik, distributor, hingga jasa korporat di Surabaya memerlukan sistem konten yang bukan sekadar mengejar viral, melainkan menghasilkan pipeline inquiry yang terukur setiap minggu.",
    targetIndustries: [
      "Jasa Teknis, Engineering & B2B",
      "Klinik Medis, Estetika & Konsultan",
      "Jasa Konstruksi, Gudang & Properti",
      "Perusahaan Jasa Skala Menengah",
    ],
    logisticsNote:
      "Untuk bisnis di Surabaya, Online Mentoring via Google Meet (Rp4.000.000/tim) menjadi opsi paling efisien secara waktu dan biaya. Opsi In-House Offline Mentoring juga tersedia berdasarkan jadwal dan kesepakatan akomodasi.",
    recommendedProgramKey: "onlineMentoring",
    relatedPortfolioIds: ["1", "2"],
    faqs: [
      {
        question: "Apakah Online Mentoring untuk tim Surabaya dibimbing khusus 1 bisnis per kelas?",
        answer:
          "Ya. Mentoring dilakukan secara privat/eksklusif untuk satu bisnis per program, sehingga seluruh analisis funnel, prompt AI, dan SOP disesuaikan dengan industri bisnis Anda di Surabaya.",
      },
      {
        question: "Apakah KPI dan evaluasi performa dibahas selama mentoring?",
        answer:
          "Ya. Di sesi evaluasi, kami membedah metrik yang berdampak ke bisnis seperti kualitas reach, chat masuk, rasio leads, dan efektivitas skrip follow-up admin.",
      },
      {
        question: "Apakah owner harus ikut di semua sesi Google Meet?",
        answer:
          "Owner sangat disarankan hadir pada sesi awal (strategi & diagnosa) serta sesi evaluasi kunci, sementara sesi teknis harian dapat diikuti penuh oleh tim operasional dan admin.",
      },
      {
        question: "Berapa investasi Online Mentoring untuk tim di Surabaya?",
        answer:
          "Investasi Online Mentoring adalah Rp4.000.000 per tim untuk 8x pertemuan live via Google Meet, sudah termasuk template prompt dan penyusunan SOP.",
      },
    ],
  },
  {
    slug: "malang",
    city: "Malang",
    region: "Jawa Timur",
    title: "Pelatihan AI Social Media Marketing Malang",
    metaDescription:
      "Pelatihan AI Social Media Marketing untuk UMKM jasa, hospitality, edukasi, dan brand lokal Malang via Online Mentoring & Course RidleyLab.",
    heroHeadline: "Pelatihan AI Social Media Marketing Bisnis Jasa di Malang",
    heroSubheadline:
      "Optimalkan tim kecil di Malang agar mampu memproduksi konten konsisten dan melayani chat calon pelanggan lebih cepat dengan bantuan AI.",
    localContext:
      "Di Malang dan Batu, pertumbuhan bisnis jasa edukasi, villa/hospitality, klinik, serta UMKM jasa lokal bergerak cepat dengan komposisi tim yang umumnya masih ramping. Dengan melatih tim kecil memakai AI untuk riset, penulisan skrip, dan template respon admin, bisnis di Malang bisa bersaing setara dengan tim agensi besar.",
    targetIndustries: [
      "Hospitality, Villa & Jasa Pariwisata",
      "Lembaga Kursus, Edukasi & Coaching",
      "UMKM Jasa & Perawatan Diri",
      "Studio Desain & Jasa Lokal",
    ],
    logisticsNote:
      "Tim di Malang dapat mengikuti program penuh melalui Online Mentoring via Google Meet (Rp4.000.000/tim) tanpa biaya perjalanan, atau memulai dari Online Course (Rp199.000) untuk belajar mandiri.",
    recommendedProgramKey: "onlineMentoring",
    relatedPortfolioIds: ["1"],
    faqs: [
      {
        question: "Apakah tim kecil (1–3 orang) di Malang bisa ikut Online Mentoring?",
        answer:
          "Sangat bisa. Bahkan banyak klien RidleyLab memulai dari tim kecil atau owner bersama 1–2 admin/staf konten agar sejak awal sudah punya SOP yang benar.",
      },
      {
        question: "Apakah tools AI yang diajarkan harus berbayar mahal?",
        answer:
          "Tidak. Kurikulum difokuskan pada pemanfaatan AI yang praktis dan ekonomis (termasuk versi gratis atau paket standar yang umum dipakai UMKM) dengan teknik prompting yang tepat.",
      },
      {
        question: "Apakah materi Online Mentoring Malang sama dengan Offline Mentoring Jogja?",
        answer:
          "Ya, 100% sama dalam kedalaman bab, praktek langsung, penyusunan SOP, dan evaluasi — hanya format pertemuannya yang dilaksanakan secara live lewat Google Meet.",
      },
      {
        question: "Bagaimana cara konsultasi sebelum memilih program di Malang?",
        answer:
          "Anda dapat langsung chat tim RidleyLab via WhatsApp untuk memetakan kondisi tim saat ini dan memilih antara Online Course atau Online Mentoring.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationItem | undefined {
  return locations.find((loc) => loc.slug === slug);
}
