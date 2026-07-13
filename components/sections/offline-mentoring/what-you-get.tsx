import Image from "next/image";
import Link from "next/link";

export default function MentoringWhatYouGet() {
  return (
    <>{/* SECTION 5 — WHAT YOU GET */}
      <section className="ridley-section bg-white relative overflow-hidden py-24">
        <div className="ridley-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight max-w-4xl mx-auto">
              Semua yang Dibutuhkan Tim Anda untuk Menguasai AI Marketing
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
            {/* IMAGE */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                <img
                  src="/assets/images/offline-mentoring/OM-section5-desktop version.png"
                  alt="Output Program Desktop"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* CARDS */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=3656&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">8x Sesi Tatap Muka</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Pendampingan langsung untuk strategi, implementasi, serta evaluasi eksekusi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=symSqeO01ZN1&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">Praktek AI Bersama</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Kami pandu tim Anda cara mengoperasikan AI, bukan hanya memberi materi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=67462&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">Workflow AI Lengkap</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        SOP produksi yang menggabungkan tenaga manusia dan efisiensi AI.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=pJRgHjNEfDvd&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">Template Prompt AI</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Workflow siap pakai agar produksi konten lebih cepat dan konsisten.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=11218&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">Training Admin Closing</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        SOP komunikasi untuk DM & WA agar leads jadi transaksi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-black/5 bg-white hover:-translate-y-1 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src="https://img.icons8.com/?size=100&id=112393&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-2">Monitoring & Feedback</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Evaluasi sistematis untuk peningkatan performa berkelanjutan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* footer highlight */}
          <div className="border border-black/10 bg-black/[0.02] rounded-3xl p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 shrink-0">
                  <Image
                    src="https://img.icons8.com/?size=100&id=9FwmEZ2Oirp5&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Bukan Sekadar Materi</p>
                  <p className="font-bold text-black">Tapi sistem yang siap dijalankan oleh tim Anda</p>
                </div>
              </div>

              <div className="space-y-3 lg:border-x lg:border-black/10 lg:px-10">
                <p className="text-black font-semibold text-sm">✔ SOP yang jelas</p>
                <p className="text-black font-semibold text-sm">✔ Workflow terstruktur</p>
                <p className="text-black font-semibold text-sm">✔ Hasil terukur</p>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 shrink-0">
                  <Image
                    src="https://img.icons8.com/?size=100&id=47737&format=png&color=2980b9"
                    alt="Icon"
                    fill
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Tujuan Akhir</p>
                  <p className="font-bold text-black">Mesin konten yang bekerja konsisten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

