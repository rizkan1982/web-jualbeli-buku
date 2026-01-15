'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, MapPin, CreditCard, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface OrderItem {
  id: string
  quantity: number
  price: number
  book: {
    id: string
    title: string
    author: string
    image?: string
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  shippingAddress: string
  paymentMethod: string
  notes?: string
  createdAt: string
  items: OrderItem[]
}

const statusSteps = [
  { key: 'PENDING', label: 'Menunggu', icon: Clock },
  { key: 'PROCESSING', label: 'Diproses', icon: Package },
  { key: 'SHIPPED', label: 'Dikirim', icon: Truck },
  { key: 'DELIVERED', label: 'Selesai', icon: CheckCircle },
]

export default function OrderDetailPage() {
  const params = useParams()
  const { data: session, status: authStatus } = useSession()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchOrder()
    }
  }, [session, params.id])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`)
      const data = await res.json()
      if (data.success) {
        setOrder(data.data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusIndex = (status: string) => {
    if (status === 'CANCELLED') return -1
    return statusSteps.findIndex((s) => s.key === status)
  }

  if (authStatus === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Silakan Login</h2>
            <Link
              href="/login"
              className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan tidak ditemukan</h2>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 text-primary-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Profil
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentStatusIndex = getStatusIndex(order.status)
  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = order.total - subtotal

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Profil
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
                <p className="text-gray-500 font-mono">#{order.orderNumber}</p>
              </div>
              <p className="text-gray-500">{formatDate(order.createdAt)}</p>
            </div>
          </motion.div>

          {/* Status Tracker */}
          {order.status !== 'CANCELLED' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Pesanan</h3>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-primary-600 transition-all duration-500"
                    style={{
                      width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex
                    const isCurrent = index === currentStatusIndex
                    const Icon = step.icon
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                            isCompleted
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <p
                          className={`mt-2 text-sm font-medium ${
                            isCompleted ? 'text-primary-600' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 p-6 rounded-2xl mb-8"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Pesanan Dibatalkan</h3>
                  <p className="text-red-600">Pesanan ini telah dibatalkan</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-600" />
                Item Pesanan
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/books/${item.book.id}`}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item.book.image ? (
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📚
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 hover:text-primary-600">
                        {item.book.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.book.author}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatPrice(item.price)} x {item.quantity}
                        </span>
                        <span className="font-semibold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </motion.div>

            {/* Order Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Alamat Pengiriman
                </h3>
                <p className="text-gray-700">{order.shippingAddress}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  Metode Pembayaran
                </h3>
                <p className="text-gray-700 capitalize">
                  {order.paymentMethod.replace('_', ' ')}
                </p>
              </motion.div>

              {order.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200"
                >
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Catatan</h3>
                  <p className="text-yellow-700">{order.notes}</p>
                </motion.div>
              )}

              {/* Need Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-50 p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Butuh Bantuan?</h3>
                <p className="text-primary-700 mb-4">
                  Hubungi customer service kami jika ada pertanyaan tentang pesanan Anda.
                </p>
                <a
                  href="mailto:support@bukukita.com"
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline"
                >
                  support@bukukita.com
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
