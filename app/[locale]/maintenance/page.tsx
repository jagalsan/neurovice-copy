import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import MaintenanceClient from "@/components/maintenance/MaintenanceClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.maintenance_title",
    descriptionKey: "seo.maintenance_description",
    path: "/maintenance",
  });
}

export default async function MaintenancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <MaintenanceClient locale={locale as Locale} />;
}
