'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Minus, 
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Book } from '@/types'

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    fetchBook()
  }, [params.id])

  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${params.id}`)
      const data = await res.json()

      if (data.success) {
        setBook(data.data)
      } else {
        router.push('/books')
      }
    } catch (error) {
      console.error('Error fetching book:', error)
      router.push('/books')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: book?.id, quantity }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Berhasil ditambahkan ke keranjang!')
      } else {
        toast.error(data.error || 'Gagal menambahkan ke keranjang')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsAddingToCart(false)
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
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/4" />
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!book) {
    return null
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
            <Link href="/books" className="hover:text-primary-600">Katalog Buku</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{book.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Book Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl overflow-hidden shadow-xl">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-9xl opacity-30">📚</div>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="mt-4 flex gap-3">
                  <div className="w-20 h-24 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-600 overflow-hidden">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={80}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📚</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              {/* Category Badge */}
              {book.category && (
                <Link
                  href={`/categories/${book.category.id}`}
                  className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
                >
                  {book.category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                {book.title}
              </h1>

              {/* Author */}
              <p className="mt-2 text-lg text-gray-600">
                oleh <span className="text-primary-600 font-medium">{book.author}</span>
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.0) • 128 ulasan</span>
              </div>

              {/* Price */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                <div className="text-3xl font-bold text-primary-600">
                  {formatPrice(book.price)}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Hemat hingga 20% untuk member
                </div>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {book.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Stok tersedia ({book.stock} buku)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Stok habis</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={book.stock === 0 || isAddingToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isAddingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Gratis Ongkir</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Original</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">14 Hari Retur</div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>

              {/* Details */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detail Buku</h3>
                <div className="grid grid-cols-2 gap-4">
                  {book.isbn && (
                    <div>
                      <div className="text-sm text-gray-500">ISBN</div>
                      <div className="font-medium">{book.isbn}</div>
                    </div>
                  )}
                  {book.publisher && (
                    <div>
                      <div className="text-sm text-gray-500">Penerbit</div>
                      <div className="font-medium">{book.publisher}</div>
                    </div>
                  )}
                  {book.publishYear && (
                    <div>
                      <div className="text-sm text-gray-500">Tahun Terbit</div>
                      <div className="font-medium">{book.publishYear}</div>
                    </div>
                  )}
                  {book.pages && (
                    <div>
                      <div className="text-sm text-gray-500">Jumlah Halaman</div>
                      <div className="font-medium">{book.pages} halaman</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-500">Bahasa</div>
                    <div className="font-medium">{book.language}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
