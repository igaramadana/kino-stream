import type { MovieItem } from "@/types/Movie";

interface StatSectionProps {
  DaftarMovie: MovieItem[];
}

export function StatSection({ DaftarMovie }: StatSectionProps) {
  const TotalMovie = DaftarMovie.filter((Item) => Item.tipe === "movie").length;
  const TotalSeries = DaftarMovie.filter((Item) => Item.tipe === "series").length;

  const RatingRataRata =
    DaftarMovie.length > 0
      ? DaftarMovie.reduce((Total, Item) => Total + Item.rating, 0) / DaftarMovie.length
      : 0;

  const DataStat = [
    {
      label: "Total Title",
      value: DaftarMovie.length
    },
    {
      label: "Movie",
      value: TotalMovie
    },
    {
      label: "Series",
      value: TotalSeries
    },
    {
      label: "Avg Rating",
      value: RatingRataRata.toFixed(1)
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {DataStat.map((Item) => (
        <div
          key={Item.label}
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[#8FDC2C]/50"
        >
          <p className="text-sm font-medium text-slate-400">{Item.label}</p>
          <p className="mt-2 text-4xl font-black text-white">{Item.value}</p>
        </div>
      ))}
    </section>
  );
}