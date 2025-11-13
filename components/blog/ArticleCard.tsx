import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  imageSrc: string;
  imageAlt: string;
  category: string;
  categoryHref?: string;
  date: string;
  title: string;
  href: string;
};

export default function ArticleCard({
  imageSrc,
  imageAlt,
  category,
  categoryHref = "#",
  date,
  title,
  href,
}: ArticleCardProps) {
  return (
    <article
      className="
        group flex flex-col overflow-hidden
        rounded-[24px]
        bg-[#050608]
        border border-[rgba(255,255,255,0.08)]
        shadow-[0_18px_40px_rgba(0,0,0,0.85)]
        transition-transform duration-300 hover:-translate-y-1
      "
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[24px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

        <Link
          href={href}
          aria-label="Open article"
          className="
            absolute inset-0
            flex items-center justify-center
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            pointer-events-none group-hover:pointer-events-auto
          "
        >
          <span
            className="
              inline-flex items-center justify-center
              px-8 py-3 rounded-full
              bg-[#00000099]
              border border-white
              backdrop-blur-[12px]
              text-white text-[18px] font-semibold uppercase
              shadow-[0_8px_24px_rgba(0,0,0,0.8)]
            "
          >
            Open
          </span>
        </Link>
      </div>

      <div className="px-6 pt-5 pb-6 bg-[#050608]">
        <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.18em] uppercase mb-3">
          <Link
            href={categoryHref}
            className="text-[#17FBF8] font-heading hover:text-[#7FFFFF] transition-colors"
          >
            {category}
          </Link>
          <span className="text-[#17FBF8]">•</span>
          <span className="text-white/60 font-heading">{date}</span>
        </div>

        <h3
          className="
            font-heading text-[18px] leading-snug uppercase
            text-white mb-5
          "
        >
          {title}
        </h3>

        <Link
          href={href}
          className="
            inline-flex items-center gap-2
            font-heading text-[12px] tracking-[0.2em] uppercase
            text-[#17FBF8]
            hover:text-white
            transition-colors
          "
        >
          <span>Read more</span>
          <span className="text-[16px] translate-y-[1px]">➜</span>
        </Link>
      </div>
    </article>
  );
}
