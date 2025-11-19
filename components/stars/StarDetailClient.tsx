"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import { SiInstagram, SiOnlyfans, SiX } from "react-icons/si";
import { primaryButtonBase } from "@/lib/styles/buttons";
import { useT } from "@/providers/I18nProvider";

const chips = (items: string[]) => (
  <div className="flex flex-wrap gap-2">
    {items.map((c) => (
      <span
        key={c}
        className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[13px] uppercase"
        style={{ boxShadow: "0 0 15px #17FBF833" }}
      >
        {c}
      </span>
    ))}
  </div>
);

const screenshots = [
  "/mock/star_1_mock.png",
  "/mock/star_2_mock.png",
  "/mock/star_3_mock.png",
];

const allVideos = [
  "/mock/example_1_x.png",
  "/mock/example_2_x.png",
  "/mock/example_3_x.png",
  "/mock/example_1_x.png",
  "/mock/example_2_x.png",
  "/mock/example_3_x.png",
  "/mock/example_3_x.png",
];

interface StarDetailClientProps {
  slug: string;
}

export default function StarDetailClient({ slug }: StarDetailClientProps) {
  const gridColor = "rgba(23,251,248,0.25)";
  const t = useT();
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <>
      <div className="w-full bg-[#171614]">
        <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <Card className="bg-[#111118]" padded={false}>
            <div className="relative w-full h-[520px] md:h-[640px] rounded-[18px] overflow-hidden">
              <Image
                src="/mock/star_1_mock.png"
                alt="Punky Natalie portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          <Card className="bg-[#111118]">
            <div className="space-y-5">
              <span
                className="text-[#A6FFFF] text-[13px] mb-3 block"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                {t("labels.pornstar")}
              </span>

              <h1
                className="font-heading uppercase text-[38px] leading-[0.95] text-[#A6FFFF]"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                PUNKY
                <br />
                NATALIE
              </h1>

              <div className="grid grid-cols-3 gap-4 text-[12px] uppercase">
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.height")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    5.11&quot;
                  </p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.breast")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    36DD
                  </p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.weight")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    123 lbs
                  </p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.hair_color")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    Blue
                  </p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.ethnicity")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    White
                  </p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">{t("labels.age")}</p>
                  <p
                    className="text-[#A6FFFF]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    27
                  </p>
                </div>
              </div>

              <p className="uppercase text-[13px] leading-relaxed text-[#7FF7F5]">
                {t("messages.star_quote_example")}
              </p>

              {chips([
                "ROLEPLAY",
                "LATINA",
                "PETITE",
                "PIERCED NIPPLES",
                "TATTOOS",
                "...",
              ])}

              <div className="flex items-center gap-4 text-[#A6FFFF]">
                <SiOnlyfans className="w-5 h-5 opacity-80" />
                <SiInstagram className="w-5 h-5 opacity-80" />
                <SiX className="w-5 h-5 opacity-80" />
              </div>

              <button className={primaryButtonBase}>
                {t("actions.buy_all")}
              </button>
            </div>
          </Card>
        </section>

        <Card className="bg-[#111118]" title={t("labels.gallery")}>
          <div className="space-y-4">
            <div className="flex gap-3 overflow-x-auto pb-1 pr-1">
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(src)}
                  className="group relative w-[260px] h-[140px] shrink-0 rounded-[12px] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`shot-${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          className="bg-[#111118]"
          title={t("labels.minimum_pcvr_requirements")}
        >
          <p className="uppercase text-[14px] leading-relaxed text-[#7FF7F5]">
            {t("messages.star_about_copy_example")}
          </p>
        </Card>

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
                    className="font-heading text-[40px] leading-[0.95] md:text-[56px] text-[#A6FFFF] uppercase"
                    style={{ textShadow: "0 0 15px #00FFFC" }}
                  >
                    PUNKY
                    <br />
                    NATALIE
                  </h3>

                  <p className="mt-4 font-heading text-[11px] tracking-[0.24em] uppercase text-[#7FF7F5]">
                    {t("labels.all_videos")}
                  </p>

                  <button className={primaryButtonBase + " mt-4"}>
                    {t("actions.buy_all")}
                  </button>
                </div>
              </div>

              {allVideos.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`video-${i}`}
                    fill
                    className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allVideos.slice(3).map((src, i) => (
                <div
                  key={i + 3}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`video-${i + 3}`}
                    fill
                    className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedImage("")}
        >
          <div
            className="relative w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage("")}
              className="absolute -top-3 -right-3 z-10 h-8 w-8 rounded-full bg-black/80 text-white text-sm flex items-center justify-center border border-white/20"
            >
              ×
            </button>
            <div className="relative w-full aspect-video rounded-[18px] overflow-hidden bg-black">
              <Image
                src={selectedImage}
                alt="preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
