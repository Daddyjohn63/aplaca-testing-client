import { Heading } from "@/components/ui/heading";
import BreadCrumb from "@/components/admin/breadcrumb";
import { db } from "@/lib/db";
import { AddMediaButton } from "@/components/admin/add-media-button";
import PaginatedMediaGrid from "@/components/admin/paginated-media-grid";

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const breadcrumbItems = [
  { title: "Media", link: "/admin/media" },
];


const MediaPage = async ({searchParams}: ParamsProps) => {

  const page = Number(searchParams.page) || 1;
  const take = Number(searchParams.take) || 16;
  const skip = (page - 1) * take

  const data = await db.media.findMany({
    take: take,
    skip: skip,
    orderBy: {
      createdAt: 'desc'
    },
  })

  //Count total published posts for pagination
  const count = await db.media.count()
  const totalPages = Math.ceil(count / take);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <div>
          <BreadCrumb items={breadcrumbItems} />
          <Heading
            title={`Media (${count})`}
            description="Manage images here"
          /> 
        </div>
        <AddMediaButton />
      </div>
      <div>
        <PaginatedMediaGrid data={data} count={count} page={page} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default MediaPage
