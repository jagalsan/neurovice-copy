import ArticleCard from "./ArticleCard";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/api/types";

interface OtherPostsSectionProps {
  locale: Locale;
  posts: BlogPost[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

export default function OtherPostsSection({ locale, posts }: OtherPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#171614] py-16">
      <div className="max-w-[1459px] mx-auto px-4 md:px-6">
        <h2 className="text-center font-heading text-[28px] md:text-[36px] text-[#17FBF8] mb-10">
          Other Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard
              key={post.id}
              imageSrc={post.coverImageUrl || "/mock/blog-placeholder.png"}
              imageAlt={post.title}
              category="BLOG"
              categoryHref={`/${locale}/blog`}
              date={formatDate(post.publishedAt || post.createdAt)}
              title={post.title}
              href={`/${locale}/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
