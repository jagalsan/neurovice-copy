import { useState } from "react";
import { motion } from "framer-motion";
import type { Season } from "@/lib/api/types";
import SeasonHeader from "./SeasonHeader";
import SeasonCarousel from "./SeasonCarousel";
import NavigationArrows from "./NavigationArrows";
import { SceneCardData, ColorVariant, COLORS, COLOR_HEX_MAP, colorVariants } from "./types";
import { useLocale } from "@/providers/LocaleProvider";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface SeasonRowProps {
  season: Season;
  seasonIndex: number;
  t: (key: string) => string;
}

const DESKTOP_ITEMS_PER_PAGE = 3;
const MOBILE_SWIPE_THRESHOLD = 60;

export default function SeasonRow({ season, seasonIndex, t }: SeasonRowProps) {
  const locale = useLocale();
  const getColorForSeason = (index: number) => COLORS[index % COLORS.length];
  const getColorVariant = (color: keyof typeof colorVariants) => colorVariants[color];
  const getHexColor = (color: keyof typeof COLOR_HEX_MAP) => COLOR_HEX_MAP[color];

  const createSceneCardData = (
    scene: NonNullable<Season["scenes"]>[number],
    season: Season,
    accentColor: string
  ): SceneCardData | null => {
    const coverSrc = scene.mainImageUrl || PLACEHOLDER_IMAGE;

    if (!coverSrc) {
      return null;
    }

    const eurPrice = scene.prices?.find((p) => p.currency === "EUR");
    const price = eurPrice?.amount ?? 0;

    return {
      title: scene.title,
      releaseLabel: season.title,
      accentColor,
      coverSrc,
      coverAlt: scene.title,
      platforms: ["META", "WINDOWS", "APK"],
      viewMoreHref: `/${locale}/scenes/${scene.id}`,
      cartItem: {
        id: scene.id.toString(),
        title: scene.title,
        subtitle: season.title,
        price: price,
        oldPrice: null,
        imageSrc: coverSrc,
      },
    };
  };

  const color = getColorForSeason(seasonIndex);
  const colorVariant = getColorVariant(color);
  const accentColor = getHexColor(color);

  const sceneCards =
    season.scenes
      ?.map((scene) => createSceneCardData(scene, season, accentColor))
      .filter((card): card is SceneCardData => card !== null) || [];

  if (sceneCards.length === 0) return null;

  const total = sceneCards.length;

  const [desktopStart, setDesktopStart] = useState(0);
  const [desktopDirection, setDesktopDirection] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);

  const canPrevDesktop = total > DESKTOP_ITEMS_PER_PAGE && desktopStart > 0;
  const canNextDesktop =
    total > DESKTOP_ITEMS_PER_PAGE &&
    desktopStart + DESKTOP_ITEMS_PER_PAGE < total;
  const canPrevMobile = mobileIndex > 0;
  const canNextMobile = mobileIndex < total - 1;

  const handlePrevDesktop = () => {
    if (!canPrevDesktop) return;
    setDesktopDirection(-1);
    setDesktopStart((prev) => Math.max(0, prev - DESKTOP_ITEMS_PER_PAGE));
  };

  const handleNextDesktop = () => {
    if (!canNextDesktop) return;
    setDesktopDirection(1);
    setDesktopStart((prev) =>
      Math.min(total - DESKTOP_ITEMS_PER_PAGE, prev + DESKTOP_ITEMS_PER_PAGE)
    );
  };

  const handlePrevMobile = () => {
    if (!canPrevMobile) return;
    setMobileDirection(-1);
    setMobileIndex((prev) => prev - 1);
  };

  const handleNextMobile = () => {
    if (!canNextMobile) return;
    setMobileDirection(1);
    setMobileIndex((prev) => prev + 1);
  };

  const handleMobileDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (info.offset.x < -MOBILE_SWIPE_THRESHOLD && canNextMobile) {
      handleNextMobile();
    } else if (info.offset.x > MOBILE_SWIPE_THRESHOLD && canPrevMobile) {
      handlePrevMobile();
    }
  };

  return (
    <motion.section
      key={season.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: seasonIndex * 0.02 }}
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-[1459px] mx-auto relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-11 bottom-11 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${colorVariant.gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${colorVariant.gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative z-10 flex flex-col xl:flex-row gap-10">
          <div className="w-full xl:w-[34%] flex flex-col justify-start gap-[2rem] lg:gap-[7em]">
            <div className="hidden md:flex items-center justify-between mb-6">
              <NavigationArrows
                onPrev={handlePrevDesktop}
                onNext={handleNextDesktop}
                canPrev={canPrevDesktop}
                canNext={canNextDesktop}
                colorVariant={colorVariant}
              />
            </div>

            <SeasonHeader
              seasonId={season.id}
              title={season.title}
              description={season.description}
              sceneCount={sceneCards.length}
              colorVariant={colorVariant}
              t={t}
            />
          </div>

          <SeasonCarousel
            scenes={sceneCards}
            colorVariant={colorVariant}
            desktopStart={desktopStart}
            desktopDirection={desktopDirection}
            mobileIndex={mobileIndex}
            mobileDirection={mobileDirection}
            onPrevMobile={handlePrevMobile}
            onNextMobile={handleNextMobile}
            canPrevMobile={canPrevMobile}
            canNextMobile={canNextMobile}
            onMobileDragEnd={handleMobileDragEnd}
          />
        </div>
      </div>
    </motion.section>
  );
}
