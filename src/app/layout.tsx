import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Students community",
    description: "Students community website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="dark" lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
