import type { InputHTMLAttributes } from "react";
import { GabungClass } from "@/utils/Cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={GabungClass(
        "h-11 w-full rounded-full border border-white/10 bg-white/[0.08] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#8FDC2C]/70 focus:ring-4 focus:ring-[#8FDC2C]/10",
        className
      )}
      {...props}
    />
  );
}