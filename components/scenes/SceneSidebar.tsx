"use client";

import { CartItem } from "@/lib/stores/cart.store";
import { PornStar } from "./types";
import AccessCard from "./sidebar/AccessCard";
import SceneInfoCard from "./sidebar/SceneInfoCard";
import PornStarCard from "./sidebar/PornStarCard";

interface SceneSidebarProps {
  coverSrc: string;
  sceneCount: number;
  fileSize: string;
  stars: PornStar[];
  cartItem: Omit<CartItem, "quantity">;
  sceneTitle: string;
  sceneDescription?: string;
  releaseDate?: string;
  platforms?: string[];
}

export default function SceneSidebar({
  coverSrc,
  sceneCount,
  fileSize,
  stars,
  cartItem,
  sceneTitle,
  sceneDescription,
  releaseDate,
  platforms = [],
}: SceneSidebarProps) {
  return (
    <div className="space-y-6">
      <AccessCard
        coverSrc={coverSrc}
        sceneCount={sceneCount}
        fileSize={fileSize}
        cartItem={cartItem}
      />

      <SceneInfoCard
        coverSrc={coverSrc}
        sceneTitle={sceneTitle}
        sceneDescription={sceneDescription}
        releaseDate={releaseDate}
        platforms={platforms}
      />

      <PornStarCard stars={stars} />
    </div>
  );
}
