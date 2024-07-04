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
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
    const session = useSession();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AlertDialog
                open={open}
                onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove any data associated
                            with it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteAccountAction();
                                signOut({ callbackUrl: "/" });
                            }}>
                            Yes, delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link">
                        <Avatar className="mr-2">
                            <AvatarImage
                                src={session.data?.user?.image ?? ""}
                            />
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                        }}
                        style={{ cursor: "pointer" }}
                        className="flex">
                        <DeleteIcon className="mr-2" />
                        Delete Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return (
        <header className="py-2 dark:bg-gray-900 bg-gray-100 z-10 relative">
            <div className="container mx-auto flex justify-between items-center">
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
