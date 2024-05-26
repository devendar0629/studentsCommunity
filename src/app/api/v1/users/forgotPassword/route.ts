import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
    try {
        return NextResponse.json({ message: "Forgot password" });
    } catch (error: any) {
        console.log(error.message``);
    }
}
