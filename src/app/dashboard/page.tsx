'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DashboardStats {
  totalBooks: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [booksRes, ordersRes] = await Promise.all([
        fetch('/api/books?limit=1'),
        fetch('/api/orders?limit=5'),
      ])

      const booksData = await booksRes.json()
      const ordersData = await ordersRes.json()

      setStats({
        totalBooks: booksData.pagination?.total || 0,
        totalOrders: ordersData.pagination?.total || 0,
        totalUsers: 50, // Placeholder
        totalRevenue: ordersData.data?.reduce((sum: number, order: any) => sum + order.totalAmount, 0) || 0,
        pendingOrders: ordersData.data?.filter((o: any) => o.status === 'PENDING').length || 0,
        completedOrders: ordersData.data?.filter((o: any) => o.status === 'DELIVERED').length || 0,
      })

      setRecentOrders(ordersData.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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

  const statCards = [
    {
      title: 'Total Buku',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/dashboard/books',
    },
    {
      title: 'Total Pesanan',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      link: '/dashboard/orders',
    },
    {
      title: 'Total Pengguna',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      link: '/dashboard/users',
    },
    {
      title: 'Pendapatan',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-yellow-500',
      isPrice: true,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Menunggu' },
      PROCESSING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Diproses' },
      SHIPPED: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Dikirim' },
      DELIVERED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Selesai' },
      CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dibatalkan' },
    }

    const config = statusConfig[status] || statusConfig.PENDING

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Selamat datang di panel admin DadoRTX Books</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.link || '#'}>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-gray-500">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.isPrice ? stat.value : stat.value.toLocaleString()}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Pesanan</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-900">Menunggu Konfirmasi</span>
              </div>
              <span className="text-xl font-bold text-yellow-600">{stats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Sedang Diproses</span>
              </div>
              <span className="text-xl font-bold text-blue-600">0</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Selesai</span>
              </div>
              <span className="text-xl font-bold text-green-600">{stats.completedOrders}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
            <Link href="/dashboard/orders" className="text-sm text-primary-600 hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.slice(0, 5).map((order: any) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="block p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shippingName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Belum ada pesanan
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold">Aksi Cepat</h3>
            <p className="text-primary-100">Kelola toko buku Anda dengan mudah</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/books/new"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              + Tambah Buku
            </Link>
            <Link
              href="/dashboard/categories/new"
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-400 transition-colors"
            >
              + Tambah Kategori
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
