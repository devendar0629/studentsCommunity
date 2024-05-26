import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import { SuccessBody } from "@/utils/Response/SuccessBody";
import { connectDB } from "@/dbconfig/connectDB";
import Token from "@/models/token.model";

connectDB();

function convertTimeStringToMilliseconds(timeString: string) {
    const regex = /^(\d+)([dhms])$/;
    const match = timeString.match(regex);

    if (!match) {
        throw new Error(
            'Invalid time string format. Expected format: "1d", "30m", "2h", or "45s".'
        );
    }

    const [, value, unit] = match;
    const millisecondsPerUnit: { [index: string]: number } = {
        d: 24 * 60 * 60 * 1000,
        h: 60 * 60 * 1000,
        m: 60 * 1000,
        s: 1000,
    };

    if (!millisecondsPerUnit[unit]) {
        throw new Error(
            `Unsupported time unit: ${unit}. Use "d", "h", "m", or "s".`
        );
    }

    return parseInt(value, 10) * millisecondsPerUnit[unit];
}

interface UserInterface {
    email: string;
    password: string;
    username_or_email: string;
}

export async function POST(request: NextRequest) {
    try {
        let { username_or_email, password }: UserInterface = await request.json();
        username_or_email = username_or_email?.trim();

        if (!username_or_email) {
            return NextResponse.json(
                { error: "Username or email is required" },
                { status: 400 }
            );
        }

        if (!password) {
            return NextResponse.json(
                { error: "Password cannot be empty" },
                { status: 400 }
            );
        }

        let user = await User.findOne({
            $or: [{ username: username_or_email }, { email: username_or_email }],
        });

        if (!user) {
            return NextResponse.json(
                { error: "Unrecognized credentials" },
                { status: 404 }
            );
        };
        if (user.isVerified === false) {
            return NextResponse.json(
                { error: "User email is not verified" },
                { status: 400 }
            );
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch)
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );

        const accessTokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const refreshTokenPayload = {
            id: user._id,
        };

        const tokenInstance = await Token.findOne({
            user: user._id
        });

        // generate jwt tokens
        const accessToken = jwt.sign(
            accessTokenPayload,
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
            refreshTokenPayload,
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        tokenInstance.refreshToken = refreshToken
        await tokenInstance.save();

        const userData = await User.findById(user._id).select('-password')

        const response = NextResponse.json(
            new SuccessBody(true, "User logged in successfully", userData), { status: 200 }
        );

        // send cookies
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: Date.now() +
                convertTimeStringToMilliseconds(
                    String(process.env.ACCESS_TOKEN_EXPIRY)
                ),
            expires: Date.now() +
                convertTimeStringToMilliseconds(
                    String(process.env.ACCESS_TOKEN_EXPIRY)
                ),
        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge:
                Date.now() +
                convertTimeStringToMilliseconds(
                    String(process.env.REFRESH_TOKEN_EXPIRY)
                ),
            expires: Date.now() +
                convertTimeStringToMilliseconds(
                    String(process.env.ACCESS_TOKEN_EXPIRY)
                ),
        });

        return response;
    } catch (error: any) {
        console.log(error);
    }
}
