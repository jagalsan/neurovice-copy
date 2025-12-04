"use client";

import Card from "@/components/Card";
import HeroVideo from "@/components/HeroVideo";
import ChipList from "./ChipList";
import ScreenshotGallery from "../ScreenshotGallery";
import InfoTable from "./InfoTable";
import SceneSidebar from "./SceneSidebar";
import AlsoAppearedIn from "./AlsoAppearedIn";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { CartItem } from "@/lib/stores/cart.store";

interface SceneClientProps {
  title: string;
  posterSrc: string;
  screenshots: string[];
  features: string[];
  genres: Array<{ id: number; name: string }> | string[];  
  info: [string, string][];
  requirements: [string, string][];
  starName: string;
  starSlug: string;
  starImage: string;
  starBio?: string;
  starTags?: string[];
  coverSrc: string;
  sceneCount: number;
  fileSize: string;
  description?: string;
  releaseDate?: string;
  platforms?: string[];
  cartItem: Omit<CartItem, "quantity">;
  allScenesCartItem: Omit<CartItem, "quantity">;
  alsoAppearedItems: Array<{ coverSrc: string; coverAlt: string }>;
}

export default function SceneClient({
  title,
  posterSrc,
  screenshots,
  features,
  genres,
  info,
  requirements,
  starName,
  starSlug,
  starImage,
  coverSrc,
  sceneCount,
  fileSize,
  description,
  releaseDate,
  platforms,
  starBio,
  starTags,
  cartItem,
  allScenesCartItem,
  alsoAppearedItems,
}: SceneClientProps) {
  const { addToCart } = useAddToCart();

  const handleBuyAll = () => {
    addToCart(allScenesCartItem);
  };

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

            <Card className="bg-[#111118]" title="VR scenes (screenshots)">
              <div className="space-y-4">
                <ScreenshotGallery screenshots={screenshots} />
              </div>
            </Card>

            <Card className="bg-[#111118]" title="Features">
              <div className="space-y-4">
                <ChipList items={features} interactive={false} />
              </div>
            </Card>

            <Card className="bg-[#111118]" title="Genre">
              <div className="space-y-4">
                <ChipList items={genres} linkable type="genre" />
              </div>
            </Card>

            <Card className="bg-[#111118]" title="General info">
              <div className="space-y-4">
                <InfoTable data={info} />
              </div>
            </Card>

            <Card
              className="bg-[#111118] mb-8"
              title="Minimum system requirements for PCVR"
            >
              <div className="space-y-4">
                <InfoTable data={requirements} />
              </div>
            </Card>

            <AlsoAppearedIn
              name={starName}
              items={alsoAppearedItems}
              onBuyAll={handleBuyAll}
            />
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
            
            <SceneSidebar
              coverSrc={coverSrc}
              sceneCount={sceneCount}
              fileSize={fileSize}
              starName={starName}
              starSlug={starSlug}
              starImage={starImage}
              starBio={starBio}
              starTags={starTags}
              sceneTitle={title}
              sceneDescription={description}
              releaseDate={releaseDate}
              platforms={platforms}
              cartItem={cartItem}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
