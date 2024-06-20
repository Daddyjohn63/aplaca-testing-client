'use server'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

type Props = {
  imagePath: string | undefined;
}

export const addMedia = async (values: Props) => {

  const user = await currentUser()
  if(!user) {
    return {error: "Unauthenticated User"}
  }
  
  const {imagePath} = values

  try {

      //Add new post
      //Check if image is uploaded
      if(!imagePath) {
        return {error: "Media was not added, no image path provided"}
      }
      
      // Add post
      const data = await db.media.create({
        data: {
          imagePath
        },
      })

      return {success: "Media successfully added!", data}
  }
  catch(e) {
    console.error(e)
    return {error: "Something went wrong, could not add media"}
  }
}
