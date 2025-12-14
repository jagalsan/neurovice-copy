import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const firstSegment = segments[0];

  if (locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  const newPath = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|monitoring).*)',
  ],
};
