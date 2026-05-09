import Image from "next/image";
import Link from "next/link";
import { Info, Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MovieItem } from "@/types/Movie";
import { FormatGenre, FormatRating, FormatTipe } from "@/utils/Format";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";

interface HeroSectionProps {
  TontonanUtama: MovieItem;
}

export function HeroSection({ TontonanUtama }: HeroSectionProps) {
  const BackdropUrl =
    BikinUrlGambarTmdb(TontonanUtama.backdropPath, "original") ||
    BikinUrlGambarTmdb(TontonanUtama.posterPath, "w780");

  const PosterUrl = BikinUrlGambarTmdb(TontonanUtama.posterPath, "w500");

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black">
      {BackdropUrl ? (
        <Image
          src={BackdropUrl}
          alt={TontonanUtama.judul}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#8FDC2C]/60 to-slate-950" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative grid min-h-[560px] items-end gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-14">
        <div className="max-w-3xl animate-[FadeNaik_0.7s_ease-out]">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge variant="primary">Top Pick</Badge>
            <Badge variant="dark">{FormatTipe(TontonanUtama.tipe)}</Badge>
            <Badge variant="dark">{TontonanUtama.usia}</Badge>
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
            {TontonanUtama.judul}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-200">
            <span>{TontonanUtama.tahun}</span>
            <span>•</span>
            <span>{TontonanUtama.durasi}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#8FDC2C]">
              <Star size={16} fill="currentColor" />
              {FormatRating(TontonanUtama.rating)}
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            {TontonanUtama.ringkasan}
          </p>

          <p className="mt-3 text-sm font-medium text-slate-400">
            {FormatGenre(TontonanUtama.genre)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="gap-2">
              <Play size={18} fill="currentColor" />
              Play
            </Button>

            <Link href={`/movies/${TontonanUtama.slug}`}>
              <Button variant="ghost" className="gap-2">
                <Info size={18} />
                Detail
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <div className="relative aspect-[3/4] w-72 rotate-3 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="relative size-full overflow-hidden rounded-[1.5rem] bg-slate-900">
              {PosterUrl ? (
                <Image
                  src={PosterUrl}
                  alt={TontonanUtama.judul}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              ) : (
                <div className="size-full bg-gradient-to-br from-[#8FDC2C] to-slate-950" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}