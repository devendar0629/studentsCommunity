import { NextRequest, NextResponse } from "next/server";

// will be implemented later
export function GET(request: NextRequest) {
    return NextResponse.json(
        { message: "Hello dashboard route" },
        { status: 200 }
    );
}
