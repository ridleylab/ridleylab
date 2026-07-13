export const metadata = {
  title: "Panduan Penggunaan CMS - RIDLEY Admin",
};

export default function PanduanPage() {
  return (
    <div className="max-w-4xl space-y-8 text-black pb-20">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-medium text-black">📖 Panduan Penggunaan CMS</h1>
        <p className="text-gray-500 mt-2">
          Pelajari cara menggunakan berbagai fitur unggulan di dalam sistem manajemen konten Ridley.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-ridley-blue mb-4">1. Fitur AI Auto-Pilot</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Fitur ini memungkinkan Anda membuat satu artikel utuh (dari awal sampai akhir) secara instan hanya bermodalkan satu kalimat ide.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Buka halaman <strong>Buat Artikel Baru</strong>.</li>
            <li>Klik tombol <strong>Generate Full Article</strong> di kotak gradasi paling atas.</li>
            <li>Masukkan topik artikel (contoh: <em>"Pentingnya SOP Konten untuk Bisnis Skala Menengah"</em>).</li>
            <li>Tunggu beberapa detik, dan sistem akan otomatis mengisi kolom Judul, URL Slug, Teks Artikel, dan Deskripsi Singkat SEO.</li>
          </ul>
        </section>

        <section className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-ridley-blue mb-4">2. Fitur AI Editor (Rewriter) ✨</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Digunakan saat Anda sedang menulis manual di Editor Tiptap dan butuh bantuan untuk merevisi atau memperbaiki kalimat tertentu.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Blok (select) teks yang ingin diperbaiki di dalam Editor.</li>
            <li>Klik ikon <strong>✨ AI</strong> di *toolbar* Editor (sebelah ikon Gambar).</li>
            <li>Ketik instruksi Anda (misal: <em>"Buat menjadi lebih ramah"</em> atau <em>"Terjemahkan ke bahasa Inggris"</em>).</li>
            <li>Teks lama akan langsung ditimpa dengan hasil yang lebih baik.</li>
          </ul>
        </section>

        <section className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-ridley-blue mb-4">3. Upload Gambar Langsung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sekarang Anda tidak perlu lagi pergi ke menu Media Gallery hanya untuk meng-upload gambar pendukung artikel.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Di *toolbar* Editor, klik ikon <strong>Upload Gambar</strong>.</li>
            <li>Pilih file gambar (JPG/PNG) dari komputer Anda.</li>
            <li>Gambar akan otomatis masuk ke artikel dan juga tersimpan di <em>database</em> Media Gallery.</li>
          </ul>
        </section>

        <section className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-ridley-blue mb-4">4. Publikasi & Draft</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Terdapat dua tombol utama di panel kanan saat mengedit artikel:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Save Draft</strong>: Artikel akan disimpan tapi belum bisa dilihat pengunjung website.</li>
            <li><strong>Publish</strong>: Artikel langsung *live* di halaman Blog utama.</li>
          </ul>
        </section>

        <section className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-ridley-blue mb-4">5. Fitur Generate SEO</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Anda dapat meminta AI untuk membaca isi artikel yang telah ditulis dan secara otomatis merumuskan Judul SEO serta Meta Description (Ringkasan).
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Pastikan Anda sudah menulis isi artikel di dalam editor (minimal 50 karakter).</li>
            <li>Di panel sebelah kanan pada kartu Meta Description & Cover, klik tombol <strong>Generate SEO</strong>.</li>
            <li>Tunggu beberapa detik, AI akan membuatkan dan mengisi kolom secara otomatis agar artikel Anda lebih mudah ditemukan di Google.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
