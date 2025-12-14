/**
 * Navigation arrows component for season carousel
 */

import { ColorVariant } from "./types";

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  colorVariant: ColorVariant;
}

export default function NavigationArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  colorVariant,
}: NavigationArrowsProps) {
  const arrowBaseClasses =
    "w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all";

  const getArrowClasses = (canNavigate: boolean) => {
    return `${arrowBaseClasses} ${
      canNavigate
        ? `${colorVariant.arrowFillBg} ${colorVariant.arrowFillBorder} ${colorVariant.arrowFillText} cursor-pointer hover:scale-110`
        : `${colorVariant.arrowDisabledBorder} ${colorVariant.arrowDisabledText} cursor-not-allowed`
    }`;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={getArrowClasses(canPrev)}
      >
        ←
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className={getArrowClasses(canNext)}
      >
        →
      </button>
    </div>
  );
}
