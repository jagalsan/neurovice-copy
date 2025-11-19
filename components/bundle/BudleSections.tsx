"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bundles } from "@/data/bundles";
import ChapterCard from "@/components/chapters/ChapterCard";
import type { BundleColorKey } from "@/data/bundles";
import { useT } from "@/providers/I18nProvider";

const colorVariants: Record<
  BundleColorKey,
  {
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
> = {
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

function BundleRow({
  bundle,
  index,
}: {
  bundle: (typeof bundles)[number];
  index: number;
}) {
  const colors = colorVariants[bundle.accent];
  const t = useT();

  const total = bundle.chapters.length;
  const desktopPerPage = 3;

  const [desktopStart, setDesktopStart] = useState(0);
  const [desktopDirection, setDesktopDirection] = useState(1);

  const canPrevDesktop = total > desktopPerPage && desktopStart > 0;
  const canNextDesktop =
    total > desktopPerPage && desktopStart + desktopPerPage < total;

  const desktopVisible =
    total <= desktopPerPage
      ? bundle.chapters
      : bundle.chapters.slice(desktopStart, desktopStart + desktopPerPage);

  const desktopPageKey = desktopStart;

  const handlePrevDesktop = () => {
    if (!canPrevDesktop) return;
    setDesktopDirection(-1);
    setDesktopStart((s) => Math.max(0, s - 1));
  };

  const handleNextDesktop = () => {
    if (!canNextDesktop) return;
    setDesktopDirection(1);
    setDesktopStart((s) => Math.min(total - desktopPerPage, s + 1));
  };

  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);

  const canPrevMobile = mobileIndex > 0;
  const canNextMobile = mobileIndex < total - 1;

  const mobilePageKey = mobileIndex;

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

  const arrowBase =
    "w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-[1459px] mx-auto relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-11 bottom-11 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${colors.gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${colors.gridColor} 1px, transparent 1px)
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
                  className={`${arrowBase} ${
                    canPrevDesktop
                      ? `${colors.arrowFillBg} ${colors.arrowFillBorder} ${colors.arrowFillText} hover:brightness-125 shadow-[0_0_20px_rgba(0,0,0,0.6)]`
                      : `${colors.arrowDisabledBorder} ${colors.arrowDisabledText} bg-transparent cursor-not-allowed`
                  }`}
                >
                  &#8592;
                </button>

                <button
                  onClick={handleNextDesktop}
                  disabled={!canNextDesktop}
                  className={`${arrowBase} ${
                    canNextDesktop
                      ? `${colors.arrowFillBg} ${colors.arrowFillBorder} ${colors.arrowFillText} hover:brightness-125 shadow-[0_0_20px_rgba(0,0,0,0.6)]`
                      : `${colors.arrowDisabledBorder} ${colors.arrowDisabledText} bg-transparent cursor-not-allowed`
                  }`}
                >
                  &#8594;
                </button>
              </div>
            </div>

            <div className="pl-4 flex flex-col max-w-[380px]">
              <p
                className={`font-heading text-lg md:text-4xl tracking-[0.18em] uppercase mb-[10px] ${colors.text}`}
              >
                {t(bundle.titleKey)}
              </p>

              <p
                className={`font-heading text-md md:text-2xl tracking-[0.18em] uppercase mb-[10px] ${colors.text}`}
              >
                {t(bundle.nameKey)}
              </p>

              <p
                className={`text-[16px] leading-relaxed max-w-sm mb-[30px] uppercase ${colors.text}`}
              >
                {t(bundle.descriptionKey)}
              </p>

              <button
                className={[
                  "inline-flex items-center justify-center gap-[10px]",
                  "h-[67px] px-[10px] py-[20px]",
                  "rounded-[12px] border border-white/10",
                  "font-heading text-[16px] font-bold tracking-[0.24em] uppercase text-white",
                  colors.buttonBg,
                  colors.buttonShadow,
                  "transition-all hover:brightness-110",
                ].join(" ")}
              >
                <span className="flex items-center gap-2">
                  <span>{t(bundle.buttonTextKey)}</span>
                  {bundle.originalPrice && (
                    <span className="line-through opacity-70">
                      {bundle.originalPrice}
                    </span>
                  )}
                  <span>{bundle.salePrice}</span>
                </span>
              </button>
            </div>
          </div>

          <div className="w-full xl:w-[66%]">
            <div className="hidden md:block overflow-hidden">
              <AnimatePresence custom={desktopDirection} mode="wait">
                <motion.div
                  key={desktopPageKey}
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
                    <ChapterCard key={chapter.title} {...chapter} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:hidden overflow-hidden relative mt-6">
              <AnimatePresence custom={mobileDirection} mode="wait">
                <motion.div
                  key={mobilePageKey}
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
                  onDragEnd={(_, info) => {
                    const threshold = 60;
                    if (info.offset.x < -threshold && canNextMobile) {
                      handleNextMobile();
                    } else if (info.offset.x > threshold && canPrevMobile) {
                      handlePrevMobile();
                    }
                  }}
                >
                  <div className="w-[85%] mx-auto">
                    <ChapterCard {...bundle.chapters[mobileIndex]} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handlePrevMobile}
                disabled={!canPrevMobile}
                className={`absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 ${arrowBase} ${
                  canPrevMobile
                    ? `${colors.arrowFillBg} ${colors.arrowFillBorder} ${colors.arrowFillText} hover:brightness-125 shadow-[0_0_20px_rgba(0,0,0,0.6)]`
                    : `${colors.arrowDisabledBorder} ${colors.arrowDisabledText} bg-transparent cursor-not-allowed`
                }`}
              >
                &#8592;
              </button>

              <button
                onClick={handleNextMobile}
                disabled={!canNextMobile}
                className={`absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 ${arrowBase} ${
                  canNextMobile
                    ? `${colors.arrowFillBg} ${colors.arrowFillBorder} ${colors.arrowFillText} hover:brightness-125 shadow-[0_0_20px_rgba(0,0,0,0.6)]`
                    : `${colors.arrowDisabledBorder} ${colors.arrowDisabledText} bg-transparent cursor-not-allowed`
                }`}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function BundlesSection() {
  return (
    <section className="w-full bg-[#171614]">
      {bundles.map((bundle, idx) => (
        <BundleRow key={bundle.id} bundle={bundle} index={idx} />
      ))}
    </section>
  );
}
