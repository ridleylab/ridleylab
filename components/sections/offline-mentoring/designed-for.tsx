import Image from "next/image";
import Link from "next/link";

export default function MentoringDesignedFor() {
  return (
    <>{/* SECTION 7 — DESIGNED FOR */}
      <section className="ridley-section bg-white relative overflow-hidden py-24">
        <div className="ridley-container relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-medium text-black leading-tight mb-5">
              Untuk Bisnis yang Siap Naik Level
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-ridley-blue/10 flex items-center justify-center font-bold text-ridley-blue">
                  ✓
                </div>
                <h3 className="font-bold text-black text-lg">Cocok untuk Anda jika:</h3>
              </div>
              <div className="space-y-4 text-gray-700 font-medium text-sm md:text-base">
                <p>• Bisnis sudah berjalan dan ingin scale lebih rapi</p>
                <p>• Ingin tim kerja lebih cepat dengan integrasi AI</p>
                <p>• Ingin sistem TikTok & Instagram yang repeatable</p>
                <p>• Workflow konten ingin lebih cepat dengan bantuan AI</p>
                <p>• Closing DM / WhatsApp ingin lebih terstruktur</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center font-bold text-red-500">
                  ✕
                </div>
                <h3 className="font-bold text-black text-lg">Kurang cocok jika:</h3>
              </div>
              <div className="space-y-4 text-gray-700 font-medium text-sm md:text-base">
                <p>• Hanya ingin belajar teori tanpa implementasi</p>
                <p>• Belum siap konsisten menjalankan sistem</p>
                <p>• Mencari hasil instan tanpa proses</p>
                <p>• Belum punya waktu membangun fondasi bisnis</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

