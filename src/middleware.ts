import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Paths that require authentication
  const protectedPaths = ['/cart', '/checkout', '/profile', '/orders']
  
  // Admin-only paths
  const adminPaths = ['/dashboard']

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path))

  // Redirect to login if not authenticated
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if accessing admin routes without admin role
  if (isAdminPath && (!token || token.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to home if logged in user tries to access login/register
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
}
