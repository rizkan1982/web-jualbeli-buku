'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ReturnsPage() {
  const returnReasons = [
    {
      icon: Package,
      title: 'Buku Rusak',
      description: 'Buku yang diterima dalam kondisi rusak atau cacat produksi',
    },
    {
      icon: AlertCircle,
      title: 'Salah Kirim',
      description: 'Buku yang diterima tidak sesuai dengan yang dipesan',
    },
    {
      icon: Package,
      title: 'Halaman Hilang',
      description: 'Buku memiliki halaman yang hilang atau tidak lengkap',
    },
  ]

  const returnSteps = [
    {
      step: 1,
      title: 'Ajukan Pengembalian',
      description: 'Hubungi customer service dalam 7 hari setelah penerimaan',
    },
    {
      step: 2,
      title: 'Verifikasi',
      description: 'Tim kami akan memverifikasi kondisi produk melalui foto',
    },
    {
      step: 3,
      title: 'Kirim Kembali',
      description: 'Kirimkan produk ke alamat yang kami berikan',
    },
    {
      step: 4,
      title: 'Refund',
      description: 'Dana dikembalikan dalam 5-7 hari kerja setelah produk diterima',
    },
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
            <RotateCcw className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Kebijakan Pengembalian</h1>
            <p className="mt-3 text-primary-100 max-w-2xl mx-auto">
              Kami berkomitmen untuk kepuasan Anda. Pelajari cara mengembalikan produk.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Return Reasons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Alasan Pengembalian yang Diterima
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {returnReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-500">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Return Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Proses Pengembalian
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-4 gap-8">
              {returnSteps.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  {index < returnSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                  )}
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Important Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Catatan Penting</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Pengajuan pengembalian harus dilakukan dalam 7 hari setelah penerimaan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Produk harus dalam kondisi seperti saat diterima (beserta kemasan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Ongkos kirim pengembalian ditanggung pembeli kecuali kesalahan dari kami</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span>Pengembalian tidak berlaku untuk buku digital atau e-book</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-2xl text-center text-white">
            <h3 className="text-xl font-bold mb-4">Butuh Bantuan?</h3>
            <p className="text-primary-100 mb-6">
              Tim customer service kami siap membantu proses pengembalian Anda
            </p>
            <a
              href="mailto:returns@dadortx.id"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  )
}
