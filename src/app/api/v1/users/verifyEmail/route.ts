import User from "@/models/user.model.js"
import { connectDB } from "@/dbconfig/connectDB"
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!(token?.trim())) {
            return NextResponse.json({ error: "Token empty" }, { status: 400 });
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "User verified successfully" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}