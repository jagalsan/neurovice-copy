"use client";

import { useState } from "react";
import Image from "next/image";
import { BackHeader, Toggle, sectionTitleClass } from "./shared";

interface VrSettingsViewProps {
  t: (k: string) => string;
  onBack: () => void;
}

export default function VrSettingsView({ t, onBack }: VrSettingsViewProps) {
  const [autoSwitching, setAutoSwitching] = useState(false);
  const [handRendering, setHandRendering] = useState(true);
  const [quickMenu, setQuickMenu] = useState(true);
  const [controller, setController] = useState<"left" | "right">("left");
  const [selectedPreset, setSelectedPreset] = useState<number>(0);

  const controllerLabelClass =
    "text-[14px] uppercase font-heading text-[#17FBF8]";

  return (
    <div className="text-white text-[13px] space-y-6">
      <BackHeader label={t("views.vr_settings")} onBack={onBack} />

      <section className="space-y-4 md:px-8">
        <p className={sectionTitleClass}>{t("labels.general")}</p>

        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className={controllerLabelClass}>
              {t("labels.auto_switching_scenes")}
            </p>
            <p className="mt-1 text-[15px] text-[#17FBF899]">
              {t("messages.auto_switching_copy")}
            </p>
          </div>
          <Toggle active={autoSwitching} onChange={setAutoSwitching} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className={controllerLabelClass}>
              {t("labels.hand_rendering")}
            </p>
            <p className="mt-1 text-[15px] text-[#17FBF899]">
              {t("messages.hand_rendering_copy")}
            </p>
          </div>
          <Toggle active={handRendering} onChange={setHandRendering} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className={controllerLabelClass}>{t("labels.quick_menu")}</p>
            <p className="mt-1 text-[15px] text-[#17FBF899]">
              {t("messages.quick_menu_copy")}
            </p>
          </div>
          <Toggle active={quickMenu} onChange={setQuickMenu} />
        </div>
      </section>

      <section className="space-y-3 pt-3 md:px-8">
        <p className={sectionTitleClass}>{t("labels.controller")}</p>
        <div className="w-full h-[56px] rounded-[10px] border border-white/15 bg-black/40 flex">
          <button
            onClick={() => setController("left")}
            className={[
              "flex-1 rounded-[10px] text-[18px] uppercase font-heading font-bold",
              controller === "left"
                ? "bg-[linear-gradient(90deg,#17FBF8,#17C5C3)] text-[#050608]"
                : "text-[#17FBF899]",
            ].join(" ")}
          >
            {t("actions.left")}
          </button>
          <button
            onClick={() => setController("right")}
            className={[
              "flex-1 rounded-[10px] text-[18px] uppercase font-heading font-bold",
              controller === "right"
                ? "bg-[linear-gradient(90deg,#17FBF8,#17C5C3)] text-[#050608]"
                : "text-[#17FBF899]",
            ].join(" ")}
          >
            {t("actions.right")}
          </button>
        </div>
      </section>

      <section className="space-y-3 pt-3 md:px-8">
        <p className={sectionTitleClass}>{t("labels.playback")}</p>

        <div className="grid grid-cols-2 gap-4">
          {["/mock/vr-preset.png", "/mock/vr-preset.png"].map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPreset(idx)}
              className={[
                "relative h-[120px] rounded-[12px] overflow-hidden bg-black/50 transition-all duration-200",
                selectedPreset === idx
                  ? "border-2 border-[#17FBF8] shadow-[0_0_20px_rgba(23,251,248,0.4)]"
                  : "border border-white/10 hover:border-white/30",
              ].join(" ")}
            >
              <Image
                src={src}
                alt={`Playback preset ${idx + 1}`}
                fill
                className={[
                  "object-cover transition-all duration-200",
                  selectedPreset === idx
                    ? "opacity-100"
                    : "opacity-60 grayscale hover:opacity-80",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
