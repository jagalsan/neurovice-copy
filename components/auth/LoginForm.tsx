"use client";

import { useState } from "react";
import AuthField from "./AuthField";
import { useSignIn } from "@/lib/hooks/api/useAuth";
import type { SignInRequest } from "@/lib/api/types";
import Button from "@/components/ui/Button";

type TFn = (key: string) => string;

interface LoginFormProps {
  t: TFn;
  onForgotPassword: () => void;
  onSuccess?: () => void;
}

export default function LoginForm({
  t,
  onForgotPassword,
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
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || t("forms.errors.invalid_credentials"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        withForgot={true}
        onForgot={onForgotPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        t={t}
      />

      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={signInMutation.isPending || !email || !password}
        fullWidth
      >
        {signInMutation.isPending ? t("labels.loading") : t("actions.sign_in")}
      </Button>
    </form>
  );
}
