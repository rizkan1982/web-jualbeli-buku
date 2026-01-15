import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Get all books with pagination and filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('categoryId') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999999')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      AND: [
        {
          OR: [
            { title: { contains: search } },
            { author: { contains: search } },
            { description: { contains: search } },
          ],
        },
        { price: { gte: minPrice, lte: maxPrice } },
      ],
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        include: { category: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.book.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get books error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// POST - Create a new book (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await req.json()

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        description: data.description,
        price: data.price,
        stock: data.stock || 0,
        image: data.image,
        isbn: data.isbn,
        publisher: data.publisher,
        publishYear: data.publishYear,
        pages: data.pages,
        language: data.language || 'Indonesia',
        categoryId: data.categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json({
      success: true,
      message: 'Buku berhasil ditambahkan',
      data: book,
    })
  } catch (error) {
    console.error('Create book error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
