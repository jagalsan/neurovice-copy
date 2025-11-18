import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.terms_title",
    descriptionKey: "seo.terms_description",
    path: "/terms-of-use",
  });
}

export default function TermsOfUse() {
  return (
    <section className="text-white px-4 md:px-8 max-w-[1459px] mx-auto">
      <h1 className="text-[32px] md:text-[48px] uppercase text-[var(--color-brand-500)] mb-8">
        Terms of Use
      </h1>

      <p className="text-sm uppercase text-[var(--color-brand-300)] mb-12">
        Last Updated: October 6, 2025
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Who We Are and How to Contact Us
      </h2>
      <p className="mb-6">
        https://neurovice.com is a site and platform operated by Neurovice LTD,
        registered in England and Wales. If you have questions about Neurovice,
        please email our support team at support@neurovice.com. If you are
        unable to contact us by email, write to us at: 86-90 Paul Street,
        London, UK EC2A 4NE.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        By Using Our Platform, You Accept These Terms
      </h2>
      <p className="mb-6">
        By accessing or using our platform, you confirm that you have read,
        understood and agree to be bound by these Terms of Service. If you do
        not agree, you must stop using our platform immediately. This platform
        and website are intended only for individuals aged 18 and older.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Other Terms That May Apply
      </h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-brand-300)]">
        <li>
          Privacy Policy – how we collect, use and store your personal data.
        </li>
        <li>Cookie Policy – information about cookies on our platform.</li>
      </ul>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Changes to These Terms and Platform
      </h2>
      <p className="mb-6">
        We may modify these Terms from time to time. Please check them whenever
        you use the platform to ensure you understand the terms that apply. We
        may also update and change our platform periodically to reflect changes
        to our products, user needs or business priorities.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        User Accounts and Responsibilities
      </h2>
      <p className="mb-4">
        To access some features, you must create an account, provide a valid
        email address, username, and password, and meet our technical
        requirements. You agree to:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-brand-300)]">
        <li>Provide accurate, current and complete information.</li>
        <li>Keep your login credentials confidential and not share them.</li>
        <li>
          Be responsible for any activity under your account unless unauthorized
          access is proven.
        </li>
      </ul>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Prohibited Use
      </h2>
      <p className="mb-4">
        You agree not to misuse the platform or assist others to do so. You must
        not:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-brand-300)]">
        <li>Use the platform for unlawful or unauthorized purposes.</li>
        <li>
          Upload or share content that is harmful, harassing, abusive, hateful,
          violent, defamatory, obscene or sexually explicit involving minors or
          non-consensual acts.
        </li>
        <li>Impersonate others or misrepresent your identity.</li>
        <li>Infringe copyright, trademarks, or third-party rights.</li>
        <li>Distribute malware, spam, phishing or malicious software.</li>
      </ul>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Intellectual Property Rights
      </h2>
      <p className="mb-6">
        All content on the platform, including text, videos, logos, trademarks,
        software and graphics are the property of Neurovice or its licensors.
        You may not copy, reproduce, distribute or create derivative works
        without prior permission, except as allowed by law.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Suspension or Termination
      </h2>
      <p className="mb-6">
        We may suspend or terminate your access to the platform if you breach
        these Terms, misuse the platform, or if required by law. We will provide
        notice when reasonable.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-4">
        Contact and Support
      </h2>
      <p className="mb-2">Support email: support@neurovice.com</p>
      <p className="mb-12">
        Address: Ruiz de Alarcón, 23, 28014 Madrid, España
      </p>
    </section>
  );
}
