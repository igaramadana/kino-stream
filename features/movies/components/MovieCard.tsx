import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MovieItem } from "@/types/Movie";
import { FormatRating, FormatTipe } from "@/utils/Format";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";

interface MovieCardProps {
  Item: MovieItem;
}

export function MovieCard({ Item }: MovieCardProps) {
  const PosterUrl = BikinUrlGambarTmdb(Item.posterPath, "w500");

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-2 hover:border-[#8FDC2C]/60 hover:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <Link href={`/movies/${Item.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
          {PosterUrl ? (
            <Image
              src={PosterUrl}
              alt={Item.judul}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="size-full bg-gradient-to-br from-[#8FDC2C] to-slate-950" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="primary">{FormatTipe(Item.tipe)}</Badge>
            {Item.trending && <Badge variant="dark">Trending</Badge>}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8FDC2C]">
              {Item.tahun}
            </p>

            <h3 className="mt-1 text-2xl font-black text-white">{Item.judul}</h3>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            {Item.genre.slice(0, 2).join(" • ") || "Genre belum tersedia"}
          </p>

          <p className="flex items-center gap-1 text-sm font-bold text-[#8FDC2C]">
            <Star size={15} fill="currentColor" />
            {FormatRating(Item.rating)}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-300">
          {Item.ringkasan}
        </p>

        <Link href={`/movies/${Item.slug}`}>
          <Button variant="ghost" className="w-full">
            Lihat Detail
          </Button>
        </Link>
      </div>
    </article>
  );
}