import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <>{/* SECTION 1 — HERO */}
      <section className="ridley-section !pt-0 lg:!pt-0 overflow-hidden bg-white">
        <div className="ridley-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT */}
            <div>
              <div className="mb-4">
              </div>

              <h1 className="text-4xl lg:text-[3.25rem] font-medium leading-[1.15] text-black tracking-tight mt-0 mb-7">
                Pelatihan AI untuk <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-ridley-blue to-ridley-yellow bg-clip-text text-transparent">Social Media Marketing</span> <br className="hidden md:block" />
                Bisnis Jasa.
              </h1>

              <p className="ridley-text text-lg mb-10 max-w-xl">
                Mengajarkan tim Anda cara pakai AI untuk bikin konten & closing secara efektif. Kurikulum khusus, latihan berbasis kasus nyata, & hasil yang terukur.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services/offline-mentoring" className="ridley-btn text-white w-full sm:w-auto">
                  Offline Mentoring
                </Link>
                <Link href="/services/online-course" className="ridley-outline-btn w-full sm:w-auto">
                  Online Course
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative w-full h-[450px] lg:h-[600px] xl:h-[650px]">
              <Image
                src="/assets/images/homepage/HP-section1.png"
                alt="RIDLEY Hero"
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

