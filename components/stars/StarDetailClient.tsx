"use client";

import Card from "@/components/Card";
import Image from "next/image";
import { SiInstagram, SiOnlyfans, SiX } from "react-icons/si";
import { primaryButtonBase } from "@/lib/styles/buttons";
import { useT } from "@/providers/I18nProvider";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ChipList from "@/components/scenes/ChipList";
import Link from "next/link";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import type { PornStar } from "@/lib/api/types";

interface StarDetailClientProps {
  starData: PornStar;
}

export default function StarDetailClient({ starData }: StarDetailClientProps) {
  const gridColor = "rgba(23,251,248,0.25)";
  const t = useT();
  const { addToCart } = useAddToCart();

  const starName = `${starData.name} ${starData.surname}`.toUpperCase();
  const starTags = starData.pornStarsTags.map(tag => ({
    id: tag.tag.id,
    name: tag.tag.name
  }));
  const screenshots = starData.galleryImages || [];
  
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  
  const ageInYears = calculateAge(starData.age);

  const allChaptersCartItem = {
    id: `${starData.id}-all-chapters`,
    title: starName,
    subtitle: "All Chapters",
    oldPrice: 299,
    price: 149,
    imageSrc: starData.profileImage || "/placeholder-star.png",
  };

  return (
    <div className="w-full bg-[#171614] max-w-[944px] mx-auto">
        <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <Card className="bg-[#111118]" padded={false}>
            <div className="relative w-full h-[520px] md:h-[640px] rounded-[18px] overflow-hidden bg-[#171614]">
              {starData.profileImage ? (
                <Image
                  src={starData.profileImage}
                  alt={`${starName} portrait`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-[#17FBF8] text-center px-4">
                    {starName}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-[#111118]">
            <div className="space-y-5">
              <span
                className="text-[#17FBF8] text-[13px] mb-3 block uppercase"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                {t("labels.pornstar")}
              </span>

              <h1
                className="font-heading uppercase text-[38px] leading-[0.95] text-[#17FBF8]"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                {starData.name.toUpperCase()}
                <br />
                {starData.surname.toUpperCase()}
              </h1>

              <div className="grid grid-cols-3 gap-4 text-[12px] uppercase">
                {starData.gender && (
                  <div>
                    <p className="text-[#7FF7F5]/50">{t("labels.gender")}</p>
                    <p
                      className="text-[#17FBF8]"
                      style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                    >
                      {starData.gender === 'male' ? t('labels.male') : t('labels.female')}
                    </p>
                  </div>
                )}
                {starData.hairColor && (
                  <div>
                    <p className="text-[#7FF7F5]/50">{t("labels.hair_color")}</p>
                    <p
                      className="text-[#17FBF8]"
                      style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                    >
                      {starData.hairColor}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.age")}</p>
                  <p
                    className="text-[#17FBF8]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    {ageInYears}
                  </p>
                </div>
              </div>

              {starData.quote && (
                <p className="uppercase text-[13px] leading-relaxed text-[#7FF7F5]">
                  {starData.quote}
                </p>
              )}
              
              {starData.bio && (
                <p className="text-[14px] leading-relaxed text-[#7FF7F5]">
                  {starData.bio}
                </p>
              )}

              <ChipList items={starTags} linkable type="genre" />

              {starData.socialMedia && (
                <div className="flex items-center gap-4 text-[#17FBF8]">
                  {starData.socialMedia.onlyfans && (
                    <Link href={starData.socialMedia.onlyfans} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                      <SiOnlyfans className="w-5 h-5 opacity-80" />
                    </Link>
                  )}
                  {starData.socialMedia.instagram && (
                    <Link href={starData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                      <SiInstagram className="w-5 h-5 opacity-80" />
                    </Link>
                  )}
                  {starData.socialMedia.x && (
                    <Link href={starData.socialMedia.x} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                      <SiX className="w-5 h-5 opacity-80" />
                    </Link>
                  )}
                </div>
              )}

              <div className="mt-4">
                <button 
                  className={primaryButtonBase}
                  onClick={() => addToCart(allChaptersCartItem)}
                >
                  {t("actions.buy_all_var", { param: starName })}
                </button>
              </div>
            </div>
          </Card>
        </section>

        {screenshots.length > 0 && (
          <Card className="bg-[#111118]" title={t("labels.gallery")}>
            <div className="space-y-4">
              <ScreenshotGallery screenshots={screenshots} />
            </div>
          </Card>
        )}

        {starData.bio && (
          <Card
            className="bg-[#111118]"
            title={t("labels.bio")}
          >
            <p className="text-[14px] leading-relaxed text-[#7FF7F5]">
              {starData.bio}
            </p>
          </Card>
        )}

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-6 z-0 mt-[110px]"
            style={{
              backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
              backgroundSize: "26px 26px",
            }}
          />
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
              <div className="pl-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-heading text-[40px] leading-[0.95] md:text-[56px] text-[#17FBF8] uppercase"
                    style={{ textShadow: "0 0 15px #00FFFC" }}
                  >
                    {starData.name.toUpperCase()}
                    <br />
                    {starData.surname.toUpperCase()}
                  </h3>

                  <p className="mt-4 font-heading text-[11px] tracking-[0.24em] uppercase text-[#7FF7F5]">
                    {t("labels.all_videos")}
                  </p>

                  <button 
                    className={primaryButtonBase + " mt-4"}
                    onClick={() => addToCart(allChaptersCartItem)}
                  >
                    {t("actions.buy_all")}
                  </button>
                </div>
              </div>

              {starData.scenePornStars.slice(0, 3).map((scenePornStar) => (
                <div
                  key={scenePornStar.sceneId}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden bg-[#171614]"
                >
                  {scenePornStar.scene.thumbnailUrl ? (
                    <Image
                      src={scenePornStar.scene.thumbnailUrl}
                      alt={scenePornStar.scene.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center p-4"
                      style={{
                        backgroundImage: `
                          linear-gradient(${gridColor} 1px, transparent 1px),
                          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    >
                      <p className="text-[#17FBF8] text-center text-sm">
                        {scenePornStar.scene.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {starData.scenePornStars.slice(3).map((scenePornStar) => (
                <div
                  key={scenePornStar.sceneId}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden bg-[#171614]"
                >
                  {scenePornStar.scene.thumbnailUrl ? (
                    <Image
                      src={scenePornStar.scene.thumbnailUrl}
                      alt={scenePornStar.scene.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center p-4"
                      style={{
                        backgroundImage: `
                          linear-gradient(${gridColor} 1px, transparent 1px),
                          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    >
                      <p className="text-[#17FBF8] text-center text-sm">
                        {scenePornStar.scene.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
