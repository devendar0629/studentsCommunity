import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
    try {
        return NextResponse.json({'message': "Forgot passowrd"})
    } catch (error: any) {
        console.log(error.message``);
    }
}