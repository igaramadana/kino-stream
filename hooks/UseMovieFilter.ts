"use client";

import { useMemo, useState } from "react";
import { FilterMovieAwal } from "@/store/MovieFilterStore";
import type { FilterMovieState } from "@/types/Filter";
import type { MovieItem } from "@/types/Movie";

export function useMovieFilter(DaftarAwal: MovieItem[]) {
  const [Filter, SetFilter] = useState<FilterMovieState>(FilterMovieAwal);

  const DaftarTersaring = useMemo(() => {
    const Keyword = Filter.kataKunci.trim().toLowerCase();

    return DaftarAwal.filter((Item) => {
      const CocokKeyword =
        Item.judul.toLowerCase().includes(Keyword) ||
        Item.judulAsli.toLowerCase().includes(Keyword) ||
        Item.genre.join(" ").toLowerCase().includes(Keyword) ||
        Item.ringkasan.toLowerCase().includes(Keyword);

      const CocokTipe = Filter.tipe === "all" || Item.tipe === Filter.tipe;

      return CocokKeyword && CocokTipe;
    }).sort((A, B) => {
      if (Filter.urutan === "tahun-terbaru") return B.tahun - A.tahun;
      if (Filter.urutan === "judul-az") return A.judul.localeCompare(B.judul);

      return B.rating - A.rating;
    });
  }, [DaftarAwal, Filter]);

  function GantiKataKunci(kataKunci: string) {
    SetFilter((Sekarang) => ({
      ...Sekarang,
      kataKunci
    }));
  }

  function GantiTipe(tipe: FilterMovieState["tipe"]) {
    SetFilter((Sekarang) => ({
      ...Sekarang,
      tipe
    }));
  }

  function GantiUrutan(urutan: FilterMovieState["urutan"]) {
    SetFilter((Sekarang) => ({
      ...Sekarang,
      urutan
    }));
  }

  function ResetFilter() {
    SetFilter(FilterMovieAwal);
  }

  return {
    Filter,
    DaftarTersaring,
    GantiKataKunci,
    GantiTipe,
    GantiUrutan,
    ResetFilter
  };
}