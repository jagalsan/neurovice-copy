"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, getStoredLocale } from "@/i18n/config";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const preferredLocale = getStoredLocale();
    router.replace(`/${preferredLocale}`);
  }, [router]);

  return null;
}
