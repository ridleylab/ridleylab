import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Edit3,
  ExternalLink,
  FileEdit,
  FileText,
  Folder,
  Image as ImageIcon,
  Lightbulb,
  Plus,
  Settings,
  Tag,
} from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Dashboard Overview - ${siteConfig.name} Admin`,
};

export default async function AdminDashboardPage() {
  let totalPosts = 0;
  let publishedPosts = 0;
  let draftPosts = 0;
  let categoriesCount = 0;
  let tagsCount = 0;
  let mediaCount = 0;
  let recentPosts: Array<{
    id: string;
    slug: string;
    title: string;
    draft: boolean;
    publishedAt: Date | null;
    updatedAt: Date;
    category: { name: string } | null;
  }> = [];

  try {
    const [
      allCount,
      pubCount,
      dftCount,
      catCount,
      tagCount,
      medCount,
      latest,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { draft: false } }),
      prisma.post.count({ where: { draft: true } }),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.media.count(),
      prisma.post.findMany({
        take: 6,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          draft: true,
          publishedAt: true,
          updatedAt: true,
          category: { select: { name: true } },
        },
      }),
    ]);

    totalPosts = allCount;
    publishedPosts = pubCount;
    draftPosts = dftCount;
    categoriesCount = catCount;
    tagsCount = tagCount;
    mediaCount = medCount;
    recentPosts = latest;
  } catch (error) {
    console.error("Dashboard Prisma query error:", error);
  }

  const stats = [
    { name: "Total Posts", value: totalPosts, href: "/admin/posts", icon: FileText },
    { name: "Published", value: publishedPosts, href: "/admin/posts?status=published", icon: CheckCircle2 },
    { name: "Drafts", value: draftPosts, href: "/admin/posts?status=draft", icon: FileEdit },
    { name: "Categories", value: categoriesCount, href: "/admin/categories", icon: Folder },
    { name: "Tags", value: tagsCount, href: "/admin/tags", icon: Tag },
    { name: "Media Assets", value: mediaCount, href: "/admin/media", icon: ImageIcon },
  ];

  const shortcuts = [
    {
      title: "Tulis Artikel AI",
      description: "Buat draf SEO lengkap dengan AI Brief Modal.",
      href: "/admin/posts/new",
      icon: Plus,
    },
    {
      title: "99 Ide Topik",
      description: "Pilih ide siap pakai & kirim 1-klik ke editor.",
      href: "/admin/docs/topik",
      icon: Lightbulb,
    },
    {
      title: "Upload Media",
      description: "Kelola aset cover dan gambar artikel.",
      href: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: "System & SEO",
      description: "Cek config global, env integrasi, dan sitemap.",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Ringkasan konten, taksonomi, media, dan aktivitas CMS{" "}
            {siteConfig.name}.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 px-4 py-2.5 text-sm font-semibold transition-colors w-full sm:w-auto"
        >
          <Plus size={16} />
          <span>Buat Artikel Baru</span>
        </Link>
      </div>

      {/* 6 Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.name}
                </span>
                <Icon
                  size={16}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shortcuts.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 hover:border-zinc-950 dark:hover:border-zinc-400 transition-colors flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-950 dark:text-zinc-100 shrink-0">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 group-hover:underline">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Posts Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-semibold text-base text-zinc-950 dark:text-zinc-50">
            Artikel Terbaru Diperbarui
          </h2>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
          >
            <span>Semua Artikel</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-3.5">Judul</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Diperbarui</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-zinc-950 dark:text-zinc-100 max-w-sm truncate">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                    {post.category?.name || "General"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        post.draft
                          ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900"
                      }`}
                    >
                      {post.draft ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {new Date(post.updatedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3 text-xs font-semibold">
                      {!post.draft && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                        >
                          <ExternalLink size={12} />
                          <span>Preview</span>
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="inline-flex items-center gap-1 text-zinc-950 dark:text-zinc-100 hover:underline"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {recentPosts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    Belum ada artikel. Mulai buat artikel pertama Anda sekarang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
