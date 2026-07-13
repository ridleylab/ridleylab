import Image from "next/image";
import Link from "next/link";

export default function CourseCTA() {
  return (
    <>{/* SECTION 6 — CTA CLOSING */}
      <section className="bg-white relative overflow-hidden py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* CONTENT */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-medium text-black leading-tight mb-6">
                Saatnya Latih Tim Anda Menggunakan <span className="text-ridley-blue">AI</span> Agar Bisnis Tumbuh Konsisten
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                Berhenti capek produksi konten manual. Mulai terapkan AI untuk workflow yang lebih rapi, scalable, dan bisa menghasilkan closing secara lebih terukur.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
                <a
                  href="https://wa.me/6281210004453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-4 bg-ridley-blue text-white font-bold px-8 md:px-10 py-4 rounded-2xl transition duration-300 hover:-translate-y-1 shadow-lg shadow-[#2980B9]/20 w-full sm:w-auto"
                >
                  <span>Download Sekarang</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=106753&format=png&color=2980b9"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <span>Akses selamanya</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=59850&format=png&color=2980b9"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <span>Belajar dari mana saja</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=82767&format=png&color=2980b9"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <span>Bisa diputar ulang</span>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px] h-[300px] md:h-[400px]">
                <Image
                  src="/assets/images/online-course/OC-section6.png"
                  alt="CTA Online Course Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

