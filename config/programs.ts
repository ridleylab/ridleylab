import { siteConfig } from "./site";

export interface ProgramFaq {
  question: string;
  answer: string;
}

export interface ProgramItem {
  key: "onlineCourse" | "onlineMentoring" | "offlineMentoring";
  slug: "online-course" | "online-mentoring" | "offline-mentoring";
  path: string;
  name: string;
  fullName: string;
  serviceType: string;
  description: string;
  price: number;
  priceFormatted: string;
  priceDisplayNumber: string;
  priceUnit: string;
  sessions?: string;
  courseMode: "online" | "onsite";
  ogImage: string;
  badge: string;
  ctaLabel: string;
  whatsappMessage: string;
  features: string[];
  faqs: ProgramFaq[];
}

export interface ProgramComparisonRow {
  aspect: string;
  onlineCourse: string;
  onlineMentoring: string;
  offlineMentoring: string;
}

export const programs: Record<ProgramItem["key"], ProgramItem> = {
  onlineCourse: {
    key: "onlineCourse",
    slug: "online-course",
    path: "/services/online-course",
    name: "Online Course",
    fullName: "Online Course Pelatihan AI Social Media Marketing",
    serviceType: "AI Social Media Marketing Online Course",
    description:
      "Program belajar mandiri Pelatihan AI Social Media Marketing untuk riset konten, pembuatan skrip, dan alur konversi otomatis di TikTok dan Instagram.",
    price: 199000,
    priceFormatted: "Rp199.000",
    priceDisplayNumber: "199.000",
    priceUnit: "",
    courseMode: "online",
    ogImage: "/images/og/online-course.jpg",
    badge: "BELAJAR MANDIRI",
    ctaLabel: "Download Online Course",
    whatsappMessage:
      "Halo RidleyLab, saya tertarik dengan program Online Course AI Social Media Marketing (Rp199.000). Boleh info cara aksesnya?",
    features: [
      "10+ modul video terstruktur",
      "Template & struktur AI konten",
      "Funnel & conversion system",
      "SOP dasar tim konten",
    ],
    faqs: [
      {
        question: "Berapa harga online course?",
        answer: `${siteConfig.name} menyediakan Online Course dengan harga Rp199.000 sekali bayar.`,
      },
      {
        question: "Apa yang dipelajari dalam online course ini?",
        answer:
          "Materi mencakup riset konten dengan AI, pembuatan skrip, alur konversi otomatis di TikTok dan Instagram, serta SOP operasional untuk bisnis jasa.",
      },
      {
        question: "Apakah online course cocok untuk pemula?",
        answer:
          "Ya. Materi dirancang agar mudah dipahami oleh pemula maupun pelaku bisnis yang ingin membangun sistem kerja yang lebih baik.",
      },
      {
        question: "Apakah online course cocok untuk pemilik UMKM?",
        answer:
          "Ya. Materi sangat relevan untuk UMKM yang ingin membangun sistem konten, SOP, workflow, dan operasional yang lebih efisien.",
      },
      {
        question: "Apakah saya harus memiliki tim terlebih dahulu?",
        answer:
          "Tidak. Materi dapat dipelajari baik oleh pemilik bisnis yang bekerja sendiri maupun yang sudah memiliki tim.",
      },
      {
        question: "Apakah materi membahas sistem konten?",
        answer:
          "Ya. Pelatihan AI Social Media Marketing ini sangat berfokus pada sistem pembuatan konten otomatis yang konsisten dan terukur.",
      },
      {
        question: "Apakah materi membahas SOP bisnis?",
        answer:
          "Ya. Peserta akan memahami pentingnya SOP dan bagaimana SOP membantu operasional bisnis berjalan lebih rapi.",
      },
      {
        question: "Apakah materi membahas penggunaan AI?",
        answer:
          "Ya. Course membahas implementasi AI untuk membantu efisiensi kerja, produksi konten, dan proses operasional bisnis.",
      },
      {
        question: "Apakah online course bisa diakses kapan saja?",
        answer:
          "Ya. Peserta dapat mengakses materi sesuai waktu belajar masing-masing.",
      },
      {
        question: "Apakah ada batas waktu akses?",
        answer:
          "Informasi mengenai masa akses mengikuti ketentuan program yang berlaku pada saat pembelian.",
      },
      {
        question: "Apakah materi dapat dipelajari berulang kali?",
        answer:
          "Ya. Peserta dapat mempelajari kembali materi yang telah tersedia selama masa akses masih aktif.",
      },
      {
        question: "Apakah saya akan mendapatkan update materi?",
        answer:
          "Update materi dapat diberikan sesuai kebijakan program yang berlaku.",
      },
      {
        question: "Apakah online course memberikan sertifikat?",
        answer:
          "Informasi mengenai sertifikat mengikuti ketentuan program yang berlaku pada saat pembelian.",
      },
      {
        question: "Bagaimana cara membeli online course?",
        answer:
          "Pembelian dapat dilakukan melalui halaman yang tersedia dan peserta akan menerima instruksi akses setelah pembayaran berhasil.",
      },
      {
        question: "Bagaimana jika saya mengalami kendala akses?",
        answer: `Peserta dapat menghubungi ${siteConfig.name} melalui WhatsApp di ${siteConfig.contact.phoneLocal} untuk mendapatkan bantuan.`,
      },
    ],
  },
  onlineMentoring: {
    key: "onlineMentoring",
    slug: "online-mentoring",
    path: "/services/online-mentoring",
    name: "Online Mentoring",
    fullName: "Online Mentoring Pelatihan AI Social Media Marketing (Google Meet)",
    serviceType: "AI Social Media Marketing Online Mentoring",
    description:
      "Program pendampingan live 8x sesi via Google Meet dengan kurikulum custom, instalasi workflow AI, SOP konten, dan training admin closing untuk bisnis jasa di seluruh Indonesia.",
    price: 4000000,
    priceFormatted: "Rp4.000.000",
    priceDisplayNumber: "4.000.000",
    priceUnit: "/ tim",
    sessions: "8x sesi live via Google Meet",
    courseMode: "online",
    ogImage: "/images/og/offline-mentoring.jpg",
    badge: "REMOTE LIVE",
    ctaLabel: "Cek Jadwal Online Mentoring",
    whatsappMessage:
      "Halo RidleyLab, saya tertarik dengan program Online Mentoring via Google Meet (Rp4.000.000 / tim). Boleh konsultasi jadwal dan kurikulumnya?",
    features: [
      "Kurikulum custom sesuai bisnis",
      "8x sesi live Google Meet bersama tim",
      "SOP + AI system setup",
      "Training admin closing DM & WA",
      "Evaluasi eksekusi real & rekaman sesi",
    ],
    faqs: [
      {
        question: "Berapa biaya program Online Mentoring?",
        answer: `Program Online Mentoring ${siteConfig.name} tersedia dengan investasi Rp4.000.000 per tim untuk 8x sesi pendampingan live via Google Meet.`,
      },
      {
        question: "Apa bedanya Online Mentoring dan Offline Mentoring?",
        answer:
          "Bab materi, kurikulum custom, instalasi workflow AI, SOP konten, hingga training admin closing sama persis. Bedanya hanya pada medium pelaksanaan: Online Mentoring dilakukan live interaktif melalui Google Meet tanpa biaya transport/akomodasi mentor ke luar kota.",
      },
      {
        question: "Apakah tim dari luar Yogyakarta bisa ikut Online Mentoring?",
        answer:
          "Ya, sangat cocok. Online Mentoring dirancang khusus untuk bisnis jasa di Jakarta, Bandung, Semarang, Surabaya, Malang, dan seluruh Indonesia.",
      },
      {
        question: "Apakah tim langsung praktek saat sesi Google Meet?",
        answer:
          "Ya. Setiap sesi bersifat hands-on dengan share screen, bedah akun & funnel bisnis Anda, setup prompt AI langsung, serta evaluasi eksekusi mingguan.",
      },
      {
        question: "Bagaimana cara mendaftar Online Mentoring?",
        answer: `Hubungi tim ${siteConfig.name} melalui WhatsApp di ${siteConfig.contact.phoneLocal} untuk sesi konsultasi awal dan penjadwalan 8 pertemuan Google Meet.`,
      },
    ],
  },
  offlineMentoring: {
    key: "offlineMentoring",
    slug: "offline-mentoring",
    path: "/services/offline-mentoring",
    name: "Offline Mentoring",
    fullName: "Offline Mentoring Pelatihan AI Social Media Marketing",
    serviceType: "AI Social Media Marketing Offline Mentoring",
    description:
      "Workshop tatap muka intensif. Latih tim Anda menggunakan AI untuk produksi konten dan closing agar bisnis jasa Anda dapat scale up dengan cepat.",
    price: 4500000,
    priceFormatted: "Rp4.500.000",
    priceDisplayNumber: "4.500.000",
    priceUnit: "/ tim",
    sessions: "8x sesi tatap muka langsung",
    courseMode: "onsite",
    ogImage: "/images/og/offline-mentoring.jpg",
    badge: "DONE-WITH-YOU",
    ctaLabel: "Cek Ketersediaan Jadwal",
    whatsappMessage:
      "Halo RidleyLab, saya ingin konsultasi untuk program Offline Mentoring (Rp4.500.000 / tim). Apakah masih ada slot jadwal?",
    features: [
      "Kurikulum custom sesuai bisnis",
      "8x tatap muka, implementasi langsung",
      "SOP + AI system setup",
      "Training admin closing",
      "Evaluasi eksekusi real",
    ],
    faqs: [
      {
        question: "Berapa harga offline mentoring?",
        answer: `Program Offline Mentoring ${siteConfig.name} tersedia mulai dari Rp4.500.000 per tim.`,
      },
      {
        question: "Apa yang akan dibahas dalam offline mentoring?",
        answer:
          "Materi mencakup strategi penggunaan AI untuk riset konten, pembuatan skrip, closing otomatis, workflow tim, SOP operasional, dan strategi scale up bisnis jasa.",
      },
      {
        question: "Apakah mentoring dilakukan secara tatap muka?",
        answer:
          "Ya. Program dilakukan secara langsung agar proses diskusi, analisa, dan implementasi berjalan lebih efektif.",
      },
      {
        question: "Siapa yang cocok mengikuti program ini?",
        answer:
          "Program ini cocok untuk pemilik bisnis, UMKM, agency, personal brand, dan perusahaan yang ingin membangun sistem kerja yang lebih terstruktur.",
      },
      {
        question: "Apakah bisnis yang masih kecil bisa mengikuti mentoring?",
        answer:
          "Bisa. Sistem yang baik sebaiknya dibangun sejak awal agar bisnis lebih siap bertumbuh di masa depan.",
      },
      {
        question: "Apakah tim saya bisa ikut dalam sesi mentoring?",
        answer:
          "Ya. Tim dapat dilibatkan agar proses implementasi, transfer knowledge, dan penyusunan SOP berjalan lebih optimal.",
      },
      {
        question: "Apakah mentoring hanya membahas konten?",
        answer:
          "Tidak. Selain sistem konten, program juga membahas workflow bisnis, SOP operasional, pembagian tugas, produktivitas tim, dan implementasi AI.",
      },
      {
        question: "Apakah saya akan mendapatkan SOP bisnis?",
        answer:
          "Ya. Penyusunan SOP merupakan salah satu fokus utama agar aktivitas operasional dapat berjalan lebih konsisten.",
      },
      {
        question: "Apakah mentoring membahas penggunaan AI?",
        answer:
          "Ya. Program mencakup implementasi AI untuk membantu efisiensi produksi konten, dokumentasi, workflow, dan proses operasional lainnya.",
      },
      {
        question: "Berapa lama proses mentoring berlangsung?",
        answer:
          "Program mencakup 8x sesi tatap muka dengan durasi dan jadwal yang disesuaikan kebutuhan ruang lingkup implementasi bisnis Anda.",
      },
      {
        question: "Apakah ada evaluasi setelah implementasi?",
        answer:
          "Ya. Evaluasi dilakukan untuk membantu memastikan sistem yang dibangun dapat diterapkan dan berjalan dengan baik.",
      },
      {
        question: "Apakah mentoring tersedia untuk luar Yogyakarta?",
        answer: `Ya. Untuk luar Yogyakarta tersedia opsi Online Mentoring via Google Meet (Rp4.000.000/tim) maupun in-house offline mentoring. Hubungi ${siteConfig.name} untuk mendiskusikan kebutuhan dan lokasi pelaksanaan.`,
      },
      {
        question: "Bagaimana cara mendaftar offline mentoring?",
        answer: `Pendaftaran dapat dilakukan melalui WhatsApp ${siteConfig.name} di ${siteConfig.contact.phoneLocal} untuk konsultasi awal dan penjadwalan sesi.`,
      },
    ],
  },
};

