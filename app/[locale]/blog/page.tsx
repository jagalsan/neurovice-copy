import { BlogPageClient } from "@/components/blog/BlogPageClient";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.blog_title",
    descriptionKey: "seo.blog_description",
    path: "/blog",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <Suspense fallback={null}>
      <BlogPageClient locale={typedLocale} />
    </Suspense>
  );
}
