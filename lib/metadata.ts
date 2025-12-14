import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/config";

interface MetadataConfig {
  titleKey: string;
  descriptionKey: string;
  path?: string;
  keywords?: string[];
  image?: string;
}

const defaultKeywords = {
  en: ["VR adult content", "virtual reality", "adult entertainment", "immersive experiences", "Neurovice"],
  es: ["contenido adulto VR", "realidad virtual", "entretenimiento adulto", "experiencias inmersivas", "Neurovice"],
};

const baseUrl = "https://neurovice.com";
const defaultImage = `${baseUrl}/og-image.jpg`;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return path;
  }, obj as unknown) as string || path;
}

export async function generatePageMetadata(
  locale: Locale,
  config: MetadataConfig
): Promise<Metadata> {
  const messages = await getMessages(locale);
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  const keywords = config.keywords || defaultKeywords[locale];
  const url = config.path ? `${baseUrl}/${locale}${config.path}` : `${baseUrl}/${locale}`;
  const image = config.image || defaultImage;

  const title = getNestedValue(messages as Record<string, unknown>, config.titleKey);
  const description = getNestedValue(messages as Record<string, unknown>, config.descriptionKey);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: ogLocale,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en${config.path || ""}`,
        es: `${baseUrl}/es${config.path || ""}`,
      },
    },
  };
}
