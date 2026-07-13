import Image from "next/image";
import Link from "next/link";

export default function MentoringHowWeWork() {
  return (
    <>{/* SECTION 3 — HOW WE WORK */}
      <section className="ridley-section bg-black relative overflow-hidden py-20">
        <div className="ridley-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="ridley-title text-white mb-6">
              Bukan Sekadar Pelatihan. <br />
              Ini Transformasi Tim Anda <span className="text-ridley-yellow">dengan AI.</span>
            </h2>
            <p className="ridley-text text-white/60 max-w-3xl mx-auto">
              Kami membantu bisnis membangun workflow AI yang bisa mempercepat produksi konten, dari ide hingga closing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow hover:-translate-y-2 transition-all duration-500">
              <div className="relative w-8 h-8 mb-5">
                <Image
                  src="https://img.icons8.com/?size=100&id=n0trbwvkiG7r&format=png&color=FFCC4A"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-sm text-white">Pendampingan Offline Terstruktur</h3>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                8 sesi tatap muka intensif untuk memastikan implementasi berjalan tanpa hambatan teknis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow hover:-translate-y-2 transition-all duration-500">
              <div className="relative w-8 h-8 mb-5">
                <Image
                  src="https://img.icons8.com/?size=100&id=IN7yfpVTPRzI&format=png&color=FFCC4A"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-sm text-white">Strategi Spesifik Bisnis Anda</h3>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Analisis funnel, positioning, dan target market sebelum menyusun blueprint konten bisnis Anda.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow hover:-translate-y-2 transition-all duration-500">
              <div className="relative w-8 h-8 mb-5">
                <Image
                  src="https://img.icons8.com/?size=100&id=wxIQffEFAs2d&format=png&color=FFCC4A"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-sm text-white">Training Tim Berbasis AI</h3>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Tim dilatih menggunakan template prompt AI dan workflow produksi agar proses harian lebih efisien.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow hover:-translate-y-2 transition-all duration-500">
              <div className="relative w-8 h-8 mb-5">
                <Image
                  src="https://img.icons8.com/?size=100&id=79644&format=png&color=FFCC4A"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-sm text-white">Evaluasi & Scale-up Rutin</h3>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">
                Audit performa berkala untuk memastikan sistem menghasilkan ROI yang terukur bagi bisnis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

