import type { Metadata } from "next";
import "./globals.css";
import Header from "@/_components/Header";

export const metadata: Metadata = {
    title: "Eliftech",
    description: "Eliftech test task",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
