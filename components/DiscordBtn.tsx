"use client";
import { FaDiscord } from "react-icons/fa6";
import { useT } from "@/providers/I18nProvider";

export default function DiscordBtn() {
  const t = useT();
  return (
    <button
      className="
        w-full py-4 rounded-xl font-heading uppercase tracking-wide
        flex items-center justify-center gap-3 text-sm
        bg-[linear-gradient(180deg,#5865F2_0%,#3B44D1_100%)]
        shadow-[0_0_30px_rgba(23,251,248,0.25)]
        hover:shadow-[0_0_40px_rgba(23,251,248,0.5)]
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <FaDiscord className="text-white text-lg" />
      {t("actions.link_discord")}
    </button>
  );
}
