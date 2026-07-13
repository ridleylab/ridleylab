"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface AdminSidebarProps {
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
}

export default function AdminSidebar({ userEmail, onSignOut }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "/assets/images/admin/dashboard.svg" },
    { name: "Posts", href: "/admin/posts", icon: "/assets/images/admin/posts.svg" },
    { name: "Categories", href: "/admin/categories", icon: "/assets/images/admin/categories.svg" },
    { name: "Tags", href: "/admin/tags", icon: "/assets/images/admin/tags.svg" },
    { name: "Media", href: "/admin/media", icon: "/assets/images/admin/media.svg" },
    { name: "Profile", href: "/admin/profile", icon: "/assets/images/admin/profile.svg" },
    { name: "Settings", href: "/admin/settings", icon: "/assets/images/admin/settings.svg" },
  ];

  const navDocs = [
    { name: "Panduan", href: "/admin/docs/panduan", icon: "/assets/images/admin/panduan.svg" },
    { name: "List Topik", href: "/admin/docs/topik", icon: "/assets/images/admin/list-topik.svg" },
  ];

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-[#0B0B0B] text-white p-4 sticky top-0 z-40 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-black text-ridley-yellow tracking-wider">
            RIDLEY
          </span>
          <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/70">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0B0B0B] text-white flex flex-col shrink-0 border-r border-white/5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND LOGO (Hidden on mobile since top bar has it) */}
        <div className="hidden lg:block p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black text-ridley-yellow tracking-wider">
              RIDLEY
            </span>
            <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/70">
              Admin
            </span>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition group border ${
                  isActive ? "bg-white/10 backdrop-blur-md border-white/10 text-ridley-yellow shadow-lg" : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <img src={item.icon} alt={item.name} className={`w-5 h-5 transition ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/5">
            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Dokumentasi</p>
            {navDocs.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm font-semibold text-gray-300 hover:text-white transition group"
              >
                <img src={item.icon} alt={item.name} className="w-5 h-5 opacity-60 group-hover:opacity-100 transition" />
                <span>{item.name}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">↗</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* USER PROFILE INFO & LOGOUT */}
        <div className="p-4 border-t border-white/5">
          <div className="px-4 py-3 mb-2">
            <p className="text-xs text-gray-400 font-medium">Logged in as</p>
            <p className="text-sm font-bold text-white truncate">
              {userEmail}
            </p>
          </div>
          <form
            action={onSignOut}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#C0392B] hover:bg-[#A93226] text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:cursor-not-allowed"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
