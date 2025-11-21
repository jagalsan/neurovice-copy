"use client";

import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import { primaryButtonBase } from "@/lib/styles/buttons";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDeny: () => void;
}

export default function AgeVerificationModal({ 
  isOpen, 
  onConfirm, 
  onDeny 
}: AgeVerificationModalProps) {
  const t = useT();

  return (
    <Modal 
      t={t} 
      isOpen={isOpen} 
      onClose={onDeny}
      size="md"
    >
      <div className="font-heading text-white text-sm space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-brand-500)]/10 flex items-center justify-center">
              <span className="text-3xl">🔞</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-500)] uppercase tracking-wider">
            {t("labels.age_verification")}
          </h2>

          <div className="space-y-3 text-[var(--color-brand-200)]">
            <p className="text-sm md:text-base">
              {t("messages.age_verification_message")}
            </p>
            <p className="text-xs md:text-sm text-[var(--color-brand-300)]">
              {t("messages.age_verification_warning")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={onConfirm}
            className={`${primaryButtonBase} flex-1 py-3 text-sm md:text-base uppercase tracking-wider`}
          >
            {t("actions.confirm_age")}
          </button>
          <button
            onClick={onDeny}
            className="flex-1 py-3 px-6 rounded-lg border border-white/10 bg-transparent text-white hover:bg-white/5 transition-all uppercase tracking-wider text-sm md:text-base"
          >
            {t("actions.deny_age")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
