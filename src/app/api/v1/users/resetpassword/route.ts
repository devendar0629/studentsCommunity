import Token from "@/models/token.model";
import User from "@/models/user.model";
import { ApiResponse } from "@/templates/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connectDB } from "@/dbconfig/connectDB";


export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    await connectDB();
    try {
        const token = request.nextUrl.searchParams.get('token');
        const { newPassword, confirmPassword } = await request.json();

        if (!newPassword || !confirmPassword) return NextResponse.json(
            {
                success: false,
                error: {
                    message: 'New password and confirm password cannot be empty'
                }
            },
            {
                status: 400
            }
        )

        if (newPassword !== confirmPassword) return NextResponse.json(
            {
                success: false,
                error: {
                    message: "New password and confirm password doesn't match"
                }
            },
            {
                status: 400
            }
        )

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
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {
                $gt: new Date(Date.now()),
            }
        })

        console.log('Token instance: ', tokenInstance);

        if (!tokenInstance || !(tokenInstance?.user)) {
            return NextResponse.json({
                success: false,
                error: {
                    message: "Invalid token"
                }
            }, {
                status: 404
            })
        }

        const user = await User.findById(tokenInstance.user);
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        // invalidate the tokens
        tokenInstance.forgotPasswordToken = undefined;
        tokenInstance.forgotPasswordTokenExpiry = undefined;

        await tokenInstance.save();

        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        }, {
            status: 200
        })

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            {
                success: false,
                error: {
                    cause: error.message,
                    message: 'Something went wrong on our side'
                }
            },
            {
                status: 500
            }
        )
    }
}
