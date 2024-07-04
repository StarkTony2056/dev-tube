"use server";

import { getSession } from "@/lib/auth";
import { deleteUser } from "@/services/users";

export async function deleteAccountAction() {
    const session = await getSession();

    if (!session) {
        throw new Error("Users must be logged in to delete their account.");
    }

    await deleteUser(session.user.id);
}
