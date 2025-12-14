"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "pink" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgba(255,255,255,0.4)] bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] " +
    "shadow-[0_0_40px_rgba(23,197,195,0.5),0_0_10px_rgba(23,197,195,0.6)]",
  pink:
    "border border-[rgba(200,106,159,0.6)] bg-[#761A4E] text-white " +
    "shadow-[0_0_40px_rgba(183,26,114,0.5),0_0_10px_rgba(183,26,114,0.6)]",
  outline:
    "border border-[#17FBF8] bg-transparent text-[#17FBF8] " +
    "hover:bg-[#17FBF8] hover:text-black",
  ghost:
    "border border-transparent bg-transparent text-[#17FBF8] " +
    "hover:bg-[#17FBF8]/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-[52px] px-6 text-[16px]",
  lg: "h-[67px] px-[10px] py-[20px] text-[18px]",
};

const baseStyles =
  "rounded-[10px] flex items-center justify-center gap-[10px] font-heading tracking-[0.24em] uppercase " +
  "transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      href,
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? "w-full" : ""
    } ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
