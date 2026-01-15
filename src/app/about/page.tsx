'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Truck, Shield, Heart, Target, Eye } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  const stats = [
    { value: '10K+', label: 'Judul Buku', icon: BookOpen },
    { value: '50K+', label: 'Pelanggan Puas', icon: Users },
    { value: '99%', label: 'Kepuasan', icon: Award },
    { value: '24/7', label: 'Layanan', icon: Heart },
  ]

  const values = [
    {
      icon: Target,
      title: 'Misi Kami',
      description: 'Menyediakan akses mudah ke berbagai buku berkualitas dengan harga terjangkau untuk seluruh masyarakat Indonesia.',
    },
    {
      icon: Eye,
      title: 'Visi Kami',
      description: 'Menjadi toko buku online terdepan yang menginspirasi dan mencerdaskan bangsa melalui literasi.',
    },
    {
      icon: Shield,
      title: 'Komitmen Kualitas',
      description: 'Kami hanya menjual buku original dan berkualitas. Setiap buku dijamin keasliannya.',
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Bekerja sama dengan ekspedisi terpercaya untuk memastikan buku sampai dengan aman dan tepat waktu.',
    },
  ]

  const team = [
    {
      name: 'Ahmad Wijaya',
      role: 'Founder & CEO',
      image: 'https://via.placeholder.com/200',
      description: 'Pecinta buku dengan pengalaman 15 tahun di industri penerbitan.',
    },
    {
      name: 'Siti Rahayu',
      role: 'Head of Operations',
      image: 'https://via.placeholder.com/200',
      description: 'Ahli logistik yang memastikan pengiriman berjalan lancar.',
    },
    {
      name: 'Budi Santoso',
      role: 'Customer Relations',
      image: 'https://via.placeholder.com/200',
      description: 'Dedikasi penuh untuk kepuasan pelanggan.',
    },
    {
      name: 'Dewi Lestari',
      role: 'Content Curator',
      image: 'https://via.placeholder.com/200',
      description: 'Kurator buku yang memilih koleksi terbaik untuk Anda.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang DadoRTX Books</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Lebih dari sekadar toko buku online. Kami adalah komunitas pembaca yang berkomitmen 
              untuk menyebarkan literasi dan kecintaan membaca di seluruh Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-xl text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  DadoRTX Books didirikan pada tahun 2020 dengan satu tujuan sederhana: membuat buku 
                  berkualitas dapat diakses oleh semua orang. Berawal dari sebuah garasi kecil 
                  dengan koleksi 100 buku, kini kami telah berkembang menjadi salah satu toko 
                  buku online terbesar di Indonesia.
                </p>
                <p>
                  Kami percaya bahwa setiap buku memiliki kekuatan untuk mengubah hidup seseorang. 
                  Itulah mengapa kami berkomitmen untuk menyediakan koleksi buku terlengkap dengan 
                  harga yang terjangkau.
                </p>
                <p>
                  Dengan lebih dari 10.000 judul buku dan 50.000 pelanggan puas, kami terus 
                  berusaha memberikan pengalaman belanja buku online terbaik untuk Anda.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center">
                <div className="text-9xl opacity-50">📚</div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Tahun</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Orang-orang di balik DadoRTX Books yang bekerja keras untuk memberikan pengalaman terbaik
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap untuk Mulai Membaca?
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pembaca lainnya dan temukan buku favorit Anda hari ini.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/books"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Jelajahi Buku
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-colors border-2 border-white/30"
              >
                Daftar Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
