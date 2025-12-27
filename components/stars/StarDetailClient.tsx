"use client";

import { useEffect } from "react";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { useT } from "@/providers/I18nProvider";
import type { PornStar } from "@/lib/api/types";
import { useBreadcrumbStore } from "@/lib/stores/breadcrumb.store";
import StarProfileCard from "./StarProfileCard";
import StarInfoCard from "./StarInfoCard";
import StarGalleryCard from "./StarGalleryCard";
import StarBioCard from "./StarBioCard";
import StarVideosSection from "./StarVideosSection";

interface StarDetailClientProps {
  starData: PornStar;
}

export default function StarDetailClient({ starData }: StarDetailClientProps) {
  const gridColor = "rgba(23,251,248,0.25)";
  const { addToCart } = useAddToCart();
  const t = useT();
  const { setCustomLabel } = useBreadcrumbStore();

  const starName = `${starData.name} ${starData.surname}`.toUpperCase();

  useEffect(() => {
    setCustomLabel(String(starData.id), starName);
  }, [starData.id, starName, setCustomLabel]);
  const starTags = starData.pornStarsTags.map((tag) => ({
    id: tag.tag.id,
    name: tag.tag.name,
  }));
  const screenshots = starData.galleryImages || [];

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const ageInYears = calculateAge(starData.age);

  const allChaptersCartItem = {
    id: `${starData.id}-all-chapters`,
    title: starName,
    subtitle: t("labels.all_chapters"),
    oldPrice: 299,
    price: 149,
    imageSrc: starData.profileImage || "/mock/example_1_x.png",
  };

  const handleBuyAll = () => {
    addToCart(allChaptersCartItem);
  };

  return (
    <div className="w-full bg-[#171614] max-w-[944px] mx-auto">
      <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <StarProfileCard
            profileImage={starData.profileImage || "/mock/example_1_x.png"}
            starName={starName}
          />

          <StarInfoCard
            name={starData.name}
            surname={starData.surname}
            gender={starData.gender}
            age={ageInYears}
            bio={starData.bio}
            tags={starTags}
            ofUrl={starData.ofUrl}
            igUrl={starData.igUrl}
            xUrl={starData.xUrl}
            onBuyAll={handleBuyAll}
            starName={starName}
          />
        </section>

        <StarGalleryCard screenshots={screenshots} />

        <StarBioCard bio={starData.bio} />

        <StarVideosSection
          starName={starData.name}
          surname={starData.surname}
          scenePornStars={starData.scenePornStars}
          onBuyAll={handleBuyAll}
          gridColor={gridColor}
        />
      </div>
    </div>
  );
}
