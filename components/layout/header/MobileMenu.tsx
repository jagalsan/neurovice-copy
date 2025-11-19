"use client";
import Link from "next/link";
import UnlockAllBtn from "../UnlockAllBtn";
import DiscordBtn from "../../DiscordBtn";
import { User } from "@/lib/api/types";
import CartMenu from "./CartMenu";
import { useLocale } from "@/providers/LocaleProvider";
import { useT } from "@/providers/I18nProvider";

export default function MobileMenu({
  open,
  onLoginClick,
  onInstallClick,
  onProfileClick,
  onClose,
  user,
}: {
  open: boolean;
  onLoginClick: () => void;
  onInstallClick: () => void;
  onProfileClick: () => void;
  onClose: () => void;
  user?: User;
}) {
  const locale = useLocale();
  const t = useT();
  return (
    <div
      className={`
        md:hidden fixed top-16 left-0 w-full
        transition-all duration-500
        ${open ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        border-t border-[var(--color-border-green)]
        overflow-hidden z-50
        bg-[rgba(10,15,19,0.95)]
        backdrop-blur-xl
      `}
    >
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none
          bg-[linear-gradient(180deg,rgba(23,251,248,0.10)_0%,rgba(10,15,19,0)_96%)]
        "
      />

      <ul className="flex flex-col gap-5 py-6 text-lg uppercase font-heading">
        {user ? (
          <li
            className="px-6 text-[var(--color-brand-500)]"
            onClick={onProfileClick}
          >
            {t("labels.my_profile")}
          </li>
        ) : (
          <li
            className="px-6 text-[var(--color-brand-500)]"
            onClick={onLoginClick}
          >
            {t("actions.login")}
          </li>
        )}
        <li
          className="px-6 text-[var(--color-brand-500)]"
          onClick={onInstallClick}
        >
          {t("actions.install_app")}
        </li>

        <UnlockAllBtn mobileVersion={true} onClick={onClose} />
        <li className="px-6" onClick={onClose}>
          <CartMenu isMobile={true} />
        </li>

        <div className="flex flex-col gap-3 pl-6 text-sm text-[var(--color-brand-300)]">
          <Link href={`#`} onClick={onClose}>
            {t("actions.how_to_run_chapter")}
          </Link>
          <Link href={`#`} onClick={onClose}>
            {t("actions.download_app")}
          </Link>
          <Link href={`${locale}/privacy-policy`} onClick={onClose}>
            {t("views.privacy")}
          </Link>
          <Link href={`${locale}/terms-of-use`} onClick={onClose}>
            {t("views.terms")}
          </Link>
        </div>

        <div className="pt-6 px-4" onClick={onClose}>
          <DiscordBtn />
        </div>
      </ul>
    </div>
  );
}
