import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/admin/breadcrumb";
import { DataTable } from "@/components/admin/posts-table/data-table";
import { columns } from "@/components/admin/posts-table/columns";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDateVerbose } from "@/lib/utils";

export const dynamic = 'force-dynamic'

const breadcrumbItems = [{ title: "Posts", link: "/admin/posts" }];

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

type WhereClause = {
  title?: any,
}

const PostsPage = async ({ searchParams }: ParamsProps) => {

  const user = await currentUser()
  if(!user) {
    redirect('/')
  }

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const title = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  let whereClause: WhereClause = {}
  //Only add the title condition if title is prodived
  if(title) {
    whereClause.title = {
      contains: title,
      mode: 'insensitive'
    }
  }

  let query = {
    where: whereClause,
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
        name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc' as any
    },
    take: pageLimit,
    skip: offset,
  }


  //Fetch posts from database
  const data = await db.post.findMany(query)

  if (!data) {
    return;
  }


  const formattedData = data.map((item) => {

    const data = {
      id: item.id,
      title: item.title,
      createdAt: formatDateVerbose(item.createdAt.toLocaleDateString()),
      updatedAt: formatDateVerbose(item.updatedAt.toLocaleDateString()),
      status: item.status,
      author: item.author.name || "User",
      category: item.category.name,
    }

    return data
  })

  const count = await db.post.count()
  const pageCount = Math.ceil(count / pageLimit);

  return (
      <div>
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`Posts (${count})`}
          description="Manage blog posts here"
        /> 
        <DataTable
          searchKey="title"
          pageNo={page}
          columns={columns}
          totalUsers={count}
          data={formattedData}
          pageCount={pageCount}
        />
    </div>
  )
}

export default PostsPage
