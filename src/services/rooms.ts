import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
    // mark a function as dynamic so that if any of the component tree depends on that, it will mark the entire route as dynamic
    unstable_noStore();
    const where = search ? like(room.tags, `%${search}%`) : undefined;
    const rooms = await db.query.room.findMany({
        where,
    });
    return rooms;
}

export async function getRoom(roomId: string) {
    unstable_noStore();
    return await db.query.room.findFirst({
        where: eq(room.id, roomId),
    });
}
