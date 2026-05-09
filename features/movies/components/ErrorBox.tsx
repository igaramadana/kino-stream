import { AlertTriangle } from "lucide-react";

interface ErrorBoxProps {
  title?: string;
  message: string;
}

export function ErrorBox({
  title = "Ada yang belum beres",
  message
}: ErrorBoxProps) {
  return (
    <div className="rounded-[1.75rem] border border-[#8FDC2C]/30 bg-[#8FDC2C]/10 p-6">
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#8FDC2C] text-slate-950">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h2 className="text-lg font-black text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{message}</p>
        </div>
      </div>
    </div>
  );
}