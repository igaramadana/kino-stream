import { RotateCcw, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type {
  FilterMovieState,
  TipeFilter,
  UrutanFilter,
} from "@/types/Filter";

interface MovieFilterProps {
  Filter: FilterMovieState;
  GantiKataKunci: (value: string) => void;
  GantiTipe: (value: TipeFilter) => void;
  GantiUrutan: (value: UrutanFilter) => void;
  ResetFilter: () => void;
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(Event) => onChange(Event.target.value)}
          className="h-11 w-full appearance-none rounded-full border border-white/10 bg-slate-950 px-4 pr-10 text-sm font-medium text-white outline-none transition focus:border-[#8FDC2C]/70 focus:ring-2 focus:ring-[#8FDC2C]/20"
        >
          {options.map((Option) => (
            <option key={Option.value} value={Option.value}>
              {Option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </label>
  );
}

export function MovieFilter({
  Filter,
  GantiKataKunci,
  GantiTipe,
  GantiUrutan,
  ResetFilter,
}: MovieFilterProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/20 backdrop-blur md:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-[#8FDC2C]/15 text-[#8FDC2C]">
          <SlidersHorizontal size={18} />
        </span>

        <div>
          <h2 className="text-xl font-bold text-white">
            Filter Tontonan
          </h2>
          <p className="text-sm text-slate-500">
            Cari dan urutkan movie atau series favoritmu.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_auto] lg:items-end">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Pencarian
          </span>

          <div className="relative">
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
          </div>
        </label>

        <FilterSelect
          label="Tipe"
          value={Filter.tipe}
          onChange={(Value) => GantiTipe(Value as TipeFilter)}
          options={[
            { value: "all", label: "Semua Tipe" },
            { value: "movie", label: "Movie" },
            { value: "series", label: "Series" },
          ]}
        />

        <FilterSelect
          label="Urutan"
          value={Filter.urutan}
          onChange={(Value) => GantiUrutan(Value as UrutanFilter)}
          options={[
            { value: "rating-tertinggi", label: "Rating Tertinggi" },
            { value: "tahun-terbaru", label: "Tahun Terbaru" },
            { value: "judul-az", label: "Judul A-Z" },
          ]}
        />

        <Button
          variant="outline"
          onClick={ResetFilter}
          className="h-11 w-full gap-2 lg:w-auto"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
    </section>
  );
}