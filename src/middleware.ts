import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "./models/user.model";
import { connectDB } from "./dbconfig/connectDB";

export function middleware(request: NextRequest) {
    try {
        connectDB();
        const accessToken = request.cookies.get("accessToken")?.value

        if (!accessToken) return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })

        const decodedAccessToken: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, { maxAge: process.env.ACCESS_TOKEN_EXPIRY })

        const user = User.findById(decodedAccessToken?.id).select("-password -refreshToken -accessToken");
        if (!user) {
            return NextResponse.json({ error: "No user found with the given refresh token" }, { status: 404 })
        }

        console.log('Middleware !');

        return NextResponse.next({ request: request })

    } catch (error: any) {
        console.log(error.message);
    }
}

export const config = {
    matcher: [
        '/',
        '/users/',
        '/signup',
        '/logout',
        '/login',
        '/updateDetails',
        '/generateAccessToken',
        '/verifyEmail',
    ]
}

// GPT code

// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//     // Check if the request matches the "/about" path
//     if (request.nextUrl.pathname === '/about') {
//         // Redirect to the home page
//         return NextResponse.redirect(new URL('/home', request.url));
//     }

//     // Continue to the next middleware or route handler
//     return NextResponse.next();
// }
