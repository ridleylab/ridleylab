import Image from "next/image";
import Link from "next/link";

export default function CourseSolution() {
  return (
    <>{/* SECTION 3 — THE SOLUTION */}
      <section className="ridley-section bg-black relative overflow-hidden py-24">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight max-w-5xl mx-auto">
              Bangun Sistem Penjualan yang Lebih Terstruktur dengan TikTok, Instagram, AI, dan Landing Page
            </h2>
            <p className="text-white/50 mt-6 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Bukan sekadar bikin konten viral, tapi membangun alur yang mampu menarik traffic,
              membangun trust, lalu mengubah audiens menjadi transaksi secara lebih konsisten.
            </p>
          </div>

          <div className="relative">
            {/* connector desktop */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-[28%] right-[28%] border-t border-dashed border-ridley-yellow/40"></div>
              <div className="absolute left-1/2 top-[24%] bottom-[24%] border-l border-dashed border-ridley-yellow/40"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-ridley-yellow flex items-center justify-center shadow-[0_0_40px_rgba(255,204,74,0.35)]">
                <div className="relative w-8 h-8">
                  <Image
                    src="https://img.icons8.com/?size=100&id=P8JILKxoJUao&format=png&color=000000"
                    alt="Hub"
                    fill
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 lg:gap-y-24">
              {/* TikTok */}
              <div className="aspect-square max-w-[280px] w-full mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:border-ridley-yellow hover:bg-white/[0.05] transition duration-500">
                <div className="relative w-14 h-14 mb-6">
                  <Image
                    src="https://img.icons8.com/?size=100&id=118638&format=png&color=ffcc4a"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">TikTok</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                  Menjangkau audiens baru secara organik lewat konten yang mudah menyebar.
                </p>
              </div>

              {/* Instagram */}
              <div className="aspect-square max-w-[280px] w-full mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:border-ridley-yellow hover:bg-white/[0.05] transition duration-500">
                <div className="relative w-14 h-14 mb-6">
                  <Image
                    src="https://img.icons8.com/?size=100&id=RhYNENh5cxlS&format=png&color=ffcc4a"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">Instagram</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                  Membentuk kredibilitas brand agar audiens lebih yakin untuk membeli.
                </p>
              </div>

              {/* AI & SOP */}
              <div className="aspect-square max-w-[280px] w-full mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:border-ridley-yellow hover:bg-white/[0.05] transition duration-500">
                <div className="relative w-14 h-14 mb-6">
                  <Image
                    src="https://img.icons8.com/?size=100&id=MTnnE7FNiELB&format=png&color=ffcc4a"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">AI-Powered</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                  Memanfaatkan AI untuk mempercepat pembuatan konten, dari ideasi hingga scripting.
                </p>
              </div>

              {/* Landing Page */}
              <div className="aspect-square max-w-[280px] w-full mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:border-ridley-yellow hover:bg-white/[0.05] transition duration-500">
                <div className="relative w-14 h-14 mb-6">
                  <Image
                    src="https://img.icons8.com/?size=100&id=12610&format=png&color=ffcc4a"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">Landing Page</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                  Mengarahkan traffic menjadi leads dan penjualan dengan alur yang lebih jelas.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-white/40 italic text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              “Tarik perhatian audiens, bangun kepercayaan, lalu ubah menjadi penjualan
              dengan sistem yang bisa dijalankan secara konsisten.”
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

