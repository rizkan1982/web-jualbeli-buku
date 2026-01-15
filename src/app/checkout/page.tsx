'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, CreditCard, Truck, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartItem } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    shippingName: '',
    shippingPhone: '',
    shippingAddress: '',
    paymentMethod: 'COD',
    notes: '',
  })

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart')
      const data = await res.json()

      if (data.success) {
        if (data.data.items.length === 0) {
          router.push('/cart')
          return
        }
        setCartItems(data.data.items)
        setTotal(data.data.total)
      } else {
        router.push('/cart')
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      router.push('/cart')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.shippingName || !formData.shippingPhone || !formData.shippingAddress) {
      toast.error('Mohon lengkapi semua data pengiriman')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Pesanan berhasil dibuat!')
        router.push(`/orders/${data.data.id}`)
      } else {
        toast.error(data.error || 'Gagal membuat pesanan')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 max-w-7xl mx-auto px-4 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary-600">Beranda</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart" className="hover:text-primary-600">Keranjang</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Checkout</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Shipping Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 space-y-6"
              >
                {/* Shipping Info */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Alamat Pengiriman
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Penerima
                      </label>
                      <input
                        type="text"
                        value={formData.shippingName}
                        onChange={(e) => setFormData({ ...formData, shippingName: e.target.value })}
                        placeholder="Nama lengkap penerima"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={formData.shippingPhone}
                        onChange={(e) => setFormData({ ...formData, shippingPhone: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alamat Lengkap
                      </label>
                      <textarea
                        value={formData.shippingAddress}
                        onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                        placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                        rows={3}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catatan (Opsional)
                      </label>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Catatan untuk kurir atau penjual"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Metode Pengiriman
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-primary-600 rounded-xl bg-primary-50 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        defaultChecked
                        className="w-5 h-5 text-primary-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Reguler (2-3 hari)</div>
                        <div className="text-sm text-gray-500">Gratis untuk pembelian di atas Rp 150.000</div>
                      </div>
                      <div className="font-semibold text-green-600">Gratis</div>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Metode Pembayaran
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer ${
                      formData.paymentMethod === 'COD' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                        className="w-5 h-5 text-primary-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Bayar di Tempat (COD)</div>
                        <div className="text-sm text-gray-500">Bayar saat barang diterima</div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer ${
                      formData.paymentMethod === 'TRANSFER' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'TRANSFER'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'TRANSFER' })}
                        className="w-5 h-5 text-primary-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Transfer Bank</div>
                        <div className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer ${
                      formData.paymentMethod === 'EWALLET' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'EWALLET'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'EWALLET' })}
                        className="w-5 h-5 text-primary-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">E-Wallet</div>
                        <div className="text-sm text-gray-500">OVO, GoPay, DANA, ShopeePay</div>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-96"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ringkasan Pesanan
                  </h3>

                  {/* Items */}
                  <div className="space-y-3 pb-4 border-b max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {item.book.image ? (
                            <Image
                              src={item.book.image}
                              alt={item.book.title}
                              width={64}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">📚</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm line-clamp-2">{item.book.title}</div>
                          <div className="text-xs text-gray-500 mt-1">x{item.quantity}</div>
                          <div className="text-sm font-semibold text-primary-600 mt-1">
                            {formatPrice(item.book.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Buat Pesanan'
                    )}
                  </button>

                  <p className="mt-4 text-xs text-center text-gray-500">
                    Dengan melakukan pemesanan, Anda menyetujui{' '}
                    <Link href="/terms" className="text-primary-600 hover:underline">
                      Syarat & Ketentuan
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
