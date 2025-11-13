"use client";

import { useCartStore, type CartItem } from "@/lib/stores/cart.store";
import { useCallback } from "react";

type AddToCartItem = Omit<CartItem, "quantity">;

interface UseAddToCartReturn {
  addToCart: (item: AddToCartItem) => void;
  isInCart: (itemId: string) => boolean;
  items: CartItem[];
  totalItems: number;
}

export function useAddToCart(): UseAddToCartReturn {
  const { addItem, items, getTotalItems } = useCartStore();

  const addToCart = useCallback(
    (item: AddToCartItem) => {
      addItem(item);
    },
    [addItem]
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
