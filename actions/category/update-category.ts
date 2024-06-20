'use server'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

type Props = {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
}

export const updateCategory = async (values: Props) => {

  const user = await currentUser()
  if(!user) {
    return {error: "Unauthenticated User"}
  }
  
  const {categoryId, name, slug, description} = values

  if(!categoryId) {
    return {error: "No category to update!"}
  }

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
      if(categoryId !== slugCheck.id){
        return {error: "URL slug already taken, change it up!"}
      }
    }
    
    // Update existing category
    const data = await db.category.update({
      where: {
        id: categoryId
      },
      data: {
        name,
        slug,
        description,
      },
      select: {
        slug: true,
      }
    })

    return {success: "Category successfully updated!", data}


  }
  catch(e) {
    console.error(e)
    return {error: "Something went wrong, could not add post!"}
  }
}
