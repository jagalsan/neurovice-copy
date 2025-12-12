"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import StarsGridAnimated from "@/components/stars/StarsGridAnimated";
import { primaryButtonBase } from "@/lib/styles/buttons";
import { useT } from "@/providers/I18nProvider";
import { useLocale } from "@/providers/LocaleProvider";
import type { PornStar } from "@/lib/api/types";

interface StarsPageClientProps {
  pornStarsData?: PornStar[];
}

export default function StarsPageClient({ pornStarsData }: StarsPageClientProps) {
  const t = useT();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const starsPerPage = 12;
  const totalStars = pornStarsData?.length || 0;
  const totalPages = Math.ceil(totalStars / starsPerPage);

  const startIndex = (currentPage - 1) * starsPerPage;
  const endIndex = startIndex + starsPerPage;
  const currentStars = (pornStarsData || []).slice(startIndex, endIndex);

  const PLACEHOLDER_IMAGE = "/placeholder-star.jpg";

  const stars = currentStars.map((pornStar) => ({
    coverSrc: pornStar.profileImage || PLACEHOLDER_IMAGE,
    coverAlt: `${pornStar.name} ${pornStar.surname}`,
    title: `${pornStar.name} ${pornStar.surname}`.toUpperCase(),
    releaseLabel: `${pornStar.scenePornStars.length} CHAPTERS`,
    accentColor: "#17FBF8",
    id: pornStar.id,
  }));

  const hasStars = stars.length > 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/${locale}/stars?${params.toString()}`);
  };

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
      
      {hasStars && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
