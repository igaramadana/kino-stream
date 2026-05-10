import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { FilterMovieState, TipeFilter, UrutanFilter } from "@/types/Filter";

interface MovieFilterProps {
  Filter: FilterMovieState;
  GantiKataKunci: (value: string) => void;
  GantiTipe: (value: TipeFilter) => void;
  GantiUrutan: (value: UrutanFilter) => void;
  ResetFilter: () => void;
}

export function MovieFilter({
  Filter,
  GantiKataKunci,
  GantiTipe,
  GantiUrutan,
  ResetFilter
}: MovieFilterProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_220px_auto]">
        <label className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <Input
            value={Filter.kataKunci}
            onChange={(Event) => GantiKataKunci(Event.target.value)}
            placeholder="Cari judul, genre, atau sinopsis..."
            className="pl-11"
          />
        </label>

        <select
          value={Filter.tipe}
          onChange={(Event) => GantiTipe(Event.target.value as TipeFilter)}
          className="h-11 rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-[#8FDC2C]/70"
        >
          <option value="all">Semua Tipe</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        <select
          value={Filter.urutan}
          onChange={(Event) => GantiUrutan(Event.target.value as UrutanFilter)}
          className="h-11 rounded-full border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-[#8FDC2C]/70"
        >
          <option value="rating-tertinggi">Rating Tertinggi</option>
          <option value="tahun-terbaru">Tahun Terbaru</option>
          <option value="judul-az">Judul A-Z</option>
        </select>

        <Button variant="outline" onClick={ResetFilter}>
          Reset
        </Button>
      </div>
    </div>
  );
}