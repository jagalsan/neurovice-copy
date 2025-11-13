export type InstallVariant = "windows" | "apk" | "meta";

export type VariantStyles = {
  cardBg: string;
  textColor: string;
  tagBg: string;
  iconColor: string;
  tagText: string;
  accent: string;
  bottomBgColor: string;
  bottomTextColor: string;
  bottomBorderColor: string;
};

export const variantStyles: Record<InstallVariant, VariantStyles> = {
  windows: {
    cardBg: "bg-[#E6D6C7]",
    textColor: "text-[#854E24]",
    tagBg: "bg-[#111118CC]",
    iconColor: "text-[#854E24]",
    tagText: "text-[#E2C8B4]",
    accent: "#111118CC",
    bottomBgColor: "#3A383A",
    bottomTextColor: "text-[#DFD1BE]",
    bottomBorderColor: "border-[#DFD1BE]",
  },
  apk: {
    cardBg: "bg-[#E6F1FF]",
    textColor: "text-[#0D2A4F]",
    tagBg: "bg-[#C3D5EC80]",
    iconColor: "text-[#2062B3]",
    tagText: "text-[#0D2A4F]",
    accent: "#2256D8",
    bottomBgColor: "#2062B3",
    bottomTextColor: "text-[#F0EFF6]",
    bottomBorderColor: "border-[#F0EFF6]",
  },
  meta: {
    cardBg: "bg-[#050B12]",
    textColor: "text-[#17FBF8]",
    tagBg: "bg-[#111118CC]",
    iconColor: "text-[#17FBF8]",
    tagText: "text-[#17FBF8]",
    accent: "#17FBF8",
    bottomBgColor: "#17FBF8",
    bottomTextColor: "text-[#111118CC]",
    bottomBorderColor: "border-[#111118CC]",
  },
};
