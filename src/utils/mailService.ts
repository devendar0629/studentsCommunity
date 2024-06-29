import { generateResetPasswordOptions, generateVerifyEmailOptions } from "@/templates/email";
import nodemailer from "nodemailer";

type mailTypes = 'VERIFY-EMAIL' | 'RESET-PASSWORD'

const sendMail = async (
    emailType: mailTypes,
    toEmail: string,
    hashedToken: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            // secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailGenerators = {
            'VERIFY-EMAIL': generateVerifyEmailOptions,
            'RESET-PASSWORD': generateResetPasswordOptions
        }

        // CAUTION CHECK !!!
        const mailResp = await transporter.sendMail(mailGenerators[emailType]({
            fromEmail: 'mailtrap@demomailtrap.com',
            toEmail,
            resetPasswordLink: `${process.env.SERVER_BASE_URL}:${process.env.PORT}`,
            resetPasswordToken: hashedToken,
            verifyEmailLink: `${process.env.SERVER_BASE_URL}:${process.env.PORT}`,
            verifyEmailToken: hashedToken,
            verifyEmailPathname: 'verifyemail',
            resetPasswordPathname: 'resetpassword'
        }));

        return mailResp;
    } catch (error: any) {
        console.log(error.message);
    }
};

export { sendMail };
