"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale, setStoredLocale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] as Locale;

  const switchLocale = (newLocale: Locale) => {
    if (currentLocale === newLocale) return;

    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    
    setStoredLocale(newLocale);
    
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`
            px-3 py-1 rounded-md text-xs uppercase font-heading
            transition-colors
            ${
              currentLocale === locale
                ? "bg-[var(--color-brand-500)] text-black"
                : "bg-white/5 text-[var(--color-brand-300)] hover:bg-white/10"
            }
          `}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
