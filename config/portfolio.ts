export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  businessType: string;
  location: string;
  mentoringDetails: string;
  videoIds: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    name: "AKARA CIPTA KARYA",
    category: "Bisnis Jasa Bangun Rumah",
    businessType: "Bisnis Jasa Bangun Rumah",
    location: "Yogyakarta",
    mentoringDetails:
      "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Mei 2026",
    videoIds: ["7661101076828949778", "7653794096519073031"],
  },
  {
    id: "2",
    name: "ZIPZAP GARMENT",
    category: "Bisnis Konveksi",
    businessType: "Bisnis Konveksi",
    location: "Jakarta",
    mentoringDetails:
      "Offline mentoring dilaksanakan 8x pertemuan tatap muka pada bulan Juni 2026",
    videoIds: ["7661076903004081426", "7653019592054295816"],
  },
];
