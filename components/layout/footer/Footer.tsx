"use client";
import { getFooterLinks } from "@/data/footerLinks";
import DiscordBtn from "../../DiscordBtn";
import { useT } from "@/providers/I18nProvider";
import { useLocale } from "@/providers/LocaleProvider";
import FooterLinkColumns from "./FooterLinkColumns";
import FooterSubscribeForm from "./FooterSubscribeForm";
import FooterBottomBar from "./FooterBottomBar";

export default function Footer() {
  const t = useT();
  const locale = useLocale();
  const footerLinks = getFooterLinks(locale);

  const handleHowToRunChapters = () => {
    const event = new CustomEvent("open-how-to-run-chapters-modal");
    if (typeof window !== "undefined") {
      window.dispatchEvent(event);
    }
  };

  return (
    <footer className="w-full border-t border-[var(--color-border-green)] bg-[#171614] text-white">
      <div className="mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1459px]">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-start">
            <img
              src="/logo_neurovice_neon.svg"
              alt="Neurovice"
              className="w-full mb-8 lg:ml-[-50px] ml-[-20px]"
            />
          </div>

          <FooterLinkColumns
            t={t}
            footerLinks={footerLinks}
            onHowToRunChapters={handleHowToRunChapters}
          />
        </div>

        <div className="flex flex-col gap-10 lg:col-span-4 xl:mt-16">
          <FooterSubscribeForm t={t} />
          <div className="text-sm text-[var(--color-brand-400)] leading-loose">
            <p>{footerLinks.company.address}</p>
            <p>{footerLinks.company.email}</p>
          </div>
          <DiscordBtn />
        </div>
      </div>

      <FooterBottomBar t={t} />
    </footer>
  );
}