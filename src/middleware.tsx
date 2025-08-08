import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  const privateRoutes = ['/occurrences', '/historic', '/cameras']

  // Verifica se a rota atual é uma das rotas privadas
  const isAccessingPrivateRoute = privateRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  )



 
  if (!token && isAccessingPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }


  if (token && request.nextUrl.pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/occurrences', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/occurrences/:path*',
    '/historic/:path*',
    '/cameras/:path*',
    '/sign-in',
  ],
}