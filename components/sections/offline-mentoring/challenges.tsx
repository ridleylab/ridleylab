import Image from "next/image";
import Link from "next/link";

export default function MentoringChallenges() {
  return (
    <>{/* SECTION 2 — CHALLENGES */}
      <section className="ridley-section bg-[#F0F5FA] relative overflow-hidden">
        <div className="ridley-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="ridley-title mt-6 mb-6 text-black">
              Produksi Konten Masih Lambat,
              <br className="hidden md:block" />
              Karena Tim Belum <span className="text-ridley-blue">Pakai AI</span>
            </h2>
            <p className="ridley-text max-w-3xl mx-auto">
              Banyak bisnis sebenarnya sudah aktif membuat konten. Tapi produksi masih manual,
              memakan waktu lama, dan tim belum tahu cara mengoptimalkan AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=qkHDaCiVoFNd&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Tidak ada sistem repeatable</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Konten dibuat berdasarkan mood dan ide dadakan. Belum ada SOP produksi yang konsisten untuk tim.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=Al726KOu9YVG&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Tim ada, tapi belum terarah</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Karyawan tidak punya workflow jelas, template kerja, maupun standar evaluasi performa.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=I3qNlQO7IQ5J&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Produksi terasa melelahkan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Karena tidak ada workflow yang efisien, proses produksi jadi lambat dan membuat tim cepat burnout.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=iwiG3oLM9s6n&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Sudah keluar biaya, tidak terukur</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Konten tetap berjalan, tetapi belum ada sistem evaluasi dan strategi akuisisi yang jelas.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=8E05dWWpACy3&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Owner masih terlibat teknis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bisnis sulit scale karena seluruh keputusan teknis masih bergantung pada owner.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-[28px] p-10 border border-transparent hover:border-ridley-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=113063&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-medium text-xl leading-tight mb-4 text-black">Data sering diabaikan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Konten diposting tanpa membaca insight, sehingga strategi sulit berkembang secara konsisten.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white/70 border-l-[5px] border-ridley-blue rounded-[24px] p-8 md:p-12 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0 text-ridley-blue opacity-40">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H5.017V21H6.017Z" />
                </svg>
              </div>
              <p className="text-lg md:text-xl text-black leading-relaxed italic text-center md:text-left">
                Dalam banyak kasus, masalahnya bukan pada kreativitas. Masalahnya adalah bisnis belum melatih tim menggunakan AI untuk mempercepat alur kerja dan efisiensi produksi konten.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

