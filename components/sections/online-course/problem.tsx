import Image from "next/image";
import Link from "next/link";

export default function CourseProblem() {
  return (
    <>{/* SECTION 2 — THE PROBLEM */}
      <section className="ridley-section py-20 md:py-28 bg-[#F0F5FA]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium text-black leading-tight max-w-4xl mx-auto">
              Udah Konsisten Upload Konten,
              <br className="hidden md:block" />
              Tapi Closing Tetap Seret?
            </h2>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-sm md:text-base">
              Banyak UMKM terjebak dalam kondisi "viral" - konten jalan dan FYP terus, tapi omzet nggak ikut tumbuh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[520px] h-[350px] md:h-[450px]">
                <div className="absolute inset-0 bg-ridley-blue/10 blur-3xl rounded-full scale-90"></div>
                <Image
                  src="/assets/images/online-course/OC-section2.png"
                  alt="Online course problem illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <div className="space-y-7 mb-10">
                <div className="group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-ridley-blue/10 flex items-center justify-center flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src="https://img.icons8.com/?size=100&id=113109&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium pt-2">
                    Konten terus jalan, tapi respon market masih dingin dan minim inquiry.
                  </p>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-ridley-blue/10 flex items-center justify-center flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src="https://img.icons8.com/?size=100&id=78339&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium pt-2">
                    Views bisa tinggi, engagement ramai, tapi chat masuk dan penjualan tidak ikut naik.
                  </p>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-ridley-blue/10 flex items-center justify-center flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src="https://img.icons8.com/?size=100&id=jlko-Y4NyP5B&format=png&color=2980b9"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium pt-2">
                    Followers bertambah, namun bisnis tetap sulit tumbuh secara konsisten.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-ridley-blue/15 bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-ridley-blue/5 to-transparent pointer-events-none"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-ridley-blue flex items-center justify-center flex-shrink-0 shadow-lg">
                    <div className="relative w-7 h-7">
                      <Image
                        src="https://img.icons8.com/?size=100&id=111453&format=png&color=FFFFFF"
                        alt="Icon"
                        fill
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Masalah utamanya bukan di <span className="font-bold text-black">kualitas konten</span>,
                    tapi karena tim Anda <span className="font-bold text-ridley-blue">belum memanfaatkan AI</span> untuk meriset target pasar dan membuat alur konversi yang tepat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

