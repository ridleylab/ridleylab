import Image from "next/image";
import Link from "next/link";

export default function HomeProof() {
  return (
    <>{/* SECTION 4 — PROOF */}
      <section className="ridley-section bg-white">
        <div className="ridley-container">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="ridley-title mt-5 text-black">
              Hasil Nyata dari Bisnis Jasa
              <br />
              Setelah Mengikuti Pelatihan AI Kami
            </h2>
            <p className="ridley-text max-w-3xl mx-auto mt-5">
              Bukan sekadar konsep. Ilmu ini sudah dipakai untuk menghasilkan leads, chat masuk,
              dan mempercepat kerja tim di berbagai niche bisnis.
            </p>
          </div>

          {/* TOP INFO */}
          <div className="ridley-proof-top">
            <div className="ridley-proof-box text-black">
              <h3 className="font-bold text-lg">Dipakai oleh:</h3>
              <ul className="mt-4 space-y-2">
                <li>✔ UMKM jasa</li>
                <li>✔ Brand lokal</li>
                <li>✔ Personal brand</li>
                <li>✔ Tim kecil tanpa marketing</li>
              </ul>
            </div>

            <div className="ridley-proof-box text-black">
              <h3 className="font-bold text-lg">Output yang terjadi:</h3>
              <ul className="mt-4 space-y-2">
                <li>→ Chat masuk</li>
                <li>→ Leads</li>
                <li>→ Closing</li>
                <li>→ Audience growth</li>
              </ul>
            </div>
          </div>

          {/* GRID */}
          <div className="ridley-proof-grid">
            <div className="ridley-proof-card">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="/assets/images/homepage/HP-section4.1.png"
                  alt="Jasa Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="ridley-proof-content">
                <h4 className="text-black font-bold">Bisnis Jasa Interior</h4>
                <p>Chat masuk meningkat 3x lipat dalam 50 hari</p>
              </div>
            </div>

            <div className="ridley-proof-card">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="/assets/images/homepage/HP-section4.2.png"
                  alt="Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="ridley-proof-content">
                <h4 className="text-black font-bold">UMKM Fashion</h4>
                <p>Leads naik 283 dalam 50 hari</p>
              </div>
            </div>

            <div className="ridley-proof-card">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="/assets/images/homepage/HP-section4.3.png"
                  alt="Skincare"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="ridley-proof-content">
                <h4 className="text-black font-bold">Brand Skincare</h4>
                <p>Penjualan meningkat dari konten organik</p>
              </div>
            </div>

            <div className="ridley-proof-card">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="/assets/images/homepage/HP-section4.4.png"
                  alt="MUA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="ridley-proof-content">
                <h4 className="text-black font-bold">Personal Brand MUA</h4>
                <p>0 → 6.500+ follower organik</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

