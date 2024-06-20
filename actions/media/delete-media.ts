'use server'

import { db } from "@/lib/db"

export const deleteMediaById = async (mediaId: number) => {

  if(!mediaId) {
    return {error: "Could not delete, no media item to delete"}
  }

  try {

    await db.media.delete({
      where: {
        id: mediaId,
      }
    })
    return {success: "Media has been successfully deleted!"}

  } catch(e) {
    return {error: "Something went wrong. Media could not be deleted!"}

  }

}
