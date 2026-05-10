export function HeroSectionSkeleton() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative grid min-h-[560px] items-end gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-14">
        <div className="max-w-3xl animate-pulse">
          <div className="mb-5 flex flex-wrap gap-2">
            <div className="h-7 w-24 rounded-full bg-white/10" />
            <div className="h-7 w-20 rounded-full bg-white/10" />
            <div className="h-7 w-16 rounded-full bg-white/10" />
          </div>

          <div className="h-14 w-4/5 rounded-2xl bg-white/10 md:h-20" />
          <div className="mt-3 h-14 w-3/5 rounded-2xl bg-white/10 md:h-20" />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="h-5 w-14 rounded bg-white/10" />
            <div className="h-5 w-2 rounded bg-white/10" />
            <div className="h-5 w-24 rounded bg-white/10" />
            <div className="h-5 w-2 rounded bg-white/10" />
            <div className="h-5 w-20 rounded bg-white/10" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-2/3 rounded bg-white/10" />
          </div>

          <div className="mt-3 h-4 w-72 max-w-full rounded bg-white/10" />

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="h-11 w-28 rounded-full bg-white/10" />
            <div className="h-11 w-32 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <div className="relative aspect-[3/4] w-72 rotate-3 overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="size-full animate-pulse rounded-[1.5rem] bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}