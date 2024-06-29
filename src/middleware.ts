import { NextRequest, NextResponse } from "next/server";

// CAUTION: This not an full fledged Route Protection system .
export async function middleware(request: NextRequest) {
    console.log(
        `\n ${new Date(Date.now()).toTimeString().slice(0, 8)} | \x1b[36mSERVER -> ${request.method}\x1b[0m @ ${request.nextUrl.pathname}\n`
    );
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        const publicUrlRegex: RegExp =
            /^\/api\/v1\/users\/(login|signup|verifyemail|forgotpassword|resetpassword)$/;
        const isPublicUrl = publicUrlRegex.test(request.nextUrl.pathname);

        if (isPublicUrl && accessToken) {
            return NextResponse.json(
                { error: "User already logged in" },
                { status: 200 }
            );
        } else if (!isPublicUrl && !accessToken) {
            return NextResponse.json(
                { error: "Unauthenticated request" },
                { status: 401 }
            );
        }

        return NextResponse.next();
    } catch (error: any) {
        console.log(error.message);
    }
}

export const config = {
    matcher: [
        "/api/v1/users/login",
        "/api/v1/users/logout",
        "/api/v1/users/signup",
        "/api/v1/users/dashboard",
        "/api/v1/users/forgotPassword",
        "/api/v1/users/updateDetails",
        "/api/v1/users/generateAccessToken",
        "/api/v1/users/verifyEmail",
        "/api/v1/users/:username*",
    ],
};
