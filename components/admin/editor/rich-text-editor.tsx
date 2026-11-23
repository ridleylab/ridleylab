"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Node, mergeAttributes } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  FolderOpen,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Link2,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Sparkles,
  SquareDashedBottom,
  Type,
  UploadCloud,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { programs } from "@/config/programs";
import { uploadFiles } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import InlineAiPopover from "./inline-ai-popover";
import { cn } from "@/lib/utils";

/**
 * Semantic CTA Button node stored cleanly without hardcoded blue classes.
 */
const ButtonNode = Node.create({
  name: "button",
  group: "inline",
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      href: { default: programs.onlineMentoring.path },
      text: { default: "Konsultasi" },
      target: { default: "_blank" },
      rel: { default: "noopener noreferrer" },
    };
  },

  parseHTML() {
    return [
      { tag: 'a[data-type="cta-button"]' },
      { tag: 'a[data-type="button"]' },
      { tag: "a.ridley-btn" },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-type": "cta-button",
        class: "article-cta-btn",
      }),
      HTMLAttributes.text,
    ];
  },
});

const textColorSwatches = [
  { label: "Default", value: "" },
  { label: "Muted", value: "#71717a" },
  { label: "Emerald", value: "#059669" },
  { label: "Amber", value: "#d97706" },
  { label: "Crimson", value: "#dc2626" },
];

interface MenuBarProps {
  editor: Editor | null;
  onOpenMediaGallery?: () => void;
}

