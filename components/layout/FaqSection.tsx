"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { useT } from "@/providers/I18nProvider";

export default function FaqSection() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleToggle = (idx: number) => {
    if (animating) return; 
    if (openIndex === idx) {
      setOpenIndex(-1);
      return;
    }

    setAnimating(true);
    setOpenIndex(-1);

    setTimeout(() => {
      setOpenIndex(idx);
      setTimeout(() => setAnimating(false), 400);
    }, 400);
  };

  return (
    <section className="max-w-[1459px] mx-auto px-6 pb-20 text-white font-heading">
      <h2 className="text-[32px] md:text-[48px] text-[var(--color-brand-500)] mb-10">
        {t('views.faq')}
      </h2>

      <div className="flex flex-col space-y-6">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="pb-6 border-b border-[rgba(23,251,248,0.4)]"
            >
              <button
                onClick={() => handleToggle(idx)}
                disabled={animating}
                className="w-full text-left text-lg md:text-xl uppercase tracking-wide 
                text-[#17FBF8CC] uppercase hover:text-white transition cursor-pointer"
              >
                {t(faq.questionKey)}
              </button>

              <div
                className={`
                  transition-all duration-500 overflow-hidden
                  ${isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"}
                `}
              >
                <p className="text-[#17FBF8] font-sans font-light uppercase text-sm md:text-base leading-relaxed max-w-4xl">
                  {t(faq.answerKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}