"use client";

import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type TFn = (key: string) => string;

interface FooterBottomBarProps {
  t: TFn;
}

export default function FooterBottomBar({ t }: FooterBottomBarProps) {
  const locale = useLocale();
  
  return (
    <div className="border-t border-[var(--color-border-green)]">
      <div className="max-w-[1459px] py-6 text-xs flex flex-col md:flex-row justify-between items-center px-6 mx-auto gap-8">
        <div className="flex flex-col md:flex-row gap-6">
          <p className="text-[var(--color-brand-300)]">
            {t("messages.copyright_notice")}
          </p>
          <div className="flex gap-6 text-[var(--color-brand-300)]">
            <Link href={`/${locale}/privacy-policies`}>{t("views.privacy")}</Link>
            <Link href={`/${locale}/terms-of-use`}>{t("views.terms")}</Link>
            <Link href={`/${locale}/cookies`}>{t("views.cookies")}</Link>
            <Link href={`/${locale}/accessibility`}>{t("views.accessibility")}</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}