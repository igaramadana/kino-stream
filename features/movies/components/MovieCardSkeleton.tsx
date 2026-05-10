export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/6 p-3">
      <div className="mb-4 aspect-[2/3] rounded-xl bg-white/10" />

      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}