/**
 * Types for Seasons components
 */

export type ColorKey = "purple" | "yellow" | "pink" | "red";

export interface SceneCardData {
  title: string;
  releaseLabel: string;
  accentColor: string;
  coverSrc: string;
  coverAlt: string;
  platforms: string[];
  viewMoreHref: string;
  cartItem: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    oldPrice: number | null;
    imageSrc: string;
  };
}

export interface ColorVariant {
  text: string;
  gridColor: string;
  buttonBg: string;
  buttonShadow: string;
  arrowFillBg: string;
  arrowFillBorder: string;
  arrowFillText: string;
  arrowDisabledBorder: string;
  arrowDisabledText: string;
}

export const COLORS: readonly ColorKey[] = [
  "purple",
  "yellow",
  "pink",
  "red",
] as const;

export const COLOR_HEX_MAP: Record<ColorKey, string> = {
  purple: "#7A4FF4",
  yellow: "#EFB710",
  pink: "#E41D8D",
  red: "#E41D3B",
};

export const colorVariants: Record<ColorKey, ColorVariant> = {
  purple: {
    text: "text-[#7A4FF4]",
    gridColor: "rgba(122,79,244,0.25)",
    buttonBg: "bg-gradient-to-br from-[#7A4FF4] to-[#5A2FD4]",
    buttonShadow: "shadow-[0_0_30px_rgba(122,79,244,0.5)]",
    arrowFillBg: "bg-[#7A4FF4]",
    arrowFillBorder: "border-[#7A4FF4]",
    arrowFillText: "text-white",
    arrowDisabledBorder: "border-[#7A4FF4]/30",
    arrowDisabledText: "text-[#7A4FF4]/30",
  },
  yellow: {
    text: "text-[#EFB710]",
    gridColor: "rgba(239,183,16,0.25)",
    buttonBg: "bg-gradient-to-br from-[#EFB710] to-[#CF9710]",
    buttonShadow: "shadow-[0_0_30px_rgba(239,183,16,0.5)]",
    arrowFillBg: "bg-[#EFB710]",
    arrowFillBorder: "border-[#EFB710]",
    arrowFillText: "text-black",
    arrowDisabledBorder: "border-[#EFB710]/30",
    arrowDisabledText: "text-[#EFB710]/30",
  },
  pink: {
    text: "text-[#E41D8D]",
    gridColor: "rgba(228,29,141,0.25)",
    buttonBg: "bg-gradient-to-br from-[#E41D8D] to-[#C41D7D]",
    buttonShadow: "shadow-[0_0_30px_rgba(228,29,141,0.5)]",
    arrowFillBg: "bg-[#E41D8D]",
    arrowFillBorder: "border-[#E41D8D]",
    arrowFillText: "text-white",
    arrowDisabledBorder: "border-[#E41D8D]/30",
    arrowDisabledText: "text-[#E41D8D]/30",
  },
  red: {
    text: "text-[#E41D3B]",
    gridColor: "rgba(228,29,59,0.25)",
    buttonBg: "bg-gradient-to-br from-[#E41D3B] to-[#C41D2B]",
    buttonShadow: "shadow-[0_0_30px_rgba(228,29,59,0.5)]",
    arrowFillBg: "bg-[#E41D3B]",
    arrowFillBorder: "border-[#E41D3B]",
    arrowFillText: "text-white",
    arrowDisabledBorder: "border-[#E41D3B]/30",
    arrowDisabledText: "text-[#E41D3B]/30",
  },
};
