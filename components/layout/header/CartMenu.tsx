"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart.store";
import { useT } from "@/providers/I18nProvider";
import { useLocale } from "@/providers/LocaleProvider";

interface CartMenuProps {
  isMobile?: boolean;
}

export default function CartMenu({ isMobile = false }: CartMenuProps) {
  const t = useT();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { items, removeItem, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && totalItems > 0) {
      setBadgeAnimate(true);
      const timer = setTimeout(() => setBadgeAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems, hydrated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  if (isMobile) {
    return (
      <Link
        href={`/${locale}/cart`}
        className="flex items-center gap-2 text-[var(--color-brand-500)] hover:text-[#17FBF8] transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {hydrated && totalItems > 0 && (
            <span
              className={[
                "absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1",
                "bg-[#17FBF8] text-[#050608] rounded-full",
                "flex items-center justify-center",
                "text-[10px] font-bold",
                "transition-transform duration-300",
                badgeAnimate ? "scale-125" : "scale-100",
              ].join(" ")}
            >
              {totalItems}
            </span>
          )}
        </div>
        <span className="font-heading text-sm uppercase">
          {t("actions.go_to_cart")}
        </span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[var(--color-brand-500)] hover:text-[#17FBF8] transition-colors"
        aria-label={t("actions.view_cart")}
      >
        <ShoppingCart className="w-6 h-6" />

        {hydrated && totalItems > 0 && (
          <span
            className={[
              "absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5",
              "bg-[#17FBF8] text-[#050608] rounded-full",
              "flex items-center justify-center",
              "text-[11px] font-bold",
              "transition-transform duration-300",
              badgeAnimate ? "scale-125" : "scale-100",
            ].join(" ")}
          >
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={[
            "absolute right-0 mt-2 w-[380px]",
            "bg-[#161D21] border border-white/10 rounded-[16px]",
            "shadow-[0_8px_32px_rgba(0,0,0,0.8)]",
            "animate-in fade-in slide-in-from-top-2 duration-200",
            "z-50",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="font-heading text-[16px] tracking-[0.18em] uppercase text-[#17FBF8]">
              {t("views.cart")}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label={t("actions.close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-[var(--color-brand-500)]" />
                <p className="text-[13px] text-white/60">
                  {t("messages.empty_cart")}
                </p>
              </div>
            ) : (
              <div className="px-6 py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-b-0"
                  >
                    <div className="relative w-[60px] h-[75px] rounded-[8px] overflow-hidden bg-black/40 border border-white/10 flex-shrink-0">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-[13px] tracking-[0.12em] uppercase text-[#17FBF8] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-brand-300)] mt-1">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[13px] font-bold text-white">
                          ${item.price}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-white/60">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors"
                      aria-label={t("actions.remove_item")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-[13px] tracking-[0.18em] uppercase text-white/60">
                  {t("labels.total")}
                </span>
                <span className="font-heading text-[20px] tracking-[0.12em] text-[#17FBF8]">
                  ${getTotalPrice()}
                </span>
              </div>
            </div>
          )}
          <div className="px-6 py-4 border-t border-white/10 space-y-4">
            <Link
              href={`/${locale}/cart`}
              onClick={() => setIsOpen(false)}
              className={[
                "w-full h-[48px] rounded-[12px]",
                "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)]",
                "border border-[rgba(255,255,255,0.4)]",
                "shadow-[0_0_20px_rgba(23,197,195,0.6)]",
                "font-heading text-[13px] tracking-[0.24em] uppercase text-[#050608]",
                "flex items-center justify-center gap-2",
                "transition-transform duration-200 hover:scale-[1.02]",
              ].join(" ")}
            >
              {t("actions.view_cart")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
