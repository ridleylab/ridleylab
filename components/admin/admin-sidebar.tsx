"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Folder,
  Image as ImageIcon,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  Tag,
  User,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Tags", href: "/admin/tags", icon: Tag },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const navDocs = [
  { name: "Panduan", href: "/admin/docs/panduan", icon: BookOpen },
  { name: "List Topik", href: "/admin/docs/topik", icon: Lightbulb },
];

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  userEmail,
  onSignOut,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActiveHref = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-200",
          collapsed ? "lg:w-16" : "lg:w-60",
          "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center shrink-0",
            collapsed ? "lg:justify-center lg:px-2 px-4 justify-between" : "px-4 justify-between"
          )}
        >
          <Link
            href="/admin"
            onClick={onCloseMobile}
            className="flex items-center gap-2 min-w-0"
            title={`${siteConfig.name} Admin`}
          >
            {collapsed ? (
              <span className="hidden lg:inline-flex relative w-7 h-7 shrink-0">
                <Image
                  src={siteConfig.brandAssets.icon}
                  alt={siteConfig.name}
                  fill
                  className="object-contain dark:invert"
                  sizes="28px"
                />
              </span>
            ) : null}

            <span
              className={cn(
                "flex items-center gap-2",
                collapsed && "lg:hidden"
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
            className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Navigasi Admin"
          className="flex-1 p-2.5 space-y-1 overflow-y-auto"
        >
          {navItems.map((item) => {
            const active = isActiveHref(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  collapsed && "lg:justify-center lg:px-0",
                  active
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className={cn("truncate", collapsed && "lg:hidden")}>
                  {item.name}
                </span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            <p
              className={cn(
                "px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500",
                collapsed && "lg:hidden"
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
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    collapsed && "lg:justify-center lg:px-0",
                    active
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span
                    className={cn(
                      "flex-1 truncate flex items-center justify-between",
                      collapsed && "lg:hidden"
                    )}
                  >
                    <span>{item.name}</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Sign Out */}
        <div className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 space-y-2 shrink-0">
          {userEmail && (
            <div
              className={cn(
                "px-3 py-1.5",
                collapsed && "lg:hidden"
              )}
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                Signed in as
              </p>
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {userEmail}
              </p>
            </div>
          )}

          <form action={onSignOut}>
            <button
              type="submit"
              title={collapsed ? "Sign Out" : undefined}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-red-50 hover:text-red-700 hover:border-red-200 dark:hover:bg-red-950/50 dark:hover:text-red-300 dark:hover:border-red-900 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer",
                collapsed && "lg:px-0"
              )}
            >
              <LogOut size={15} className="shrink-0" />
              <span className={cn(collapsed && "lg:hidden")}>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
