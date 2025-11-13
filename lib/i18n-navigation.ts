import { locales, type Locale } from "@/i18n/config";

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  const segments = path.split("/").filter(Boolean);
  
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  
  return path;
}

export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split("/").filter(Boolean);
  
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return segments[0] as Locale;
  }
  
  return null;
}
