"use client";

import Card from "@/components/Card";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { CartItem } from "@/lib/stores/cart.store";
import { useT } from "@/providers";

interface AccessCardProps {
  coverSrc: string;
  sceneCount: number;
  fileSize: string;
  cartItem: Omit<CartItem, "quantity">;
}

export default function AccessCard({
  coverSrc,
  sceneCount,
  fileSize,
  cartItem,
}: AccessCardProps) {
  const { addToCart } = useAddToCart();
  const t = useT();

  return (
    <Card showGrid={false} className="bg-[#111118]">
      <div className="flex items-start gap-5 p-5 md:p-6">
        {coverSrc && (
          <div
            className="relative w-[92px] h-[120px] shrink-0 rounded-[10px] overflow-hidden"
            style={{ boxShadow: "0px 4px 40px 0px #17C5C333" }}
          >
            <Image src={coverSrc} alt="Cover" fill className="object-contain" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-heading uppercase text-[28px] sm:text-[36px] text-[#A6FFFF] mb-0">
            {t("labels.get_access")}
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col">
              <span
                className="text-xs font-[600] tracking-[0.28em] uppercase text-[#17FBF8] text-[13px] z-10 bg-transparent text-glow-cyan"
              >
                {sceneCount > 0 ? t("labels.scenes_available", { count: sceneCount }) : t("labels.scene_available")}
              </span>
              <span
                className="text-xs font-[400] tracking-[0.28em] uppercase text-[#17FBF8] text-[10px] z-10 bg-transparent text-glow-cyan"
              >
                {fileSize}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="pink"
        onClick={() => addToCart(cartItem)}
        fullWidth
      >
        <span className="flex items-center gap-3 text-white">
          {t("labels.buy_for").toUpperCase()}{" "}
          {cartItem.oldPrice && cartItem.oldPrice !== cartItem.price && (
            <>
              <span className="line-through opacity-40">
                ${cartItem.oldPrice}
              </span>{" "}
            </>
          )}
          ${cartItem.price}
        </span>
      </Button>
    </Card>
  );
}