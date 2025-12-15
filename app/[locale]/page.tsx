import SeasonsSection from "@/components/seasons/SeasonsSection";
import HeroVideo from "@/components/HeroVideo";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import { seasonsService } from "@/lib/api/services";
import { redirect } from "next/navigation";
import { isServerError, getMaintenancePath } from "@/lib/utils/server-error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.home_title",
    descriptionKey: "seo.home_description",
    path: "",
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let seasons: Awaited<ReturnType<typeof seasonsService.getSeasons>>["results"] = [];

  try {
    const seasonsResponse = await seasonsService.getSeasons({
      limit: 50,
      offset: 0,
    });
    seasons = seasonsResponse.results;
  } catch (error) {
    console.error("[Home] Failed to fetch seasons:", error);
    if (isServerError(error)) {
      redirect(getMaintenancePath(locale));
    }
  }

  return (
    <div className="min-h-screen">
      <HeroVideo src="/mock/video.mp4" posterSrc="/mock/video-placeholder.jpg" />
      <SeasonsSection seasons={seasons} />
    </div>
  );
}
