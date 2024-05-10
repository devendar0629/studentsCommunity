import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/connectDB";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailService";
import { SuccessBody } from "@/utils/Response/SuccessBody";

connectDB();

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function POST(request: NextRequest) {
    try {
        let { username, email, password, confirmPassword }: UserInterface =
            await request.json();
        username = username?.trim();
        email = email?.trim();

        // field values validation
        if ([username, email, password].some((val) => !val)) {
            return NextResponse.json(
                {
                    error: "Username or password or email cannot be empty",
                },
                { status: 400 }
            );
        }

        // check password match
        if (password != confirmPassword) {
            return NextResponse.json({ error: "Passwords don't match" }, { status: 400 })
        }

        const userFindByUsername: any = await User.findOne({ username });
        const userFindByEmail: any = await User.findOne({ email });

        // Check if there exists a VERIFIED user with the same email or username
        if (userFindByEmail?.isVerified || userFindByUsername?.isVerified) {
            if (userFindByEmail?.email === email || userFindByUsername?.email === email) {
                return NextResponse.json({ message: "Email is already taken" }, { status: 400 })
            } else if (userFindByEmail?.username === username || userFindByUsername?.username === username) {
                return NextResponse.json({ message: "Username is already taken" }, { status: 400 })
            }
        }

        let currentUser = null;
        let statusFlag: 'ExistingUser' | 'NewUser' | null = null

        // There was an unverified user
        if (userFindByEmail || userFindByUsername) {
            // hash password
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            // update password
            userFindByEmail.password = hashedPassword;
            await userFindByEmail.save();

            currentUser = userFindByEmail;
            statusFlag = 'ExistingUser'
        }
        // No user exists
        else if (!userFindByEmail && !userFindByUsername) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            let newUser = new User({
                email,
                username,
                password: hashedPassword,
            });

            currentUser = await newUser.save();
            statusFlag = 'NewUser'
        }

        // generate verify token and save in db
        const hashedToken = await bcryptjs.hash(currentUser?._id.toString(), 10);
        currentUser.verifyToken = hashedToken;
        currentUser.verifyTokenExpiry = Date.now() + 3600000;

        await currentUser.save();

        // send activation link to user
        const mail = await sendMail(
            "VERIFY_EMAIL",
            email,
            currentUser?._id?.toString(),
            hashedToken
        );

        const userResponse = await User.findOne({
            _id: currentUser._id
        }).select('-password -verifyToken -verifyTokenExpiry')

        return NextResponse.json(
            new SuccessBody(
                true,
                `User ${statusFlag === 'ExistingUser' ? 'updated' : 'created'} successfully.`,
                userResponse
            ),
            { status: 201 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            error: "Something went wrong while signing up"
        }, { status: 500 })
    }
}
