# Kino Stream

Kino Stream adalah website movie list berbasis **Next.js** yang menampilkan daftar film dan series menggunakan data dari **TMDB API**. Project ini dibuat dengan struktur modular agar mudah dikembangkan, dibaca, dan dipelihara.

Website ini menyediakan fitur daftar tontonan populer, trending section, detail film/series, filter berdasarkan keyword/type/sorting, serta fitur watchlist yang disimpan di browser menggunakan `localStorage`.

## Demo

Live Demo:  
https://kino-stream.vercel.app

## Tech Stack

Project ini dibuat menggunakan beberapa teknologi berikut:

| Teknologi     | Keterangan                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Next.js       | Framework React untuk routing, rendering, dan optimasi aplikasi                                 |
| React         | Library utama untuk membangun UI                                                                |
| TypeScript    | Menambahkan type safety pada JavaScript                                                         |
| Tailwind CSS  | Styling utility-first untuk membuat tampilan responsive                                         |
| Framer Motion | Animasi pada komponen UI                                                                        |
| Lucide React  | Icon library untuk kebutuhan icon                                                               |
| TMDB API      | Sumber data film, series, detail, poster, backdrop, cast, dan trailer                           |
| Bun           | Runtime dan package manager yang digunakan untuk instalasi dependency serta menjalankan project |

## Fitur Utama

### 1. Menampilkan Daftar Movie dan Series

Aplikasi mengambil data movie dan series populer dari TMDB API, lalu menggabungkannya menjadi satu daftar tontonan.

Data yang ditampilkan meliputi:

- Judul
- Judul asli
- Tahun rilis
- Rating
- Genre
- Poster
- Backdrop
- Bahasa
- Status
- Studio
- Pemeran
- Ringkasan atau sinopsis
- Trailer YouTube jika tersedia

### 2. Trending Section

Pada halaman utama terdapat section khusus untuk menampilkan tontonan yang sedang trending. Data trending diambil dari data movie dan series yang sudah diproses, kemudian ditampilkan dalam bentuk row horizontal.

### 3. Hero Section

Hero section menampilkan tontonan utama yang diambil dari daftar trending atau daftar movie/series pertama yang tersedia.

Bagian ini digunakan untuk memberikan highlight pada salah satu tontonan agar tampilan halaman utama terlihat lebih menarik.

### 4. Filter Movie dan Series

User dapat melakukan filter daftar tontonan berdasarkan:

- Keyword pencarian
- Tipe tontonan:
  - Semua
  - Movie
  - Series
- Urutan:
  - Rating tertinggi
  - Tahun terbaru
  - Judul A-Z

Filter ini berjalan di sisi client menggunakan custom hook `useMovieFilter`.

### 5. Halaman Detail Tontonan

Setiap movie atau series memiliki halaman detail berdasarkan `slug`.

Contoh route:

```bash
/movies/nama-film-12345
```

Pada halaman detail, user dapat melihat informasi lebih lengkap seperti:

- Poster dan backdrop
- Judul
- Rating
- Tahun
- Genre
- Durasi
- Status
- Studio
- Pemeran
- Sinopsis
- Link trailer
- Tombol tambah ke watchlist

### 6. Watchlist

User dapat menyimpan movie atau series ke dalam watchlist.

Fitur watchlist menggunakan:

- `localStorage`
- `useSyncExternalStore`
- Custom event `watchlist-updated`

Data watchlist akan tetap tersimpan di browser selama data localStorage belum dihapus.

User juga dapat membuka halaman:

```bash
/watchlist
```

Pada halaman tersebut, user bisa melihat daftar tontonan yang sudah disimpan dan menghapus item dari watchlist.

### 7. Error Handling

Project ini memiliki handling error ketika data dari TMDB API gagal diambil. Jika token belum tersedia atau request gagal, aplikasi akan menampilkan pesan error yang sesuai.

### 8. Loading dan Not Found Page

Project juga menyediakan halaman:

- `loading.tsx` untuk tampilan loading
- `not-found.tsx` untuk halaman ketika data detail tidak ditemukan

## Struktur Folder

Berikut struktur folder utama pada project:

