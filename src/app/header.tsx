"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
    const session = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link">
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user?.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {session.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() =>
                        signOut({
                            callbackUrl: "/",
                        })
                    }
                    style={{ cursor: "pointer" }}
                    className="flex">
                    <LogOutIcon className="mr-2" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return (
        <header className="py-2 dark:bg-gray-900 bg-gray-100 container mx-auto z-10 relative">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="flex gap-2 items-center text-xl hover:text-blue-500">
                    <Image
                        src="/icon-total.png"
                        width="60"
                        height="60"
                        alt="DevTube"
                    />
                    DevTube
                </Link>

                <nav className="flex gap-8">
                    {isLoggedIn && (
                        <>
                            <Link
                                href="/browse"
                                className="hover:underline">
                                Browse
                            </Link>
                            <Link
                                href="/your-rooms"
                                className="hover:underline">
                                Your Rooms
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {isLoggedIn && <AccountDropdown />}
                    {!isLoggedIn && (
                        <Button
                            onClick={() => signIn()}
                            variant="link">
                            <LogInIcon className="mr-2" />
                            Sign In
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
