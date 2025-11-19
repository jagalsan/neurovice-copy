"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/api/types";
import { BlogComments } from "@/components/blog/BlogComments";
import { useT } from "@/providers/I18nProvider";

interface BlogArticleClientProps {
  locale: Locale;
  post: BlogPost;
}

export function BlogArticleClient({ locale, post }: BlogArticleClientProps) {
  const t = useT();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : "";

  const authorName = post.author?.name
    ? `${post.author.name} ${post.author.lastName ?? ""}`.trim()
    : "";

  return (
    <>
      <div className="max-w-[756px] mx-auto text-center mb-10">
        <span
          className="text-xs font-[500] tracking-[0.28em] uppercase text-[var(--color-brand-500)] z-10 bg-transparent"
          style={{ textShadow: "0px 0px 15px #00FFFC" }}
        >
          {t("labels.blog")}
        </span>

        <h1 className="font-heading text-[30px] md:text-[40px] leading-tight text-[#17FBF8] mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-[13px] md:text-[14px] leading-relaxed text-[#B9FDFB] mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.16em] uppercase text-white/70">
          {authorName && (
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#0b1115]">
                <Image
                  src={post.coverImageUrl || "/mock/blog-placeholder.png"}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading text-white">{authorName}</span>
            </div>
          )}
          {publishedDate && (
            <>
              <span className="text-[#17FBF8]">•</span>
              <span className="font-heading text-white/60">{publishedDate}</span>
            </>
          )}
        </div>
      </div>

      {post.coverImageUrl && (
        <div className="relative w-full max-w-[996px] mx-auto mb-10">
          <div className="relative w-full aspect-[996/508] rounded-[24px] overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <article className="max-w-[756px] mx-auto space-y-8 text-[14px] leading-relaxed text-[#E5F7F6]">
        <div
          className="prose prose-invert max-w-none uppercase"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="max-w-[756px] mx-auto mt-12">
        <BlogComments
          locale={locale}
          slug={post.slug}
          initialComments={post.comments ?? []}
        />
      </div>
    </>
  );
}
