"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Node, mergeAttributes } from '@tiptap/core';
import { useState, useEffect, useRef } from "react";
import { 
  Bold, Italic, List, ListOrdered, Heading2, Heading3, 
  Link as LinkIcon, Image as ImageIcon, Sparkles, Loader2, 
  UploadCloud, Link2, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, Highlighter, Type, SquareDashedBottom
} from "lucide-react";
import { editWithAI } from "@/app/admin/posts/ai-actions";
import { uploadFiles } from "@/utils/uploadthing";

// Custom Button Node Extension
const ButtonNode = Node.create({
  name: 'button',
  group: 'inline',
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      href: { default: '#' },
      text: { default: 'Button' },
      target: { default: '_blank' },
      rel: { default: 'noopener noreferrer' }
    }
  },

  parseHTML() {
    return [{ tag: 'a[data-type="button"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(HTMLAttributes, { 
      'data-type': 'button', 
      class: 'ridley-btn inline-block no-underline text-white !text-white bg-[#2980B9] px-6 py-3 rounded-xl font-bold hover:bg-[#216694] transition cursor-pointer my-2 shadow-lg' 
    }), HTMLAttributes.text]
  }
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const [isAILoading, setIsAILoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageUrl = () => {
    const url = window.prompt("Masukkan URL Gambar:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
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
      } else {
        alert("Gagal meng-upload gambar.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat meng-upload.");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAI = async () => {
    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Blok (select) teks yang ingin diedit dengan AI terlebih dahulu!");
      return;
    }
    const selectedText = editor.state.doc.textBetween(from, to, " ");

    const instruction = window.prompt("Instruksi AI (contoh: 'Perbaiki tata bahasa' atau 'Perpanjang penjelasan ini'):", "Perbaiki tata bahasa dan buat lebih profesional");
    if (!instruction) return;

    setIsAILoading(true);
    try {
      const res = await editWithAI(selectedText, instruction);
      if (res.success && res.text) {
        editor.chain().focus().deleteSelection().insertContent(res.text.replace(/\n/g, "<br>")).run();
      } else {
        alert(res.error || "Gagal memanggil AI");
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsAILoading(false);
    }
  };

  const addCustomButton = () => {
    const text = window.prompt("Teks Tombol:", "Klik Di Sini");
    if (!text) return;
    const href = window.prompt("Link Tujuan (URL):", "https://");
    if (!href) return;
    
    editor.chain().focus().insertContent({
      type: 'button',
      attrs: { text, href }
    }).run();
  };

  const setColor = () => {
    const color = window.prompt("Masukkan kode warna (contoh: #ff0000 atau blue):");
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm rounded-lg items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Italic"
      >
        <Italic size={18} />
      </button>
      
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>
      
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      
      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Align Justify"
      >
        <AlignJustify size={18} />
      </button>
      
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      {/* Colors & Highlight */}
      <button
        onClick={setColor}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
        type="button"
        title="Text Color"
      >
        <Type size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("highlight") ? "bg-yellow-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Highlight Background"
      >
        <Highlighter size={18} />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      
      <button
        onClick={setLink}
        className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-200 text-black" : "text-gray-600"}`}
        type="button"
        title="Link"
      >
        <LinkIcon size={18} />
      </button>
      
      {/* Custom Button Link */}
      <button
        onClick={addCustomButton}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
        type="button"
        title="Insert Button Link"
      >
        <SquareDashedBottom size={18} />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-50"
        type="button"
        title="Upload Image"
      >
        {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
      </button>
      <button
        onClick={addImageUrl}
        className="p-1.5 rounded hover:bg-gray-200 text-gray-600 cursor-pointer disabled:cursor-not-allowed"
        type="button"
        title="Image from URL"
      >
        <Link2 size={18} />
      </button>
      
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      
      <button
        onClick={handleAI}
        disabled={isAILoading}
        className="p-1.5 rounded hover:bg-blue-50 text-ridley-blue font-bold flex items-center gap-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ml-auto"
        type="button"
        title="AI Assistant"
      >
        {isAILoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
        <span className="text-xs">AI</span>
      </button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-2 focus:outline-none min-h-[400px] h-full max-w-none text-black bg-transparent",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <MenuBar editor={editor} />
      <div className="px-4 pb-4 flex-1">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
