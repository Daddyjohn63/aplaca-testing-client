import {db} from "@/lib/db"

export const getAllPosts = async () => {
    try {

        const data = await db.post.findMany();
        return data;

    } catch {
        return null;
    }
} 

export const getPublishedPosts = async () => {
    try {

        const data = await db.post.findMany({
            where: {
                status: 'published'
            }
        });
        return data;

    } catch {
        return null;
    }
} 
