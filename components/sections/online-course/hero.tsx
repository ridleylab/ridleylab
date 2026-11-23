import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";

export default function CourseHero() {
  const program = programs.onlineCourse;
  const whatsappUrl = getWhatsAppUrl(program.whatsappMessage);

  return (
    <>{/* SECTION 1 — HERO */}
      <section className="ridley-section !pt-0 lg:!pt-0 bg-white">
        <div className="ridley-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <div className="mb-4">
              </div>

              <h1 className="text-4xl lg:text-[3.25rem] font-medium leading-[1.15] text-black tracking-tight mt-0 mb-6">
                Online Course{" "}
                <span className="bg-gradient-to-r from-ridley-blue to-ridley-yellow bg-clip-text text-transparent">
                  AI Social Media Marketing
                </span>{" "}
                untuk TikTok &amp; Instagram.
              </h1>

              <p className="ridley-text text-lg mb-10 max-w-xl">
                Online Course - Belajar cara memakai AI untuk bikin konten & closing secara efektif. Kurikulum online berbasis kasus nyata dengan hasil yang terukur.
              </p>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ridley-btn text-white w-full sm:w-auto"
                >
                  <div className="relative w-5 h-5">
                    <Image
                      src="https://img.icons8.com/?size=100&id=gJ1RE1ZIDhps&format=png&color=FFFFFF"
                      alt="Download Online Course Icon"
                      fill
                      unoptimized
                    />
                  </div>
                  <span>{program.ctaLabel}</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0">
                  <Image
                    src="/images/services/online-course-proof-avatars.png"
                    alt="Social proof - 1200+ business owners"
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <p className="ridley-text text-sm md:text-base leading-tight">
                  Sudah dipraktikkan oleh 1.200+ pemilik bisnis.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full h-[450px] lg:h-[600px] xl:h-[650px]">
              <Image
                src="/images/services/online-course-hero.png"
                alt={`Online Course ${siteConfig.name} dashboard preview`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
