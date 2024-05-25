import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/redux/StoreProvider";

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
        <StoreProvider>
            <html className="dark" lang="en">
                <body
                    className={`h-full w-full flex flex-col flex-nowrap font-sans`}
                >
                    {children}
                    <Toaster />
                </body>
            </html>
        </StoreProvider>
    );
}
