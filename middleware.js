// import { NextRequest, NextResponse } from 'next/server';
import { NextResponse } from "next/server";

export async function middleware () {   

  // to do: create response encryption to encrypt response to image src from gdrive
    return NextResponse.next()
}

export const config = { matcher: ["/api/:path*"] }