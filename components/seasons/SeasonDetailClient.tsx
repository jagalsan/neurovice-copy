"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useT } from "@/providers/I18nProvider";
import { useLocale } from "@/providers/LocaleProvider";
import type { Season } from "@/lib/api/types";
import { useBreadcrumbStore } from "@/lib/stores/breadcrumb.store";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import SeasonsGridAnimated from "@/components/seasons/SeasonsGridAnimated";

interface SeasonDetailClientProps {
  seasonData: Season;
}

export default function SeasonDetailClient({
  seasonData,
}: SeasonDetailClientProps) {
  const t = useT();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const { setCustomLabel } = useBreadcrumbStore();

  useEffect(() => {
    setCustomLabel(String(seasonData.id), seasonData.title.toUpperCase());
  }, [seasonData.id, seasonData.title, setCustomLabel]);

  const scenes = seasonData.scenes || [];
  const hasScenes = scenes.length > 0;
  const scenesPerPage = 12;
  const totalScenes = scenes.length;
  const totalPages = Math.ceil(totalScenes / scenesPerPage);

  const startIndex = (currentPage - 1) * scenesPerPage;
  const endIndex = startIndex + scenesPerPage;
  const currentScenes = scenes.slice(startIndex, endIndex);

  const scenesForGrid = currentScenes.map((scene) => ({
    coverSrc: scene.mainImageUrl || PLACEHOLDER_IMAGE,
    coverAlt: scene.title,
    title: scene.title,
    platforms: ["META", "WINDOWS", "APK"],
    accentColor: "#17FBF8",
    viewMoreHref: `/${locale}/scenes/${scene.id}`,
  }));

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/${locale}/seasons/${seasonData.id}?${params.toString()}`);
  };

  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8 space-y-12">
      <Card className="bg-[transparent] space-y-0">
        <span
          className="text-[10px] md:text-xs font-[600] uppercase text-[#17FBF8] mb-0 text-glow-cyan"
        >
          {t("labels.season")}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8] mb-8 mt-0">
          {seasonData.title.toUpperCase()}
        </h1>

        {seasonData.description && (
          <p className="max-w-[980px] text-[14px] md:text-[15px] text-[#17FBF8] mb-8 uppercase">
            {seasonData.description}
          </p>
        )}
      </Card>

      {hasScenes ? (
        <Card 
          className="bg-[transparent]" 
          title={`${seasonData.title.toUpperCase()} : ${t("labels.scenes")}`}
        >
          <SeasonsGridAnimated scenes={scenesForGrid} />
        </Card>
      ) : (
        <Card className="bg-[transparent]">
          <div className="text-center py-12">
            <p className="text-[#17FBF8] text-lg">
              {t("messages.no_scenes_available")}
            </p>
            <p className="text-[#17FBF8]/60 text-sm mt-2">
              {t("messages.check_back_later")}
            </p>
          </div>
        </Card>
      )}

      {hasScenes && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
