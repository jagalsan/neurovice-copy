"use client";

import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";

type ChipItem = string | { id: number; name: string };

interface ChipListProps {
  items: ChipItem[];
  linkable?: boolean;
  type?: "feature" | "genre";
  interactive?: boolean;
}

export default function ChipList({ 
  items, 
  linkable = false, 
  type, 
  interactive = true 
}: ChipListProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => {
        const isObject = typeof item === "object";
        const displayName = isObject ? item.name : item;
        const itemId = isObject ? item.id : index;
        const key = isObject ? `${item.id}-${item.name}` : item;
        
        const baseClasses = "rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase";
        const interactiveClasses = interactive 
          ? "cursor-pointer hover:bg-[#17FBF810] transition-colors" 
          : "";
        
        const chip = (
          <span
            key={key}
            className={`${baseClasses} ${interactiveClasses}`}
            style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
          >
            {displayName}
          </span>
        );

        if (linkable && type === "genre" && isObject) {
          return (
            <Link key={key} href={`/${locale}/tags/${itemId}`}>
              {chip}
            </Link>
          );
        }

        if (linkable && type === "genre" && !isObject) {
          const slug = displayName.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link key={key} href={`/${locale}/tags/${slug}`}>
              {chip}
            </Link>
          );
        }

        return chip;
      })}
    </div>
  );
}
