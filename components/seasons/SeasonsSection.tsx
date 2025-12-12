"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentCard from "@/components/cards/ContentCard";
import type { Season } from "@/lib/api/types";
import { useT } from "@/providers/I18nProvider";

type ColorKey = "purple" | "yellow" | "pink" | "red";
type ColorVariant = typeof colorVariants[ColorKey];

interface ChapterData {
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
    oldPrice: number;
    imageSrc: string;
  };
}

const COLORS: readonly ColorKey[] = ["purple", "yellow", "pink", "red"] as const;
const DESKTOP_ITEMS_PER_PAGE = 3;
const MOBILE_SWIPE_THRESHOLD = 60;

const COLOR_HEX_MAP: Record<ColorKey, string> = {
  purple: "#7A4FF4",
  yellow: "#EFB710",
  pink: "#E41D8D",
  red: "#E41D3B",
};

const colorVariants: Record<ColorKey, {
  text: string;
  gridColor: string;
  buttonBg: string;
  buttonShadow: string;
  arrowFillBg: string;
  arrowFillBorder: string;
  arrowFillText: string;
  arrowDisabledBorder: string;
  arrowDisabledText: string;
}> = {
  purple: {
    text: "text-[#7A4FF4]",
    gridColor: "rgba(122,79,244,0.25)",
    buttonBg: "bg-[linear-gradient(90deg,#BAA3FA,#7A4FF4)]",
    buttonShadow: "shadow-[0_0_40px_#7A4FF4,0_0_10px_#7A4FF4]",
    arrowFillBg: "bg-[#7A4FF4]",
    arrowFillBorder: "border-[#7A4FF4]",
    arrowFillText: "text-[#050608]",
    arrowDisabledBorder: "border-[#7A4FF466]",
    arrowDisabledText: "text-[#7A4FF466]",
  },
  yellow: {
    text: "text-[#EFB710]",
    gridColor: "rgba(239,183,16,0.25)",
    buttonBg: "bg-[linear-gradient(90deg,#FFE890,#EFB710)]",
    buttonShadow: "shadow-[0_0_40px_#EFB710,0_0_10px_#EFB710]",
    arrowFillBg: "bg-[#EFB710]",
    arrowFillBorder: "border-[#EFB710]",
    arrowFillText: "text-[#050608]",
    arrowDisabledBorder: "border-[#EFB71066]",
    arrowDisabledText: "text-[#EFB71066]",
  },
  pink: {
    text: "text-[#E41D8D]",
    gridColor: "rgba(228,29,141,0.25)",
    buttonBg: "bg-[linear-gradient(90deg,#FF9AD7,#E41D8D)]",
    buttonShadow: "shadow-[0_0_40px_#E41D8D,0_0_10px_#E41D8D]",
    arrowFillBg: "bg-[#E41D8D]",
    arrowFillBorder: "border-[#E41D8D]",
    arrowFillText: "text-[#050608]",
    arrowDisabledBorder: "border-[#E41D8D66]",
    arrowDisabledText: "text-[#E41D8D66]",
  },
  red: {
    text: "text-[#E41D3B]",
    gridColor: "rgba(228,29,59,0.25)",
    buttonBg: "bg-[linear-gradient(90deg,#FF9AA6,#E41D3B)]",
    buttonShadow: "shadow-[0_0_40px_#E41D3B,0_0_10px_#E41D3B]",
    arrowFillBg: "bg-[#E41D3B]",
    arrowFillBorder: "border-[#E41D3B]",
    arrowFillText: "text-[#050608]",
    arrowDisabledBorder: "border-[#E41D3B66]",
    arrowDisabledText: "text-[#E41D3B66]",
  },
};

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

function SeasonsRow({
  seasons,
}: {
  seasons?: Season[];
}) {
  const t = useT();

  if (!seasons || seasons.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 px-4 md:px-8"
      >
        <div className="max-w-[1459px] mx-auto text-center">
          <p className="text-white/60">{t("messages.no_seasons_available")}</p>
        </div>
      </motion.section>
    );
  }

  const getColorForSeason = (index: number): ColorKey => {
    return COLORS[index % COLORS.length];
  };

  const getHexColor = (color: ColorKey): string => {
    return COLOR_HEX_MAP[color];
  };

  const getColorVariant = (color: ColorKey): ColorVariant => {
    return colorVariants[color];
  };

  const createChapterFromScene = (
    scene: NonNullable<Season['scenes']>[number],
    season: Season,
    accentColor: string
  ): ChapterData | null => {
    const coverSrc = scene.mainImageUrl || season.mainImageUrl;
    
    if (!coverSrc) {
      return null;
    }
    
    return {
      title: scene.title,
      releaseLabel: season.title,
      accentColor,
      coverSrc,
      coverAlt: scene.title,
      platforms: ["META", "WINDOWS", "APK"],
      viewMoreHref: `/scenes/${scene.id}`,
      cartItem: {
        id: `scene-${scene.id}`,
        title: scene.title,
        subtitle: season.title,
        price: 19.99,
        oldPrice: 29.99,
        imageSrc: coverSrc,
      },
    };
  };

  return (
    <section className="w-full bg-[#171614]">
      {seasons.map((season, seasonIndex) => {
        const color = getColorForSeason(seasonIndex);
        const colorVariant = getColorVariant(color);
        const accentColor = getHexColor(color);
        
        const chapters = (season.scenes?.map((scene) => 
          createChapterFromScene(scene, season, accentColor)
        ).filter((chapter): chapter is ChapterData => chapter !== null) || []);

        if (chapters.length === 0) return null;

        return (
          <SeasonRow
            key={season.id}
            season={season}
            chapters={chapters}
            colorVariant={colorVariant}
            seasonIndex={seasonIndex}
          />
        );
      })}
    </section>
  );
}

