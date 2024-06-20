'use server'
import { db } from "@/lib/db"

export const deletePost = async (id: string) => {

  try {
    await db.post.delete({
      where: {
        id,
      }
    })
    return {success: "Post had been successfully deleted!"}
  }
  catch {
    return {error: "Post not deleted, something went wrong"}
  }
}
