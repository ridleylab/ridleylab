import { siteConfig } from "@/config/site";
import { programs, priceRangeLabel, type ProgramFaq, type ProgramItem } from "@/config/programs";
import type { PortfolioItem } from "@/config/portfolio";
import type { LocationItem } from "@/config/locations";
import type { PostMetadata } from "@/lib/posts";

export const SCHEMA_IDS = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  founder: `${siteConfig.url}/#founder`,
} as const;

type SchemaNode = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  if (!pathOrUrl || pathOrUrl === "/") {
    return siteConfig.url;
  }
  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${normalized.replace(/\/+$/, "")}`;
}

export function createSchemaGraph(nodes: SchemaNode[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function buildOrganizationNode(): SchemaNode {
  return {
    "@type": ["ProfessionalService", "EducationalOrganization"],
    "@id": SCHEMA_IDS.organization,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(siteConfig.brandAssets.logo),
    },
    image: toAbsoluteUrl(siteConfig.brandAssets.ogDefault),
    telephone: `+${siteConfig.contact.whatsappNumber}`,
    email: siteConfig.contact.email,
    areaServed: siteConfig.address.countryName,
    priceRange: priceRangeLabel,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.latitude,
      longitude: siteConfig.address.geo.longitude,
    },
    hasMap: siteConfig.address.mapsUrl,
    founder: {
      "@id": SCHEMA_IDS.founder,
    },
    sameAs: [siteConfig.social.instagram.url, siteConfig.social.tiktok.url],
  };
}

export function buildWebsiteNode(): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": SCHEMA_IDS.organization,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildFounderPersonNode(): SchemaNode {
  return {
    "@type": "Person",
    "@id": SCHEMA_IDS.founder,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    url: siteConfig.founder.portfolioUrl,
    image: toAbsoluteUrl("/images/about/zakaanshori.png"),
    worksFor: {
      "@id": SCHEMA_IDS.organization,
    },
    sameAs: [
      siteConfig.founder.portfolioUrl,
      siteConfig.social.instagram.url,
      siteConfig.social.tiktok.url,
    ],
  };
}

export function buildWebPageNode(options: {
  path: string;
  name: string;
  description: string;
  pageType?: "WebPage" | "AboutPage" | "CollectionPage";
  datePublished?: string;
  dateModified?: string;
}): SchemaNode {
  const pageUrl = toAbsoluteUrl(options.path);
  return {
    "@type": options.pageType || "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: options.name,
    description: options.description,
    inLanguage: siteConfig.language,
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    about: {
      "@id": SCHEMA_IDS.organization,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    ...(options.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
  };
}

export function buildBreadcrumbNode(path: string, items: BreadcrumbItem[]): SchemaNode {
  const pageUrl = toAbsoluteUrl(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildCourseAndServiceNodes(program: ProgramItem): SchemaNode[] {
  const pageUrl = toAbsoluteUrl(program.path);
  const offer = {
    "@type": "Offer",
    price: String(program.price),
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  };

  return [
    {
      "@type": "Course",
      "@id": `${pageUrl}#course`,
      name: program.fullName,
      description: program.description,
      provider: {
        "@id": SCHEMA_IDS.organization,
      },
      url: pageUrl,
      inLanguage: siteConfig.language,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: program.courseMode,
        inLanguage: siteConfig.language,
      },
      offers: offer,
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: program.fullName,
      serviceType: program.serviceType,
      description: program.description,
      image: toAbsoluteUrl(program.ogImage),
      url: pageUrl,
      provider: {
        "@id": SCHEMA_IDS.organization,
      },
      areaServed: {
        "@type": "Country",
        name: siteConfig.address.countryName,
      },
      offers: offer,
    },
  ];
}

