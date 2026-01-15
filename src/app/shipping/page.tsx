'use client'

import { motion } from 'framer-motion'
import { Truck, Package, Clock, MapPin, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: 'Reguler',
      duration: '2-3 hari kerja',
      price: 'Gratis untuk pesanan di atas Rp 150.000',
      description: 'Pengiriman standar dengan tracking',
    },
    {
      name: 'Express',
      duration: '1-2 hari kerja',
      price: 'Mulai dari Rp 15.000',
      description: 'Pengiriman cepat untuk kebutuhan mendesak',
    },
    {
      name: 'Same Day',
      duration: 'Hari yang sama',
      price: 'Mulai dari Rp 25.000',
      description: 'Tersedia untuk area tertentu, pesan sebelum pukul 12.00',
    },
  ]

  const trackingSteps = [
    { title: 'Pesanan Dibuat', description: 'Pesanan Anda telah kami terima' },
    { title: 'Diproses', description: 'Pesanan sedang dikemas dengan hati-hati' },
    { title: 'Dikirim', description: 'Pesanan dalam perjalanan ke alamat Anda' },
    { title: 'Diterima', description: 'Pesanan telah sampai di tujuan' },
  ]

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
            <Truck className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Informasi Pengiriman</h1>
            <p className="mt-3 text-primary-100 max-w-2xl mx-auto">
              Pelajari tentang opsi pengiriman dan cara melacak pesanan Anda
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Shipping Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Metode Pengiriman
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{method.duration}</span>
                </div>
                <p className="text-primary-600 font-medium mb-3">{method.price}</p>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coverage Area */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Area Pengiriman</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Kami melayani pengiriman ke seluruh wilayah Indonesia, dari Sabang sampai Merauke.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">Pulau Jawa</h4>
                <p className="text-sm text-gray-500">2-3 hari kerja</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">Sumatera</h4>
                <p className="text-sm text-gray-500">3-5 hari kerja</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">Kalimantan & Sulawesi</h4>
                <p className="text-sm text-gray-500">4-6 hari kerja</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">Papua & Maluku</h4>
                <p className="text-sm text-gray-500">5-7 hari kerja</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tracking Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Lacak Pesanan Anda
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />
              <div className="space-y-8">
                {trackingSteps.map((step, index) => (
                  <div key={step.title} className="relative flex gap-6">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-2xl text-center text-white">
            <h3 className="text-xl font-bold mb-4">Ada Pertanyaan?</h3>
            <p className="text-primary-100 mb-6">
              Kunjungi halaman FAQ kami untuk informasi lebih lanjut tentang pengiriman
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Lihat FAQ
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  )
}