interface SeasonRowProps {
  season: Season;
  chapters: ChapterData[];
  colorVariant: ColorVariant;
  seasonIndex: number;
}

function SeasonRow({ season, chapters, colorVariant, seasonIndex }: SeasonRowProps) {
  const t = useT();
  const total = chapters.length;
  
  const [desktopStart, setDesktopStart] = useState(0);
  const [desktopDirection, setDesktopDirection] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);

  const canPrevDesktop = total > DESKTOP_ITEMS_PER_PAGE && desktopStart > 0;
  const canNextDesktop = total > DESKTOP_ITEMS_PER_PAGE && desktopStart + DESKTOP_ITEMS_PER_PAGE < total;
  const canPrevMobile = mobileIndex > 0;
  const canNextMobile = mobileIndex < total - 1;

  const desktopVisible = total <= DESKTOP_ITEMS_PER_PAGE 
    ? chapters 
    : chapters.slice(desktopStart, desktopStart + DESKTOP_ITEMS_PER_PAGE);

  const handlePrevDesktop = () => {
    if (!canPrevDesktop) return;
    setDesktopDirection(-1);
    setDesktopStart((s) => Math.max(0, s - 1));
  };

  const handleNextDesktop = () => {
    if (!canNextDesktop) return;
    setDesktopDirection(1);
    setDesktopStart((s) => Math.min(total - DESKTOP_ITEMS_PER_PAGE, s + 1));
  };

  const handlePrevMobile = () => {
    if (!canPrevMobile) return;
    setMobileDirection(-1);
    setMobileIndex((i) => i - 1);
  };

  const handleNextMobile = () => {
    if (!canNextMobile) return;
    setMobileDirection(1);
    setMobileIndex((i) => i + 1);
  };

  const handleMobileDragEnd = (_: any, info: any) => {
    if (info.offset.x < -MOBILE_SWIPE_THRESHOLD && canNextMobile) {
      handleNextMobile();
    } else if (info.offset.x > MOBILE_SWIPE_THRESHOLD && canPrevMobile) {
      handlePrevMobile();
    }
  };

  const arrowBaseClasses = "w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all";

  const getArrowClasses = (canNavigate: boolean) => {
    return `${arrowBaseClasses} ${
      canNavigate
        ? `${colorVariant.arrowFillBg} ${colorVariant.arrowFillBorder} ${colorVariant.arrowFillText} hover:brightness-125 shadow-[0_0_20px_rgba(0,0,0,0.6)]`
        : `${colorVariant.arrowDisabledBorder} ${colorVariant.arrowDisabledText} bg-transparent cursor-not-allowed`
    }`;
  };

  return (
          <motion.section
            key={season.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: seasonIndex * 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
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
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrevDesktop}
                        disabled={!canPrevDesktop}
                        className={getArrowClasses(canPrevDesktop)}
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNextDesktop}
                        disabled={!canNextDesktop}
                        className={getArrowClasses(canNextDesktop)}
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <div className="pl-4 flex flex-col max-w-[380px]">
                    <p className={`font-heading text-lg md:text-4xl tracking-[0.18em] uppercase mb-[10px] ${colorVariant.text}`}>
                      {season.title}
                    </p>
                    <p className={`font-heading text-md md:text-2xl tracking-[0.18em] uppercase mb-[10px] ${colorVariant.text}`}>
                      {chapters.length} {chapters.length === 1 ? t("labels.chapter") : t("labels.chapters")}
                    </p>
                    <p className={`text-[16px] leading-relaxed max-w-sm mb-[30px] uppercase ${colorVariant.text}`}>
                      {season.description || t("messages.exclusive_content_quality")}
                    </p>
                    {season.price && (
                      <a href={`/seasons/${season.id}`}>
                        <button
                          className={[
                            "inline-flex items-center justify-center gap-[10px] min-w-[400px]",
                            "h-[67px] px-[10px] py-[20px]",
                            "rounded-[12px] border border-white/10",
                            "font-heading text-[16px] font-bold tracking-[0.24em] uppercase text-white",
                            colorVariant.buttonBg,
                            colorVariant.buttonShadow,
                            "transition-all hover:brightness-110",
                          ].join(" ")}
                        >
                          <span className="flex items-center gap-2">
                            <span>{t("actions.explore_all")}</span>
                            <span>${season.price}</span>
                          </span>
                        </button>
                      </a>
                    )}
                  </div>
                </div>

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
                        {desktopVisible.map((chapter) => (
                          <ContentCard key={chapter.title} {...chapter} />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

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
                        onDragEnd={handleMobileDragEnd}
                      >
                        <div className="w-[85%] mx-auto">
                          <ContentCard {...chapters[mobileIndex]} />
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <button
                      onClick={handlePrevMobile}
                      disabled={!canPrevMobile}
                      className={`absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 ${getArrowClasses(canPrevMobile)}`}
                    >
                      ←
                    </button>

                    <button
                      onClick={handleNextMobile}
                      disabled={!canNextMobile}
                      className={`absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 ${getArrowClasses(canNextMobile)}`}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
  );
}

export default function SeasonsSection({ 
  seasons 
}: { 
  seasons?: Season[] 
}) {
  return <SeasonsRow seasons={seasons} />;
}
