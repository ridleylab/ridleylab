import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface BuildMetadataInput {
  title?: string;
  absoluteTitle?: boolean;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  keywords?: string[];
}

function normalizeCanonicalUrl(path: string): string {
  if (!path || path === "/") {
    return siteConfig.url;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath.replace(/\/+$/, "")}`;
}

function resolveAbsoluteUrl(assetPath: string): string {
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${siteConfig.url}${normalized}`;
}

/**
 * Build consistent Next.js Metadata with canonical URL, OpenGraph,
 * Twitter card, and explicit robots directives.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    absoluteTitle = false,
    description,
    path,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    noIndex = false,
    noFollow = false,
    keywords,
  } = input;

  const canonicalUrl = normalizeCanonicalUrl(path);
  const resolvedTitle = title || siteConfig.titleDefault;
  const fullOgTitle =
    absoluteTitle || !title
      ? resolvedTitle
      : `${resolvedTitle} | ${siteConfig.name}`;
  const ogImageUrl = resolveAbsoluteUrl(image || siteConfig.brandAssets.ogDefault);

  return {
    ...(title
      ? {
          title: absoluteTitle ? { absolute: title } : title,
        }
      : {}),
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullOgTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullOgTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullOgTitle,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };
}
