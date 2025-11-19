"use client";

import Link from "next/link";
import type { FooterLinks } from "@/types/footer";

type TFn = (key: string) => string;

interface FooterLinkColumnsProps {
  t: TFn;
  footerLinks: FooterLinks;
  onHowToRunChapters?: () => void;
}

export default function FooterLinkColumns({
  t,
  footerLinks,
  onHowToRunChapters,
}: FooterLinkColumnsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {footerLinks.left.map((column, idx) => (
        <div key={`${column.titleKey}-${idx}`}>
          <h3 className="text-[var(--color-brand-500)] font-heading uppercase mb-4 text-sm">
            {t(column.titleKey)}
          </h3>
          <ul className="space-y-2 text-sm">
            {column.items.map((item, subIdx) => (
              <li key={`${item.labelKey}-${subIdx}`}>
                {item.labelKey === "messages.how_to_run_chapters" &&
                onHowToRunChapters ? (
                  <button
                    type="button"
                    onClick={onHowToRunChapters}
                    className="hover:text-white/80 transition text-left"
                  >
                    {t(item.labelKey)}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white/80 transition"
                  >
                    {t(item.labelKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}