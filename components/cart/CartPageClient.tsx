"use client";

import { useState } from "react";
import { useT } from "@/providers/I18nProvider";
import { useCurrentUser } from "@/lib/hooks/api/useAuth";
import { useCartStore } from "@/lib/stores/cart.store";
import CartItem from "@/components/cart/CartItem";
import CartAuthSection from "@/components/cart/CartAuthSection";
import PaymentOptions from "@/components/cart/PaymentOptions";
import { ArrowRightIcon, ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";

type PaymentMethod = "paypal" | "card";

export default function CartPageClient() {
  const t = useT();
  const { data: userData, isLoading } = useCurrentUser();
  const user = (userData as any)?.user || userData;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");

  const { items, removeItem, getTotalPrice, getTotalOldPrice } = useCartStore();
  const totalOldPrice = getTotalOldPrice();
  const totalPrice = getTotalPrice();

  return (
    <section className="max-w-[1159px] mx-auto">
      <div className="px-4 md:px-8 py-8 md:py-16">
        <div className="rounded-[16px] overflow-hidden shadow-[0px_0px_15px_0px_#17fbf873]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)] gap-0 bg-[#161D21]">
            <div className="px-4 pt-6 pb-8 md:px-10 md:pt-10 lg:border-r border-white/10">
              <div className="mb-8">
                <h1 className="font-heading text-[40px] md:text-[48px] tracking-[0.18em] uppercase text-[#17FBF8]">
                  {t("views.cart")}
                </h1>
                <p
                  className="mt-2 font-heading text-[11px] tracking-[0.24em] uppercase text-[var(--color-brand-300)] text-glow-cyan"
                >
                  {t("labels.items_in_cart").replace(
                    "{count}",
                    items.length.toString()
                  )}
                </p>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
                  <p className="text-white/60 text-[15px]">
                    {t("messages.empty_cart")}
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle || ""}
                    oldPrice={item.oldPrice ? `$${item.oldPrice}` : null}
                    price={`$${item.price}`}
                    imageSrc={item.imageSrc}
                    quantity={item.quantity}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              )}

              <div className="mt-10 rounded-[14px] border border-white/10 bg-[#11111880] px-4 py-4 md:px-8 md:py-6 flex items-center justify-between">
                <div className="flex items-center justify-center w-full gap-2 md:gap-4 uppercase">
                  {totalOldPrice > 0 && totalOldPrice !== totalPrice && (
                    <>
                      <span className="text-white/40 text-[20px] md:text-[28px] lg:text-[32px] font-bold line-through">
                        ${totalOldPrice.toFixed(2)}
                      </span>
                      <span className="text-[#17FBF8] flex-shrink-0">
                        <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
                      </span>
                    </>
                  )}
                  <span className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8 lg:px-10 lg:pt-10 bg-[rgba(3,10,15,0.96)] border-t lg:border-t-0 border-white/10">
              <div className="space-y-6 h-full">
                {!isLoading && user ? (
                  <div className="flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <h2 className="font-heading text-[18px] md:text-[20px] uppercase text-[#17FBF8]">
                        {t("labels.logged_in_as")}
                      </h2>
                      <p className="text-[13px] text-[var(--color-brand-300)] uppercase break-all">
                        {user.email}
                      </p>
                    </div>

                    <div className="mt-4 lg:mt-6">
                      <PaymentOptions
                        t={t}
                        selected={paymentMethod}
                        onSelect={setPaymentMethod}
                      />

                      <Button
                        variant="primary"
                        disabled={items.length === 0}
                        className="mt-4"
                        fullWidth
                      >
                        {t("actions.proceed_to_payment")}
                      </Button>
                    </div>
                  </div>
                ) : !isLoading ? (
                  <CartAuthSection t={t} />
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-[13px] text-[var(--color-brand-300)]">
                      {t("labels.loading")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[15px] text-[var(--color-brand-400)] max-w-[800px] mx-auto">
          {t("messages.transaction_disclaimer")}
        </p>
      </div>
    </section>
  );
}
