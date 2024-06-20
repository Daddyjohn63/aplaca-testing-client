'use server'
import { db } from "@/lib/db"

export const deleteUser = async (id: string) => {

  try {
    await db.user.delete({
      where: {
        id,
      }
    })
    return {success: "Post had been successfully deleted!"}
  }
  catch {
    return {error: "User not deleted, something went wrong"}
  }
}
