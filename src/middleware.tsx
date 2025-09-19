import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  const privateRoutes = ['/menu', '/occurrences', '/historic', '/app-occurrences', '/historic-app']

  const isAccessingPrivateRoute = privateRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  )

 
  if (!token && isAccessingPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }


  if (token && request.nextUrl.pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/menu', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/menu/:path*',
    '/occurrences/:path*',
    '/historic/:path*',
    '/app-occurrences/:path*',
    '/historic-app/:path*',
    '/cameras/:path*',
    '/sign-in',
  ],
}