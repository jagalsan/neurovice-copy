import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { seasonsService } from "@/lib/api/services";
import { notFound } from "next/navigation";

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
  const { slug } = await params;
  const seasonId = Number(slug);

  if (isNaN(seasonId) || seasonId <= 0) {
    notFound();
  }

  try {
    const seasonData = await seasonsService.getSeasonById(seasonId);
    
    return (
      <div className="min-h-screen bg-[#171614] text-white">
        <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10">
          <h1 className="text-4xl font-heading mb-4">{seasonData.title}</h1>
          {seasonData.description && (
            <p className="text-lg text-white/70 mb-8">{seasonData.description}</p>
          )}
          
          {/* TODO: Implementar componente de detalle de season */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonData.scenes?.map((scene) => (
              <div key={scene.id} className="bg-[#111118] rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{scene.title}</h3>
                {scene.description && (
                  <p className="text-white/60 text-sm">{scene.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
