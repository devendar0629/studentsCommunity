import { connectDB } from "@/dbconfig/connectDB";
import User from "@/models/user.model";
import { ApiResponse } from "@/templates/apiResponse";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } }
): Promise<NextResponse<ApiResponse>> {
    try {
        const { username } = params;

        if (!username?.trim())
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "username is empty or invalid"
                    }
                },
                { status: 400 }
            );

        const user = await User.findOne({ username }).select(
            "-password -refreshToken"
        );

        if (!user)
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "User does not exist"
                    }
                },
                { status: 404 }
            );

        return NextResponse.json(
            { success: true, message: "User fetched successfully", data: user },
            { status: 200 }
        );
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
