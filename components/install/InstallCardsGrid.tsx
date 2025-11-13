import { InstallCard } from "./InstallCard";

type TFn = (key: string) => string;

interface InstallCardsGridProps {
  t: TFn;
}

export function InstallCardsGrid({ t }: InstallCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      <InstallCard
        variant="windows"
        tagLabel={t("labels.highest_quality")}
        platformLabel={t("labels.app_for_windows")}
        title={t("labels.windows_pcvr_title")}
        description={t("messages.install_windows_description")}
        extraLabel={t("labels.includes_2d_viewer")}
        primaryLabel={t("actions.download_for_windows")}
        secondaryLabel={t("actions.how_to_install")}
      />
      <InstallCard
        variant="apk"
        tagLabel={t("labels.high_quality")}
        platformLabel={t("labels.app_for_android")}
        title={t("labels.android_devices_title")}
        description={t("messages.install_android_description")}
        primaryLabel={t("actions.download_apk")}
        secondaryLabel={t("actions.how_to_install")}
      />
      <InstallCard
        variant="meta"
        tagLabel={t("labels.easy_install")}
        platformLabel={t("labels.app_for_meta")}
        title={t("labels.meta_quest_title")}
        description={t("messages.install_meta_description")}
        primaryLabel={t("actions.open_in_meta_store")}
        secondaryLabel={t("actions.how_to_install")}
      />
    </div>
  );
}
