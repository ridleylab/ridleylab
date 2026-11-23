import { parseToc, type TocItem } from "@/lib/blog/render-content";

export { decodeHtmlEntities, slugifyHeading, type TocItem } from "@/lib/blog/render-content";

interface TableOfContentsProps {
  items?: TocItem[];
  content?: string;
}

export default function TableOfContents({
  items,
  content = "",
}: TableOfContentsProps) {
  const resolvedItems = items ?? parseToc(content);

  if (resolvedItems.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6">
      <h4 className="font-semibold text-xs text-zinc-950 dark:text-zinc-100 mb-4 uppercase tracking-[0.14em]">
        Daftar Isi
      </h4>
      <nav aria-label="Daftar isi artikel" className="space-y-2.5">
        {resolvedItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition-colors hover:text-zinc-950 dark:hover:text-white leading-snug ${
              item.level === 3
                ? "pl-3.5 text-zinc-500 dark:text-zinc-400 border-l border-zinc-200 dark:border-zinc-800"
                : "text-zinc-700 dark:text-zinc-300 font-medium"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
