"use client";

import { useAddToCart } from "@/lib/hooks/useAddToCart";
import Image from "next/image";

type PlanColor = "cyan" | "yellow" | "purple";

export type Plan = {
  id: string;
  name: string;
  price: number;
  periodLabelKey: string;
  titleKey: string;
  featureKeys: string[];
  ctaLabelKey: string;
  accent: PlanColor;
  isMostPopular?: boolean;
  mostPopularKey?: string;
  badgeIconSrc: string;
  badgeIconAlt: string;
};

const colorStyles: Record<
  PlanColor,
  {
    accent: string;
    border: string;
    gridTint: string;
    priceBg: string;
    priceText: string;
    priceShadow: string;
    titleText: string;
    bullet: string;
    buttonFrom: string;
    buttonTo: string;
  }
> = {
  cyan: {
    accent: "#17FBF8",
    border: "border-[#17FBF880]",
    gridTint: "rgba(23,251,248,0.18)",
    priceBg: "bg-[#111118CC]",
    priceText: "text-[#17FBF8]",
    priceShadow:
      "shadow-[0_0_40px_rgba(23,251,248,0.5),0_0_10px_rgba(23,251,248,0.7)]",
    titleText: "text-[#17FBF8]",
    bullet: "text-[#17FBF8]",
    buttonFrom: "#17FBF8",
    buttonTo: "#17FBF8",
    
  },
  yellow: {
    accent: "#EFB710",
    border: "border-[#EFB71080]",
    gridTint: "#EFB7101A",
    priceBg: "bg-[#111118CC]",
    priceText: "text-[#EFB710]",
    priceShadow:
      "shadow-[0_0_40px_rgba(239,183,16,0.5),0_0_10px_rgba(239,183,16,0.7)]",
    titleText: "text-[#EFB710]",
    bullet: "text-[#EFB710]",
    buttonFrom: "#FFE28F",
    buttonTo: "#EFB710",
  },
  purple: {
    accent: "#7A4FF4",
    border: "border-[#7A4FF480]",
    gridTint: "rgba(122,79,244,0.18)",
    priceBg: "bg-[#111118CC]",
    priceText: "text-[#7A4FF4]",
    priceShadow:
      "shadow-[0_0_40px_rgba(122,79,244,0.5),0_0_10px_rgba(122,79,244,0.7)]",
    titleText: "text-[#7A4FF4]",
    bullet: "text-[#7A4FF4]",
    buttonFrom: "#BCA7FF",
    buttonTo: "#7A4FF4",
  },
};

type TFn = (key: string) => string;

interface Props {
  plan: Plan;
  t: TFn;
}

export default function PlanCard({ plan, t }: Props) {
  const styles = colorStyles[plan.accent];
  const { addToCart } = useAddToCart();

  return (
    <div
      className={[
        "flex flex-col items-stretch max-w-[370px]",
        plan.isMostPopular ? "lg:scale-[1.04] lg:-mt-4 lg:z-10" : "",
      ].join(" ")}
    >
      {plan.isMostPopular && (
        <div className="h-10 rounded-t-[15px] bg-[linear-gradient(180deg,#FFE28F_0%,#EFB710_100%)] flex items-center justify-center z-10">
          <span className="font-heading text-[11px] tracking-[0.24em] uppercase text-black">
            {t(plan.mostPopularKey || "labels.most_popular")}
          </span>
        </div>
      )}
      <article
        className={`
          relative flex flex-col
          rounded-[15px] border ${styles.border}
          bg-[#111118] overflow-hidden
          px-[15px] pt-[15px] pb-[20px]
          min-h-[436px]
          ${plan.isMostPopular ? "rounded-t-[0]" : ""}
          z-10
        `}
        style={{
          boxShadow: `0px 4px 20px 0px ${styles.accent}33`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${styles.gridTint} 1px, transparent 1px),
              linear-gradient(to bottom, ${styles.gridTint} 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            boxShadow: `0 0 20px ${styles.accent}33`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-5 mt-[10px]">
          <div className="flex items-center justify-between">
            <div
              className={`
                inline-flex items-center px-4 py-2 rounded-[10px]
                ${styles.priceBg} ${styles.priceText} ${styles.priceShadow}
                font-heading text-[16px] font-[800] tracking-[0.18em] uppercase
              `}
            >
              ${plan.price}
            </div>

            <div className="relative w-[70px] h-[70px]">
              <Image
                src={plan.badgeIconSrc}
                alt={plan.badgeIconAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <p
              className={`font-heading text-[16px] font-[600] tracking-[0.18em] uppercase text-[${styles.accent}]`}
            >
              {t(plan.periodLabelKey)}
            </p>
            <h3
              className={`
                font-heading text-[30px] tracking-[0.16em] uppercase
                ${styles.titleText}
              `}
            >
              {t(plan.titleKey)}
            </h3>
          </div>

          <ul className="flex flex-col gap-[8px] text-sm text-white">
            {plan.featureKeys.map((featKey: string) => (
              <li key={featKey} className={`flex gap-3 text-[${styles.accent}]`}>
                <span
                  className={`${styles.bullet} text-lg leading-[1] mt-[2px]`}
                >
                  •
                </span>
                <span className="uppercase text-[16px]">{t(featKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <button
        className={`
          relative mt-[-8px] h-[77px]
          rounded-b-[15px]
          bg-[${styles.accent}]
          flex items-center justify-center
          overflow-hidden
          w-[90%]
          mx-auto
          hover:translate-y-[-2px]
          transition-transform duration-300 ease-in-out
        `}
        onClick={() => addToCart({
          id: plan.id,
          title: plan.name,
          subtitle: t(plan.periodLabelKey),
          oldPrice: plan.price,
          price: plan.price,
          imageSrc: plan.badgeIconSrc,
        })}
        style={{
          background: `linear-gradient(180deg, ${styles.buttonFrom} 0%, ${styles.buttonTo} 100%)`,
          boxShadow: "0 0 40px rgba(0,0,0,0.7), 0 10px 40px rgba(0,0,0,0.9)",
        }}
      >
        <div
          className="
            absolute inset-[15px]
            rounded-[10px]
            border border-black/70
            shadow-[0_4px_5px_rgba(0,0,0,0.15)] 
          "
        />

        <span className="relative z-10 font-heading text-[14px] uppercase text-[#050608]">
          {t(plan.ctaLabelKey)}
        </span>
      </button>
    </div>
  );
}
