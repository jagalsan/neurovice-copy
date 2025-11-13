import type { InstallVariant, VariantStyles } from "./types";
import { PlatformIcon } from "./PlatformIcon";

interface InstallCardHeaderProps {
  variant: InstallVariant;
  styles: VariantStyles;
  tagLabel: string;
}

export function InstallCardHeader({ variant, styles, tagLabel }: InstallCardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-2">
        <PlatformIcon variant={variant} styles={styles} />
      </div>

      <div
        className={`
          inline-flex items-center px-4 py-2 rounded-[4px]
          text-[16px] uppercase
          ${styles.tagBg} ${styles.tagText}
        `}
      >
        {tagLabel}
      </div>
    </div>
  );
}
