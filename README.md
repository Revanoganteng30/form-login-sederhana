# Form Login Sederhana

Contoh aplikasi login dan dashboard **Ruang** menggunakan HTML, CSS, dan JavaScript murni. Tidak memerlukan npm, dependensi tambahan, database, atau proses build.

## Menjalankan

Prasyarat: Python 3 untuk server pengembangan lokal.

```sh
cd /workspace/form-login-sederhana
python3 -m http.server 8000 --bind 127.0.0.1
```

Untuk penggunaan di komputer sendiri, jalankan perintah Python dari folder repositori. Buka alamat server di browser lokal. Hentikan server dengan `Ctrl+C`. Berkas juga dapat dibuka langsung melalui `index.html`.

## Akun demo

| Kolom | Nilai |
| --- | --- |
| Email | `demo@example.com` |
| Kata sandi | `Demo123!` |

Tombol **Isi akun demo** mengisi kedua kolom. Tekan **Masuk** untuk membuka dashboard, lalu **Keluar** untuk mengakhiri sesi demo dan kembali ke formulir.

## Fitur

- Tampilan responsif untuk desktop dan ponsel.
- Validasi kolom wajib dan format email.
- Pesan kesalahan untuk akun yang tidak cocok.
- Tombol tampilkan/sembunyikan kata sandi.
- Label formulir, navigasi keyboard, dan pengumuman status untuk pembaca layar.
- Dashboard dengan warna hijau, aksen limau, dan tata letak senada dengan login.
- Ringkasan total tugas, tugas selesai, tugas tersisa, dan persentase progres yang diperbarui otomatis.
- Tambah, centang, batalkan penyelesaian, hapus, dan filter tugas (semua, belum selesai, selesai).
- Daftar tugas tersimpan di browser ini, termasuk setelah keluar dan masuk kembali.
- Sesi demo per tab, pengalihan ke dashboard setelah masuk, dan tombol keluar.
- Seluruh aset disertakan di repositori; tanpa font, CDN, atau layanan eksternal.

## Batasan demo

Pengecekan akun dilakukan di browser dengan akun contoh publik. Ini adalah bahan belajar antarmuka, bukan autentikasi produksi. Tidak ada akun yang dibuat atau kredensial yang dikirim. Penanda sesi demo disimpan di `sessionStorage`, tanpa email atau kata sandi; memuat ulang halaman mempertahankan dashboard di tab yang sama. Membuka dashboard tanpa sesi mengembalikan pengguna ke login. Tombol **Keluar** menghapus penanda sesi. Pengalihan ini hanya untuk alur demo dan tidak melindungi data di server. Gunakan akun contoh saat mencoba demo.

Daftar tugas disimpan di `localStorage` pada browser dan asal situs yang sama, bukan akun di server. Kunjungan pertama menampilkan lima tugas contoh. Setelah semua dihapus, daftar tetap kosong saat dimuat ulang. Keluar tidak menghapus tugas. Hapus data situs untuk mengembalikan tugas contoh. Hindari memasukkan informasi sensitif. Jika penyimpanan tugas tidak tersedia, dashboard tetap dapat dipakai dengan pemberitahuan bahwa perubahan hanya bertahan selama halaman terbuka. Login memerlukan `sessionStorage` yang aktif. Untuk perilaku penyimpanan yang konsisten, gunakan server lokal seperti perintah di atas.

Untuk autentikasi sungguhan, diperlukan backend atau penyedia autentikasi yang memverifikasi kredensial dan mengelola sesi di server.

## Pemeriksaan

Pemeriksaan sintaks JavaScript:

```sh
node --check app.js
node --check session.js
node --check dashboard.js
```

Setelah server berjalan, periksa di browser:

1. Kirim formulir kosong: pesan kesalahan muncul dan fokus berpindah ke email.
2. Masukkan email tidak valid: muncul pesan format email.
3. Gunakan email valid dan kata sandi salah: login ditolak.
4. Ubah visibilitas kata sandi: tipe kolom dan label tombol berubah.
5. Buka `dashboard.html` tanpa masuk: kembali ke login. Isi akun demo dan masuk: dashboard dan email akun demo tampil.
6. Centang dan batalkan penyelesaian tugas: jumlah selesai, tersisa, dan progres ikut berubah. Coba semua filter.
7. Tambah tugas, termasuk teks yang memuat `<` dan `>`: tampil sebagai teks biasa. Tugas kosong ditolak. Hapus tugas dan pastikan ringkasan ikut berubah.
8. Muat ulang dashboard: sesi dan tugas dipertahankan. Hapus semua tugas: progres 0% dan pesan daftar kosong tampil, termasuk setelah dimuat ulang.
9. Keluar: kembali ke formulir dengan kolom kosong. Buka kembali dashboard tanpa masuk: kembali ke login. Masuk kembali: tugas yang tersimpan tetap ada.
10. Ulangi pada layar ponsel dan gunakan keyboard untuk berpindah antar kontrol, mencentang tugas, serta mengganti filter.

## Struktur

```text
index.html      Halaman login
dashboard.html  Halaman ringkasan dan daftar tugas
styles.css      Gaya dasar dan halaman login
dashboard.css   Tampilan dashboard responsif
app.js          Validasi login dan pengalihan ke dashboard
session.js      Penanda sesi demo per tab
dashboard.js    Interaksi tugas, penyimpanan, ringkasan, dan keluar
favicon.svg     Ikon aplikasi
```
