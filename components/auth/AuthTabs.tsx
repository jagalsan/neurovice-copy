"use client";

type TFn = (key: string) => string;

interface AuthTabsProps {
  t: TFn;
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export default function AuthTabs({ t, activeTab, onTabChange }: AuthTabsProps) {
  const tabPillBase =
    "flex-1 h-[56px] rounded-[10px] flex items-center justify-center " +
    "font-heading text-[13px] tracking-[0.18em] uppercase transition-all";

  return (
    <div className="space-y-4">
      <h2 className="uppercase text-[14px] text-[var(--color-brand-500)]">
        {t("labels.with_email")}
      </h2>

      <div className="flex mb-2 rounded-[12px] border border-white/10 bg-black/40 p-1 gap-1">
        <button
          type="button"
          onClick={() => onTabChange("login")}
          className={
            tabPillBase +
            " " +
            (activeTab === "login"
              ? "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] shadow-[0_0_25px_rgba(23,197,195,0.6)]"
              : "text-[var(--color-brand-500)] bg-transparent hover:bg-white/5")
          }
        >
          {t("actions.sign_in")}
        </button>
        <button
          type="button"
          onClick={() => onTabChange("signup")}
          className={
            tabPillBase +
            " " +
            (activeTab === "signup"
              ? "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] shadow-[0_0_25px_rgba(23,197,195,0.6)]"
              : "text-[var(--color-brand-500)] bg-transparent hover:bg-white/5")
          }
        >
          {t("actions.sign_up")}
        </button>
      </div>
    </div>
  );
}
