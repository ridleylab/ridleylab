import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { footerLinks } from "@/config/navigation";
import { InstagramIcon, TikTokIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
      <Container size="xl" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* BRAND COLUMN */}
          <div className="sm:col-span-2 lg:col-span-3 lg:pr-4">
            <Link href="/" className="block relative h-9 w-32 mb-5">
              <Image
                src={siteConfig.brandAssets.logo}
                alt={`${siteConfig.name} Logo`}
                fill
                className="object-contain object-left dark:invert"
                sizes="128px"
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6 max-w-xs">
              Platform Pelatihan AI Social Media Marketing untuk bisnis jasa.
              Bangun sistem konten, SOP tim, dan alur closing terukur.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${siteConfig.name}`}
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${siteConfig.name}`}
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-100 mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LOKASI */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-100 mb-5">
              Lokasi Layanan
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.locations.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-100 mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-100 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="shrink-0 mt-0.5 text-zinc-500 dark:text-zinc-400"
                />
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors leading-relaxed block"
                >
                  {siteConfig.address.streetAddress}
                  <br />
                  {siteConfig.address.locality}, {siteConfig.address.regionShort}{" "}
                  {siteConfig.address.postalCode}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="shrink-0 text-zinc-500 dark:text-zinc-400"
                />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="shrink-0 text-zinc-500 dark:text-zinc-400"
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
