import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { seasonsService } from "@/lib/api/services";
import { redirect } from "next/navigation";
import SeasonDetailClient from "@/components/seasons/SeasonDetailClient";
import { isServerError, getMaintenancePath } from "@/lib/utils/server-error";

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
    titleKey: "seo.seasons_title",
    descriptionKey: "seo.seasons_description",
    path: `/seasons/${slug}`,
  });
}

export default async function SeasonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const seasonId = Number(slug);

  if (isNaN(seasonId) || seasonId <= 0) {
    redirect(`/${locale}`);
  }

  try {
    const seasonData = await seasonsService.getSeasonById(seasonId);
    
    return <SeasonDetailClient seasonData={seasonData} />;
  } catch (error) {
    if (isServerError(error)) {
      redirect(getMaintenancePath(locale));
    }
    redirect(`/${locale}`);
  }
}
