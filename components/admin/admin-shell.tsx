"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import AdminSidebar, { type AdminUserInfo } from "./admin-sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";

interface AdminShellProps {
  children: ReactNode;
  user: AdminUserInfo;
  onSignOut: () => Promise<void>;
}

export default function AdminShell({
  children,
  user,
  onSignOut,
}: AdminShellProps) {
  const pathname = usePathname() || "/admin";
  const [mobileOpenForPath, setMobileOpenForPath] = useState<string | null>(
    null
  );
  const mobileOpen = mobileOpenForPath === pathname;

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpenForPath(null)}
          user={user}
          onSignOut={onSignOut}
        />

        <div className="min-h-screen flex flex-col lg:pl-16">
          {/* Mobile-only Compact Header */}
          <header className="lg:hidden sticky top-0 z-30 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpenForPath(pathname)}
                aria-label="Buka menu sidebar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer shrink-0"
              >
                <Menu size={18} />
              </button>

              <Link href="/admin" className="flex items-center gap-2 min-w-0">
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
              </Link>
            </div>
          </header>

          {/* Main Admin Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
