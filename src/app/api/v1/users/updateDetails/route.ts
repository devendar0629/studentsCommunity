import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

function extractSearchParamsToObject(searchParams: URLSearchParams): Record<string, string | null> {
    const params: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

export async function PATCH(request: NextRequest) {
    try {
        const searchParams = extractSearchParamsToObject(request.nextUrl.searchParams);
        const { age, bio, name, dateOfBirth } = searchParams;

        if (![age, bio, name, dateOfBirth].some((val) => {
            return val?.trim()
        }))
            return NextResponse.json({ error: "Provide atleast 1 field to update" }, { status: 400 });

        return NextResponse.json({ 'h': 'bye' }, { status: 418 });
    } catch (error: any) {
        console.log(error.message);
    }
}