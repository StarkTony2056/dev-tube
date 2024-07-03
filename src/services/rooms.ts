import { db } from "@/db";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
    // mark a function as dynamic so that if any of the component tree depends on that, it will mark the entire route as dynamic
    const where = search ? like(room.tags, `%${search}%`) : undefined;
    const rooms = await db.query.room.findMany({
        where,
    });
    return rooms;
}

export async function getUserRooms() {
    const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }
    const rooms = await db.query.room.findMany({
        where: eq(room.userId, session.user.id),
    });

    return rooms;
}

export async function getRoom(roomId: string) {
    return await db.query.room.findFirst({
        where: eq(room.id, roomId),
    });
}

export async function deleteRoom(roomId: string) {
    await db.delete(room).where(eq(room.id, roomId));
}
