import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/admin/breadcrumb";
import { UpdateCategoryForm } from "@/components/admin/update-category-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type Params = {
  id: string;
}
const breadcrumbItems = [{ title: "Edit Category", link: "#" }];

const EditCategoryPage = async({params, searchParams}: {params: Params, searchParams: any}) => {

  const {id} = params;
  const {status} = searchParams;

  if(!id) {
    return notFound()
  }

  const categoryData = await db.category.findFirst({
    where: {
      id
    }
  })

  if(!categoryData) {
    return notFound()
  }

  return (
    <div>
      <BreadCrumb items={breadcrumbItems} />
      <Heading
        title="Update Category"
        description="Edit your category here"
      /> 
      <UpdateCategoryForm 
        categoryData={categoryData}
        status={status}
      />
    </div>
  )
}

export default EditCategoryPage
