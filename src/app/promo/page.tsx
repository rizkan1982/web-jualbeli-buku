'use client'

import { motion } from 'framer-motion'
import { Tag, Percent, Gift } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PromoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Tag className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Promo Spesial</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Jangan lewatkan penawaran menarik dan diskon spesial dari DadoRTX Books
            </p>
          </motion.div>
        </div>
      </div>

      {/* Promo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Promos */}
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Percent className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Promo Sedang Dipersiapkan
            </h2>
            <p className="text-gray-600 mb-8">
              Kami sedang menyiapkan promo menarik untuk Anda. Pantau terus halaman ini untuk mendapatkan penawaran terbaik!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/books"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                <Gift className="w-5 h-5" />
                Jelajahi Buku
              </Link>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
              >
                Lihat Buku Baru
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tips Mendapatkan Promo Terbaik
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Aktifkan Notifikasi</h4>
              <p className="text-gray-600 text-sm">
                Dapatkan pemberitahuan langsung saat ada promo baru
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cek Rutin</h4>
              <p className="text-gray-600 text-sm">
                Kunjungi halaman promo secara berkala untuk info terbaru
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Beli Lebih Hemat</h4>
              <p className="text-gray-600 text-sm">
                Manfaatkan promo bundling untuk menghemat lebih banyak
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