export const priceRangeLabel = "Rp199.000 - Rp4.500.000+";

export const programComparisonRows: ProgramComparisonRow[] = [
  {
    aspect: "Investasi",
    onlineCourse: "Rp199.000",
    onlineMentoring: "Rp4.000.000 / tim",
    offlineMentoring: "Rp4.500.000 / tim",
  },
  {
    aspect: "Format Pelaksanaan",
    onlineCourse: "Video on-demand mandiri",
    onlineMentoring: "8x sesi live via Google Meet",
    offlineMentoring: "8x sesi tatap muka di lokasi",
  },
  {
    aspect: "Kurikulum & SOP",
    onlineCourse: "Kurikulum & SOP standar",
    onlineMentoring: "Custom disesuaikan bisnis Anda",
    offlineMentoring: "Custom disesuaikan bisnis Anda",
  },
  {
    aspect: "Training Admin Closing",
    onlineCourse: "Materi modul video",
    onlineMentoring: "Simulasi & audit chat langsung",
    offlineMentoring: "Simulasi & audit chat langsung",
  },
  {
    aspect: "Jangkauan Lokasi",
    onlineCourse: "Seluruh Indonesia (24/7)",
    onlineMentoring: "Seluruh Indonesia (tanpa biaya transport)",
    offlineMentoring: "Yogyakarta & in-house luar kota",
  },
];
