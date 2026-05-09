import type { HTMLAttributes } from "react";
import { GabungClass } from "@/utils/Cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "dark" | "soft";
}

export function Badge({ className, variant = "soft", ...props }: BadgeProps) {
  return (
    <span
      className={GabungClass(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold",
        variant === "primary" && "bg-[#8FDC2C] text-slate-950",
        variant === "dark" && "bg-black/50 text-white ring-1 ring-white/10",
        variant === "soft" && "bg-white/10 text-slate-200",
        className
      )}
      {...props}
    />
  );
}