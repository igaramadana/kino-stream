"use client";

import { useState } from "react";

type WatchlistItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  media_type?: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
};

type WatchlistButtonProps = {
  item: WatchlistItem;
};

const WATCHLIST_KEY = "gatrons-watchlist";

function getInitialWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedWatchlist = localStorage.getItem(WATCHLIST_KEY);

  if (!storedWatchlist) {
    return [];
  }

  try {
    return JSON.parse(storedWatchlist);
  } catch {
    return [];
  }
}

export function WatchlistButton({ item }: WatchlistButtonProps) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(
    getInitialWatchlist
  );

  const isSaved = watchlist.some((movie) => movie.id === item.id);

  function handleToggleWatchlist() {
    let updatedWatchlist: WatchlistItem[];

    if (isSaved) {
      updatedWatchlist = watchlist.filter((movie) => movie.id !== item.id);
    } else {
      updatedWatchlist = [...watchlist, item];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
  }

  return (
    <button
      type="button"
      onClick={handleToggleWatchlist}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        isSaved
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white text-black hover:bg-zinc-950"
      }`}
    >
      {isSaved ? "Hapus dari Watchlist" : "Tambah ke Watchlist"}
    </button>
  );
}