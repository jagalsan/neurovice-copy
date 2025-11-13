import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useT } from "@/providers/I18nProvider";

interface CartItemProps {
  title: string;
  subtitle: string;
  oldPrice: string;
  price: string;
  imageSrc: string;
  quantity?: number;
  onRemove?: () => void;
}

export default function CartItem({
  title,
  subtitle,
  oldPrice,
  price,
  imageSrc,
  quantity = 1,
  onRemove,
}: CartItemProps) {
  const t = useT();
  return (
    <div className="flex items-center gap-6 py-8 border-b border-white/10 last:border-b-0">
      <div className="relative w-[96px] h-[120px] rounded-[10px] overflow-hidden bg-black/40 border border-white/10" style={{ boxShadow: "0px 0px 15px #00FFFC" }}>
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-heading text-[26px] leading-none tracking-[0.12em] uppercase text-[#17FBF8]" style={{ textShadow: "0px 0px 15px #00FFFC" }}>
          {title}
        </h3>
        <p className="font-heading text-[13px] tracking-[0.18em] uppercase text-[var(--color-brand-300)]" style={{ textShadow: "0px 0px 15px #00FFFC" }}>
          {subtitle}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 font-heading text-[15px] tracking-[0.14em] uppercase" style={{ textShadow: "0px 0px 15px #00FFFC" }}>
            <span className="line-through text-white/30">{oldPrice}</span>
            <span className="text-[#17FBF8]">{price}</span>
          </div>
          {quantity > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-white/60">
                {t("labels.quantity")}:
              </span>
              <span className="text-[13px] font-bold text-[#17FBF8]">
                x{quantity}
              </span>
            </div>
          )}
        </div>
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#17FBF8] hover:bg-white/5 transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
