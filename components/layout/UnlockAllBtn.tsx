"use client";

import Link from "next/link";
import { useLocale } from "@/providers/LocaleProvider";

export default function UnlockAllBtn({ mobileVersion, onClick }: { mobileVersion: boolean, onClick?: () => void }) {
  const locale = useLocale();
  
  return (
    <Link
      href={`/${locale}/subscription`}
      onClick={onClick}
      className={`
        relative flex items-center ${mobileVersion ? 'px-6 justify-start w-full h-[62px]' : 'justify-center w-[220px] h-full'}
        font-heading text-pink-500 text-md tracking-wider uppercase
        transition-all duration-300 ease-snappy
        hover:scale-105 hover:shadow-[0_0_40px_#ff008080]
        cursor-pointer
      `}
    >
      <span
        className="
          absolute inset-0 bg-[transparent]
          [mask-image:radial-gradient(80%_60%_at_50%_50%,black,transparent)]
        "
      ></span>

      <span
        className="
          absolute inset-0 
          bg-[linear-gradient(to_right,#ff00803f_1px,transparent_1px),linear-gradient(to_bottom,#ff00803f_1px,transparent_1px)]
          bg-[size:24px_24px]
          opacity-40
        "
      ></span>

      <span
        className="
          absolute inset-0 border-l border-r border-pink-500/60
        "
      ></span>

      <span
        className="
          absolute inset-0 -z-10 rounded 
          shadow-[0_0_30px_#ff008040]
          transition-shadow duration-300
          group-hover:shadow-[0_0_50px_#ff008080]
        "
      ></span>

      <span
        className="
          absolute inset-0 pointer-events-none
          shadow-[inset_0_0_20px_rgba(255,0,128,0.35)]
        "
      ></span>

      <span
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_60%,rgba(255,0,128,0.15)_100%)]
        "
      ></span>

      <span className="relative">Unlock All</span>
    </Link>
  );
}
