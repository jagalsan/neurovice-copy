import Image from "next/image";
import { Check } from "lucide-react";

type PaymentMethod = "paypal" | "card";

interface PaymentOption {
  value: PaymentMethod;
  label: string;
  brand: React.ReactNode;
}

interface PaymentOptionsProps {
  t: (key: string) => string;
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

function PaymentOptionButton({
  selected,
  onSelect,
  label,
  brand,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  brand: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full h-[72px] rounded-[12px] border px-4 flex items-center justify-between transition-all",
        selected
          ? "border-[#17FBF8] bg-[rgba(12,34,40,0.95)]"
          : "border-white/15 bg-black/40 hover:bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all",
            selected ? "bg-[#17FBF8] border-[#17FBF8]" : "border-white/30",
          ].join(" ")}
        >
          {selected && <Check className="w-3 h-3 text-[#050608]" />}
        </span>
        <span className="font-heading text-[13px] tracking-[0.18em] uppercase text-white">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-white/70">
        {brand}
      </div>
    </button>
  );
}

export default function PaymentOptions({
  t,
  selected,
  onSelect,
}: PaymentOptionsProps) {
  const options: PaymentOption[] = [
    {
      value: "paypal",
      label: "PayPal",
      brand: (
        <Image
          src="/icons/paypal.svg"
          alt="PayPal"
          width={83}
          height={20}
        />
      ),
    },
    {
      value: "card",
      label: t("labels.card_by_epoch"),
      brand: (
        <div className="flex items-center gap-1">
          <Image src="/icons/card-logo.png" alt="Card" width={69} height={20} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <p className="font-heading text-[12px] tracking-[0.18em] uppercase text-[var(--color-brand-400)]">
        {t("labels.payment_options")}
      </p>

      {options.map((option) => (
        <PaymentOptionButton
          key={option.value}
          selected={selected === option.value}
          onSelect={() => onSelect(option.value)}
          label={option.label}
          brand={option.brand}
        />
      ))}
    </div>
  );
}
