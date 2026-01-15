'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartItem } from '@/types'

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart')
      const data = await res.json()

      if (data.success) {
        setCartItems(data.data.items)
        setTotal(data.data.total)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId, quantity }),
      })

      if (res.ok) {
        fetchCart()
      } else {
        const data = await res.json()
        toast.error(data.error)
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
  }

  const removeItem = async (cartItemId: string) => {
    try {
      const res = await fetch(`/api/cart?id=${cartItemId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Item berhasil dihapus')
        fetchCart()
      }
    } catch {
      toast.error('Terjadi kesalahan')
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
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl flex gap-4">
                <div className="w-24 h-32 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
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
            <span className="text-gray-900">Keranjang Belanja</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Keranjang Belanja
          </h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Keranjang Anda Kosong
              </h2>
              <p className="text-gray-600 mb-6">
                Yuk, mulai belanja dan temukan buku favoritmu!
              </p>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Jelajahi Buku
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-lg flex gap-4"
                  >
                    {/* Image */}
                    <div className="w-20 md:w-24 h-28 md:h-32 flex-shrink-0 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg overflow-hidden">
                      {item.book.image ? (
                        <Image
                          src={item.book.image}
                          alt={item.book.title}
                          width={96}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📚
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/books/${item.book.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2">
                          {item.book.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.book.author}</p>
                      <div className="mt-2 text-lg font-bold text-primary-600">
                        {formatPrice(item.book.price)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            }}
                            className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => {
                              if (item.quantity < item.book.stock) {
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            }}
                            className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="hidden md:block text-right">
                      <div className="text-sm text-gray-500">Subtotal</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(item.book.price * item.quantity)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

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

                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} item)</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatPrice(total)}</span>
                  </div>

                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full mt-6 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Lanjut ke Pembayaran
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <Link
                    href="/books"
                    className="block mt-4 text-center text-primary-600 font-medium hover:underline"
                  >
                    Lanjut Belanja
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
