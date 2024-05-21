import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
            <body className="h-full w-full flex flex-col flex-nowrap">
                {children}
                <Toaster />
            </body>
        </html>
    );
}
