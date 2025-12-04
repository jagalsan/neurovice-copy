"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { primaryButtonBase } from "@/lib/styles/buttons";
import { useT } from "@/providers/I18nProvider";

type Props = {
  name: string;
  items: { coverSrc: string; coverAlt: string }[];
  onBuyAll?: () => void;
};

export default function AlsoAppearedIn({ name, items, onBuyAll }: Props) {
  const gridColor = "rgba(23,251,248,0.25)";
  const t = useT();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      <div className="relative max-w-[1459px] mx-auto px-4 md:px-8">
        <div
          className="pointer-events-none absolute -inset-x-6 -inset-y-6 z-0 mt-[60px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(220px,320px)_1fr] gap-8 items-start">
          <div className="pl-2">
            <h3 className="font-heading text-[40px] leading-[0.95] md:text-[56px] text-[#A6FFFF] uppercase">
              {name.split(" ").map((w, i) => (
                <span key={i} className="block">
                  {w}
                </span>
              ))}
            </h3>

            <p className="mt-4 font-heading text-[11px] tracking-[0.24em] uppercase text-[#7FF7F5]">
              {t("labels.also_appeared_in")}
            </p>

            <button
              onClick={onBuyAll}
              className={primaryButtonBase}
            >
              {t("actions.buy_all")}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {items.slice(0, 3).map((ch, i) => (
              <div
                key={`${ch.coverSrc}-${i}`}
                className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden"
              >
                <Image
                  src={ch.coverSrc}
                  alt={ch.coverAlt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 260px"
                  className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
