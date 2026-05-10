"use client";

import Link from "next/link";
import { useState } from "react";
import { Clapperboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteConfig } from "@/lib/SiteConfig";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-5 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={handleCloseMenu}
            className="flex items-center gap-3"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#8FDC2C] text-slate-950 shadow-[0_0_30px_rgba(143,220,44,0.35)]">
              <Clapperboard size={20} />
            </span>

            <div>
              <p className="text-lg font-black tracking-tight text-white">
                {SiteConfig.Nama}
              </p>
              <p className="-mt-1 text-xs text-slate-500">
                Movie & Series List
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#trending" className="transition hover:text-[#8FDC2C]">
              Trending
            </a>

            <a href="#list" className="transition hover:text-[#8FDC2C]">
              List
            </a>

            <Link
              href="/watchlist"
              className="transition hover:text-[#8FDC2C]"
            >
              Watchlist
            </Link>
          </div>

          <a href="#list" className="hidden md:block">
            <Button>Mulai Nonton</Button>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-900/95 p-4 md:hidden">
            <div className="flex flex-col gap-2 text-sm font-semibold text-slate-300">
              <a
                href="#trending"
                onClick={handleCloseMenu}
                className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-[#8FDC2C]"
              >
                Trending
              </a>

              <a
                href="#list"
                onClick={handleCloseMenu}
                className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-[#8FDC2C]"
              >
                List
              </a>

              <Link
                href="/watchlist"
                onClick={handleCloseMenu}
                className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-[#8FDC2C]"
              >
                Watchlist
              </Link>

              <a
                href="#list"
                onClick={handleCloseMenu}
                className="mt-2"
              >
                <Button className="w-full">Mulai Nonton</Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}