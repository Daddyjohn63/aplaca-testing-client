import {db} from "@/lib/db"

export const getAllMedia = async () => {
    try {

        const data = await db.media.findMany();
        return data;

    } catch {
        return null;
    }
} 
