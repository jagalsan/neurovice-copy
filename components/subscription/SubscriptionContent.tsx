"use client";

import PlanCard, { Plan } from "@/components/PlanCard";
import { useT } from "@/providers/I18nProvider";

const plans: Plan[] = [
  {
    id: "vice-plus",
    name: "Vice+",
    price: 49,
    periodLabelKey: "labels.one_month_access",
    titleKey: "labels.vice_plus",
    featureKeys: ["labels.unlimited_access_bundles"],
    ctaLabelKey: "actions.subscribe_now",
    accent: "cyan",
    badgeIconSrc: "/subscriptions/vice+.png",
    badgeIconAlt: "Vice Plus badge",
  },
  {
    id: "mega-vice",
    name: "Mega Vice",
    price: 149,
    periodLabelKey: "labels.one_year_access",
    titleKey: "labels.mega_vice",
    featureKeys: [
      "labels.unlimited_access_bundles",
      "labels.collectors_seasons",
    ],
    ctaLabelKey: "actions.get_lifetime_access",
    accent: "yellow",
    isMostPopular: true,
    badgeIconSrc: "/subscriptions/mega.png",
    badgeIconAlt: "Mega Vice badge",
  },
  {
    id: "vice-elite",
    name: "Vice Elite",
    price: 499,
    periodLabelKey: "labels.lifetime_access",
    titleKey: "labels.vice_elite",
    featureKeys: [
      "labels.unlimited_access_bundles",
      "labels.collectors_seasons",
      "labels.close_friends_access",
    ],
    ctaLabelKey: "actions.get_lifetime_access",
    accent: "purple",
    badgeIconSrc: "/subscriptions/elite.png",
    badgeIconAlt: "Elite badge",
  },
];

export default function SubscriptionContent() {
  const t = useT();

  return (
    <section className="max-w-[1459px] mx-auto px-4 md:px-8 pt-8 pb-20 md:pb-28">
      <div className="text-center mb-1">
        <span
          className="text-xs font-[500] tracking-[0.28em] uppercase text-[var(--color-brand-500)] z-10 bg-transparent"
          style={{ textShadow: "0px 0px 15px #00FFFC" }}
        >
          {t("labels.unlock_all")}
        </span>
      </div>

      <h1 className="max-w-4xl mx-auto font-heading text-[32px] md:text-[45px] lg:text-[54px] leading-tight text-center text-[var(--color-brand-500)] mb-4">
        {t("messages.subscription_hero_title")}
      </h1>

      <p className="max-w-4xl mx-auto font-heading text-[20px] md:text-[24px] text-center text-[var(--color-brand-500)] mb-6">
        {t("messages.new_release_weekly")}
      </p>

      <p className="max-w-4xl mx-auto text-[16px] text-center text-[var(--color-brand-300)] mb-14 leading-relaxed uppercase">
        {t("messages.subscription_description")}
      </p>

      <div className="flex gap-10 flex-col md:flex-row md:items-center justify-center gap-2 lg:gap-[40px] mt-16">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} t={t} />
        ))}
      </div>
    </section>
  );
}
