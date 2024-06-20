import BreadCrumb from "@/components/admin/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/admin/users-table/data-table";
import { db } from "@/lib/db";
import { columns } from "@/components/admin/users-table/columns";

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const breadcrumbItems = [{ title: "Users", link: "/admin/users" }];

type WhereClause = {
  name?: any, 
}

const UsersPage = async ({searchParams}: ParamsProps) => {
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

  const data = await db.user.findMany(query)
  const count = await db.user.count()

  const pageCount = Math.ceil(count / pageLimit);
  return (
    <div className="h-full">
      <div>
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`Users (${count})`}
          description="Manage users here"
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
export default UsersPage;
