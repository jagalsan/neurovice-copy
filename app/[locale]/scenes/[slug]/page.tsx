import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import SceneClient from "@/components/scenes/SceneClient";
import { scenesService } from "@/lib/api/services";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.scenes_title",
    descriptionKey: "seo.scenes_description",
    path: `/scenes/${slug}`,
  });
}

export default async function SceneDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const sceneId = Number(slug);

  if (isNaN(sceneId) || sceneId <= 0) {
    notFound();
  }

  try {
    const sceneData = await scenesService.getSceneById(sceneId);

    const firstPornStar = sceneData.scenePornStars?.[0]?.pornStar;
    const starName = firstPornStar 
      ? `${firstPornStar.name} ${firstPornStar.surname}`.trim()
      : "Unknown";
    
    const screenshots = sceneData.sceneImages?.map(img => img.imageUrl) || [];
    
    const features = sceneData.features || [];
    
    const genres = sceneData.sceneTags?.map(st => ({
      id: st.tag.id,
      name: st.tag.name.toUpperCase()
    })) || [];
    
    const info: [string, string][] = [];
    
    if (sceneData.releaseDate) {
      info.push(["RELEASE DATE", sceneData.releaseDate]);
    } else if (sceneData.createdAt) {
      info.push(["RELEASE DATE", new Date(sceneData.createdAt).toLocaleDateString()]);
    }
    if (sceneData.platforms && sceneData.platforms.length > 0) {
      info.push(["PLATFORMS", sceneData.platforms.join(", ")]);
    }
    if (starName && starName !== "Unknown") {
      info.push(["PORNSTAR", starName]);
    }
    if (sceneData.language) {
      info.push(["LANGUAGE", sceneData.language]);
    }
    if (sceneData.resolution) {
      info.push(["RESOLUTION", sceneData.resolution]);
    }
    if (sceneData.degree) {
      info.push(["DEGREE", sceneData.degree]);
    }
    
    const requirements: [string, string][] = [];
    
    if (sceneData.requirements?.deviceSupport) {
      requirements.push(["DEVICE SUPPORT", sceneData.requirements.deviceSupport]);
    }
    if (sceneData.requirements?.os) {
      requirements.push(["OS", sceneData.requirements.os]);
    }
    if (sceneData.requirements?.cpu) {
      requirements.push(["CPU", sceneData.requirements.cpu]);
    }
    if (sceneData.requirements?.gpu) {
      requirements.push(["GPU", sceneData.requirements.gpu]);
    }
    if (sceneData.requirements?.ram) {
      requirements.push(["RAM", sceneData.requirements.ram]);
    }
    if (sceneData.requirements?.diskSpace || sceneData.fileSize) {
      requirements.push(["DISK SPACE", sceneData.requirements?.diskSpace || sceneData.fileSize!]);
    }

    const eurPrice = sceneData.prices.find(p => p.currency === "EUR");
    const price = eurPrice ? Number((eurPrice.amount / 100).toFixed(2)) : 19.99;
    const oldPrice = Number((price * 1.5).toFixed(2));

    const starBio = firstPornStar?.bio || "";
    const starTags = firstPornStar?.pornStarsTags?.map(t => t.tag.name.toUpperCase()) || [];

    const PLACEHOLDER_IMAGE = "/placeholder-scene.jpg";
    const PLACEHOLDER_VIDEO = "/placeholder-video.mp4";

    return (
      <SceneClient
        title={sceneData.title}
        posterSrc={sceneData.mainVideoUrl || PLACEHOLDER_VIDEO}
        screenshots={screenshots}
        features={features}
        genres={genres}
        info={info}
        requirements={requirements}
        starName={starName}
        starSlug={firstPornStar ? `${firstPornStar.id}` : "0"}
        starImage={firstPornStar?.profileImage || PLACEHOLDER_IMAGE}
        starBio={starBio}
        starTags={starTags}
        coverSrc={sceneData.mainImageUrl || PLACEHOLDER_IMAGE}
        sceneCount={sceneData.season?.id || 1}
        fileSize={sceneData.fileSize || "N/A"}
        description={sceneData.description}
        releaseDate={sceneData.releaseDate || sceneData.createdAt}
        platforms={sceneData.platforms}
        cartItem={{
          id: sceneData.id.toString(),
          title: sceneData.title,
          price: price,
          oldPrice: oldPrice,
          imageSrc: sceneData.mainImageUrl || PLACEHOLDER_IMAGE,
        }}
        allScenesCartItem={{
          id: (sceneData.season?.id || 0).toString(),
          title: sceneData.season?.title || "All Scenes",
          price: 0,
          oldPrice: 0,
          imageSrc: sceneData.season?.mainImageUrl || PLACEHOLDER_IMAGE,
        }}
        alsoAppearedItems={[]}
      />
    );
  } catch (error) {
    notFound();
  }
}
