import { connectDB } from "@/dbconfig/connectDB";
import User from "@/models/user.model";
import { SuccessBody } from "@/utils/Response/SuccessBody";
import { isValidObjectId } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    try {
        const { username } = params;

        if (!(username?.trim()))
            return NextResponse.json({ error: "username is empty or invalid" }, { status: 400 })

        const user = await User.findOne({ username }).select("-password -refreshToken");

        if (!user)
            return NextResponse.json({ error: "User does not exist" }, { status: 404 })

        return NextResponse.json(new SuccessBody(true, "User fetched successfully", user), { status: 200 })
    } catch (error) {
        console.log(error);
    }
}
