import { NextResponse } from 'next/server' // This is used to create responses and handle redirects
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    //Compared paths to determine if the user is accessing a public or protected route
    const isPublicPath = path === '/login' || path === '/signup';
    //Check if the user is authenticated
    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        //If authenticated user tries to access public route, redirect to profile
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if(!isPublicPath && !token){
        //If unauthenticated user tries to access protected route, redirect to login
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}
