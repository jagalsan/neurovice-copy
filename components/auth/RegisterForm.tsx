"use client";

import { useState } from "react";
import Link from "next/link";
import AuthField from "./AuthField";
import { useSignUp } from "@/lib/hooks/api/useAuth";
import type { SignUpRequest } from "@/lib/api/types";
import Button from "@/components/ui/Button";
import { useLocale } from "@/providers/LocaleProvider";

type TFn = (key: string) => string;

interface RegisterFormProps {
  t: TFn;
  onSuccess?: () => void;
}

export default function RegisterForm({ t, onSuccess }: RegisterFormProps) {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");

  const signUpMutation = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError(t("forms.errors.passwords_no_match"));
      return;
    }

    try {
      const payload: SignUpRequest = {
        name,
        lastName,
        email,
        password,
        repeatPassword,
      };
      await signUpMutation.mutateAsync(payload);

      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || t("forms.errors.something_went_wrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        label={t("forms.username")}
        placeholder={t("forms.username_placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        t={t}
      />

      <AuthField
        label={t("forms.last_name")}
        placeholder={t("forms.last_name")}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        t={t}
      />

      <AuthField
        label={t("forms.email")}
        placeholder={t("forms.email_placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        t={t}
      />

      <AuthField
        label={t("forms.password")}
        placeholder={t("forms.password_placeholder")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        t={t}
      />

      <AuthField
        label={t("forms.confirm_password")}
        placeholder={t("forms.password_placeholder")}
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        t={t}
      />

      <label className="flex items-start gap-3 mt-1 text-[11px] text-[var(--color-brand-300)] leading-relaxed">
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="
            mt-[2px] h-4 w-4 rounded-[6px]
            border border-[var(--color-brand-500)]
            bg-transparent
            checked:bg-[var(--color-brand-500)]
            checked:border-[var(--color-brand-500)]
            cursor-pointer
          "
        />
        <span>{t("forms.signup_marketing")}</span>
      </label>

      {error && <p className="text-[11px] text-red-400">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={signUpMutation.isPending || !email || !password || !name || !lastName}
        fullWidth
      >
        {signUpMutation.isPending ? t("labels.loading") : t("actions.sign_up")}
      </Button>

      <p className="mt-4 text-[11px] leading-relaxed text-[var(--color-brand-300)] text-center">
        {t("forms.signup_legal_prefix")}{" "}
        <Link
          href={`/${locale}/terms-of-use`}
          className="underline hover:text-[var(--color-brand-500)]"
        >
          {t("views.terms")}
        </Link>{" "}
        {t("forms.signup_legal_middle")}{" "}
        <Link
          href={`/${locale}/privacy-policies`}
          className="underline hover:text-[var(--color-brand-500)]"
        >
          {t("views.privacy")}
        </Link>{" "}
        {t("forms.signup_legal_suffix")}.
      </p>
    </form>
  );
}
