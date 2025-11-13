"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  BackHeader,
  Toggle,
  PrimaryCta,
  sectionTitleClass,
  fieldShellClass,
} from "./shared";
import { authenticationService } from "@/lib/api/services/authentication.service";

interface MyProfileViewProps {
  t: (k: string) => string;
  onBack: () => void;
}

export default function MyProfileView({ t, onBack }: MyProfileViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setError("");
    setSuccess(false);

    if (!oldPassword || !newPassword) {
      setError(t("messages.password_change_error"));
      return;
    }

    setLoading(true);
    try {
      await authenticationService.updatePassword({
        oldPassword,
        newPassword,
      });

      setSuccess(true);
      setOldPassword("");
      setNewPassword("");

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(t("messages.password_change_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-heading text-white text-[13px] space-y-6">
      <BackHeader label={t("views.my_profile")} onBack={onBack} />

      <section className="space-y-3 md:px-8">
        <p className={sectionTitleClass}>{t("labels.notifications")}</p>

        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-[12px] font-semibold uppercase text-[#17FBF8]">
              {t("labels.email_notifications")}
            </p>
            <p className="mt-2 text-[12px] text-[var(--color-brand-300)]">
              {t("messages.email_notifications_copy")}
            </p>
          </div>
          <Toggle
            active={emailNotifications}
            onChange={setEmailNotifications}
          />
        </div>
      </section>

      <section className="space-y-4 pt-4 md:px-8">
        <p className={sectionTitleClass}>{t("labels.security")}</p>

        <div className="space-y-3">
          <div className={fieldShellClass}>
            <span className="text-[11px] uppercase text-[#17FBF8]">
              {t("forms.old_password")}
            </span>
            <input
              type="password"
              placeholder={t("forms.old_password_placeholder")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-white placeholder:text-[var(--color-brand-400)]"
            />
          </div>

          <div className={fieldShellClass}>
            <span className="text-[11px] tracking-[0.18em] uppercase text-[#17FBF8]">
              {t("forms.new_password")}
            </span>
            <input
              type="password"
              placeholder={t("forms.new_password_placeholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-white placeholder:text-[var(--color-brand-400)]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-[10px] bg-[#7A113366] border border-[#FF4AB0] px-4 py-3 text-[11px]">
              <AlertTriangle className="w-4 h-4 text-[#FF4AB0]" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 rounded-[10px] bg-[#002A2666] border border-[#17FBF8] px-4 py-3 text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-[#17FBF8]" />
              <span>{t("messages.password_change_success")}</span>
            </div>
          )}
        </div>

        <PrimaryCta
          label={t("actions.change_password")}
          onClick={handleChangePassword}
          loading={loading}
          disabled={!oldPassword || !newPassword}
        />
      </section>

      <section className="pt-4 md:px-8">
        <p className={sectionTitleClass}>{t("labels.subscription")}</p>
        <p className="mt-3 text-[11px] text-[var(--color-brand-300)]">
          {t("messages.no_active_subscription")}
        </p>
      </section>
    </div>
  );
}
