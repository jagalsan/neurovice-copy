import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/config";
import StarsPageClient from "@/components/stars/StarsPageClient";
import { pornStarsService } from "@/lib/api/services";
import type { PornStar } from "@/lib/api/types";
import { redirect } from "next/navigation";
import { isServerError, getMaintenancePath } from "@/lib/utils/server-error";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.stars_title",
    descriptionKey: "seo.stars_description",
    path: `/stars`,
  });
}

export default async function StarsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let pornStarsData: PornStar[] = [];
  
  try {
    const pornStarsResponse = await pornStarsService.getPornStars();
    pornStarsData = pornStarsResponse.pornStars as PornStar[];
  } catch (error) {
    console.error("Failed to fetch pornstars:", error);
    if (isServerError(error)) {
      redirect(getMaintenancePath(locale));
    }
  }

  return <StarsPageClient pornStarsData={pornStarsData} />;
}
