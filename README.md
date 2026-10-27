# 🎂 Birthday Surprise untuk Nurul Hidayah 💛

Website ucapan ulang tahun (HTML + CSS + JavaScript murni, tanpa backend).

## Struktur
```
birthday-nurul/
├── index.html      ← struktur & teks ucapan
├── style.css       ← desain, warna tema (variabel di bagian atas)
├── script.js       ← interaksi, galeri, musik (bagian CONFIG di atas)
├── assets/
│   ├── images/     ← taruh foto di sini
│   └── audio/      ← taruh file musik di sini
└── README.md
```

## Yang perlu kamu ubah
| Apa | Di mana |
|---|---|
| Nama, teks ucapan, isi surat, footer | `index.html` (cari komentar `UBAH`) |
| Warna tema | `style.css` bagian `:root` |
| Foto & caption | `script.js` → `GALLERY`, file foto ke `assets/images/` |
| Musik | taruh file bernama `soulmate.mp3` di `assets/audio/`, atau ubah `CONFIG.audio` di `script.js` |
| Judul tab | `<title>` di `index.html` |

**Soal musik:** gunakan hanya file audio yang kamu miliki secara sah / berlisensi. Jika file belum ada, website tetap jalan dan menampilkan pesan kecil saat tombol play ditekan.
Tips: simpan file < 10 MB agar cepat dimuat (batas file GitHub 100 MB).

## Cek lokal
Buka `index.html` langsung di browser (klik dua kali), atau pakai ekstensi Live Server di VS Code.

## Publikasi lewat GitHub Pages
1. Login ke [github.com](https://github.com) → klik **+** → **New repository**.
2. Isi nama `birthday-nurul hidayah` (GitHub otomatis mengubah spasi jadi `birthday-nurul-hidayah`), pilih **Public**, klik **Create repository**.
3. Klik **uploading an existing file**, lalu seret **isi** folder `birthday-nurul` (`index.html`, `style.css`, `script.js`, folder `assets`, `README.md`). Pastikan `index.html` ada di root, bukan di dalam subfolder. Klik **Commit changes**.
4. Buka **Settings → Pages**.
5. Di **Build and deployment** → Source: **Deploy from a branch**; Branch: **main**; Folder: **/ (root)**; klik **Save**.
6. Tunggu 1–3 menit, refresh halaman Pages. Tautan publik muncul:
   `https://USERNAME.github.io/birthday-nurul-hidayah/`
7. (Opsional) Setelah online, aktifkan baris `og:image` di `index.html` dengan URL foto absolut agar tautan punya preview gambar saat dibagikan.

## Memperbarui website
- **Lewat web:** buka repository → klik file → ikon pensil ✏️ → edit → **Commit changes**. Untuk foto/musik baru: **Add file → Upload files** ke folder `assets/...`.
- **Lewat Git:**
  ```bash
  git add .
  git commit -m "update"
  git push
  ```
Perubahan tampil sekitar 1–2 menit kemudian (coba hard refresh `Ctrl+Shift+R`).
