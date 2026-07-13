import Link from "next/link";
import Image from "next/image";
import { PostMetadata } from "@/lib/posts";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="ridley-proof-card flex flex-col h-full group bg-white border border-black/5 hover:-translate-y-2 hover:shadow-xl transition duration-500 rounded-[28px] overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-gray-150">
        <Image
          src={post.coverImage || "/assets/images/online-course/OC-OG.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-3 text-xs mb-3 font-semibold">
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-ridley-blue hover:underline uppercase tracking-wider"
          >
            {post.category}
          </Link>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{post.readingTime}</span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-black line-clamp-2 hover:text-ridley-blue transition duration-300">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed flex-grow">
          {post.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
          <span className="text-xs text-gray-400 font-medium">{formattedDate}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-bold text-ridley-blue group-hover:translate-x-1 transition duration-300 flex items-center gap-1"
          >
            Baca Selengkapnya
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
