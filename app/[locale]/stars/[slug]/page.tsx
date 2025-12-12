import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import StarDetailClient from "@/components/stars/StarDetailClient";
import { pornStarsService } from "@/lib/api/services";
import type { PornStar } from "@/lib/api/types";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.stars_title",
    descriptionKey: "seo.stars_description",
    path: `/stars/${slug}`,
  });
}

export default async function StarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const starId = Number(decodeURIComponent(slug));
  
  if (isNaN(starId) || starId <= 0) {
    redirect('/stars');
  }
  
  let starData: PornStar | null = null;
  try {
    const starResponse = await pornStarsService.getPornStarById(starId);
    starData = starResponse;
    console.log("Star response:", starResponse.scenePornStars[0]);
    
    if (!starData) {
      redirect('/stars');
    }
  } catch (error) {
    console.error("Failed to fetch star:", error);
    redirect('/stars');
  }

  return <StarDetailClient starData={starData} />;
}
