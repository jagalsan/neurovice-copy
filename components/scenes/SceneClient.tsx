"use client";

import { useEffect } from "react";
import Card from "@/components/Card";
import HeroVideo from "@/components/HeroVideo";
import ChipList from "./ChipList";
import ScreenshotGallery from "../ScreenshotGallery";
import InfoTable from "./InfoTable";
import SceneSidebar from "./SceneSidebar";
import AlsoAppearedIn from "./AlsoAppearedIn";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { CartItem } from "@/lib/stores/cart.store";
import { useT } from "@/providers";
import { PornStar } from "./types";
import { useBreadcrumbStore } from "@/lib/stores/breadcrumb.store";

interface SceneClientProps {
  title: string;
  posterSrc: string;
  screenshots: string[];
  genres: Array<{ id: number; name: string }> | string[];  
  info: [string, string][];
  requirements: [string, string][];
  stars: PornStar[];
  coverSrc: string;
  sceneCount: number;
  fileSize: string;
  description?: string;
  releaseDate?: string;
  platforms?: string[];
  cartItem: Omit<CartItem, "quantity">;
}

export default function SceneClient({
  title,
  posterSrc,
  screenshots,
  genres,
  info,
  requirements,
  stars,
  coverSrc,
  sceneCount,
  fileSize,
  description,
  releaseDate,
  platforms,
  cartItem,
}: SceneClientProps) {
  const t = useT();
  const { setCustomLabel } = useBreadcrumbStore();

  useEffect(() => {
    setCustomLabel(cartItem.id, title.toUpperCase());
  }, [cartItem.id, title, setCustomLabel]);

  return (
    <div className="w-full bg-[#171614]">
      <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
            <Card className="bg-[#111118] hidden lg:block" padded={false}>
              <HeroVideo
                src={posterSrc}
                posterSrc={coverSrc}
                showTitle
                title={title}
                subtitle=""
              />
            </Card>

            <Card className="bg-[#111118]" title={t("labels.vr_scenes_screenshots")}>
              <div className="space-y-4">
                <ScreenshotGallery screenshots={screenshots} />
              </div>
            </Card>

            <Card className="bg-[#111118]" title={t("labels.genre")}>
              <div className="space-y-4">
                <ChipList items={genres} linkable type="genre" />
              </div>
            </Card>

            <Card className="bg-[#111118]" title={t("labels.general_info")}>
              <div className="space-y-4">
                <InfoTable data={info} />
              </div>
            </Card>

            <Card
              className="bg-[#111118] mb-8"
              title={t("labels.minimum_pcvr_requirements")}
            >
              <div className="space-y-4">
                <InfoTable data={requirements} />
              </div>
            </Card>
          </div>

          <aside className="order-1 lg:order-2 lg:col-span-1">
            <Card className="bg-[#111118] block lg:hidden mb-6" padded={false}>
              <HeroVideo
                src={posterSrc}
                posterSrc={coverSrc}
                showTitle
                title={title}
                subtitle=""
              />
            </Card>
            {stars.length ? <SceneSidebar
              coverSrc={coverSrc}
              sceneCount={sceneCount}
              fileSize={fileSize}
              stars={stars}
              sceneTitle={title}
              sceneDescription={description}
              releaseDate={releaseDate}
              platforms={platforms}
              cartItem={cartItem}
            /> : null}

          </aside>
        </div>
      </div>
    </div>
  );
}
