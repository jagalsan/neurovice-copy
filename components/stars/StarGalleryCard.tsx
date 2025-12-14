"use client";

import Card from "@/components/Card";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { useT } from "@/providers/I18nProvider";

interface StarGalleryCardProps {
  screenshots: string[];
}

export default function StarGalleryCard({ screenshots }: StarGalleryCardProps) {
  const t = useT();

  if (screenshots.length === 0) return null;

  return (
    <Card className="bg-[#111118]" title={t("labels.gallery")}>
      <div className="space-y-4">
        <ScreenshotGallery screenshots={screenshots} />
      </div>
    </Card>
  );
}
