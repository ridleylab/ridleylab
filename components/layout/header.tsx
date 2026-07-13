"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Admin routes should hide the main header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  const isDropdownActive = (dropdown?: { path: string }[]) => {
    return dropdown?.some((item) => isActive(item.path));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      dropdown: [
        { name: "Offline Mentoring", path: "/services/offline-mentoring" },
        { name: "Online Course", path: "/services/online-course" },
      ]
    },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header
      id="ridleyHeader"
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-black/6 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="ridley-container">
        <div className="flex items-center justify-between py-4 lg:py-5">
          <Link href="/" className="relative h-9 w-28 lg:h-10 lg:w-32">
            <Image
              src="/assets/images/header-logo.png"
              alt="RIDLEY Logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 128px"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className={`flex items-center gap-1 transition py-1 ${isDropdownActive(link.dropdown) ? "text-ridley-blue" : "text-black hover:text-ridley-blue"}`}>
                      {link.name}
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 pt-4 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-xl py-3 w-48 flex flex-col">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.path}
                            className={`px-5 py-2 transition hover:bg-gray-50 ${isActive(subLink.path) ? "text-ridley-blue" : "text-black hover:text-ridley-blue"}`}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.path!}
                    className={`transition relative py-1 ${
                      isActive(link.path!) ? "text-ridley-blue after:w-full" : "text-black hover:text-ridley-blue"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="https://wa.me/6281210004453"
              target="_blank"
              rel="noopener noreferrer"
              className="ridley-btn--nav hidden sm:flex"
            >
              Konsultasi
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-black hover:text-ridley-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-200">
          <nav className="flex flex-col gap-2 text-base font-bold">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-gray-50 last:border-0">
                {link.dropdown ? (
                  <>
                    <button 
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className={`flex items-center justify-between py-3 transition ${isDropdownActive(link.dropdown) ? "text-ridley-blue" : "text-black"}`}
                    >
                      {link.name}
                      <ChevronDown size={20} className={`transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isMobileServicesOpen && (
                      <div className="flex flex-col pl-4 pb-2 gap-1 animate-in slide-in-from-top-2">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.path}
                            className={`py-2 transition text-sm font-semibold ${isActive(subLink.path) ? "text-ridley-blue" : "text-gray-600 hover:text-ridley-blue"}`}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.path!}
                    className={`transition block py-3 ${
                      isActive(link.path!) ? "text-ridley-blue" : "text-black hover:text-ridley-blue"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <a
            href="https://wa.me/6281210004453"
            target="_blank"
            rel="noopener noreferrer"
            className="ridley-btn--nav justify-center mt-2"
          >
            Konsultasi Sekarang
          </a>
        </div>
      )}
    </header>
  );
}
