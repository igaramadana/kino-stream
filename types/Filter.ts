import type { TipeTontonan } from "@/types/Movie";

export type TipeFilter = "all" | TipeTontonan;
export type UrutanFilter = "rating-tertinggi" | "tahun-terbaru" | "judul-az";

export interface FilterMovieState {
    kataKunci: string;
    tipe: TipeFilter;
    urutan: UrutanFilter;
}