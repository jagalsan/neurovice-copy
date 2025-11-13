"use client";

import { ChevronLeft } from "lucide-react";

/* ---------- Shared Components ---------- */

export const sectionTitleClass =
  "text-[14px] uppercase text-[#17FBF8] font-[500] pb-3 border-b border-white mb-4";

export const fieldShellClass =
  "w-full rounded-[10px] border border-white/10 bg-[rgba(0,0,0,0.6)] px-4 py-3 flex flex-col gap-1";

interface ToggleProps {
  active: boolean;
  onChange?: (active: boolean) => void;
}

export function Toggle({ active, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange?.(!active)}
      className={[
        "relative w-[62px] h-[32px] rounded-full border border-white/20 flex items-center px-[4px]",
        active ? "bg-[#17FBF8]" : "bg-white/10",
      ].join(" ")}
    >
      <span
        className={[
          "w-[24px] h-[24px] rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)] transform transition-transform",
          active ? "translate-x-[26px]" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

interface PrimaryCtaProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryCta({ label, onClick, disabled, loading }: PrimaryCtaProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="
        w-full h-[56px] rounded-[10px]
       bg-transparent
        border border-[#17FBF8]
        font-heading text-[13px] tracking-[0.24em] uppercase text-[#17FBF8]
        flex items-center justify-center
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        not-disabled:hover:bg-[#17FBF8] not-disabled:hover:text-white not-disabled:hover:cursor-pointer
      "
    >
      {loading ? "..." : label}
    </button>
  );
}

interface BackHeaderProps {
  label: string;
  onBack: () => void;
}

export function BackHeader({ label, onBack }: BackHeaderProps) {
  return (
    <div className="flex items-center gap-3 md:mb-8 bg-[#0000001A] mb-5 pb-3 border-b border-[#000000] md:p-7">
      <button
        onClick={onBack}
        className="md:hidden w-8 h-8 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-[#17FBF8]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <h2 className="text-[#17FBF8] text-[18px] uppercase">
        {label}
      </h2>
    </div>
  );
}
