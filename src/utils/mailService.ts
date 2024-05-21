import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

const sendMail = async (
    emailType: string,
    toEmail: string,
    userId: string,
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

        const mailOptions = {
            from: "mailtrap@demomailtrap.com", // CAUTION: What is this ???
            to: toEmail,
            subject:
                emailType === "VERIFY_EMAIL"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${process.env.SERVER_BASE_URL}:${process.env.PORT ?? 8000}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY_EMAIL" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.SERVER_BASE_URL}:${process.env.PORT ?? 8000}/verifyemail?token=${hashedToken}<br /><br />Expires in 1hour</p>`,
        };

        const mailResp = await transporter.sendMail(mailOptions);

        return mailResp;
    } catch (error: any) {
        console.log(error.message);
    }
};

export { sendMail };
