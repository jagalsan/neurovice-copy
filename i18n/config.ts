export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];

export async function getMessages(locale: string) {
  if (!locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  try {
    return (await import(`../i18n/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return (await import(`../i18n/${defaultLocale}.json`)).default;
  }
}

export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const browserLang = navigator.language.split('-')[0];
  
  if (browserLang === 'es') {
    return 'es';
  }

  return defaultLocale;
}

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const stored = localStorage.getItem('neurovice-locale');
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  return detectBrowserLocale();
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('neurovice-locale', locale);
}
