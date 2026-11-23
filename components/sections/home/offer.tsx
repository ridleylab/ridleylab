import Link from "next/link";
import { programs } from "@/config/programs";

export default function HomeOffer() {
  const { onlineCourse, offlineMentoring } = programs;

  return (
    <>{/* SECTION 5 — OFFER / PRICING */}
      <section className="ridley-section bg-[#F7FAFC] relative overflow-hidden pt-14">
        <div className="ridley-container relative z-10">
          {/* HEADER */}
          <div className="text-center mb-14">
            <h2 className="ridley-title mt-6 mb-6 text-black">
              Program Pelatihan AI Marketing
            </h2>
            <p className="ridley-text max-w-3xl mx-auto">
              Pilih sesuai kebutuhan tim Anda. Online course untuk belajar mandiri, atau offline mentoring untuk workshop praktek langsung di lokasi.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
            {/* ONLINE COURSE */}
            <div className="bg-white rounded-[28px] md:rounded-[32px] p-7 md:p-10 border border-ridley-blue/10 hover:border-ridley-blue/30 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(41,128,185,0.12)] flex flex-col relative">
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(41,128,185,0.05),transparent_60%)] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="inline-block text-xs font-bold text-ridley-blue border border-ridley-blue/20 px-4 py-1 rounded-full w-fit mb-5">
                  {onlineCourse.badge}
                </span>
                <h3 className="text-3xl font-bold mb-2 tracking-[-0.03em] text-black">
                  {onlineCourse.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Cara bangun mesin akuisisi via TikTok & Instagram
                </p>
                <div className="mb-8">
                  <span className="text-sm text-gray-500">Rp</span>
                  <span className="text-5xl font-bold text-black tracking-[-0.04em]">
                    {onlineCourse.priceDisplayNumber}
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 mb-10 leading-relaxed">
                  {onlineCourse.features.map((feat) => (
                    <li key={feat}>✔ {feat}</li>
                  ))}
                </ul>
                <Link
                  href={onlineCourse.path}
                  className="mt-auto bg-ridley-blue text-white text-center py-4 rounded-[16px] font-bold hover:scale-[1.02] hover:bg-[#216694] transition-all duration-300 shadow-lg shadow-[#2980B9]/20"
                >
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>

            {/* OFFLINE MENTORING */}
            <div className="relative pt-6 px-[2px] flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-ridley-yellow text-black text-xs font-medium px-6 py-2 rounded-full shadow-[0_10px_30px_rgba(255,204,74,0.35)] tracking-wide">
                MOST EXCLUSIVE
              </div>

              <div className="bg-[#0B0B0B] text-white rounded-[28px] md:rounded-[32px] p-7 md:p-12 border-2 border-ridley-yellow relative overflow-hidden shadow-[0_0_40px_rgba(255,204,74,0.16)] hover:shadow-[0_0_100px_rgba(255,204,74,0.22)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,204,74,0.16),transparent_60%)] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFE08A] to-transparent opacity-70"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <span className="inline-block text-xs font-bold bg-ridley-yellow text-black px-4 py-1 rounded-full w-fit mb-5 shadow-md">
                    {offlineMentoring.badge}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-[-0.04em]">
                    {offlineMentoring.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    Implementasi & instalasi sistem langsung ke bisnis Anda
                  </p>
                  <div className="mb-8 flex items-end flex-wrap gap-1">
                    <span className="text-sm text-gray-400 mb-1">Rp</span>
                    <span className="text-[2.4rem] md:text-6xl leading-none font-medium text-ridley-yellow tracking-[-0.05em]">
                      {offlineMentoring.priceDisplayNumber}
                    </span>
                    <span className="text-sm text-gray-400 mb-1">
                      {offlineMentoring.priceUnit}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300 mb-10 leading-relaxed">
                    {offlineMentoring.features.map((feat) => (
                      <li key={feat}>✔ {feat}</li>
                    ))}
                  </ul>
                  <Link
                    href={offlineMentoring.path}
                    className="mt-auto bg-[#C0392B] text-white text-center py-4 rounded-[16px] font-bold hover:scale-[1.02] hover:bg-[#A93226] transition-all duration-300 shadow-xl shadow-[#C0392B]/30"
                  >
                    Pelajari Selengkapnya
                  </Link>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    *Terbatas untuk bisnis yang lolos kurasi
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

