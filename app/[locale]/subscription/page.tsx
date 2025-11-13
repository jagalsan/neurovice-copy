import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import SubscriptionContent from "@/components/subscription/SubscriptionContent";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.subscription_title",
    descriptionKey: "seo.subscription_description",
    path: "/subscription",
  });
}

export default function SubscriptionPage() {
  return <SubscriptionContent />;
}
