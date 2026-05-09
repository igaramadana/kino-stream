import type {
  MovieItem,
  TmdbGenre,
  TmdbListResponse,
  TmdbMovieResult,
  TmdbTvResult
} from "@/types/Movie";

const TmdbBaseUrl = "https://api.themoviedb.org/3";

function AmbilTokenTmdb() {
  const Token = process.env.TMDB_ACCESS_TOKEN;

  if (!Token) {
    throw new Error("TMDB_ACCESS_TOKEN belum diisi di file .env.local");
  }

  return Token;
}

async function PanggilTmdb<T>(endpoint: string): Promise<T> {
  const Response = await fetch(`${TmdbBaseUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${AmbilTokenTmdb()}`,
      accept: "application/json"
    },
    next: {
      revalidate: 3600
    }
  });

  if (!Response.ok) {
    throw new Error(`Gagal ambil data dari TMDB. Status: ${Response.status}`);
  }

  return Response.json() as Promise<T>;
}

function BikinSlug(judul: string, id: number) {
  const SlugJudul = judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${SlugJudul}-${id}`;
}

function AmbilTahun(tanggal?: string) {
  if (!tanggal) return new Date().getFullYear();

  const Tahun = Number(tanggal.slice(0, 4));

  return Number.isNaN(Tahun) ? new Date().getFullYear() : Tahun;
}

function CocokinGenre(genreIds: number[], daftarGenre: TmdbGenre[]) {
  return genreIds
    .map((GenreId) => {
      const Genre = daftarGenre.find((Item) => Item.id === GenreId);

      return Genre?.name;
    })
    .filter(Boolean) as string[];
}

function BikinDurasi(tipe: "movie" | "series") {
  return tipe === "movie" ? "Movie" : "Series";
}

function BikinUsiaDefault(tipe: "movie" | "series") {
  return tipe === "movie" ? "13+" : "16+";
}

export async function AmbilGenreMovie() {
  const Data = await PanggilTmdb<{ genres: TmdbGenre[] }>(
    "/genre/movie/list?language=id-ID"
  );

  return Data.genres;
}

export async function AmbilGenreSeries() {
  const Data = await PanggilTmdb<{ genres: TmdbGenre[] }>(
    "/genre/tv/list?language=id-ID"
  );

  return Data.genres;
}

export async function AmbilMoviePopuler(): Promise<MovieItem[]> {
  const [DataMovie, DaftarGenre] = await Promise.all([
    PanggilTmdb<TmdbListResponse<TmdbMovieResult>>(
      "/movie/popular?language=id-ID&page=1"
    ),
    AmbilGenreMovie()
  ]);

  return DataMovie.results.slice(0, 10).map((Item, Index) => ({
    id: Item.id,
    slug: BikinSlug(Item.title, Item.id),
    tmdbId: Item.id,
    judul: Item.title || Item.original_title || "Tanpa Judul",
    judulAsli: Item.original_title || Item.title || "Tanpa Judul",
    tipe: "movie",
    tahun: AmbilTahun(Item.release_date),
    durasi: BikinDurasi("movie"),
    rating: Item.vote_average || 0,
    usia: BikinUsiaDefault("movie"),
    genre: CocokinGenre(Item.genre_ids, DaftarGenre),
    sutradara: "Data dari TMDB",
    pemeran: ["Detail cast bisa dikembangkan dari credits API"],
    bahasa: Item.original_language?.toUpperCase() || "N/A",
    status: "Released",
    ringkasan: Item.overview || "Sinopsis belum tersedia.",
    sinopsis: Item.overview || "Sinopsis belum tersedia.",
    posterPath: Item.poster_path,
    backdropPath: Item.backdrop_path,
    trailerLabel: "Lihat Detail",
    trending: Index < 5
  }));
}

export async function AmbilSeriesPopuler(): Promise<MovieItem[]> {
  const [DataSeries, DaftarGenre] = await Promise.all([
    PanggilTmdb<TmdbListResponse<TmdbTvResult>>(
      "/tv/popular?language=id-ID&page=1"
    ),
    AmbilGenreSeries()
  ]);

  return DataSeries.results.slice(0, 10).map((Item, Index) => ({
    id: Item.id,
    slug: BikinSlug(Item.name, Item.id),
    tmdbId: Item.id,
    judul: Item.name || Item.original_name || "Tanpa Judul",
    judulAsli: Item.original_name || Item.name || "Tanpa Judul",
    tipe: "series",
    tahun: AmbilTahun(Item.first_air_date),
    durasi: BikinDurasi("series"),
    rating: Item.vote_average || 0,
    usia: BikinUsiaDefault("series"),
    genre: CocokinGenre(Item.genre_ids, DaftarGenre),
    sutradara: "Data dari TMDB",
    pemeran: ["Detail cast bisa dikembangkan dari credits API"],
    bahasa: Item.original_language?.toUpperCase() || "N/A",
    status: "On Going / Released",
    ringkasan: Item.overview || "Sinopsis belum tersedia.",
    sinopsis: Item.overview || "Sinopsis belum tersedia.",
    posterPath: Item.poster_path,
    backdropPath: Item.backdrop_path,
    trailerLabel: "Lihat Detail",
    trending: Index < 5
  }));
}

export async function AmbilSemuaTontonan(): Promise<MovieItem[]> {
  const [DaftarMovie, DaftarSeries] = await Promise.all([
    AmbilMoviePopuler(),
    AmbilSeriesPopuler()
  ]);

  return [...DaftarMovie, ...DaftarSeries];
}

export async function AmbilTontonanTrending(): Promise<MovieItem[]> {
  const DaftarTontonan = await AmbilSemuaTontonan();

  return DaftarTontonan.filter((Item) => Item.trending);
}

export async function AmbilTontonanBySlug(
  slug: string
): Promise<MovieItem | undefined> {
  const DaftarTontonan = await AmbilSemuaTontonan();

  return DaftarTontonan.find((Item) => Item.slug === slug);
}

export async function AmbilSlugTontonan() {
  const DaftarTontonan = await AmbilSemuaTontonan();

  return DaftarTontonan.map((Item) => ({
    slug: Item.slug
  }));
}