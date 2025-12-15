import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import SceneClient from "@/components/scenes/SceneClient";
import { scenesService } from "@/lib/api/services";
import { redirect } from "next/navigation";
import { PLACEHOLDER_IMAGE, PLACEHOLDER_VIDEO } from "@/lib/constants";
import { isServerError, getMaintenancePath } from "@/lib/utils/server-error";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
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
  const { locale, slug } = await params;
  const sceneId = Number(slug);

  if (isNaN(sceneId) || sceneId <= 0) {
    redirect(`/${locale}`);
  }

  try {
    const sceneData = await scenesService.getSceneById(sceneId);

    const stars =
      sceneData.scenePornStars?.map((sp) => ({
        ...sp.pornStar,
        name: `${sp.pornStar.name} ${sp.pornStar.surname}`.trim(),
        slug: `${sp.pornStar.id}`,
        image: sp.pornStar.profileImage || "/mock/example_1_x.png",
        bio: sp.pornStar.bio || "",
        tags:
          sp.pornStar.pornStarsTags?.map((t) => t.tag.name.toUpperCase()) || [],
      })) || [];

    const firstPornStar = sceneData.scenePornStars?.[0]?.pornStar;
    const starName = firstPornStar
      ? `${firstPornStar.name} ${firstPornStar.surname}`.trim()
      : "Unknown";

    const screenshots = sceneData.sceneImages?.map((img) => img.imageUrl) || [];

    const genres =
      sceneData.sceneTags?.map((st) => ({
        id: st.tag.id,
        name: st.tag.name.toUpperCase(),
      })) || [];

    const platforms = [
      "WINDOWS PCVR",
      "META QUEST 3/3S",
      "PICO 4 ULTRA",
      "HTC VIVE",
      "VALVE INDEX",
    ];

    const info: [string, string][] = [];

    if (sceneData.releaseDate) {
      info.push(["RELEASE DATE", sceneData.releaseDate]);
    } else if (sceneData.createdAt) {
      info.push([
        "RELEASE DATE",
        new Date(sceneData.createdAt).toLocaleDateString(),
      ]);
    }
    info.push(["PLATFORMS", platforms.join(", ")]);
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

    const requirements: [string, string][] = [
      ["DEVICE SUPPORT", "ANY PCVR HEADSET WITH OPENXR RUNTIME SUPPORT"],
      ["OS", "MS WINDOWS 10"],
      ["CPU", "INTEL CORE I3 OR AMD RYZEN 3 3200"],
      ["GPU", "NVIDIA RTX 2060 OR AMD RX 5600 WITH LATEST DRIVERS"],
      ["RAM", "8GB"],
      ["DISK SPACE", "15GB"],
    ];

    const eurPrice = sceneData.prices.find((p) => p.currency === "EUR");
    const oldPrice = null;

    return (
      <SceneClient
        title={sceneData.title}
        posterSrc={sceneData.mainVideoUrl || PLACEHOLDER_VIDEO}
        screenshots={screenshots}
        genres={genres}
        info={info}
        requirements={requirements}
        stars={stars}
        coverSrc={sceneData.mainImageUrl || PLACEHOLDER_IMAGE}
        sceneCount={sceneData.season?.id || 1}
        fileSize={sceneData.fileSize || "N/A"}
        description={sceneData.description}
        releaseDate={sceneData.releaseDate || sceneData.createdAt}
        platforms={platforms}
        cartItem={{
          id: sceneData.id.toString(),
          title: sceneData.title,
          price: eurPrice?.amount ?? 0,
          oldPrice: oldPrice,
          imageSrc: sceneData.mainImageUrl || PLACEHOLDER_IMAGE,
        }}
      />
    );
  } catch (error) {
    if (isServerError(error)) {
      redirect(getMaintenancePath(locale));
    }
    redirect(`/${locale}`);
  }
}
