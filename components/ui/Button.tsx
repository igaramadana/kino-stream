import type { ButtonHTMLAttributes } from "react";
import { GabungClass } from "@/utils/Cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={GabungClass(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-[#8FDC2C] text-slate-950 hover:bg-[#a7ef48] hover:shadow-[0_0_30px_rgba(143,220,44,0.35)]",
        variant === "ghost" && "bg-white/10 text-white hover:bg-white/15",
        variant === "outline" &&
          "border border-white/15 bg-transparent text-white hover:border-[#8FDC2C]/70 hover:text-[#8FDC2C]",
        className
      )}
      {...props}
    />
  );
}