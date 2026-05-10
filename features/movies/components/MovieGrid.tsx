"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useMovieFilter } from "@/hooks/UseMovieFilter";
import type { MovieItem } from "@/types/Movie";
import { MovieCard } from "./MovieCard";
import { MovieFilter } from "./MovieFilter";

interface MovieGridProps {
  DaftarMovie: MovieItem[];
}

export function MovieGrid({ DaftarMovie }: MovieGridProps) {
  const [LagiLoading, SetLagiLoading] = useState(true);

  const {
    Filter,
    DaftarTersaring,
    GantiKataKunci,
    GantiTipe,
    GantiUrutan,
    ResetFilter
  } = useMovieFilter(DaftarMovie);

  useEffect(() => {
    const Timer = window.setTimeout(() => SetLagiLoading(false), 650);

    return () => window.clearTimeout(Timer);
  }, []);

  if (LagiLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, Index) => (
          <div
            key={Index}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4"
          >
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="mt-5 h-5 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MovieFilter
        Filter={Filter}
        GantiKataKunci={GantiKataKunci}
        GantiTipe={GantiTipe}
        GantiUrutan={GantiUrutan}
        ResetFilter={ResetFilter}
      />

      {DaftarTersaring.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DaftarTersaring.map((Item) => (
            <MovieCard key={`${Item.tipe}-${Item.id}`} Item={Item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/[0.04] p-10 text-center">
          <h3 className="text-2xl font-black text-white">Filmnya belum ketemu</h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Coba kata kunci lain atau reset filter supaya semua daftar muncul lagi.
          </p>

          <Button onClick={ResetFilter} className="mt-5">
            Balikin Semua
          </Button>
        </div>
      )}
    </div>
  );
}