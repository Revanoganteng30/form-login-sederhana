# Form Login Sederhana

Contoh aplikasi login **Ruang** menggunakan HTML, CSS, dan JavaScript murni. Tidak memerlukan npm, dependensi tambahan, database, atau proses build.

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

Tombol **Isi akun demo** mengisi kedua kolom. Tekan **Masuk** untuk membuka tampilan berhasil, lalu **Keluar dari demo** untuk kembali ke formulir.

## Fitur

- Tampilan responsif untuk desktop dan ponsel.
- Validasi kolom wajib dan format email.
- Pesan kesalahan untuk akun yang tidak cocok.
- Tombol tampilkan/sembunyikan kata sandi.
- Label formulir, navigasi keyboard, dan pengumuman status untuk pembaca layar.
- Tampilan login berhasil dan tombol keluar.
- Seluruh aset disertakan di repositori; tanpa font, CDN, atau layanan eksternal.

## Batasan demo

Pengecekan akun dilakukan di browser dengan akun contoh publik. Ini adalah bahan belajar antarmuka, bukan autentikasi produksi. Tidak ada akun yang dibuat, kredensial yang dikirim, atau sesi yang disimpan. Memuat ulang halaman akan kembali ke formulir login. Gunakan akun contoh saat mencoba demo.

Untuk autentikasi sungguhan, diperlukan backend atau penyedia autentikasi yang memverifikasi kredensial dan mengelola sesi di server.

## Pemeriksaan

Pemeriksaan sintaks JavaScript:

```sh
node --check app.js
```

Setelah server berjalan, periksa di browser:

1. Kirim formulir kosong: pesan kesalahan muncul dan fokus berpindah ke email.
2. Masukkan email tidak valid: muncul pesan format email.
3. Gunakan email valid dan kata sandi salah: login ditolak.
4. Ubah visibilitas kata sandi: tipe kolom dan label tombol berubah.
5. Isi akun demo dan masuk: tampil pesan berhasil dan email akun demo.
6. Keluar: kolom dibersihkan dan formulir dapat digunakan kembali.
7. Ulangi pada layar ponsel dan gunakan keyboard untuk berpindah antar kontrol.

## Struktur

```text
index.html   Halaman login dan tampilan berhasil
styles.css   Tampilan dan tata letak responsif
app.js       Validasi dan interaksi demo
favicon.svg  Ikon aplikasi
```
