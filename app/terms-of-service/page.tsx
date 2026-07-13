import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RIDLEY",
  description: "Syarat dan Ketentuan Layanan RIDLEY.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString('id-ID')}</p>
        
        <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
          <p>
            Selamat datang di RIDLEY! Syarat dan ketentuan ini menguraikan aturan dan peraturan untuk penggunaan Situs Web RIDLEY dan layanan-layanannya (seperti Online Course dan Offline Mentoring).
          </p>
          
          <p>
            Dengan mengakses situs web ini dan mendaftar pada layanan kami, kami berasumsi bahwa Anda menerima syarat dan ketentuan ini secara penuh. Jangan terus menggunakan situs web RIDLEY jika Anda tidak menerima semua syarat dan ketentuan yang tercantum di halaman ini.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Lisensi</h2>
          <p>
            Kecuali dinyatakan lain, RIDLEY dan/atau pemberi lisensinya memiliki hak kekayaan intelektual untuk semua materi di RIDLEY (termasuk namun tidak terbatas pada modul kursus, video, materi presentasi). Semua hak kekayaan intelektual dilindungi.
          </p>
          <p>
            Anda tidak boleh:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mempublikasikan ulang materi dari RIDLEY</li>
            <li>Menjual, menyewakan, atau mensublisensikan materi dari RIDLEY</li>
            <li>Mereproduksi, menggandakan, atau menyalin materi (seperti modul kursus) dari RIDLEY</li>
            <li>Mendistribusikan ulang konten dari RIDLEY (kecuali konten yang secara khusus dibuat untuk didistribusikan ulang)</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Kebijakan Pengembalian Dana (Refund Policy)</h2>
          <p>
            Harap pastikan Anda telah membaca semua detail program (baik Online Course maupun Mentoring) sebelum melakukan pembelian. Kami tidak melayani pengembalian dana (refund) untuk produk atau layanan yang sudah diakses, kecuali terdapat masalah teknis fatal yang disebabkan oleh sistem kami dan tidak dapat diselesaikan oleh tim dukungan kami dalam jangka waktu wajar.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Pelepasan Tanggung Jawab</h2>
          <p>
            Program pelatihan kami (termasuk implementasi AI) dirancang untuk memberikan pengetahuan, strategi, dan taktik terbaik. Namun, kesuksesan implementasi sangat bergantung pada komitmen, kecepatan eksekusi, dan kondisi spesifik dari masing-masing bisnis klien. RIDLEY tidak dapat menjamin angka spesifik untuk hasil penjualan (closing) atau leads yang akan didapatkan setelah pelatihan.
          </p>
        </div>
      </div>
    </main>
  );
}
