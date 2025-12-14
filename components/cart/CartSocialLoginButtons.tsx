"use client";

import { useState } from "react";
import Image from "next/image";
import { useGoogleAuthUrl, useFacebookAuthUrl } from "@/lib/hooks/api/useAuth";
import { MetaIcon } from "@/components/icons/PlatformIcons";

type TFn = (key: string) => string;

interface CartSocialLoginButtonsProps {
  t: TFn;
}

export default function CartSocialLoginButtons({ t }: CartSocialLoginButtonsProps) {
  const [loading, setLoading] = useState<"google" | "meta" | null>(null);
  const { refetch: getGoogleUrl } = useGoogleAuthUrl();
  const { refetch: getFacebookUrl } = useFacebookAuthUrl();

  const handleGoogle = async () => {
    try {
      setLoading("google");
      const { data: url } = await getGoogleUrl();
      if (url) window.location.href = url;
    } finally {
      setLoading(null);
    }
  };

  const handleMeta = async () => {
    try {
      setLoading("meta");
      const { data: url } = await getFacebookUrl();
      if (url) window.location.href = url;
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
