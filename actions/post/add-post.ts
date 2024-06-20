'use server'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

type Props = {
  title: string;
  content: string;
  excerpt: string | undefined | null;
  slug: string;
  category: string;
  status: string;
  imagePath: string | undefined | null;
  existingImageId: number | undefined;
}

export const addPost = async (values: Props) => {

  const user = await currentUser()
  if(!user) {
    return {error: "Unauthenticated User"}
  }

  const {title, slug, excerpt, content, status, category, imagePath, existingImageId} = values

  try {

    //Check for duplicate slugs
    const slugCheck = await db.post.findFirst({
      where: {
        slug: slug
      },
      select: {
        id: true,
        slug: true,
      }
    })

    if(!!slugCheck) {
      return {error: "URL slug already taken, change it up!"}
    }


    //If image uploaded then add image metadata to media table
    let mediaId: number | undefined;

    //If user uploaded image
    if(!!imagePath) {
      const imageData = await db.media.create({
        data: {
          imagePath: imagePath, 
          altText: '',
          description: '',
        }
      })

      mediaId = imageData.id
    }

    //of user selected image already uploaded
    if(!!existingImageId) {
      mediaId = existingImageId
    }

    //Now add post data and image data to post table

    const addPostPayload = {
      title,
      slug,
      excerpt,
      content,
      authorId: user.id,
      status,
      categoryId: category,
      mediaId: mediaId,
    };

    // Add post
    const data = await db.post.create({
      data: addPostPayload,
      select: {
        id: true
      },
    })

    return {success: "Post had been successfully added!", data}
  }
  catch(e) {
    console.error(e)
    return {error: "Something went wrong, could not add post!"}
  }
}
