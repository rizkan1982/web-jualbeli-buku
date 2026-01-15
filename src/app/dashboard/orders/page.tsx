'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Package, Truck, CheckCircle, XCircle, Clock, Search, Filter, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface OrderItem {
  id: string
  quantity: number
  price: number
  book: {
    title: string
    image?: string
  }
}

interface Order {
  id: string
  orderNumber?: string
  status: string
  totalAmount: number
  createdAt: string
  user: {
    name: string
    email: string
  }
  items: OrderItem[]
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  PROCESSING: { label: 'Diproses', color: 'bg-blue-100 text-blue-700', icon: Package },
  SHIPPED: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: Truck },
  DELIVERED: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      
      const res = await fetch(`/api/orders?${params.toString()}`)
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

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return

    setIsUpdating(true)
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        toast.success('Status pesanan berhasil diperbarui')
        fetchOrders()
        setSelectedOrder(null)
        setNewStatus('')
      } else {
        toast.error('Gagal memperbarui status')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsUpdating(false)
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

  const filteredOrders = orders.filter((order) => {
    const orderNumber = order.orderNumber || order.id || ''
    const userName = order.user?.name || ''
    const userEmail = order.user?.email || ''
    const query = searchQuery.toLowerCase()
    
    return orderNumber.toLowerCase().includes(query) ||
      userName.toLowerCase().includes(query) ||
      userEmail.toLowerCase().includes(query)
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h1>
        <p className="text-gray-500">Pantau dan kelola semua pesanan pelanggan</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor pesanan atau nama pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent appearance-none bg-white min-w-[180px]"
            >
              <option value="">Semua Status</option>
              {Object.entries(statusConfig).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter((o) => o.status === status).length
          const Icon = config.icon
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${config.color}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6" />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm">{config.label}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600" />
            <p className="mt-2 text-gray-500">Memuat pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">No. Pesanan</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Pelanggan</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Item</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Total</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Tanggal</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status]
                  const StatusIcon = status?.icon || Clock
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-primary-600">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.user?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-500">{order.user?.email || ''}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="w-10 h-10 rounded-lg bg-gray-200 border-2 border-white overflow-hidden"
                            >
                              {item.book.image ? (
                                <img
                                  src={item.book.image}
                                  alt={item.book.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs">
                                  📚
                                </div>
                              )}
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} item
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status?.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {status?.label || order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setNewStatus(order.status)
                            }}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Package className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada pesanan</h3>
            <p className="text-gray-500">Pesanan akan muncul di sini setelah pelanggan melakukan pembelian</p>
          </div>
        )}
      </motion.div>

      {/* Update Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Update Status Pesanan
            </h3>
            <p className="text-gray-600 mb-4">
              Pesanan: <span className="font-mono font-medium">{selectedOrder.orderNumber}</span>
            </p>

            <div className="space-y-2 mb-6">
              {Object.entries(statusConfig).map(([value, config]) => {
                const Icon = config.icon
                return (
                  <label
                    key={value}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      newStatus === value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={value}
                      checked={newStatus === value}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900">{config.label}</span>
                  </label>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedOrder(null)
                  setNewStatus('')
                }}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating || newStatus === selectedOrder.status}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isUpdating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Update Status'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
