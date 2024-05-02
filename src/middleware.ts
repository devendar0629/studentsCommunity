import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "./models/user.model";
import { connectDB } from "./dbconfig/connectDB";

connectDB();

export function middleware(request: NextRequest) {

    try {
        console.log('--------------- 1 -----------------');
        const accessToken = request.cookies.get("accessToken")?.value;

        console.log(`-- Access token: ${accessToken}`);

        if (!accessToken) return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
        console.log('--------------- 2 -----------------');

        const decodedAccessToken: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, { maxAge: process.env.ACCESS_TOKEN_EXPIRY });
        console.log('--------------- 3 -----------------');

        const user = User.findById(decodedAccessToken?.id).select("-password -refreshToken -accessToken");
        console.log('--------------- 4 -----------------');

        if (!user) {
            return NextResponse.json({ error: "No user found with the given refresh token" }, { status: 404 });
        }
        console.log('--------------- 5 -----------------');

        console.log('---------------- Middleware ----------------- !');

        return NextResponse.next({ request: request });

    } catch (error: any) {
        console.log(error.message);
    }
}

export const config = {
    matcher: [
        '/api/v1/users/login',
        '/api/v1/users/users/signup',
        '/api/v1/users/logout',
        '/api/v1/users/updateDetails',
        '/api/v1/users/generateAccessToken',
        '/api/v1/users/verifyEmail',
    ]
}