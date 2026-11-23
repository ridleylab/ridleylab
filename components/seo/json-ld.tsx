interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Render structured JSON-LD safely in SSR HTML.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
