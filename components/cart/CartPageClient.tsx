"use client";

import { useState } from "react";
import { useT } from "@/providers/I18nProvider";
import { useCurrentUser } from "@/lib/hooks/api/useAuth";
import { useCartStore } from "@/lib/stores/cart.store";
import CartItem from "@/components/cart/CartItem";
import AuthSection from "@/components/cart/AuthSection";
import PaymentOptions from "@/components/cart/PaymentOptions";
import { ArrowRightIcon, ShoppingCart } from "lucide-react";
import { primaryButtonBase } from "@/lib/styles/buttons";

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
      <div className="px-4 md:px-8 py-16">
        <div className="rounded-[16px] overflow-hidden shadow-[0px_0px_15px_0px_#17fbf873]">
          <div className="grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)] gap-0 bg-[#161D21]">
            <div className="px-4 pt-6 pb-8 md:px-10 md:pt-10 border-r border-white/10">
              <div className="mb-8">
                <h1 className="font-heading text-[40px] md:text-[48px] tracking-[0.18em] uppercase text-[#17FBF8]">
                  {t("views.cart")}
                </h1>
                <p
                  className="mt-2 font-heading text-[11px] tracking-[0.24em] uppercase text-[var(--color-brand-300)]"
                  style={{ textShadow: "0px 0px 15px #00FFFC" }}
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
                    subtitle={item.subtitle}
                    oldPrice={`$${item.oldPrice}`}
                    price={`$${item.price}`}
                    imageSrc={item.imageSrc}
                    quantity={item.quantity}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              )}

              <div className="mt-10 rounded-[14px] border border-white/10 bg-[#11111880] px-8 py-6 flex items-center justify-between">
                <div className="flex items-center justify-center w-full gap-4 uppercase">
                  <span className="text-white/40 text-[32px] font-bold">
                    ${totalOldPrice}
                  </span>
                  <span className="text-[#17FBF8]">
                    <ArrowRightIcon />
                  </span>
                  <span className="text-white text-[32px] font-bold">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-10 pt-10 pb-8 bg-[rgba(3,10,15,0.96)]">
              <div className="space-y-6 h-full">
                {!isLoading && user ? (
                  <div className="flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <h2 className="font-heading text-[20px] uppercase text-[#17FBF8]">
                        Logged in as:
                      </h2>
                      <p className="text-[13px] text-[var(--color-brand-300)] uppercase ">
                        {user.email}
                      </p>
                    </div>

                    <div className="mt-4">
                      <PaymentOptions
                        t={t}
                        selected={paymentMethod}
                        onSelect={setPaymentMethod}
                      />

                      <button
                        disabled={items.length === 0}
                        className={`${primaryButtonBase} mt-4 h-[78px]`}
                      >
                        {t("actions.proceed_to_payment")}
                      </button>
                    </div>
                  </div>
                ) : !isLoading ? (
                  <AuthSection t={t} />
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
