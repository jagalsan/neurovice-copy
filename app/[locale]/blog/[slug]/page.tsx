import OtherPostsSection from "@/components/blog/OtherPosts";
import { BlogArticleClient } from "@/components/blog/BlogArticleClient";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import type { BlogPost } from "@/lib/api/types";

export const dynamicParams = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  if (!API_BASE_URL) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/blog/posts/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const post = (await res.json()) as BlogPost;
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return await generatePageMetadata(locale as Locale, {
      titleKey: "seo.blog_title",
      descriptionKey: "seo.blog_description",
      path: `/blog/${slug}`,
    });
  }

  const description = post.excerpt || post.content.slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${API_BASE_URL}/${locale}/blog/${slug}`,
      type: "article",
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const post = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full bg-[#171614] text-white pb-24">
      <div className="max-w-[996px] mx-auto px-4 md:px-6 pt-16">
        <BlogArticleClient locale={typedLocale} post={post as BlogPost} />
      </div>

      <OtherPostsSection locale={typedLocale} />
    </section>
  );
}
