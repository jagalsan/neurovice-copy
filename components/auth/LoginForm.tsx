"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import { useSignIn } from "@/lib/hooks/api/useAuth";
import type { SignInRequest } from "@/lib/api/types";

type TFn = (key: string) => string;

interface LoginFormProps {
  t: TFn;
  onForgotPassword: () => void;
  primaryButtonClass: string;
  onSuccess?: () => void;
}

export default function LoginForm({
  t,
  onForgotPassword,
  primaryButtonClass,
  onSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const signInMutation = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload: SignInRequest = { email, password };
      await signInMutation.mutateAsync(payload);
      
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || t("notices.invalid_credentials"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        label={t("forms.email")}
        placeholder={t("forms.email_placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthField
        label={t("forms.password")}
        placeholder={t("forms.password_placeholder")}
        type="password"
        withForgot={true}
        onForgot={onForgotPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}

      <button 
        type="submit"
        disabled={signInMutation.isPending || !email || !password}
        className={primaryButtonClass + " disabled:opacity-50 disabled:cursor-not-allowed"}
      >
        {signInMutation.isPending ? t("labels.loading") : t("actions.sign_in")}
      </button>
    </form>
  );
}
