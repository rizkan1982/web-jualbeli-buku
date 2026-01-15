'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { User, Package, Clock, MapPin, Mail, Calendar, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: {
    id: string
    quantity: number
    book: {
      title: string
      image?: string
    }
  }[]
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
  PROCESSING: { label: 'Diproses', color: 'bg-blue-100 text-blue-700' },
  SHIPPED: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Selesai', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders')

  useEffect(() => {
    if (session) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
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
    })
  }

  if (status === 'loading') {
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
            <p className="text-gray-600 mb-6">Anda harus login untuk melihat profil</p>
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 mb-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{session.user.name}</h1>
                <div className="flex flex-col md:flex-row gap-4 text-white/80">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {session.user.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Bergabung sejak 2024
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <ShoppingBag className="w-8 h-8 text-primary-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-gray-500">Total Pesanan</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <Package className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'PROCESSING' || o.status === 'SHIPPED').length}
              </p>
              <p className="text-gray-500">Dalam Proses</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <Clock className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'DELIVERED').length}
              </p>
              <p className="text-gray-500">Selesai</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <MapPin className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(orders.reduce((acc, o) => acc + o.total, 0))}
              </p>
              <p className="text-gray-500">Total Belanja</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pesanan Saya
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pengaturan Profil
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {isLoading ? (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">Memuat pesanan...</p>
                </div>
              ) : orders.length > 0 ? (
                orders.map((order) => {
                  const status = statusConfig[order.status]
                  return (
                    <div
                      key={order.id}
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="font-mono text-sm text-gray-500">#{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${status?.color}`}>
                          {status?.label || order.status}
                        </span>
                      </div>

                      <div className="flex gap-4 overflow-x-auto pb-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex-shrink-0 flex gap-3">
                            <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden">
                              {item.book.image ? (
                                <img
                                  src={item.book.image}
                                  alt={item.book.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">
                                  📚
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 line-clamp-2">{item.book.title}</p>
                              <p className="text-sm text-gray-500">x{item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <p className="text-gray-600">
                          Total: <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                        </p>
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-primary-600 hover:underline font-medium"
                        >
                          Lihat Detail →
                        </Link>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada pesanan</h3>
                  <p className="text-gray-500 mb-6">
                    Anda belum melakukan pemesanan. Mulai belanja sekarang!
                  </p>
                  <Link
                    href="/books"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    Jelajahi Buku
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Informasi Akun</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    defaultValue={session.user.name || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={session.user.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Default
                  </label>
                  <textarea
                    placeholder="Masukkan alamat pengiriman default Anda"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                  />
                </div>
                <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                  Simpan Perubahan
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
