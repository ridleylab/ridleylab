import { PostMetadata } from "@/lib/posts";

export function getArticleSchema(post: PostMetadata) {
  const siteUrl = "https://www.ridleylab.com";
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "isPartOf": {
      "@type": "WebPage",
      "@id": url,
    },
    "headline": post.title,
    "description": post.description,
    "image": post.coverImage || `${siteUrl}/assets/images/online-course/OC-OG.jpg`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@id": "https://www.ridleylab.com/#organization",
    },
    "mainEntityOfPage": url,
  };
}
