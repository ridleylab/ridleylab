import Image from "next/image";
import Link from "next/link";

export default function MentoringResults() {
  return (
    <>{/* SECTION 6 — RESULTS */}
      <section className="ridley-section bg-[#F0F5FA] relative overflow-hidden py-24">
        <div className="ridley-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight max-w-4xl mx-auto">
              Bisnis yang Bertumbuh Setelah Timnya Dilatih Menggunakan AI
            </h2>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-sm md:text-base">
              Beberapa hasil nyata dari bisnis yang sudah menerapkan workflow AI marketing.
            </p>
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-ridley-blue flex items-center justify-center text-white font-bold">
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://img.icons8.com/?size=100&id=55598&format=png&color=FFFFFF"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black">Bisnis Jasa Interior</h3>
                  <p className="text-ridley-blue font-bold text-sm">Leads naik 3x lipat</p>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden border border-black/5">
                <Image
                  src="/assets/images/offline-mentoring/OM-section6.1.png"
                  alt="result 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✔ Leads meningkat signifikan</p>
                <p>✔ Closing lebih terstruktur</p>
                <p>✔ Alur konten lebih stabil</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-ridley-blue flex items-center justify-center text-white font-bold">
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://img.icons8.com/?size=100&id=25368&format=png&color=FFFFFF"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black">UMKM Fashion</h3>
                  <p className="text-ridley-blue font-bold text-sm">Growth organik naik</p>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden border border-black/5">
                <Image
                  src="/assets/images/offline-mentoring/OM-section6.2.png"
                  alt="result 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✔ Konsistensi konten meningkat</p>
                <p>✔ Followers bertumbuh</p>
                <p>✔ Penjualan ikut naik</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-ridley-blue flex items-center justify-center text-white font-bold">
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://img.icons8.com/?size=100&id=wGNx6AM4MqaG&format=png&color=FFFFFF"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black">Brand Skincare Lokal</h3>
                  <p className="text-ridley-blue font-bold text-sm">Reach +180%</p>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden border border-black/5">
                <Image
                  src="/assets/images/offline-mentoring/OM-section6.3.png"
                  alt="result 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✔ Reach meningkat signifikan</p>
                <p>✔ Leads lebih relevan</p>
                <p>✔ Sistem lebih stabil</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-ridley-blue flex items-center justify-center text-white font-bold">
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://img.icons8.com/?size=100&id=eNNWu9ofGuZG&format=png&color=FFFFFF"
                      alt="Icon"
                      fill
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black">Personal Brand Coach</h3>
                  <p className="text-ridley-blue font-bold text-sm">DM meningkat</p>
                </div>
              </div>
              <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden border border-black/5">
                <Image
                  src="/assets/images/offline-mentoring/OM-section6.4.png"
                  alt="result 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✔ DM inquiry meningkat</p>
                <p>✔ Engagement naik</p>
                <p>✔ Kolaborasi bertambah</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-xs italic max-w-2xl mx-auto">
              *Hasil setiap bisnis berbeda tergantung eksekusi, tim, niche, dan konsistensi implementasi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

