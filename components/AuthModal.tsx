"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import { primaryButtonBase } from "@/lib/styles/buttons";
import QuickLogin from "./auth/QuickLogin";
import AuthTabs from "./auth/AuthTabs";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "signup" | "forgot";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const t = useT();
  const [mode, setMode] = useState<AuthMode>("login");

  const isLogin = mode === "login";
  const isForgot = mode === "forgot";

  const handleAuthSuccess = () => {
    onClose();
  };

  return (
    <Modal t={t} isOpen={isOpen} onClose={onClose}>
      <div className="font-heading text-white text-sm">
        {isForgot ? (
          <ForgotPasswordForm
            t={t}
            onBackToLogin={() => setMode("login")}
            primaryButtonClass={primaryButtonBase}
          />
        ) : (
          <div className="space-y-6">
            <QuickLogin t={t} />

            <div className="flex items-center">
              <div className="h-px flex-1 bg-white/10" />
              <span className="px-3 text-[10px] uppercase tracking-[0.18em]">
                {t("labels.or")}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <AuthTabs
              t={t}
              activeTab={isLogin ? "login" : "signup"}
              onTabChange={(tab) => setMode(tab)}
            />

            {isLogin ? (
              <LoginForm
                t={t}
                onForgotPassword={() => setMode("forgot")}
                primaryButtonClass={primaryButtonBase}
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <RegisterForm 
                t={t} 
                primaryButtonClass={primaryButtonBase}
                onSuccess={handleAuthSuccess}
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
