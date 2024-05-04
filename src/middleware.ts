import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log(` \x1b[36mSERVER -> ${request.method}\x1b[0m @ ${request.nextUrl.pathname}`);
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        const publicUrlRegex = /^\/api\/v1\/users\/(login|signup|verifyEmail)$/;
        const isPublicUrl = publicUrlRegex.test(request.nextUrl.pathname);

        if (isPublicUrl && accessToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else if (!isPublicUrl && !accessToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        return NextResponse.next({ request: request });
    } catch (error: any) {
        console.log(error.message);
    }
}

export const config = {
    matcher: [
        // '/api/v1/users/:path*', // right way
        '/api/v1/users/login',
        '/api/v1/users/users/signup',
        '/api/v1/users/logout',
        '/api/v1/users/updateDetails',
        '/api/v1/users/generateAccessToken',
        '/api/v1/users/verifyEmail',
        '/api/v1/users/:username*'
    ]
}