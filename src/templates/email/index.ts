interface EmailProps {
    fromEmail: string;
    toEmail: string;
}

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

interface ResetPasswordEmailProps extends EmailProps {
    resetPasswordPathname: string;
    resetPasswordToken: string;
    resetPasswordLink: string;
}

interface VerifyEmailProps extends EmailProps {
    verifyEmailPathname: string;
    verifyEmailToken: string;
    verifyEmailLink: string;
}

const generateVerifyEmailOptions = (obj: VerifyEmailProps) => {
    const mailOptions: MailOptions = {
        to: obj.toEmail,
        from: obj.fromEmail,
        subject: 'Verify your Email',
        html: `<div>
            Click the below link to verify your account.This link will expire in 1hour.<br>
            <a href='${obj.verifyEmailLink}/${obj.verifyEmailPathname}?token=${encodeURIComponent(obj.verifyEmailToken)}'>verify</a>
        </div>`
    }

    return mailOptions;
}

const generateResetPasswordOptions = (obj: ResetPasswordEmailProps) => {
    const mailOptions: MailOptions = {
        to: obj.toEmail,
        from: obj.fromEmail,
        subject: 'Reset your password',
        html: `<div>
            Click the below link to reset your password.This link will expire in 1hour.<br>
            <a href='${obj.resetPasswordLink}/${obj.resetPasswordPathname}?token=${encodeURIComponent(obj.resetPasswordToken)}'>reset</a>
        </div>`
    }

    return mailOptions;
}

export { generateVerifyEmailOptions, generateResetPasswordOptions };