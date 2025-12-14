"use client";

import Image from "next/image";

interface StarSceneCardProps {
  sceneId: number;
  mainImageUrl?: string;
  title: string;
  gridColor: string;
}

export default function StarSceneCard({
  sceneId,
  mainImageUrl,
  title,
  gridColor,
}: StarSceneCardProps) {
  return (
    <div
      key={sceneId}
      className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden bg-[#171614]"
    >

        <Image
          src={mainImageUrl || "/mock/example_3_x.png"}
          alt={title}
          fill
          className="object-cover"
        />
    </div>
  );
}
