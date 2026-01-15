import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get user's cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        book: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const total = cartItems.reduce(
      (sum: number, item: { book: { price: number }; quantity: number }) => sum + item.book.price * item.quantity,
      0
    )

    return NextResponse.json({
      success: true,
      data: {
        items: cartItems,
        total,
        itemCount: cartItems.length,
      },
    })
  } catch (error) {
    console.error('Get cart error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// POST - Add item to cart
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Silakan login terlebih dahulu' },
        { status: 401 }
      )
    }

    const { bookId, quantity = 1 } = await req.json()

    // Check if book exists and has stock
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Buku tidak ditemukan' },
        { status: 404 }
      )
    }

    if (book.stock < quantity) {
      return NextResponse.json(
        { error: 'Stok tidak mencukupi' },
        { status: 400 }
      )
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },
    })

    let cartItem

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity

      if (book.stock < newQuantity) {
        return NextResponse.json(
          { error: 'Stok tidak mencukupi' },
          { status: 400 }
        )
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { book: true },
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          bookId,
          quantity,
        },
        include: { book: true },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Berhasil ditambahkan ke keranjang',
      data: cartItem,
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// PUT - Update cart item quantity
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { cartItemId, quantity } = await req.json()

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId: session.user.id,
      },
      include: { book: true },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Item tidak ditemukan' },
        { status: 404 }
      )
    }

    if (cartItem.book.stock < quantity) {
      return NextResponse.json(
        { error: 'Stok tidak mencukupi' },
        { status: 400 }
      )
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { book: true },
    })

    return NextResponse.json({
      success: true,
      message: 'Keranjang berhasil diperbarui',
      data: updatedItem,
    })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const cartItemId = searchParams.get('id')

    if (!cartItemId) {
      return NextResponse.json(
        { error: 'ID item diperlukan' },
        { status: 400 }
      )
    }

    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Item berhasil dihapus dari keranjang',
    })
  } catch (error) {
    console.error('Delete cart item error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