export function buildFaqNode(path: string, faqs: ProgramFaq[]): SchemaNode {
  const pageUrl = toAbsoluteUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildPostAuthorInfo(post: PostMetadata): {
  authorRef: Record<string, string>;
  authorNode: SchemaNode | null;
} {
  const isFounderAuthor =
    post.author.trim().toLowerCase() === siteConfig.founder.name.toLowerCase();

  if (isFounderAuthor) {
    return {
      authorRef: { "@id": SCHEMA_IDS.founder },
      authorNode: null,
    };
  }

  if (post.authorProfile) {
    const authorId = `${siteConfig.url}/#author-${post.authorProfile.id}`;
    return {
      authorRef: { "@id": authorId },
      authorNode: {
        "@type": "Person",
        "@id": authorId,
        name: post.authorProfile.name,
        ...(post.authorProfile.role ? { jobTitle: post.authorProfile.role } : {}),
        ...(post.authorProfile.bio
          ? { description: post.authorProfile.bio }
          : {}),
        ...(post.authorProfile.avatarUrl
          ? { image: toAbsoluteUrl(post.authorProfile.avatarUrl) }
          : {}),
        worksFor: {
          "@id": SCHEMA_IDS.organization,
        },
      },
    };
  }

  return {
    authorRef: { "@type": "Person", name: post.author },
    authorNode: null,
  };
}

export function buildBlogPostingNode(
  post: PostMetadata,
  wordCount: number
): SchemaNode {
  const postUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const { authorRef } = buildPostAuthorInfo(post);
  const headline = post.metaTitle || post.title;
  const description = post.metaDescription || post.description;
  const image = toAbsoluteUrl(
    post.ogImage || post.coverImage || programs.onlineCourse.ogImage
  );
  const keywords = Array.from(
    new Set([
      ...(post.focusKeyword ? [post.focusKeyword] : []),
      ...post.tags,
    ])
  );

  return {
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline,
    description,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount,
    articleSection: post.category,
    ...(keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    inLanguage: siteConfig.language,
    author: authorRef,
    publisher: {
      "@id": SCHEMA_IDS.organization,
    },
    mainEntityOfPage: {
      "@id": `${postUrl}#webpage`,
    },
    isPartOf: {
      "@id": `${postUrl}#webpage`,
    },
  };
}

export function buildItemListNode(
  path: string,
  name: string,
  items: Array<{ name: string; url: string }>
): SchemaNode {
  const pageUrl = toAbsoluteUrl(path);
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.url),
    })),
  };
}

export function buildLocationServiceNode(location: LocationItem): SchemaNode {
  const path = `/lokasi/${location.slug}`;
  const pageUrl = toAbsoluteUrl(path);
  const recommended = programs[location.recommendedProgramKey];

  return {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: location.title,
    description: location.metaDescription,
    serviceType: "Pelatihan AI Social Media Marketing",
    url: pageUrl,
    provider: {
      "@id": SCHEMA_IDS.organization,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    offers: {
      "@type": "Offer",
      price: String(recommended.price),
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: toAbsoluteUrl(recommended.path),
    },
  };
}

// --- PAGE GRAPH COMPOSERS ---

export function getHomeSchemaGraph() {
  return createSchemaGraph([
    buildOrganizationNode(),
    buildFounderPersonNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: "/",
      name: siteConfig.titleDefault,
      description: siteConfig.description,
    }),
    buildBreadcrumbNode("/", [{ name: "Home", path: "/" }]),
  ]);
}

export function getServicesHubSchemaGraph() {
  const allPrograms = [
    programs.onlineCourse,
    programs.onlineMentoring,
    programs.offlineMentoring,
  ];

  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: "/services",
      name: `Program Pelatihan AI Social Media Marketing | ${siteConfig.name}`,
      description:
        "Bandingkan 3 program pelatihan AI Social Media Marketing RidleyLab: Online Course mandiri Rp199.000, Online Mentoring Google Meet Rp4.000.000/tim, dan Offline Mentoring tatap muka Rp4.500.000/tim.",
      pageType: "CollectionPage",
    }),
    buildBreadcrumbNode("/services", [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    buildItemListNode(
      "/services",
      `Program Pelatihan ${siteConfig.name}`,
      allPrograms.map((prog) => ({
        name: `${prog.name} (${prog.priceFormatted} ${prog.priceUnit})`,
        url: prog.path,
      }))
    ),
  ]);
}

export function getProgramSchemaGraph(program: ProgramItem) {
  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: program.path,
      name: `${program.name} - Pelatihan AI Social Media Marketing | ${siteConfig.name}`,
      description: program.description,
    }),
    buildBreadcrumbNode(program.path, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: program.name, path: program.path },
    ]),
    ...buildCourseAndServiceNodes(program),
    ...(program.faqs.length > 0 ? [buildFaqNode(program.path, program.faqs)] : []),
  ]);
}

