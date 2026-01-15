'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Package, Clock, Truck, CheckCircle, XCircle, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react'
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
  status: string
  totalAmount: number
  createdAt: string
  items: OrderItem[]
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  PROCESSING: { label: 'Sedang Diproses', color: 'bg-blue-100 text-blue-700', icon: Package },
  SHIPPED: { label: 'Dalam Pengiriman', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export default function OrdersPage() {
  const { data: session, status: authStatus } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('all')

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

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter)

  if (authStatus === 'loading') {
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
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Silakan Login</h2>
            <p className="text-gray-600 mb-6">Anda harus login untuk melihat pesanan Anda</p>
            <Link
              href="/login?callbackUrl=/orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Login Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pesanan Saya</h1>
            <p className="text-gray-600 mt-1">Kelola dan lacak semua pesanan Anda</p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Semua ({orders.length})
            </button>
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = orders.filter(o => o.status === status).length
              if (count === 0) return null
              return (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    activeFilter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {config.label} ({count})
                </button>
              )
            })}
          </motion.div>

          {/* Orders List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-32" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full w-24" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => {
                const status = statusConfig[order.status]
                const StatusIcon = status?.icon || Package
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/orders/${order.id}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        {/* Order Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Pesanan #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status?.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {status?.label || order.status}
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {order.items.slice(0, 3).map((item) => (
                            <div 
                              key={item.id} 
                              className="flex-shrink-0 w-14 h-20 bg-gray-100 rounded-lg overflow-hidden"
                            >
                              {item.book.image ? (
                                <img
                                  src={item.book.image}
                                  alt={item.book.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">
                                  📚
                                </div>
                              )}
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex-shrink-0 w-14 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        {/* Order Footer */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div>
                            <span className="text-sm text-gray-500">{order.items.length} item</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="font-semibold text-gray-900">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-primary-600 text-sm font-medium">
                            Lihat Detail
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {activeFilter === 'all' ? 'Belum Ada Pesanan' : 'Tidak Ada Pesanan'}
              </h2>
              <p className="text-gray-600 mb-6">
                {activeFilter === 'all' 
                  ? 'Anda belum memiliki pesanan. Yuk mulai belanja!'
                  : `Tidak ada pesanan dengan status "${statusConfig[activeFilter]?.label}"`
                }
              </p>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Jelajahi Buku
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