```bash
kino-stream/
├── app/
│   ├── movies/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── watchlist/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── animations/
│   ├── layout/
│   └── ui/
│
├── features/
│   └── movies/
│       └── components/
│           ├── DetailTontonan.tsx
│           ├── ErrorBox.tsx
│           ├── HeroSection.tsx
│           ├── HeroSectionSkeleton.tsx
│           ├── MovieCard.tsx
│           ├── MovieCardSkeleton.tsx
│           ├── MovieFilter.tsx
│           ├── MovieGrid.tsx
│           ├── MovieListSkeleton.tsx
│           ├── StatSection.tsx
│           ├── TrendingRow.tsx
│           └── WatchlistButton.tsx
│
├── hooks/
│   └── UseMovieFilter.ts
│
├── lib/
│
├── public/
│
├── services/
│   └── TmdbService.ts
│
├── store/
│   └── MovieFilterStore.ts
│
├── types/
│   ├── Filter.ts
│   └── Movie.ts
│
├── utils/
│
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Penjelasan Folder

### `app/`

Folder utama untuk routing Next.js App Router.

Beberapa route penting:

| Route            | Keterangan                            |
| ---------------- | ------------------------------------- |
| `/`              | Halaman utama daftar movie dan series |
| `/movies/[slug]` | Halaman detail movie atau series      |
| `/watchlist`     | Halaman daftar tontonan yang disimpan |

### `components/`

Berisi komponen umum yang dapat digunakan di berbagai halaman.

Contoh:

- Layout component
- UI component seperti Button dan Badge
- Animation wrapper

### `features/movies/components/`

Berisi komponen yang berhubungan langsung dengan fitur movie list.

Contoh:

- `HeroSection.tsx`
- `MovieGrid.tsx`
- `MovieCard.tsx`
- `MovieFilter.tsx`
- `TrendingRow.tsx`
- `DetailTontonan.tsx`
- `WatchlistButton.tsx`

### `hooks/`

Berisi custom hook.

Contoh:

```ts
UseMovieFilter.ts;
```

Hook ini digunakan untuk mengatur proses pencarian, filter tipe tontonan, dan sorting daftar movie/series.

### `services/`

Berisi logic untuk komunikasi dengan API eksternal.

File utama:

```bash
services/TmdbService.ts
```

File ini bertanggung jawab untuk:

- Mengambil data movie populer
- Mengambil data series populer
- Mengambil genre movie dan series
- Mengambil detail tambahan dari TMDB
- Mengambil cast atau pemeran
- Mengambil trailer
- Membuat slug
- Mengambil data berdasarkan slug

### `store/`

Berisi state awal atau konfigurasi sederhana untuk fitur tertentu.

Contoh:

```ts
MovieFilterStore.ts;
```

File ini menyimpan state awal filter:

```ts
{
  kataKunci: "",
  tipe: "all",
  urutan: "rating-tertinggi"
}
```

### `types/`

Berisi TypeScript type dan interface.

Contoh:

- `MovieItem`
- `TipeTontonan`
- `TmdbMovieResult`
- `TmdbTvResult`
- `TmdbCreditsResponse`
- `TmdbVideosResponse`
- `FilterMovieState`

### `utils/`

Berisi helper function untuk formatting data.

Contoh penggunaan:

- Format rating
- Format tipe tontonan
- Format genre
- Membuat URL gambar TMDB

## Instalasi Project

Ikuti langkah-langkah berikut untuk menjalankan project secara lokal menggunakan **Bun**.

### 1. Clone Repository

```bash
git clone https://github.com/igaramadana/kino-stream.git
```

### 2. Masuk ke Folder Project

```bash
cd kino-stream
```

### 3. Install Dependencies

Project ini menggunakan **Bun**, jadi install dependency dengan perintah berikut:

```bash
bun install
```

> Pastikan Bun sudah terinstall di perangkat kamu sebelum menjalankan perintah di atas.

## Konfigurasi Environment

Project ini membutuhkan token dari TMDB API.

Buat file `.env.local` di root project:

```bash
.env.local
```

Lalu isi dengan format berikut:

```env
TMDB_ACCESS_TOKEN=isi_token_tmdb_kamu_di_sini
```

Contoh:

```env
TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.xxxxx
```

> Catatan: Jangan upload file `.env.local` ke GitHub karena berisi token rahasia.

## Cara Mendapatkan TMDB Access Token

1. Buka website TMDB.
2. Login atau daftar akun TMDB.
3. Masuk ke menu Settings.
4. Pilih API.
5. Buat API Key.
6. Ambil bagian **API Read Access Token**.
7. Masukkan token tersebut ke file `.env.local`.

## Menjalankan Project

Jalankan development server menggunakan Bun:

```bash
bun dev
```

Setelah itu buka browser:

```bash
http://localhost:3000
```

## Script yang Tersedia

Berdasarkan konfigurasi `package.json`, project ini memiliki beberapa script:

| Script          | Fungsi                                     |
| --------------- | ------------------------------------------ |
| `bun dev`       | Menjalankan project dalam mode development |
| `bun run build` | Build project untuk production             |
| `bun start`     | Menjalankan hasil build production         |
| `bun run lint`  | Menjalankan pengecekan linting             |

## Alur Kerja Aplikasi

Secara umum, alur kerja aplikasi adalah sebagai berikut:

1. User membuka halaman utama.
2. `app/page.tsx` memanggil service untuk mengambil data movie dan series.
3. Service mengambil data dari TMDB API.
4. Data dari TMDB diproses menjadi format `MovieItem`.
5. Data ditampilkan ke beberapa section:
   - Hero section
   - Stat section
   - Trending row
   - Movie grid
6. User dapat melakukan pencarian, filter, dan sorting.
7. User dapat membuka halaman detail movie/series.
8. User dapat menyimpan tontonan ke watchlist.
9. Data watchlist disimpan di localStorage browser.
10. User dapat melihat daftar watchlist di halaman `/watchlist`.

## Data dari TMDB API

Project ini menggunakan beberapa endpoint TMDB, seperti:

```bash
/movie/popular
/tv/popular
/genre/movie/list
/genre/tv/list
/movie/{id}
/tv/{id}
/movie/{id}/credits
/tv/{id}/credits
/movie/{id}/videos
/tv/{id}/videos
```

Data dari API kemudian diubah menjadi format internal `MovieItem` agar lebih mudah digunakan oleh komponen UI.

Contoh struktur `MovieItem`:

```ts
export interface MovieItem {
  id: number;
  slug: string;
  tmdbId: number;
  judul: string;
  judulAsli: string;
  tipe: "movie" | "series";
  tahun: number;
  durasi: string;
  rating: number;
  usia: string;
  genre: string[];
  sutradara: string;
  pemeran: string[];
  bahasa: string;
  status: string;
  ringkasan: string;
  sinopsis: string;
  posterPath: string | null;
  backdropPath: string | null;
  trailerLabel: string;
  trailerUrl: string | null;
  studio: string[];
  trending: boolean;
}
```

## Fitur Filter

Filter pada project ini menggunakan custom hook:

```bash
hooks/UseMovieFilter.ts
```

Filter mendukung:

### Keyword Search

User dapat mencari berdasarkan:

- Judul
- Judul asli
- Genre
- Ringkasan

### Filter Tipe

User dapat memilih:

```ts
"all" | "movie" | "series";
```

### Sorting

User dapat mengurutkan data berdasarkan:

```ts
"rating-tertinggi";
"tahun-terbaru";
"judul-az";
```

## Fitur Watchlist

Fitur watchlist digunakan untuk menyimpan tontonan favorit user.

Data disimpan di localStorage dengan key:

```ts
gatrons - watchlist;
```

Saat user menekan tombol tambah ke watchlist, aplikasi akan:

1. Mengecek apakah item sudah tersimpan.
2. Jika belum, item akan ditambahkan.
3. Jika sudah, item akan dihapus.
4. Data disimpan ulang ke localStorage.
5. Event `watchlist-updated` dikirim agar UI ikut berubah.

## Halaman Watchlist

Halaman watchlist berada di:

```bash
app/watchlist/page.tsx
```

Pada halaman ini user dapat:

- Melihat daftar movie/series yang disimpan
- Menghapus item dari watchlist
- Kembali ke halaman utama jika watchlist masih kosong

## Build Production

Untuk membuat build production menggunakan Bun:

```bash
bun run build
```

Kemudian jalankan hasil build:

```bash
bun start
```

## Deployment

Project ini dapat dideploy ke Vercel.

Langkah umum deployment:

1. Push project ke GitHub.
2. Login ke Vercel.
3. Import repository.
4. Tambahkan environment variable:

```env
TMDB_ACCESS_TOKEN=isi_token_tmdb_kamu
```

5. Deploy project.

## Catatan Penting

Pastikan environment variable sudah diisi sebelum menjalankan project. Jika `TMDB_ACCESS_TOKEN` kosong, aplikasi tidak dapat mengambil data dari TMDB API.

Pastikan koneksi internet aktif karena data movie dan series diambil langsung dari API eksternal.

Pastikan menggunakan Bun agar perintah instalasi dan script sesuai dengan dokumentasi project ini.

## Pengembangan Selanjutnya

Beberapa fitur yang bisa ditambahkan ke depannya:

- Search langsung dari TMDB API
- Pagination atau infinite scroll
- Login user
- Watchlist berbasis database
- Review dan rating dari user
- Halaman kategori genre
- Filter berdasarkan tahun
- Filter berdasarkan rating
- Dark mode toggle
- Skeleton loading yang lebih detail
- Unit testing untuk service dan custom hook

## Author

Project dibuat oleh:

**Iga Ramadana Sahputra**

GitHub:  
https://github.com/igaramadana

## License

Project ini dibuat untuk kebutuhan pembelajaran dan technical test.  
Silakan gunakan, pelajari, dan kembangkan sesuai kebutuhan.
