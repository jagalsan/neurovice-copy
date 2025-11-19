import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/config";
import TagPageClient from "@/components/tags/TagPageClient";

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
  const tag = decodeURIComponent(paramsAux.slug || "").toUpperCase();

  return <TagPageClient tag={tag} />;
}
