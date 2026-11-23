"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Folder,
  Tag,
  Image as ImageIcon,
  User,
  Settings,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

interface AdminSidebarProps {
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
}

export default function AdminSidebar({ userEmail, onSignOut }: AdminSidebarProps) {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const isOpen = openForPath === pathname;
  const setIsOpen = (open: boolean) => setOpenForPath(open ? pathname : null);

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

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-[#0B0B0B] text-white p-4 sticky top-0 z-40 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-black text-ridley-yellow tracking-wider">
            {siteConfig.name}
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
              {siteConfig.name}
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
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition group border ${
                  isActive ? "bg-white/10 backdrop-blur-md border-white/10 text-ridley-yellow shadow-lg" : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} className={`transition shrink-0 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/5">
            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Dokumentasi</p>
            {navDocs.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm font-semibold text-gray-300 hover:text-white transition group"
                >
                  <Icon size={20} className="opacity-60 group-hover:opacity-100 transition shrink-0" />
                  <span>{item.name}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">↗</span>
                </Link>
              );
            })}
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
