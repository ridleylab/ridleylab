import Image from "next/image";
import Link from "next/link";

export default function MentoringProgramFlow() {
  return (
    <>{/* SECTION 4 — PROGRAM FLOW */}
      <section className="ridley-section bg-[#F0F5FA] relative overflow-hidden py-24">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-medium text-black leading-[1.1] mb-5">
              Dari Operasional Acak Menjadi Sistem Konten yang Bisa Jalan Bersama Tim
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
              Proses pendampingan dirancang agar tim ngonten tidak hanya belajar, tetapi benar-benar memiliki sistem yang bisa dijalankan.
            </p>
            <div className="w-16 h-1.5 bg-ridley-yellow mx-auto mt-6 rounded-full"></div>
          </div>

          {/* timeline */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 hidden md:block"></div>
            <div className="absolute left-5 top-0 bottom-0 w-px bg-black/10 md:hidden"></div>

            {/* STEP 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-ridley-blue text-white flex items-center justify-center font-bold z-10 shadow-lg">
                01
              </div>
              <div className="pl-16 md:pl-0 md:w-1/2 md:pr-16 md:text-right">
                <h3 className="text-2xl font-bold mb-3 text-black">Audit & Diagnosa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Memetakan kondisi bisnis, target market, serta bottleneck yang menghambat pertumbuhan.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center mb-16">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-ridley-blue text-white flex items-center justify-center font-bold z-10 shadow-lg">
                02
              </div>
              <div className="pl-16 md:pl-0 md:w-1/2 md:pl-16">
                <h3 className="text-2xl font-bold mb-3 text-black">AI Strategy & Workflow</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menyusun SOP, template prompt AI, dan alur kerja yang lebih cepat dan efisien.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-ridley-blue text-white flex items-center justify-center font-bold z-10 shadow-lg">
                03
              </div>
              <div className="pl-16 md:pl-0 md:w-1/2 md:pr-16 md:text-right">
                <h3 className="text-2xl font-bold mb-3 text-black">Implementasi AI Tools</h3>
                <p className="text-gray-600 leading-relaxed">
                  Melatih tim menggunakan AI dalam rutinitas produksi harian dan proses closing.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center">
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full bg-ridley-blue text-white flex items-center justify-center font-bold z-10 shadow-lg">
                04
              </div>
              <div className="pl-16 md:pl-0 md:w-1/2 md:pl-16">
                <h3 className="text-2xl font-bold mb-3 text-black">Optimasi & Scale Up</h3>
                <p className="text-gray-600 leading-relaxed">
                  Evaluasi rutin agar hasil dari penggunaan AI semakin akurat dan relevan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

