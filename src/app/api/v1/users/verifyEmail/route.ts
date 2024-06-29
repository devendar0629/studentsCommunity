import User from "@/models/user.model.js";
import { connectDB } from "@/dbconfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Token from "@/models/token.model";
import { ApiResponse } from "@/templates/apiResponse";

connectDB();

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const token = request.nextUrl.searchParams.get('token')

        if (!(token?.trim())) {
            return NextResponse.json(
                {
                    success: true,
                    error: { message: "Token empty" }
                },
                { status: 400 }
            );
        }

        const tokenInstance = await Token.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: new Date(Date.now()),
            }
        })

        if (!tokenInstance) {
            return NextResponse.json(
                {
                    success: true,
                    error: { message: 'Invalid token' }
                },
                { status: 400 }
            )
        }

        const user = await User.findById(tokenInstance.user).select('-password');

        if (!user) {
            return NextResponse.json(
                {
                    success: true,
                    error: { message: "Something went wrong while fetching the user" }
                },
                { status: 500 }
            );
        }

        tokenInstance.verifyToken = undefined;
        tokenInstance.verifyTokenExpiry = undefined;

        user.isVerified = true;

        await tokenInstance.save();
        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "User verified successfully"
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: 'Something went wrong on our side',
                    cause: error.message
                }
            },
            { status: 500 });
    }
}
