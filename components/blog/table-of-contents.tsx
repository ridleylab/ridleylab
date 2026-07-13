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
      // Markdown match
      level = match[1].length;
      text = match[2].trim();
    } else {
      // HTML match
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
    <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl sticky top-28">
      <h4 className="font-bold text-sm text-black mb-4 uppercase tracking-wider">
        Daftar Isi
      </h4>
      <nav className="space-y-2.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition duration-200 hover:text-ridley-blue ${
              item.level === 3
                ? "pl-4 text-gray-500 font-medium"
                : "text-gray-700 font-semibold"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
