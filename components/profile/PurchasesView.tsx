"use client";

import Image from "next/image";
import { BackHeader, sectionTitleClass } from "./shared";
import { SubscriptionListItem, SubscriptionStatus } from "@/lib/api/types";

const mockSubscriptions: SubscriptionListItem[] = [
  {
    id: 2522311230,
    planId: 1,
    status: SubscriptionStatus.ACTIVE,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
    plan: {
      name: "1 YEAR SUBSCRIPTION",
      externalPlan: {
        origin: "PayPal",
      },
    },
    _count: {
      payments: 1,
      promocodeUsages: 0,
    },
  },
  {
    id: 2522311231,
    planId: 2,
    status: SubscriptionStatus.CANCELLED,
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
    plan: {
      name: "CHAPTER 1 - THE BEGINNING",
      externalPlan: {
        origin: "Credit Card",
      },
    },
    _count: {
      payments: 1,
      promocodeUsages: 0,
    },
  },
  {
    id: 2522311232,
    planId: 3,
    status: SubscriptionStatus.CANCELLED,
    startDate: "2023-08-10",
    endDate: "2024-08-10",
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
    plan: {
      name: "CHAPTER 2 - RISING ACTION",
      externalPlan: {
        origin: "Credit Card",
      },
    },
    _count: {
      payments: 1,
      promocodeUsages: 0,
    },
  },
];

interface PurchasesViewProps {
  t: (k: string) => string;
  onBack: () => void;
}

interface PurchaseRowProps {
  subscription: SubscriptionListItem;
}

function PurchaseRow({ subscription }: PurchaseRowProps) {
  return (
    <div className="flex gap-4">
      <div className="relative w-[64px] h-[90px] rounded-[10px] overflow-hidden border border-white/10 bg-black/40">
        <Image
          src="/mock/video_placeholder.png"
          alt="Chapter"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-1 text-[11px]">
        <p className="text-[12px] tracking-[0.18em] uppercase text-[#17FBF8]">
          TURBOFAP
        </p>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white">
          {subscription.plan.name}
        </p>
        <p className="text-[11px] text-[var(--color-brand-300)]">
          {subscription.plan.externalPlan.origin}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className={[
            "px-3 py-1 rounded-[6px] uppercase tracking-[0.18em] text-[10px]",
            subscription.status === SubscriptionStatus.ACTIVE ? "bg-[#002A26] text-[#17FBF8]" : "bg-[#7A1133] text-[#FF4AB0]"
          ].join(" ")}>
            {subscription.status}
          </span>
          <span className="text-[10px] text-[var(--color-brand-300)]">
            #{subscription.id}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PurchasesView({ t, onBack }: PurchasesViewProps) {
  const subscriptions = mockSubscriptions;
  
  const activeSubscriptions = subscriptions.filter((s) => s.status === SubscriptionStatus.ACTIVE);
  const otherPurchases = subscriptions.filter((s) => s.status !== SubscriptionStatus.ACTIVE);

  return (
    <div className="font-heading text-white text-[13px] space-y-6">
      <BackHeader label={t("views.my_purchases")} onBack={onBack} />

      {activeSubscriptions.length > 0 && (
        <section className="space-y-4 md:px-8">
          <p className={sectionTitleClass}>{t("labels.subscription")}</p>
          {activeSubscriptions.map((sub) => (
            <PurchaseRow key={sub.id} subscription={sub} />
          ))}
        </section>
      )}

      {otherPurchases.length > 0 && (
        <section className="space-y-4 pt-4 md:px-8">
          <p className={sectionTitleClass}>{t("labels.chapters")}</p>
          {otherPurchases.map((sub) => (
            <PurchaseRow key={sub.id} subscription={sub} />
          ))}
        </section>
      )}

      {subscriptions.length === 0 && (
        <p className="text-center text-[var(--color-brand-300)] md:px-8">
          {t("messages.no_active_subscription")}
        </p>
      )}
    </div>
  );
}
