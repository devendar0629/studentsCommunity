import { ApiResponse } from "@/templates/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { sendMail } from "@/utils/mailService";
import User from "@/models/user.model";
import Token from "@/models/token.model";
import { connectDB } from "@/dbconfig/connectDB";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        await connectDB();

        let { email } = await request.json();
        email = email?.trim();

        if (!email)
            return NextResponse.json({
                success: false, error: {
                    message: 'Email cannot be empty'
                }
            }, { status: 400 })

        const initiatedUser: any = await User.findOne({
            email
        }).select('-password');

        const tokenInstance: any = await Token.findOne({
            user: initiatedUser._id
        })

        if (!initiatedUser || !tokenInstance)
            return NextResponse.json({
                success: false, error: {
                    message: 'No user associated with given mail'
                }
            }, { status: 400 })

        const tokenPayload = {
            email
        }

        const hashedToken = jwt.sign(tokenPayload, process.env.FORGOT_PASSWORD_SECRET!, {
            expiresIn: process.env.FORGOT_PASSWORD_EXPIRY
        })

        tokenInstance.forgotPasswordToken = hashedToken
        tokenInstance.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000);

        await tokenInstance.save();
        await sendMail('RESET-PASSWORD', email, hashedToken);

        return NextResponse.json({
            success: true,
            message: 'Reset password mail sent successfully'
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false, error: {
                message: 'Something went wrong on our side'
            }
        }, { status: 500 })
    }
}