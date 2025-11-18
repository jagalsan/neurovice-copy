"use client";

import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import { InstallCardsGrid } from "./install/InstallCardsGrid";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHowToInstall?: () => void;
}

export default function InstallModal({ isOpen, onClose, onHowToInstall }: InstallModalProps) {
  const t = useT();

  return (
    <Modal t={t} isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex flex-col gap-8">
        <InstallCardsGrid t={t} onHowToInstall={onHowToInstall} />
      </div>
    </Modal>
  );
}
