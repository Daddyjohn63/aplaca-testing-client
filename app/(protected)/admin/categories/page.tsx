import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/admin/breadcrumb";
import { DataTable } from "@/components/admin/categories-table/data-table";
import { db } from "@/lib/db";
import { columns } from "@/components/admin/categories-table/columns";


type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

type WhereClause = {
  name?: any, 
}

const breadcrumbItems = [{ title: "Categories", link: "/admin/categories" }];

const CategoriesPage = async ({searchParams}: ParamsProps) => {

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const name = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  let whereClause: WhereClause = {}

  //Only add the title condition if title is prodived
  if(name) {
    whereClause.name = {
      contains: name,
      mode: 'insensitive'
    }
  }

  const query = {
    where: whereClause,
    take: pageLimit,
    skip: offset,
  }

  //Fetch from categories table
  const data = await db.category.findMany(query)

  //Get count to display on page title and for table pages
  const count = await db.category.count()
  const pageCount = Math.ceil(count / pageLimit);


  return (
    <div className="h-full">
      <div>
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`Categories (${count})`}
          description="Manage blog post categories here"
        /> 
      </div>
        <DataTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={count}
          data={data}
          pageCount={pageCount}
        />

    </div>
  )
}

export default CategoriesPage
