import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/connectDB";
import User from "@/models/user.model"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/utils/mailService";
import { SuccessBody } from "@/utils/Response/SuccessBody"

connectDB();

export async function POST(request: NextRequest) {
    try {
        let { username, email, password } = await request.json();
        username = username.trim();
        email = email.trim();

        if ([username, email, password].some(val => !val)) {
            return NextResponse.json({ error: "Username or password or email cannot be empty" }, { status: 400 })
        }

        const userFind = await User.exists({ username });

        if (userFind) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        let newUser = new User({
            email,
            username,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        const hashedToken = await bcryptjs.hash(savedUser?._id.toString(), 10);
        newUser.verifyToken = hashedToken;
        newUser.verifyTokenExpiry = Date.now() + 3600000;

        await newUser.save();

        const mail = await sendMail("VERIFY_EMAIL", email, savedUser?._id.toString(), hashedToken);

        return NextResponse.json(new SuccessBody(true, "User signed up successfully", newUser), { status: 201 });
    } catch (error: any) {
        console.log(error.message);
    }
}