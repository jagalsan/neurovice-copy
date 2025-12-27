"use client";

import { useCartStore, type CartItem } from "@/lib/stores/cart.store";
import { useCallback } from "react";
import { useToast } from "@/providers/ToastProvider";
import { useT } from "@/providers/I18nProvider";
import { useRouter } from "next/navigation";
import { useLocale } from "@/providers/LocaleProvider";

type AddToCartItem = Omit<CartItem, "quantity">;

interface UseAddToCartReturn {
  addToCart: (item: AddToCartItem) => void;
  isInCart: (itemId: string) => boolean;
  items: CartItem[];
  totalItems: number;
}

export function useAddToCart(): UseAddToCartReturn {
  const { addItem, items, getTotalItems } = useCartStore();
  const { showToast } = useToast();
  const t = useT();
  const router = useRouter();
  const locale = useLocale();

  const addToCart = useCallback(
    (item: AddToCartItem) => {
      addItem(item);
      showToast(t("messages.added_to_cart"), "success");
      router.push(`/${locale}/cart`);
    },
    [addItem, showToast, t, router, locale]
  );

  const isInCart = useCallback(
    (itemId: string) => {
      return items.some((item) => item.id === itemId);
    },
    [items]
  );

  return {
    addToCart,
    isInCart,
    items,
    totalItems: getTotalItems(),
  };
}
