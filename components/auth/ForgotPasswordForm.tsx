"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import { authenticationService } from "@/lib/api/services/authentication.service";
import type { RequestResetPasswordRequest } from "@/lib/api/types";

type TFn = (key: string) => string;

interface ForgotPasswordFormProps {
  t: TFn;
  onBackToLogin: () => void;
  primaryButtonClass: string;
}

export default function ForgotPasswordForm({
  t,
  onBackToLogin,
  primaryButtonClass,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: RequestResetPasswordRequest = { email };
      await authenticationService.requestResetPassword(payload);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || t("notices.something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-[18px] uppercase text-[var(--color-brand-500)]">
            {t("forms.forgot_password_title")}
          </h2>
          <p className="text-[12px] leading-relaxed text-[var(--color-brand-300)]">
            {t("forms.reset_link_sent") || "We've sent you an email with instructions to reset your password."}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToLogin}
          className={primaryButtonClass}
        >
          {t("forms.back_to_login")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-[18px] uppercase text-[var(--color-brand-500)]">
          {t("forms.forgot_password_title")}
        </h2>
        <p className="text-[12px] leading-relaxed text-[var(--color-brand-300)]">
          {t("forms.forgot_password_description")}
        </p>
      </div>

      <AuthField
        label={t("forms.email")}
        placeholder={t("forms.email_placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}

      <button 
        type="submit"
        disabled={loading || !email}
        className={primaryButtonClass + " disabled:opacity-50 disabled:cursor-not-allowed"}
      >
        {loading ? t("labels.loading") : t("forms.send_link")}
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-center text-[11px] text-[var(--color-brand-300)] hover:text-[var(--color-brand-500)] mt-2"
      >
        {t("forms.back_to_login")}
      </button>
    </form>
  );
}
