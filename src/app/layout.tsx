import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DevTube: Twitch for Coders",
    description: "Pair program with random developers online.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <NextTopLoader />
                    <Header />
                    <div className="container mx-auto">{children}</div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
