import { SiteConfig } from "@/lib/SiteConfig";

export function Footer() {
  return (
    <footer id="about" className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {SiteConfig.Nama}. Dibuat untuk technical test Frontend Developer.</p>

        <p>
          Built with <span className="text-[#8FDC2C]">Next.js</span>, TypeScript,
          Tailwind CSS, Bun, dan TMDB API.
        </p>
      </div>
    </footer>
  );
}