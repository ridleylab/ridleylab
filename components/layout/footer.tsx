"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide main footer in admin views
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 lg:py-20 mt-auto border-t border-gray-800">
      <div className="ridley-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="block relative h-10 w-32 mb-6">
              <Image
                src="/assets/images/header-logo.png"
                alt="RIDLEY Logo"
                fill
                className="object-contain brightness-0 invert" 
                sizes="128px"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Platform Pelatihan AI Social Media Marketing. Kami membantu bisnis jasa membangun sistem konten dan alur konversi otomatis berbasis Artificial Intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/ridley.lab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-ridley-blue transition-colors">
                <div className="relative w-4 h-4">
                  <Image src="/assets/images/instagram-white.svg" alt="Instagram" fill />
                </div>
              </a>
              <a href="https://www.tiktok.com/@ridley.lab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-ridley-blue transition-colors">
                <div className="relative w-4 h-4">
                  <Image src="/assets/images/tiktok-white.svg" alt="TikTok" fill />
                </div>
              </a>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/services/offline-mentoring" className="hover:text-white transition-colors">
                  Offline Mentoring
                </Link>
              </li>
              <li>
                <Link href="/services/online-course" className="hover:text-white transition-colors">
                  Online Course
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-gray-500" />
                <a href="https://maps.app.goo.gl/9uK1Ceb6SmFtLFb29" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed block">
                  Kenaruhan RT 02 RW 17, Donokerto<br />
                  Turi, DIY 55551
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-gray-500" />
                <a href="https://wa.me/6281210004453" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +62 812-1000-4453
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-gray-500" />
                <a href="mailto:labridley@gmail.com" className="hover:text-white transition-colors">
                  labridley@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>
            © {new Date().getFullYear()} RIDLEY. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
