import { NextRequest, NextResponse } from 'next/server';

export function middleware (req = NextRequest) {
   let token = req.cookies.jwtToken || req.headers.jwtToken
   if (!token) {

     return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url));
   }
   
    return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] }