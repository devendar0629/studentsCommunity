import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const getUserIdFromCookies = (request: NextRequest): string | undefined => {
    try {
        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) return undefined;

        const decodedPayload: any = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET!,
            { maxAge: process.env.ACCESS_TOKEN_EXPIRY }
        );

        return decodedPayload.id;
    } catch (error: any) {
        console.log(error.message);
    }
};

export { getUserIdFromCookies };
