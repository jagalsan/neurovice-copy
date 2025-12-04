"use client";

import { useState } from "react";
import Image from "next/image";
import { useGoogleAuthUrl, useFacebookAuthUrl } from "@/lib/hooks/api/useAuth";
import { MetaIcon } from "../icons/PlatformIcons";

type TFn = (key: string) => string;

interface QuickLoginProps {
  t: TFn;
}

export default function QuickLogin({ t }: QuickLoginProps) {
  const [loading, setLoading] = useState<"google" | "facebook" | null>(null);
  const { refetch: getGoogleUrl } = useGoogleAuthUrl();
  const { refetch: getFacebookUrl } = useFacebookAuthUrl();

  const handleGoogleLogin = async () => {
    try {
      setLoading("google");
      const { data: url } = await getGoogleUrl();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Google OAuth error:", err);
      setLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading("facebook");
      const { data: url } = await getFacebookUrl();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Facebook OAuth error:", err);
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="uppercase text-[14px] text-[var(--color-brand-500)]">
        {t("labels.quick_login")}
      </h2>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading !== null}
          className="
            flex-1 h-[72px] rounded-[12px]
            bg-white/5 border border-white/10
            flex items-center justify-center
            hover:bg-white/8
            shadow-[0_0_0_rgba(0,0,0,0)]
            hover:shadow-[0_0_30px_rgba(0,0,0,0.7)]
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading === "google" ? (
            <span className="text-[11px]">{t("labels.loading")}</span>
          ) : (
            <Image
              src="/icons/google.svg"
              width={32}
              height={32}
              alt="Google"
            />
          )}
        </button>

        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={loading !== null}
          className="
            flex-1 h-[72px] rounded-[12px]
            bg-white/5 border border-white/10
            flex items-center justify-center
            hover:bg-white/8
            shadow-[0_0_0_rgba(0,0,0,0)]
            hover:shadow-[0_0_30px_rgba(0,0,0,0.7)]
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading === "facebook" ? (
            <span className="text-[11px]">{t("labels.loading")}</span>
          ) : (
            <MetaIcon />
          )}
        </button>
      </div>
    </div>
  );
}
