'use client'
import { useT } from "@/providers/I18nProvider";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);
  const t = useT();

  return (
    <div className="relative overflow-hidden flex justify-end items-center border-t border-[rgba(23,251,247,0.1)] mt-4 h-[54px] px-2">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(23, 251, 247, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(23, 251, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 flex justify-end items-center gap-4 text-xs md:text-sm font-heading uppercase tracking-[0.18em]">
        <button
          className={`
            h-8 px-4 rounded-full border
            ${
              currentPage === 1
                ? "border-[rgba(23,251,247,0.42)] text-[rgba(23,251,247,0.42)] cursor-not-allowed"
                : "border-[rgba(23,251,247,0.8)] text-[var(--color-brand-500)] hover:bg-[rgba(23,251,247,0.1)]"
            }
            transition-colors
          `}
          disabled={currentPage === 1}
        >
          {t("actions.back")}
        </button>

        <div className="flex items-center gap-4">
          {pages.map((page) => (
            <button
              key={page}
              className={`
                px-1
                ${
                  page === currentPage
                    ? "text-[var(--color-brand-500)]"
                    : "text-[var(--color-brand-300)] hover:text-[var(--color-brand-500)]"
                }
              `}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`
            h-8 px-4 rounded-full border
            ${
              currentPage === totalPages
                ? "border-[rgba(23,251,247,0.42)] text-[rgba(23,251,247,0.42)] cursor-not-allowed"
                : "border-[rgba(23,251,247,0.8)] text-[var(--color-brand-500)] hover:bg-[rgba(23,251,247,0.1)]"
            }
            transition-colors
          `}
          disabled={currentPage === totalPages}
        >
          {t("actions.next")}
        </button>
      </div>
    </div>
  );
}
