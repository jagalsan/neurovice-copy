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
    titleKey: "seo.dmca_title",
    descriptionKey: "seo.dmca_description",
    path: "/dmca",
  });
}

export default function Dmca() {
  return (
    <section className="text-white px-8 max-w-[1459px] mx-auto">
      <h1 className="text-[32px] md:text-[48px] uppercase text-[var(--color-brand-500)] mb-6">
        DMCA
      </h1>

      <p className="text-sm uppercase text-[var(--color-brand-300)] mb-10">
        Last Updated: October 6, 2025
      </p>

      <p className="text-[var(--color-brand-300)] text-sm md:text-base mb-10">
        This Privacy Policy explains how Neurovice LTD ("Neurovice", "Company",
        "we", "us", or "our") collects, uses, shares, and safeguards your
        personal information when you use our platform and services
        (collectively, the "Platform").
        <br />
        <br />
        We are committed to protecting your privacy and complying with
        applicable data protection laws, including the UK GDPR, EU GDPR, and the
        Data Protection Act.
        <br />
        <br />
        By using the Platform, you agree to the collection and use of
        information in accordance with this Privacy Policy.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        1. Who We Are
      </h2>
      <p className="mb-6">
        Neurovice LTD
        <br />
        Registered in England and Wales, Company Number: [Insert No.]
        <br />
        Registered Office: 86–90 Paul Street, London, UK EC2A 4NE
        <br />
        For questions about Privacy, contact:
        <br />✉ support@neurovice.com
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        2. Information We Collect
      </h2>

      <h3 className="uppercase text-sm text-[var(--color-brand-400)] mb-2">
        2.1 Information You Provide Directly
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[var(--color-brand-300)]">
        <li>Account details: email address, username, password.</li>
        <li>
          Payment information: processed securely via third-party providers (we
          do not store credit card data).
        </li>
        <li>Profile info: optional profile photo/avatar.</li>
        <li>Communication: messages or inquiries you send us.</li>
      </ul>

      <h3 className="uppercase text-sm text-[var(--color-brand-400)] mb-2">
        2.2 Information We Collect Automatically
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[var(--color-brand-300)]">
        <li>Usage data: pages visited, features used, purchase history.</li>
        <li>
          Device data: browser type, OS, IP address, unique device identifiers.
        </li>
        <li>Cookies and tracking technologies (see Cookie Policy).</li>
      </ul>

      <h3 className="uppercase text-sm text-[var(--color-brand-400)] mb-2">
        2.3 Information from Third Parties
      </h3>
      <p className="mb-6 text-[var(--color-brand-300)]">
        If you link your account with third-party services (e.g., social media
        login), we may collect certain information as permitted by their
        policies.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        3. How We Use Your Information
      </h2>
      <p className="mb-4">
        We process your personal data under the following legal bases:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[var(--color-brand-300)]">
        <li>
          Contractual necessity – to provide the platform and fulfil purchases.
        </li>
        <li>
          Consent – where required (e.g. marketing communications, optional
          cookies).
        </li>
        <li>
          Legitimate interests – improving services, ensuring security,
          preventing fraud.
        </li>
        <li>
          Legal obligations – compliance with tax, regulatory or law enforcement
          requirements.
        </li>
      </ul>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        4. Data Retention
      </h2>
      <p className="mb-6">
        We apply technical and organisational measures to protect your personal
        data from unauthorised access, alteration or destruction. However, no
        method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        5. Cookies
      </h2>
      <p className="mb-6">
        We use cookies to personalise your experience and analyse traffic. You
        can disable cookies in your browser settings. For more details, see our
        Cookie Policy.
      </p>

      <h2 className="text-[var(--color-brand-500)] text-xl uppercase mb-3">
        6. Contact Us
      </h2>
      <p className="mb-12">
        If you have questions about this Privacy Policy or our data practices,
        contact:
        <br />
        ✉ support@neurovice.com
        <br />
        Neurovice LTD, 86–90 Paul Street, London, UK EC2A 4NE
      </p>

      <p className="text-xs text-[var(--color-brand-300)]">
        © {new Date().getFullYear()} Neurovice. All rights reserved.
      </p>
    </section>
  );
}
