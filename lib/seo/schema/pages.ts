import { getOrganizationSchema } from "./organization";
import { getWebSiteSchema } from "./website";

// --- HOMEPAGE ---
export function getHomeWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.ridleylab.com/#webpage",
    "url": "https://www.ridleylab.com/",
    "name": "RIDLEY - Pelatihan AI Social Media Marketing Bisnis Jasa",
    "description": "RIDLEY menyediakan Pelatihan AI Social Media Marketing untuk membantu bisnis jasa membangun sistem konten dan alur konversi otomatis.",
    "isPartOf": {
      "@id": "https://www.ridleylab.com/#website"
    }
  };
}

// --- ONLINE COURSE ---
export function getOnlineCourseServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.ridleylab.com/online-course/#service",
    "name": "Online Course Pelatihan AI Social Media Marketing",
    "image": "https://www.ridleylab.com/assets/images/online-course/OC-OG.jpg",
    "url": "https://www.ridleylab.com/online-course/",
    "serviceType": "AI Social Media Marketing Online Course",
    "description": "Program belajar mandiri Pelatihan AI Social Media Marketing untuk riset konten, pembuatan skrip, dan alur konversi otomatis di TikTok dan Instagram.",
    "provider": {
      "@id": "https://www.ridleylab.com/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "offers": {
      "@type": "Offer",
      "price": "199000",
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": "https://www.ridleylab.com/online-course/"
    }
  };
}

export function getOnlineCourseFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Berapa harga online course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online Course RIDLEY tersedia dengan harga Rp199.000."
        }
      },
      {
        "@type": "Question",
        "name": "Apa yang dipelajari dalam online course ini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Materi mencakup riset konten dengan AI, pembuatan skrip, alur konversi otomatis di TikTok dan Instagram, serta SOP operasional untuk bisnis jasa."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah online course cocok untuk pemula?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Materi dirancang agar mudah dipahami oleh pemula maupun pelaku bisnis yang ingin membangun sistem kerja yang lebih baik."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah online course cocok untuk pemilik UMKM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Materi sangat relevan untuk UMKM yang ingin membangun sistem konten, SOP, workflow, dan operasional yang lebih efisien."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah saya harus memiliki tim terlebih dahulu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tidak. Materi dapat dipelajari baik oleh pemilik bisnis yang bekerja sendiri maupun yang sudah memiliki tim."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah materi membahas sistem konten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Pelatihan AI Social Media Marketing ini sangat berfokus pada sistem pembuatan konten otomatis yang konsisten dan terukur."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah materi membahas SOP bisnis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Peserta akan memahami pentingnya SOP dan bagaimana SOP membantu operasional bisnis berjalan lebih rapi."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah materi membahas penggunaan AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Course membahas implementasi AI untuk membantu efisiensi kerja, produksi konten, dan proses operasional bisnis."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah online course bisa diakses kapan saja?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Peserta dapat mengakses materi sesuai waktu belajar masing-masing."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah ada batas waktu akses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Informasi mengenai masa akses mengikuti ketentuan program yang berlaku pada saat pembelian."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah materi dapat dipelajari berulang kali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Peserta dapat mempelajari kembali materi yang telah tersedia selama masa akses masih aktif."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah saya akan mendapatkan update materi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Update materi dapat diberikan sesuai kebijakan program yang berlaku."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah online course memberikan sertifikat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Informasi mengenai sertifikat mengikuti ketentuan program yang berlaku pada saat pembelian."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana cara membeli online course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pembelian dapat dilakukan melalui halaman yang tersedia dan peserta akan menerima instruksi akses setelah pembayaran berhasil."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana jika saya mengalami kendala akses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Peserta dapat menghubungi RIDLEY melalui WhatsApp di 081210004453 untuk mendapatkan bantuan."
        }
      }
    ]
  };
}

export function getOnlineCourseWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.ridleylab.com/online-course/#webpage",
    "url": "https://www.ridleylab.com/online-course/",
    "name": "Online Course - Pelatihan AI Social Media Marketing | RIDLEY",
    "description": "Belajar mandiri cara memakai AI untuk riset konten, pembuatan skrip, dan alur konversi otomatis di TikTok dan Instagram.",
    "isPartOf": {
      "@id": "https://www.ridleylab.com/#website"
    }
  };
}