export function getAboutSchemaGraph() {
  return createSchemaGraph([
    buildOrganizationNode(),
    buildFounderPersonNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: "/about",
      name: `Tentang ${siteConfig.name} & Founder`,
      description: `Pelajari lebih lanjut tentang misi ${siteConfig.name} dan founder ${siteConfig.founder.name} dalam membantu bisnis jasa membangun sistem konten & konversi berbasis AI.`,
      pageType: "AboutPage",
    }),
    buildBreadcrumbNode("/about", [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);
}

export function getPortfolioSchemaGraph(items: PortfolioItem[]) {
  const pageUrl = toAbsoluteUrl("/portfolio");
  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: "/portfolio",
      name: `Portfolio & Studi Kasus Klien Mentoring ${siteConfig.name}`,
      description: `Lihat dokumentasi hasil mentoring dan studi kasus ${siteConfig.name} untuk berbagai bisnis jasa di Indonesia.`,
      pageType: "CollectionPage",
    }),
    buildBreadcrumbNode("/portfolio", [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      name: `Portfolio Studi Kasus Klien ${siteConfig.name}`,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `${pageUrl}#${item.slug}`,
          name: `${item.name} — ${item.resultMetric}`,
          description: item.mentoringDetails,
          image: toAbsoluteUrl(item.image),
          url: `${pageUrl}#${item.slug}`,
          about: item.businessType,
          locationCreated: {
            "@type": "Place",
            name: item.location,
          },
          creator: {
            "@id": SCHEMA_IDS.organization,
          },
        },
      })),
    },
  ]);
}

export function getBlogIndexSchemaGraph(posts: PostMetadata[]) {
  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path: "/blog",
      name: `Blog Pelatihan AI Social Media Marketing | ${siteConfig.name}`,
      description:
        "Wawasan, panduan, dan strategi penerapan AI untuk social media marketing bisnis jasa.",
      pageType: "CollectionPage",
    }),
    buildBreadcrumbNode("/blog", [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    buildItemListNode(
      "/blog",
      `Artikel Blog ${siteConfig.name}`,
      posts.map((post) => ({
        name: post.title,
        url: `/blog/${post.slug}`,
      }))
    ),
  ]);
}

export function getBlogCategorySchemaGraph(
  categoryName: string,
  slug: string,
  posts: PostMetadata[]
) {
  const path = `/blog/category/${slug}`;
  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path,
      name: `Artikel Kategori ${categoryName} | ${siteConfig.name}`,
      description: `Kumpulan panduan dan wawasan terbaru untuk kategori ${categoryName} dari ${siteConfig.name}.`,
      pageType: "CollectionPage",
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: categoryName, path },
    ]),
    buildItemListNode(
      path,
      `Artikel Kategori ${categoryName}`,
      posts.map((post) => ({
        name: post.title,
        url: `/blog/${post.slug}`,
      }))
    ),
  ]);
}

export function getBlogPostSchemaGraph(post: PostMetadata, wordCount: number) {
  const path = `/blog/${post.slug}`;
  const { authorNode } = buildPostAuthorInfo(post);

  return createSchemaGraph([
    buildOrganizationNode(),
    buildFounderPersonNode(),
    ...(authorNode ? [authorNode] : []),
    buildWebsiteNode(),
    buildWebPageNode({
      path,
      name: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.category, path: `/blog/category/${post.categorySlug}` },
      { name: post.title, path },
    ]),
    buildBlogPostingNode(post, wordCount),
    ...(post.faqs.length > 0 ? [buildFaqNode(path, post.faqs)] : []),
  ]);
}

export function getLocationSchemaGraph(location: LocationItem) {
  const path = `/lokasi/${location.slug}`;
  return createSchemaGraph([
    buildOrganizationNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path,
      name: `${location.title} | ${siteConfig.name}`,
      description: location.metaDescription,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: location.city, path },
    ]),
    buildLocationServiceNode(location),
    ...(location.faqs.length > 0 ? [buildFaqNode(path, location.faqs)] : []),
  ]);
}
