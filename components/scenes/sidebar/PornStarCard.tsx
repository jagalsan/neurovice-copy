"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ChipList from "../ChipList";
import { useT } from "@/providers";
import { useLocale } from "@/providers/LocaleProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PornStar } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PornStarCardProps {
  stars: PornStar[];
}

export default function PornStarCard({ stars }: PornStarCardProps) {
  const t = useT();
  const locale = useLocale();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultipleStars = stars.length > 1;
  const currentStar = stars[currentIndex];

  return (
    <Card className="bg-[#111118]">
      <div>
        <div className="relative w-full rounded-[10px] overflow-hidden mb-4">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={hasMultipleStars}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            className="w-full h-[200px]"
          >
            {stars.map((star, index) => (
              <SwiperSlide key={index}>
                {star.image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={star.image}
                      alt={star.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {hasMultipleStars && (
            <>
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                aria-label={t("actions.previous")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                aria-label={t("actions.next_star")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {stars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => swiperInstance?.slideToLoop(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-[#17FBF8] w-6"
                        : "bg-white/40 hover:bg-white/60 w-2"
                    }`}
                    aria-label={`Go to star ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="uppercase text-[10px] text-[#17FBF8] text-glow">
            {t("labels.pornstar")}
          </p>
          <h4 className="font-heading text-[#17FBF8] text-[24px]">{currentStar.name.toUpperCase()}</h4>
          {currentStar.bio && (
            <p className="text-[16px] text-[#17FBF8] uppercase">
              {currentStar.bio}
            </p>
          )}
          {currentStar.tags && currentStar.tags.length > 0 && (
            <ChipList 
              interactive={false} 
              items={currentStar.tags} 
            />
          )}
        </div>
        <Button variant="primary" href={`/${locale}/stars/${currentStar.slug}`} fullWidth>
          {t("actions.view_more").toUpperCase()}
        </Button>
      </div>
    </Card>
  );
}