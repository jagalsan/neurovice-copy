import SeasonsSection from "@/components/seasons/SeasonsSection";
import HeroVideo from "@/components/HeroVideo";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import { seasonsService } from "@/lib/api/services";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.home_title",
    descriptionKey: "seo.home_description",
    path: "",
  });
}

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  
  const seasonsResponse = await seasonsService.getSeasons({
    limit: 50,
    offset: 0
  });

  return (
    <div className="min-h-screen">
      <HeroVideo 
        src="/hero-video.mp4"
        posterSrc="/hero-poster.jpg"
      />
      <SeasonsSection seasons={seasonsResponse.results} />
    </div>
  );
}
