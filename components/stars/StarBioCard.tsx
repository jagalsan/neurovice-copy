"use client";

import Card from "@/components/Card";
import { useT } from "@/providers/I18nProvider";

interface StarBioCardProps {
  bio?: string;
}

export default function StarBioCard({ bio }: StarBioCardProps) {
  const t = useT();

  if (!bio) return null;

  return (
    <Card className="bg-[#111118]" title={t("labels.bio")}>
      <p className="text-[14px] leading-relaxed text-[#7FF7F5]">{bio}</p>
    </Card>
  );
}
