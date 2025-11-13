"use client";

interface AuthFieldProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  withForgot?: boolean;
  onForgot?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthField({
  label,
  placeholder,
  type = "text",
  withForgot,
  onForgot,
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand-500)]">
          {label}
        </label>
        {withForgot && onForgot && (
          <button
            type="button"
            onClick={onForgot}
            className="text-[11px] text-[var(--color-brand-300)] hover:text-[var(--color-brand-500)]"
          >
            Forgot password?
          </button>
        )}
      </div>

      <div
        className="
          rounded-[12px] border border-white/10 bg-black/40
          px-4 py-3
        "
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full bg-transparent outline-none
            text-[13px] text-white
            placeholder:text-[rgba(255,255,255,0.35)]
          "
        />
      </div>
    </div>
  );
}
