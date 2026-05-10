import type {
  MovieItem,
  TmdbCreditsResponse,
  TmdbGenre,
  TmdbListResponse,
  TmdbMovieDetail,
  TmdbMovieResult,
  TmdbTvDetail,
  TmdbTvResult,
  TmdbVideosResponse,
  TipeTontonan,
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
      accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
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

function BikinUsiaDefault(tipe: TipeTontonan) {
  return tipe === "movie" ? "13+" : "16+";
}

function FormatDurasiMovie(runtime?: number | null) {
  if (!runtime) return "Durasi belum tersedia";

  const Jam = Math.floor(runtime / 60);
  const Menit = runtime % 60;

  if (Jam === 0) {
    return `${Menit}m`;
  }

  return `${Jam}j ${Menit}m`;
}

function FormatDurasiSeries(episodeRunTime?: number[]) {
  const DurasiEpisode = episodeRunTime?.[0];

  if (!DurasiEpisode) {
    return "Durasi belum tersedia";
  }

  return `${DurasiEpisode}m / episode`;
}

function AmbilStudio(
  productionCompanies?: {
    id: number;
    name: string;
  }[]
) {
  if (!productionCompanies || productionCompanies.length === 0) {
    return ["Studio belum tersedia"];
  }

  return productionCompanies.slice(0, 3).map((Studio) => Studio.name);
}

async function AmbilDetailTambahanTmdb(
  tipe: TipeTontonan,
  tmdbId: number
): Promise<{
  durasi: string;
  status: string;
  studio: string[];
}> {
  try {
    if (tipe === "movie") {
      const Detail = await PanggilTmdb<TmdbMovieDetail>(
        `/movie/${tmdbId}?language=id-ID`
      );

      return {
        durasi: FormatDurasiMovie(Detail.runtime),
        status: Detail.status || "Status belum tersedia",
        studio: AmbilStudio(Detail.production_companies),
      };
    }

    const Detail = await PanggilTmdb<TmdbTvDetail>(
      `/tv/${tmdbId}?language=id-ID`
    );

    return {
      durasi: FormatDurasiSeries(Detail.episode_run_time),
      status: Detail.status || "Status belum tersedia",
      studio: AmbilStudio(Detail.production_companies),
    };
  } catch {
    return {
      durasi: tipe === "movie" ? "Movie" : "Series",
      status: "Status belum tersedia",
      studio: ["Studio belum tersedia"],
    };
  }
}

async function AmbilPemeranTmdb(
  tipe: TipeTontonan,
  tmdbId: number
): Promise<string[]> {
  const Endpoint =
    tipe === "movie"
      ? `/movie/${tmdbId}/credits?language=id-ID`
      : `/tv/${tmdbId}/credits?language=id-ID`;

  try {
    const Data = await PanggilTmdb<TmdbCreditsResponse>(Endpoint);

    const Pemeran = Data.cast
      .sort((AktorA, AktorB) => AktorA.order - AktorB.order)
      .slice(0, 6)
      .map((Aktor) => Aktor.name);

    return Pemeran.length > 0 ? Pemeran : ["Pemeran belum tersedia"];
  } catch {
    return ["Pemeran belum tersedia"];
  }
}

async function AmbilTrailerTmdb(
  tipe: TipeTontonan,
  tmdbId: number
): Promise<string | null> {
  const Endpoint =
    tipe === "movie"
      ? `/movie/${tmdbId}/videos?language=en-US`
      : `/tv/${tmdbId}/videos?language=en-US`;

  try {
    const Data = await PanggilTmdb<TmdbVideosResponse>(Endpoint);

    const Trailer =
      Data.results.find(
        (Video) =>
          Video.site === "YouTube" &&
          Video.type === "Trailer" &&
          Video.official
      ) ||
      Data.results.find(
        (Video) => Video.site === "YouTube" && Video.type === "Trailer"
      ) ||
      Data.results.find((Video) => Video.site === "YouTube");

    if (!Trailer) {
      return null;
    }

    return `https://www.youtube.com/watch?v=${Trailer.key}`;
  } catch {
    return null;
  }
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
    AmbilGenreMovie(),
  ]);

  return Promise.all(
    DataMovie.results.slice(0, 10).map(async (Item, Index) => {
      const Judul = Item.title || Item.original_title || "Tanpa Judul";

      const [DetailTambahan, Pemeran, TrailerUrl] = await Promise.all([
        AmbilDetailTambahanTmdb("movie", Item.id),
        AmbilPemeranTmdb("movie", Item.id),
        AmbilTrailerTmdb("movie", Item.id),
      ]);

      return {
        id: Item.id,
        slug: BikinSlug(Judul, Item.id),
        tmdbId: Item.id,
        judul: Judul,
        judulAsli: Item.original_title || Item.title || "Tanpa Judul",
        tipe: "movie" as const,
        tahun: AmbilTahun(Item.release_date),
        durasi: DetailTambahan.durasi,
        rating: Item.vote_average || 0,
        usia: BikinUsiaDefault("movie"),
        genre: CocokinGenre(Item.genre_ids, DaftarGenre),
        sutradara: DetailTambahan.studio.join(", "),
        pemeran: Pemeran,
        bahasa: Item.original_language?.toUpperCase() || "N/A",
        status: DetailTambahan.status,
        ringkasan: Item.overview || "Sinopsis belum tersedia.",
        sinopsis: Item.overview || "Sinopsis belum tersedia.",
        posterPath: Item.poster_path,
        backdropPath: Item.backdrop_path,
        trailerLabel: TrailerUrl ? "Lihat Trailer" : "Trailer belum tersedia",
        trailerUrl: TrailerUrl,
        studio: DetailTambahan.studio,
        trending: Index < 5,
      };
    })
  );
}

