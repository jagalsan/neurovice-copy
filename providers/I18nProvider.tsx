'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, getStoredLocale, setStoredLocale } from '@/i18n/config';
import enMessages from '@/i18n/en.json';
import esMessages from '@/i18n/es.json';

type Messages = Record<string, any>;

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  t: (key: string, params?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: string;
}

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
};

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const validLocale = (initialLocale === 'en' || initialLocale === 'es') ? initialLocale as Locale : defaultLocale;
  
  console.log('✅ I18nProvider initializing with locale:', validLocale, 'from initialLocale:', initialLocale);
  
  const [locale, setLocaleState] = useState<Locale>(validLocale);
  const [messages, setMessages] = useState<Messages>(messagesMap[validLocale]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialLocale && (initialLocale === 'en' || initialLocale === 'es')) {
      const newLocale = initialLocale as Locale;
      setLocaleState((currentLocale) => {
        if (newLocale !== currentLocale) {
          console.log('🌐 Changing locale from', currentLocale, 'to', newLocale);
          setMessages(messagesMap[newLocale]);
          return newLocale;
        }
        return currentLocale;
      });
    }
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    try {
      setIsLoading(true);
      setMessages(messagesMap[newLocale]);
      setLocaleState(newLocale);
      setStoredLocale(newLocale);
    } catch (error) {
      console.error('Failed to load messages for locale:', newLocale);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  const contextValue: I18nContextType = {
    locale,
    messages,
    t,
    setLocale,
    isLoading,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
}

export function useT() {
  const { t } = useTranslations();
  return t;
}
