"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { MovieItem } from "@/types/Movie";
import { FormatRating, FormatTipe } from "@/utils/Format";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";
import { FadeInUp, HoverScale } from "@/components/animations/MotionWrapper";

const WATCHLIST_KEY = "gatrons-watchlist";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("watchlist-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("watchlist-updated", callback);
  };
}

function getWatchlistSnapshot() {
  return localStorage.getItem(WATCHLIST_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function parseWatchlist(value: string): MovieItem[] {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export default function WatchlistPage() {
  const watchlistSnapshot = useSyncExternalStore(
    subscribe,
    getWatchlistSnapshot,
    getServerSnapshot
  );

  const watchlist = parseWatchlist(watchlistSnapshot);

  function handleRemoveFromWatchlist(id: number) {
    const updatedWatchlist = watchlist.filter((item) => item.id !== id);

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    window.dispatchEvent(new Event("watchlist-updated"));
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 text-white md:py-12">
      <Link href="/">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={18} />
          Kembali
        </Button>
      </Link>

      <section className="mt-8">
        <FadeInUp className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
                Watchlist
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                Daftar Tontonan Saya
            </h1>

            <p className="max-w-2xl text-slate-400">
                Film dan series yang kamu simpan akan muncul di halaman ini.
            </p>
        </FadeInUp>

        {watchlist.length === 0 ? (
          <div className="mt-10 rounded-4xl border border-white/10 bg-white/6 p-8 text-center">
            <h2 className="text-2xl font-bold">Watchlist masih kosong</h2>

            <p className="mt-2 text-slate-400">
              Tambahkan film atau series dari halaman detail terlebih dahulu.
            </p>

            <Link href="/" className="mt-6 inline-block">
              <Button>Lihat Daftar Tontonan</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {watchlist.map((item) => {
              const PosterUrl = BikinUrlGambarTmdb(item.posterPath, "w500");

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/6"
                >
                  <Link href={`/detail/${item.slug}`}>
                    <div className="relative aspect-4/5 overflow-hidden bg-slate-900">
                      {PosterUrl ? (
                        <Image
                          src={PosterUrl}
                          alt={item.judul}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="size-full bg-linear-to-br from-[#8FDC2C] to-slate-950" />
                      )}

                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge variant="primary">
                          {FormatTipe(item.tipe)}
                        </Badge>
                        <Badge variant="dark">{item.usia}</Badge>
                      </div>
                    </div>
                  </Link>

                  <div className="space-y-4 p-4">
                    <div>
                      <Link href={`/detail/${item.slug}`}>
                        <h2 className="line-clamp-1 text-lg font-bold transition hover:text-[#8FDC2C]">
                          {item.judul}
                        </h2>
                      </Link>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.tahun} • {item.status}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#8FDC2C]">
                        <Star size={16} fill="currentColor" />
                        {FormatRating(item.rating)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveFromWatchlist(item.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}