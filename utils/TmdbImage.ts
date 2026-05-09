const TmdbImageBaseUrl =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export function BikinUrlGambarTmdb(
  path: string | null,
  size: "w300" | "w500" | "w780" | "original" = "w500"
) {
  if (!path) return null;

  return `${TmdbImageBaseUrl}/${size}${path}`;
}