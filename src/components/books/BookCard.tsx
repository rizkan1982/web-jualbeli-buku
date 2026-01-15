'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { Book } from '@/types'
import toast from 'react-hot-toast'

interface BookCardProps {
  book: Book
  onAddToCart?: (book: Book) => void
}

export default function BookCard({ book, onAddToCart }: BookCardProps) {
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: book.id, quantity: 1 }),
      })
      
      if (res.ok) {
        toast.success('Berhasil ditambahkan ke keranjang!')
        if (onAddToCart) onAddToCart(book)
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menambahkan ke keranjang')
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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <Link href={`/books/${book.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-30">📚</div>
            </div>
          )}
          
          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white rounded-full text-primary-600 hover:bg-red-500 hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Stock badge */}
          {book.stock <= 5 && book.stock > 0 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Stok Terbatas
            </div>
          )}
          {book.stock === 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Habis
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Category */}
          {book.category && (
            <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
              {book.category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="mt-2 font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="mt-1 text-sm text-gray-500">{book.author}</p>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(book.price)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={book.stock === 0}
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
