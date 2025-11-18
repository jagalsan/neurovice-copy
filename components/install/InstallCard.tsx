import { useState, type CSSProperties } from "react";
import { Download, SquareArrowUpRightIcon } from "lucide-react";
import type { InstallVariant } from "./types";
import { variantStyles } from "./types";
import { InstallCardHeader } from "./InstallCardHeader";
import { InstallCardContent } from "./InstallCardContent";

interface InstallCardProps {
  variant: InstallVariant;
  tagLabel: string;
  platformLabel: string;
  title: string;
  description: string;
  extraLabel?: string;
  primaryLabel: string;
  secondaryLabel: string;
  onHowToInstall?: () => void;
}

export function InstallCard({
  variant,
  tagLabel,
  platformLabel,
  title,
  description,
  extraLabel,
  primaryLabel,
  secondaryLabel,
  onHowToInstall,
}: InstallCardProps) {
  const styles = variantStyles[variant];

  const accentStyle = {
    "--accent-color": styles.accent,
  } as CSSProperties;

  const gridBg =
    variant === "meta"
      ? {
          backgroundImage: `
            linear-gradient(to right, rgba(23,251,248,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(23,251,248,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }
      : undefined;

  return (
    <div className="flex flex-col w-full h-full" style={accentStyle}>
      <article
        className={`
          relative flex flex-col flex-1 rounded-[20px] px-6 pt-6 pb-7 overflow-hidden z-4
          ${styles.cardBg} ${styles.textColor}
        `}
        style={gridBg}
      >
        <InstallCardHeader variant={variant} styles={styles} tagLabel={tagLabel} />
        
        <InstallCardContent
          platformLabel={platformLabel}
          title={title}
          description={description}
          extraLabel={extraLabel}
        />

        <button
          className={`
            mt-auto w-full h-[72px]
            rounded-[10px]
            flex items-center justify-center gap-3
            font-heading text-[15px] tracking-[0.18em] uppercase
            hover:translate-y-[-2px]
            transition-transform duration-300 ease-in-out
            ${
              variant === "windows"
                ? "bg-[#3B342F] text-[#F9E4D0]"
                : variant === "apk"
                  ? "bg-[#2256D8] text-white"
                  : "bg-[#17FBF8] text-[#050608]"
            }
          `}
        >
          {variant === "meta" ? (
            <SquareArrowUpRightIcon className="w-5 h-5" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span>{primaryLabel}</span>
        </button>
      </article>

      <button
        onClick={onHowToInstall}
        className="
          relative mt-[-8px] h-[77px] w-[90%] mx-auto
          rounded-b-[15px]
          flex items-center justify-center
          overflow-hidden
          z-2
          hover:translate-y-[-2px]
          transition-transform duration-300 ease-in-out
        "
        style={{
          backgroundColor: styles.bottomBgColor,
        }}
      >
        <div
          className={`
            absolute inset-[15px]
            rounded-[10px]
            border ${styles.bottomBorderColor}
            bg-transparent
          `}
        />
        <span className={`relative z-10 flex items-center gap-2 font-heading text-[13px] tracking-[0.24em] uppercase ${styles.bottomTextColor}`}>
          <SquareArrowUpRightIcon className="w-4 h-4" />
          {secondaryLabel}
        </span>
      </button>
    </div>
  );
}
