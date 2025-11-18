"use client";
import { useEffect } from "react";

type TFn = (key: string) => string;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  t: TFn;
  size?: "md" | "lg";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  t,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("modal-open");
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = size === "lg" ? "w-[95%] max-w-6xl" : "w-[95%] max-w-md";

  return (
    <div
      className="
        fixed inset-0 z-[999]
        bg-black/50 backdrop-blur-xl
        animate-fadeIn
        overflow-y-auto overflow-x-hidden
        flex items-start md:items-center justify-center
        py-4 md:py-0
        scroll-smooth-touch
      "
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center w-full min-h-full md:min-h-0 justify-start md:justify-center py-safe"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`
            flex items-center justify-end ${widthClasses}
            pb-4 md:pb-6
            text-[var(--color-brand-500)]
            hover:text-white transition
            font-heading uppercase tracking-widest text-sm
          `}
        >
          {t("actions.close")}
        </button>

        <div
          className={`
            relative ${widthClasses}
            rounded-xl p-6 md:p-8
            bg-[rgba(10,15,19,0.85)] border border-white/5
            shadow-[0px_0px_15px_0px_#17fbf873]
            animate-scaleIn
            mb-4 md:mb-0
            max-h-[calc(100vh-4rem)] overflow-y-auto
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
