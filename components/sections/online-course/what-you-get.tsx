import Image from "next/image";
import Link from "next/link";

export default function CourseWhatYouGet() {
  return (
    <>{/* SECTION 4 — WHAT YOU GET */}
      <section className="ridley-section bg-white relative overflow-hidden py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight max-w-5xl mx-auto">
              Semua yang Dibutuhkan untuk
              <br className="hidden md:block" />
              Membangun Tim Marketing Berbasis AI
            </h2>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-sm md:text-base">
              Bukan cuma teori konten, tapi sistem AI yang membantu bisnis bergerak lebih cepat, rapi, dan scalable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            <div className="group relative bg-white rounded-[2rem] border border-black/10 p-8 text-center overflow-hidden hover:-translate-y-2 hover:border-ridley-blue/30 transition duration-500">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ridley-blue scale-x-0 group-hover:scale-x-100 transition duration-500 origin-center"></div>
              <div className="w-20 h-20 rounded-[1.5rem] bg-ridley-blue/5 border border-ridley-blue/10 flex items-center justify-center mx-auto mb-7 group-hover:bg-ridley-blue group-hover:rotate-6 transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=112468&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                    className="group-hover:brightness-0 group-hover:invert transition duration-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 leading-snug">Riset Konten dengan AI</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Belajar membaca market dan menemukan ide konten secara cepat dan presisi menggunakan AI.
              </p>
            </div>

            <div className="group relative bg-white rounded-[2rem] border border-black/10 p-8 text-center overflow-hidden hover:-translate-y-2 hover:border-ridley-blue/30 transition duration-500">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ridley-blue scale-x-0 group-hover:scale-x-100 transition duration-500 origin-center"></div>
              <div className="w-20 h-20 rounded-[1.5rem] bg-ridley-blue/5 border border-ridley-blue/10 flex items-center justify-center mx-auto mb-7 group-hover:bg-ridley-blue group-hover:rotate-6 transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=gGNBmAyURUAc&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                    className="group-hover:brightness-0 group-hover:invert transition duration-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 leading-snug">Workflow Berbasis AI</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Gunakan AI untuk mempercepat brainstorming, scripting, hingga produksi konten agar kerja tim lebih efisien.
              </p>
            </div>

            <div className="group relative bg-white rounded-[2rem] border border-black/10 p-8 text-center overflow-hidden hover:-translate-y-2 hover:border-ridley-blue/30 transition duration-500">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ridley-blue scale-x-0 group-hover:scale-x-100 transition duration-500 origin-center"></div>
              <div className="w-20 h-20 rounded-[1.5rem] bg-ridley-blue/5 border border-ridley-blue/10 flex items-center justify-center mx-auto mb-7 group-hover:bg-ridley-blue group-hover:rotate-6 transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=8K2GhGHks98q&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                    className="group-hover:brightness-0 group-hover:invert transition duration-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 leading-snug">SOP AI & Delegasi Tim</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Panduan praktis menyerahkan alur kerja ke tim Anda dengan instruksi yang ramah AI.
              </p>
            </div>

            <div className="group relative bg-white rounded-[2rem] border border-black/10 p-8 text-center overflow-hidden hover:-translate-y-2 hover:border-ridley-blue/30 transition duration-500">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ridley-blue scale-x-0 group-hover:scale-x-100 transition duration-500 origin-center"></div>
              <div className="w-20 h-20 rounded-[1.5rem] bg-ridley-blue/5 border border-ridley-blue/10 flex items-center justify-center mx-auto mb-7 group-hover:bg-ridley-blue group-hover:rotate-6 transition duration-500">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://img.icons8.com/?size=100&id=78326&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                    className="group-hover:brightness-0 group-hover:invert transition duration-500"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 leading-snug">Landing Page & Closing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Bangun sistem yang membantu audiens lebih percaya dan mempermudah proses inquiry hingga transaksi.
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-400 italic text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              “Kerja tim yang manual itu lambat. Tim yang menguasai AI akan jauh lebih kuat untuk mendominasi market.”
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

