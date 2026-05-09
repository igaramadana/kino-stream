import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { MovieItem } from "@/types/Movie";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";

interface TrendingRowProps {
  DaftarTrending: MovieItem[];
}

export function TrendingRow({ DaftarTrending }: TrendingRowProps) {
  return (
    <section id="trending" className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
          Trending Now
        </p>

        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
          Lagi Banyak Ditonton
        </h2>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {DaftarTrending.map((Item, Index) => {
          const PosterUrl =
            BikinUrlGambarTmdb(Item.backdropPath, "w780") ||
            BikinUrlGambarTmdb(Item.posterPath, "w500");

          return (
            <Link
              key={`${Item.tipe}-${Item.id}`}
              href={`/movies/${Item.slug}`}
              className="group relative min-w-[280px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:border-[#8FDC2C]/60"
            >
              <div className="relative h-44 bg-slate-900">
                {PosterUrl ? (
                  <Image
                    src={PosterUrl}
                    alt={Item.judul}
                    fill
                    sizes="280px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="size-full bg-gradient-to-br from-[#8FDC2C] to-slate-950" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="absolute left-4 top-4">
                <Badge variant="primary">#{Index + 1}</Badge>
              </div>

              <div className="p-4">
                <h3 className="font-black text-white group-hover:text-[#8FDC2C]">
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
    </section>
  );
}