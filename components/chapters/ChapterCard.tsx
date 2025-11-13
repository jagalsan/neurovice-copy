"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  MetaIcon,
  WindowsIcon,
  ApkIcon,
} from "@/components/icons/PlatformIcons";
import { useT } from "@/providers/I18nProvider";
import { useAddToCart } from "@/lib/hooks/useAddToCart";

export type ChapterCardProps = {
  coverSrc: string;
  coverAlt: string;
  title: string;
  releaseLabel: string;
  platforms?: string[];
  accentColor: string;
  viewMoreHref?: string;
  buyHref?: string;
};

const platformIconMap: Record<string, React.ComponentType<any>> = {
  META: MetaIcon,
  WINDOWS: WindowsIcon,
  APK: ApkIcon,
};

export default function ChapterCard({
  coverSrc,
  coverAlt,
  title,
  releaseLabel,
  platforms = ["META", "WINDOWS", "APK"],
  accentColor,
  viewMoreHref = "#",
  buyHref = "#",
}: ChapterCardProps) {
  const t = useT();
  const accentStyle = {
    "--accent-color": accentColor,
  } as CSSProperties;

  const { addToCart } = useAddToCart();

  return (
    <article
      style={accentStyle}
      className="flex flex-col items-start text-left"
    >
      <div className="w-full flex justify-center">
        <div className="relative w-full pt-[140%]">
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)] z-4"
          />
        </div>
      </div>

      <div className="mt-[8px] w-ful">
        <p
          className="text-[12px] font-[500] tracking-[0.25em] uppercase text-[color:var(--accent-color)] mb-[8px]"
          style={{
            textShadow: `0 0 15px ${accentColor}`,
          }}
        >
          {releaseLabel}
        </p>

        {platforms.length > 0 && (
          <div className="flex items-center gap-3 mb-[8px]">
            {platforms.map((p) => {
              const key = p.toUpperCase();
              const IconComponent = platformIconMap[key];

              if (!IconComponent) {
                return (
                  <span
                    key={p}
                    className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--accent-color)]"
                  >
                    {p}
                  </span>
                );
              }

              return (
                <div key={p} className="flex items-center justify-center">
                  <IconComponent className="w-[22px] h-[22px] text-[color:var(--accent-color)]" />
                  <span className="sr-only">{key}</span>
                </div>
              );
            })}
          </div>
        )}

        <h3 className="font-heading uppercase text-[20px] leading-none text-[color:var(--accent-color)] mb-[8px]">
          {title}
        </h3>

        <div className="flex gap-3 text-[11px] font-heading uppercase tracking-[0.18em]">
          <Link
            href={viewMoreHref}
            className="
              flex-1 h-10 px-4
              rounded-full border border-[color:var(--accent-color)]
              text-[color:var(--accent-color)]
              flex items-center justify-center
              hover:bg-[color:var(--accent-color)] hover:text-black
              transition-colors duration-200
              text-[15px]
            "
          >
            {t("actions.view_more")}
          </Link>
          <button
            onClick={() => addToCart({
              id: "turbofap-1year",
              title: "TURBOFAP",
              subtitle: "1 YEAR SUBSCRIPTION",
              oldPrice: 480,
              price: 149,
              imageSrc: "/mock/video_placeholder.png",
            })}
            className="
              h-10
              px-4
              rounded-full border border-[color:var(--accent-color)]
              text-[color:var(--accent-color)]
              flex items-center justify-center
              hover:bg-[color:var(--accent-color)] hover:text-black
              transition-colors duration-200
              text-[15px]
            "
          >
            {t("actions.buy")}
          </button>
        </div>
      </div>
    </article>
  );
}
