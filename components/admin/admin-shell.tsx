"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import {
  ChevronRight,
  ExternalLink,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from "lucide-react";
import AdminSidebar from "./admin-sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const COLLAPSE_STORAGE_KEY = "ridleylab-admin-sidebar-collapsed";
const collapseListeners = new Set<() => void>();

function readCollapsedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COLLAPSE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getCollapsedServerSnapshot(): boolean {
  return false;
}

function subscribeCollapsed(callback: () => void): () => void {
  collapseListeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === COLLAPSE_STORAGE_KEY) callback();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    collapseListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function setSidebarCollapsed(next: boolean): void {
  try {
    window.localStorage.setItem(COLLAPSE_STORAGE_KEY, next ? "1" : "0");
  } catch {
    // Ignore storage quota errors
  }
  for (const listener of collapseListeners) {
    listener();
  }
}

const routeLabels: Record<string, string> = {
  admin: "Dashboard",
  posts: "Artikel",
  new: "Buat Baru",
  categories: "Kategori",
  tags: "Tag",
  media: "Media Gallery",
  profile: "Profil",
  settings: "System & SEO",
  docs: "Dokumentasi",
  panduan: "Panduan",
  topik: "List Topik",
};

interface AdminShellProps {
  children: ReactNode;
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
}

export default function AdminShell({
  children,
  userEmail,
  onSignOut,
}: AdminShellProps) {
  const pathname = usePathname() || "/admin";
  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    readCollapsedSnapshot,
    getCollapsedServerSnapshot
  );

  const [mobileOpenForPath, setMobileOpenForPath] = useState<string | null>(
    null
  );
  const mobileOpen = mobileOpenForPath === pathname;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}`;
    const label =
      routeLabels[seg] ||
      (idx > 1 && segments[1] === "posts" ? "Edit Artikel" : seg);
    return { label, href };
  });

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors">
        <AdminSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpenForPath(null)}
          userEmail={userEmail}
          onSignOut={onSignOut}
        />

        <div
          className={cn(
            "min-h-screen flex flex-col transition-all duration-200",
            collapsed ? "lg:pl-16" : "lg:pl-60"
          )}
        >
          {/* Sticky Top Bar */}
          <header className="sticky top-0 z-30 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpenForPath(pathname)}
                aria-label="Buka menu sidebar"
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <Menu size={17} />
              </button>

              <button
                type="button"
                onClick={() => setSidebarCollapsed(!collapsed)}
                aria-label={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
                title={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
                className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
              >
                {collapsed ? (
                  <PanelLeftOpen size={17} />
                ) : (
                  <PanelLeftClose size={17} />
                )}
              </button>

              <nav
                aria-label="Breadcrumb admin"
                className="flex items-center gap-1.5 text-xs sm:text-sm min-w-0"
              >
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <span
                      key={crumb.href}
                      className="inline-flex items-center gap-1.5 min-w-0"
                    >
                      {idx > 0 && (
                        <ChevronRight
                          size={14}
                          className="text-zinc-400 shrink-0"
                        />
                      )}
                      {isLast ? (
                        <span className="font-semibold text-zinc-950 dark:text-zinc-50 truncate">
                          {crumb.label}
                        </span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors truncate"
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </span>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <span>Lihat Situs</span>
                <ExternalLink size={12} />
              </Link>

              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-semibold transition-colors"
              >
                <Plus size={14} />
                <span className="hidden xs:inline sm:inline">Artikel Baru</span>
              </Link>

              <ThemeToggle />
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
