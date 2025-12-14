"use client";

import Card from "@/components/Card";
import Image from "next/image";
import { ApkIcon, MetaIcon, WindowsIcon } from "../../icons/PlatformIcons";
import { useT } from "@/providers";

interface SceneInfoCardProps {
  coverSrc: string;
  sceneTitle: string;
  sceneDescription?: string;
  releaseDate?: string;
  platforms?: string[];
}

export default function SceneInfoCard({
  coverSrc,
  sceneTitle,
  sceneDescription,
  releaseDate,
  platforms = [],
}: SceneInfoCardProps) {
  const t = useT();

  return (
    <Card className="bg-[#111118]">
      <div>
        {coverSrc && (
          <div className="relative w-full h-[150px] md:h-[190px] mb-[16px]">
            <Image
              src={coverSrc}
              alt={sceneTitle}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div>
          {releaseDate && (
            <p
              className="uppercase text-[12px] text-[#17FBF8] mb-[8px] text-glow"
            >
              {t("labels.release")}: {new Date(releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          )}

          {platforms.length > 0 && (
            <div className="flex items-center gap-4 text-[#A6FFFF]">
              {platforms.includes('META QUEST') && <MetaIcon className="w-6 h-6 opacity-50" />}
              {platforms.includes('WINDOWS PCVR') && <WindowsIcon className="w-6 h-6 opacity-50" />}
              {platforms.includes('ANDROID') && <ApkIcon className="w-6 h-6 opacity-50" />}
            </div>
          )}
        </div>

        <h4 className="font-heading uppercase text-[#17FBF8] text-[24px] mt-[8px]">
          {sceneTitle}
        </h4>

        {sceneDescription && (
          <p className="uppercase text-[#17FBF8] text-[16px] mt-[16px]">
            {sceneDescription}
          </p>
        )}
      </div>
    </Card>
  );
}