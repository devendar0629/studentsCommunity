import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { SuccessBody } from "@/utils/Response/SuccessBody";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: "Unauthenticated request" }, { status: 401 })
        }

        const decodedToken: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) return NextResponse.json({ status: 401 })
        if (user.refreshToken !== refreshToken) return NextResponse.json({ error: "Unauthenticated request" }, { status: 401 })

        const accessTokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const refreshTokenPayload = {
            id: user._id
        }

        const newAccessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
        const newRefreshToken = jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

        const resp = NextResponse.json(new SuccessBody(true, "Access and Refresh tokens generated successfully"), { status: 200 })
        resp.cookies.set('accessToken', newAccessToken);
        resp.cookies.set('refreshToken', newRefreshToken);

        user.refreshToken = newRefreshToken;
        await user.save();

        return resp;
    } catch (error) {
        console.log(error);
    }
}