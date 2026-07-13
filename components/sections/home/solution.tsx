import Image from "next/image";
import Link from "next/link";

export default function HomeSolution() {
  return (
    <>{/* SECTION 3 — SOLUTION */}
      <section className="ridley-section bg-[#F0F5FA] relative overflow-hidden">
        <div className="ridley-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="ridley-title mt-6 mb-6 text-black">
              Pelatihan AI Praktis untuk{" "}
              <span className="text-ridley-blue">Tim Marketing Anda</span>
            </h2>

            <p className="ridley-text max-w-3xl mx-auto">
              Bukan sekadar teori. Kami mengajarkan tim Anda cara pakai AI untuk mempercepat pembuatan konten,
              merampingkan workflow, dan meningkatkan efektivitas closing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-[28px] p-8 border border-ridley-blue/10 hover:border-ridley-blue transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=OZKmqjjlBJbA&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg mb-4 leading-snug text-black">
                Riset & Ideasi Cepat
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Gunakan AI untuk menemukan ide konten relevan dalam hitungan menit, bukan jam.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 border border-ridley-blue/10 hover:border-ridley-blue transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=B7OkzU7ovD5u&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg mb-4 leading-snug text-black">
                Scripting Berkualitas
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Latih tim menghasilkan script hook & story yang terbukti menarik perhatian.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 border border-ridley-blue/10 hover:border-ridley-blue transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=gYcGVfx0I1jc&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg mb-4 leading-snug text-black">
                Workflow Berbasis AI
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                AI diintegrasikan langsung ke dalam rutinitas kerja harian tim marketing Anda.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 border border-ridley-blue/10 hover:border-ridley-blue transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative w-14 h-14 mb-7">
                <Image
                  src="https://img.icons8.com/?size=100&id=Jz9HQymxmfdm&format=png&color=2980b9"
                  alt="Icon"
                  fill
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg mb-4 leading-snug text-black">
                SOP Konversi & Closing
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Cara membalas chat dan DM secara lebih cepat dan akurat untuk meningkatkan sales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

