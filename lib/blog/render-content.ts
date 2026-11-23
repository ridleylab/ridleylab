import { marked } from "marked";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface RenderedArticleContent {
  html: string;
  toc: TocItem[];
  wordCount: number;
}

const BLOCK_HTML_PATTERN =
  /<(?:p|h[1-6]|ul|ol|li|div|blockquote|pre|section|article|table|figure|img)\b/i;

const DANGEROUS_PAIRED_TAGS =
  /<(script|style|iframe|object|embed|form|svg|math)\b[^>]*>[\s\S]*?<\/\1>/gi;

const DANGEROUS_STANDALONE_TAGS =
  /<\/?(?:script|style|iframe|object|embed|form|svg|math|input|textarea|button|link|meta|base)\b[^>]*\/?>/gi;

const EVENT_HANDLER_ATTRS = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const SRCDOC_ATTR = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function slugifyHeading(text: string): string {
  return decodeHtmlEntities(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isUnsafeUri(rawUri: string): boolean {
  const normalized = decodeHtmlEntities(rawUri)
    .replace(/[\u0000-\u001F\s]+/g, "")
    .toLowerCase();
  return (
    normalized.startsWith("javascript:") ||
    normalized.startsWith("vbscript:") ||
    normalized.startsWith("data:text/html")
  );
}

function sanitizeUrlAttributes(tagAttrs: string): string {
  return tagAttrs
    .replace(
      /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
      (full, dQuoted, sQuoted, unquoted) => {
        const uri = dQuoted ?? sQuoted ?? unquoted ?? "";
        return isUnsafeUri(uri) ? 'href="#"' : full;
      }
    )
    .replace(
      /\s*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
      (full, dQuoted, sQuoted, unquoted) => {
        const uri = dQuoted ?? sQuoted ?? unquoted ?? "";
        return isUnsafeUri(uri) ? "" : full;
      }
    );
}

function sanitizeHtml(rawHtml: string): string {
  return rawHtml
    .replace(DANGEROUS_PAIRED_TAGS, "")
    .replace(DANGEROUS_STANDALONE_TAGS, "")
    .replace(EVENT_HANDLER_ATTRS, "")
    .replace(SRCDOC_ATTR, "")
    .replace(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi, (_match, tagName, attrs) => {
      const cleanedAttrs = attrs ? sanitizeUrlAttributes(attrs) : "";
      return `<${tagName}${cleanedAttrs}>`;
    });
}

function toSafeHtml(rawContent: string): string {
  const trimmed = rawContent.trim();
  if (!trimmed) return "";

  const html = BLOCK_HTML_PATTERN.test(trimmed)
    ? trimmed
    : (marked.parse(trimmed, { async: false }) as string);

  return sanitizeHtml(html);
}

function extractAndNormalizeHeadings(html: string): {
  html: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();

  const normalizedHtml = html.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, levelStr: string, attrs: string, innerHtml: string) => {
      const level = Number(levelStr);
      const plainHeading = decodeHtmlEntities(
        innerHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      );
      const baseId = slugifyHeading(plainHeading) || "bagian";
      const seenCount = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, seenCount + 1);
      const uniqueId =
        seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

      if (plainHeading) {
        toc.push({ id: uniqueId, text: plainHeading, level });
      }

      const cleanedAttrs = attrs
        .replace(/\s*id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .trim();
      const attrPrefix = cleanedAttrs ? ` ${cleanedAttrs}` : "";

      return `<h${level}${attrPrefix} id="${uniqueId}">${innerHtml}</h${level}>`;
    }
  );

  return { html: normalizedHtml, toc };
}

function normalizeLinksAndCtas(html: string): string {
  return html.replace(/<a\s+([^>]*?)>/gi, (fullMatch, attrs: string) => {
    const isCta =
      /data-type\s*=\s*["'](?:button|cta-button)["']/i.test(attrs) ||
      /class\s*=\s*["'][^"']*\bridley-btn\b/i.test(attrs);

    const hasBlankTarget = /target\s*=\s*["']_blank["']/i.test(attrs);
    const hasRel = /\brel\s*=\s*["'][^"']*["']/i.test(attrs);

    if (!isCta) {
      if (hasBlankTarget && !hasRel) {
        return `<a ${attrs.trim()} rel="noopener noreferrer">`;
      }
      return fullMatch;
    }

    let cleanedAttrs = attrs
      .replace(/\s*class\s*=\s*["'][^"']*["']/gi, "")
      .replace(/\s*data-type\s*=\s*["'][^"']*["']/gi, "")
      .trim();

    if (hasBlankTarget && !hasRel) {
      cleanedAttrs = `${cleanedAttrs} rel="noopener noreferrer"`.trim();
    }

    return `<a ${cleanedAttrs} data-type="cta-button" class="article-cta-btn">`;
  });
}

export function renderArticleContent(
  rawContent: string
): RenderedArticleContent {
  const safeHtml = toSafeHtml(rawContent);
  const { html: withHeadingIds, toc } = extractAndNormalizeHeadings(safeHtml);
  const html = normalizeLinksAndCtas(withHeadingIds);

  const plainText = decodeHtmlEntities(
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  );
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;

  return { html, toc, wordCount };
}

export function parseToc(content: string): TocItem[] {
  return renderArticleContent(content).toc;
}
