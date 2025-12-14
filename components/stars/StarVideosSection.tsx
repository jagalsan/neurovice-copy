"use client";

import Button from "@/components/ui/Button";
import { useT } from "@/providers/I18nProvider";
import StarSceneCard from "./StarSceneCard";
import type { PornStar } from "@/lib/api/types";

interface StarVideosSectionProps {
  starName: string;
  surname: string;
  scenePornStars: PornStar["scenePornStars"];
  onBuyAll: () => void;
  gridColor: string;
}

export default function StarVideosSection({
  starName,
  surname,
  scenePornStars,
  onBuyAll,
  gridColor,
}: StarVideosSectionProps) {
  const t = useT();

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-6 -inset-y-6 z-0 mt-[110px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "26px 26px",
        }}
      />
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <div className="pl-1 flex flex-col justify-between">
            <div>
              <h3
                className="font-heading text-[40px] leading-[0.95] md:text-[56px] text-[#17FBF8] uppercase text-glow-cyan"
              >
                {starName.toUpperCase()}
                <br />
                {surname.toUpperCase()}
              </h3>

              <p className="mt-4 font-heading text-[11px] tracking-[0.24em] uppercase text-[#7FF7F5]">
                {t("labels.all_videos")}
              </p>

              <Button
                variant="primary"
                className="mt-4"
                onClick={onBuyAll}
              >
                {t("actions.buy_all")}
              </Button>
            </div>
          </div>

          {scenePornStars.slice(0, 3).map((scenePornStar) => (
            <StarSceneCard
              key={scenePornStar.sceneId}
              sceneId={scenePornStar.sceneId}
              mainImageUrl={scenePornStar.scene.mainImageUrl}
              title={scenePornStar.scene.title}
              gridColor={gridColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {scenePornStars.slice(3).map((scenePornStar) => (
            <StarSceneCard
              key={scenePornStar.sceneId}
              sceneId={scenePornStar.sceneId}
              mainImageUrl={scenePornStar.scene.mainImageUrl}
              title={scenePornStar.scene.title}
              gridColor={gridColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
