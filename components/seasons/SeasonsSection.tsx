"use client";

import type { Season } from "@/lib/api/types";
import { useT } from "@/providers/I18nProvider";
import SeasonRow from "./SeasonRow";

function SeasonsRow({ seasons }: { seasons?: Season[] }) {
  const t = useT();

  if (!seasons || seasons.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--color-brand-300)] text-lg">
          {t("messages.no_seasons_available")}
        </p>
      </div>
    );
  }

  return (
    <>
      {seasons.map((season, seasonIndex) => (
        <SeasonRow
          key={season.id}
          season={season}
          seasonIndex={seasonIndex}
          t={t}
        />
      ))}
    </>
  );
}

export default function SeasonsSection({ seasons }: { seasons?: Season[] }) {
  return <SeasonsRow seasons={seasons} />;
}
