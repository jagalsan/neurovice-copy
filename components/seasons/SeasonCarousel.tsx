import { motion, AnimatePresence } from "framer-motion";
import ContentCard from "@/components/cards/ContentCard";
import { SceneCardData, ColorVariant } from "./types";

const DESKTOP_ITEMS_PER_PAGE = 3;

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

interface SeasonCarouselProps {
  scenes: SceneCardData[];
  colorVariant: ColorVariant;
  desktopStart: number;
  desktopDirection: number;
  mobileIndex: number;
  mobileDirection: number;
  onPrevMobile: () => void;
  onNextMobile: () => void;
  canPrevMobile: boolean;
  canNextMobile: boolean;
  onMobileDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => void;
}

export default function SeasonCarousel({
  scenes,
  colorVariant,
  desktopStart,
  desktopDirection,
  mobileIndex,
  mobileDirection,
  onPrevMobile,
  onNextMobile,
  canPrevMobile,
  canNextMobile,
  onMobileDragEnd,
}: SeasonCarouselProps) {
  const total = scenes.length;

  const desktopVisible =
    total <= DESKTOP_ITEMS_PER_PAGE
      ? scenes
      : scenes.slice(desktopStart, desktopStart + DESKTOP_ITEMS_PER_PAGE);

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
    <div className="w-full xl:w-[66%]">
      <div className="hidden md:block overflow-hidden">
        <AnimatePresence custom={desktopDirection} mode="wait">
          <motion.div
            key={desktopStart}
            custom={desktopDirection}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
            className="grid grid-cols-3 gap-6"
          >
            {desktopVisible.map((scene) => (
              <ContentCard key={scene.title} {...scene} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden overflow-hidden relative mt-6">
        <AnimatePresence custom={mobileDirection} mode="wait">
          <motion.div
            key={mobileIndex}
            custom={mobileDirection}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
            className="w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onMobileDragEnd}
          >
            <div className="w-[85%] mx-auto">
              <ContentCard {...scenes[mobileIndex]} />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={onPrevMobile}
          disabled={!canPrevMobile}
          className={`absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 ${getArrowClasses(canPrevMobile)}`}
        >
          ←
        </button>

        <button
          onClick={onNextMobile}
          disabled={!canNextMobile}
          className={`absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 ${getArrowClasses(canNextMobile)}`}
        >
          →
        </button>
      </div>
    </div>
  );
}
