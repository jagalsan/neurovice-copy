"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useT } from "@/providers/I18nProvider";
import { useLocale } from "@/providers/LocaleProvider";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useT();
  
  const segments = pathname.split("/").filter(Boolean);
  const pathSegments = segments.slice(1); 

  if (pathSegments.length === 0) return null;

  const getViewTranslation = (segment: string): string => {
    const key = segment.replace(/-/g, "_");
    const translation = t(`views.${key}`);
    
    return translation !== `views.${key}` ? translation : segment.replace(/-/g, " ");
  };

  return (
    <div
      className="
        w-full 
        bg-[#111118]/30 
        border-y border-white/5 
        shadow-[0_6px_22px_rgba(23,251,248,0.05)]
      "
    >
      <div className="max-w-[1459px] mx-auto px-6 h-12 flex items-center text-sm font-heading uppercase tracking-wide">
        <Link
          href={`/${locale}`}
          className="text-[var(--color-brand-500)] hover:text-white transition"
        >
          {t("views.home")}
        </Link>

        {pathSegments.map((segment, idx) => {
          const href = `/${locale}/${pathSegments.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathSegments.length - 1;
          const translatedName = getViewTranslation(segment);

          return (
            <span key={idx} className="flex items-center">
              <span className="mx-2 text-[var(--color-brand-300)]">/</span>

              {isLast ? (
                <span className="text-white">{translatedName}</span>
              ) : (
                <Link
                  href={href}
                  className="text-[var(--color-brand-500)] hover:text-white transition"
                >
                  {translatedName}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
