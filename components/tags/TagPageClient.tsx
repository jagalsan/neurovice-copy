"use client";

import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import TagChaptersGridAnimated from "@/components/tags/TagChaptersGridAnimated";
import { useT } from "@/providers/I18nProvider";
import { primaryButtonBase } from "@/lib/styles/buttons";

const chips = ["ROLEPLAY", "LATINA", "PETITE", "PIERCED NIPPLES", "TATTOOS"];

const chapters = Array.from({ length: 12 }).map((_, i) => ({
  coverSrc: `/mock/example_${(i % 3) + 1}_x.png`,
  coverAlt: `Chapter ${i + 1}`,
  title: "TURBOFAP",
  releaseLabel: "1 YEAR SUBSCRIPTION",
  platforms: ["META", "WINDOWS", "APK"] as string[],
  accentColor: "#17FBF8",
  viewMoreHref: "#",
  cartItem: {
    id: `tag-chapter-${i + 1}`,
    title: "TURBOFAP",
    subtitle: "1 YEAR SUBSCRIPTION",
    price: 49.99,
    oldPrice: 79.99,
    imageSrc: `/mock/example_${(i % 3) + 1}_x.png`,
  },
}));

interface TagPageClientProps {
  tag: string;
}

export default function TagPageClient({ tag }: TagPageClientProps) {
  const t = useT();

  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8 space-y-12">
      <Card className="bg-[transparent] space-y-0">
        <span
          className="text-[10px] md:text-xs font-[600] uppercase text-[#7FF7F5] mb-0"
          style={{ textShadow: "0 0 15px #00FFFC" }}
        >
          {t("views.tags")}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8] mb-8 mt-0">
          {tag}
        </h1>

        <h2 className="font-heading text-lg md:text-2xl text-[#17FBF8]">
          {t("messages.best_tag_var", { param: tag })}
        </h2>

        <p className="max-w-[980px] text-[14px] md:text-[15px] text-[#7FF7F5] mb-8 uppercase">
          {t("messages.tag_description_var", { param: tag })}
        </p>

        <h3 className="font-heading text-sm md:text-base uppercase text-[#17FBF8]">
          {t("messages.what_makes_tag_special", { param: tag })}
        </h3>

        <p className="max-w-[980px] text-[14px] md:text-[15px] leading-relaxed text-[#7FF7F5] mb-4 uppercase">
          {t("messages.vr_porn_special_description")}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 mb-8">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase"
              style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
            >
              {c}
            </span>
          ))}
        </div>

        <button className={primaryButtonBase}>
          <span className="relative z-10">
            {t("actions.unlock_with_subscription")}
          </span>
        </button>
      </Card>

      <Card title={`Chapters tagged as #${tag}`}>
        <TagChaptersGridAnimated chapters={chapters} />
      </Card>
      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}
