import Image from "next/image";
import Link from "next/link";

export default function CourseHero() {
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
                Pelatihan AI <br />
                <span className="bg-gradient-to-r from-ridley-blue to-ridley-yellow bg-clip-text text-transparent">Social Media Marketing</span> <br />
                Bisnis Jasa.
              </h1>

              <p className="ridley-text text-lg mb-10 max-w-xl">
                Online Course - Belajar cara memakai AI untuk bikin konten & closing secara efektif. Kurikulum online berbasis kasus nyata dengan hasil yang terukur.
              </p>

              <div>
                <a
                  href="https://wa.me/6281210004453"
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
                  <span>Download Online Course</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0">
                  <Image
                    src="/assets/images/online-course/OC-section1.2.png"
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
                src="/assets/images/online-course/OC-section1.1.png"
                alt="Online Course RIDLEY dashboard preview"
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