function MenuBar({ editor, onOpenMediaGallery }: MenuBarProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // All hooks placed before early return to satisfy React Rules of Hooks
  const [isUploading, setIsUploading] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);
  const [ctaText, setCtaText] = useState("Konsultasi Online Mentoring");
  const [ctaHref, setCtaHref] = useState(programs.onlineMentoring.path);

  const [aiModalSelection, setAiModalSelection] = useState<string | null>(null);

  if (!editor) {
    return null;
  }

  const openLinkModal = () => {
    const previousUrl = (editor.getAttributes("link").href as string) || "https://";
    setLinkUrl(previousUrl);
    setIsLinkModalOpen(true);
  };

  const applyLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = linkUrl.trim();
    if (!cleaned) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: cleaned })
        .run();
    }
    setIsLinkModalOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadFiles("imageUploader", {
        files: [file],
      });
      if (res && res.length > 0) {
        editor.chain().focus().setImage({ src: res[0].url }).run();
        toast({
          title: "Gambar berhasil di-upload & disisipkan",
          variant: "success",
        });
      } else {
        toast({
          title: "Gagal meng-upload gambar",
          variant: "error",
        });
      }
    } catch {
      toast({
        title: "Terjadi kesalahan saat meng-upload",
        variant: "error",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const applyImageFromUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    editor
      .chain()
      .focus()
      .setImage({
        src: imageUrl.trim(),
        alt: imageAlt.trim() || undefined,
      })
      .run();
    setImageUrl("");
    setImageAlt("");
    setIsImageModalOpen(false);
  };

  const applyCtaButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaText.trim() || !ctaHref.trim()) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "button",
        attrs: {
          text: ctaText.trim(),
          href: ctaHref.trim(),
        },
      })
      .run();
    setIsCtaModalOpen(false);
  };

  const openInlineAi = () => {
    const { from, to } = editor.state.selection;
    if (from === to) {
      toast({
        title: "Pilih teks terlebih dahulu",
        description: "Blok kalimat atau paragraf yang ingin direvisi oleh AI.",
        variant: "error",
      });
      return;
    }
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    setAiModalSelection(selectedText);
  };

  const toolbarBtn = (active = false) =>
    cn(
      "p-1.5 rounded-lg transition-colors cursor-pointer",
      active
        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
    );

  return (
    <>
      <div className="flex flex-wrap gap-1.5 p-2.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 items-center relative">
        <button
          type="button"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={toolbarBtn(editor.isActive("bold"))}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={toolbarBtn(editor.isActive("italic"))}
        >
          <Italic size={16} />
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          type="button"
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toolbarBtn(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={16} />
        </button>
        <button
          type="button"
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={toolbarBtn(editor.isActive("heading", { level: 3 }))}
        >
          <Heading3 size={16} />
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          type="button"
          title="Align Left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "left" }))}
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          title="Align Center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "center" }))}
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          title="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "right" }))}
        >
          <AlignRight size={16} />
        </button>
        <button
          type="button"
          title="Justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "justify" }))}
        >
          <AlignJustify size={16} />
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* Text Color Swatch Popover */}
        <div className="relative">
          <button
            type="button"
            title="Warna Teks"
            onClick={() => setIsColorOpen(!isColorOpen)}
            className={toolbarBtn(isColorOpen)}
          >
            <Type size={16} />
          </button>
          {isColorOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-20 flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-lg">
              {textColorSwatches.map((swatch) => (
                <button
                  key={swatch.label}
                  type="button"
                  title={swatch.label}
                  onClick={() => {
                    if (swatch.value) {
                      editor.chain().focus().setColor(swatch.value).run();
                    } else {
                      editor.chain().focus().unsetColor().run();
                    }
                    setIsColorOpen(false);
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  {swatch.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          title="Highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={toolbarBtn(editor.isActive("highlight"))}
        >
          <Highlighter size={16} />
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          type="button"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarBtn(editor.isActive("bulletList"))}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarBtn(editor.isActive("orderedList"))}
        >
          <ListOrdered size={16} />
        </button>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          type="button"
          title="Insert / Edit Link"
          onClick={openLinkModal}
          className={toolbarBtn(editor.isActive("link"))}
        >
          <LinkIcon size={16} />
        </button>

        <button
          type="button"
          title="Sisipkan Tombol CTA"
          onClick={() => setIsCtaModalOpen(true)}
          className={toolbarBtn(false)}
        >
          <SquareDashedBottom size={16} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          title="Upload Gambar ke Artikel"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className={toolbarBtn(false)}
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <UploadCloud size={16} />
          )}
        </button>

        <button
          type="button"
          title="Sisipkan Gambar dari URL"
          onClick={() => setIsImageModalOpen(true)}
          className={toolbarBtn(false)}
        >
          <Link2 size={16} />
        </button>

        {onOpenMediaGallery && (
          <button
            type="button"
            title="Pilih Gambar dari Media Gallery"
            onClick={onOpenMediaGallery}
            className={toolbarBtn(false)}
          >
            <FolderOpen size={16} />
          </button>
        )}

        <button
          type="button"
          title="Inline AI Rewrite (Blok teks terlebih dahulu)"
          onClick={openInlineAi}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Sparkles size={13} />
          <span>AI Rewrite</span>
        </button>
      </div>

      {/* Link Modal */}
      <Modal
        open={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Sisipkan Tautan"
        description="Masukkan URL tujuan atau kosongkan untuk menghapus tautan."
        size="sm"
      >
        <form onSubmit={applyLink} className="space-y-4">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://ridleylab.com/services/online-mentoring"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
          <div className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                setIsLinkModalOpen(false);
              }}
            >
              Hapus Link
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsLinkModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Simpan Link
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* CTA Button Modal */}
      <Modal
        open={isCtaModalOpen}
        onClose={() => setIsCtaModalOpen(false)}
        title="Sisipkan Tombol CTA"
        description="Tombol otomatis memakai styling monokrom konsisten Light & Dark."
        size="sm"
      >
        <form onSubmit={applyCtaButton} className="space-y-4">
          <div>
            <label
              htmlFor="cta-btn-label"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Teks Tombol
            </label>
            <input
              id="cta-btn-label"
              type="text"
              required
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="cta-btn-url"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1"
            >
              URL Tujuan
            </label>
            <input
              id="cta-btn-url"
              type="text"
              required
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono text-zinc-950 dark:text-zinc-50 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Online Mentoring", href: programs.onlineMentoring.path },
              { label: "Offline Mentoring", href: programs.offlineMentoring.path },
              { label: "Online Course", href: programs.onlineCourse.path },
              { label: "WhatsApp", href: getWhatsAppUrl() },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setCtaHref(preset.href)}
                className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-950 dark:hover:border-zinc-400 cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCtaModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Sisipkan Tombol
            </Button>
          </div>
        </form>
      </Modal>

      {/* Image URL Modal */}
      <Modal
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Sisipkan Gambar via URL"
        size="sm"
      >
        <form onSubmit={applyImageFromUrl} className="space-y-4">
          <div>
            <label
              htmlFor="img-modal-url"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1"
            >
              URL Gambar
            </label>
            <input
              id="img-modal-url"
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/uploads/... atau https://utfs.io/..."
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono text-zinc-950 dark:text-zinc-50 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="img-modal-alt"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Alt Text (Opsional)
            </label>
            <input
              id="img-modal-alt"
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Deskripsi gambar untuk SEO"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsImageModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Sisipkan Gambar
            </Button>
          </div>
        </form>
      </Modal>

      {/* Inline AI Rewrite Modal */}
      {aiModalSelection !== null && (
        <InlineAiPopover
          open
          selectedText={aiModalSelection}
          onClose={() => setAiModalSelection(null)}
          onApply={(revisedHtml) => {
            editor
              .chain()
              .focus()
              .deleteSelection()
              .insertContent(revisedHtml)
              .run();
          }}
        />
      )}
    </>
  );
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onOpenMediaGallery?: () => void;
  onEditorReady?: (editor: Editor | null) => void;
}

export default function RichTextEditor({
  value,
  onChange,
  onOpenMediaGallery,
  onEditorReady,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight,
      ButtonNode,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[420px] p-5",
      },
    },
    onCreate: ({ editor: created }) => {
      onEditorReady?.(created);
    },
    onDestroy: () => {
      onEditorReady?.(null);
    },
    onUpdate: ({ editor: updated }) => {
      onChange(updated.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <MenuBar editor={editor} onOpenMediaGallery={onOpenMediaGallery} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
