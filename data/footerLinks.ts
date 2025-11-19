import type { Locale } from "@/i18n/config";
import type { FooterLinks } from "@/types/footer";

export const getFooterLinks = (locale: Locale): FooterLinks => ({
  left: [
    {
      titleKey: "labels.quick_links",
      items: [
        { labelKey: "messages.how_to_run_chapters", href: "#" },
        { labelKey: "messages.report_inappropriate_content", href: "#" },
        { labelKey: "actions.download_app", href: "#" },
        { labelKey: "labels.pornstars", href: `/${locale}/stars` },
        { labelKey: "labels.blog", href: `/${locale}/blog` },
        { labelKey: "messages.reach_customer_support", href: "#" },
      ],
    },
    {
      titleKey: "labels.download_section",
      items: [
        { labelKey: "labels.meta_quest", href: "#" },
        { labelKey: "labels.pico_4", href: "#" },
        { labelKey: "labels.windows_pcvr", href: "#" },
      ],
    },
    {
      titleKey: "labels.legal_section",
      items: [
        { labelKey: "views.terms", href: `/${locale}/terms-of-use` },
        { labelKey: "views.privacy", href: `/${locale}/privacy-policies` },
        { labelKey: "views.cookies", href: `/${locale}/cookie-policies` },
        { labelKey: "views.billing", href: `/${locale}/billing-support` },
        { labelKey: "views.dmca", href: `/${locale}/dmca` },
      ],
    },
  ],

  social: [
    { icon: "github", href: "" },
    { icon: "discord", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "youtube", href: "#" },
  ],

  company: {
    email: "info@neurovice.com",
    address: "Ruiz de Alarcón, 23, 28014 Madrid, España",
  },
});