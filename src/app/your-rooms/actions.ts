"use server";

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "@/services/rooms";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function deleteRoomAction(roomId: string) {
    // authenticate
    const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated.");
    }

    // did the user create this room?
    unstable_noStore();
    const room = await getRoom(roomId);

    if (room?.userId != session.user.id) {
        throw new Error("User not authorized");
    }

    await deleteRoom(roomId);

    revalidatePath("/your-rooms");
}
