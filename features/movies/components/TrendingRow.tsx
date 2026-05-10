"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import type { MovieItem } from "@/types/Movie";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";

interface TrendingRowProps {
  DaftarTrending: MovieItem[];
}

export function TrendingRow({ DaftarTrending }: TrendingRowProps) {
  const SliderRef = useRef<HTMLDivElement>(null);

  function GeserSlider(arah: "kiri" | "kanan") {
    if (!SliderRef.current) return;

    const JarakGeser = 340;

    SliderRef.current.scrollBy({
      left: arah === "kiri" ? -JarakGeser : JarakGeser,
      behavior: "smooth",
    });
  }

  return (
    <section id="trending" className="space-y-5">
      <div>
        <p className="font-title text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
          Trending Now
        </p>

        <h2 className="mt-2 font-title text-3xl font-bold text-white md:text-4xl">
          Lagi Banyak Ditonton
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => GeserSlider("kiri")}
          className="absolute left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white shadow-xl backdrop-blur transition hover:bg-[#8FDC2C] hover:text-slate-950 md:left-4"
          aria-label="Geser trending ke kiri"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          ref={SliderRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {DaftarTrending.map((Item, Index) => {
            const PosterUrl =
              BikinUrlGambarTmdb(Item.backdropPath, "w780") ||
              BikinUrlGambarTmdb(Item.posterPath, "w500");

            return (
              <Link
                key={`${Item.tipe}-${Item.id}`}
                href={`/movies/${Item.slug}`}
                className="group relative min-w-[280px] snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/6 transition duration-300 hover:-translate-y-1 hover:border-[#8FDC2C]/60 md:min-w-[340px]"
              >
                <div className="relative h-44 bg-slate-900 md:h-52">
                  {PosterUrl ? (
                    <Image
                      src={PosterUrl}
                      alt={Item.judul}
                      fill
                      sizes="(max-width: 768px) 280px, 340px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full bg-linear-to-br from-[#8FDC2C] to-slate-950" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                <div className="absolute left-4 top-4">
                  <Badge variant="primary">#{Index + 1}</Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-title text-xl font-bold text-white transition group-hover:text-[#8FDC2C]">
                    {Item.judul}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
                    {Item.ringkasan}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => GeserSlider("kanan")}
          className="absolute right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white shadow-xl backdrop-blur transition hover:bg-[#8FDC2C] hover:text-slate-950 md:right-4"
          aria-label="Geser trending ke kanan"
        >
          <ChevronRight size={22} />
        </button>

        <div className="pointer-events-none absolute bottom-2 left-0 top-0 w-20 bg-gradient-to-r from-[#030712] to-transparent" />
        <div className="pointer-events-none absolute bottom-2 right-0 top-0 w-20 bg-gradient-to-l from-[#030712] to-transparent" />
      </div>
    </section>
  );
}