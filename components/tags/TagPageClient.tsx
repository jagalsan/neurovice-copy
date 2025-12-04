"use client";

import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import TagChaptersGridAnimated from "@/components/tags/TagChaptersGridAnimated";
import { useT } from "@/providers/I18nProvider";
import { primaryButtonBase } from "@/lib/styles/buttons";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import type { Tag } from "@/lib/api/types";

interface TagPageClientProps {
  tagData: Tag | null;
}

export default function TagPageClient({ tagData }: TagPageClientProps) {
  const t = useT();
  const locale = useLocale();

  const PLACEHOLDER_IMAGE = "/placeholder-scene.jpg";
  
  const scenes = tagData?.sceneTags.map(sceneTag => sceneTag.scene) || [];
  const hasScenes = scenes.length > 0;
  const scenesPerPage = 12;
  const totalPages = Math.ceil(scenes.length / scenesPerPage);
  
  const chapters = scenes.map((scene) => ({
    coverSrc: scene.mainImageUrl || PLACEHOLDER_IMAGE,
    coverAlt: scene.title,
    title: scene.title,
    platforms: ["META", "WINDOWS", "APK"] as string[],
    accentColor: "#17FBF8",
    viewMoreHref: `/scenes/${scene.id}`,
    cartItem: {
      id: `scene-${scene.id}`,
      title: scene.title,
      price: 19.99,
      imageSrc: scene.mainImageUrl || PLACEHOLDER_IMAGE,
    },
  }));

  const tagName = tagData!.name;

  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8 space-y-12 max-w-[944px]">
      <Card className="bg-[transparent] space-y-0">
        <span
          className="text-[10px] md:text-xs font-[600] uppercase text-[#17FBF8] mb-0"
          style={{ textShadow: "0 0 15px #00FFFC" }}
        >
          {t("views.tags")}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8] mb-8 mt-0">
          {tagName.toUpperCase()}
        </h1>

        <h2 className="font-heading text-lg md:text-2xl text-[#17FBF8]">
          {t("messages.best_tag_var", { param: tagName.toUpperCase() })}
        </h2>

        <p className="max-w-[980px] text-[14px] md:text-[15px] text-[#17FBF8] mb-8 uppercase">
          {t("messages.tag_description_var", { param: tagName.toUpperCase() })}
        </p>

        <h3 className="font-heading text-sm md:text-base uppercase text-[#17FBF8]">
          {t("messages.what_makes_tag_special", { param: tagName.toUpperCase() })}
        </h3>

        <p className="max-w-[980px] text-[14px] md:text-[15px] leading-relaxed text-[#17FBF8] mb-4 uppercase">
          {t("messages.vr_porn_special_description")}
        </p>

        {tagData && (
          <div className="flex flex-wrap gap-2 pt-2 mb-8">
            <span
              className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase"
              style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
            >
              {tagName}
            </span>
          </div>
        )}

        <Link href={`/${locale}/subscription`} className={primaryButtonBase}>
          <span className="relative z-10">
            {t("actions.unlock_with_subscription")}
          </span>
        </Link>
      </Card>

      <Card title={`Chapters tagged as #${tagName}`}>
        {hasScenes ? (
          <TagChaptersGridAnimated chapters={chapters} />
        ) : (
          <div className="text-center py-12">
            <p className="text-[#17FBF8] text-lg">
              {t("messages.no_scenes_for_tag", { param: tagName })}
            </p>
            <p className="text-[#17FBF8]/60 text-sm mt-2">
              {t("messages.check_back_later_tag_content", { param: tagName })}
            </p>
          </div>
        )}
      </Card>
      
      {hasScenes && totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
    </section>
  );
}
