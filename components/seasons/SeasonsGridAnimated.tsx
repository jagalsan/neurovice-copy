"use client";

import { motion } from "framer-motion";
import ContentCard from "@/components/cards/ContentCard";
import { useLocale } from "@/providers/LocaleProvider";
import { CartItem } from "@/lib/stores/cart.store";

type Scene = {
  coverSrc: string;
  coverAlt: string;
  title: string;
  platforms: string[];
  accentColor: string;
  viewMoreHref: string;
  cartItem?: Omit<CartItem, "quantity">;
};

export default function SeasonsGridAnimated({ scenes }: { scenes: Scene[] }) {
  const locale = useLocale();
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-[80px] justify-items-center">
        {scenes.map((scene, i) => (
          <ContentCard
            key={i}
            coverSrc={scene.coverSrc}
            coverAlt={scene.coverAlt}
            title={scene.title}
            platforms={scene.platforms}
            accentColor={scene.accentColor}
            viewMoreHref={scene.viewMoreHref}
            cartItem={scene.cartItem}
            variant="default"
          />
        ))}
      </div>
    </motion.section>
  );
}
