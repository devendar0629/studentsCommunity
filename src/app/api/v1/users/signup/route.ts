import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/connectDB";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailService";
import Token from '@/models/token.model'
import { ApiResponse } from "@/templates/apiResponse";

connectDB();

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        let { username, email, password, confirmPassword }: UserInterface =
            await request.json();
        username = username?.trim();
        email = email?.trim();

        // field values validation
        if ([username, confirmPassword, email, password].some((val) => !val)) {
            return NextResponse.json(
                {
                    success: false,
                    error: { message: "Username or password or email or confirmPassword cannot be empty" },
                },
                { status: 400 }
            );
        }

        // check password match
        if (password != confirmPassword) {
            return NextResponse.json({ success: false, error: { message: "Passwords don't match" } }, { status: 400 })
        }

        const userFindByUsername: any = await User.findOne({ username });
        const userFindByEmail: any = await User.findOne({ email });

        // Check if there exists a VERIFIED user with the same email or username
        if (userFindByEmail?.isVerified || userFindByUsername?.isVerified) {
            if (userFindByEmail?.username === username || userFindByUsername?.username === username) {
                return NextResponse.json({ success: false, error: { message: "Username is already taken" } }, { status: 400 })
            }
            else if (userFindByEmail?.email === email || userFindByUsername?.email === email) {
                return NextResponse.json({ success: false, error: { message: "Email is already taken" } }, { status: 400 })
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
            if (userFindByEmail) {
                userFindByEmail.username = username;
                userFindByEmail.password = hashedPassword;
                await userFindByEmail.save();
            }
            else {
                userFindByUsername.email = email;
                userFindByUsername.password = hashedPassword;
                await userFindByUsername.save();
            }

            currentUser = userFindByEmail ?? userFindByUsername;
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
        // if new user create a new token, or retrieve the existing one
        let tokenInstance = await Token.findOne({
            user: currentUser._id
        }) ?? new Token();

        tokenInstance.user = currentUser?._id;

        const hashedToken = await bcryptjs.hash(currentUser?._id.toString(), 10);
        tokenInstance.verifyToken = hashedToken;
        tokenInstance.verifyTokenExpiry = new Date(Date.now() + 3600000);

        await currentUser.save();
        await tokenInstance.save();

        const mail = await sendMail(
            "VERIFY-EMAIL",
            currentUser.email,
            hashedToken,
        );

        const userResponse = await User.findOne({
            _id: currentUser._id
        }).select('-password')

        return NextResponse.json(
            {
                success: true,
                data: userResponse,
                message: `User ${statusFlag == 'ExistingUser' ? 'updated' : 'created'} successfully`
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            error: {
                message: 'Something went wrong on our side',
                cause: error.message
            }
        }, { status: 500 })
    }
}
