import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import Token from "@/models/token.model";
import { ApiResponse } from "@/templates/apiResponse";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "Unauthenticated request"
                    }
                },
                { status: 401 }
            );
        }

        const decodedToken: any = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!
        );
        const userTokenInstance = await Token.findOne({
            user: decodedToken.id
        })

        if (!userTokenInstance)
            return NextResponse.json({ success: false, error: { message: "Unauthenticated request" } }, { status: 401 });

        if (userTokenInstance.refreshToken !== refreshToken)
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "Unauthenticated request"
                    }
                },
                { status: 401 }
            );

        const user = await User.findById(userTokenInstance.user).select("-password");

        // payloads
        const accessTokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const refreshTokenPayload = {
            id: user._id,
        };

        // tokens
        const newAccessToken = jwt.sign(
            accessTokenPayload,
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const newRefreshToken = jwt.sign(
            refreshTokenPayload,
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        const resp = NextResponse.json(
            {
                success: true,
                message: "Access and Refresh tokens generated successfully"
            },
            { status: 200 }
        );
        resp.cookies.set("accessToken", newAccessToken);
        resp.cookies.set("refreshToken", newRefreshToken);

        userTokenInstance.refreshToken = newRefreshToken;
        await userTokenInstance.save();

        return resp;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: "Something went wrong on our side",
                    cause: error.message
                }
            },
            { status: 500 })
    }
}
