"use client";

import Link from "next/link";

type TFn = (key: string) => string;

interface FooterLink {
  labelKey: string;
  href: string;
}

interface FooterSection {
  titleKey: string;
  items: FooterLink[];
}

interface FooterLinks {
  left: FooterSection[];
  social: any[];
  company: {
    email: string;
    address: string;
  };
}

interface FooterLinkColumnsProps {
  t: TFn;
  footerLinks: FooterLinks;
}

export default function FooterLinkColumns({ t, footerLinks }: FooterLinkColumnsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {footerLinks.left.map((column, idx) => (
        <div key={`${column.titleKey}-${idx}`}>
          <h3 className="text-[var(--color-brand-500)] font-heading uppercase mb-4 text-sm">
            {t(column.titleKey)}
          </h3>
          <ul className="space-y-2 text-sm">
            {column.items.map((item, subIdx) => (
              <li key={`${item.labelKey}-${subIdx}`}>
                <Link
                  href={item.href}
                  className="hover:text-white/80 transition"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}