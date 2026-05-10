import { HeroSectionSkeleton } from "@/features/movies/components/HeroSectionSkeleton";
import { MovieListSkeleton } from "@/features/movies/components/MovieListSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 text-white md:py-12">
      <HeroSectionSkeleton />

      <section className="mt-12">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-white/10" />

        <MovieListSkeleton />
      </section>
    </main>
  );
}