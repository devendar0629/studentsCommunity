import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "@/utils/decodeToken";
import { connectDB } from "@/dbconfig/connectDB";
import { SuccessBody } from "@/utils/Response/SuccessBody";
import { extractSearchParamsToObject } from "@/utils";

connectDB();

export async function PATCH(request: NextRequest) {
    try {
        const userId = getUserIdFromCookies(request);
        if (!userId)
            return NextResponse.json(
                { message: "Unauthenticated request" },
                { status: 401 }
            );

        if (!(await User.exists({ _id: userId })))
            return NextResponse.json(
                { error: "Invalid accessToken" },
                { status: 401 }
            );

        const searchParams = extractSearchParamsToObject(
            request.nextUrl.searchParams
        );
        const { age, bio, name, dateOfBirth, gender } = searchParams;

        if (
            ![age, bio, name, dateOfBirth, gender].some((val) => {
                return val?.trim();
            })
        )
            return NextResponse.json(
                { error: "Provide atleast 1 field to update" },
                { status: 400 }
            );

        if (
            gender?.trim() &&
            gender !== "MALE" &&
            gender !== "FEMALE" &&
            gender !== "RATHER-NOT-SAY"
        )
            return NextResponse.json(
                {
                    error: "Gender must be MALE or FEMALE or RATHER-NOT-SAY. Make sure you exactly match case and dashes",
                },
                { status: 400 }
            );

        const updatedUser = await User.findByIdAndUpdate(userId, searchParams, {
            new: true,
        });

        if (!updatedUser)
            return NextResponse.json(
                {
                    error: "Something went wrong while updating the user details",
                },
                { status: 500 }
            );

        return NextResponse.json(
            new SuccessBody(true, "User updated successfully", updatedUser),
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
    }
}
