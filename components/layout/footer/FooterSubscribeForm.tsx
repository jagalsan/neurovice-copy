"use client";

type TFn = (key: string) => string;

interface FooterSubscribeFormProps {
  t: TFn;
}

export default function FooterSubscribeForm({ t }: FooterSubscribeFormProps) {
  return (
    <form className="flex flex-col gap-6">
      <p className="text-[var(--color-brand-400)] text-sm font-heading leading-relaxed">
        {t("messages.newsletter_join")}
      </p>

      <div className="flex items-end gap-4 w-full">
        <div className="flex-1 flex flex-col">
          <label className="text-[var(--color-brand-500)] font-heading uppercase text-base mb-2">
            {t("labels.your_email")}
          </label>
          <input
            type="email"
            className="
              bg-transparent 
              border-b 
              border-[rgba(23,251,248,0.6)]
              text-white 
              text-base 
              font-normal 
              outline-none 
              pb-2
              placeholder-transparent
              focus:border-[rgba(23,251,248,1)]
            "
          />
        </div>

        <button
          type="submit"
          className="
            px-6 py-2 
            text-sm uppercase font-heading tracking-wide
            border border-[rgba(23,251,248,0.6)]
            rounded-full
            text-[var(--color-brand-500)]
            hover:bg-[rgba(23,251,248,0.1)]
            transition-all duration-300
          "
        >
          {t("actions.subscribe")}
        </button>
      </div>
    </form>
  );
}