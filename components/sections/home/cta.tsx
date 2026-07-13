import Image from "next/image";
import Link from "next/link";

export default function HomeCTA() {
  return (
    <>{/* SECTION 6 — CTA CLOSING */}
      <section className="ridley-section bg-black relative overflow-hidden text-white">
        <div className="ridley-container relative z-10 text-center py-20 md:py-24">
          <span className="inline-block text-xs font-bold text-ridley-yellow border border-ridley-yellow/40 px-5 py-2 rounded-full tracking-[0.25em] mb-6">
            KESEMPATAN TERBATAS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 max-w-4xl mx-auto">
            Mau Lanjut <span className="line-through text-gray-500">Kerja Manual</span>,
            Atau Bangun <span className="text-ridley-yellow">Tim Marketing Berbasis AI</span> Sekarang?
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Setiap hari tanpa adaptasi AI = potensi pertumbuhan yang hilang karena kalah cepat dari kompetitor.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link
              href="/services/offline-mentoring"
              className="bg-ridley-blue text-white px-10 py-5 rounded-[14px] font-bold hover:scale-105 hover:bg-ridley-yellow hover:text-black transition"
            >
              Pelajari Offline Mentoring
            </Link>

            <a
              href="https://wa.me/6281210004453"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#25D366]/40 text-white px-8 py-5 rounded-[14px] font-bold flex items-center justify-center gap-3 hover:bg-[#25D366] transition"
            >
              <div className="relative w-6 h-6">
                <Image
                  src="https://img.icons8.com/color/48/whatsapp--v1.png"
                  alt="WhatsApp"
                  fill
                  unoptimized
                />
              </div>
              Tanya dulu via WA
            </a>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="grid md:grid-cols-3 gap-8 text-white/60 text-sm font-medium">
              <div className="flex items-center justify-center gap-2">🔒 Akses Selamanya</div>
              <div className="flex items-center justify-center gap-2">🔄 Free Update Materi</div>
              <div className="flex items-center justify-center gap-2">👥 Support Komunitas</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

