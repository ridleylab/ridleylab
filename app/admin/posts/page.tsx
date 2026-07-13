import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Kelola Artikel - RIDLEY Admin",
};

export default async function AdminPostsPage() {
  const posts = await getAllPosts(true); // Include drafts

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-black">Kelola Artikel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Lihat, edit, dan atur postingan blog Anda.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-ridley-blue text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#216694] transition shadow-md shadow-ridley-blue/20 whitespace-nowrap shrink-0"
        >
          + Artikel Baru
        </Link>
      </div>

      {/* ARTICLE TABLE LIST */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-white/40 backdrop-blur-md text-xs font-bold uppercase text-gray-400 border-b border-white/60 whitespace-nowrap">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Membaca</th>
                <th className="px-6 py-4">Tanggal Rilis</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 text-black font-semibold whitespace-nowrap">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-white/60 transition">
                  <td className="px-6 py-4 max-w-sm">
                    <p className="font-bold truncate text-black">{post.title}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{post.description}</p>
                  </td>
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
                  <td className="px-6 py-4 text-xs text-gray-500">{post.readingTime}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3 text-xs">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-black font-bold transition"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="text-ridley-blue hover:underline font-bold transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                    Belum ada artikel. Klik tombol &quot;+ Artikel Baru&quot; untuk membuat postingan pertama Anda.
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
