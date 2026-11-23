export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function parseToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /(?:^(#{2,3})\s+(.*)$)|(?:<h([23])[^>]*>(.*?)<\/h\3>)/gim;
  let match;

  while ((match = regex.exec(content)) !== null) {
    let level: number;
    let text: string;

    if (match[1]) {
      level = match[1].length;
      text = match[2].trim();
    } else {
      level = parseInt(match[3], 10);
      text = match[4].replace(/<[^>]*>?/gm, "").trim();
    }

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    items.push({ id, text, level });
  }

  return items;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const items = parseToc(content);

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6">
      <h4 className="font-semibold text-xs text-zinc-950 dark:text-zinc-100 mb-4 uppercase tracking-[0.14em]">
        Daftar Isi
      </h4>
      <nav aria-label="Daftar isi artikel" className="space-y-2.5">
        {items.map((item) => (
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
