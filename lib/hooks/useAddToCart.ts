"use client";

import { useCartStore, type CartItem } from "@/lib/stores/cart.store";
import { useCallback } from "react";
import { useToast } from "@/providers/ToastProvider";
import { useT } from "@/providers/I18nProvider";

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

  const addToCart = useCallback(
    (item: AddToCartItem) => {
      addItem(item);
      // Mostrar toast solo cuando estamos en mobile
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        showToast(t("messages.added_to_cart"), "success");
      }
    },
    [addItem, showToast, t]
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
