import { locales, type Locale } from "@/i18n/config";
import { I18nProvider } from "@/providers/I18nProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { AgeVerificationProvider } from "@/providers/AgeVerificationProvider";
import { UserProvider } from "@/providers/UserProvider";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FaqSection from "@/components/layout/FaqSection";
import Breadcrumbs from "@/components/layout/header/Breadcrumbs";
import type { Metadata } from "next";
import enMessages from "@/i18n/en.json";
import esMessages from "@/i18n/es.json";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const messagesMap = { en: enMessages, es: esMessages };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (localeParam === 'es' ? 'es' : 'en') as Locale;
  const messages = messagesMap[locale];
  const meta = messages.seo;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(", "),
    authors: [{ name: "Neurovice" }],
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: "Neurovice",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitter_title,
      description: meta.twitter_description,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || 'en') as Locale;
  
  return (
    <LocaleProvider locale={locale}>
      <QueryProvider>
        <UserProvider>
          <I18nProvider key={locale} initialLocale={locale}>
            <ToastProvider>
              <AgeVerificationProvider>
                <Navbar />
                <div className="pt-16">
                  <Breadcrumbs />
                  {children}
                </div>
                <FaqSection />
                <Footer />
              </AgeVerificationProvider>
            </ToastProvider>
          </I18nProvider>
        </UserProvider>
      </QueryProvider>
    </LocaleProvider>
  );
}
