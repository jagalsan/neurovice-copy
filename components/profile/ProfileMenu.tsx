"use client";

import {
  User,
  SlidersHorizontal,
  WalletCards,
  ChevronRight,
} from "lucide-react";
import { useSignOut } from "@/lib/hooks/api/useAuth";
import DiscordBtn from "../DiscordBtn";
import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";

type ProfileView = "menu" | "profile" | "vr" | "purchases";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

function MenuButton({ icon, label, onClick, isActive }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full h-[56px] rounded-[10px] flex items-center justify-between px-4 transition-all duration-200 font-heading font-bold",
        isActive
          ? "bg-[linear-gradient(180deg,rgba(17,17,24,0.5),rgba(17,17,24,0.5))] border border-[#17FBF81A] shadow-[0_0_15px_0_rgba(0,255,252,0.1)]"
          : "border border-white/10 bg-[rgba(0,0,0,0.5)] hover:bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center">{icon}</div>
        <span className="text-[13px] tracking-[0.18em] uppercase text-[#17FBF8]">
          {label}
        </span>
      </div>
      <ChevronRight
        className={`w-4 h-4 text-[#17FBF8] ${isActive ? "opacity-100" : "opacity-50"}`}
      />
    </button>
  );
}

interface ProfileMenuProps {
  t: (k: string) => string;
  onNavigate: (view: ProfileView) => void;
  onClose: () => void;
  currentView?: ProfileView;
}

export default function ProfileMenu({
  t,
  onNavigate,
  onClose,
  currentView = "menu",
}: ProfileMenuProps) {
  const signOutMutation = useSignOut();
  const locale = useLocale();

  const handleLogout = async () => {
    await signOutMutation.mutateAsync();
    onClose();
  };

  return (
    <div className="text-[13px] text-white flex flex-col h-full">
      <h2 className="text-[#17FBF8] text-[14px] tracking-[0.24em] bg-[#0000001A] font-heading uppercase mb-5 pb-4 pt-4 border-b border-[#000000] md:p-8 ">
        {t("labels.menu")}
      </h2>

      <div className="space-y-3 mb-6 md:p-8 ">
        <MenuButton
          icon={<User className="w-4 h-4" />}
          label={t("views.my_profile")}
          onClick={() => onNavigate("profile")}
          isActive={currentView === "profile"}
        />
        <MenuButton
          icon={<SlidersHorizontal className="w-4 h-4" />}
          label={t("views.vr_settings")}
          onClick={() => onNavigate("vr")}
          isActive={currentView === "vr"}
        />
        <MenuButton
          icon={<WalletCards className="w-4 h-4" />}
          label={t("views.my_purchases")}
          onClick={() => onNavigate("purchases")}
          isActive={currentView === "purchases"}
        />
      </div>

      <div className="border-t border-[#000000] my-4" />

      <div className="flex justify-between flex-col h-full md:p-8">
        <div className="space-y-2 text-[14px]">
          <button className="block text-left text-[#17C5C3] hover:text-[#17FBF8] uppercase transition-colors">
            {t("views.how_to_run_chapter")}
          </button>
          <button className="block text-left text-[#17C5C3] hover:text-[#17FBF8] uppercase transition-colors">
            {t("actions.download_app")}
          </button>
          <Link
            href={`/${locale}/privacy-policies`}
            onClick={onClose}
            className="block text-left text-[#17C5C3] hover:text-[#17FBF8] uppercase transition-colors"
          >
            {t("views.privacy")}
          </Link>
          <Link
            href={`/${locale}/terms-of-use`}
            onClick={onClose}
            className="block text-left text-[#17C5C3] hover:text-[#17FBF8] uppercase transition-colors"
          >
            {t("views.terms")}
          </Link>
          <button
            onClick={handleLogout}
            disabled={signOutMutation.isPending}
            className="mt-2 block text-left text-[#E41D8D] hover:text-[#ff4ab0] transition-colors disabled:opacity-50 mb-8 uppercase"
          >
            {signOutMutation.isPending ? "..." : t("actions.logout")}
          </button>
        </div>

        <DiscordBtn />
      </div>
    </div>
  );
}