// --- OFFLINE MENTORING ---
export function getOfflineMentoringServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.ridleylab.com/offline-mentoring/#service",
    "name": "Offline Mentoring Pelatihan AI Social Media Marketing",
    "image": "https://www.ridleylab.com/assets/images/offline-mentoring/OM-OG.jpg",
    "url": "https://www.ridleylab.com/offline-mentoring/",
    "serviceType": "AI Social Media Marketing Offline Mentoring",
    "description": "Workshop tatap muka intensif. Latih tim Anda menggunakan AI untuk produksi konten dan closing agar bisnis jasa Anda dapat scale up dengan cepat.",
    "provider": {
      "@id": "https://www.ridleylab.com/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "offers": {
      "@type": "Offer",
      "price": "2500000",
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": "https://www.ridleylab.com/offline-mentoring/"
    }
  };
}

export function getOfflineMentoringFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Berapa harga offline mentoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Program Offline Mentoring RIDLEY tersedia mulai dari Rp3.500.000."
        }
      },
      {
        "@type": "Question",
        "name": "Apa yang akan dibahas dalam offline mentoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Materi mencakup strategi penggunaan AI untuk riset konten, pembuatan skrip, closing otomatis, workflow tim, SOP operasional, dan strategi scale up bisnis jasa."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah mentoring dilakukan secara tatap muka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Program dilakukan secara langsung agar proses diskusi, analisa, dan implementasi berjalan lebih efektif."
        }
      },
      {
        "@type": "Question",
        "name": "Siapa yang cocok mengikuti program ini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Program ini cocok untuk pemilik bisnis, UMKM, agency, personal brand, dan perusahaan yang ingin membangun sistem kerja yang lebih terstruktur."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah bisnis yang masih kecil bisa mengikuti mentoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bisa. Sistem yang baik sebaiknya dibangun sejak awal agar bisnis lebih siap bertumbuh di masa depan."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah tim saya bisa ikut dalam sesi mentoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Tim dapat dilibatkan agar proses implementasi, transfer knowledge, dan penyusunan SOP berjalan lebih optimal."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah mentoring hanya membahas konten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tidak. Selain sistem konten, program juga membahas workflow bisnis, SOP operasional, pembagian tugas, produktivitas tim, dan implementasi AI."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah saya akan mendapatkan SOP bisnis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Penyusunan SOP merupakan salah satu fokus utama agar aktivitas operasional dapat berjalan lebih konsisten."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah mentoring membahas penggunaan AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Program mencakup implementasi AI untuk membantu efisiensi produksi konten, dokumentasi, workflow, dan proses operasional lainnya."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa lama proses mentoring berlangsung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Durasi mentoring disesuaikan dengan kebutuhan dan ruang lingkup implementasi yang dibutuhkan oleh bisnis."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah ada evaluasi setelah implementasi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Evaluasi dilakukan untuk membantu memastikan sistem yang dibangun dapat diterapkan dan berjalan dengan baik."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah mentoring tersedia untuk luar Yogyakarta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya. Silakan hubungi RIDLEY untuk mendiskusikan kebutuhan dan lokasi pelaksanaan mentoring."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana cara mendaftar offline mentoring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pendaftaran dapat dilakukan melalui WhatsApp RIDLEY di 081210004453 untuk konsultasi awal dan penjadwalan sesi."
        }
      }
    ]
  };
}

export function getOfflineMentoringWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.ridleylab.com/offline-mentoring/#webpage",
    "url": "https://www.ridleylab.com/offline-mentoring/",
    "name": "Offline Mentoring - Pelatihan AI Social Media Marketing | RIDLEY",
    "description": "Workshop tatap muka intensif. Latih tim Anda menggunakan AI untuk produksi konten dan closing agar bisnis jasa Anda dapat scale up dengan cepat.",
    "isPartOf": {
      "@id": "https://www.ridleylab.com/#website"
    }
  };
}
