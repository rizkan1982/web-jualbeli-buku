import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get single book by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const book = await prisma.book.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Buku tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: book,
    })
  } catch (error) {
    console.error('Get book error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// PUT - Update book (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const data = await req.json()

    const book = await prisma.book.update({
      where: { id },
      data: {
        title: data.title,
        author: data.author,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: data.image,
        isbn: data.isbn,
        publisher: data.publisher,
        publishYear: data.publishYear,
        pages: data.pages,
        language: data.language,
        categoryId: data.categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json({
      success: true,
      message: 'Buku berhasil diperbarui',
      data: book,
    })
  } catch (error) {
    console.error('Update book error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// DELETE - Delete book (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        orderItems: true,
        cartItems: true,
      },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Buku tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check if book has been ordered
    if (book.orderItems.length > 0) {
      return NextResponse.json(
        { error: 'Buku tidak dapat dihapus karena sudah pernah dipesan. Anda dapat menonaktifkan stok buku ini.' },
        { status: 400 }
      )
    }

    // Delete cart items first (if any)
    await prisma.cartItem.deleteMany({
      where: { bookId: id },
    })

    // Delete the book
    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Buku berhasil dihapus',
    })
  } catch (error) {
    console.error('Delete book error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
