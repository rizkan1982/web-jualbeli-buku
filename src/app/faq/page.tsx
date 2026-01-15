'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle, ShoppingCart, Truck, CreditCard, RotateCcw, User } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  icon: React.ElementType
  faqs: FAQItem[]
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const faqCategories: FAQCategory[] = [
    {
      title: 'Pemesanan',
      icon: ShoppingCart,
      faqs: [
        {
          question: 'Bagaimana cara memesan buku?',
          answer: 'Untuk memesan buku, pilih buku yang Anda inginkan, klik tombol "Tambah ke Keranjang", lalu lanjutkan ke halaman checkout. Isi data pengiriman dan pilih metode pembayaran, kemudian konfirmasi pesanan Anda.',
        },
        {
          question: 'Apakah saya harus membuat akun untuk memesan?',
          answer: 'Ya, Anda perlu membuat akun atau login terlebih dahulu untuk dapat memesan buku. Hal ini untuk memudahkan pelacakan pesanan dan riwayat pembelian Anda.',
        },
        {
          question: 'Bagaimana cara melihat status pesanan saya?',
          answer: 'Anda dapat melihat status pesanan di halaman "Pesanan Saya" yang dapat diakses melalui menu profil. Di sana Anda bisa melihat detail dan melacak setiap pesanan.',
        },
        {
          question: 'Apakah saya bisa membatalkan pesanan?',
          answer: 'Pesanan dapat dibatalkan selama statusnya masih "Menunggu Pembayaran" atau "Sedang Diproses". Hubungi customer service kami untuk bantuan pembatalan.',
        },
      ],
    },
    {
      title: 'Pengiriman',
      icon: Truck,
      faqs: [
        {
          question: 'Berapa lama waktu pengiriman?',
          answer: 'Waktu pengiriman reguler adalah 2-3 hari kerja untuk wilayah Jawa, dan 4-7 hari kerja untuk luar Jawa. Waktu dapat bervariasi tergantung lokasi.',
        },
        {
          question: 'Apakah ada ongkos kirim?',
          answer: 'Untuk pembelian di atas Rp 150.000, Anda mendapatkan gratis ongkos kirim. Untuk pembelian di bawah itu, ongkos kirim dihitung berdasarkan berat dan lokasi tujuan.',
        },
        {
          question: 'Bagaimana cara melacak pengiriman?',
          answer: 'Setelah pesanan dikirim, Anda akan menerima nomor resi yang dapat digunakan untuk melacak paket. Nomor resi juga tersedia di halaman detail pesanan.',
        },
        {
          question: 'Apakah bisa pengiriman ke luar negeri?',
          answer: 'Saat ini kami hanya melayani pengiriman ke seluruh wilayah Indonesia. Untuk pengiriman internasional, silakan hubungi customer service.',
        },
      ],
    },
    {
      title: 'Pembayaran',
      icon: CreditCard,
      faqs: [
        {
          question: 'Metode pembayaran apa saja yang tersedia?',
          answer: 'Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (OVO, GoPay, DANA, ShopeePay), dan Bayar di Tempat (COD).',
        },
        {
          question: 'Apakah pembayaran aman?',
          answer: 'Ya, semua transaksi pembayaran di platform kami dilindungi dengan enkripsi SSL dan kami bekerja sama dengan payment gateway terpercaya.',
        },
        {
          question: 'Bagaimana jika pembayaran gagal?',
          answer: 'Jika pembayaran gagal, Anda bisa mencoba kembali atau memilih metode pembayaran lain. Jika dana sudah terpotong namun pesanan tidak berhasil, hubungi customer service kami.',
        },
        {
          question: 'Kapan batas waktu pembayaran?',
          answer: 'Batas waktu pembayaran adalah 24 jam setelah pesanan dibuat. Jika melebihi waktu tersebut, pesanan akan otomatis dibatalkan.',
        },
      ],
    },
    {
      title: 'Pengembalian & Refund',
      icon: RotateCcw,
      faqs: [
        {
          question: 'Apakah bisa mengembalikan buku?',
          answer: 'Pengembalian buku hanya dapat dilakukan jika buku yang diterima dalam kondisi rusak atau tidak sesuai pesanan. Pengajuan pengembalian harus dilakukan dalam 7 hari setelah penerimaan.',
        },
        {
          question: 'Bagaimana proses refund?',
          answer: 'Setelah pengajuan pengembalian disetujui dan buku diterima kembali oleh kami, refund akan diproses dalam 5-7 hari kerja ke metode pembayaran awal.',
        },
        {
          question: 'Apakah ongkos kirim pengembalian ditanggung?',
          answer: 'Untuk pengembalian karena kesalahan kami (buku rusak atau salah kirim), ongkos kirim pengembalian akan kami tanggung. Untuk alasan lain, ongkos kirim ditanggung pembeli.',
        },
      ],
    },
    {
      title: 'Akun & Keamanan',
      icon: User,
      faqs: [
        {
          question: 'Bagaimana cara mengubah password?',
          answer: 'Anda dapat mengubah password melalui halaman Profil > Pengaturan > Password. Masukkan password lama dan password baru untuk mengubahnya.',
        },
        {
          question: 'Bagaimana jika lupa password?',
          answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirimkan ke email Anda untuk reset password.',
        },
        {
          question: 'Apakah data saya aman?',
          answer: 'Ya, kami menjaga keamanan data pribadi Anda sesuai dengan kebijakan privasi. Data Anda dienkripsi dan tidak akan dibagikan ke pihak ketiga tanpa izin.',
        },
      ],
    },
  ]

  const allFaqs = faqCategories.flatMap((cat, catIndex) =>
    cat.faqs.map((faq, faqIndex) => ({
      ...faq,
      category: cat.title,
      id: `${catIndex}-${faqIndex}`,
    }))
  )

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <HelpCircle className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Pusat Bantuan</h1>
            <p className="mt-3 text-primary-100 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari pertanyaan..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Results */}
        {filteredFaqs ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Ditemukan {filteredFaqs.length} hasil untuk &quot;{searchQuery}&quot;
            </p>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <div>
                      <span className="text-xs text-primary-600 font-medium">{faq.category}</span>
                      <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openIndex === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada hasil yang ditemukan</p>
              </div>
            )}
          </div>
        ) : (
          /* Categories */
          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                </div>

                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const id = `${catIndex}-${faqIndex}`
                    return (
                      <div
                        key={id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === id ? null : id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              openIndex === id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openIndex === id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-2xl text-white"
        >
          <h3 className="text-xl font-bold mb-2">Masih punya pertanyaan?</h3>
          <p className="text-primary-100 mb-6">
            Tim customer service kami siap membantu Anda
          </p>
          <a
            href="mailto:support@dadortx.id"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
