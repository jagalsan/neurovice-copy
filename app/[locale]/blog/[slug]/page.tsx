import OtherPostsSection from "@/components/blog/OtherPosts";
import { BlogArticleClient } from "@/components/blog/BlogArticleClient";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import type { BlogPost } from "@/lib/api/types";
import { blogService } from "@/lib/api/services/blog.service";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const post = await blogService.getPostBySlug(slug);
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
  } catch {
    return await generatePageMetadata(locale as Locale, {
      titleKey: "seo.blog_title",
      descriptionKey: "seo.blog_description",
      path: `/blog/${slug}`,
    });
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  try {
    const [post, recentPostsData] = await Promise.all([
      blogService.getPostBySlug(slug),
      blogService.getPosts({ limit: 7 }),
    ]);

    const otherPosts = recentPostsData.results.filter((p: BlogPost) => p.slug !== slug);

    return (
      <section className="w-full bg-[#171614] text-white pb-24">
        <div className="max-w-[996px] mx-auto px-4 md:px-6 pt-16">
          <BlogArticleClient locale={typedLocale} post={post} />
        </div>

        <OtherPostsSection locale={typedLocale} posts={otherPosts} />
      </section>
    );
  } catch {
    notFound();
  }
}
