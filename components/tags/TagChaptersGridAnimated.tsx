"use client";

import { motion } from "framer-motion";
import ChapterCard from "@/components/chapters/ChapterCard";
import { CartItem } from "@/lib/stores/cart.store";

type Chapter = {
  coverSrc: string;
  coverAlt: string;
  title: string;
  releaseLabel: string;
  platforms?: string[];
  accentColor: string;
  viewMoreHref?: string;
  cartItem?: Omit<CartItem, "quantity">;
};

export default function TagChaptersGridAnimated({
  chapters,
}: {
  chapters: Chapter[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: true, amount: 0 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {chapters.map((c, i) => (
          <ChapterCard
            key={`${c.title}-${i}`}
            coverSrc={c.coverSrc}
            coverAlt={c.coverAlt}
            title={c.title}
            releaseLabel={c.releaseLabel}
            platforms={c.platforms}
            accentColor={c.accentColor}
            viewMoreHref={c.viewMoreHref}
            cartItem={c.cartItem}
            variant="default"
          />
        ))}
      </div>
    </motion.section>
  );
}
