import { locales, type Locale } from "@/i18n/config";
import { I18nProvider } from "@/providers/I18nProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { AgeVerificationProvider } from "@/providers/AgeVerificationProvider";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FaqSection from "@/components/layout/FaqSection";
import Breadcrumbs from "@/components/layout/header/Breadcrumbs";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const metadata: Record<Locale, Metadata> = {
  en: {
    title: "Neurovice - Premium VR Experience",
    description: "Premium VR adult entertainment platform with immersive virtual reality experiences. New releases every week.",
    keywords: ["VR", "Virtual Reality", "Adult Entertainment", "VR Games", "Meta Quest", "PCVR"],
    authors: [{ name: "Neurovice" }],
    openGraph: {
      title: "Neurovice - Premium VR Experience",
      description: "Premium VR adult entertainment platform with immersive virtual reality experiences",
      type: "website",
      locale: "en_US",
      siteName: "Neurovice",
    },
    twitter: {
      card: "summary_large_image",
      title: "Neurovice - Premium VR Experience",
      description: "Premium VR adult entertainment platform",
    },
  },
  es: {
    title: "Neurovice - Experiencia VR Premium",
    description: "Plataforma premium de entretenimiento para adultos en realidad virtual con experiencias inmersivas. Nuevos lanzamientos cada semana.",
    keywords: ["VR", "Realidad Virtual", "Entretenimiento Adultos", "Juegos VR", "Meta Quest", "PCVR"],
    authors: [{ name: "Neurovice" }],
    openGraph: {
      title: "Neurovice - Experiencia VR Premium",
      description: "Plataforma premium de entretenimiento para adultos en realidad virtual",
      type: "website",
      locale: "es_ES",
      siteName: "Neurovice",
    },
    twitter: {
      card: "summary_large_image",
      title: "Neurovice - Experiencia VR Premium",
      description: "Plataforma premium de entretenimiento para adultos en VR",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (localeParam || 'en') as Locale;
  return metadata[locale] || metadata.en;
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || 'en') as Locale;
  
  console.log('🔄 LocaleLayout rendering with locale:', locale, 'from params:', localeParam);
  
  return (
    <LocaleProvider locale={locale}>
      <QueryProvider>
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
      </QueryProvider>
    </LocaleProvider>
  );
}
