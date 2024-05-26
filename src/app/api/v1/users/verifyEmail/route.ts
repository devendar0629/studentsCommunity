import User from "@/models/user.model.js";
import { connectDB } from "@/dbconfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Token from "@/models/token.model";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get('token')

        if (!(token?.trim())) {
            return NextResponse.json({ error: "Token empty" }, { status: 400 });
        }

        const tokenInstance = await Token.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: new Date(Date.now()),
            }
        })

        if (!tokenInstance) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
        }

        const user = await User.findById(tokenInstance.user).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: "Something went wrong while fetching the user" },
                { status: 500 }
            );
        }

        tokenInstance.verifyToken = undefined;
        tokenInstance.verifyTokenExpiry = undefined;

        user.isVerified = true;

        await tokenInstance.save();
        await user.save();

        return NextResponse.json(
            { message: "User verified successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
