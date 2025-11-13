import { ApkIcon, MetaIcon, WindowsIcon } from "@/components/icons/PlatformIcons";
import type { InstallVariant, VariantStyles } from "./types";

interface PlatformIconProps {
  variant: InstallVariant;
  className?: string;
  styles: VariantStyles;
}

const iconMap = {
  windows: WindowsIcon,
  apk: ApkIcon,
  meta: MetaIcon,
};

export function PlatformIcon({ variant, className = "w-[30px] h-[30px]", styles }: PlatformIconProps) {
  const IconComponent = iconMap[variant];
  
  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      <IconComponent className={`${className} ${styles.iconColor}`} />
    </div>
  );
}
