export interface Book {
  id: string
  title: string
  author: string
  description: string
  price: number
  stock: number
  image?: string | null
  isbn?: string | null
  publisher?: string | null
  publishYear?: number | null
  pages?: number | null
  language: string
  categoryId: string
  category?: Category
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
  books?: Book[]
}

export interface User {
  id: string
  name?: string | null
  email: string
  role: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  quantity: number
  userId: string
  bookId: string
  book: Book
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  user?: User
  status: string
  totalAmount: number
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  paymentMethod: string
  notes?: string | null
  createdAt: Date
  updatedAt: Date
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  bookId: string
  quantity: number
  price: number
  book?: Book
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
