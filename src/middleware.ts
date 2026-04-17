import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // If the user is authenticated, continue
  if (token) {
    return NextResponse.next()
  }

  // If not authenticated, redirect to signin
  const loginUrl = new URL('/auth/signin', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/cart', '/wishlist', '/allorders', '/orders'],
}
