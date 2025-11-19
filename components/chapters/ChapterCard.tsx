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
import { CartItem } from "@/lib/stores/cart.store";

export type ChapterCardProps = {
  coverSrc: string;
  coverAlt: string;
  title: string;
  releaseLabel: string;
  platforms?: string[];
  accentColor: string;
  viewMoreHref?: string;
  cartItem?: CartItem;
  variant?: "default" | "stars";
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
  cartItem,
  variant = "default",
}: ChapterCardProps) {
  const t = useT();
  const { addToCart } = useAddToCart();

  const accentStyle = { "--accent-color": accentColor } as CSSProperties;

  return (
    <div
      style={accentStyle}
      className={`flex flex-col items-start text-left ${
        variant === "stars" ? "max-w-[300px]" : ""
      }`}
    >
      <div className="w-full flex justify-center">
        <div
          className={`relative w-full overflow-hidden rounded-[18px] ${
            variant === "stars" ? "min-w-[291px] min-h-[410px]" : "pt-[140%]"
          }`}
        >
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            className={`${
              variant === "stars"
                ? "object-cover rounded-[18px] border-[2px] border-[#17FBF899]"
                : "object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
            } z-10`}
          />

          {variant === "stars" && (
            <div
              className="
          pointer-events-none absolute inset-[2px] rounded-[16px] z-20
        "
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.35) 36%, rgba(0,0,0,0.18) 56%, rgba(0,0,0,0) 78%)",
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-[8px] w-full">
        <p
          className="text-[12px] font-[500] tracking-[0.25em] uppercase text-[color:var(--accent-color)] mb-[8px]"
          style={{ textShadow: `0 0 15px ${accentColor}` }}
        >
          {releaseLabel}
        </p>

        {platforms.length > 0 && (
          <div className="flex items-center gap-3 mb-[8px]">
            {platforms.map((p) => {
              const key = p.toUpperCase();
              const Icon = platformIconMap[key];
              if (!Icon) {
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
                  <Icon className="w-[22px] h-[22px] text-[color:var(--accent-color)]" />
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
            className="flex-1 h-10 px-4 rounded-full border border-[color:var(--accent-color)] text-[color:var(--accent-color)] flex items-center justify-center hover:bg-[color:var(--accent-color)] hover:text-black transition-colors duration-200 text-[15px] max-w-[150px]"
          >
            {t("actions.view_more")}
          </Link>
          {cartItem ? (
            <button
            onClick={() =>
              addToCart(cartItem!)
            }
            className="h-10 px-4 rounded-full border border-[color:var(--accent-color)] text-[color:var(--accent-color)] flex items-center justify-center hover:bg-[color:var(--accent-color)] hover:text-black transition-colors duration-200 text-[15px] uppercase"
          >
            {t("actions.buy")}
          </button>
          ) : ''}
        </div>
    </div>
    </div>
  );
}
