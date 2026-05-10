import { ErrorBox } from "@/features/movies/components/ErrorBox";
import { HeroSection } from "@/features/movies/components/HeroSection";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { StatSection } from "@/features/movies/components/StatSection";
import { TrendingRow } from "@/features/movies/components/TrendingRow";
import {
  AmbilSemuaTontonan,
  AmbilTontonanTrending
} from "@/services/TmdbService";

async function AmbilDataHomePage() {
  try {
    const [DaftarMovie, DaftarTrending] = await Promise.all([
      AmbilSemuaTontonan(),
      AmbilTontonanTrending()
    ]);

    return {
      Data: {
        DaftarMovie,
        DaftarTrending,
        TontonanUtama: DaftarTrending[0] ?? DaftarMovie[0]
      },
      ErrorMessage: null
    };
  } catch (error: unknown) {
    const ErrorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi error saat mengambil data TMDB.";

    return {
      Data: null,
      ErrorMessage
    };
  }
}

export default async function HomePage() {
  const { Data, ErrorMessage } = await AmbilDataHomePage();

  if (ErrorMessage) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <ErrorBox
          title="Gagal mengambil data"
          message={`${ErrorMessage}. Pastikan TMDB_ACCESS_TOKEN sudah benar di .env.local.`}
        />
      </main>
    );
  }

  if (!Data || !Data.TontonanUtama) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <ErrorBox message="Data dari TMDB kosong. Coba cek koneksi internet atau token TMDB kamu." />
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-8 md:py-12">
      <HeroSection TontonanUtama={Data.TontonanUtama} />
      <StatSection DaftarMovie={Data.DaftarMovie} />
      <TrendingRow DaftarTrending={Data.DaftarTrending} />

      <section id="list" className="space-y-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
            Explore Library
          </p>

          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Pilih tontonan malam ini
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Data diambil langsung dari TMDB API, lalu difilter di sisi client.
            Struktur dibuat modular supaya mudah dibaca, diuji, dan dikembangkan.
          </p>
        </div>

        <MovieGrid DaftarMovie={Data.DaftarMovie} />
      </section>
    </main>
  );
}