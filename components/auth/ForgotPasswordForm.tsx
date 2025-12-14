"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import { useRequestResetPassword } from "@/lib/hooks/api/useAuth";
import type { RequestResetPasswordRequest } from "@/lib/api/types";
import Button from "@/components/ui/Button";

type TFn = (key: string) => string;

interface ForgotPasswordFormProps {
  t: TFn;
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({
  t,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const requestResetPassword = useRequestResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload: RequestResetPasswordRequest = { email };
      await requestResetPassword.mutateAsync(payload);
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || t("forms.errors.something_went_wrong"));
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
            {t("forms.reset_link_sent")}
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={onBackToLogin}
          fullWidth
        >
          {t("forms.back_to_login")}
        </Button>
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
        t={t}
      />

      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={requestResetPassword.isPending || !email}
        fullWidth
      >
        {requestResetPassword.isPending ? t("labels.loading") : t("forms.send_link")}
      </Button>

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
