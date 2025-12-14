export interface FooterLink {
  labelKey: string;
  href: string;
}

export interface FooterSection {
  titleKey: string;
  items: FooterLink[];
}

export interface SocialLink {
  icon: string;
  href: string;
}

export interface FooterLinks {
  left: FooterSection[];
  social: SocialLink[];
  company: {
    email: string;
    address: string;
  };
}
