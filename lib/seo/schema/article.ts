import { PostMetadata } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";

export function getArticleSchema(post: PostMetadata) {
  const siteUrl = siteConfig.url;
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
    "image": post.coverImage || `${siteUrl}${programs.onlineCourse.ogImage}`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@id": `${siteUrl}/#organization`,
    },
    "mainEntityOfPage": url,
  };
}
