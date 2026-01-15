'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FileText className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Syarat & Ketentuan</h1>
            <p className="mt-3 text-primary-100">
              Terakhir diperbarui: 15 Januari 2026
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 prose prose-primary max-w-none"
        >
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan layanan DadoRTX Books, Anda menyetujui untuk terikat 
            dengan Syarat & Ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon 
            untuk tidak menggunakan layanan kami.
          </p>

          <h2>2. Definisi</h2>
          <ul>
            <li><strong>&quot;Layanan&quot;</strong> mengacu pada website, aplikasi, dan seluruh fitur BookStore</li>
            <li><strong>&quot;Pengguna&quot;</strong> adalah setiap orang yang mengakses atau menggunakan Layanan</li>
            <li><strong>&quot;Produk&quot;</strong> adalah buku dan barang lain yang dijual melalui Layanan</li>
            <li><strong>&quot;Akun&quot;</strong> adalah akun terdaftar yang dibuat oleh Pengguna</li>
          </ul>

          <h2>3. Akun Pengguna</h2>
          <h3>3.1 Pendaftaran</h3>
          <p>
            Untuk menggunakan fitur tertentu, Anda harus membuat akun dengan memberikan 
            informasi yang akurat dan lengkap. Anda bertanggung jawab untuk menjaga 
            kerahasiaan kredensial akun Anda.
          </p>
          <h3>3.2 Keamanan Akun</h3>
          <p>
            Anda bertanggung jawab atas semua aktivitas yang terjadi di akun Anda. 
            Segera beritahu kami jika ada akses tidak sah.
          </p>

          <h2>4. Pemesanan dan Pembayaran</h2>
          <h3>4.1 Pemesanan</h3>
          <p>
            Dengan melakukan pemesanan, Anda mengajukan penawaran untuk membeli Produk. 
            Kami berhak menolak atau membatalkan pesanan dengan alasan apapun.
          </p>
          <h3>4.2 Harga</h3>
          <p>
            Semua harga ditampilkan dalam Rupiah Indonesia (IDR) dan sudah termasuk pajak 
            yang berlaku. Harga dapat berubah tanpa pemberitahuan sebelumnya.
          </p>
          <h3>4.3 Pembayaran</h3>
          <p>
            Pembayaran harus dilakukan melalui metode yang tersedia. Pesanan diproses 
            setelah pembayaran dikonfirmasi.
          </p>

          <h2>5. Pengiriman</h2>
          <h3>5.1 Waktu Pengiriman</h3>
          <p>
            Estimasi waktu pengiriman bersifat perkiraan dan tidak dijamin. Keterlambatan 
            dapat terjadi karena berbagai faktor di luar kendali kami.
          </p>
          <h3>5.2 Risiko</h3>
          <p>
            Risiko kehilangan atau kerusakan berpindah kepada Anda setelah Produk diserahkan 
            kepada kurir pengiriman.
          </p>

          <h2>6. Pengembalian dan Refund</h2>
          <h3>6.1 Kondisi Pengembalian</h3>
          <p>Pengembalian diterima jika:</p>
          <ul>
            <li>Produk rusak atau cacat saat diterima</li>
            <li>Produk tidak sesuai dengan pesanan</li>
            <li>Pengajuan dilakukan dalam 7 hari setelah penerimaan</li>
          </ul>
          <h3>6.2 Proses Refund</h3>
          <p>
            Refund akan diproses dalam 5-7 hari kerja setelah pengembalian disetujui 
            dan Produk diterima kembali oleh kami.
          </p>

          <h2>7. Kekayaan Intelektual</h2>
          <p>
            Semua konten di Layanan, termasuk teks, gambar, logo, dan desain, adalah 
            milik DadoRTX Books atau pemberi lisensi kami dan dilindungi oleh hukum kekayaan intelektual.
          </p>

          <h2>8. Larangan Penggunaan</h2>
          <p>Anda dilarang untuk:</p>
          <ul>
            <li>Menggunakan Layanan untuk tujuan ilegal</li>
            <li>Mencoba mengakses sistem tanpa otorisasi</li>
            <li>Menyebarkan virus atau kode berbahaya</li>
            <li>Melakukan scraping atau pengumpulan data otomatis</li>
            <li>Menggunakan akun palsu atau informasi menyesatkan</li>
          </ul>

          <h2>9. Batasan Tanggung Jawab</h2>
          <p>
            Dalam batas yang diizinkan hukum, DadoRTX Books tidak bertanggung jawab atas 
            kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari 
            penggunaan Layanan.
          </p>

          <h2>10. Perubahan Syarat</h2>
          <p>
            Kami berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan berlaku 
            segera setelah dipublikasikan. Penggunaan berkelanjutan atas Layanan 
            dianggap sebagai penerimaan perubahan tersebut.
          </p>

          <h2>11. Hukum yang Berlaku</h2>
          <p>
            Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum 
            Republik Indonesia. Sengketa akan diselesaikan melalui pengadilan yang 
            berwenang di Jakarta, Indonesia.
          </p>

          <h2>12. Hubungi Kami</h2>
          <p>
            Untuk pertanyaan tentang Syarat & Ketentuan ini, hubungi:
          </p>
          <ul>
            <li>Email: legal@dadortx.id</li>
            <li>Telepon: +62 21 1234 5678</li>
          </ul>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
