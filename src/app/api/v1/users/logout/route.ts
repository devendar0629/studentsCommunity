import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/dbconfig/connectDB";
import Token from "@/models/token.model";
import { ApiResponse } from "@/templates/apiResponse";

connectDB();

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { success: false, error: { message: "Unauthorized request" } },
                { status: 403 }
            );
        }

        const decodedToken: any = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET!,
            { maxAge: process.env.ACCESS_TOKEN_EXPIRY }
        );

        if ((decodedToken.exp * 1000) <= Date.now()) {
            return NextResponse.json(
                { success: false, error: { message: "Refresh token expired" } },
                { status: 401 }
            );
        }

        const userTokenInstance = await Token.findOne({
            user: decodedToken.id
        })
        userTokenInstance.refreshToken = undefined;

        await userTokenInstance.save();

        const resp = NextResponse.json(
            { success: true, message: "User logged out successfully" },
            { status: 200 }
        );
        resp.cookies.delete('accessToken');
        resp.cookies.delete('refreshToken');

        return resp;
    } catch (error: any) {
        console.log(error.message);
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
