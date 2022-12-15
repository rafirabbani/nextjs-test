import { NextResponse } from "next/server";

export async function middleware () {   

  // to do utilize middleware for something
    return NextResponse.next()
}

export const config = { matcher: ["/api/:path*"] }