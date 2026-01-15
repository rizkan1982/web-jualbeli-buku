'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'
import BookCard from '@/components/books/BookCard'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Book } from '@/types'

export default function NewArrivalsPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books?limit=12&sort=newest')
      const data = await res.json()
      if (data.success) {
        // Sort by createdAt descending (newest first)
        const sortedBooks = data.data.sort((a: Book, b: Book) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setBooks(sortedBooks)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Buku Baru</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Temukan koleksi buku terbaru yang baru saja ditambahkan ke katalog kami
            </p>
          </motion.div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Belum ada buku baru</h2>
            <p className="text-gray-500 mb-4">Jelajahi koleksi buku kami</p>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Lihat Semua Buku
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-8">
              <Clock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Baru Ditambahkan</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="absolute -top-2 -right-2 z-10 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Baru!
                  </div>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
