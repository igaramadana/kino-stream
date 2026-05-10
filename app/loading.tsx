import { Skeleton } from "@/components/ui/Skeleton";

export default function LoadingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <Skeleton className="h-[560px] rounded-[2rem]" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, Index) => (
          <Skeleton key={Index} className="h-32 rounded-3xl" />
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, Index) => (
          <Skeleton key={Index} className="aspect-[4/5] rounded-[1.75rem]" />
        ))}
      </div>
    </main>
  );
}