"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import QuickLogin from "@/components/auth/QuickLogin";

type AuthMode = "login" | "register" | "forgot";
type TFn = (key: string) => string;

interface CartAuthSectionProps {
  t: TFn;
  onAuthSuccess?: () => void;
}

export default function CartAuthSection({ t, onAuthSuccess }: CartAuthSectionProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  if (mode === "forgot") {
    return (
      <ForgotPasswordForm
        t={t}
        onBackToLogin={() => setMode("login")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-[20px] tracking-[0.18em] uppercase text-[#17FBF8] mb-4">
          {t("labels.sign_up_or_log_in")}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("login")}
            className={[
              "flex-1 h-[40px] rounded-[8px] font-heading text-[11px] tracking-[0.18em] uppercase transition-all",
              mode === "login"
                ? "bg-[#17FBF8] text-[#050608]"
                : "bg-black/40 text-white/60 hover:text-white",
            ].join(" ")}
          >
            {t("actions.sign_in")}
          </button>
          <button
            onClick={() => setMode("register")}
            className={[
              "flex-1 h-[40px] rounded-[8px] font-heading text-[11px] tracking-[0.18em] uppercase transition-all",
              mode === "register"
                ? "bg-[#17FBF8] text-[#050608]"
                : "bg-black/40 text-white/60 hover:text-white",
            ].join(" ")}
          >
            {t("actions.sign_up")}
          </button>
        </div>
      </div>

      {mode === "login" ? (
        <LoginForm
          t={t}
          onForgotPassword={() => setMode("forgot")}
          onSuccess={onAuthSuccess}
        />
      ) : (
        <RegisterForm
          t={t}
          onSuccess={onAuthSuccess}
        />
      )}

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-[var(--color-brand-300)] uppercase">
          {t("forms.or_continue_with")}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <QuickLogin t={t} />
    </div>
  );
}
