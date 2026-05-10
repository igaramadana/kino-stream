export type TipeTontonan = "movie" | "series";

export interface MovieItem {
  id: number;
  slug: string;
  tmdbId: number;
  judul: string;
  judulAsli: string;
  tipe: TipeTontonan;
  tahun: number;
  durasi: string;
  rating: number;
  usia: string;
  genre: string[];
  sutradara: string;
  pemeran: string[];
  bahasa: string;
  status: string;
  ringkasan: string;
  sinopsis: string;
  posterPath: string | null;
  backdropPath: string | null;
  trailerLabel: string;
  trailerUrl: string | null;
  studio: string[];
  trending: boolean;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMovieResult {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
}

export interface TmdbTvResult {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
}

export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovieDetail {
  id: number;
  runtime: number | null;
  status: string;
  production_companies: {
    id: number;
    name: string;
  }[];
}

export interface TmdbTvDetail {
  id: number;
  episode_run_time: number[];
  status: string;
  production_companies: {
    id: number;
    name: string;
  }[];
}

export interface TmdbCreditCast {
  id: number;
  name: string;
  character: string;
  order: number;
}

export interface TmdbCreditsResponse {
  id: number;
  cast: TmdbCreditCast[];
}

export interface TmdbVideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TmdbVideosResponse {
  id: number;
  results: TmdbVideoResult[];
}