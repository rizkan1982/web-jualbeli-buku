'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
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
            <Shield className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Kebijakan Privasi</h1>
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
          <h2>1. Pendahuluan</h2>
          <p>
            BookStore (&quot;kami&quot;, &quot;kita&quot;, atau &quot;perusahaan&quot;) berkomitmen untuk melindungi privasi Anda. 
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, 
            dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
          </p>

          <h2>2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan beberapa jenis informasi, termasuk:</p>
          <ul>
            <li><strong>Informasi Akun:</strong> Nama, alamat email, kata sandi terenkripsi, dan foto profil.</li>
            <li><strong>Informasi Transaksi:</strong> Riwayat pembelian, alamat pengiriman, dan informasi pembayaran.</li>
            <li><strong>Informasi Penggunaan:</strong> Data tentang bagaimana Anda menggunakan layanan kami, termasuk halaman yang dikunjungi dan waktu akses.</li>
            <li><strong>Informasi Perangkat:</strong> Jenis perangkat, sistem operasi, dan browser yang Anda gunakan.</li>
          </ul>

          <h2>3. Penggunaan Informasi</h2>
          <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
          <ul>
            <li>Memproses dan mengirimkan pesanan Anda</li>
            <li>Mengelola akun dan memberikan layanan pelanggan</li>
            <li>Mengirimkan pembaruan tentang pesanan dan promosi</li>
            <li>Meningkatkan layanan dan pengalaman pengguna</li>
            <li>Mencegah penipuan dan aktivitas ilegal</li>
          </ul>

          <h2>4. Berbagi Informasi</h2>
          <p>Kami tidak menjual informasi pribadi Anda. Kami mungkin berbagi informasi dengan:</p>
          <ul>
            <li><strong>Penyedia Layanan:</strong> Mitra pengiriman dan pembayaran untuk memproses pesanan</li>
            <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum atau proses hukum</li>
            <li><strong>Perlindungan:</strong> Untuk melindungi hak dan keamanan kami atau pengguna lain</li>
          </ul>

          <h2>5. Keamanan Data</h2>
          <p>
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk 
            melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.
          </p>
          <ul>
            <li>Enkripsi SSL/TLS untuk transmisi data</li>
            <li>Enkripsi password dengan bcrypt</li>
            <li>Pembatasan akses ke data sensitif</li>
            <li>Pemantauan keamanan rutin</li>
          </ul>

          <h2>6. Cookie dan Teknologi Pelacakan</h2>
          <p>
            Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman Anda. 
            Cookie membantu kami mengingat preferensi Anda dan memahami bagaimana Anda menggunakan layanan kami.
          </p>

          <h2>7. Hak Anda</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses dan memperoleh salinan data pribadi Anda</li>
            <li>Memperbarui atau memperbaiki informasi yang tidak akurat</li>
            <li>Meminta penghapusan data pribadi Anda</li>
            <li>Menolak pemrosesan data untuk tujuan pemasaran</li>
            <li>Menarik persetujuan yang telah diberikan</li>
          </ul>

          <h2>8. Penyimpanan Data</h2>
          <p>
            Kami menyimpan informasi pribadi Anda selama diperlukan untuk tujuan yang dijelaskan 
            dalam kebijakan ini, kecuali periode penyimpanan lebih lama diperlukan atau diizinkan oleh hukum.
          </p>

          <h2>9. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan 
            akan diberitahukan melalui email atau pemberitahuan di platform kami.
          </p>

          <h2>10. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:
          </p>
          <ul>
            <li>Email: privacy@dadortx.id</li>
            <li>Telepon: +62 21 1234 5678</li>
            <li>Alamat: Jl. Buku Sejahtera No. 123, Jakarta Selatan, Indonesia 12345</li>
          </ul>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
