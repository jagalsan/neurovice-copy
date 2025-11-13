import BundlesSection from "@/components/bundle/BudleSections";
import HeroVideo from "@/components/HeroVideo";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.home_title",
    descriptionKey: "seo.home_description",
    path: "",
  });
}

export default async function Home({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <HeroVideo />
      <BundlesSection />
    </div>
  );
}
