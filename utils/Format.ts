import type { TipeTontonan } from '@/types/Movie';

export function FormatRating(nilai: number) {
    return nilai.toFixed(1);
}

export function FormatTipe(tipe: TipeTontonan) {
    return tipe === "movie" ? "Movie" : "Series";
}

export function FormatGenre(genre: string[]) {
    if (genre.length === 0) return "Genre belum tersedia";

    return genre.join(" • ");
}

export function FormatTahun(tahun: number) {
    if (!tahun || Number.isNaN(tahun)) return "Tahun belum tersedia";

    return String(tahun);
}