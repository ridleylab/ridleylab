import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { footerLinks } from "@/config/navigation";
import { InstagramIcon, TikTokIcon } from "@/components/ui/social-icons";

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 lg:py-20 mt-auto border-t border-gray-800">
      <div className="ridley-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="block relative h-10 w-36 mb-6">
              <Image
                src={siteConfig.brandAssets.logo}
                alt={`${siteConfig.name} Logo`}
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="144px"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Platform Pelatihan AI Social Media Marketing. Kami membantu bisnis
              jasa membangun sistem konten dan alur konversi otomatis berbasis
              Artificial Intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${siteConfig.name}`}
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-ridley-blue transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${siteConfig.name}`}
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-ridley-blue transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.services.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.company.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6 tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-gray-500" />
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed block"
                >
                  {siteConfig.address.streetAddress}
                  <br />
                  {siteConfig.address.locality}, {siteConfig.address.regionShort}{" "}
                  {siteConfig.address.postalCode}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-gray-500" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-gray-500" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
