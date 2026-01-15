'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Truck, 
  Shield, 
  CreditCard, 
  ArrowRight,
  Star,
  TrendingUp,
  Gift,
  ChevronRight
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Book3D = dynamic(() => import('@/components/3d/Book3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full" />
    </div>
  )
})

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Gratis Ongkir',
      description: 'Untuk pembelian di atas Rp 150.000'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Garansi Original',
      description: '100% buku original & berkualitas'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Pembayaran Aman',
      description: 'Berbagai metode pembayaran tersedia'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Reward Points',
      description: 'Kumpulkan poin setiap pembelian'
    }
  ]

  const categories = [
    { name: 'Novel', count: 250, icon: '📖', color: 'from-pink-500 to-rose-500' },
    { name: 'Pendidikan', count: 180, icon: '📚', color: 'from-blue-500 to-cyan-500' },
    { name: 'Bisnis', count: 120, icon: '💼', color: 'from-green-500 to-emerald-500' },
    { name: 'Teknologi', count: 95, icon: '💻', color: 'from-purple-500 to-violet-500' },
    { name: 'Anak-anak', count: 150, icon: '🧒', color: 'from-yellow-500 to-orange-500' },
    { name: 'Agama', count: 200, icon: '🕌', color: 'from-teal-500 to-cyan-500' },
  ]

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Pecinta Buku',
      image: 'https://via.placeholder.com/100',
      content: 'DadoRTX Books adalah toko buku online terbaik! Koleksi lengkap, pengiriman cepat, dan harga bersaing.',
      rating: 5
    },
    {
      name: 'Siti Rahayu',
      role: 'Mahasiswa',
      image: 'https://via.placeholder.com/100',
      content: 'Saya selalu membeli buku kuliah di sini. Kualitas terjamin dan banyak promo menarik.',
      rating: 5
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Pengusaha',
      image: 'https://via.placeholder.com/100',
      content: 'Koleksi buku bisnis sangat lengkap. Customer service responsif dan membantu.',
      rating: 5
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="py-12 lg:py-0"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Toko Buku Online #1 di Indonesia
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Temukan <span className="gradient-text">Dunia Baru</span> dalam Setiap Halaman
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="mt-6 text-lg text-gray-600 max-w-lg">
                Jelajahi ribuan koleksi buku berkualitas dari berbagai genre. Mulai dari novel, pendidikan, bisnis, hingga buku anak-anak dengan harga terbaik.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
                >
                  Jelajahi Buku
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Lihat Kategori
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <div className="text-sm text-gray-500">Judul Buku</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-3xl font-bold text-primary-600">50K+</div>
                  <div className="text-sm text-gray-500">Pelanggan</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-3xl font-bold text-primary-600">4.9</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Book */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Suspense fallback={
                <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
                  <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full" />
                </div>
              }>
                <Book3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-600 text-white rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">
              Jelajahi <span className="gradient-text">Kategori</span> Buku
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Temukan buku favorit Anda dari berbagai kategori yang tersedia
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={`/categories/${category.name.toLowerCase()}`}>
                  <div className={`relative p-6 bg-gradient-to-br ${category.color} rounded-2xl text-white overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-6xl opacity-20 transform translate-x-2 -translate-y-2">
                      {category.icon}
                    </div>
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-80">{category.count} buku</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              Lihat Semua Kategori
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
              Siap Menemukan Buku Impianmu?
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-primary-100 max-w-2xl mx-auto">
              Daftar sekarang dan dapatkan diskon 10% untuk pembelian pertama!
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Jelajahi Buku
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">
              Apa Kata <span className="gradient-text">Pelanggan</span> Kami
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-600">
              Ribuan pelanggan telah mempercayai DadoRTX Books
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Berlangganan Newsletter
            </h2>
            <p className="mt-4 text-gray-600">
              Dapatkan info buku terbaru dan promo menarik langsung ke email Anda
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
