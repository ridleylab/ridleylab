"use client";

import type { Editor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HelpCircle, Lock, Plus, Sparkles, Trash2, Unlock } from "lucide-react";
import { deletePost, savePost } from "@/app/(admin)/admin/posts/actions";
import type { PostFaqItem } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import AiWriterModal from "./ai-writer-modal";
import MediaPickerModal, { type MediaAssetItem } from "./media-picker-modal";
import PostSeoSidebar, { type AuthorOption } from "./post-seo-sidebar";
import RichTextEditor from "./rich-text-editor";
import { cn } from "@/lib/utils";

interface PostEditorShellProps {
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  media: MediaAssetItem[];
  authors: AuthorOption[];
  defaultAuthorId?: string;
  defaultAuthorName?: string;
  initialTopic?: string;
  initialCategoryId?: string;
  initialPost?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    metaTitle: string | null;
    metaDescription: string | null;
    focusKeyword: string | null;
    ogImage: string | null;
    coverImage: string | null;
    content: string;
    draft: boolean;
    categoryId: string | null;
    authorId: string | null;
    authorName: string;
    tags: Array<{ tagId: string }>;
    faqs: PostFaqItem[];
  };
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditorShell({
  categories,
  tags,
  media,
  authors,
  defaultAuthorId = "",
  defaultAuthorName = siteConfig.founder.name,
  initialTopic = "",
  initialCategoryId = "",
  initialPost,
}: PostEditorShellProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [description, setDescription] = useState(
    initialPost?.description || ""
  );
  const [metaTitle, setMetaTitle] = useState(initialPost?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialPost?.metaDescription || ""
  );
  const [focusKeyword, setFocusKeyword] = useState(
    initialPost?.focusKeyword || ""
  );
  const [ogImage, setOgImage] = useState(initialPost?.ogImage || "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [draft, setDraft] = useState(initialPost?.draft ?? true);
  const [categoryId, setCategoryId] = useState(
    initialPost?.categoryId || initialCategoryId
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialPost?.tags.map((t) => t.tagId) || []
  );
  const [authorId, setAuthorId] = useState(
    initialPost?.authorId ?? (!initialPost ? defaultAuthorId : "")
  );
  const [authorName, setAuthorName] = useState(
    initialPost?.authorName || defaultAuthorName
  );
  const [faqs, setFaqs] = useState<PostFaqItem[]>(initialPost?.faqs || []);

  const [isSlugLocked, setIsSlugLocked] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isAiWriterOpen, setIsAiWriterOpen] = useState(
    Boolean(initialTopic) && !initialPost
  );
  const [mediaModalMode, setMediaModalMode] = useState<
    "cover" | "insert" | "og" | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);

  const handleTitleChange = (nextTitle: string) => {
    setTitle(nextTitle);
    if (isSlugLocked && !initialPost) {
      setSlug(toSlug(nextTitle));
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleAuthorIdChange = (nextId: string) => {
    setAuthorId(nextId);
    const selected = authors.find((a) => a.id === nextId);
    if (selected?.name?.trim()) {
      setAuthorName(selected.name.trim());
    }
  };

  const handleAddFaq = () => {
    if (faqs.length >= 15) {
      toast({
        title: "Maksimal 15 item FAQ per artikel",
        variant: "error",
      });
      return;
    }
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleUpdateFaq = (
    idx: number,
    field: "question" | "answer",
    val: string
  ) => {
    setFaqs((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item))
    );
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async (isDraftTarget: boolean) => {
    if (!title.trim()) {
      toast({
        title: "Judul wajib diisi",
        variant: "error",
      });
      return;
    }

    const nonEmptyFaqs = faqs
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question.length > 0 || item.answer.length > 0);

    const incompleteFaq = nonEmptyFaqs.find(
      (item) => item.question.length < 3 || item.answer.length < 3
    );
    if (incompleteFaq) {
      toast({
        title: "FAQ artikel belum lengkap",
        description:
          "Pastikan setiap baris FAQ punya pertanyaan & jawaban minimal 3 karakter, atau hapus baris yang tidak terpakai.",
        variant: "error",
      });
      return;
    }

    const activeSlug = slug.trim() || toSlug(title);
    setIsSaving(true);
    setDraft(isDraftTarget);

    const res = await savePost(initialPost?.id || null, {
      title: title.trim(),
      slug: activeSlug,
      description: description.trim(),
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      focusKeyword: focusKeyword.trim(),
      ogImage: ogImage.trim(),
      coverImage: coverImage.trim(),
      content,
      draft: isDraftTarget,
      categoryId: categoryId || null,
      tagIds: selectedTagIds,
      authorId: authorId || null,
      authorName: authorName.trim() || siteConfig.founder.name,
      faqs: nonEmptyFaqs,
    });

    setIsSaving(false);

    if (res.success) {
      toast({
        title: isDraftTarget
          ? "Draft artikel tersimpan"
          : "Artikel berhasil dipublikasikan",
        variant: "success",
      });
      router.push("/admin/posts");
      router.refresh();
    } else {
      toast({
        title: "Gagal menyimpan artikel",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!initialPost?.id) return;
    setIsDeleting(true);
    const res = await deletePost(initialPost.id);
    setIsDeleting(false);

    if (res.success) {
      toast({
        title: "Artikel dihapus",
        variant: "success",
      });
      setIsDeleteModalOpen(false);
      router.push("/admin/posts");
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: AI BANNER, TITLE/SLUG, EDITOR & FAQ BUILDER */}
        <div className="lg:col-span-8 space-y-5">
          {/* AI Auto-Pilot Brief Banner */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-900 text-zinc-50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                AI Auto-Pilot Writer
              </p>
              <h2 className="text-base sm:text-lg font-semibold mt-0.5">
                Generate Artikel SEO Mendalam (1.200+ Kata + FAQ)
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Masukkan topik, focus keyword, dan audiens untuk draf artikel &amp;
                FAQ terstruktur lengkap.
              </p>
            </div>
            <Button
              variant="inverted"
              size="md"
              onClick={() => setIsAiWriterOpen(true)}
              className="shrink-0"
            >
              <Sparkles size={15} />
              <span>Buka AI Brief</span>
            </Button>
          </div>

          {/* Title & Slug */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="post-title"
                  className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Judul Artikel
                </label>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    title.trim().length > 65
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-zinc-400"
                  )}
                >
                  {title.trim().length}/60 karakter
                </span>
              </div>
              <input
                id="post-title"
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Masukkan judul artikel yang menarik..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-base font-semibold text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="post-slug"
                  className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Slug URL
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugLocked(!isSlugLocked)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:underline cursor-pointer"
                >
                  {isSlugLocked ? (
                    <>
                      <Unlock size={12} />
                      <span>Edit Manual</span>
                    </>
                  ) : (
                    <>
                      <Lock size={12} />
                      <span>Kunci Slug</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
                <span className="px-3.5 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center select-none">
                  /blog/
                </span>
                <input
                  id="post-slug"
                  type="text"
                  required
                  value={slug}
                  disabled={isSlugLocked}
                  onChange={(e) => setSlug(toSlug(e.target.value))}
                  placeholder="slug-artikel-ini"
                  className="w-full px-3.5 py-2.5 bg-transparent font-mono text-xs sm:text-sm text-zinc-950 dark:text-zinc-100 disabled:text-zinc-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tiptap Rich Text Editor */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden min-h-[540px] flex flex-col">
            <RichTextEditor
              value={content}
              onChange={setContent}
              onOpenMediaGallery={() => setMediaModalMode("insert")}
              onEditorReady={setEditorInstance}
            />
          </div>

          {/* FAQ Article Schema Builder */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 inline-flex items-center gap-1.5">
                  <HelpCircle size={15} />
                  <span>FAQ Artikel (Schema FAQPage)</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {faqs.length}
                  </span>
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Otomatis dirender sebagai Accordion + JSON-LD Schema.org FAQPage di halaman artikel.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFaq}
              >
                <Plus size={14} />
                <span>Tambah FAQ</span>
              </Button>
            </div>

            {faqs.length > 0 ? (
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Pertanyaan #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        aria-label={`Hapus FAQ ${idx + 1}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                      >
                        <Trash2 size={12} />
                        <span>Hapus</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleUpdateFaq(idx, "question", e.target.value)
                      }
                      placeholder="Tulis pertanyaan yang sering ditanyakan pembaca..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleUpdateFaq(idx, "answer", e.target.value)
                      }
                      placeholder="Jawaban singkat, padat, dan informatif..."
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Belum ada FAQ. Klik <strong>Tambah FAQ</strong> atau gunakan{" "}
                <strong>AI Brief</strong> untuk mengisi otomatis.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: SEO, SERP PREVIEW & METADATA SIDEBAR */}
        <div className="lg:col-span-4">
          <PostSeoSidebar
            title={title}
            slug={slug}
            description={description}
            onDescriptionChange={setDescription}
            metaTitle={metaTitle}
            onMetaTitleChange={setMetaTitle}
            metaDescription={metaDescription}
            onMetaDescriptionChange={setMetaDescription}
            focusKeyword={focusKeyword}
            onFocusKeywordChange={setFocusKeyword}
            coverImage={coverImage}
            onCoverImageChange={setCoverImage}
            ogImage={ogImage}
            onOgImageChange={setOgImage}
            authorId={authorId}
            onAuthorIdChange={handleAuthorIdChange}
            authors={authors}
            authorName={authorName}
            onAuthorNameChange={setAuthorName}
            categoryId={categoryId}
            onCategoryIdChange={setCategoryId}
            categories={categories}
            tags={tags}
            selectedTagIds={selectedTagIds}
            onToggleTag={handleTagToggle}
            faqsCount={
              faqs.filter(
                (f) => f.question.trim().length > 0 && f.answer.trim().length > 0
              ).length
            }
            content={content}
            isDraft={draft}
            isEditingExisting={Boolean(initialPost?.id)}
            isSaving={isSaving}
            isDeleting={isDeleting}
            onPublish={() => handleSave(false)}
            onSaveDraft={() => handleSave(true)}
            onRequestDelete={() => setIsDeleteModalOpen(true)}
            onOpenMediaPicker={() => setMediaModalMode("cover")}
            onOpenOgMediaPicker={() => setMediaModalMode("og")}
            onApplyAiSeo={(seo) => {
              setMetaTitle(seo.title);
              setMetaDescription(seo.description);
              if (!title.trim()) {
                setTitle(seo.title);
              }
              if (!description.trim()) {
                setDescription(seo.description);
              }
              if (!initialPost && (!isSlugLocked || !slug)) {
                setSlug(toSlug(seo.title));
              }
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <AiWriterModal
        open={isAiWriterOpen}
        onClose={() => setIsAiWriterOpen(false)}
        initialTopic={initialTopic}
        onGenerated={(res) => {
          setTitle(res.title);
          setDescription(res.description);
          setMetaTitle(res.title);
          setMetaDescription(res.description);
          setContent(res.content);
          if (res.focusKeyword) {
            setFocusKeyword(res.focusKeyword);
          }
          if (res.faqs && res.faqs.length > 0) {
            setFaqs(res.faqs);
          }
          if (!initialPost && (isSlugLocked || !slug)) {
            setSlug(res.suggestedSlug || toSlug(res.title));
          }
        }}
      />

      <MediaPickerModal
        open={mediaModalMode !== null}
        onClose={() => setMediaModalMode(null)}
        media={media}
        selectLabel={mediaModalMode === "og" ? "OG Image" : "Cover"}
        onSelectCover={(url) => {
          if (mediaModalMode === "og") {
            setOgImage(url);
          } else {
            setCoverImage(url);
          }
        }}
        onInsertToEditor={(url, alt) => {
          if (editorInstance) {
            editorInstance
              .chain()
              .focus()
              .setImage({ src: url, alt })
              .run();
          }
        }}
      />

      <Modal
        open={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Hapus Artikel?"
        description="Tindakan ini permanen dan artikel tidak bisa dipulihkan."
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
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
            &ldquo;{title}&rdquo;
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
}
