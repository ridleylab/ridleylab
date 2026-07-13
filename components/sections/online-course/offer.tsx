import Image from "next/image";
import Link from "next/link";

export default function CourseOffer() {
  return (
    <>{/* SECTION 5 — THE OFFER */}
      <section className="bg-ridley-blue relative overflow-hidden py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight max-w-5xl mx-auto">
              Semua Materi Pelatihan AI Ini
              <br className="hidden md:block" />
              Bisa Kamu Akses Sekali Bayar
            </h2>
            <p className="text-white/70 mt-6 max-w-2xl mx-auto text-sm md:text-base">
              Dirancang untuk membantu bisnis melatih tim marketing agar lebih rapi, cepat beradaptasi, dan siap berkembang.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-3 bg-ridley-yellow text-black px-7 py-4 rounded-full shadow-2xl">
              <span className="text-sm font-bold uppercase tracking-[0.15em]">Dengan Harga</span>
              <span className="text-2xl md:text-3xl font-medium">Rp199.000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {/* item 1 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=106753&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                    className="group-hover:brightness-0 group-hover:invert-0 transition duration-500"
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">10+ Video Pembelajaran</h3>
              <p className="text-white/60 text-xs mt-2">Bisa dipelajari ulang kapan saja sesuai kebutuhan bisnis.</p>
            </div>

            {/* item 2 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=112370&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">Template Prompt AI</h3>
              <p className="text-white/60 text-xs mt-2">Tinggal adaptasi dan gunakan untuk mempercepat produksi konten.</p>
            </div>

            {/* item 3 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=5MUSl821ydGh&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">SOP Tim Konten</h3>
              <p className="text-white/60 text-xs mt-2">Membantu workflow tim lebih rapi dan tidak berantakan.</p>
            </div>

            {/* item 4 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=113061&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">Bonus Checklist</h3>
              <p className="text-white/60 text-xs mt-2">Persiapan akun dan fondasi konten agar lebih siap jualan.</p>
            </div>

            {/* item 5 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=9430&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">Akses Selamanya</h3>
              <p className="text-white/60 text-xs mt-2">Tidak ada biaya bulanan untuk mengakses materi course.</p>
            </div>

            {/* item 6 */}
            <div className="group text-center hover:-translate-y-3 transition duration-500">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-ridley-yellow transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=21866&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
              </div>
              <h3 className="text-white font-bold leading-relaxed text-sm">Update Materi Baru</h3>
              <p className="text-white/60 text-xs mt-2">Mendapatkan tambahan materi jika ada update trend terbaru.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

