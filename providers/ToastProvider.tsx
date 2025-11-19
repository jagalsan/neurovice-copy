"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center">
        <div className="flex w-full max-w-sm flex-col gap-2 px-4">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={
                "pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm shadow-lg border " +
                (toast.variant === "success"
                  ? "bg-[#17FBF8] border-[#0CC9C6] text-[#050608]"
                  : toast.variant === "error"
                  ? "bg-[#FF4D6E] border-[#D62C4E] text-[#1B0107]"
                  : "bg-[#A6F9F7] border-[#337877] text-[#050608]")
              }
            >
              <span className="inline-block h-2 w-2 rounded-full bg-current" />
              <p className="flex-1 font-heading uppercase tracking-[0.16em] text-[11px]">
                {toast.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
