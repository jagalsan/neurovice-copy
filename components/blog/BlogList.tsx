"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useBlogPosts } from "@/lib/hooks/api";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/api/types";
import ArticleCard from "./ArticleCard";
import Pagination from "@/components/Pagination";

interface BlogListProps {
  locale: Locale;
}

const PAGE_SIZE = 9;

function mapPostToCard(post: BlogPost, locale: Locale) {
  return {
    id: post.id.toString(),
    imageSrc: post.coverImageUrl ?? "/mock/blog-placeholder.png",
    imageAlt: post.title,
    category: "Blog",
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "",
    title: post.title,
    href: `/${locale}/blog/${post.slug}`,
  };
}

export function BlogList({ locale }: BlogListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const { data, isLoading } = useBlogPosts({
    limit: PAGE_SIZE,
    offset: (currentPage - 1) * PAGE_SIZE,
  });

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/${locale}/blog?${params.toString()}`);
  };

  if (isLoading && !data) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
          <div
            key={idx}
            className="h-[260px] rounded-[24px] bg-[#050608] border border-[rgba(255,255,255,0.08)] animate-pulse"
          />
        ))}
      </section>
    );
  }

  const posts = data?.results ?? [];

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post) => {
          const card = mapPostToCard(post, locale);
          return (
            <ArticleCard
              key={card.id}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              category={card.category}
              date={card.date}
              title={card.title}
              href={card.href}
            />
          );
        })}
      </section>

      {totalPages > 1 && (
        <div className="mt-10 md:mt-14">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
