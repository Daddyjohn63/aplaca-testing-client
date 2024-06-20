import BreadCrumb from "@/components/admin/breadcrumb"
import { Heading } from "@/components/ui/heading";
import { AddPostForm } from "@/components/admin/add-post-form";
import { db } from "@/lib/db";

const breadcrumbItems = [
  { title: "Posts", link: "/admin/posts" },
  { title: "Add Post", link: "/admin/posts/add-post" }
];

const AddPostPage = async() => {

  const categories = await db.category.findMany()

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Add Post"
        description="Add blog post"
      /> 
      <AddPostForm categories={categories} />
    </div>
  )
}
export default AddPostPage
