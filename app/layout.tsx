import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteConfig } from "@/lib/SiteConfig";
import "./globals.css";

export const metadata: Metadata = {
  title: SiteConfig.Nama,
  description: SiteConfig.Deskripsi
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}