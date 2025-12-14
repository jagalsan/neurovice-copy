"use client";

import { ArrowRightIcon } from "lucide-react";
import { ColorVariant } from "./types";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";

interface SeasonHeaderProps {
  seasonId: number;
  title: string;
  description?: string;
  sceneCount: number;
  colorVariant: ColorVariant;
  t: (key: string) => string;
}

export default function SeasonHeader({
  seasonId,
  title,
  description,
  sceneCount,
  colorVariant,
  t,
}: SeasonHeaderProps) {
  const locale = useLocale();

  return (
    <div className="pl-4 flex flex-col max-w-[380px]">
      <p
        className={`font-heading text-lg md:text-4xl tracking-[0.18em] uppercase mb-[10px] ${colorVariant.text}`}
      >
        {title}
      </p>
      <p
        className={`font-heading text-md md:text-2xl tracking-[0.18em] uppercase mb-[10px] ${colorVariant.text}`}
      >
        {sceneCount} {sceneCount === 1 ? t("labels.chapter") : t("labels.chapters")}
      </p>
      <p
        className={`text-[16px] leading-relaxed max-w-sm mb-[30px] uppercase ${colorVariant.text}`}
      >
        {description || t("messages.exclusive_content_quality")}
      </p>

      <Link href={`/${locale}/seasons/${seasonId}`}>
        <button
          className={[
            "inline-flex items-center justify-center gap-[10px] w-full md:min-w-[400px]",
            "h-[56px] md:h-[67px] px-4 md:px-[10px] py-[16px] md:py-[20px]",
            "rounded-[12px] border border-white/10",
            "font-heading text-[14px] md:text-[16px] font-bold tracking-[0.18em] md:tracking-[0.24em] uppercase text-white",
            colorVariant.buttonBg,
            colorVariant.buttonShadow,
            "transition-all hover:brightness-110",
          ].join(" ")}
        >
          <span className="flex items-center gap-2">
            <span>{t("actions.explore_all")}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </button>
      </Link>
    </div>
  );
}
