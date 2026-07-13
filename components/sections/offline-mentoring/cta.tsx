import Image from "next/image";
import Link from "next/link";

export default function MentoringCTA() {
  return (
    <>{/* SECTION 8 — CTA CLOSING */}
      <section id="ridley-final-cta" className="ridley-section bg-[#050505] relative overflow-hidden py-24 text-white">
        <div className="ridley-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* LEFT */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-medium leading-[1.05] mb-6 max-w-[650px]">
                Siap Mentransformasi Tim Marketing Anda dengan AI?
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mb-7">
                Ajukan sesi konsultasi untuk mengevaluasi kebutuhan bisnis Anda. Kami akan cek apakah workshop AI ini cocok untuk scale up bisnis Anda.
              </p>

              <a
                href="https://wa.me/6281210004453"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C0392B] hover:bg-ridley-yellow hover:text-black hover:shadow-[0_0_20px_rgba(255,204,74,0.2)] active:scale-[0.98] transition-all duration-300 rounded-2xl py-4 px-10 text-xs md:text-sm font-bold uppercase"
              >
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="https://img.icons8.com/?size=100&id=16733&format=png&color=FFFFFF"
                    alt="WhatsApp"
                    fill
                    unoptimized
                  />
                </div>
                <span>Daftar & Kurasi Sekarang</span>
              </a>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-white/40 italic">
                <span className="text-ridley-yellow mt-[3px] text-[10px]">•</span>
                <p>Slot terbatas untuk menjaga kualitas mentoring</p>
              </div>

              <div className="mt-10 flex items-end gap-2">
                <span className="text-ridley-yellow text-4xl md:text-5xl font-medium leading-none">
                  Rp 3.500.000
                </span>
                <span className="text-ridley-yellow/80 font-bold text-sm md:text-base mb-[4px]">
                  / Tim
                </span>
              </div>

              <div className="mt-8 flex flex-wrap lg:flex-nowrap gap-x-5 gap-y-2 text-[12px] md:text-sm text-white/70">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-ridley-yellow text-[10px]">•</span>
                  <span>8x Sesi Tatap Muka Intensif</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-ridley-yellow text-[10px]">•</span>
                  <span>Implementasi Sistem Bersama Tim</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-ridley-yellow text-[10px]">•</span>
                  <span>Full SOP & Template Prompt AI</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[450px]">
                <img
                  src="/assets/images/offline-mentoring/OM-section8.png"
                  alt="Offline Mentoring CTA"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

