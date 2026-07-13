import Image from "next/image";
import Link from "next/link";

export default function HomeProblem() {
  return (
    <>{/* SECTION 2 — PROBLEM */}
      <section className="ridley-section bg-black text-white relative overflow-hidden">
        <div className="ridley-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* TITLE */}
            <div>
              <h2 className="text-3xl lg:text-[2.75rem] font-medium text-white mt-2 mb-6 leading-[1.15]">
                Masalahnya Bukan di Kreativitas, Tapi Tim Belum <span className="text-ridley-yellow">Memaksimalkan AI.</span>
              </h2>

              <p className="ridley-text text-gray-300 max-w-xl">
                Banyak bisnis sebenarnya sudah punya tim. Tapi proses produksi konten,
                distribusi, dan workflow masih dilakukan secara manual dan bergantung penuh pada owner.
              </p>
            </div>

            {/* CARD */}
            <div>
              <div className="grid grid-cols-2 gap-5 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-8 h-8 mb-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=d9nXV3Ae3NNX&format=png&color=ffcc4a"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-sm leading-relaxed text-gray-100">
                    Proses riset konten lambat karena serba manual
                  </h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-8 h-8 mb-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=9542&format=png&color=ffcc4a"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-sm leading-relaxed text-gray-100">
                    Tim bingung cara menulis script yang menarik
                  </h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-8 h-8 mb-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=118638&format=png&color=ffcc4a"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-sm leading-relaxed text-gray-100">
                    Produksi tidak konsisten dan boros waktu
                  </h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-ridley-yellow transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-8 h-8 mb-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=goboorUpTkAE&format=png&color=ffcc4a"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-sm leading-relaxed text-gray-100">
                    Tau ada AI, tapi bingung cara integrasi ke workflow
                  </h3>
                </div>
              </div>

              <div className="border border-white/15 rounded-2xl p-6 bg-white/[0.03]">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Selama semuanya masih manual dan bergantung pada owner, bisnis akan membuang banyak waktu. <span className="text-ridley-yellow font-bold">Tim butuh skill AI.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

