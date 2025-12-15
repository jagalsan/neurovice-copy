"use client";

import { useT } from "@/providers/I18nProvider";
import type { Locale } from "@/i18n/config";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

interface MaintenanceClientProps {
  locale: Locale;
}

export default function MaintenanceClient({ locale }: MaintenanceClientProps) {
  const t = useT();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#171614] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#17FBF8]/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-[#17FBF8]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#17FBF8] mb-4 font-heading text-glow-cyan">
          {t("notices.maintenance_title")}
        </h1>

        <p className="text-[#17FBF8] mb-8">
          {t("notices.maintenance_description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="md" onClick={handleRefresh}>
            {t("actions.try_again")}
          </Button>

          <Button variant="outline" size="md" href={`/${locale}`}>
            {t("notices.maintenance_back_home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
