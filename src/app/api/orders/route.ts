import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get user's orders or all orders (admin)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = session.user.role === 'ADMIN'
      ? {}
      : { userId: session.user.id }

    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          items: {
            include: { book: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// POST - Create a new order (checkout)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await req.json()

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: { book: true },
    })

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Keranjang kosong' },
        { status: 400 }
      )
    }

    // Check stock availability
    for (const item of cartItems) {
      if (item.book.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stok ${item.book.title} tidak mencukupi` },
          { status: 400 }
        )
      }
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum: number, item: { book: { price: number }; quantity: number }) => sum + item.book.price * item.quantity,
      0
    )

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx: typeof prisma) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount,
          shippingName: data.shippingName,
          shippingPhone: data.shippingPhone,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod || 'COD',
          notes: data.notes,
          status: 'PENDING',
          items: {
            create: cartItems.map((item: { bookId: string; quantity: number; book: { price: number } }) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              price: item.book.price,
            })),
          },
        },
        include: {
          items: {
            include: { book: true },
          },
        },
      })

      // Update book stock
      for (const item of cartItems) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: session.user.id },
      })

      return newOrder
    })

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: order,
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
