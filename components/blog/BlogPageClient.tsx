"use client";

import { SearchBar } from "@/components/blog/SearchBar";
import { BlogList } from "@/components/blog/BlogList";
import type { Locale } from "@/i18n/config";
import { useT } from "@/providers/I18nProvider";

interface BlogPageClientProps {
  locale: Locale;
}

export function BlogPageClient({ locale }: BlogPageClientProps) {
  const t = useT();

  return (
    <section className="max-w-[1459px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <span
          className="text-xs font-[500] tracking-[0.28em] uppercase text-[var(--color-brand-500)] z-10 bg-transparent"
          style={{ textShadow: "0px 0px 15px #00FFFC" }}
        >
          {t("labels.blog")}
        </span>

        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-500)] mb-3">
          {t("labels.trending_topics")} &amp; {t("labels.expert_tips")}
        </h1>

        <p className="text-xs md:text-sm text-[var(--color-brand-300)] uppercase tracking-[0.18em] mb-8">
          {t("messages.stay_informed")}
        </p>

        <SearchBar />
      </div>

      <BlogList locale={locale} />
    </section>
  );
}
