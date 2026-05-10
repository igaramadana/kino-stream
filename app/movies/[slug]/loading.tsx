import { Skeleton } from "@/components/ui/Skeleton";

export default function LoadingDetailPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      <Skeleton className="h-11 w-32 rounded-full" />

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Skeleton className="aspect-[4/5] rounded-[2rem]" />

        <div className="space-y-5">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-36 w-full rounded-[1.75rem]" />
        </div>
      </section>
    </main>
  );
}