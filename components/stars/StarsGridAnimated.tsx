"use client";

import { motion } from "framer-motion";
import ChapterCard from "@/components/chapters/ChapterCard";
import { useLocale } from "@/providers/LocaleProvider";

type Star = {
  coverSrc: string;
  coverAlt: string;
  title: string;
  releaseLabel: string;
  accentColor: string;
  id: number;
};

export default function StarsGridAnimated({ stars }: { stars: Star[] }) {
  const locale = useLocale();
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-self-center md:gap-[80px]">
        {stars.map((s, i) => (
          <ChapterCard
            key={i}
            coverSrc={s.coverSrc}
            coverAlt={s.coverAlt}
            title={s.title}
            releaseLabel={s.releaseLabel}
            accentColor={s.accentColor}
            platforms={[]}
            viewMoreHref={`/${locale}/stars/${s.id}`}
            variant="stars"
          />
        ))}
      </div>
    </motion.section>
  );
}
