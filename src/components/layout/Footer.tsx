import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-xl font-bold">DadoRTX Books</span>
            </Link>
            <p className="text-primary-200 mb-4">
              DadoRTX Books - Toko buku online terpercaya dengan koleksi lengkap dan harga terbaik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-primary-200 hover:text-white transition-colors">
                  Katalog Buku
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-primary-200 hover:text-white transition-colors">
                  Kategori
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-primary-200 hover:text-white transition-colors">
                  Buku Terlaris
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-primary-200 hover:text-white transition-colors">
                  Buku Baru
                </Link>
              </li>
              <li>
                <Link href="/promo" className="text-primary-200 hover:text-white transition-colors">
                  Promo
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan Pelanggan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-primary-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-200 hover:text-white transition-colors">
                  Informasi Pengiriman
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-primary-200 hover:text-white transition-colors">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-200 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-200 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                <span className="text-primary-200">
                  Jl. Abulyatama No.5, Batam Kota, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-300 flex-shrink-0" />
                <span className="text-primary-200">081945330179</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-300 flex-shrink-0" />
                <span className="text-primary-200">support@dadortx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-primary-300 text-sm">
              © 2026 DadoRTX Books. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
