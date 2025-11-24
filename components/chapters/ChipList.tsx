"use client";

import Link from "next/link";

interface ChipListProps {
  items: string[];
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
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const baseClasses = "rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase";
        const interactiveClasses = interactive 
          ? "cursor-pointer hover:bg-[#17FBF810] transition-colors" 
          : "";
        
        const chip = (
          <span
            key={item}
            className={`${baseClasses} ${interactiveClasses}`}
            style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
          >
            {item}
          </span>
        );

        if (linkable && type === "genre") {
          const slug = item.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link key={item} href={`/tags/${slug}`}>
              {chip}
            </Link>
          );
        }

        return chip;
      })}
    </div>
  );
}
