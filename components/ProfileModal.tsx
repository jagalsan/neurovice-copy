"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import ProfileMenu from "./profile/ProfileMenu";
import MyProfileView from "./profile/MyProfileView";
import VrSettingsView from "./profile/VrSettingsView";
import PurchasesView from "./profile/PurchasesView";

type ProfileView = "menu" | "profile" | "vr" | "purchases";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const t = useT();
  const [view, setView] = useState<ProfileView>("profile");

  const handleClose = () => {
    setView("profile");
    onClose();
  };

  const renderContent = () => {
    switch (view) {
      case "profile":
        return <MyProfileView t={t} onBack={() => setView("menu")} />;
      case "vr":
        return <VrSettingsView t={t} onBack={() => setView("menu")} />;
      case "purchases":
        return <PurchasesView t={t} onBack={() => setView("menu")} />;
      default:
        return <MyProfileView t={t} onBack={() => setView("menu")} />;
    }
  };

  return (
    <Modal t={t} isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="md:hidden">
        {view === "menu" && (
          <ProfileMenu t={t} onNavigate={setView} onClose={handleClose} currentView={view} />
        )}
        {view !== "menu" && renderContent()}
      </div>

      <div className="hidden md:flex md:gap-0 md:-m-8 md:min-h-[700px] md:max-h-[700px]">
        <div className="w-[320px] flex-shrink-0 bg-[rgba(5,10,13,0.6)] rounded-l-xl border-r border-white/5">
          <ProfileMenu t={t} onNavigate={setView} onClose={handleClose} currentView={view} />
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </Modal>
  );
}
