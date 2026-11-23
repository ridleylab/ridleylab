"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  deletePost,
  togglePostStatusAction,
} from "@/app/(admin)/admin/posts/actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export interface AdminPostRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  draft: boolean;
  readingTime: string | null;
  publishedAt: string | null;
  updatedAt: string;
  categoryId: string | null;
  categoryName: string;
}

interface PostsManagerProps {
  initialPosts: AdminPostRow[];
  categories: Array<{ id: string; name: string }>;
  initialStatusFilter?: "all" | "published" | "draft";
}

const PAGE_SIZE = 10;

export default function PostsManager({
  initialPosts,
  categories,
  initialStatusFilter = "all",
}: PostsManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">(
    initialStatusFilter
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPostRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialPosts.filter((post) => {
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && !post.draft) ||
        (statusFilter === "draft" && post.draft);
      const matchCategory =
        categoryFilter === "all" || post.categoryId === categoryFilter;
      return matchQuery && matchStatus && matchCategory;
    });
  }, [initialPosts, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handleToggleStatus = async (post: AdminPostRow) => {
    setTogglingId(post.id);
    const nextDraft = !post.draft;
    const res = await togglePostStatusAction(post.id, nextDraft);
    setTogglingId(null);

    if (res.success) {
      toast({
        title: nextDraft ? "Artikel dipindahkan ke Draft" : "Artikel dipublikasikan",
        description: post.title,
        variant: "success",
      });
      router.refresh();
    } else {
      toast({
        title: "Gagal mengubah status",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deletePost(deleteTarget.id);
    setIsDeleting(false);

    if (res.success) {
      toast({
        title: "Artikel berhasil dihapus",
        description: deleteTarget.title,
        variant: "success",
      });
      setDeleteTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal menghapus artikel",
        description: res.error,
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Kelola Artikel
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Cari, filter status publikasi, ubah draft/publish cepat, atau edit artikel.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 px-4 py-2.5 text-sm font-semibold transition-colors w-full sm:w-auto shrink-0"
        >
          <Plus size={16} />
          <span>Artikel Baru</span>
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari judul, deskripsi, atau slug..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-1">
            {(
              [
                { key: "all", label: "Semua" },
                { key: "published", label: "Published" },
                { key: "draft", label: "Draft" },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setStatusFilter(item.key);
                  setPage(1);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  statusFilter === item.key
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <select
            aria-label="Filter kategori"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
              <tr>
                <th className="px-6 py-3.5">Artikel</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Baca</th>
                <th className="px-6 py-3.5">Diperbarui</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                >
                  <td className="px-6 py-4 max-w-md">
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100 truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                      /blog/{post.slug}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    {post.categoryName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      disabled={togglingId === post.id}
                      onClick={() => handleToggleStatus(post)}
                      title="Klik untuk ubah status Publish / Draft"
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold transition-opacity cursor-pointer disabled:opacity-50",
                        post.draft
                          ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900"
                      )}
                    >
                      {togglingId === post.id
                        ? "Mengubah..."
                        : post.draft
                        ? "Draft"
                        : "Published"}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {post.readingTime || "1 min read"}
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
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      >
                        <ExternalLink size={12} />
                        <span>Preview</span>
                      </Link>
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="inline-flex items-center gap-1 text-zinc-950 dark:text-zinc-100 hover:underline"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(post)}
                        aria-label={`Hapus ${post.title}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedPosts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-14 text-center text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    Tidak ada artikel yang sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              Menampilkan {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filteredPosts.length)} dari{" "}
              {filteredPosts.length} artikel
            </span>
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        title="Hapus Artikel?"
        description="Tindakan ini permanen dan artikel tidak bisa dipulihkan."
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
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus Permanen"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Apakah Anda yakin ingin menghapus artikel{" "}
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            &ldquo;{deleteTarget?.title}&rdquo;
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
}
