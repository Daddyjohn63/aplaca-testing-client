'use server'
import { db } from "@/lib/db"

export const deleteCategory= async (id: string) => {

  try {
    await db.category.delete({
      where: {
        id,
      }
    })
    return {success: "Category had been successfully deleted!"}
  }
  catch {
    return {error: "Category not deleted, something went wrong"}
  }
}
