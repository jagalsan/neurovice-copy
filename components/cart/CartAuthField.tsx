"use client";

interface CartAuthFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CartAuthField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: CartAuthFieldProps) {
  return (
    <div className="w-full">
      <label className="block font-heading text-[11px] tracking-[0.18em] uppercase text-[var(--color-brand-400)] mb-2">
        {label}
      </label>
      <div className="h-[72px] rounded-[12px] border border-white/15 bg-black/40 px-4 flex items-center">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-[13px] text-white placeholder:text-[var(--color-brand-300)]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
