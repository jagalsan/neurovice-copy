"use client";

import { useState } from "react";
import { useSignIn, useSignUp, useRequestResetPassword } from "@/lib/hooks/api/useAuth";
import CartAuthField from "./CartAuthField";
import CartSocialLoginButtons from "./CartSocialLoginButtons";

type AuthMode = "login" | "register" | "forgot";
type TFn = (key: string) => string;

interface CartAuthSectionProps {
  t: TFn;
  onAuthSuccess?: () => void;
}

export default function CartAuthSection({ t, onAuthSuccess }: CartAuthSectionProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  const requestResetPassword = useRequestResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("forms.errors.fill_all_fields"));
      return;
    }

    if (mode === "register" && !name) {
      setError(t("forms.errors.enter_your_name"));
      return;
    }

    try {
      if (mode === "login") {
        await signInMutation.mutateAsync({ email, password });
      } else if (mode === "register") {
        await signUpMutation.mutateAsync({
          email,
          password,
          repeatPassword: password,
          name,
          lastName: "",
        });
      }
      onAuthSuccess?.();
    } catch {
      setError(t("notices.something_went_wrong"));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError(t("forms.errors.enter_your_email"));
      return;
    }

    try {
      await requestResetPassword.mutateAsync({ email });
      setError("");
      alert(t("messages.password_reset_sent"));
      setMode("login");
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || t("forms.errors.error_sending_reset_email"));
    }
  };

  const isLoading = signInMutation.isPending || signUpMutation.isPending;

  if (mode === "forgot") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-heading text-[20px] tracking-[0.18em] uppercase text-[#17FBF8]">
            {t("actions.forgot_password")}
          </h2>
        </div>

        <CartAuthField
          label={t("forms.email")}
          placeholder={t("forms.email_placeholder")}
          value={email}
          onChange={setEmail}
        />

        {error && <p className="text-[11px] text-red-400">{error}</p>}

        <button
          onClick={handleForgotPassword}
          className="
            w-full h-[78px]
            rounded-[16px]
            bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)]
            border border-[rgba(255,255,255,0.4)]
            shadow-[0_0_40px_rgba(23,197,195,0.9)]
            font-heading text-[16px] tracking-[0.24em] uppercase text-[#050608]
            flex items-center justify-center
            transition-transform duration-200 hover:scale-[1.02]
          "
        >
          {t("forms.send_link")}
        </button>

        <button
          onClick={() => setMode("login")}
          className="w-full text-center text-[11px] text-[#17FBF8] hover:text-white transition"
        >
          {t("forms.back_to_login")}
        </button>
      </div>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <CartAuthField
            label={t("forms.first_name")}
            placeholder={t("forms.first_name")}
            value={name}
            onChange={setName}
          />
        )}
        <CartAuthField
          label={t("forms.email")}
          placeholder={t("forms.email_placeholder")}
          value={email}
          onChange={setEmail}
        />
        <CartAuthField
          label={t("forms.password")}
          type="password"
          placeholder={t("forms.password_placeholder")}
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-[11px] text-red-400">{error}</p>}

        {mode === "login" && (
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="text-[11px] text-[#17FBF8] hover:text-white transition"
          >
            {t("actions.forgot_password")}
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full h-[78px]
            rounded-[16px]
            bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)]
            border border-[rgba(255,255,255,0.4)]
            shadow-[0_0_40px_rgba(23,197,195,0.9)]
            font-heading text-[16px] tracking-[0.24em] uppercase text-[#050608]
            flex items-center justify-center
            transition-transform duration-200 hover:scale-[1.02]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading
            ? t("labels.loading")
            : mode === "login"
            ? t("actions.sign_in")
            : t("actions.sign_up")}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-[var(--color-brand-300)] uppercase">
          {t("forms.or_continue_with")}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <CartSocialLoginButtons t={t} />
    </div>
  );
}
