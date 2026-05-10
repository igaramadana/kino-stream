import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8FDC2C]">
        404
      </p>

      <h1 className="mt-3 text-5xl font-black text-white">Halaman tidak ketemu</h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
        Kayaknya tontonan yang kamu cari belum tersedia di library ini.
      </p>

      <Link href="/" className="mt-8">
        <Button>Kembali ke Home</Button>
      </Link>
    </main>
  );
}