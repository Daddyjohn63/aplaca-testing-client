import BreadCrumb from "@/components/admin/breadcrumb"
import { Heading } from "@/components/ui/heading";
import { AddCategoryForm } from "@/components/admin/add-category-form";

const breadcrumbItems = [
  { title: "Categories", link: "/admin/categories" },
  { title: "Add Category", link: "/admin/category/add-category" }
];

const AddPostPage = async() => {

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Add Category"
        description="Add category for blog posts"
      /> 
      <AddCategoryForm />
    </div>
  )
}
export default AddPostPage
