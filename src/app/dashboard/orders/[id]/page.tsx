'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, User, MapPin, CreditCard, Clock, Printer } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

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
  status: string
  totalAmount: number
  shippingAddress: string
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  items: OrderItem[]
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-700' },
  PROCESSING: { label: 'Sedang Diproses', color: 'bg-blue-100 text-blue-700' },
  SHIPPED: { label: 'Dalam Pengiriman', color: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Selesai', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      if (data.success) {
        setOrder(data.data)
      } else {
        toast.error('Pesanan tidak ditemukan')
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      toast.error('Gagal memuat pesanan')
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat detail pesanan...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Pesanan tidak ditemukan</h2>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-primary-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke daftar pesanan
        </Link>
      </div>
    )
  }

  const status = statusConfig[order.status]
  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = order.totalAmount - subtotal

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/orders"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
            <p className="text-gray-500 font-mono">#{order.id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full font-medium ${status?.color}`}>
            {status?.label || order.status}
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Cetak
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
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
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
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
                  <h4 className="font-semibold text-gray-900">{item.book.title}</h4>
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
              </div>
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
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
              <span>Total</span>
              <span className="text-primary-600">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Informasi Pelanggan
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <p className="font-medium text-gray-900">{order.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{order.user.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              Alamat Pengiriman
            </h3>
            <p className="text-gray-700">{order.shippingAddress}</p>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              Metode Pembayaran
            </h3>
            <p className="font-medium text-gray-900 capitalize">
              {order.paymentMethod.replace('_', ' ')}
            </p>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Waktu Pesanan
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Dibuat</p>
                <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diperbarui</p>
                <p className="font-medium text-gray-900">{formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          {order.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200"
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Catatan</h3>
              <p className="text-yellow-700">{order.notes}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
