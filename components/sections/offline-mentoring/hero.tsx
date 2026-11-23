import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";

export default function MentoringHero() {
  const whatsappUrl = getWhatsAppUrl(programs.offlineMentoring.whatsappMessage);

  return (
    <>{/* SECTION 1 — HERO */}
      <section className="ridley-section overflow-hidden !pt-4 !lg:pt-10 bg-white">
        <div className="ridley-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <div className="mb-4">
              </div>

              <h1 className="text-4xl lg:text-[3.25rem] font-medium leading-[1.15] text-black tracking-tight mb-6">
                Offline Mentoring{" "}
                <span className="bg-gradient-to-r from-ridley-blue to-ridley-yellow bg-clip-text text-transparent">
                  AI Social Media Marketing
                </span>{" "}
                di Lokasi Bisnis Anda.
              </h1>

              <p className="ridley-text text-lg mb-10 max-w-xl">
                Offline Mentoring - Workshop di lokasi yang mengajarkan tim Anda cara pakai AI untuk bikin konten & closing secara efektif. Kurikulum khusus, latihan kasus nyata, & hasil terukur.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">8x sesi tatap muka</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">SOP Produksi Konten</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">Workflow Tim</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">Template Prompt AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">SOP Closing Admin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="ridley-check text-ridley-blue font-bold">✔</span>
                  <span className="ridley-text text-gray-700">Evaluasi & Scale-up</span>
                </div>
              </div>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ridley-btn text-white w-full sm:w-auto"
                >
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=ZeQPTbzIF4jw&format=png&color=FFFFFF"
                      alt="WhatsApp"
                      fill
                      unoptimized
                    />
                  </div>
                  <span>Cek Ketersediaan Jadwal</span>
                </a>
              </div>

              <div className="mt-4 text-xs uppercase tracking-widest text-gray-500">
                Respon cepat | Terjadwal | Terbatas
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full aspect-square rounded-[13px] overflow-hidden shadow-2xl border border-black/5">
              <img
                src="/images/services/offline-mentoring-hero.jpg"
                alt={`Offline Mentoring ${siteConfig.name}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

