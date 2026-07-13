import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RIDLEY",
  description: "Kebijakan Privasi RIDLEY. Kami melindungi data dan informasi Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString('id-ID')}</p>
        
        <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
          <p>
            Di RIDLEY (Ridleylab), privasi pengunjung kami adalah salah satu prioritas utama kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh RIDLEY dan bagaimana kami menggunakannya.
          </p>
          
          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Informasi yang Kami Kumpulkan</h2>
          <p>
            Informasi pribadi yang Anda diminta untuk berikan, dan alasan mengapa Anda diminta untuk memberikannya, akan dijelaskan kepada Anda pada saat kami meminta Anda untuk memberikan informasi pribadi Anda.
          </p>
          <p>
            Jika Anda menghubungi kami secara langsung, kami mungkin menerima informasi tambahan tentang Anda seperti nama Anda, alamat email, nomor telepon, isi pesan dan/atau lampiran yang mungkin Anda kirimkan kepada kami, dan informasi lain yang mungkin Anda pilih untuk berikan.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>
            Kami menggunakan informasi yang kami kumpulkan dengan berbagai cara, termasuk untuk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyediakan, mengoperasikan, dan memelihara situs web kami</li>
            <li>Meningkatkan, mempersonalisasi, dan memperluas situs web kami</li>
            <li>Memahami dan menganalisis bagaimana Anda menggunakan situs web kami</li>
            <li>Mengembangkan produk, layanan, fitur, dan fungsionalitas baru</li>
            <li>Berkomunikasi dengan Anda, baik secara langsung maupun melalui salah satu mitra kami</li>
            <li>Mengirimi Anda email</li>
            <li>Menemukan dan mencegah penipuan</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Log Files</h2>
          <p>
            RIDLEY mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung saat mereka mengunjungi situs web. Semua perusahaan hosting melakukan ini dan merupakan bagian dari analitik layanan hosting.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan atau saran tentang Kebijakan Privasi kami, jangan ragu untuk menghubungi kami melalui <strong>labridley@gmail.com</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
