"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { headerNavLinks } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [mobileMenuState, setMobileMenuState] = useState<{
    open: boolean;
    forPath: string;
    servicesOpen: boolean;
  }>({ open: false, forPath: "", servicesOpen: false });

  const isMobileMenuOpen =
    mobileMenuState.open && mobileMenuState.forPath === pathname;
  const isMobileServicesOpen =
    mobileMenuState.servicesOpen && mobileMenuState.forPath === pathname;

  const setIsMobileMenuOpen = (open: boolean) =>
    setMobileMenuState((prev) => ({
      open,
      forPath: pathname,
      servicesOpen: open ? prev.servicesOpen : false,
    }));

  const setIsMobileServicesOpen = (servicesOpen: boolean) =>
    setMobileMenuState((prev) => ({
      ...prev,
      forPath: pathname,
      servicesOpen,
    }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/services") return pathname === "/services";
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const isServicesActive = Boolean(pathname?.startsWith("/services"));
  const whatsappUrl = getWhatsAppUrl();

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80"
          : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link
            href="/"
            className="relative h-8 w-28 sm:h-9 sm:w-32 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-md"
          >
            <Image
              src={siteConfig.brandAssets.logo}
              alt={`${siteConfig.name} Logo`}
              fill
              priority
              className="object-contain object-left dark:invert"
              sizes="(max-width: 768px) 112px, 128px"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
          >
            {headerNavLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 py-2 transition-colors cursor-pointer",
                        isServicesActive
                          ? "text-zinc-950 dark:text-white font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={15}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    <div className="absolute top-full left-0 pt-2 hidden group-hover:block group-focus-within:block w-72">
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl p-2 flex flex-col gap-0.5">
                        {link.dropdown.map((subLink) => {
                          const active = isLinkActive(subLink.path);
                          return (
                            <Link
                              key={subLink.path}
                              href={subLink.path}
                              className={cn(
                                "rounded-xl px-3.5 py-2.5 transition-colors flex flex-col gap-0.5",
                                active
                                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 hover:text-zinc-950 dark:hover:text-white"
                              )}
                            >
                              <span className="text-sm font-semibold">
                                {subLink.name}
                              </span>
                              {subLink.description && (
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                  {subLink.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.path!}
                    className={cn(
                      "py-2 transition-colors relative",
                      isLinkActive(link.path!)
                        ? "text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <ButtonLink
              href={whatsappUrl}
              external
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <MessageCircle size={15} />
              <span>Konsultasi</span>
            </ButtonLink>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-5 py-5 shadow-xl">
          <nav
            aria-label="Navigasi mobile"
            className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-900 text-sm font-medium"
          >
            {headerNavLinks.map((link) => (
              <div key={link.name} className="py-1">
                {link.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setIsMobileServicesOpen(!isMobileServicesOpen)
                      }
                      aria-expanded={isMobileServicesOpen}
                      className={cn(
                        "w-full flex items-center justify-between py-3 text-left transition-colors cursor-pointer",
                        isServicesActive
                          ? "text-zinc-950 dark:text-white font-semibold"
                          : "text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={17}
                        className={cn(
                          "transition-transform duration-200",
                          isMobileServicesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isMobileServicesOpen && (
                      <div className="flex flex-col gap-1 pl-3 pb-3 border-l border-zinc-200 dark:border-zinc-800 ml-1">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.path}
                            href={subLink.path}
                            className={cn(
                              "rounded-lg px-3 py-2 transition-colors",
                              isLinkActive(subLink.path)
                                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                            )}
                          >
                            <div className="text-sm font-medium">{subLink.name}</div>
                            {subLink.description && (
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {subLink.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.path!}
                    className={cn(
                      "block py-3 transition-colors",
                      isLinkActive(link.path!)
                        ? "text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <ButtonLink
              href={whatsappUrl}
              external
              variant="primary"
              fullWidth
            >
              <MessageCircle size={16} />
              <span>Konsultasi Sekarang</span>
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
