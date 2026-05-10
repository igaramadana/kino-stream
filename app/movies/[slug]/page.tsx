import { notFound } from "next/navigation";
import { DetailTontonan } from "@/features/movies/components/DetailTontonan";
import {
  AmbilSlugTontonan,
  AmbilTontonanBySlug,
} from "@/services/TmdbService";

interface DetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return AmbilSlugTontonan();
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const Item = await AmbilTontonanBySlug(slug);

  if (!Item) {
    notFound();
  }

  return (
    <>
      <DetailTontonan Item={Item} />
    </>
  );
}