'use server'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

type Props = {
  name: string;
  slug: string;
  description?: string;
}

export const addCategory = async (values: Props) => {

  const user = await currentUser()
  if(!user) {
    return {error: "Unauthenticated User"}
  }
  
  const {name, slug, description} = values

  try {

    //Check for duplicate slugs
    const slugCheck = await db.category.findFirst({
      where: {
        slug: slug
      },
      select: {
        id: true,
        slug: true,
      }
    })

    if(!!slugCheck) {
      //If its the same category as the one I am editing, then ignore the slug check. 
      return {error: "URL slug already taken, change it up!"}
    }

      // Add category
      const data = await db.category.create({
        data: {
          name,
          slug,
          description,
        },
        select: {
          id: true,
        }
      })

      return {success: "Post had been successfully added!", data}
  }
  catch(e) {
    console.error(e)
    return {error: "Something went wrong, could not add category!"}
  }
}
