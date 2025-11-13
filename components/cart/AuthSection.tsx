"use client";

import { useState } from "react";
import Image from "next/image";
import { useSignIn, useSignUp } from "@/lib/hooks/api/useAuth";
import { authenticationService } from "@/lib/api/services/authentication.service";
import { MetaIcon } from "@/components/icons/PlatformIcons";

type AuthMode = "login" | "register" | "forgot";

interface AuthSectionProps {
  t: (key: string) => string;
  onAuthSuccess?: () => void;
}

function AuthField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <label className="block font-heading text-[11px] tracking-[0.18em] uppercase text-[var(--color-brand-400)] mb-2">
        {label}
      </label>
      <div className="h-[72px] rounded-[12px] border border-white/15 bg-black/40 px-4 flex items-center">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-[13px] text-white placeholder:text-[var(--color-brand-300)]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function SocialLoginButtons({ t }: { t: (key: string) => string }) {
  const [loading, setLoading] = useState<"google" | "meta" | null>(null);

  const handleGoogle = async () => {
    try {
      setLoading("google");
      const url = await authenticationService.getGoogleAuthUrl();
      window.location.href = url;
    } finally {
      setLoading(null);
    }
  };

  const handleMeta = async () => {
    try {
      setLoading("meta");
      const url = await authenticationService.getFacebookAuthUrl();
      window.location.href = url;
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading !== null}
        className="flex-1 h-[72px] rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/8 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "google" ? (
          <span className="text-[11px]">{t("labels.loading")}</span>
        ) : (
          <Image src="/icons/google.svg" alt="Google" width={32} height={32} />
        )}
      </button>
      <button
        type="button"
        onClick={handleMeta}
        disabled={loading !== null}
        className="flex-1 h-[72px] rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/8 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading === "meta" ? (
          <span className="text-[11px]">{t("labels.loading")}</span>
        ) : (
          <MetaIcon />
        )}
      </button>
    </div>
  );
}

export default function AuthSection({ t, onAuthSuccess }: AuthSectionProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (mode === "register" && !name) {
      setError("Please enter your name");
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
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      await authenticationService.requestResetPassword({ email });
      setError("");
      alert(t("messages.password_reset_sent") || "Password reset link sent to your email");
      setMode("login");
    } catch (err: any) {
      setError(err?.message || "Error sending reset email");
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

        <AuthField
          label={t("forms.email")}
          placeholder={t("forms.email_placeholder")}
          value={email}
          onChange={setEmail}
        />

        {error && (
          <p className="text-[11px] text-red-400">{error}</p>
        )}

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
          {t("actions.send_reset_link") || "Send reset link"}
        </button>

        <button
          onClick={() => setMode("login")}
          className="w-full text-center text-[11px] text-[#17FBF8] hover:text-white transition"
        >
          {t("actions.back_to_login") || "Back to login"}
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
          <AuthField
            label={t("forms.first_name")}
            placeholder={t("forms.first_name") || "Name"}
            value={name}
            onChange={setName}
          />
        )}
        <AuthField
          label={t("forms.email")}
          placeholder={t("forms.email_placeholder")}
          value={email}
          onChange={setEmail}
        />
        <AuthField
          label={t("forms.password")}
          type="password"
          placeholder={t("forms.password_placeholder")}
          value={password}
          onChange={setPassword}
        />

        {error && (
          <p className="text-[11px] text-red-400">{error}</p>
        )}

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

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="px-3 py-1 text-[10px] rounded-[8px] bg-black/60 border border-white/20 font-heading tracking-[0.24em] uppercase">
          {t("labels.or")}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <SocialLoginButtons t={t} />
    </div>
  );
}
