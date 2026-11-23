import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, TrendingUp, Users, Zap, Award } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { InstagramIcon, TikTokIcon } from "@/components/ui/social-icons";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAboutSchemaGraph } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: `Tentang ${siteConfig.name} & Founder`,
  description: `Pelajari lebih lanjut tentang misi ${siteConfig.name} dan founder ${siteConfig.founder.name} dalam membantu bisnis jasa membangun sistem konten dan alur konversi otomatis berbasis AI.`,
  path: "/about",
});

export default function AboutPage() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <>
      <JsonLd data={getAboutSchemaGraph()} />
      <div className="bg-white min-h-screen py-16">
      <div className="ridley-container">
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
            Tentang {siteConfig.name}
          </h1>
          <p className="ridley-text text-gray-500 text-lg">
            Platform resmi Pelatihan AI Social Media Marketing untuk membantu bisnis jasa beradaptasi,
            membangun sistem konten yang kuat, dan menciptakan alur konversi otomatis berbasis AI.
          </p>
        </div>

        {/* MISSION & SERVICES SECTION */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-black mb-6">Misi Kami</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Banyak bisnis punya target besar, tapi sering lupa bahwa target yang jauh butuh operasional yang cepat dan efisien.
              Di era digital saat ini, adaptasi terhadap Artificial Intelligence (AI) bukan lagi pilihan, melainkan keharusan.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {siteConfig.name} hadir untuk mengajarkan tim Anda cara memakai AI secara taktis—mulai dari membuat konten yang menarik hingga teknik <em>closing</em> yang efektif.
              Melalui kurikulum khusus, latihan berbasis kasus nyata, dan hasil yang terukur, kami memastikan bisnis jasa Anda dapat melangkah lebih cepat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={programs.offlineMentoring.path} className="ridley-btn text-white text-center w-full sm:w-auto">
                {programs.offlineMentoring.name}
              </Link>
              <Link href={programs.onlineCourse.path} className="ridley-outline-btn text-center w-full sm:w-auto">
                {programs.onlineCourse.name}
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-ridley-blue shadow-sm">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">3x Lipat</h3>
              <p className="text-sm text-gray-600">Interaksi & chat masuk dalam 50 hari</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-ridley-blue shadow-sm">
                <Users size={24} />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">283+</h3>
              <p className="text-sm text-gray-600">Leads bisnis baru dari konten organik</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-ridley-blue shadow-sm">
                <Award size={24} />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">6.500+</h3>
              <p className="text-sm text-gray-600">Pertumbuhan follower murni organik</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-ridley-blue shadow-sm">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">100%</h3>
              <p className="text-sm text-gray-600">Tim lebih efisien tanpa tambah SDM</p>
            </div>
          </div>
        </div>

        {/* FOUNDER SECTION */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-24">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/images/about/founder.png"
                  alt={`${siteConfig.founder.name} - ${siteConfig.founder.role}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              <h2 className="text-3xl font-bold text-black mb-2">{siteConfig.founder.name}</h2>
              <p className="text-ridley-blue font-bold tracking-wider uppercase text-sm mb-6">
                {siteConfig.founder.role}
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Saya mendirikan {siteConfig.name} dengan satu keyakinan: teknologi AI harus bisa diakses dan diterapkan secara praktis oleh semua bisnis jasa yang ingin <em>scale up</em>.
                </p>
                <p>
                  Pengalaman kami membuktikan bahwa kendala terbesar banyak pengusaha bukanlah kurangnya ide, melainkan lambatnya eksekusi konten dan tidak adanya sistem konversi yang berjalan otomatis.
                </p>
                <p>
                  Melalui metode pelatihan dan <em>mentoring</em> yang kami kembangkan di {siteConfig.name}, saya berdedikasi untuk membantu tim Anda menguasai AI dan menjadikannya sebagai mesin pertumbuhan bisnis yang sesungguhnya.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-10">Hubungi Kami</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* LOKASI */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-ridley-blue flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Lokasi</h3>
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-ridley-blue transition-colors block"
                >
                  {siteConfig.address.streetAddress}
                  <br />
                  {siteConfig.address.locality}, {siteConfig.address.regionShort} {siteConfig.address.postalCode}
                </a>
              </div>
            </div>

            {/* TELEPON */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-ridley-blue flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Telepon / WhatsApp</h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-ridley-blue transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-ridley-blue flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Email</h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-500 text-sm hover:text-ridley-blue transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <a
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-ridley-blue font-bold transition-colors"
            >
              <InstagramIcon className="w-5 h-5 text-ridley-blue" />
              {siteConfig.social.instagram.handle}
            </a>
            <a
              href={siteConfig.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-ridley-blue font-bold transition-colors"
            >
              <TikTokIcon className="w-5 h-5 text-ridley-blue" />
              {siteConfig.social.tiktok.handle}
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
