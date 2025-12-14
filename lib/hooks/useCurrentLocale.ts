"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function useCurrentLocale(): Locale {
  const pathname = usePathname();
  
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] === 'en' || segments[0] === 'es' ? segments[0] : 'en';
  
  return currentLocale as Locale;
}

export function useLocalizedPath(path: string): string {
  const currentLocale = useCurrentLocale();
  
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  return `/${currentLocale}/${cleanPath}`;
}
