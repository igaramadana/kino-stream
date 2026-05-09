import type { HTMLAttributes } from "react";
import { GabungClass } from "@/utils/Cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={GabungClass("animate-pulse rounded-2xl bg-white/[0.08]", className)}
      {...props}
    />
  );
}