import Image from "next/image";
import { EyeOff, Sparkles, TrendingDown, UserMinus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const painPoints = [
  {
    icon: TrendingDown,
    text: "Konten terus jalan, tapi respon market masih dingin dan minim inquiry.",
  },
  {
    icon: EyeOff,
    text: "Views bisa tinggi dan engagement ramai, tapi chat masuk dan penjualan tidak ikut naik.",
  },
  {
    icon: UserMinus,
    text: "Followers bertambah, namun bisnis tetap sulit tumbuh secara konsisten.",
  },
];

export default function CourseProblem() {
  return (
    <Section variant="subtle" borderTop>
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Sudah Konsisten Upload Konten, Tapi Closing Tetap Seret?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Banyak UMKM terjebak dalam kondisi &ldquo;viral tanpa konversi&rdquo;
            — konten berjalan, namun omzet tidak ikut bertumbuh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* IMAGE */}
          <div className="min-w-0 lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-square">
              <Image
                src="/images/services/online-course-problem.png"
                alt="Ilustrasi konten ramai namun belum menghasilkan konversi bisnis"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="min-w-0 lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {painPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-950 dark:text-zinc-50 shrink-0">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-zinc-950 dark:border-zinc-700 bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white text-zinc-950 flex items-center justify-center shrink-0">
                <Sparkles size={19} />
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Masalah utamanya bukan di{" "}
                <span className="font-semibold text-white">kualitas kamera</span>
                , tapi karena tim Anda{" "}
                <span className="font-semibold text-white">
                  belum memanfaatkan AI
                </span>{" "}
                untuk meriset sudut pandang target pasar dan merangkai alur
                konversi yang tepat.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
