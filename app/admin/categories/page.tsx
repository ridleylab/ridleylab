import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Kelola Kategori - RIDLEY Admin",
};

export default async function AdminCategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
  } catch (error) {
    console.error("Prisma loading error in categories:", error);
  }

  async function createCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name || name.trim() === "") return;

    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    try {
      await prisma.category.create({
        data: { name: name.trim(), slug },
      });
    } catch (error) {
      console.error("Create category error:", error);
    }

    revalidatePath("/admin/categories");
  }

  return (
    <div className="space-y-8 text-black">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-medium text-black">Kelola Kategori</h1>
        <p className="text-sm text-gray-500 mt-1">
          Buat dan kelola kategori untuk pengorganisasian blog.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* ADD CATEGORY FORM */}
        <div className="lg:col-span-4 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-bold text-black text-base mb-4">Kategori Baru</h3>
          <form action={createCategory} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Nama Kategori
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="misal: Bisnis Digital"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-ridley-blue hover:bg-[#216694] text-white font-bold text-sm rounded-xl transition shadow-md shadow-ridley-blue/10 cursor-pointer disabled:cursor-not-allowed"
            >
              Tambah Kategori
            </button>
          </form>
        </div>

        {/* LIST TABLE */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-white/40 backdrop-blur-md text-xs font-bold uppercase text-gray-400 border-b border-white/60 whitespace-nowrap">
                <tr>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Jumlah Post</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/60 text-black font-semibold whitespace-nowrap">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/60 transition">
                    <td className="px-6 py-4 font-bold">{cat.name}</td>
                    <td className="px-6 py-4 text-xs text-gray-400">{cat.slug}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">
                      {cat._count?.posts || 0} artikel
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-gray-400 font-medium">
                      Belum ada kategori. Gunakan form di samping untuk membuat kategori pertama.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
