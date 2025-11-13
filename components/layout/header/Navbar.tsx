"use client";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import UnlockAllBtn from "../UnlockAllBtn";
import Logo from "./Logo";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";
import CartMenu from "./CartMenu";
import AuthModal from "../../AuthModal";
import ProfileModal from "../../ProfileModal";
import { useState, useEffect } from "react";
import { useT } from "@/providers/I18nProvider";
import InstallModal from "@/components/InstallModal";
import { useCurrentUser } from "@/lib/hooks/api/useAuth";
import { tokenManager } from "@/lib/utils/token-manager";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openInstall, setOpenInstall] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const locale = useLocale();
  const t = useT();
  const { data: user, refetch } = useCurrentUser();

  useEffect(() => {
    tokenManager.migrateOldTokens();
    if (tokenManager.isAuthenticated()) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [openMenu]);

  const handleOpenAuth = () => {
    setOpenMenu(false);
    setOpenAuth(true);
  };

  const handleOpenInstall = () => {
    setOpenMenu(false);
    setOpenInstall(true);
  };

  const handleOpenProfile = () => {
    setOpenMenu(false);
    setOpenProfile(true);
  };

  return (
    <>
      <header
        className="
          fixed top-0 left-0 w-full z-50
          border-b border-[#17FBF833]
          bg-[#0A0F13]/80 backdrop-blur-lg
        "
      >
        <div className="max-w-[1459px] mx-auto flex items-center p-0 justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center h-full pl-6">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center font-heading text-sm uppercase h-full">
            <UnlockAllBtn mobileVersion={false} />

            <button
              onClick={handleOpenInstall}
              className="
                relative px-6 min-w-[180px] h-full border-l border-[var(--color-border-green)]
                text-[var(--color-brand-500)]
                transition-all duration-300
                before:absolute before:inset-0 before:bg-[var(--color-brand-800)] before:opacity-0
                hover:before:opacity-20
                flex items-center justify-center
                uppercase
              "
            >
              {t("actions.install_app")}
            </button>

            {user ? (
              <button
                onClick={handleOpenProfile}
                className="
                  relative px-6 min-w-[180px] h-full border-l border-[var(--color-border-green)]
                  text-[var(--color-brand-500)]
                  transition-all duration-300
                  before:absolute before:inset-0 before:bg-[var(--color-brand-800)] before:opacity-0
                  hover:before:opacity-20
                  flex items-center justify-center
                  uppercase
                "
              >
                {t("actions.profile") || "Perfil"}
              </button>
            ) : (
              <button
                onClick={() => setOpenAuth(true)}
                className="
                  relative px-6 min-w-[180px] h-full border-l border-[var(--color-border-green)]
                  text-[var(--color-brand-500)]
                  transition-all duration-300
                  before:absolute before:inset-0 before:bg-[var(--color-brand-800)] before:opacity-0
                  hover:before:opacity-20
                  flex items-center justify-center
                  uppercase
                "
              >
                {t("actions.sign_in")}
              </button>
            )}
            <div className="flex items-center h-full border-l border-[var(--color-border-green)] px-6">
              <CartMenu />
            </div>
          </nav>

          <HamburgerButton open={openMenu} setOpen={setOpenMenu} />
        </div>
        <MobileMenu
          open={openMenu}
          onLoginClick={handleOpenAuth}
          onInstallClick={handleOpenInstall}
          onProfileClick={handleOpenProfile}
          user={user ?? undefined}
        />
      </header>

      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
      <InstallModal
        isOpen={openInstall}
        onClose={() => setOpenInstall(false)}
      />
      <ProfileModal
        isOpen={openProfile}
        onClose={() => setOpenProfile(false)}
      />
    </>
  );
}
