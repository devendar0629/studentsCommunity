import { SuccessBody } from "@/utils/Response/SuccessBody";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken"
import { connectDB } from "@/dbconfig/connectDB";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const accessToken = request.cookies.get('accessToken')?.value

        if (!accessToken) return NextResponse.json({ error: "Invalid user" }, { status: 409 })
        const decodedToken: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, { maxAge: process.env.ACCESS_TOKEN_EXPIRY })

        if ((decodedToken.exp * 1000) <= Date.now()) {
            return NextResponse.json({ error: "Refresh token expired" }, { status: 401 })
        }

        const user = await User.findById(decodedToken.id);
        user.refreshToken = undefined;

        await user.save();

        const resp = NextResponse.json(new SuccessBody(true, "User logged out successfully"), { status: 200 })
        resp.cookies.set("accessToken", "", { httpOnly: true, secure: true });
        resp.cookies.set("refreshToken", "", { httpOnly: true, secure: true });

        return resp;
    } catch (error: any) {
        console.log(error.message);
    }
}