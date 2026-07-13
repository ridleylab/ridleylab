import { prisma } from "@/lib/db/prisma";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Overview - RIDLEY Admin",
};

export default async function AdminDashboardPage() {
  // Fetch stats from local MDX and Prisma database
  const posts = await getAllPosts(true); // Include drafts
  const postsCount = posts.length;
  const draftsCount = posts.filter((p) => p.draft).length;

  let categoriesCount = 0;
  let tagsCount = 0;
  let mediaCount = 0;

  try {
    categoriesCount = await prisma.category.count();
    tagsCount = await prisma.tag.count();
    mediaCount = await prisma.media.count();
  } catch (error) {
    console.error("Prisma count error (database might not be running yet):", error);
  }

  const stats = [
    { name: "Total Posts", value: postsCount, description: "Artikel", icon: "/assets/images/admin/total-posts.svg" },
    { name: "Draft Posts", value: draftsCount, description: "Artikel belum tayang", icon: "/assets/images/admin/draft-posts.svg" },
    { name: "Categories", value: categoriesCount, description: "Total Kategori", icon: "/assets/images/admin/categories2.svg" },
    { name: "Media Assets", value: mediaCount, description: "File media gallery", icon: "/assets/images/admin/media2.svg" },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-medium text-black">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Selamat datang di panel admin RIDLEY. Kelola konten dan media situs Anda.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:shadow-md transition"
          >
            <span className="bg-white/50 w-14 h-14 rounded-xl flex items-center justify-center border border-white/50 p-3.5">
              <img src={stat.icon} alt={stat.name} className="w-full h-full object-contain" />
            </span>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                {stat.name}
              </p>
              <h3 className="text-2xl font-medium text-black mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT POSTS TABLE */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/50 flex items-center justify-between">
          <h3 className="font-bold text-black text-lg">Daftar Artikel Terbaru</h3>
          <Link
            href="/admin/posts"
            className="text-xs font-bold text-ridley-blue hover:underline"
          >
            Semua Artikel &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-white/40 backdrop-blur-md text-xs font-bold uppercase text-gray-400 border-b border-white/60">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal Rilis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 text-black font-semibold">
              {posts.slice(0, 5).map((post) => (
                <tr key={post.slug} className="hover:bg-white/60 transition">
                  <td className="px-6 py-4 font-bold">{post.title}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${post.draft
                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        }`}
                    >
                      {post.draft ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 font-medium">
                    Belum ada artikel. Mulai buat sekarang.
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
