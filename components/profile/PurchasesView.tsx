"use client";

import Image from "next/image";
import { BackHeader, sectionTitleClass } from "./shared";
import { BoughtScene, UserSubscription } from "@/lib/api/types";
import { useCurrentUser } from "@/lib/hooks/api";


interface PurchasesViewProps {
  t: (k: string) => string;
  onBack: () => void;
}

interface SubscriptionRowProps {
  subscription: UserSubscription;
}

interface SceneRowProps {
  scene: BoughtScene;
}

function SubscriptionRow({ subscription }: SubscriptionRowProps) {
  const isActive = subscription.status.toLowerCase() === "active";
  
  return (
    <div className="flex gap-4">
      <div className="relative w-[64px] h-[90px] rounded-[10px] overflow-hidden border border-white/10 bg-black/40">
        <Image
          src="/mock/video_placeholder.png"
          alt="Subscription"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-1 text-[11px]">
        <p className="text-[12px] tracking-[0.18em] uppercase text-[#17FBF8]">
          NEUROVICE
        </p>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white">
          {subscription.plan?.name || "Subscription"}
        </p>
        <p className="text-[11px] text-[var(--color-brand-300)]">
          {subscription.plan?.externalPlan?.origin || "N/A"}
        </p>
        <div className="mt-1 flex items-center gap-3">
          <span className={[
            "px-3 py-1 rounded-[6px] uppercase tracking-[0.18em] text-[10px]",
            isActive ? "bg-[#002A26] text-[#17FBF8]" : "bg-[#7A1133] text-[#FF4AB0]"
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

function SceneRow({ scene }: SceneRowProps) {
  return (
    <div className="flex gap-4">
      <div className="relative w-[64px] h-[90px] rounded-[10px] overflow-hidden border border-white/10 bg-black/40">
        <Image
          src={scene.mainImageUrl || "/placeholder-scene.jpg"}
          alt={scene.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-1 text-[11px]">
        <p className="text-[12px] tracking-[0.18em] uppercase text-[#17FBF8]">
          NEUROVICE
        </p>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white">
          {scene.title}
        </p>
        <p className="text-[11px] text-[var(--color-brand-300)]">
          Scene #{scene.sceneId}
        </p>
      </div>
    </div>
  );
}

export default function PurchasesView({ t, onBack }: PurchasesViewProps) {
  const { data: userData } = useCurrentUser();
  const user = (userData as any)?.user || userData;
  
  const subscriptions = user?.subscriptions || [];
  const boughtScenes = user?.boughtScenes || [];
  
  const activeSubscriptions = subscriptions.filter((s: UserSubscription) => s.status.toLowerCase() === "active");
  const inactiveSubscriptions = subscriptions.filter((s: UserSubscription) => s.status.toLowerCase() !== "active");

  return (
    <div className="font-heading text-white text-[13px] space-y-6">
      <BackHeader label={t("views.my_purchases")} onBack={onBack} />

      {activeSubscriptions.length > 0 && (
        <section className="space-y-4 md:px-8">
          <p className={sectionTitleClass}>{t("labels.subscription")}</p>
          {activeSubscriptions.map((sub: UserSubscription) => (
            <SubscriptionRow key={sub.id} subscription={sub} />
          ))}
        </section>
      )}

      {inactiveSubscriptions.length > 0 && (
        <section className="space-y-4 pt-4 md:px-8">
          <p className={sectionTitleClass}>Past Subscriptions</p>
          {inactiveSubscriptions.map((sub: UserSubscription) => (
            <SubscriptionRow key={sub.id} subscription={sub} />
          ))}
        </section>
      )}

      {boughtScenes.length > 0 && (
        <section className="space-y-4 pt-4 md:px-8">
          <p className={sectionTitleClass}>{t("labels.scenes")}</p>
          {boughtScenes.map((scene: BoughtScene) => (
            <SceneRow key={scene.id} scene={scene} />
          ))}
        </section>
      )}

      {subscriptions.length === 0 && boughtScenes.length === 0 && (
        <p className="text-center text-[var(--color-brand-300)] md:px-8">
          {t("messages.no_active_subscription")}
        </p>
      )}
    </div>
  );
}
