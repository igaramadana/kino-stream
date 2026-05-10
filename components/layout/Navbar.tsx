import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteConfig } from "@/lib/SiteConfig";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#8FDC2C] text-slate-950 shadow-[0_0_30px_rgba(143,220,44,0.35)]">
            <Clapperboard size={20} />
          </span>

          <div>
            <p className="text-lg font-black tracking-tight text-white">
              {SiteConfig.Nama}
            </p>
            <p className="-mt-1 text-xs text-slate-500">Movie & Series List</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <a href="#trending" className="hover:text-[#8FDC2C]">
            Trending
          </a>
          <a href="#list" className="hover:text-[#8FDC2C]">
            List
          </a>
          <a href="/watchlist" className="hover:text-[#8FDC2C]">
            Watchlist
          </a>
        </div>

        <a href="#list" className="hidden md:block">
          <Button>Mulai Nonton</Button>
        </a>
      </nav>
    </header>
  );
}