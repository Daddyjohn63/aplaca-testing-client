'use server'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

type Props = {
  postId: string | undefined;
  title: string;
  content: string;
  excerpt: string | undefined | null;
  slug: string;
  category: string;
  status: string;
  imagePath: string | undefined | null;
  existingImageId: number | undefined;
  deleteImage: boolean;
}

export const updatePost = async (values: Props) => {

  const user = await currentUser()
  if(!user) {
    return {error: "Unauthenticated User"}
  }

  const {postId,title, slug, excerpt, content, status, category, imagePath, existingImageId, deleteImage} = values

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

      //If its the same post as the one I am editing, then ignore the slug check. 
      if(postId !== slugCheck.id){
        return {error: "URL slug already taken, change it up!"}
      }
    }


    //If image uploaded then add image metadata to media table
    let mediaId: number | undefined | null;

    if(deleteImage) {
      mediaId = null
    } else {

      //If user uploaded image
      if(!!imagePath && !existingImageId) {
        const imageData = await db.media.create({
          data: {
            imagePath: imagePath, 
            altText: '',
            description: '',
          }
        })

        mediaId = imageData.id
      }

      //if user selected image already uploaded
      if(!!existingImageId) {
        mediaId = existingImageId
      }

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

    // Add post to post table in database
    const data = await db.post.update({
      data: addPostPayload,
      where: {
       id: postId
      },
      select: {
        slug: true
      },
    })

    return {success: "Post had been successfully updated!", data}
  }
  catch(e) {
    console.error(e)
    return {error: "Something went wrong, could not update post!"}
  }
}
