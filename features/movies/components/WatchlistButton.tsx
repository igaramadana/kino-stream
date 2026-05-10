"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import type { MovieItem } from "@/types/Movie";

type WatchlistButtonProps = {
  item: MovieItem;
};

const WATCHLIST_KEY = "gatrons-watchlist";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("watchlist-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("watchlist-updated", callback);
  };
}

function getWatchlistSnapshot() {
  return localStorage.getItem(WATCHLIST_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function parseWatchlist(value: string): MovieItem[] {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export function WatchlistButton({ item }: WatchlistButtonProps) {
  const watchlistSnapshot = useSyncExternalStore(
    subscribe,
    getWatchlistSnapshot,
    getServerSnapshot
  );

  const watchlist = parseWatchlist(watchlistSnapshot);
  const isSaved = watchlist.some((movie) => movie.id === item.id);

  function handleToggleWatchlist() {
    const updatedWatchlist = isSaved
      ? watchlist.filter((movie) => movie.id !== item.id)
      : [...watchlist, item];

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    window.dispatchEvent(new Event("watchlist-updated"));
  }

  return (
    <motion.button
      type="button"
      onClick={handleToggleWatchlist}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
        isSaved
          ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
          : "border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
      }`}
    >
      {isSaved ? "Hapus dari Watchlist" : "Tambah ke Watchlist"}
    </motion.button>
  );
}