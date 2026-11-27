"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronsUpDown,
  ExternalLink,
  FileText,
  Folder,
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Moon,
  Settings,
  Sun,
  Tag,
  User,
  X,
} from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface AdminUserInfo {
  email: string;
  name: string;
  role: string;
  avatarUrl?: string | null;
}

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  user: AdminUserInfo;
  onSignOut: () => Promise<void>;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Tags", href: "/admin/tags", icon: Tag },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
];

const navDocs = [
  { name: "Panduan", href: "/admin/docs/panduan", icon: BookOpen },
  { name: "List Topik", href: "/admin/docs/topik", icon: Lightbulb },
];

function getInitials(name: string, email: string): string {
  const source = name.trim() || email.trim();
  if (!source) return "RL";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export default function AdminSidebar({
  mobileOpen,
  onCloseMobile,
  user,
  onSignOut,
}: AdminSidebarProps) {
  const pathname = usePathname() || "/admin";
  const { toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [profileMenuForPath, setProfileMenuForPath] = useState<string | null>(
    null
  );
  const profileMenuOpen = profileMenuForPath === pathname;
  const isExpanded = isHovered || profileMenuOpen;
  const desktopCollapsed = !isExpanded;
  const profileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileMenuOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target as Node)
      ) {
        setProfileMenuForPath(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuForPath(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMenuOpen]);

  const isActiveHref = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isAccountRoute =
    isActiveHref("/admin/profile") || isActiveHref("/admin/settings");
  const initials = getInitials(user.name, user.email);

  return (
    <>
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-[width,transform,box-shadow] duration-200 ease-out w-60",
          isExpanded
            ? "lg:w-60 lg:shadow-2xl lg:shadow-black/15 dark:lg:shadow-black/60"
            : "lg:w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center shrink-0 overflow-hidden",
            desktopCollapsed
              ? "lg:justify-center lg:px-2 px-4 justify-between"
              : "px-4 justify-between"
          )}
        >
          <Link
            href="/admin"
            onClick={onCloseMobile}
            className="flex items-center gap-2 min-w-0"
            title={`${siteConfig.name} Admin`}
          >
            <span
              className={cn(
                "relative w-7 h-7 shrink-0",
                desktopCollapsed ? "hidden lg:inline-flex" : "hidden"
              )}
            >
              <Image
                src={siteConfig.brandAssets.icon}
                alt={siteConfig.name}
                fill
                className="object-contain dark:invert"
                sizes="28px"
              />
            </span>

            <span
              className={cn(
                "items-center gap-2",
                desktopCollapsed ? "flex lg:hidden" : "flex"
              )}
            >
              <span className="relative h-6 w-24 shrink-0">
                <Image
                  src={siteConfig.brandAssets.logo}
                  alt={`${siteConfig.name} Logo`}
                  fill
                  className="object-contain object-left dark:invert"
                  sizes="96px"
                />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                CMS
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Tutup menu sidebar"
            className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Navigasi Admin"
          className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden"
        >
          {navItems.map((item) => {
            const active = isActiveHref(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={desktopCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 h-10 rounded-xl px-[15px] text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span
                  className={cn(
                    "truncate transition-opacity duration-150",
                    desktopCollapsed
                      ? "lg:opacity-0 lg:pointer-events-none"
                      : "opacity-100"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            <p
              className={cn(
                "px-[15px] text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 whitespace-nowrap transition-opacity duration-150",
                desktopCollapsed
                  ? "lg:opacity-0 lg:h-0 lg:pb-0 lg:overflow-hidden pb-1"
                  : "opacity-100 pb-1"
              )}
            >
              Dokumentasi
            </p>
            {navDocs.map((item) => {
              const active = isActiveHref(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={desktopCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 h-10 rounded-xl px-[15px] text-sm font-medium whitespace-nowrap transition-colors",
                    active
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span
                    className={cn(
                      "flex-1 truncate flex items-center justify-between gap-2 transition-opacity duration-150",
                      desktopCollapsed
                        ? "lg:opacity-0 lg:pointer-events-none"
                        : "opacity-100"
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                    <ExternalLink size={12} className="opacity-50 shrink-0" />
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom-Left ChatGPT-Style Profile Trigger & Popover */}
        <div
          ref={profileContainerRef}
          className="relative p-2 border-t border-zinc-200 dark:border-zinc-800 shrink-0"
        >
          {profileMenuOpen && (
            <div
              role="menu"
              aria-label="Menu akun admin"
              className="absolute bottom-full left-2 right-2 mb-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/15 dark:shadow-black/60 p-1.5 z-50"
            >
              {/* Popover User Header */}
              <div className="flex items-center gap-2.5 px-2 pt-1.5 pb-2 mb-1 border-b border-zinc-200 dark:border-zinc-800">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
                  />
                ) : (
                  <span className="h-8 w-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center text-xs font-semibold shrink-0">
                    {initials}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Account Links, Public Site & Theme Toggle */}
              <div className="space-y-0.5">
                <Link
                  href="/admin/profile"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuForPath(null);
                    onCloseMobile();
                  }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors",
                    isActiveHref("/admin/profile")
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  <User size={15} className="shrink-0" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/admin/settings"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuForPath(null);
                    onCloseMobile();
                  }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors",
                    isActiveHref("/admin/settings")
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  <Settings size={15} className="shrink-0" />
                  <span>Settings</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuForPath(null);
                    onCloseMobile();
                  }}
                  className="flex items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Globe size={15} className="shrink-0" />
                    <span>Lihat Situs</span>
                  </span>
                  <ExternalLink size={12} className="opacity-60 shrink-0" />
                </Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Sun
                    size={15}
                    className="hidden dark:block shrink-0"
                    aria-hidden="true"
                  />
                  <Moon
                    size={15}
                    className="block dark:hidden shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hidden dark:inline flex-1 text-left">
                    Mode Terang
                  </span>
                  <span className="inline dark:hidden flex-1 text-left">
                    Mode Gelap
                  </span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    <span className="hidden dark:inline">Dark</span>
                    <span className="inline dark:hidden">Light</span>
                  </span>
                </button>
              </div>

              <div className="my-1 border-t border-zinc-200 dark:border-zinc-800" />

              {/* Logout */}
              <form action={onSignOut}>
                <button
                  type="submit"
                  role="menuitem"
                  className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50 dark:hover:text-red-300 transition-colors cursor-pointer"
                >
                  <LogOut size={15} className="shrink-0" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          )}

          {/* Profile Trigger Button */}
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
            title={desktopCollapsed ? `${user.name} (${user.role})` : undefined}
            onClick={() =>
              setProfileMenuForPath(profileMenuOpen ? null : pathname)
            }
            className={cn(
              "w-full flex items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors cursor-pointer overflow-hidden",
              profileMenuOpen || isAccountRoute
                ? "bg-zinc-100 dark:bg-zinc-900"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
            )}
          >
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
              />
            ) : (
              <span className="h-8 w-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center text-xs font-semibold shrink-0">
                {initials}
              </span>
            )}

            <div
              className={cn(
                "min-w-0 flex-1 transition-opacity duration-150",
                desktopCollapsed
                  ? "lg:opacity-0 lg:pointer-events-none"
                  : "opacity-100"
              )}
            >
              <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 truncate leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate leading-tight mt-0.5">
                {user.role}
              </p>
            </div>

            <ChevronsUpDown
              size={14}
              className={cn(
                "text-zinc-400 shrink-0 transition-opacity duration-150",
                desktopCollapsed ? "lg:opacity-0" : "opacity-100"
              )}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
