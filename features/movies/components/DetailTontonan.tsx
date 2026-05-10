import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Play, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MovieItem } from "@/types/Movie";
import { FormatGenre, FormatRating, FormatTipe } from "@/utils/Format";
import { BikinUrlGambarTmdb } from "@/utils/TmdbImage";
import { WatchlistButton } from "./WatchlistButton";
import { ScaleIn, HoverScale } from "@/components/animations/MotionWrapper";

interface DetailTontonanProps {
  Item: MovieItem;
}

export function DetailTontonan({ Item }: DetailTontonanProps) {
  const PosterUrl = BikinUrlGambarTmdb(Item.posterPath, "w500");
  const BackdropUrl =
    BikinUrlGambarTmdb(Item.backdropPath, "original") ||
    BikinUrlGambarTmdb(Item.posterPath, "w780");

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      <Link href="/">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size={18} />
          Kembali
        </Button>
      </Link>

      <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black">
        {BackdropUrl ? (
          <Image
            src={BackdropUrl}
            alt={Item.judul}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#8FDC2C]/50 to-slate-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

        <div className="relative grid gap-8 p-5 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <ScaleIn
            delay={0.1}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-slate-900">
              {PosterUrl ? (
                <Image
                  src={PosterUrl}
                  alt={Item.judul}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              ) : (
                <div className="size-full bg-gradient-to-br from-[#8FDC2C] to-slate-950" />
              )}
            </div>

            <div className="absolute left-8 top-8 flex gap-2">
              <Badge variant="primary">{FormatTipe(Item.tipe)}</Badge>
              <Badge variant="dark">{Item.usia}</Badge>
            </div>
          </ScaleIn>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
              Detail Tontonan
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
              {Item.judul}
            </h1>

            <p className="mt-3 text-lg text-slate-400">{Item.judulAsli}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-300">
              <span>{Item.tahun}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={16} />
                {Item.durasi}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[#8FDC2C]">
                <Star size={16} fill="currentColor" />
                {FormatRating(Item.rating)}
              </span>
              <span>•</span>
              <span>{Item.status}</span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200">
              {Item.sinopsis}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {Item.genre.length > 0 ? (
                Item.genre.map((Genre) => <Badge key={Genre}>{Genre}</Badge>)
              ) : (
                <Badge>Genre belum tersedia</Badge>
              )}
            </div>

            <div className="mt-8 grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Studio</p>
                <p className="mt-1 font-bold text-white">
                  {Item.studio.length > 0
                    ? Item.studio.join(", ")
                    : "Studio belum tersedia"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Bahasa</p>
                <p className="mt-1 font-bold text-white">{Item.bahasa}</p>
              </div>

              <div className="md:col-span-2">
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Users size={16} />
                  Pemeran
                </p>

                <p className="mt-1 font-bold text-white">
                  {Item.pemeran.join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {Item.trailerUrl ? (
                <HoverScale>
                  <a href={Item.trailerUrl} target="_blank" rel="noreferrer">
                    <Button className="gap-2">
                      <Play size={17} fill="currentColor" />
                      {Item.trailerLabel}
                    </Button>
                  </a>
                </HoverScale>
              ) : (
                <Button disabled>{Item.trailerLabel}</Button>
              )}

              <WatchlistButton item={Item} />
            </div>

            <p className="mt-5 text-sm text-slate-500">
              {FormatGenre(Item.genre)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}