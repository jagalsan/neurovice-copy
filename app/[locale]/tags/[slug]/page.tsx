import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/config";
import TagPageClient from "@/components/tags/TagPageClient";
import { tagsService } from "@/lib/api/services";
import type { Tag } from "@/lib/api/types";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.tags_title",
    descriptionKey: "seo.tags_description",
    path: `/tags/${slug}`,
  });
}

export default async function TagPage({ params }: { params: Params }) {
  const paramsAux = await params;
  const tagSlug = Number(decodeURIComponent(paramsAux.slug));
  
  if (isNaN(tagSlug) || tagSlug <= 0) {
    redirect('/');
  }
  
  let tagData: Tag | null = null;
  try {
    const tagsResponse = await tagsService.getTagById(tagSlug);
    tagData = tagsResponse;
    
    if (!tagData) {
      redirect('/');
    }
  } catch (error) {
    console.error("Failed to fetch tag:", error);
    redirect('/');
  }

  return <TagPageClient tagData={tagData} />;
}