export async function AmbilSeriesPopuler(): Promise<MovieItem[]> {
  const [DataSeries, DaftarGenre] = await Promise.all([
    PanggilTmdb<TmdbListResponse<TmdbTvResult>>(
      "/tv/popular?language=id-ID&page=1"
    ),
    AmbilGenreSeries(),
  ]);

  return Promise.all(
    DataSeries.results.slice(0, 10).map(async (Item, Index) => {
      const Judul = Item.name || Item.original_name || "Tanpa Judul";

      const [DetailTambahan, Pemeran, TrailerUrl] = await Promise.all([
        AmbilDetailTambahanTmdb("series", Item.id),
        AmbilPemeranTmdb("series", Item.id),
        AmbilTrailerTmdb("series", Item.id),
      ]);

      return {
        id: Item.id,
        slug: BikinSlug(Judul, Item.id),
        tmdbId: Item.id,
        judul: Judul,
        judulAsli: Item.original_name || Item.name || "Tanpa Judul",
        tipe: "series" as const,
        tahun: AmbilTahun(Item.first_air_date),
        durasi: DetailTambahan.durasi,
        rating: Item.vote_average || 0,
        usia: BikinUsiaDefault("series"),
        genre: CocokinGenre(Item.genre_ids, DaftarGenre),
        sutradara: DetailTambahan.studio.join(", "),
        pemeran: Pemeran,
        bahasa: Item.original_language?.toUpperCase() || "N/A",
        status: DetailTambahan.status,
        ringkasan: Item.overview || "Sinopsis belum tersedia.",
        sinopsis: Item.overview || "Sinopsis belum tersedia.",
        posterPath: Item.poster_path,
        backdropPath: Item.backdrop_path,
        trailerLabel: TrailerUrl ? "Lihat Trailer" : "Trailer belum tersedia",
        trailerUrl: TrailerUrl,
        studio: DetailTambahan.studio,
        trending: Index < 5,
      };
    })
  );
}

export async function AmbilSemuaTontonan(): Promise<MovieItem[]> {
  const [DaftarMovie, DaftarSeries] = await Promise.all([
    AmbilMoviePopuler(),
    AmbilSeriesPopuler(),
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
    slug: Item.slug,
  }));
}