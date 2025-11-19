"use client";

import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import StarsGridAnimated from "@/components/stars/StarsGridAnimated";
import { primaryButtonBase } from "@/lib/styles/buttons";
import { useT } from "@/providers/I18nProvider";

const stars = [
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 1",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 1,
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 2",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 2,
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 3",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 3,
  },
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 4",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 4,
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 5",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 5,
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 6",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 6,
  },
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 7",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 7,
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 8",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 8,
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 9",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
    id: 9,
  },
];

export default function StarsPageClient() {
  const t = useT();

  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8">
      <div className="space-y-12 mb-8">
        <Card className="bg-[transparent]">
          <div>
            <span
              className="text-xs font-[500] uppercase text-[var(--color-brand-500)] z-10 bg-transparent"
              style={{ textShadow: "0px 0px 15px #00FFFC" }}
            >
              {t("labels.our_stars")}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8]">
              {t("labels.top_vr_stars")}
            </h1>
            <h2 className="font-heading text-lg md:text-xl text-[#17FBF8] mt-4 mb-2">
              {t("messages.best_tattoos_vr_title")}
            </h2>
            <p className="max-w-[756px] text-[15px] uppercase text-[#7FF7F5] mb-8">
              {t("messages.best_tattoos_vr_description")}
            </p>
            <div className="pt-2">
              <button className={primaryButtonBase}>
                <span className="relative z-10">
                  {t("actions.unlock_with_subscription")}
                </span>
              </button>
            </div>
          </div>
        </Card>

        <StarsGridAnimated stars={stars} />
      </div>
      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}
