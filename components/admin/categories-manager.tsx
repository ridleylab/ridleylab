"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/(admin)/admin/categories/actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export interface AdminCategoryRow {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

interface CategoriesManagerProps {
  initialCategories: AdminCategoryRow[];
}

export default function CategoriesManager({
  initialCategories,
}: CategoriesManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [newName, setNewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");

  const [editTarget, setEditTarget] = useState<AdminCategoryRow | null>(null);
  const [editName, setEditName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AdminCategoryRow | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialCategories;
    return initialCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [initialCategories, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setIsCreating(true);
    const res = await createCategoryAction(newName);
    setIsCreating(false);

    if (res.success) {
      toast({ title: "Kategori ditambahkan", variant: "success" });
      setNewName("");
      router.refresh();
    } else {
      toast({
        title: "Gagal menambah kategori",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget || !editName.trim()) return;
    setIsUpdating(true);
    const res = await updateCategoryAction(editTarget.id, editName);
    setIsUpdating(false);

    if (res.success) {
      toast({ title: "Kategori diperbarui", variant: "success" });
      setEditTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal memperbarui kategori",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteCategoryAction(deleteTarget.id);
    setIsDeleting(false);

    if (res.success) {
      toast({
        title: "Kategori dihapus",
        description: deleteTarget.name,
        variant: "success",
      });
      setDeleteTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal menghapus kategori",
        description: res.error,
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Kelola Kategori
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Tambah, ubah nama, atau hapus kategori pengelompokan artikel blog.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Create Form */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6">
          <h2 className="font-semibold text-base text-zinc-950 dark:text-zinc-50 mb-4">
            Kategori Baru
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label
                htmlFor="cat-new-name"
                className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
              >
                Nama Kategori
              </label>
              <input
                id="cat-new-name"
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Misal: AI Implementation"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isCreating}>
              <Plus size={15} />
              <span>{isCreating ? "Menyimpan..." : "Tambah Kategori"}</span>
            </Button>
          </form>
        </div>

        {/* Table Card */}
        <div className="lg:col-span-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative max-w-xs">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kategori..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                <tr>
                  <th className="px-6 py-3.5">Nama</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Artikel</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filtered.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-950 dark:text-zinc-100">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                      {cat.postCount} artikel
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditTarget(cat);
                            setEditName(cat.name);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <Edit3 size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(cat)}
                          aria-label={`Hapus ${cat.name}`}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 dark:hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      Belum ada kategori yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rename Modal */}
      <Modal
        open={Boolean(editTarget)}
        onClose={() => !isUpdating && setEditTarget(null)}
        title="Ubah Kategori"
        description="Slug URL akan ikut menyesuaikan nama kategori yang baru."
        size="sm"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUpdating}
              onClick={() => setEditTarget(null)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isUpdating}>
              {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        title="Hapus Kategori?"
        description="Artikel yang memakai kategori ini tidak terhapus, hanya dilepas relasi kategorinya."
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setDeleteTarget(null)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus Kategori"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Yakin ingin menghapus kategori{" "}
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            {deleteTarget?.name}
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
}
