import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/admin/breadcrumb";
import { UpdatePostForm } from "@/components/admin/update-post-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type Params = {
  id: string;
}
const breadcrumbItems = [
  { title: "Posts", link: "/admin/posts" },
  { title: "Update Post", link: "#" },
];

const UpdatePostPage = async({params, searchParams}: {params: Params, searchParams: any}) => {

  const {id} = params;
  const {status} = searchParams;

  if(!id) {
    return notFound()
  }

  const categories = await db.category.findMany()
  const postData = await db.post.findFirst({
    where: {
      id
    },
    include: {
      media: {
        select: {
          id: true,
          imagePath: true,
        }
      }
    },

  })

  if(!postData) {
    return notFound()
  }

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Update Post"
        description="Edit your post here"
      /> 
      <UpdatePostForm 
        categories={categories}
        postData={postData}
        status={status}
      />
    </div>
  )
}

export default UpdatePostPage
